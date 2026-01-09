
import { NavItem, Proposal, Claim, Policy } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie', path: '/', roles: ['Administrator', 'Manager', 'Agent', 'Client'] },
  { id: 'policies', label: 'My Policies', icon: 'fa-shield-heart', path: '/policies', roles: ['Client'] },
  { id: 'products', label: 'Browse Plans', icon: 'fa-layer-group', path: '/products', roles: ['Client', 'Agent', 'Administrator'] },
  { id: 'quotation', label: 'New Quotation', icon: 'fa-file-invoice-dollar', path: '/quotation', roles: ['Administrator', 'Agent'] },
  { id: 'fnol', label: 'Claims Center', icon: 'fa-file-signature', path: '/fnol', roles: ['Administrator', 'Manager', 'Agent', 'Client'] },
  { id: 'customers', label: 'Customer Directory', icon: 'fa-address-book', path: '/customers', roles: ['Administrator', 'Manager'] },
  { id: 'analytics', label: 'Underwriting Ops', icon: 'fa-microchip', path: '/analytics', roles: ['Administrator', 'Manager'] },
  { id: 'proposals', label: 'Proposal Archive', icon: 'fa-folder-open', path: '/proposals', roles: ['Administrator', 'Manager'] },
  { id: 'settings', label: 'Settings', icon: 'fa-sliders', path: '/settings', roles: ['Administrator'] },
];

export const MOCK_POLICIES: Policy[] = [
  { id: 'POL-8821', type: 'Residential Property', coverage: '$450,000', premium: 120, renewalDate: '2025-12-01', status: 'Active', docs: ['Terms.pdf', 'Summary.pdf'] },
  { id: 'POL-1022', type: 'Comprehensive Auto', coverage: '$50,000', premium: 85, renewalDate: '2025-06-15', status: 'Active', docs: ['AutoPolicy.pdf'] },
  { id: 'POL-5541', type: 'Term Life Insurance', coverage: '$1,000,000', premium: 45, renewalDate: '2026-01-10', status: 'Active', docs: ['LifePolicy.pdf'] },
];

export const MOCK_PROPOSALS: Proposal[] = [
  { id: 'PROP-2024-001', customer: 'Global Logistics Inc.', type: 'Commercial Auto', amount: 124500, status: 'Approved', date: '2024-05-20' },
  { id: 'PROP-2024-002', customer: 'Sarah Jenkins', type: 'Life Premium', amount: 1200, status: 'Draft', date: '2024-05-21' },
  { id: 'PROP-2024-003', customer: 'TechFlow Systems', type: 'Cyber Liability', amount: 45000, status: 'Sent', date: '2024-05-22' },
  { id: 'PROP-2024-004', customer: 'Riverdale Properties', type: 'Property', amount: 89000, status: 'Rejected', date: '2024-05-18' },
];

export const MOCK_CLAIMS: Claim[] = [
  { id: 'CLM-982', policyNumber: 'POL-8821', claimant: 'John Doe', status: 'In Review', dateReported: '2024-05-19', description: 'Small fire in the kitchen caused smoke damage.' },
  { id: 'CLM-983', policyNumber: 'POL-1022', claimant: 'John Doe', status: 'Pending', dateReported: '2024-05-21', description: 'Minor fender bender at the parking lot.' },
];

export const THEME = {
  primary: '#4a0e1e', // "msg" Corporate Maroon
  secondary: '#2d0611',
  accent: '#f4e9eb',
  surface: '#ffffff',
  background: '#f8fafc'
};
