
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_POLICIES } from '../constants';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
}

type Tab = 'overview' | 'security' | 'preferences';

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end p-0 md:p-6 pointer-events-none">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md pointer-events-auto animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-xl h-full bg-white rounded-none md:rounded-[4rem] shadow-2xl pointer-events-auto animate-in slide-in-from-right-full duration-500 flex flex-col overflow-hidden border-l border-white/20">
        
        {/* Dynamic Header */}
        <div className="relative h-64 shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Profile Cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#4a0e1e]/40 to-[#4a0e1e]"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-[#4a0e1e] flex items-center justify-center transition-all z-20 backdrop-blur-md"
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="absolute bottom-8 left-10 right-10 flex items-end space-x-6 z-10">
            <div className="w-24 h-24 rounded-[2.5rem] border-4 border-white overflow-hidden shadow-2xl bg-white shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">{user.name}</h2>
                <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {user.tier} Member
                </span>
              </div>
              <p className="text-white/60 font-bold text-xs uppercase tracking-[0.2em]">{user.role} Authorization</p>
            </div>
          </div>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex bg-slate-50 border-b border-slate-100 px-6 shrink-0">
          {(['overview', 'security', 'preferences'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest relative transition-all ${
                activeTab === tab ? 'text-[#4a0e1e]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#4a0e1e] rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
          
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Profile Bio / Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Claims</p>
                  <p className="text-lg font-black text-slate-900">04</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Policies</p>
                  <p className="text-lg font-black text-slate-900">{MOCK_POLICIES.length}</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Saved Docs</p>
                  <p className="text-lg font-black text-slate-900">12</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] border-b border-slate-50 pb-2">Identity & Records</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Hash</label>
                    <p className="text-sm font-bold text-slate-700">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Contact</label>
                    <p className="text-sm font-bold text-slate-700">{user.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Home Location</label>
                    <p className="text-sm font-bold text-slate-700">{user.address}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Region / ZIP</label>
                    <p className="text-sm font-bold text-slate-700">{user.city}, {user.zipCode}</p>
                  </div>
                </div>
              </div>

              {/* Verified Documents */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] border-b border-slate-50 pb-2">Validation Vault</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl group">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                        <i className="fas fa-passport"></i>
                      </div>
                      <span className="text-xs font-black text-emerald-800 uppercase tracking-tighter">Passport Verification</span>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-500 text-white px-3 py-1 rounded-full uppercase">Valid</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
                        <i className="fas fa-house-user"></i>
                      </div>
                      <span className="text-xs font-black text-blue-800 uppercase tracking-tighter">Utility Proof (Proof of Address)</span>
                    </div>
                    <span className="text-[10px] font-black bg-blue-500 text-white px-3 py-1 rounded-full uppercase">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-black text-slate-900">Security Protocols</h3>
              
              <div className="space-y-4">
                <div className="p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-400 font-medium">Extra layer of protection active.</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center text-xl group-hover:bg-rose-100 transition-colors">
                      <i className="fas fa-key"></i>
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">Change Master Password</p>
                      <p className="text-xs text-slate-400 font-medium">Last changed 4 months ago.</p>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-slate-200"></i>
                </div>
              </div>

              {/* Logout Session Management Card */}
              <div className="p-8 rounded-[2.5rem] bg-rose-50 border border-rose-100 space-y-4">
                 <div className="flex items-center space-x-3 text-rose-800">
                    <i className="fas fa-user-lock"></i>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Active Session Management</h4>
                 </div>
                 <p className="text-xs font-medium text-rose-900/60 leading-relaxed">
                    Terminate all active sessions for this identity across enterprise nodes. This action is immediate and requires re-authentication.
                 </p>
                 <button 
                  onClick={onLogout}
                  className="w-full bg-white text-rose-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-rose-200 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                 >
                   Clear All Active Sessions
                 </button>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-black text-slate-900">Platform Preferences</h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-2">Communications</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-slate-800">Email Notifications</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Monthly statements & alerts</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-200 text-[#4a0e1e] focus:ring-[#4a0e1e]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-slate-800">SMS / Mobile Alerts</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Claim status updates via text</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-200 text-[#4a0e1e] focus:ring-[#4a0e1e]" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Improved Footer with explicit Sign Out */}
        <div className="p-10 border-t border-slate-100 bg-white shrink-0 flex flex-col space-y-4">
           <div className="flex items-center space-x-4">
              <button className="flex-1 bg-[#4a0e1e] text-white py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-maroon-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Update Profile Info
              </button>
              <button 
                onClick={onClose}
                className="px-8 py-5 rounded-[2rem] border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
           </div>
           
           <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-3 py-5 rounded-[2rem] bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all group"
           >
              <i className="fas fa-power-off text-xs group-hover:animate-pulse"></i>
              <span>Secure Portal Sign Out</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
