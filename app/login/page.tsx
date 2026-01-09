
import React, { useState } from 'react';
import { UserRole } from '../../types';
import { apiFetch } from '../../lib/api-client';

interface LoginPageProps {
  onLogin: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('Client');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = isRegistering ? '/api/auth' : '/api/auth'; // Using existing auth for simulation
      const response = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ 
          name: isRegistering ? name : undefined,
          email: email || 'user@msg-insurance.com', 
          password: password || 'password123',
          role 
        })
      });
      const userData = await response.json();
      onLogin(userData);
    } catch (error) {
      alert('Authentication error. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col transition-all duration-500">
        <div className="p-10 text-center bg-slate-50 border-b border-slate-100">
           <div className="w-16 h-16 bg-[#4a0e1e] rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-maroon-900/20 animate-in zoom-in duration-500">
              <span className="text-white font-black text-3xl">M</span>
           </div>
           <h2 className="text-xl font-black text-slate-900 tracking-tight">
             {isRegistering ? 'Create Account' : 'Enterprise Access'}
           </h2>
           <p className="text-slate-400 font-medium text-xs mt-1">
             {isRegistering ? 'Join the MSG Global Insurance Network' : 'Global Insurance Management Portal'}
           </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-5">
          {isRegistering && (
            <div className="space-y-2 animate-in slide-in-from-top-4 duration-300">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Legal Full Name</label>
              <div className="relative">
                  <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Johnathan Doe"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-11 text-sm focus:bg-white focus:ring-2 focus:ring-[#4a0e1e]/10 focus:border-[#4a0e1e] outline-none transition-all font-medium"
                  />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Work Email / User ID</label>
            <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@msg-insurance.com"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-11 text-sm focus:bg-white focus:ring-2 focus:ring-[#4a0e1e]/10 focus:border-[#4a0e1e] outline-none transition-all font-medium"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Secure Password</label>
            <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pl-11 text-sm focus:bg-white focus:ring-2 focus:ring-[#4a0e1e]/10 focus:border-[#4a0e1e] outline-none transition-all font-medium"
                />
                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Portal Selection</label>
            <div className="grid grid-cols-2 gap-2">
              {(['Client', 'Agent', 'Manager', 'Administrator'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter border transition-all ${
                    role === r 
                    ? 'bg-[#4a0e1e] border-[#4a0e1e] text-white shadow-lg shadow-maroon-900/20' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-maroon-100 hover:bg-slate-50'
                  }`}
                >
                  {r === 'Client' && <i className="fas fa-user-circle mr-1"></i>}
                  {r === 'Agent' && <i className="fas fa-briefcase mr-1"></i>}
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#4a0e1e] text-white p-5 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-maroon-900/20 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <i className="fas fa-circle-notch fa-spin mr-2"></i>
            ) : (
              isRegistering ? 'CREATE ENTERPRISE ACCOUNT' : 'SECURE SIGN IN'
            )}
          </button>

          <div className="flex flex-col space-y-4 pt-4">
            <button 
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-[10px] font-black text-[#4a0e1e] hover:underline transition-colors uppercase tracking-widest"
            >
              {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
            
            {!isRegistering && (
              <a href="#" className="text-[10px] font-black text-slate-300 hover:text-slate-500 transition-colors uppercase tracking-widest text-center">
                Forgot Password?
              </a>
            )}
          </div>
        </form>

        <div className="p-6 text-center text-[10px] text-slate-300 font-bold border-t border-slate-50 uppercase tracking-[0.2em]">
          Internal & Client Portal &copy; 2025 MSG Group
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
