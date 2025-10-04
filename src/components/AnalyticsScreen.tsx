import React from 'react';
import { ArrowLeft, TrendingUp, MapPin, Ambulance, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockHotspots, ambulanceUsageData } from '../data/mockData';

export const AnalyticsScreen: React.FC = () => {
  const { setCurrentScreen, hospitals } = useApp();

  const maxUsage = Math.max(...ambulanceUsageData.map(d => d.usage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-400" />
            Predictive Analytics Dashboard
          </h1>
          <p className="text-blue-200">AI-powered insights for accident prevention and resource optimization</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-red-400" />
              Accident Hotspots
            </h2>
            <p className="text-blue-200 text-sm mb-4">High-risk zones requiring preventive measures</p>

            <div className="space-y-3">
              {mockHotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{hotspot.zoneName}</h3>
                      <p className="text-blue-300 text-xs">
                        {hotspot.latitude}°N, {hotspot.longitude}°E
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      hotspot.riskLevel === 'High'
                        ? 'bg-red-500/20 text-red-300 border-red-400/50'
                        : hotspot.riskLevel === 'Medium'
                        ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50'
                        : 'bg-green-500/20 text-green-300 border-green-400/50'
                    }`}>
                      {hotspot.riskLevel} Risk
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex-1">
                      <p className="text-blue-300 text-xs mb-1">Accidents Reported</p>
                      <p className="text-white font-bold text-lg">{hotspot.accidentCount}</p>
                    </div>
                    <div className="w-20 h-20 relative">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke={
                            hotspot.riskLevel === 'High'
                              ? '#ef4444'
                              : hotspot.riskLevel === 'Medium'
                              ? '#eab308'
                              : '#22c55e'
                          }
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(hotspot.accidentCount / 50) * 201} 201`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{Math.round((hotspot.accidentCount / 50) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Ambulance className="w-6 h-6 text-blue-400" />
              Ambulance Usage Pattern
            </h2>
            <p className="text-blue-200 text-sm mb-4">Peak hours for emergency dispatch</p>

            <div className="space-y-2">
              {ambulanceUsageData.map((data, index) => (
                <div key={index} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue-300 text-sm">{data.hour}</span>
                    <span className="text-white font-semibold">{data.usage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        data.usage >= 80
                          ? 'bg-gradient-to-r from-red-400 to-red-600'
                          : data.usage >= 50
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                          : 'bg-gradient-to-r from-green-400 to-green-600'
                      }`}
                      style={{
                        width: `${data.usage}%`,
                        animationDelay: `${index * 50}ms`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-red-500/20 border border-red-400/50 rounded-xl p-4">
              <p className="text-red-300 font-semibold mb-1">Peak Hours Alert</p>
              <p className="text-white text-sm">Highest activity: 8-10 PM (85-90% usage)</p>
              <p className="text-blue-200 text-xs mt-1">Consider additional resource allocation</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-400" />
            Hospital Readiness Overview
          </h2>
          <p className="text-blue-200 text-sm mb-4">Current capacity and preparedness scores</p>

          <div className="grid md:grid-cols-3 gap-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="text-white font-semibold mb-4 truncate">{hospital.name}</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-300 text-sm">ICU Beds</span>
                      <span className="text-white font-semibold">
                        {hospital.availableIcuBeds}/{hospital.totalIcuBeds}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${(hospital.availableIcuBeds / hospital.totalIcuBeds) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-300 text-sm">Readiness</span>
                      <span className="text-white font-semibold">{hospital.readinessPercentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          hospital.readinessPercentage >= 70
                            ? 'bg-gradient-to-r from-green-400 to-green-600'
                            : hospital.readinessPercentage >= 50
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                            : 'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${hospital.readinessPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <p className="text-blue-300 text-xs mb-1">Overall Status</p>
                    <p className={`font-semibold ${
                      hospital.readinessPercentage >= 70 ? 'text-green-300' :
                      hospital.readinessPercentage >= 50 ? 'text-yellow-300' : 'text-red-300'
                    }`}>
                      {hospital.readinessPercentage >= 70 ? 'Excellent' :
                       hospital.readinessPercentage >= 50 ? 'Good' : 'Needs Attention'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 shadow-xl">
            <p className="text-green-300 text-sm mb-1">Avg Response Time</p>
            <p className="text-white text-3xl font-bold">7.5 min</p>
            <p className="text-green-300 text-xs mt-1">↓ 15% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30 shadow-xl">
            <p className="text-blue-300 text-sm mb-1">Success Rate</p>
            <p className="text-white text-3xl font-bold">94.2%</p>
            <p className="text-blue-300 text-xs mt-1">↑ 3% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30 shadow-xl">
            <p className="text-purple-300 text-sm mb-1">Total Rescues</p>
            <p className="text-white text-3xl font-bold">1,247</p>
            <p className="text-purple-300 text-xs mt-1">This month</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/30 shadow-xl">
            <p className="text-yellow-300 text-sm mb-1">Golden Hour %</p>
            <p className="text-white text-3xl font-bold">89%</p>
            <p className="text-yellow-300 text-xs mt-1">Within 60 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};
