"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MessageSquare,
  Bell,
  CheckCircle2,
  Circle,
  AlertCircle,
  Pause,
  TrendingUp,
  Send,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate, formatDateTime, getProjectTypeLabel, getPriorityLabel, getStageLabel, getStageColor, getStatusLabel, getProgressGradient } from "@/lib/utils";

interface Stage {
  id: string;
  name: string;
  description: string | null;
  order: number;
  status: string;
  completedAt: string | null;
  predictedEnd: string | null;
  notes: string | null;
}

interface Update {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: { name: string };
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  sender: { id: string; name: string; role: string };
}

interface ProjectDetail {
  id: string;
  name: string;
  type: string;
  description: string | null;
  status: string;
  progress: number;
  priority: string;
  notes: string | null;
  startDate: string;
  estimatedEnd: string | null;
  actualEnd: string | null;
  client: { name: string; email: string };
  teamMembers: { id: string; name: string; avatar: string | null }[];
  stages: Stage[];
  updates: Update[];
  messages: Message[];
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "timeline" | "updates" | "chat"
  >("overview");
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setProjectId(p.projectId));
  }, [params]);

  useEffect(() => {
    if (!projectId) return;

    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [projectId]);

  const tabs = [
    { id: "overview" as const, label: "Visão Geral", icon: TrendingUp },
    { id: "timeline" as const, label: "Timeline", icon: Clock },
    { id: "updates" as const, label: "Atualizações", icon: Bell },
    { id: "chat" as const, label: "Chat", icon: MessageSquare },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Carregando projeto...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Projeto não encontrado</h2>
        <a
          href="/hub/dashboard"
          className="text-orange-400 hover:text-orange-300"
        >
          Voltar ao dashboard
        </a>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <a
          href="/hub/dashboard"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </a>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        {project.description && (
          <p className="text-gray-400 mt-1">{project.description}</p>
        )}
      </div>

      {/* Progress */}
      <div className="rounded-xl bg-[#111118] border border-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Início: {formatDate(project.startDate)}
            </span>
            {project.estimatedEnd && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Previsão: {formatDate(project.estimatedEnd)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={project.status} />
            <span className="text-3xl font-bold text-orange-400">
              {project.progress}%
            </span>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${getProgressGradient(
              project.progress
            )}`}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111118] border border-white/5 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all flex-1 justify-center ${
              activeTab === tab.id
                ? "bg-orange-500/10 text-orange-400 font-medium"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && <OverviewTab project={project} />}
          {activeTab === "timeline" && <TimelineTab stages={project.stages} />}
          {activeTab === "updates" && <UpdatesTab updates={project.updates} />}
          {activeTab === "chat" && (
            <ChatTab projectId={projectId!} messages={project.messages} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ==================== SUB-TABS ==================== */

function OverviewTab({ project }: { project: ProjectDetail }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-xl bg-[#111118] border border-white/5 p-6">
        <h3 className="text-lg font-semibold mb-4">Informações do Projeto</h3>
        <div className="space-y-4">
          <InfoRow label="Tipo" value={getProjectTypeLabel(project.type)} />
          <InfoRow label="Status" value={getStatusLabel(project.status)} />
          <InfoRow label="Prioridade" value={getPriorityLabel(project.priority)} />
          <InfoRow
            label="Cliente"
            value={`${project.client.name} (${project.client.email})`}
          />
        </div>
      </div>

      <div className="rounded-xl bg-[#111118] border border-white/5 p-6">
        <h3 className="text-lg font-semibold mb-4">Equipe Responsável</h3>
        {project.teamMembers.length === 0 ? (
          <p className="text-gray-500 text-sm">Equipe ainda não definida.</p>
        ) : (
          <div className="space-y-3">
            {project.teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-700/30 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-orange-400">
                    {member.name?.[0] || "?"}
                  </span>
                </div>
                <span className="text-sm">{member.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {project.notes && (
        <div className="lg:col-span-2 rounded-xl bg-[#111118] border border-white/5 p-6">
          <h3 className="text-lg font-semibold mb-4">Observações Técnicas</h3>
          <p className="text-gray-400 text-sm whitespace-pre-wrap">
            {project.notes}
          </p>
        </div>
      )}
    </div>
  );
}

function TimelineTab({ stages }: { stages: Stage[] }) {
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-xl bg-[#111118] border border-white/5 p-6">
      <h3 className="text-lg font-semibold mb-6">Timeline do Projeto</h3>
      {sortedStages.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Timeline será definida em breve.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-8">
            {sortedStages.map((stage) => (
              <div key={stage.id} className="relative flex gap-4">
                <div className="relative z-10 shrink-0">
                  {stage.status === "COMPLETED" ? (
                    <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  ) : stage.status === "IN_PROGRESS" ? (
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center animate-pulse">
                      <Circle className="w-5 h-5 text-orange-400" />
                    </div>
                  ) : stage.status === "BLOCKED" ? (
                    <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center">
                      <Pause className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="pt-1.5">
                  <h4 className="font-medium">{stage.name}</h4>
                  {stage.description && (
                    <p className="text-sm text-gray-400 mt-0.5">
                      {stage.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-1.5">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${getStageColor(
                        stage.status
                      )}`}
                    >
                      {getStageLabel(stage.status)}
                    </span>
                    {stage.predictedEnd && (
                      <span className="text-xs text-gray-500">
                        Previsto: {formatDate(stage.predictedEnd)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UpdatesTab({ updates }: { updates: Update[] }) {
  return (
    <div className="rounded-xl bg-[#111118] border border-white/5 p-6">
      <h3 className="text-lg font-semibold mb-6">
        Histórico de Atualizações
      </h3>
      {updates.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Nenhuma atualização ainda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {updates.map((update) => (
            <div
              key={update.id}
              className="border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{update.title}</h4>
                <span className="text-xs text-gray-500">
                  {formatDateTime(update.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-400 whitespace-pre-wrap">
                {update.content}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Por: {update.author.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatTab({
  projectId,
  messages,
}: {
  projectId: string;
  messages: Message[];
}) {
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>(messages || []);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/hub/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, content: newMessage }),
      });
      if (res.ok) {
        const msg = await res.json();
        setLocalMessages((prev) => [...prev, msg]);
        setNewMessage("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="rounded-xl bg-[#111118] border border-white/5 flex flex-col"
      style={{ height: "500px" }}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {localMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Inicie uma conversa com a equipe.</p>
            </div>
          </div>
        ) : (
          localMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  msg.isMine
                    ? "bg-orange-500/20 border border-orange-500/30"
                    : "bg-[#1a1a24] border border-white/5"
                }`}
              >
                {!msg.isMine && (
                  <p className="text-[10px] text-orange-400 mb-1">
                    {msg.sender.name}
                  </p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className="text-[10px] text-gray-500 mt-1">
                  {formatDateTime(msg.createdAt)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={sending}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==================== HELPERS ==================== */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
