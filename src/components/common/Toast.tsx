import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { notifications, removeToast } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      {notifications.map((n) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
          error: <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
          info: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
        };

        const borderColors = {
          success: 'border-emerald-500/30 bg-emerald-950/80',
          warning: 'border-amber-500/30 bg-amber-950/80',
          error: 'border-rose-500/30 bg-rose-950/80',
          info: 'border-sky-500/30 bg-sky-950/80'
        };

        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${borderColors[n.type]}`}
          >
            {icons[n.type]}
            <div className="flex-1 text-sm">
              <h4 className="font-semibold text-white tracking-wide">{n.title}</h4>
              <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">{n.message}</p>
            </div>
            <button
              onClick={() => removeToast(n.id)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
