import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Download, 
  Users, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const AdminView: React.FC = () => {
  const { showToast } = useNotification();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [queryLogs, setQueryLogs] = useState([
    { id: 'log-1', user: 'Ravi Kumar', domain: 'Education', intent: 'Scholarship Guidance', language: 'Telugu', timestamp: 'Today, 10:42 AM', status: 'Completed', latency: '420ms' },
    { id: 'log-2', user: 'Venkat Rao', domain: 'Agriculture', intent: 'Crop Yellowing Advisory', language: 'Telugu', timestamp: 'Today, 10:28 AM', status: 'Completed', latency: '510ms' },
    { id: 'log-3', user: 'Priya Sharma', domain: 'Government', intent: 'Income Certificate', language: 'English', timestamp: 'Today, 09:15 AM', status: 'Completed', latency: '390ms' },
    { id: 'log-4', user: 'Anand Verma', domain: 'Finance', intent: 'UPI Scam Alert', language: 'Hindi', timestamp: 'Yesterday, 04:30 PM', status: 'Completed', latency: '460ms' },
    { id: 'log-5', user: 'Suresh Babu', domain: 'Education', intent: 'AICTE Pragati Check', language: 'Telugu', timestamp: 'Yesterday, 02:10 PM', status: 'Follow-up', latency: '620ms' },
    { id: 'log-6', user: 'Lakshmi Devi', domain: 'Agriculture', intent: 'Rice Blast Fungus', language: 'Telugu', timestamp: 'Yesterday, 11:45 AM', status: 'Completed', latency: '580ms' },
    { id: 'log-7', user: 'Kiran Patel', domain: 'Employment', intent: 'Career Roadmap SWAYAM', language: 'English', timestamp: 'Sep 26, 06:20 PM', status: 'Completed', latency: '410ms' }
  ]);

  const filteredLogs = queryLogs.filter((log) => {
    const matchesStatus = statusFilter === 'all' || log.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = 
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.intent.toLowerCase().includes(search.toLowerCase()) ||
      log.domain.toLowerCase().includes(search.toLowerCase()) ||
      log.language.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = 'ID,User,Domain,Intent,Language,Timestamp,Status,Latency\n';
    const rows = filteredLogs.map(l => `${l.id},"${l.user}","${l.domain}","${l.intent}","${l.language}","${l.timestamp}","${l.status}","${l.latency}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bharatone_admin_logs_${Date.now()}.csv`;
    a.click();
    showToast('Export Success', 'Citizen logs exported to CSV file.', 'success');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Administrator Console</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            🛡️ BharatOne Admin Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Real-time inference telemetry, user session audit, intent distribution, and query telemetry.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Query Logs (CSV)</span>
        </button>
      </div>

      {/* Admin KPI Cards (Section 21) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
          <p className="text-[11px] font-semibold text-slate-400">Total Registered</p>
          <p className="text-2xl font-black text-white font-heading">426</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+12 today</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
          <p className="text-[11px] font-semibold text-slate-400">Active Sessions</p>
          <p className="text-2xl font-black text-sky-400 font-heading">84</p>
          <span className="text-[10px] text-slate-400 font-semibold">Concurrent users</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
          <p className="text-[11px] font-semibold text-slate-400">AI Invocations</p>
          <p className="text-2xl font-black text-orange-400 font-heading">1,248</p>
          <span className="text-[10px] text-emerald-400 font-semibold">99.4% Success</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
          <p className="text-[11px] font-semibold text-slate-400">Avg Inference</p>
          <p className="text-2xl font-black text-emerald-400 font-heading">480ms</p>
          <span className="text-[10px] text-slate-400 font-semibold">Sub-second</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1 col-span-2 lg:col-span-1">
          <p className="text-[11px] font-semibold text-slate-400">Top Domain</p>
          <p className="text-xl font-black text-cyan-300 font-heading truncate">Education (38%)</p>
          <span className="text-[10px] text-slate-400 font-semibold">Scholarships</span>
        </div>
      </div>

      {/* Query Logs Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white font-heading">
            Live Citizen Query Logs
          </h3>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user, domain, intent..."
                className="bg-slate-900 border border-slate-700 rounded-xl py-1.5 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-emerald-500 w-48 sm:w-64"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="follow-up">Follow-up</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Domain</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{log.user}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-200">
                      {log.domain}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-orange-300 truncate max-w-[200px]">{log.intent}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-sky-400">{log.language}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{log.latency}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
