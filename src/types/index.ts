export interface User {
  id: string;
  fullName: string;
  phone: string;
  bloodGroup: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface Hospital {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distance?: number;
  totalIcuBeds: number;
  availableIcuBeds: number;
  phone: string;
  readinessPercentage: number;
}

export interface Ambulance {
  id: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  status: 'Available' | 'Busy' | 'Offline';
  currentLatitude: number;
  currentLongitude: number;
}

export interface Accident {
  id: string;
  accidentNumber: string;
  reporterId: string;
  latitude: number;
  longitude: number;
  locationName: string;
  severity: 'Critical' | 'Moderate' | 'Low';
  aiVerified: boolean;
  photoUrl?: string;
  videoUrl?: string;
  status: 'Reported' | 'Verified' | 'Dispatched' | 'InProgress' | 'Completed';
  assignedAmbulanceId?: string;
  assignedHospitalId?: string;
  createdAt: string;
  completedAt?: string;
}

export interface TimelineEvent {
  id: string;
  accidentId: string;
  timestamp: string;
  eventType: 'SOS' | 'Verified' | 'Dispatched' | 'Allocated' | 'Notified' | 'Completed';
  description: string;
}

export interface Notification {
  id: string;
  accidentId: string;
  recipientType: 'Police' | 'Family' | 'Hospital' | 'User';
  recipientName: string;
  message: string;
  sentAt: string;
  read: boolean;
}

export interface Hotspot {
  id: string;
  zoneName: string;
  latitude: number;
  longitude: number;
  accidentCount: number;
  riskLevel: 'High' | 'Medium' | 'Low';
}
