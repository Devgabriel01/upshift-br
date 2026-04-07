import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    // ─── Integração futura ──────────────────────────────────────────────
    // Opção 1: Resend / Nodemailer para envio de e-mail
    //   await resend.emails.send({ from, to, subject, html })
    //
    // Opção 2: Salvar no banco (Prisma + PostgreSQL)
    //   await prisma.lead.create({ data: { name, email, service, message } })
    //
    // Opção 3: Webhook n8n / Make para automação
    //   await fetch(process.env.WEBHOOK_URL!, { method: "POST", body: JSON.stringify(body) })
    //
    // Opção 4: Enviar para Pipedrive como novo lead
    //   await createPipedriveLead({ name, email, service, message })
    // ───────────────────────────────────────────────────────────────────

    // Log temporário (desenvolvimento)
    console.log("[CONTATO]", { name, email, service, message, ts: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: "Proposta recebida! Entraremos em contato em até 24h." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[CONTATO ERROR]", err);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
