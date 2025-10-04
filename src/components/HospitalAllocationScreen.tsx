import React, { useState } from 'react';
import { Building2, MapPin, Phone, Bed, Activity, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HospitalAllocationScreen: React.FC = () => {
  const { setCurrentScreen, hospitals, currentAccident, updateAccidentStatus } = useApp();
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [allocating, setAllocating] = useState(false);
  const [allocated, setAllocated] = useState(false);

  const handleAllocate = () => {
    if (!selectedHospital || !currentAccident) return;

    setAllocating(true);
    setTimeout(() => {
      setAllocating(false);
      setAllocated(true);
      updateAccidentStatus(currentAccident.id, 'InProgress');
    }, 2000);
  };

  const handleProceedToTimeline = () => {
    setCurrentScreen('timeline');
  };

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

  const sortedHospitals = [...hospitals].sort((a, b) => {
    const scoreA = (a.availableIcuBeds * 10) + (a.readinessPercentage) - ((a.distance || 0) * 5);
    const scoreB = (b.availableIcuBeds * 10) + (b.readinessPercentage) - ((b.distance || 0) * 5);
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentScreen('dispatch')}
          className="flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dispatch
        </button>

        <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">AI-Powered Hospital Allocation</h1>
          </div>
          <p className="text-blue-200">Optimal hospital selected based on distance, bed availability, and readiness</p>
        </div>

        {!allocated ? (
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {sortedHospitals.map((hospital, index) => (
              <div
                key={hospital.id}
                onClick={() => setSelectedHospital(hospital)}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border cursor-pointer transition-all duration-300 ${
                  selectedHospital.id === hospital.id
                    ? 'border-green-400/50 bg-green-500/10 scale-105 shadow-xl shadow-green-500/20'
                    : 'border-white/20 hover:border-white/30 hover:bg-white/15'
                }`}
              >
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Recommended
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{hospital.name}</h3>
                    <div className="flex items-center gap-1 text-blue-300 text-sm mt-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{hospital.distance} km away</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-300 text-sm flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        ICU Beds
                      </span>
                      <span className="text-white font-semibold">
                        {hospital.availableIcuBeds}/{hospital.totalIcuBeds}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                        style={{ width: `${(hospital.availableIcuBeds / hospital.totalIcuBeds) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-300 text-sm flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        Readiness
                      </span>
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

                  <div className="flex items-center gap-2 text-blue-300 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>{hospital.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl mb-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Hospital Allocated Successfully</h2>
              <p className="text-blue-200 text-lg mb-8">ICU bed reserved and medical team notified</p>

              <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-2xl font-bold text-white">{selectedHospital.name}</h3>
                    <p className="text-blue-300">{selectedHospital.distance} km • ETA: ~10 mins</p>
                  </div>
                  <div className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-400/50 rounded-full font-semibold">
                    Bed Reserved
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-blue-300 text-sm mb-1">ICU Availability</p>
                    <p className="text-white font-semibold">{selectedHospital.availableIcuBeds} beds free</p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm mb-1">Readiness Score</p>
                    <p className="text-white font-semibold">{selectedHospital.readinessPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm mb-1">Contact</p>
                    <p className="text-white font-semibold">{selectedHospital.phone}</p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-sm mb-1">Status</p>
                    <p className="text-green-300 font-semibold">Team Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!allocated ? (
          <button
            onClick={handleAllocate}
            disabled={allocating}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
          >
            {allocating ? (
              <>
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                Allocating & Reserving Bed...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Allocate {selectedHospital.name}
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleProceedToTimeline}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            View Rescue Timeline & Notifications
          </button>
        )}
      </div>
    </div>
  );
};
