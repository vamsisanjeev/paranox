import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Camera, Video, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Accident } from '../types';

export const AccidentReportScreen: React.FC = () => {
  const { setCurrentScreen, createNewAccident, setCurrentAccident } = useApp();
  const [step, setStep] = useState<'form' | 'verification' | 'dispatching'>('form');
  const [formData, setFormData] = useState({
    latitude: 13.628,
    longitude: 79.419,
    locationName: 'Tirupati Highway',
  });
  const [verifying, setVerifying] = useState(false);
  const [newAccident, setNewAccident] = useState<Accident | null>(null);

  useEffect(() => {
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    document.getElementById('timestamp')?.setAttribute('value', timestamp);
  }, []);

  const handleSubmit = () => {
    setStep('verification');
    setVerifying(true);

    setTimeout(() => {
      const accident = createNewAccident({
        ...formData,
        severity: 'Critical',
        aiVerified: true,
        status: 'Verified',
      });
      setNewAccident(accident);
      setVerifying(false);
    }, 3000);
  };

  const handleProceedToDispatch = () => {
    if (newAccident) {
      setCurrentAccident(newAccident);
      setCurrentScreen('dispatch');
    }
  };

  if (step === 'dispatching' || (step === 'verification' && !verifying && newAccident)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">AI Verification Complete</h2>
            <p className="text-blue-200 text-lg mb-8">Accident has been verified and classified</p>

            <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-300">Accident ID:</span>
                <span className="text-2xl font-bold text-white">{newAccident?.accidentNumber}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-300">Severity:</span>
                <span className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-400/50 rounded-full font-semibold">
                  Critical
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-300">Status:</span>
                <span className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-400/50 rounded-full font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Verified
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleProceedToDispatch}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Proceed to Ambulance Dispatch
              </button>
              <button
                onClick={() => setCurrentScreen('home')}
                className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'verification') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-blue-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">AI Verification in Progress</h2>
            <p className="text-blue-200 mb-6">Analyzing accident severity and authenticity...</p>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-3 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span>Location verified</span>
              </div>
              <div className="flex items-center gap-3 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span>Timestamp validated</span>
              </div>
              <div className="flex items-center gap-3 text-blue-300 animate-pulse">
                <div className="w-5 h-5 border-2 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
                <span>Classifying severity...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-6">Report Accident</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-blue-200 mb-2 font-medium">Location (Auto-filled GPS)</label>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-white font-semibold">{formData.locationName}</p>
                    <p className="text-blue-300 text-sm">
                      {formData.latitude}°N, {formData.longitude}°E
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-400/50 rounded-full text-xs font-semibold">
                    GPS Locked
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-blue-200 mb-2 font-medium">Timestamp (Auto-filled)</label>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <input
                  id="timestamp"
                  type="text"
                  value={new Date().toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                  readOnly
                  className="flex-1 bg-transparent text-white font-semibold outline-none"
                />
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/50 rounded-full text-xs font-semibold">
                  Live
                </span>
              </div>
            </div>

            <div>
              <label className="block text-blue-200 mb-2 font-medium">Additional Details (Optional)</label>
              <textarea
                placeholder="Describe the situation..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-blue-300/50 outline-none focus:border-blue-400/50 transition-colors resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-blue-200 mb-3 font-medium">Upload Evidence (Optional)</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-xl p-6 transition-all duration-300 group">
                  <Camera className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium">Photo</p>
                  <p className="text-blue-300 text-xs mt-1">Click to upload</p>
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-xl p-6 transition-all duration-300 group">
                  <Video className="w-8 h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium">Video</p>
                  <p className="text-blue-300 text-xs mt-1">Click to upload</p>
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-6 h-6" />
              Submit Emergency Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
