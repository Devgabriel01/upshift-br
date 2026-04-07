import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    AGUARDANDO_BRIEFING: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    EM_PLANEJAMENTO: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    EM_DESIGN: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    EM_DESENVOLVIMENTO: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    EM_TESTES: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    EM_REVISAO: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    PRONTO_PARA_ENTREGA: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    ENTREGUE: "bg-green-500/20 text-green-300 border-green-500/30",
    EM_MANUTENCAO: "bg-red-500/20 text-red-300 border-red-500/30",
  };
  return colors[status] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    AGUARDANDO_BRIEFING: "Aguardando Briefing",
    EM_PLANEJAMENTO: "Em Planejamento",
    EM_DESIGN: "Em Design",
    EM_DESENVOLVIMENTO: "Em Desenvolvimento",
    EM_TESTES: "Em Testes",
    EM_REVISAO: "Em Revisão",
    PRONTO_PARA_ENTREGA: "Pronto para Entrega",
    ENTREGUE: "Entregue",
    EM_MANUTENCAO: "Em Manutenção",
  };
  return labels[status] || status;
}

export function getStageLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: "Pendente",
    IN_PROGRESS: "Em Andamento",
    COMPLETED: "Concluída",
    BLOCKED: "Bloqueada",
  };
  return labels[status] || status;
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    BAIXA: "text-gray-400",
    MEDIA: "text-blue-400",
    ALTA: "text-orange-400",
    URGENTE: "text-red-400",
  };
  return colors[priority] || "text-gray-400";
}

export function getProjectTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    SITE: "Site",
    SISTEMA: "Sistema",
    APP: "Aplicativo",
    LANDING_PAGE: "Landing Page",
    AUTOMACAO: "Automação",
    OUTRO: "Outro",
  };
  return labels[type] || type;
}

export function getProgressGradient(progress: number): string {
  if (progress >= 100) return "bg-gradient-to-r from-green-500 to-green-400";
  if (progress >= 75) return "bg-gradient-to-r from-orange-500 to-orange-400";
  if (progress >= 50) return "bg-gradient-to-r from-orange-600 to-orange-500";
  if (progress >= 25) return "bg-gradient-to-r from-orange-700 to-orange-600";
  return "bg-gradient-to-r from-gray-600 to-gray-500";
}

export function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    BAIXA: "Baixa",
    MEDIA: "Média",
    ALTA: "Alta",
    URGENTE: "Urgente",
  };
  return labels[priority] || priority;
}

export function getStageColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    IN_PROGRESS: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    COMPLETED: "bg-green-500/20 text-green-400 border-green-500/30",
    BLOCKED: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return colors[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
}
