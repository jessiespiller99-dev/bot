
import React from 'react';
import { WorkerPC } from '../types';

interface WorkerListProps {
  workers: WorkerPC[];
}

export const WorkerList: React.FC<WorkerListProps> = ({ workers }) => {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Active PC Nodes</h3>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors">
          Add New Worker
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-900 text-slate-400 text-xs uppercase font-bold tracking-wider">
          <tr>
            <th className="px-6 py-4">Node Name</th>
            <th className="px-6 py-4">Current IP</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Total Posts</th>
            <th className="px-6 py-4">Last Sync</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {workers.map(worker => (
            <tr key={worker.id} className="hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-200">{worker.name}</td>
              <td className="px-6 py-4 text-slate-400 font-mono text-sm">{worker.ipAddress}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  worker.status === 'POSTING' ? 'bg-indigo-500/20 text-indigo-400' :
                  worker.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-slate-700 text-slate-400'
                }`}>
                  {worker.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-300">{worker.totalPosts}</td>
              <td className="px-6 py-4 text-slate-500 text-sm">
                {new Date(worker.lastSeen).toLocaleTimeString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-600 rounded-lg text-slate-400 hover:text-white transition-colors">⚙️</button>
                  <button className="p-2 hover:bg-rose-500/20 rounded-lg text-slate-400 hover:text-rose-400 transition-colors">🛑</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
