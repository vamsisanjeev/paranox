import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Accident, Ambulance, Hospital, Notification } from '../types';
import { mockUser, mockAccidents, mockAmbulances, mockHospitals, mockNotifications } from '../data/mockData';

type Screen = 'home' | 'report' | 'dispatch' | 'hospital' | 'timeline' | 'notifications' | 'analytics' | 'profile';

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  user: User;
  accidents: Accident[];
  ambulances: Ambulance[];
  hospitals: Hospital[];
  notifications: Notification[];
  currentAccident: Accident | null;
  setCurrentAccident: (accident: Accident | null) => void;
  createNewAccident: (data: Partial<Accident>) => Accident;
  updateAccidentStatus: (id: string, status: Accident['status']) => void;
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user] = useState<User>(mockUser);
  const [accidents, setAccidents] = useState<Accident[]>(mockAccidents);
  const [ambulances] = useState<Ambulance[]>(mockAmbulances);
  const [hospitals] = useState<Hospital[]>(mockHospitals);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [currentAccident, setCurrentAccident] = useState<Accident | null>(null);

  const createNewAccident = (data: Partial<Accident>): Accident => {
    const newAccident: Accident = {
      id: `accident-${Date.now()}`,
      accidentNumber: `#${Math.floor(Math.random() * 900) + 100}`,
      reporterId: user.id,
      latitude: data.latitude || 13.628,
      longitude: data.longitude || 79.419,
      locationName: data.locationName || 'Unknown Location',
      severity: data.severity || 'Moderate',
      aiVerified: data.aiVerified || false,
      status: data.status || 'Reported',
      createdAt: new Date().toISOString(),
      ...data,
    };
    setAccidents(prev => [newAccident, ...prev]);
    return newAccident;
  };

  const updateAccidentStatus = (id: string, status: Accident['status']) => {
    setAccidents(prev =>
      prev.map(acc =>
        acc.id === id ? { ...acc, status } : acc
      )
    );
    if (currentAccident?.id === id) {
      setCurrentAccident(prev => prev ? { ...prev, status } : null);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        user,
        accidents,
        ambulances,
        hospitals,
        notifications,
        currentAccident,
        setCurrentAccident,
        createNewAccident,
        updateAccidentStatus,
        markNotificationAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
