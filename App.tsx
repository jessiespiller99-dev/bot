
import React, { useState } from 'react';
import { DashboardView } from './components/DashboardView';
import { DataManager } from './components/DataManager';
import { Sidebar } from './components/Sidebar';
import { WorkerList } from './components/WorkerList';
import { CampaignForm } from './components/CampaignForm';
import { PostTracker } from './components/PostTracker';
import { AdPost, WorkerPC, PostStatus, Category, EmailAlias, SiteAccount } from './types';

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

const MOCK_ALIASES: EmailAlias[] = [
  { id: 'alias-1', address: 'luna.merlot@mail.com', status: 'CONFIRMED', createdAt: '2024-10-02T09:10:00Z' },
  { id: 'alias-2', address: 'ariel.sea@mail.com', status: 'AVAILABLE', createdAt: '2024-10-05T12:30:00Z' },
  { id: 'alias-3', address: 'nova.sand@mail.com', status: 'USED', createdAt: '2024-10-06T15:45:00Z' },
];

const MOCK_ACCOUNTS: SiteAccount[] = [
  { id: 'acct-1', email: 'luna.merlot@mail.com', username: 'LunaM', status: 'REGISTERED', createdAt: '2024-10-02T10:00:00Z', focusCity: 'Sydney' },
  { id: 'acct-2', email: 'nova.sand@mail.com', username: 'NovaS', status: 'PENDING', createdAt: '2024-10-06T16:00:00Z', focusCity: 'Melbourne' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workers' | 'campaigns' | 'tracker' | 'data'>('dashboard');
  const [workers, setWorkers] = useState<WorkerPC[]>(MOCK_WORKERS);
  const [posts, setPosts] = useState<AdPost[]>(MOCK_POSTS);
  const [aliases, setAliases] = useState<EmailAlias[]>(MOCK_ALIASES);
  const [accounts, setAccounts] = useState<SiteAccount[]>(MOCK_ACCOUNTS);

  const handleUpdatePost = (updated: AdPost) => {
    setPosts(prev =>
      prev.some(post => post.id === updated.id)
        ? prev.map(post => (post.id === updated.id ? updated : post))
        : [updated, ...prev]
    );
  };

  const handleDeletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const handleClearPosts = () => {
    setPosts([]);
  };

  const handleClearAccounts = () => {
    setAliases([]);
    setAccounts([]);
  };

  const handleImportPosts = (imported: AdPost[]) => {
    setPosts(prev => [...imported, ...prev]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-8 bg-slate-900">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Locanto Operations Dashboard</h1>
          <p className="text-slate-400 mt-2">Organize content, accounts, and posting workflows in one place.</p>
        </header>

        {activeTab === 'dashboard' && (
          <DashboardView workers={workers} posts={posts} aliases={aliases} accounts={accounts} />
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

        {activeTab === 'data' && (
          <DataManager
            posts={posts}
            aliases={aliases}
            accounts={accounts}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
            onClearPosts={handleClearPosts}
            onClearAccounts={handleClearAccounts}
            onImportPosts={handleImportPosts}
          />
        )}
      </main>
    </div>
  );
};

export default App;
