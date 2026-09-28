import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Language } from '../types';
import { StorageService } from '../services/storage';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => boolean;
  loginAsDemoPersona: (personaKey: 'student' | 'farmer' | 'citizen') => void;
  register: (userData: Omit<UserProfile, 'id' | 'createdAt'>) => boolean;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const DEMO_PERSONAS: Record<'student' | 'farmer' | 'citizen', UserProfile> = {
  student: {
    id: 'user-ravi-student',
    name: 'Ravi Kumar',
    email: 'ravi.student@bharatone.ai',
    preferredLanguage: 'te',
    location: 'Andhra Pradesh',
    district: 'Guntur',
    education: 'Undergraduate (B.Tech)',
    interests: ['Education Scholarships', 'Public Services'],
    createdAt: '2026-01-10'
  },
  farmer: {
    id: 'user-venkat-farmer',
    name: 'Venkat Rao',
    email: 'venkat.farmer@bharatone.ai',
    preferredLanguage: 'te',
    location: 'Telangana',
    district: 'Warangal',
    education: 'Secondary School',
    interests: ['Agriculture', 'PM-Kisan', 'Crop Advisory'],
    createdAt: '2026-02-04'
  },
  citizen: {
    id: 'user-priya-citizen',
    name: 'Priya Sharma',
    email: 'priya.sharma@bharatone.ai',
    preferredLanguage: 'hi',
    location: 'Uttar Pradesh',
    district: 'Lucknow',
    education: 'Postgraduate',
    interests: ['Public Services', 'Healthcare', 'Employment'],
    createdAt: '2026-02-14'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => StorageService.getUser());

  useEffect(() => {
    // If no user exists, set default student persona
    if (!user) {
      const defaultUser = DEMO_PERSONAS.student;
      setUser(defaultUser);
      StorageService.setUser(defaultUser);
    }
  }, []);

  const login = (email: string, _password?: string) => {
    const existing = StorageService.getUser();
    if (existing && existing.email.toLowerCase() === email.toLowerCase()) {
      setUser(existing);
      return true;
    }
    // Create session for user
    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
      email,
      preferredLanguage: 'en',
      location: 'Andhra Pradesh',
      district: 'Amaravati',
      education: 'Undergraduate',
      interests: ['Public Services', 'Education'],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    StorageService.setUser(newUser);
    return true;
  };

  const loginAsDemoPersona = (personaKey: 'student' | 'farmer' | 'citizen') => {
    const persona = DEMO_PERSONAS[personaKey];
    setUser(persona);
    StorageService.setUser(persona);
  };

  const register = (userData: Omit<UserProfile, 'id' | 'createdAt'>) => {
    const newUser: UserProfile = {
      ...userData,
      id: 'user-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    StorageService.setUser(newUser);
    return true;
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
    StorageService.setUser(updated);
  };

  const logout = () => {
    setUser(null);
    StorageService.setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemoPersona,
        register,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
