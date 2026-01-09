
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './app/dashboard/page';
import AnalyticsPage from './app/analytics/page';
import FNOLPage from './app/fnol/page';
import LoginPage from './app/login/page';
import CustomersPage from './app/customers/page';
import ProductsPage from './app/products/page';
import MyPoliciesPage from './app/policies/page';
import { User } from './types';

// Placeholder "Pages"
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
    <div className="mt-8 p-12 bg-white border border-slate-200 rounded-[2rem] text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-construction text-slate-300 text-2xl"></i>
        </div>
        <p className="text-slate-500 font-medium">This administrative module is currently under secure development.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_session');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('auth_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('auth_session');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/fnol" element={<FNOLPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/policies" element={<MyPoliciesPage />} />
          
          <Route path="/quotation" element={<PlaceholderPage title="Quotation Engine" />} />
          <Route path="/proposals" element={<PlaceholderPage title="Proposal Archive" />} />
          <Route path="/settings" element={<PlaceholderPage title="Core Platform Settings" />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
