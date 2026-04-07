"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  createdAt: string;
  _count: { projects: number };
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", company: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      setClients(data.clients || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: "", email: "", password: "", phone: "", company: "" });
        setShowModal(false);
        fetchClients();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    try {
      const res = await fetch(`/api/admin/clients?id=${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: "", email: "", password: "", phone: "", company: "" });
        setShowModal(false);
        setEditingId(null);
        fetchClients();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    try {
      await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  }

  function openEdit(client: Client) {
    setForm({
      name: client.name,
      email: client.email,
      password: "",
      phone: client.phone || "",
      company: client.company || "",
    });
    setEditingId(client.id);
    setShowModal(true);
  }

  function resetForm() {
    setForm({ name: "", email: "", password: "", phone: "", company: "" });
    setShowModal(false);
    setEditingId(null);
  }

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(search.toLowerCase())
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
            <Users className="w-6 h-6 text-orange-400" />
            Clientes
          </h1>
          <p className="text-gray-400 text-sm mt-1">{clients.length} clientes cadastrados</p>
        </div>
        <button
          onClick={() => resetForm()}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome, email ou empresa..."
          className="w-full bg-[#111118] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
        />
      </div>

      {/* Client List */}
      <div className="rounded-xl bg-[#111118] border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum cliente encontrado.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Cliente</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Empresa</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Projetos</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Cadastro</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500/30 to-orange-700/30 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-400">{client.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-gray-500">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{client.company || "&mdash;"}</td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-mono text-orange-400">{client._count.projects}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{formatDate(client.createdAt)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(client)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-orange-400 hover:bg-orange-500/5 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-[#111118] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">{editingId ? "Editar Cliente" : "Novo Cliente"}</h2>
              <button onClick={resetForm} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); editingId ? handleUpdate(e) : handleCreate(e); }} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Nome *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nome completo"
                  required
                  className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@exemplo.com"
                  required
                  className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                />
              </div>
              {!editingId && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Senha *</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                    className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Telefone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Empresa</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Empresa (opcional)"
                    className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                {editingId ? "Salvar Alterações" : "Criar Cliente"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
