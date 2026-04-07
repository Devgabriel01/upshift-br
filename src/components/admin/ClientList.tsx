"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Trash2, Plus, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Modal } from "./Modal";
import { InputField, TextInput } from "./FormFields";
import { StatCard } from "./StatCards";
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

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", company: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      setClients(data.clients || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
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
    } catch (err) { console.error(err); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    try {
      await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
      fetchClients();
    } catch (err) { console.error(err); }
  };

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total de Clientes" value={clients.length} icon={Users} color="blue" />
        <StatCard label="Com Projetos Ativos" value={clients.filter(c => c._count.projects > 0).length} icon={Users} color="green" />
        <StatCard label="Sem Projetos" value={clients.filter(c => c._count.projects === 0).length} icon={Users} color="red" />
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, email ou empresa..."
            className="w-full bg-[#111118] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>

      {/* Client List */}
      <div className="rounded-xl bg-[#111118] border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">{search ? "Nenhum cliente encontrado." : "Nenhum cliente cadastrado."}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500/30 to-orange-700/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-400">{client.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-xs text-gray-500">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    {client.company && <p className="text-xs text-gray-400">{client.company}</p>}
                    <p className="text-xs text-gray-500">{client._count.projects} projeto{client._count.projects !== 1 ? "s" : ""}</p>
                  </div>
                  <span className="text-xs text-gray-600">{formatDate(client.createdAt)}</span>
                  <button onClick={() => handleDelete(client.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Novo Cliente" description="Cadastrar um novo cliente na plataforma">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nome" required><TextInput value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Nome completo" /></InputField>
          <InputField label="Email" required><TextInput type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="email@exemplo.com" /></InputField>
          <InputField label="Senha" required><TextInput type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="Mínimo 6 caracteres" /></InputField>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Telefone"><TextInput value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="(11) 99999-9999" /></InputField>
            <InputField label="Empresa"><TextInput value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Empresa (opcional)" /></InputField>
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50">
            {submitting ? "Criando..." : "Criar Cliente"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
