import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AmbulanceDispatchScreen: React.FC = () => {
  const { setCurrentScreen, ambulances, currentAccident, updateAccidentStatus } = useApp();
  const [selectedAmbulance, setSelectedAmbulance] = useState(ambulances.find(a => a.status === 'Available'));
  const [dispatching, setDispatching] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const [ambulancePosition, setAmbulancePosition] = useState({ lat: 13.625, lng: 79.410 });

  useEffect(() => {
    if (dispatched && selectedAmbulance && currentAccident) {
      const interval = setInterval(() => {
        setAmbulancePosition(prev => {
          const targetLat = currentAccident.latitude;
          const targetLng = currentAccident.longitude;
          const deltaLat = (targetLat - prev.lat) * 0.1;
          const deltaLng = (targetLng - prev.lng) * 0.1;

          if (Math.abs(targetLat - prev.lat) < 0.001 && Math.abs(targetLng - prev.lng) < 0.001) {
            clearInterval(interval);
            return prev;
          }

          return {
            lat: prev.lat + deltaLat,
            lng: prev.lng + deltaLng,
          };
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [dispatched, selectedAmbulance, currentAccident]);

  const handleDispatch = () => {
    if (!selectedAmbulance || !currentAccident) return;

    setDispatching(true);
    setTimeout(() => {
      setDispatching(false);
      setDispatched(true);
      updateAccidentStatus(currentAccident.id, 'Dispatched');
    }, 2000);
  };

  const handleProceedToHospital = () => {
    setCurrentScreen('hospital');
  };

  const availableAmbulances = ambulances.filter(a => a.status === 'Available');

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

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Navigation className="w-6 h-6 text-blue-400" />
                Ambulance Dispatch
              </h2>
              <div className="bg-red-500/20 border border-red-400/50 rounded-xl p-4 mb-4">
                <p className="text-red-300 font-semibold mb-2">Accident Location</p>
                <p className="text-white text-lg">{currentAccident.locationName}</p>
                <p className="text-blue-300 text-sm">{currentAccident.latitude}°N, {currentAccident.longitude}°E</p>
              </div>

              {!dispatched ? (
                <>
                  <h3 className="text-lg font-semibold text-white mb-3">Available Ambulances</h3>
                  <div className="space-y-3">
                    {availableAmbulances.map((ambulance) => (
                      <div
                        key={ambulance.id}
                        onClick={() => setSelectedAmbulance(ambulance)}
                        className={`bg-white/5 border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                          selectedAmbulance?.id === ambulance.id
                            ? 'border-green-400/50 bg-green-500/10 scale-[1.02]'
                            : 'border-white/10 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">{ambulance.vehicleNumber}</span>
                            </div>
                            <div>
                              <p className="text-white font-semibold">{ambulance.vehicleNumber}</p>
                              <p className="text-blue-300 text-sm flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {ambulance.driverName}
                              </p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-400/50 rounded-full text-xs font-semibold">
                            {ambulance.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-300 text-sm">
                          <Phone className="w-4 h-4" />
                          <span>{ambulance.driverPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-300 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{ambulance.currentLatitude}°N, {ambulance.currentLongitude}°E</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleDispatch}
                    disabled={!selectedAmbulance || dispatching}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  >
                    {dispatching ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        Dispatching...
                      </>
                    ) : (
                      <>
                        <Navigation className="w-5 h-5" />
                        Dispatch {selectedAmbulance?.vehicleNumber}
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-500/20 border border-green-400/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <p className="text-green-300 font-semibold text-lg">Ambulance Dispatched</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Vehicle:</span>
                        <span className="text-white font-semibold">{selectedAmbulance?.vehicleNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Driver:</span>
                        <span className="text-white font-semibold">{selectedAmbulance?.driverName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">ETA:</span>
                        <span className="text-green-300 font-semibold">~6 mins</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToHospital}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    Proceed to Hospital Allocation
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              Live Tracking Map
            </h3>
            <div className="relative bg-slate-800 rounded-xl overflow-hidden" style={{ height: '500px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20"></div>

              <div
                className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"
                style={{
                  top: '45%',
                  left: '55%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div
                className="absolute text-white text-xs bg-red-500/90 px-2 py-1 rounded whitespace-nowrap"
                style={{
                  top: '42%',
                  left: '55%',
                }}
              >
                Accident Site
              </div>

              {dispatched && selectedAmbulance && (
                <>
                  <div
                    className="absolute transition-all duration-500 ease-linear"
                    style={{
                      top: `${35 + (ambulancePosition.lat - 13.625) * 500}%`,
                      left: `${35 + (ambulancePosition.lng - 79.410) * 500}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-pulse">
                      <Navigation className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <line
                      x1={`${35 + (ambulancePosition.lat - 13.625) * 500}%`}
                      y1={`${35 + (ambulancePosition.lng - 79.410) * 500}%`}
                      x2="55%"
                      y2="45%"
                      stroke="url(#routeGradient)"
                      strokeWidth="3"
                      strokeDasharray="10,5"
                      className="animate-pulse"
                    />
                  </svg>
                </>
              )}

              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <p className="text-blue-200 text-sm">
                  {dispatched
                    ? '🚨 Live tracking enabled - Ambulance en route'
                    : '📍 Select an ambulance to begin dispatch'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
