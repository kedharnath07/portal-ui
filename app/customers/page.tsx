
import React, { useState, useEffect } from 'react';
import { Customer } from '../../types';
import { apiFetch } from '../../lib/api-client';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await apiFetch('/api/customers', { method: 'POST' });
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Customer Directory</h1>
          <p className="text-slate-500 font-medium">Manage and monitor client relationships and risk profiles.</p>
        </div>
        <div className="flex gap-3">
            <div className="relative group">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#4a0e1e] transition-colors"></i>
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4a0e1e]/10 focus:border-[#4a0e1e] transition-all w-64 md:w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="bg-[#4a0e1e] text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-maroon-900/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2 text-sm">
                <i className="fas fa-user-plus"></i>
                <span>Add Client</span>
            </button>
        </div>
      </header>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[500px] text-slate-400">
            <i className="fas fa-circle-notch fa-spin text-4xl mb-4 text-[#4a0e1e]"></i>
            <p className="font-bold uppercase tracking-widest text-[10px]">Accessing Client Database...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-b border-slate-50">
                  <th className="px-8 py-6">Client Name</th>
                  <th className="px-8 py-6">Contact & Location</th>
                  <th className="px-8 py-6">Coverage Type</th>
                  <th className="px-8 py-6">Risk Profile</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-sm border border-slate-200">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-[#4a0e1e]">{customer.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">{customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-slate-600">
                            <i className="fas fa-envelope w-4 text-slate-300 mr-2"></i>
                            {customer.email}
                        </div>
                        <div className="flex items-center text-xs text-slate-600">
                            <i className="fas fa-location-dot w-4 text-slate-300 mr-2"></i>
                            {customer.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                        {customer.policyType}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                            customer.riskLevel === 'Low' ? 'bg-emerald-400' :
                            customer.riskLevel === 'Medium' ? 'bg-amber-400' : 'bg-red-400'
                        }`}></div>
                        <span className="text-xs font-bold text-slate-600">{customer.riskLevel}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border ${
                        customer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        customer.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="w-10 h-10 rounded-2xl hover:bg-slate-100 text-slate-300 hover:text-slate-800 transition-all flex items-center justify-center">
                        <i className="fas fa-chevron-right text-xs"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCustomers.length === 0 && (
              <div className="p-20 text-center">
                <i className="fas fa-users-slash text-slate-100 text-6xl mb-4"></i>
                <p className="text-slate-400 font-bold italic">No matching clients found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
