import React from 'react';
import { AlertCircle, Clock, MapPin, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeScreen: React.FC = () => {
  const { setCurrentScreen, setCurrentAccident, accidents, user } = useApp();

  const handleSOSClick = () => {
    setCurrentScreen('report');
  };

  const recentAccidents = accidents.slice(0, 3);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'text-red-500';
      case 'Moderate':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
            GARUDA
          </h1>
          <p className="text-blue-200 text-lg">AI-Powered Rescue Platform</p>
          <p className="text-blue-300 text-sm mt-1">Saving Lives in the Golden Hour</p>
        </div>

        <div className="relative flex justify-center items-center py-12">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-72 h-72 bg-red-500 rounded-full opacity-20 animate-ping" style={{ animationDuration: '2s' }}></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-64 h-64 bg-red-400 rounded-full opacity-30 animate-pulse"></div>
          </div>
          <button
            onClick={handleSOSClick}
            className="relative z-10 w-56 h-56 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-2xl flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-red-500/50 active:scale-95 group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <AlertCircle className="w-20 h-20 text-white mb-3 group-hover:animate-pulse" />
            <span className="text-white text-4xl font-bold tracking-wider">SOS</span>
            <span className="text-red-100 text-sm mt-2">Emergency</span>
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Quick Emergency Dial</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button className="bg-green-500/20 hover:bg-green-500/30 border border-green-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-105">
              <p className="text-green-300 font-semibold text-lg">Ambulance</p>
              <p className="text-white font-bold text-xl">108</p>
            </button>
            <button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-105">
              <p className="text-blue-300 font-semibold text-lg">Police</p>
              <p className="text-white font-bold text-xl">100</p>
            </button>
            <button className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 rounded-xl p-4 transition-all duration-300 hover:scale-105">
              <p className="text-red-300 font-semibold text-lg">Fire</p>
              <p className="text-white font-bold text-xl">101</p>
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Recent Rescue Logs</h2>
          </div>
          <div className="space-y-4">
            {recentAccidents.map((accident) => (
              <div
                key={accident.id}
                onClick={() => {
                  setCurrentAccident(accident);
                  setCurrentScreen('timeline');
                }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:border-white/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{accident.accidentNumber}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      accident.severity === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-400/50' :
                      accident.severity === 'Moderate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50' :
                      'bg-green-500/20 text-green-300 border border-green-400/50'
                    }`}>
                      {accident.severity}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    accident.status === 'Completed' ? 'bg-green-500/20 text-green-300 border border-green-400/50' :
                    'bg-blue-500/20 text-blue-300 border border-blue-400/50'
                  }`}>
                    {accident.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-blue-200 text-sm mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{accident.locationName}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-300 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(accident.createdAt)}</span>
                  {accident.completedAt && (
                    <span className="text-green-300">
                      • Rescued in {Math.floor((new Date(accident.completedAt).getTime() - new Date(accident.createdAt).getTime()) / 60000)} mins
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">{user.fullName.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{user.fullName}</h3>
              <p className="text-blue-200 text-sm">{user.phone}</p>
              <p className="text-blue-300 text-xs">Blood Group: {user.bloodGroup}</p>
            </div>
            <button
              onClick={() => setCurrentScreen('profile')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white text-sm font-medium transition-all duration-300"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
