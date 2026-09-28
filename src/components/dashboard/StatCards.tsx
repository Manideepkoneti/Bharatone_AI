import React, { useEffect, useState } from 'react';
import { StorageService, AppStats } from '../../services/storage';
import { Users, Sparkles, Globe, Layers } from 'lucide-react';

export const StatCards: React.FC = () => {
  const [stats, setStats] = useState<AppStats>(() => StorageService.getStats());
  const [displayedUsers, setDisplayedUsers] = useState(0);
  const [displayedInteractions, setDisplayedInteractions] = useState(0);

  useEffect(() => {
    const current = StorageService.getStats();
    setStats(current);

    // Smooth counter animation
    const duration = 1200; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setDisplayedUsers(Math.floor(progress * current.usersAssisted));
      setDisplayedInteractions(Math.floor(progress * current.aiInteractions));

      if (step >= steps) {
        setDisplayedUsers(current.usersAssisted);
        setDisplayedInteractions(current.aiInteractions);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const cards = [
    {
      label: 'Users Assisted',
      value: displayedUsers.toLocaleString(),
      subtext: '+18% this week',
      icon: Users,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    },
    {
      label: 'AI Interactions',
      value: displayedInteractions.toLocaleString(),
      subtext: 'Across 3 languages',
      icon: Sparkles,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/20'
    },
    {
      label: 'Regional Languages',
      value: stats.languagesCount,
      subtext: 'Telugu, Hindi, English',
      icon: Globe,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      label: 'Service Domains',
      value: stats.domainsCount,
      subtext: '3 Active + 3 Demo',
      icon: Layers,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 sm:p-5 rounded-2xl glass-panel border ${card.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">{card.label}</span>
              <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                {card.value}
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {card.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
