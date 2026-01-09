
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiFetch } from '../../lib/api-client';

const data = [
  { name: 'Jan', premium: 4000, claims: 2400 },
  { name: 'Feb', premium: 3000, claims: 1398 },
  { name: 'Mar', premium: 2000, claims: 9800 },
  { name: 'Apr', premium: 2780, claims: 3908 },
  { name: 'May', premium: 1890, claims: 4800 },
  { name: 'Jun', premium: 2390, claims: 3800 },
];

const AnalyticsPage: React.FC = () => {
  const [insight, setInsight] = useState<{text: string, sources: any[]}>({ text: '', sources: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await apiFetch('/api/news', { method: 'POST' });
        const data = await res.json();
        setInsight(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Market Intelligence</h1>
        <p className="text-slate-500 font-medium">Real-time underwriting performance and industry trends.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center space-x-2">
            <i className="fas fa-chart-line text-blue-500"></i>
            <span>Premium Performance Ratio</span>
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4a0e1e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4a0e1e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="premium" stroke="#4a0e1e" strokeWidth={4} fillOpacity={1} fill="url(#colorPremium)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Market Feed (Search Grounding) */}
        <div className="lg:col-span-1 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center space-x-2">
              <i className="fas fa-globe-americas text-emerald-500"></i>
              <span>Industry Insights</span>
            </h3>
          </div>
          <div className="p-6 flex-1 overflow-y-auto max-h-[400px]">
            {loading ? (
              <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded-full animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded-full animate-pulse w-full"></div>
                <div className="h-4 bg-slate-100 rounded-full animate-pulse w-5/6"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{insight.text}</p>
                
                {insight.sources.length > 0 && (
                  <div className="pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Verified Sources</p>
                    <div className="flex flex-wrap gap-2">
                      {insight.sources.map((chunk: any, i: number) => (
                        chunk.web?.uri && (
                          <a 
                            key={i} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-lg border border-slate-100 hover:bg-slate-100 hover:text-slate-800 transition-colors truncate max-w-[150px]"
                          >
                            <i className="fas fa-link mr-1"></i>
                            {chunk.web.title || 'Source'}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
