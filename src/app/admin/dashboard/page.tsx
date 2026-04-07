"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FolderKanban,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getProjectTypeLabel } from "@/lib/utils";

interface Stats {
  totalClients: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingMessages: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalClients: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingMessages: 0,
  });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes] = await Promise.all([
          fetch("/api/projects"),
        ]);
        const data = await projectsRes.json();

        const projects = data.projects || [];
        setStats({
          totalClients: [...new Set(projects.map((p: any) => p.clientId))].length,
          totalProjects: projects.length,
          activeProjects: projects.filter(
            (p: any) =>
              ![
                "ENTREGUE",
                "AGUARDANDO_BRIEFING",
                "EM_MANUTENCAO",
              ].includes(p.status)
          ).length,
          completedProjects: projects.filter(
            (p: any) => p.status === "ENTREGUE"
          ).length,
          pendingMessages: 0,
        });
        setRecentProjects(projects.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total de Clientes",
      value: stats.totalClients,
      icon: Users,
      color: "from-blue-500/20 to-blue-600/5",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
      href: "/admin/clients",
    },
    {
      label: "Projetos Ativos",
      value: stats.activeProjects,
      icon: TrendingUp,
      color: "from-orange-500/20 to-orange-600/5",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-400",
      href: "/admin/projects",
    },
    {
      label: "Projetos Concluídos",
      value: stats.completedProjects,
      icon: CheckCircle2,
      color: "from-green-500/20 to-green-600/5",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400",
      href: "/admin/projects",
    },
    {
      label: "Em Manutenção",
      value: stats.totalProjects - stats.activeProjects - stats.completedProjects,
      icon: Clock,
      color: "from-red-500/20 to-red-600/5",
      borderColor: "border-red-500/30",
      iconColor: "text-red-400",
      href: "/admin/projects",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
        <p className="text-gray-400 text-sm mt-1">Visão geral da plataforma</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.color} border ${stat.borderColor} p-6 hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="rounded-xl bg-[#111118] border border-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-orange-400" />
            Projetos Recentes
          </h2>
          <Link href="/admin/projects" className="text-sm text-orange-400 hover:text-orange-300">
            Ver todos &rarr;
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="text-center py-12">
            <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum projeto cadastrado.</p>
            <Link href="/admin/projects" className="text-orange-400 hover:text-orange-300 text-sm mt-2 inline-block">
              Criar primeiro projeto &rarr;
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-[#1a1a24] border border-white/5 rounded-lg hover:border-white/10 transition-colors">
                <div>
                  <h4 className="font-medium text-sm">{project.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {getProjectTypeLabel(project.type)} &bull; Cliente: {project.client?.name || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={project.status} />
                  <span className="text-sm font-mono text-orange-400 w-12 text-right">
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
