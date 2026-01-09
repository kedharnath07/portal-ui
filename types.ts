
export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Draft' | 'Sent' | 'Approved' | 'Rejected' | 'Pending' | 'In Review' | 'Active' | 'Inactive';
export type UserRole = 'Administrator' | 'Manager' | 'Agent' | 'Client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  memberSince?: string;
  tier?: 'Standard' | 'Preferred' | 'Elite';
  lastLogin?: string;
  preferences?: {
    notifications: boolean;
    smsAlerts: boolean;
    darkMode: boolean;
  };
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  roles?: UserRole[]; 
}

export interface Policy {
  id: string;
  type: string;
  coverage: string;
  premium: number;
  renewalDate: string;
  status: 'Active' | 'Pending' | 'Expired';
  docs: string[];
}

export interface InsuranceProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  priceEstimate: string;
  benefits: string[];
  icon: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  policyType: string;
  status: 'Active' | 'Pending' | 'Inactive';
  riskLevel: 'Low' | 'Medium' | 'High';
  joinedDate: string;
}

export interface Claim {
  id: string;
  policyNumber: string;
  claimant: string;
  status: Status;
  dateReported: string;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  dueDate: string;
  category: string;
}

export interface Proposal {
  id: string;
  customer: string;
  type: string;
  amount: number;
  status: Status;
  date: string;
}

export interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}
