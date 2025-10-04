import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { AccidentReportScreen } from './components/AccidentReportScreen';
import { AmbulanceDispatchScreen } from './components/AmbulanceDispatchScreen';
import { HospitalAllocationScreen } from './components/HospitalAllocationScreen';
import { TimelineScreen } from './components/TimelineScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { ProfileScreen } from './components/ProfileScreen';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'report' && <AccidentReportScreen />}
      {currentScreen === 'dispatch' && <AmbulanceDispatchScreen />}
      {currentScreen === 'hospital' && <HospitalAllocationScreen />}
      {currentScreen === 'timeline' && <TimelineScreen />}
      {currentScreen === 'notifications' && <NotificationsScreen />}
      {currentScreen === 'analytics' && <AnalyticsScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
      <Navigation />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
