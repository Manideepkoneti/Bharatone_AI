import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { Conversation, DomainId } from '../../types';
import { History, Search, MessageSquare, ArrowRight, Trash2, Calendar, Sparkles } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { StructuredResponse } from '../assistant/StructuredResponse';

interface HistoryViewProps {
  onReopenQuery: (queryText: string) => void;
  onNavigateToModule: (domain: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onReopenQuery, onNavigateToModule }) => {
  const { showToast } = useNotification();
  const [conversations, setConversations] = useState<Conversation[]>(() => StorageService.getConversations());
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(conversations[0] || null);
  const [search, setSearch] = useState('');
  const [filterDomain, setFilterDomain] = useState<string>('all');

  const filtered = conversations.filter((c) => {
    const matchesDomain = filterDomain === 'all' || c.domain === filterDomain;
    const matchesSearch = 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.summary.toLowerCase().includes(search.toLowerCase()) ||
      c.messages.some(m => m.content.toLowerCase().includes(search.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    localStorage.setItem('bharatone_conversations', JSON.stringify(updated));
    if (selectedConv?.id === id) {
      setSelectedConv(updated[0] || null);
    }
    showToast('Conversation Removed', 'Deleted from local session history.', 'info');
  };

  const domainColors: Record<DomainId, string> = {
    education: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
    agriculture: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    government: 'text-orange-400 bg-orange-950/40 border-orange-500/30',
    employment: 'text-indigo-400 bg-indigo-950/40 border-indigo-500/30',
    healthcare: 'text-rose-400 bg-rose-950/40 border-rose-500/30',
    finance: 'text-amber-400 bg-amber-950/40 border-amber-500/30'
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-xs font-semibold text-slate-300">
          <History className="w-3.5 h-3.5" />
          <span>Session Log</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          🕘 My Conversations & History
        </h1>
        <p className="text-sm text-slate-400">
          Review previous AI citizen inquiries, document roadmaps, and actionable guidance.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search past conversations..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        </div>

        <select
          value={filterDomain}
          onChange={(e) => setFilterDomain(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 cursor-pointer"
        >
          <option value="all">All Domains</option>
          <option value="education">🎓 Education</option>
          <option value="agriculture">🌾 Agriculture</option>
          <option value="government">🏛️ Public Services</option>
          <option value="employment">💼 Employment</option>
          <option value="healthcare">🏥 Healthcare</option>
          <option value="finance">💰 Finance</option>
        </select>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Conversation Cards */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-8 text-center glass-panel rounded-2xl border border-white/10 text-slate-400 text-xs">
              No conversations found matching your filter.
            </div>
          ) : (
            filtered.map((c) => {
              const isSelected = selectedConv?.id === c.id;
              const badgeClass = domainColors[c.domain] || 'text-white bg-slate-800';
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedConv(c)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative group ${
                    isSelected
                      ? 'bg-slate-800/90 border-orange-500/60 shadow-xl'
                      : 'glass-panel border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${badgeClass}`}>
                      {c.domain}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {c.timestamp}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-heading truncate">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {c.summary}
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-orange-400 font-medium group-hover:underline">
                      Review Guidance →
                    </span>
                    <button
                      onClick={(e) => handleDelete(c.id, e)}
                      title="Delete conversation"
                      className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Full Conversation Viewer */}
        <div className="lg:col-span-7">
          {selectedConv ? (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                    Session Log • {selectedConv.timestamp}
                  </span>
                  <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                    {selectedConv.title}
                  </h3>
                </div>

                {/* Reopen / Ask Further Button */}
                <button
                  onClick={() => onReopenQuery(selectedConv.messages[0]?.content || selectedConv.title)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask Follow-Up</span>
                </button>
              </div>

              {/* Messages Breakdown */}
              <div className="space-y-4">
                {selectedConv.messages.map((m) => (
                  <div key={m.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300">
                        {m.sender === 'user' ? 'Citizen Question' : 'BharatOne Guidance'}
                      </span>
                      <span className="text-[10px] text-slate-500">{m.timestamp}</span>
                    </div>

                    {m.analysis ? (
                      <StructuredResponse
                        analysis={m.analysis}
                        onNavigateToModule={onNavigateToModule}
                      />
                    ) : (
                      <p className="p-3.5 rounded-xl bg-slate-900 border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed font-telugu">
                        {m.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center text-slate-400 text-sm">
              Select any conversation from the list to view its complete structured output.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
