
import React, { useState } from 'react';
import { MOCK_POLICIES } from '../../constants';
import { Link } from 'react-router-dom';

const MyPoliciesPage: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(MOCK_POLICIES[0]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 pb-32">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Portfolio Repository</h1>
          <p className="text-slate-500 font-medium">Your global coverage directory and immutable policy records.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white border border-slate-100 p-4 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm flex items-center space-x-2">
             <i className="fas fa-file-pdf text-rose-500"></i>
             <span>Export All Statements</span>
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Policy Selection List */}
        <div className="xl:col-span-4 space-y-4">
           {MOCK_POLICIES.map((policy) => (
             <div 
               key={policy.id} 
               onClick={() => setSelectedPolicy(policy)}
               className={`p-8 rounded-[3rem] border transition-all cursor-pointer group flex items-center justify-between ${
                 selectedPolicy.id === policy.id ? 'bg-[#4a0e1e] border-[#4a0e1e] text-white shadow-2xl shadow-maroon-900/30' : 'bg-white border-slate-50 shadow-sm hover:border-[#4a0e1e]/20 hover:bg-slate-50/50'
               }`}
             >
                <div className="flex items-center space-x-6">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                     selectedPolicy.id === policy.id ? 'bg-white/10 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-[#4a0e1e] group-hover:text-white'
                   }`}>
                      <i className={`fas ${policy.type.includes('Auto') ? 'fa-car' : policy.type.includes('Property') ? 'fa-home' : 'fa-heart'} text-xl`}></i>
                   </div>
                   <div>
                      <h4 className="font-black text-sm uppercase tracking-tighter leading-none mb-1">{policy.type}</h4>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${selectedPolicy.id === policy.id ? 'text-white/50' : 'text-slate-300'}`}>{policy.id}</p>
                   </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${policy.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'} shadow-[0_0_10px_rgba(52,211,153,0.5)]`}></div>
             </div>
           ))}
           <div className="p-8 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center space-y-3 cursor-pointer hover:border-[#4a0e1e]/30 group transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto text-slate-300 group-hover:text-[#4a0e1e] transition-colors">
                <i className="fas fa-plus"></i>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Add Outside Policy to Wallet</p>
           </div>
        </div>

        {/* Detailed Policy View */}
        <div className="xl:col-span-8 space-y-8 animate-in slide-in-from-right-12 duration-700">
           <div className="bg-white rounded-[4rem] border border-slate-50 shadow-sm overflow-hidden flex flex-col">
              <div className="p-12 bg-slate-50/50 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-emerald-500">
                       <i className="fas fa-shield-check"></i>
                       <span className="text-[10px] font-black uppercase tracking-widest">Policy in Force & Active</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">{selectedPolicy.type}</h2>
                    <div className="flex items-baseline space-x-4">
                       <span className="text-4xl font-black text-[#4a0e1e]">{selectedPolicy.coverage}</span>
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Aggregate Limit</span>
                    </div>
                    <div className="pt-4">
                      <Link 
                        to="/fnol"
                        className="inline-flex items-center space-x-3 bg-rose-50 text-rose-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-100"
                      >
                        <i className="fas fa-file-circle-exclamation"></i>
                        <span>Report Incident for this Policy</span>
                      </Link>
                    </div>
                 </div>
                 <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Renewal Pulse</p>
                          <p className="text-sm font-bold text-slate-700">{new Date(selectedPolicy.renewalDate).toLocaleDateString()}</p>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Premium Frequency</p>
                          <p className="text-sm font-bold text-slate-700">Monthly Billing</p>
                       </div>
                    </div>
                    <div className="p-6 bg-[#4a0e1e] rounded-3xl text-white shadow-xl shadow-maroon-900/20 flex items-center justify-between">
                       <div>
                          <p className="text-[9px] font-black uppercase tracking-widest opacity-50">Current Monthly</p>
                          <p className="text-2xl font-black">${selectedPolicy.premium}</p>
                       </div>
                       <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Manage Auto-Pay</button>
                    </div>
                 </div>
              </div>

              <div className="p-12 space-y-12">
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-2">Core Benefits at a Glance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {[
                         { label: 'Loss of Use', value: '100% Coverage', icon: 'fa-house-damage' },
                         { label: 'Liability', value: '$1M Minimum', icon: 'fa-user-shield' },
                         { label: 'Medical Pay', value: '$10k / person', icon: 'fa-hospital-user' },
                       ].map((b, i) => (
                         <div key={i} className="p-6 rounded-3xl border border-slate-50 bg-slate-50/20 space-y-3 group hover:border-[#4a0e1e]/20 transition-all">
                            <i className={`fas ${b.icon} text-slate-300 group-hover:text-[#4a0e1e] transition-colors`}></i>
                            <div>
                               <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{b.label}</p>
                               <p className="text-xs font-black text-slate-800">{b.value}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-2">Official Policy Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {selectedPolicy.docs.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-5 rounded-3xl border border-slate-100 bg-white hover:bg-slate-50 transition-all group cursor-pointer">
                             <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                                   <i className="fas fa-file-pdf"></i>
                                </div>
                                <span className="text-xs font-bold text-slate-700">{doc}</span>
                             </div>
                             <i className="fas fa-download text-slate-200 group-hover:text-slate-400 transition-colors"></i>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="flex justify-end items-center space-x-4 pt-8 border-t border-slate-50">
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#4a0e1e] transition-colors">Request Policy Amendment</button>
                    <button className="bg-[#4a0e1e] text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-maroon-900/20 hover:scale-105 active:scale-95 transition-all">
                      Immediate Renewal
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MyPoliciesPage;
