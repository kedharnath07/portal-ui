
import React, { useState } from 'react';
import { NAV_ITEMS, THEME } from '../constants';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';
import ProfileModal from './ProfileModal';

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, isOpen, onClose }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!user) return null;

  const filteredNavItems = NAV_ITEMS.filter(item => 
    !item.roles || item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile Backdrop Overlay - Hidden on md and up */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[55] transition-opacity duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      <aside 
        className={`w-72 md:w-64 h-screen fixed left-0 top-0 text-white flex flex-col shadow-2xl z-[60] transition-transform duration-500 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: THEME.secondary }}
      >
        {/* Sidebar Brand & Mobile Close */}
        <div className="p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shadow-inner">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <div>
                <span className="text-lg font-black tracking-tight block leading-none italic">msg</span>
                <span className="text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase">Enterprise</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 active:scale-90 transition-all"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Mobile-Only Identity Snippet (Visible at top of menu on small screens) */}
        <div className="px-6 mb-4 md:hidden">
          <div className="p-4 bg-white/5 rounded-3xl border border-white/5 flex items-center space-x-4">
             <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
                <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
             </div>
             <div>
                <p className="text-xs font-black uppercase tracking-tight">{user.name}</p>
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{user.tier} Tier</p>
             </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 mt-2 overflow-y-auto scrollbar-hide px-4 space-y-1.5">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) onClose?.();
                }}
                className={`flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all duration-300 group relative ${
                  isActive 
                  ? 'bg-white/10 text-white shadow-xl shadow-black/10' 
                  : 'text-white/30 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full"></div>
                )}
                <i className={`fas ${item.icon} w-5 text-center text-sm transition-all ${
                  isActive ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/20 group-hover:text-white'
                }`}></i>
                <span className={`text-[11px] font-black uppercase tracking-widest ${isActive ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Persistent Bottom Profile Control */}
        <div className="p-6 border-t border-white/5 bg-black/10">
          <div 
            className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group"
            onClick={() => {
              setIsProfileOpen(true);
              if (window.innerWidth < 768) onClose?.();
            }}
          >
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:border-white/30 transition-all">
                  <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black truncate group-hover:text-white transition-colors uppercase tracking-tight">{user.name}</p>
                  <p className="text-[9px] text-white/30 truncate font-black uppercase tracking-widest">Global Profile</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onLogout(); }}
                className="text-white/20 hover:text-rose-400 transition-colors p-2 active:scale-90"
                title="Secure Logout"
              >
                  <i className="fas fa-power-off text-xs"></i>
              </button>
          </div>
        </div>
      </aside>

      {isProfileOpen && user && (
        <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} onLogout={onLogout} />
      )}
    </>
  );
};

export default Sidebar;
