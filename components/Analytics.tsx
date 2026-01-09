
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, claims: 2400 },
  { name: 'Feb', revenue: 3000, claims: 1398 },
  { name: 'Mar', revenue: 2000, claims: 9800 },
  { name: 'Apr', revenue: 2780, claims: 3908 },
  { name: 'May', revenue: 1890, claims: 4800 },
  { name: 'Jun', revenue: 2390, claims: 3800 },
];

const COLORS = ['#4a0e1e', '#800020', '#C41E3A', '#D70040'];

const Analytics: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Premiums', value: '$1.2M', trend: '+12%', icon: 'fa-dollar-sign' },
          { label: 'Active Policies', value: '4,529', trend: '+5%', icon: 'fa-shield-halved' },
          { label: 'Loss Ratio', value: '62.4%', trend: '-2.1%', icon: 'fa-chart-pie' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                <i className={`fas ${stat.icon} text-[#4a0e1e] text-xl`}></i>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Monthly Revenue vs Claims</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4a0e1e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="claims" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Growth Projection</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4a0e1e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4a0e1e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#4a0e1e" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
