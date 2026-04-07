"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Calendar,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate, getProjectTypeLabel } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  progress: number;
  priority: string;
  description: string | null;
  notes: string | null;
  estimatedEnd: string | null;
  client: { id: string; name: string; email: string } | null;
  createdAt: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
}

const PROJECT_TYPES = [
  { value: "SITE", label: "Site" },
  { value: "SISTEMA", label: "Sistema" },
  { value: "APP", label: "Aplicativo" },
  { value: "LANDING_PAGE", label: "Landing Page" },
  { value: "AUTOMACAO", label: "Automação" },
  { value: "OUTRO", label: "Outro" },
];

const PROJECT_STATUS = [
  { value: "AGUARDANDO_BRIEFING", label: "Aguardando Briefing" },
  { value: "EM_PLANEJAMENTO", label: "Em Planejamento" },
  { value: "EM_DESIGN", label: "Em Design" },
  { value: "EM_DESENVOLVIMENTO", label: "Em Desenvolvimento" },
  { value: "EM_TESTES", label: "Em Testes" },
  { value: "EM_REVISAO", label: "Em Revisão" },
  { value: "PRONTO_PARA_ENTREGA", label: "Pronto para Entrega" },
  { value: "ENTREGUE", label: "Entregue" },
  { value: "EM_MANUTENCAO", label: "Em Manutenção" },
];

const PRIORITIES = [
  { value: "BAIXA", label: "Baixa" },
  { value: "MEDIA", label: "Média" },
  { value: "ALTA", label: "Alta" },
  { value: "URGENTE", label: "Urgente" },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", type: "SITE", description: "", clientId: "",
    estimatedEnd: "", priority: "MEDIA", notes: "", status: "AGUARDANDO_BRIEFING", progress: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [projectsRes, clientsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/admin/clients"),
      ]);
      const projectsData = await projectsRes.json();
      const clientsData = await clientsRes.json();
      setProjects(projectsData.projects || []);
      setClients(clientsData.clients || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        resetForm();
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate(id: string) {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        resetForm();
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este projeto?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  function resetForm() {
    setForm({ name: "", type: "SITE", description: "", clientId: "", estimatedEnd: "", priority: "MEDIA", notes: "", status: "AGUARDANDO_BRIEFING", progress: 0 });
    setShowModal(false);
    setEditingId(null);
  }

  function openEdit(project: Project) {
    setForm({
      name: project.name,
      type: project.type,
      description: project.description || "",
      clientId: project.client?.id || "",
      estimatedEnd: project.estimatedEnd ? new Date(project.estimatedEnd).toISOString().split("T")[0] : "",
      priority: project.priority,
      notes: project.notes || "",
      status: project.status,
      progress: project.progress,
    });
    setEditingId(project.id);
    setShowModal(true);
  }

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <FolderKanban className="w-6 h-6 text-orange-400" />
            Projetos
          </h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} projetos cadastrados</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar projeto ou cliente..."
          className="w-full bg-[#111118] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
        />
      </div>

      {/* Project List */}
      <div className="rounded-xl bg-[#111118] border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <FolderKanban className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum projeto encontrado.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{project.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {getProjectTypeLabel(project.type)}
                    </span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">
                      {project.client?.name || "Sem cliente"}
                    </span>
                    {project.estimatedEnd && (
                      <>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Prev.: {formatDate(project.estimatedEnd)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <StatusBadge status={project.status} />
                  <span className="text-sm font-mono text-orange-400 w-12 text-right">{project.progress}%</span>
                  <button onClick={() => openEdit(project)} className="p-1.5 rounded-lg text-gray-400 hover:text-orange-400 hover:bg-orange-500/5 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-[#111118] border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{editingId ? "Editar Projeto" : "Novo Projeto"}</h2>
              <button onClick={resetForm} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); editingId ? handleUpdate(editingId) : handleCreate(e); }} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Nome do Projeto *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome do projeto" required className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Tipo</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50">
                    {PROJECT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Prioridade</label>
                  <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50">
                    {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Cliente *</label>
                <select value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} required className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50">
                  <option value="">Selecionar cliente</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50">
                    {PROJECT_STATUS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Progresso (%)</label>
                  <input type="number" min={0} max={100} value={form.progress} onChange={(e) => setForm({ ...form, progress: parseInt(e.target.value) || 0 })} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Previsão de Entrega</label>
                <input type="date" value={form.estimatedEnd} onChange={(e) => setForm({ ...form, estimatedEnd: e.target.value })} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Descrição</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 resize-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Observações</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 resize-none" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all">
                {editingId ? "Salvar Alterações" : "Criar Projeto"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// Removed: StatusBadge, getProjectTypeLabel, formatDate are now imported from @/components/admin/StatusBadge and @/lib/utils
