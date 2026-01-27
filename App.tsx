
import React, { useState, useEffect } from 'react';
import { DashboardView } from './components/DashboardView';
import { Sidebar } from './components/Sidebar';
import { WorkerList } from './components/WorkerList';
import { CampaignForm } from './components/CampaignForm';
import { PostTracker } from './components/PostTracker';
import { AdPost, WorkerPC, PostStatus, Category } from './types';

const MOCK_WORKERS: WorkerPC[] = [
  { id: 'pc-001', name: 'Workstation Alpha', ipAddress: '192.168.1.45', status: 'POSTING', lastSeen: new Date().toISOString(), totalPosts: 124 },
  { id: 'pc-002', name: 'Workstation Beta', ipAddress: '45.12.89.231', status: 'ONLINE', lastSeen: new Date().toISOString(), totalPosts: 89 },
  { id: 'pc-003', name: 'Laptop Gamma', ipAddress: '172.16.0.12', status: 'OFFLINE', lastSeen: '2023-10-25T14:30:00Z', totalPosts: 56 },
];

const MOCK_POSTS: AdPost[] = [
  {
    id: 'post-1',
    title: 'Experienced Massage in Sydney',
    description: 'Looking for a relaxing session...',
    age: 24,
    city: 'Sydney',
    category: Category.ESCORT,
    status: PostStatus.LIVE,
    timestamp: new Date().toISOString(),
    workerId: 'pc-001',
    ipAddress: '192.168.1.45',
    liveLink: 'https://www.locanto.com.au/ad/12345'
  },
  {
    id: 'post-2',
    title: 'Casual Encounter Tonight',
    description: 'Men looking for men in Melbourne...',
    age: 31,
    city: 'Melbourne',
    category: Category.CASUAL,
    status: PostStatus.FLAGGED,
    timestamp: new Date().toISOString(),
    workerId: 'pc-002',
    ipAddress: '45.12.89.231'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workers' | 'campaigns' | 'tracker'>('dashboard');
  const [workers, setWorkers] = useState<WorkerPC[]>(MOCK_WORKERS);
  const [posts, setPosts] = useState<AdPost[]>(MOCK_POSTS);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-8 bg-slate-900">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Locanto Automation Dashboard</h1>
          <p className="text-slate-400 mt-2">Central control for multi-PC posting nodes.</p>
        </header>

        {activeTab === 'dashboard' && (
          <DashboardView workers={workers} posts={posts} />
        )}

        {activeTab === 'workers' && (
          <WorkerList workers={workers} />
        )}

        {activeTab === 'campaigns' && (
          <CampaignForm />
        )}

        {activeTab === 'tracker' && (
          <PostTracker posts={posts} />
        )}
      </main>
    </div>
  );
};

export default App;
