
import React from 'react';
import { AdPost, PostStatus } from '../types';

interface PostTrackerProps {
  posts: AdPost[];
}

export const PostTracker: React.FC<PostTrackerProps> = ({ posts }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Live Status Monitor</h3>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors">
            Export to Notepad (.txt)
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Force Re-check Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col h-full shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                post.status === PostStatus.LIVE ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {post.status}
              </span>
              <span className="text-xs text-slate-500">{new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
            
            <h4 className="text-lg font-semibold text-white mb-2 line-clamp-1">{post.title}</h4>
            <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-grow">{post.description}</p>
            
            <div className="bg-slate-900 rounded-xl p-3 space-y-2 mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">PC Node</span>
                <span className="text-slate-300 font-medium">{post.workerId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">IP Address</span>
                <span className="text-slate-300 font-mono">{post.ipAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-300 font-medium">{post.city}</span>
              </div>
            </div>

            {post.liveLink ? (
              <a 
                href={post.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600/10 text-emerald-500 rounded-xl text-center text-sm font-bold hover:bg-emerald-600/20 transition-all border border-emerald-500/20"
              >
                View Live Post
              </a>
            ) : (
              <div className="w-full py-3 bg-slate-900 text-slate-600 rounded-xl text-center text-sm font-bold border border-slate-700 cursor-not-allowed">
                Link Unavailable
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
