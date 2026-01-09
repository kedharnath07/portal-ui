
import React, { useState, useEffect } from 'react';
import { MOCK_CLAIMS, MOCK_POLICIES } from '../../constants';
import { Claim } from '../../types';

const FNOLPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('history');
  const [step, setStep] = useState(1);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [analyzingEvidence, setAnalyzingEvidence] = useState(false);

  const [formData, setFormData] = useState({
    policyId: MOCK_POLICIES[0].id,
    date: '',
    description: '',
    location: '',
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleEvidenceUpload = () => {
    setAnalyzingEvidence(true);
    setTimeout(() => {
      setAnalyzingEvidence(false);
      nextStep();
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const startNewClaim = () => {
    setActiveTab('new');
    setStep(1);
    setSubmitted(false);
    setSelectedClaim(null);
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Pending': return 1;
      case 'In Review': return 2;
      case 'Processing': return 3;
      case 'Approved': return 4;
      default: return 1;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Claims Terminal</h1>
          <p className="text-slate-500 font-medium">Resolution velocity tracked in real-time by MSG AI.</p>
        </div>
        <div className="flex bg-white p-1 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
          <button 
            onClick={() => setActiveTab('new')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'new' ? 'bg-[#4a0e1e] text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
          >
            Report Incident
          </button>
          <button 
            onClick={() => { setActiveTab('history'); setSelectedClaim(null); }}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-[#4a0e1e] text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
          >
            Incident Logs
          </button>
        </div>
      </header>

      {activeTab === 'new' ? (
        <div className="max-w-4xl mx-auto">
          {!submitted ? (
            <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-50 overflow-hidden flex flex-col min-h-[600px] animate-in slide-in-from-bottom-10">
              <div className="p-10 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-[#4a0e1e] rounded-3xl flex items-center justify-center text-white text-2xl shadow-xl shadow-maroon-900/20">
                       <i className="fas fa-file-shield"></i>
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-slate-900">Incident Filing</h2>
                       <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Rapid Settlement Protocol v4.2</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-2 rounded-full transition-all duration-700 ${step === i ? 'w-12 bg-[#4a0e1e]' : step > i ? 'w-4 bg-emerald-500' : 'w-4 bg-slate-200'}`}></div>
                    ))}
                 </div>
              </div>

              <div className="flex-1 p-12 overflow-y-auto">
                {step === 1 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8">
                     <h3 className="text-xl font-black text-slate-800">Identify Policy & Timestamp</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Affected Coverage</label>
                           <select className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-[#4a0e1e]/5">
                             {MOCK_POLICIES.map(p => <option key={p.id}>{p.type} ({p.id})</option>)}
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Incident Date/Time</label>
                           <input type="datetime-local" className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-5 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-[#4a0e1e]/5" />
                        </div>
                     </div>
                     <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-start space-x-4">
                        <i className="fas fa-info-circle text-blue-500 mt-1"></i>
                        <p className="text-xs text-blue-800 font-medium leading-relaxed">Early reporting enables our "Same-Day Payout" eligibility check. Your data is protected by enterprise-grade encryption.</p>
                     </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8 text-center py-10">
                     <h3 className="text-xl font-black text-slate-800">Visual Evidence Intake</h3>
                     <p className="text-slate-500 text-sm max-w-sm mx-auto">Upload high-resolution photos of the damage. Our AI will automatically categorize the loss severity.</p>
                     
                     <div 
                        onClick={handleEvidenceUpload}
                        className={`border-4 border-dashed rounded-[3rem] p-16 transition-all cursor-pointer group flex flex-col items-center space-y-6 ${
                           analyzingEvidence ? 'bg-slate-50 border-emerald-200' : 'bg-slate-50/30 border-slate-100 hover:border-[#4a0e1e]/30 hover:bg-white'
                        }`}
                     >
                        {analyzingEvidence ? (
                          <div className="flex flex-col items-center space-y-4">
                             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl animate-pulse">
                                <i className="fas fa-brain"></i>
                             </div>
                             <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">AI Vision Analyzing Damage...</p>
                          </div>
                        ) : (
                          <>
                            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-slate-300 group-hover:text-[#4a0e1e] group-hover:scale-110 transition-all shadow-sm">
                               <i className="fas fa-cloud-upload-alt text-3xl"></i>
                            </div>
                            <div>
                               <p className="text-sm font-black text-slate-800 uppercase tracking-widest">Drop Photos Here</p>
                               <p className="text-[10px] text-slate-400 font-bold mt-1">Accepts JPG, PNG, MP4 up to 50MB</p>
                            </div>
                          </>
                        )}
                     </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8">
                     <h3 className="text-xl font-black text-slate-800">Narrative & Context</h3>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Incident Summary</label>
                        <textarea 
                           className="w-full h-48 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 text-sm font-medium text-slate-700 outline-none focus:ring-4 focus:ring-[#4a0e1e]/5 resize-none"
                           placeholder="Describe the circumstances leading up to the incident..."
                        ></textarea>
                     </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8 animate-in slide-in-from-right-8">
                     <h3 className="text-xl font-black text-slate-800">Final Verification</h3>
                     <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 space-y-6">
                        <div className="flex items-center space-x-6">
                           <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl">
                              <i className="fas fa-check-double"></i>
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900">AI Pre-Approval Rating: High</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">Evidence consistency verified at 98.4%</p>
                           </div>
                        </div>
                        <div className="pt-6 border-t border-slate-200 flex items-start space-x-4">
                           <input type="checkbox" required className="mt-1 w-5 h-5 rounded border-slate-300 text-[#4a0e1e] focus:ring-[#4a0e1e]" />
                           <p className="text-xs text-slate-500 font-medium leading-relaxed">I confirm that all provided information is accurate. Fraudulent claims are subject to immediate termination of all MSG Group policies and legal prosecution.</p>
                        </div>
                     </div>
                  </div>
                )}
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
                 <button 
                    onClick={prevStep}
                    disabled={step === 1 || submitting}
                    className="px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all"
                 >
                    Back
                 </button>
                 {step < 4 ? (
                    <button 
                       onClick={nextStep}
                       className="bg-[#4a0e1e] text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-maroon-900/20 hover:scale-105 active:scale-95 transition-all"
                    >
                       Continue
                    </button>
                 ) : (
                    <button 
                       onClick={handleSubmit}
                       disabled={submitting}
                       className="bg-[#4a0e1e] text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-maroon-900/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-3"
                    >
                       {submitting ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                       <span>{submitting ? 'Authenticating...' : 'Submit Claim'}</span>
                    </button>
                 )}
              </div>
            </div>
          ) : (
            <div className="bg-white p-24 rounded-[4rem] shadow-2xl border border-slate-100 text-center space-y-8 animate-in zoom-in-95">
               <div className="w-28 h-28 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-5xl shadow-xl shadow-emerald-500/10 mb-4">
                  <i className="fas fa-rocket"></i>
               </div>
               <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Deployment Successful</h2>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto mt-4 text-sm leading-relaxed">
                     Incident <strong>#CLM-{(Math.random() * 1000).toFixed(0)}</strong> has been injected into our high-speed settlement queue. Expect an update within 60 minutes.
                  </p>
               </div>
               <div className="flex justify-center space-x-4 pt-6">
                  <button 
                    onClick={() => { setSubmitted(false); setStep(1); setActiveTab('history'); }}
                    className="bg-slate-900 text-white px-10 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                  >
                    Track Real-time Status
                  </button>
               </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
           <div className={`${selectedClaim ? 'xl:col-span-4' : 'xl:col-span-12'} space-y-4 transition-all duration-700`}>
              {/* Added: "Start New Claim" Card at the top of history */}
              {!selectedClaim && (
                <div 
                  onClick={startNewClaim}
                  className="p-8 bg-[#4a0e1e] rounded-[3rem] border border-[#4a0e1e] cursor-pointer transition-all flex items-center justify-between group shadow-xl shadow-maroon-900/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-white/10 rounded-[1.5rem] flex items-center justify-center text-white">
                      <i className="fas fa-plus text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-black text-white text-lg leading-tight uppercase tracking-tight italic">File a New Claim</h4>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Start Settlement Protocol</p>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-white/20 group-hover:translate-x-1 transition-transform"></i>
                </div>
              )}

              {MOCK_CLAIMS.map((claim) => (
                <div 
                   key={claim.id} 
                   onClick={() => setSelectedClaim(claim)}
                   className={`p-8 bg-white rounded-[3rem] border cursor-pointer transition-all flex items-center justify-between group ${
                     selectedClaim?.id === claim.id ? 'border-[#4a0e1e] shadow-2xl shadow-maroon-900/5 bg-slate-50/50' : 'border-slate-100 shadow-sm hover:border-[#4a0e1e]/30'
                   }`}
                >
                   <div className="flex items-center space-x-6">
                      <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 ${
                        selectedClaim?.id === claim.id ? 'bg-[#4a0e1e] text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-[#4a0e1e] group-hover:text-white'
                      }`}>
                         <i className="fas fa-file-invoice-dollar text-xl"></i>
                      </div>
                      <div>
                         <h4 className="font-black text-slate-900 text-lg leading-tight">{claim.id}</h4>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{claim.policyNumber}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${
                        claim.status === 'In Review' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {claim.status}
                      </span>
                      <p className="text-[10px] text-slate-300 font-bold mt-2 uppercase">{new Date(claim.dateReported).toLocaleDateString()}</p>
                   </div>
                </div>
              ))}
           </div>

           {selectedClaim && (
             <div className="xl:col-span-8 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl animate-in slide-in-from-right-12 duration-700 overflow-hidden h-fit sticky top-24">
                <div className="p-10 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-[#4a0e1e] text-white rounded-2xl flex items-center justify-center text-xs">
                        <i className="fas fa-search-dollar"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">Status Matrix</h3>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Case ID: {selectedClaim.id}</p>
                      </div>
                   </div>
                   <button onClick={() => setSelectedClaim(null)} className="w-12 h-12 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors">
                     <i className="fas fa-times"></i>
                   </button>
                </div>

                <div className="p-12 space-y-12">
                   <div className="relative">
                      <div className="absolute top-6 left-0 w-full h-1 bg-slate-100 rounded-full"></div>
                      <div 
                         className="absolute top-6 left-0 h-1 bg-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                         style={{ width: `${(getStatusStep(selectedClaim.status) / 4) * 100}%` }}
                      ></div>
                      
                      <div className="relative flex justify-between">
                         {[
                           { label: 'Intake', icon: 'fa-paper-plane' },
                           { label: 'AI Review', icon: 'fa-microchip' },
                           { label: 'Verification', icon: 'fa-user-shield' },
                           { label: 'Settlement', icon: 'fa-credit-card' },
                         ].map((s, idx) => {
                           const active = getStatusStep(selectedClaim.status) > idx;
                           const current = getStatusStep(selectedClaim.status) === idx + 1;
                           return (
                             <div key={idx} className="flex flex-col items-center">
                               <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center relative z-10 transition-all duration-700 ${
                                 active ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30' : 
                                 current ? 'bg-white border-4 border-[#4a0e1e] text-[#4a0e1e] scale-110' : 'bg-white border-4 border-slate-50 text-slate-200'
                               }`}>
                                 <i className={`fas ${s.icon} text-sm`}></i>
                               </div>
                               <span className={`text-[9px] font-black uppercase tracking-widest mt-4 ${active || current ? 'text-slate-900' : 'text-slate-300'}`}>{s.label}</span>
                             </div>
                           );
                         })}
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                      <div className="space-y-6">
                         <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-2">Technical Narrative</h4>
                         <p className="text-sm font-medium text-slate-600 leading-relaxed italic border-l-4 border-[#4a0e1e]/10 pl-4">"{selectedClaim.description}"</p>
                         <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                               <span className="text-slate-400">Policy Type</span>
                               <span className="text-slate-900">Premium Comprehensive</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-black uppercase">
                               <span className="text-slate-400">Limit</span>
                               <span className="text-slate-900">$1,000,000.00</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-2">Active Measures</h4>
                         <div className="space-y-3">
                            <button className="w-full bg-[#4a0e1e] text-white p-5 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:scale-105 shadow-xl shadow-maroon-900/10 transition-all flex items-center justify-center space-x-3">
                               <i className="fas fa-headset"></i>
                               <span>Live Video Adjustment</span>
                            </button>
                            <button className="w-full bg-slate-50 text-slate-600 border border-slate-100 p-5 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                               Supplement Evidence Log
                            </button>
                            <div className="pt-4 text-center">
                               <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em] animate-pulse">Adjuster actively reviewing case files</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default FNOLPage;
