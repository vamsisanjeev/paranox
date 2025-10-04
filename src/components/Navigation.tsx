import React from 'react';
import { Home, FileText, Ambulance, Building2, Clock, Bell, TrendingUp, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const { currentScreen, setCurrentScreen, notifications } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'report', icon: FileText, label: 'Report' },
    { id: 'dispatch', icon: Ambulance, label: 'Dispatch' },
    { id: 'hospital', icon: Building2, label: 'Hospital' },
    { id: 'timeline', icon: Clock, label: 'Timeline' },
    { id: 'notifications', icon: Bell, label: 'Alerts', badge: unreadCount },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'profile', icon: User, label: 'Profile' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id as any)}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-300 scale-110'
                    : 'text-blue-400/60 hover:text-blue-300 hover:bg-white/5'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white text-xs font-bold">{item.badge}</span>
                    </div>
                  )}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
