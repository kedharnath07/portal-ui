
import React, { useState } from 'react';
import { User } from '../types';
import ProfileModal from './ProfileModal';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onOpenSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onOpenSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 transition-all">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle - Only visible on screens smaller than md (768px) */}
          <button 
            onClick={onOpenSidebar}
            className="md:hidden w-11 h-11 flex items-center justify-center text-slate-500 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all border border-slate-100 shadow-sm"
          >
            <i className="fas fa-bars-staggered text-lg"></i>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hidden sm:inline">Security:</span>
            <span className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-600 text-[10px] px-3 py-1 rounded-full font-bold border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="hidden xs:inline uppercase tracking-tighter">Encrypted Node</span>
              <i className="fas fa-lock text-[8px] xs:hidden"></i>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-6">
          <button className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
            <i className="fas fa-bell text-lg"></i>
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-bounce"></span>
          </button>

          <div 
            className="flex items-center space-x-3 md:space-x-4 pl-3 md:pl-6 border-l border-slate-100 cursor-pointer group"
            onClick={() => setIsProfileOpen(true)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-800 group-hover:text-[#4a0e1e] transition-colors uppercase tracking-tight">{user?.name || 'Guest'}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user?.tier || 'Standard'} Member</p>
            </div>
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white ring-2 ring-slate-100 group-hover:ring-[#4a0e1e]/20 transition-all shadow-sm">
              <img src={user?.avatar || "https://picsum.photos/seed/user/100/100"} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {isProfileOpen && user && (
        <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} onLogout={onLogout} />
      )}
    </>
  );
};

export default Header;
