
import React, { useState, useEffect } from 'react';
import { Task, StatCard, User, Claim } from '../../types';
import { MOCK_PROPOSALS, MOCK_CLAIMS, MOCK_POLICIES } from '../../constants';
import { apiFetch } from '../../lib/api-client';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [aiInsight, setAiInsight] = useState("Analyzing your portfolio...");

  useEffect(() => {
    const saved = localStorage.getItem('auth_session');
    if (saved) setCurrentUser(JSON.parse(saved));

    const init = async () => {
      setLoading(true);
      try {
        const response = await apiFetch('/api/tasks', { method: 'POST' });
        if (response.ok) {
            const data = await response.json();
            setTasks(data);
        }
        // Mock AI Insight
        setTimeout(() => setAiInsight("Your coverage is 85% optimal. Adding Cyber Liability could reduce your overall risk profile by 12%."), 1500);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const isClient = currentUser?.role === 'Client';

  const chartData = [
    { name: 'Covered', value: 85, color: '#4a0e1e' },
    { name: 'Gap', value: 15, color: '#f1f5f9' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 pb-32">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-[#4a0e1e] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Priority</span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Control Center</h1>
          </div>
          <p className="text-slate-500 font-medium">Verified Identity: {currentUser?.name} | MSG Preferred Tier</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
          <Link to="/fnol" className="px-6 py-3 rounded-2xl bg-[#4a0e1e] text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center space-x-2">
            <i className="fas fa-file-signature"></i>
            <span>Report a Claim</span>
          </Link>
          <Link to="/products" className="px-6 py-3 rounded-2xl text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-all flex items-center space-x-2">
            <i className="fas fa-shopping-bag"></i>
            <span>Expand Coverage</span>
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: AI Coverage Score & Quick Stats */}
        <div className="xl:col-span-4 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4a0e1e] to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Coverage Integrity Score</h3>
            
            <div className="w-48 h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={60} outerRadius={80} startAngle={90} endAngle={450} paddingAngle={0} dataKey="value">
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 leading-none">85</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Excellent</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 w-full">
              <p className="text-[11px] font-bold text-slate-600 leading-relaxed italic">
                <i className="fas fa-sparkles text-amber-500 mr-2"></i>
                "{aiInsight}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#4a0e1e] p-6 rounded-[2rem] text-white shadow-xl shadow-maroon-900/20">
                <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Annual Prem.</p>
                <h4 className="text-xl font-black">$3,120</h4>
                <div className="mt-4 flex items-center text-[9px] font-black uppercase tracking-widest text-emerald-400">
                  <i className="fas fa-caret-up mr-1"></i> 2.4% Stability
                </div>
             </div>
             <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Active Claims</p>
                <h4 className="text-xl font-black text-slate-900">02</h4>
                <Link to="/fnol" className="mt-4 inline-block text-[9px] font-black uppercase tracking-widest text-[#4a0e1e] hover:underline">Track Status</Link>
             </div>
          </div>
        </div>

        {/* Right Column: Active Feed & Documents */}
        <div className="xl:col-span-8 space-y-8">
           <div className="bg-white border border-slate-100 rounded-[3rem] shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <h3 className="font-black uppercase tracking-widest text-xs text-slate-900">Portfolio Activity Stream</h3>
                <span className="text-[10px] font-bold text-slate-400">Real-time Updates Active</span>
              </div>
              <div className="p-8 space-y-6">
                 {MOCK_CLAIMS.map((claim, idx) => (
                   <div key={idx} className="flex items-start space-x-6 p-6 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${idx === 0 ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                        <i className={`fas ${idx === 0 ? 'fa-clock' : 'fa-magnifying-glass'} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-black text-slate-900 text-sm">Claim Update: {claim.id}</h4>
                          <span className="text-[10px] font-bold text-slate-300">{new Date(claim.dateReported).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-3 line-clamp-1">{claim.description}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${idx === 0 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: idx === 0 ? '45%' : '80%' }}></div>
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{idx === 0 ? 'Inspection Pending' : 'Final Review'}</span>
                        </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                 <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
                    <i className="fas fa-wallet text-9xl"></i>
                 </div>
                 <div className="relative z-10">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Digital Wallet</h5>
                    <p className="text-xl font-bold mb-6">Instant Access to ID Cards & Proof of Insurance</p>
                    <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                      Download Wallet Pass
                    </button>
                 </div>
              </div>

              <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 group">
                 <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">Renewal Pulse</h5>
                 <p className="text-xl font-bold text-slate-900 mb-6">Policy #POL-8821 is eligible for loyalty discount renewal.</p>
                 <Link to="/policies" className="inline-flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:translate-x-1 transition-transform">
                    <span>Explore Renewal Options</span>
                    <i className="fas fa-arrow-right"></i>
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
