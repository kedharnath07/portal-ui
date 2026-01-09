
import React, { useState, useEffect } from 'react';
import { Task, Proposal } from '../types';
import { MOCK_PROPOSALS, THEME } from '../constants';
import { generateAITasks } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Auto-generate some initial tasks on load
    handleGenerateTasks();
  }, []);

  const handleGenerateTasks = async () => {
    setIsGenerating(true);
    const newTasks = await generateAITasks();
    setTasks(newTasks);
    setIsGenerating(false);
  };

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview Dashboard</h1>
          <p className="text-slate-500 mt-1">Marketplace Performance & Agent Portfolio</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all flex items-center space-x-2">
            <i className="fas fa-download"></i>
            <span>Export Report</span>
          </button>
          <button className="bg-[#4a0e1e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2d0611] transition-all shadow-md flex items-center space-x-2">
            <i className="fas fa-plus"></i>
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Quotes', value: '42', color: 'text-blue-600', icon: 'fa-file-invoice' },
          { label: 'Pending Claims', value: '18', color: 'text-orange-600', icon: 'fa-clock' },
          { label: 'Premium YTD', value: '$2.4M', color: 'text-emerald-600', icon: 'fa-money-bill-wave' },
          { label: 'Retention Rate', value: '94%', color: 'text-purple-600', icon: 'fa-user-check' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <i className={`fas ${stat.icon} ${stat.color} opacity-20 text-xl`}></i>
            </div>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Task List (Col-span 1) */}
        <div className="xl:col-span-1 bg-white border border-slate-200 rounded-2xl flex flex-col shadow-sm">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center space-x-2">
              <i className="fas fa-bolt-lightning text-amber-500"></i>
              <span>Priority Actions</span>
            </h3>
            <button 
              onClick={handleGenerateTasks}
              className="text-xs font-bold text-[#4a0e1e] hover:underline flex items-center space-x-1"
            >
              <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-wand-sparkles'}`}></i>
              <span>{isGenerating ? 'Analyzing...' : 'Refresh AI'}</span>
            </button>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto max-h-[500px]">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#4a0e1e] hover:bg-white transition-all cursor-pointer group">
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{task.dueDate}</span>
                </div>
                <h4 className="mt-2 text-sm font-bold text-slate-800 group-hover:text-[#4a0e1e]">{task.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{task.category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proposals Table (Col-span 2) */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Portfolio Proposals</h3>
            <div className="flex items-center space-x-2">
                <div className="relative">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4a0e1e]" />
                </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4">Client / ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_PROPOSALS.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 text-sm">{prop.customer}</div>
                      <div className="text-[10px] text-slate-400">{prop.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-600">{prop.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-slate-900">${prop.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-full border ${
                        prop.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        prop.status === 'Sent' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        prop.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-slate-50 text-slate-700 border-slate-100'
                      }`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-300 group-hover:text-[#4a0e1e] transition-colors">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
