"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface Conversation {
  id: string;
  name: string;
  email: string;
  lastMessage: string;
  lastMessageAt: string;
  projectId: string;
  projectName: string;
  unread: number;
}

export default function AdminMessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConv) {
      fetchMessages(selectedConv);
    }
  }, [selectedConv]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchConversations() {
    try {
      const res = await fetch("/api/admin/messages?list=true");
      const data = await res.json();
      setConversations(data.conversations || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchMessages(projectId: string) {
    try {
      const res = await fetch(`/api/hub/messages?projectId=${projectId}`);
      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSend() {
    if (!newMessage.trim() || !selectedConv) return;
    try {
      const conv = conversations.find((c) => c.id === selectedConv);
      const res = await fetch("/api/hub/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: conv?.projectId, content: newMessage }),
      });
      if (res.ok) {
        const msg = await res.json();
        setMessages((prev) => [...prev, msg]);
        setNewMessage("");
        fetchConversations();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-orange-400" />
          Mensagens
        </h1>
        <p className="text-gray-400 text-sm mt-1">Conversas com clientes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ height: "calc(100vh - 200px)" }}>
        {/* Conversations List */}
        <div className="rounded-xl bg-[#111118] border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-sm font-medium text-gray-400">Conversas</h3>
          </div>
          <div className="overflow-y-auto" style={{ height: "calc(100% - 50px)" }}>
            {conversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Nenhuma conversa.</p>
              </div>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv.id)}
                  className={`w-full text-left p-4 border-b border-white/5 transition-colors ${
                    selectedConv === conv.id ? "bg-orange-500/5" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{conv.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[180px]">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="lg:col-span-2 rounded-xl bg-[#111118] border border-white/5 flex flex-col overflow-hidden">
          {!selectedConv ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Selecione uma conversa.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Selected conversation header */}
              {(() => {
                const conv = conversations.find((c) => c.id === selectedConv);
                return (
                  <div className="p-4 border-b border-white/5">
                    <p className="font-medium">{conv?.name}</p>
                    <p className="text-xs text-gray-500">
                      Projeto: {conv?.projectName}
                    </p>
                  </div>
                );
              })()}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-lg px-4 py-2.5 ${
                      msg.isMine
                        ? "bg-orange-500/20 border border-orange-500/30"
                        : "bg-[#1a1a24] border border-white/5"
                    }`}>
                      {!msg.isMine && <p className="text-[10px] text-orange-400 mb-1">{msg.sender?.name}</p>}
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{formatDateTime(msg.createdAt)}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Responder..."
                    className="flex-1 bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// formatDateTime is now imported from @/lib/utils
