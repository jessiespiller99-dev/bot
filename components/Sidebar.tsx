
import React from 'react';

interface SidebarProps {
  activeTab: 'dashboard' | 'workers' | 'campaigns' | 'tracker';
  setActiveTab: (tab: 'dashboard' | 'workers' | 'campaigns' | 'tracker') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'workers', label: 'PC Nodes', icon: '💻' },
    { id: 'campaigns', label: 'Campaigns', icon: '📝' },
    { id: 'tracker', label: 'Live Tracker', icon: '🌐' },
  ];

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-xl">🤖</div>
          <span className="font-bold text-xl tracking-tighter">LOCANTO BOT</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-900 rounded-xl p-4">
          <div className="text-xs text-slate-500 uppercase font-bold mb-2">System Status</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-sm text-slate-300">Automation Core Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
