import React, { createContext, useContext, useState, useCallback } from 'react';
import { NotificationItem } from '../types';

interface NotificationContextType {
  notifications: NotificationItem[];
  showToast: (title: string, message: string, type?: NotificationItem['type']) => void;
  removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showToast = useCallback((title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const newItem: NotificationItem = {
      id,
      title,
      message,
      type,
      timestamp: Date.now()
    };

    setNotifications((prev) => [...prev, newItem]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <NotificationContext.Provider value={{ notifications, showToast, removeToast }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
