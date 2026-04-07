const STATUS_MAP: Record<string, { label: string; color: string }> = {
  AGUARDANDO_BRIEFING: { label: "Aguardando Briefing", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  EM_PLANEJAMENTO: { label: "Planejamento", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  EM_DESIGN: { label: "Design", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  EM_DESENVOLVIMENTO: { label: "Desenvolvimento", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  EM_TESTES: { label: "Testes", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  EM_REVISAO: { label: "Revisão", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
  PRONTO_PARA_ENTREGA: { label: "Pronto para Entrega", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  ENTREGUE: { label: "Entregue", color: "bg-green-500/20 text-green-300 border-green-500/30" },
  EM_MANUTENCAO: { label: "Manutenção", color: "bg-red-500/20 text-red-300 border-red-500/30" },
};

const PRIORITY_MAP: Record<string, { label?: string; icon?: string }> = {
  BAIXA: { icon: "text-gray-400" },
  MEDIA: { icon: "text-blue-400" },
  ALTA: { icon: "text-orange-400" },
  URGENTE: { icon: "text-red-400" },
};

const TYPE_MAP: Record<string, string> = {
  SITE: "Site",
  SISTEMA: "Sistema",
  APP: "Aplicativo",
  LANDING_PAGE: "Landing Page",
  AUTOMACAO: "Automação",
  OUTRO: "Outro",
};

const STAGE_MAP: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pendente", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  IN_PROGRESS: { label: "Em Andamento", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  COMPLETED: { label: "Concluída", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  BLOCKED: { label: "Bloqueada", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

interface StatusBadgeProps {
  status: string;
  type?: "project" | "stage" | "priority" | "type";
  size?: "sm" | "md";
}

export function StatusBadge({ status, type = "project", size = "sm" }: StatusBadgeProps) {
  if (type === "priority") {
    const c = PRIORITY_MAP[status] || {};
    return <span className={`${size === "sm" ? "text-xs" : "text-sm"} ${c.icon}`}>({status})</span>;
  }

  if (type === "type") {
    return <span className={`${size === "sm" ? "text-xs" : "text-sm"} text-gray-400`}>{TYPE_MAP[status] || status}</span>;
  }

  const map = type === "stage" ? STAGE_MAP : STATUS_MAP;
  const info = map[status] || { label: status, color: "bg-gray-500/20 text-gray-300 border-gray-500/30" };

  return (
    <span className={`inline-flex px-${size === "sm" ? "2" : "3"} py-${size === "sm" ? "0.5" : "1"} rounded-full border font-medium ${info.color} ${size === "md" ? "text-sm" : "text-[11px]"}`}>
      {info.label}
    </span>
  );
}

export { STATUS_MAP, TYPE_MAP, PRIORITY_MAP, STAGE_MAP };
