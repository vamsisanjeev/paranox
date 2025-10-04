import React from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, Ambulance, Building2, Bell, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockTimelineEvents } from '../data/mockData';

export const TimelineScreen: React.FC = () => {
  const { setCurrentScreen, currentAccident } = useApp();

  if (!currentAccident) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No active accident selected</p>
          <button
            onClick={() => setCurrentScreen('home')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'SOS':
        return <AlertTriangle className="w-5 h-5" />;
      case 'Verified':
        return <CheckCircle className="w-5 h-5" />;
      case 'Dispatched':
        return <Ambulance className="w-5 h-5" />;
      case 'Allocated':
        return <Building2 className="w-5 h-5" />;
      case 'Notified':
        return <Bell className="w-5 h-5" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'SOS':
        return 'bg-red-500/20 text-red-300 border-red-400/50';
      case 'Verified':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
      case 'Dispatched':
        return 'bg-blue-500/20 text-blue-300 border-blue-400/50';
      case 'Allocated':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/50';
      case 'Notified':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50';
      case 'Completed':
        return 'bg-green-500/20 text-green-300 border-green-400/50';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-400/50';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const timeline = mockTimelineEvents.filter(e => e.accidentId === currentAccident.id);

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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Rescue Timeline</h1>
              <p className="text-blue-200">Complete rescue operation history</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">{currentAccident.accidentNumber}</div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-2 ${
                currentAccident.severity === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-400/50' :
                currentAccident.severity === 'Moderate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50' :
                'bg-green-500/20 text-green-300 border border-green-400/50'
              }`}>
                {currentAccident.severity}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-blue-300 text-sm mb-1">Location</p>
              <p className="text-white font-semibold">{currentAccident.locationName}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-blue-300 text-sm mb-1">Status</p>
              <p className="text-white font-semibold">{currentAccident.status}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-blue-300 text-sm mb-1">Reported At</p>
              <p className="text-white font-semibold">{formatTime(currentAccident.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-400" />
            Timeline Events
          </h2>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

            <div className="space-y-6">
              {timeline.map((event, index) => (
                <div
                  key={event.id}
                  className="relative pl-20 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute left-4 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getEventColor(event.eventType)}`}>
                    {getEventIcon(event.eventType)}
                  </div>

                  <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:border-white/30">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{event.description}</h3>
                      <span className="text-blue-300 text-sm whitespace-nowrap ml-4">{formatTime(event.timestamp)}</span>
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getEventColor(event.eventType)}`}>
                      {event.eventType}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentAccident.completedAt && (
            <div className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-white">Rescue Completed Successfully</h3>
              </div>
              <p className="text-green-300">
                Total rescue time:{' '}
                <span className="font-bold">
                  {Math.floor((new Date(currentAccident.completedAt).getTime() - new Date(currentAccident.createdAt).getTime()) / 60000)} minutes
                </span>
              </p>
              <p className="text-blue-200 text-sm mt-1">Patient safely reached hospital within the Golden Hour</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setCurrentScreen('notifications')}
            className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            View Notifications
          </button>
          <button
            onClick={() => setCurrentScreen('analytics')}
            className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};
