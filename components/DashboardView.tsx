
import React from 'react';
import { WorkerPC, AdPost, PostStatus, EmailAlias, SiteAccount } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardViewProps {
  workers: WorkerPC[];
  posts: AdPost[];
  aliases: EmailAlias[];
  accounts: SiteAccount[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ workers, posts, aliases, accounts }) => {
  const liveCount = posts.filter(p => p.status === PostStatus.LIVE).length;
  const flaggedCount = posts.filter(p => p.status === PostStatus.FLAGGED).length;
  const onlineWorkers = workers.filter(w => w.status !== 'OFFLINE').length;
  const registeredAccounts = accounts.filter(account => account.status === 'REGISTERED').length;

  // Mock data for charts
  const chartData = [
    { name: 'Mon', posts: 12, live: 10 },
    { name: 'Tue', posts: 18, live: 15 },
    { name: 'Wed', posts: 25, live: 22 },
    { name: 'Thu', posts: 20, live: 18 },
    { name: 'Fri', posts: 35, live: 30 },
    { name: 'Sat', posts: 40, live: 35 },
    { name: 'Sun', posts: 38, live: 34 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard title="Total Posts" value={posts.length} icon="📝" color="blue" />
        <StatCard title="Live Ads" value={liveCount} icon="✅" color="emerald" />
        <StatCard title="Flagged" value={flaggedCount} icon="⚠️" color="rose" />
        <StatCard title="Active PCs" value={`${onlineWorkers}/${workers.length}`} icon="💻" color="amber" />
        <StatCard title="Email Aliases" value={aliases.length} icon="✉️" color="blue" />
        <StatCard title="Registered Accounts" value={registeredAccounts} icon="👤" color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-6">Posting Performance (Last 7 Days)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="posts" stroke="#6366f1" fillOpacity={1} fill="url(#colorPosts)" />
                <Area type="monotone" dataKey="live" stroke="#10b981" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Logs */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {posts.slice(0, 5).map(post => (
              <div key={post.id} className="flex items-start gap-4 p-3 rounded-xl bg-slate-900/50">
                <div className={`w-2 h-2 mt-2 rounded-full ${post.status === PostStatus.LIVE ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                <div>
                  <div className="text-sm font-medium text-slate-200">{post.title}</div>
                  <div className="text-xs text-slate-500">
                    PC: {post.workerId} • IP: {post.ipAddress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: string, color: string }) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  };

  return (
    <div className={`p-6 rounded-2xl border ${colors[color]} bg-slate-800`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Realtime</span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400 font-medium">{title}</div>
    </div>
  );
};
