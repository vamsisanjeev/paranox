import React from 'react';
import { ArrowLeft, Bell, Shield, Users, Building2, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NotificationsScreen: React.FC = () => {
  const { setCurrentScreen, notifications, markNotificationAsRead } = useApp();

  const getRecipientIcon = (type: string) => {
    switch (type) {
      case 'Police':
        return <Shield className="w-5 h-5" />;
      case 'Family':
        return <Users className="w-5 h-5" />;
      case 'Hospital':
        return <Building2 className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getRecipientColor = (type: string) => {
    switch (type) {
      case 'Police':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/50';
      case 'Family':
        return 'bg-green-500/20 text-green-300 border-green-400/50';
      case 'Hospital':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Bell className="w-8 h-8 text-blue-400" />
                Notifications
              </h1>
              <p className="text-blue-200">Real-time alerts for all rescue operations</p>
            </div>
            {unreadCount > 0 && (
              <div className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-400/50 rounded-full font-semibold">
                {unreadCount} Unread
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markNotificationAsRead(notification.id)}
              className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                notification.read
                  ? 'border-white/10 opacity-75 hover:opacity-100'
                  : 'border-white/30 shadow-xl hover:border-white/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 ${getRecipientColor(notification.recipientType)}`}>
                  {getRecipientIcon(notification.recipientType)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRecipientColor(notification.recipientType)}`}>
                        {notification.recipientType}
                      </span>
                      <span className="text-white font-semibold">{notification.recipientName}</span>
                    </div>
                    {!notification.read && (
                      <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0 animate-pulse"></div>
                    )}
                  </div>

                  <p className="text-blue-200 mb-3">{notification.message}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-300">{formatTime(notification.sentAt)}</span>
                    {notification.read && (
                      <span className="text-green-300 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Read
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 shadow-xl text-center">
            <Bell className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
            <p className="text-white text-xl font-semibold mb-2">No Notifications</p>
            <p className="text-blue-300">You're all caught up!</p>
          </div>
        )}

        <div className="mt-6 bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-3">Notification Recipients</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/5 rounded-xl p-4 border border-blue-400/30 text-center">
              <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Police</p>
              <p className="text-blue-300 text-xs">Auto-alert</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-green-400/30 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Family</p>
              <p className="text-green-300 text-xs">Instant SMS</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-purple-400/30 text-center">
              <Building2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Hospital</p>
              <p className="text-purple-300 text-xs">Real-time</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-yellow-400/30 text-center">
              <Bell className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">User</p>
              <p className="text-yellow-300 text-xs">App notify</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
