import { PrismaClient, Role, ProjectType, ProjectStatus, Priority, StageStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@upshiftbr.com" },
    update: {},
    create: {
      name: "Admin UpshiftBR",
      email: "admin@upshiftbr.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });
  console.log("  Admin created:", admin.email);

  // Create sample clients
  const clientPassword = await bcrypt.hash("client123", 12);

  const clients = await Promise.all([
    prisma.user.upsert({
      where: { email: "joao@email.com" },
      update: {},
      create: {
        name: "João Silva",
        email: "joao@email.com",
        password: clientPassword,
        role: Role.CLIENT,
        company: "Silva Comércio",
      },
    }),
    prisma.user.upsert({
      where: { email: "maria@email.com" },
      update: {},
      create: {
        name: "Maria Santos",
        email: "maria@email.com",
        password: clientPassword,
        role: Role.CLIENT,
        company: "Santos Tech",
      },
    }),
    prisma.user.upsert({
      where: { email: "carlos@email.com" },
      update: {},
      create: {
        name: "Carlos Oliveira",
        email: "carlos@email.com",
        password: clientPassword,
        role: Role.CLIENT,
      },
    }),
  ]);
  console.log("  Clients created:", clients.length);

  // Create team members
  const dev = await prisma.user.upsert({
    where: { email: "dev@upshiftbr.com" },
    update: {},
    create: {
      name: "Ana Dev",
      email: "dev@upshiftbr.com",
      password: await bcrypt.hash("dev123", 12),
      role: Role.DEVELOPER,
    },
  });

  const designer = await prisma.user.upsert({
    where: { email: "design@upshiftbr.com" },
    update: {},
    create: {
      name: "Pedro Designer",
      email: "design@upshiftbr.com",
      password: await bcrypt.hash("design123", 12),
      role: Role.DESIGNER,
    },
  });
  console.log("  Team members created");

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: "E-commerce Silva",
        type: ProjectType.SITE,
        description: "Loja virtual completa com integração de pagamento",
        status: ProjectStatus.EM_DESENVOLVIMENTO,
        progress: 65,
        priority: Priority.ALTA,
        startDate: new Date("2025-03-01"),
        estimatedEnd: new Date("2025-05-15"),
        clientId: clients[0].id,
        teamMembers: { connect: [{ id: dev.id }, { id: designer.id }] },
        stages: {
          create: [
            { name: "Briefing", description: "Recolher requisitos do projeto", order: 0, status: StageStatus.COMPLETED, completedAt: new Date("2025-03-05") },
            { name: "Wireframes", description: "Criar wireframes das páginas principais", order: 1, status: StageStatus.COMPLETED, completedAt: new Date("2025-03-15") },
            { name: "Design", description: "Design final das telas", order: 2, status: StageStatus.COMPLETED, completedAt: new Date("2025-03-25") },
            { name: "Desenvolvimento Frontend", description: "Implementação React/Next.js", order: 3, status: StageStatus.IN_PROGRESS, predictedEnd: new Date("2025-04-20") },
            { name: "Desenvolvimento Backend", description: "API e integrações", order: 4, status: StageStatus.IN_PROGRESS, predictedEnd: new Date("2025-04-25") },
            { name: "Testes", description: "Testes funcionais e de performance", order: 5, status: StageStatus.PENDING, predictedEnd: new Date("2025-05-05") },
            { name: "Entrega", description: "Deploy e treinamento", order: 6, status: StageStatus.PENDING, predictedEnd: new Date("2025-05-15") },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        name: "App Santos Delivery",
        type: ProjectType.APP,
        description: "Aplicativo de entrega para iOS e Android",
        status: ProjectStatus.EM_DESIGN,
        progress: 35,
        priority: Priority.URGENTE,
        startDate: new Date("2025-03-15"),
        estimatedEnd: new Date("2025-07-01"),
        clientId: clients[1].id,
        teamMembers: { connect: [{ id: designer.id }, { id: dev.id }] },
        stages: {
          create: [
            { name: "Briefing", order: 0, status: StageStatus.COMPLETED, completedAt: new Date("2025-03-18") },
            { name: "Arquitetura da Informação", order: 1, status: StageStatus.COMPLETED, completedAt: new Date("2025-03-28") },
            { name: "UI/UX Design", order: 2, status: StageStatus.IN_PROGRESS, predictedEnd: new Date("2025-04-15") },
            { name: "Desenvolvimento Mobile", order: 3, status: StageStatus.PENDING, predictedEnd: new Date("2025-05-30") },
            { name: "Backend & API", order: 4, status: StageStatus.PENDING, predictedEnd: new Date("2025-06-10") },
            { name: "Testes e Lançamento", order: 5, status: StageStatus.PENDING, predictedEnd: new Date("2025-07-01") },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        name: "Landing Page Oliveira",
        type: ProjectType.LANDING_PAGE,
        description: "Landing page para campanha de marketing",
        status: ProjectStatus.PRONTO_PARA_ENTREGA,
        progress: 95,
        priority: Priority.MEDIA,
        startDate: new Date("2025-03-20"),
        estimatedEnd: new Date("2025-04-10"),
        clientId: clients[2].id,
        teamMembers: { connect: [{ id: designer.id }] },
        stages: {
          create: [
            { name: "Briefing", order: 0, status: StageStatus.COMPLETED, completedAt: new Date("2025-03-21") },
            { name: "Design", order: 1, status: StageStatus.COMPLETED, completedAt: new Date("2025-03-28") },
            { name: "Desenvolvimento", order: 2, status: StageStatus.COMPLETED, completedAt: new Date("2025-04-05") },
            { name: "Revisão Final", order: 3, status: StageStatus.IN_PROGRESS, predictedEnd: new Date("2025-04-08") },
            { name: "Entrega", order: 4, status: StageStatus.PENDING, predictedEnd: new Date("2025-04-10") },
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        name: "Sistema de Automação",
        type: ProjectType.AUTOMACAO,
        description: "Automação de processos internos para Santos Tech",
        status: ProjectStatus.EM_PLANEJAMENTO,
        progress: 10,
        priority: Priority.ALTA,
        startDate: new Date("2025-04-01"),
        estimatedEnd: new Date("2025-06-30"),
        clientId: clients[1].id,
        teamMembers: { connect: [{ id: dev.id }] },
        stages: {
          create: [
            { name: "Análise de Processos", order: 0, status: StageStatus.IN_PROGRESS, predictedEnd: new Date("2025-04-15") },
            { name: "Arquitetura Técnica", order: 1, status: StageStatus.PENDING, predictedEnd: new Date("2025-04-30") },
            { name: "Desenvolvimento", order: 2, status: StageStatus.PENDING, predictedEnd: new Date("2025-06-15") },
            { name: "Testes e Deploy", order: 3, status: StageStatus.PENDING, predictedEnd: new Date("2025-06-30") },
          ],
        },
      },
    }),
  ]);
  console.log("  Projects created:", projects.length);

  // Create updates
  await Promise.all([
    prisma.update.create({ data: { projectId: projects[0].id, authorId: dev.id, title: "Frontend 70% concluído", content: "As páginas de produto, carrinho e checkout estão implementadas. Faltando a área do usuário." } }),
    prisma.update.create({ data: { projectId: projects[0].id, authorId: designer.id, title: "Design System aprovado", content: "O cliente aprovou o design system. Já estamos aplicando nas páginas." } }),
    prisma.update.create({ data: { projectId: projects[2].id, authorId: designer.id, title: "Revisão quase concluída", content: "Ajustes finais responsivos sendo feitos. Falta apenas a seção de FAQ." } }),
  ]);
  console.log("  Updates created");

  // Create notifications
  await Promise.all([
    prisma.notification.create({ data: { userId: clients[0].id, projectId: projects[0].id, title: "Atualização do Projeto", message: "O frontend está 70% concluído!", type: "STATUS_CHANGE" } }),
    prisma.notification.create({ data: { userId: clients[2].id, projectId: projects[2].id, title: "Projeto quase pronto!", message: "A landing page está em fase de revisão final.", type: "PROJECT_COMPLETED" } }),
  ]);
  console.log("  Notifications created");

  console.log("\n✅ Seed completed successfully!");
  console.log("\n📋 Login credentials:");
  console.log("  Admin:    admin@upshiftbr.com / admin123");
  console.log("  Joao:     joao@email.com / client123");
  console.log("  Maria:    maria@email.com / client123");
  console.log("  Carlos:   carlos@email.com / client123");
  console.log("  Dev:      dev@upshiftbr.com / dev123");
  console.log("  Designer: design@upshiftbr.com / design123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
