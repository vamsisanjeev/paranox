import React from 'react';
import { ArrowLeft, User, Phone, Droplet, Users, Award, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { setCurrentScreen, user, accidents } = useApp();

  const completedRescues = accidents.filter(a => a.status === 'Completed' && a.reporterId === user.id);

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
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">
                {user.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user.fullName}</h1>
              <p className="text-blue-200 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {user.phone}
              </p>
            </div>
            <div className="text-right">
              <div className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-400/50 rounded-full font-semibold mb-2">
                Verified User
              </div>
              <p className="text-blue-300 text-sm">Member since 2024</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Droplet className="w-5 h-5 text-red-400" />
                <span className="text-blue-300 text-sm">Blood Group</span>
              </div>
              <p className="text-white text-2xl font-bold">{user.bloodGroup}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-blue-300 text-sm">Rescues Saved</span>
              </div>
              <p className="text-white text-2xl font-bold">{completedRescues.length}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-green-400" />
                <span className="text-blue-300 text-sm">Avg Response</span>
              </div>
              <p className="text-white text-2xl font-bold">6.8 min</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-400" />
            Emergency Contact
          </h2>
          <div className="bg-white/5 rounded-xl p-5 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm mb-1">Contact Name</p>
                <p className="text-white text-xl font-semibold">{user.emergencyContactName}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-300 text-sm mb-1">Phone Number</p>
                <p className="text-white text-xl font-semibold">{user.emergencyContactPhone}</p>
              </div>
            </div>
            <div className="mt-4 bg-green-500/20 border border-green-400/50 rounded-lg p-3">
              <p className="text-green-300 text-sm">
                ✓ Auto-notified during emergencies via SMS and call
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-blue-400" />
            Past Rescue History
          </h2>
          <div className="space-y-4">
            {completedRescues.map((accident) => (
              <div
                key={accident.id}
                onClick={() => {
                  setCurrentScreen('timeline');
                }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl p-5 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-white">{accident.accidentNumber}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        accident.severity === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-400/50' :
                        accident.severity === 'Moderate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50' :
                        'bg-green-500/20 text-green-300 border border-green-400/50'
                      }`}>
                        {accident.severity}
                      </span>
                    </div>
                    <p className="text-blue-200 text-sm">{accident.locationName}</p>
                  </div>
                  <div className="text-right">
                    <div className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-400/50 rounded-full text-sm font-semibold flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Saved
                    </div>
                    <p className="text-blue-300 text-xs mt-2">
                      {new Date(accident.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {accident.completedAt && (
                  <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                    <div className="text-green-300 text-sm">
                      <span className="font-semibold">
                        {Math.floor((new Date(accident.completedAt).getTime() - new Date(accident.createdAt).getTime()) / 60000)} mins
                      </span>
                      {' '}total rescue time
                    </div>
                    <div className="text-blue-300 text-sm">
                      ✓ Within Golden Hour
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {completedRescues.length === 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-3 opacity-50" />
              <p className="text-white font-semibold mb-1">No rescue history yet</p>
              <p className="text-blue-300 text-sm">Your past emergency responses will appear here</p>
            </div>
          )}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-xl p-6 border border-blue-400/30 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-3">Safety Score</h3>
            <div className="flex items-end gap-4">
              <div className="text-5xl font-bold text-white">A+</div>
              <div className="flex-1 text-blue-200 text-sm">
                Excellent safety record with quick response times and proper emergency protocols
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-xl p-6 border border-green-400/30 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-3">Community Impact</h3>
            <div className="flex items-end gap-4">
              <div className="text-5xl font-bold text-white">{completedRescues.length}</div>
              <div className="flex-1 text-green-200 text-sm">
                Lives potentially saved through timely emergency reporting
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
