import React, { useMemo, useState } from 'react';
import { AdPost, Category, EmailAlias, PostStatus, SiteAccount } from '../types';

interface DataManagerProps {
  posts: AdPost[];
  aliases: EmailAlias[];
  accounts: SiteAccount[];
  onUpdatePost: (post: AdPost) => void;
  onDeletePost: (id: string) => void;
  onClearPosts: () => void;
  onClearAccounts: () => void;
  onImportPosts: (posts: AdPost[]) => void;
}

const CATEGORY_LABELS: Record<Category, string> = {
  [Category.ESCORT]: 'Personals • Services • Escorts',
  [Category.CASUAL]: 'Personals • Casual Encounters • Men looking for Men',
};

export const DataManager: React.FC<DataManagerProps> = ({
  posts,
  aliases,
  accounts,
  onUpdatePost,
  onDeletePost,
  onClearPosts,
  onClearAccounts,
  onImportPosts,
}) => {
  const [editingPost, setEditingPost] = useState<AdPost | null>(null);
  const [sheetUrl, setSheetUrl] = useState('');

  const accountStats = useMemo(
    () => ({
      aliasTotal: aliases.length,
      aliasAvailable: aliases.filter(alias => alias.status === 'AVAILABLE').length,
      accountTotal: accounts.length,
      accountRegistered: accounts.filter(account => account.status === 'REGISTERED').length,
    }),
    [aliases, accounts],
  );

  const handleEditChange = (field: keyof AdPost, value: string | number) => {
    if (!editingPost) return;
    setEditingPost({ ...editingPost, [field]: value });
  };

  const handleSave = () => {
    if (!editingPost) return;
    onUpdatePost(editingPost);
    setEditingPost(null);
  };

  const parseCsv = (text: string) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(header => header.trim().toLowerCase());

    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(value => value.trim());
      const row = headers.reduce<Record<string, string>>((acc, header, idx) => {
        acc[header] = values[idx] ?? '';
        return acc;
      }, {});

      const category =
        row.category?.toLowerCase().includes('casual') || row.category?.toLowerCase().includes('men')
          ? Category.CASUAL
          : Category.ESCORT;

      return {
        id: `import-${Date.now()}-${index}`,
        title: row.title || 'Imported title',
        description: row.description || 'Imported description',
        age: Number(row.age) || 25,
        city: row.city || 'Sydney',
        category,
        status: PostStatus.PENDING,
        timestamp: new Date().toISOString(),
        workerId: 'manual-import',
        ipAddress: '—',
      } satisfies AdPost;
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      const imported = parseCsv(content);
      if (imported.length) {
        onImportPosts(imported);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Email aliases" value={accountStats.aliasTotal} subtitle={`${accountStats.aliasAvailable} available`} />
        <StatCard title="Site accounts" value={accountStats.accountTotal} subtitle={`${accountStats.accountRegistered} registered`} />
        <StatCard title="Ad drafts" value={posts.length} subtitle="Ready for publishing" />
        <StatCard title="Data controls" value="Safe mode" subtitle="No automation configured" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold">Ad data library</h3>
              <p className="text-sm text-slate-400">Edit titles, descriptions, and city targeting before publishing.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  setEditingPost({
                    id: `draft-${Date.now()}`,
                    title: '',
                    description: '',
                    age: 21,
                    city: '',
                    category: Category.ESCORT,
                    status: PostStatus.PENDING,
                    timestamp: new Date().toISOString(),
                    workerId: 'draft',
                    ipAddress: '—',
                  })
                }
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold"
              >
                Add new draft
              </button>
              <button
                onClick={onClearPosts}
                className="px-4 py-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 text-sm font-semibold"
              >
                Clear all ads
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-700">
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">City</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-slate-100">{post.title}</td>
                    <td className="py-4 pr-4 text-slate-300">{post.city}</td>
                    <td className="py-4 pr-4 text-slate-400">{CATEGORY_LABELS[post.category]}</td>
                    <td className="py-4 pr-4">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300">
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="px-3 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-700 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeletePost(post.id)}
                        className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {!posts.length && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No ad drafts yet. Import a CSV or add a draft to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">Import data</h3>
            <p className="text-sm text-slate-400">Upload a CSV with title, description, city, age, and category.</p>
          </div>
          <label className="block">
            <span className="text-xs text-slate-400">CSV upload</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mt-2 w-full text-sm file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:text-sm file:font-semibold text-slate-300"
            />
          </label>
          <div>
            <label className="text-xs text-slate-400">Google Sheets URL</label>
            <input
              type="text"
              value={sheetUrl}
              onChange={event => setSheetUrl(event.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200"
            />
            <button className="mt-3 w-full py-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 text-sm font-semibold">
              Connect sheet
            </button>
          </div>
          <div className="border-t border-slate-700 pt-4">
            <button
              onClick={onClearAccounts}
              className="w-full py-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-sm font-semibold"
            >
              Clear all account data
            </button>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-lg font-bold mb-4">Email aliases</h3>
          <div className="space-y-3">
            {aliases.map(alias => (
              <div key={alias.id} className="flex items-center justify-between bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-100">{alias.address}</div>
                  <div className="text-xs text-slate-500">Created {new Date(alias.createdAt).toLocaleDateString()}</div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-700 text-slate-200">
                  {alias.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-lg font-bold mb-4">Registered site accounts</h3>
          <div className="space-y-3">
            {accounts.map(account => (
              <div key={account.id} className="flex items-center justify-between bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                <div>
                  <div className="text-sm font-semibold text-slate-100">{account.username}</div>
                  <div className="text-xs text-slate-500">{account.email}</div>
                  {account.focusCity && (
                    <div className="text-xs text-slate-500">Primary city: {account.focusCity}</div>
                  )}
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-500/20">
                  {account.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {editingPost && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-6 z-50">
          <div className="w-full max-w-2xl bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Edit ad draft</h3>
              <button onClick={() => setEditingPost(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={event => handleEditChange('title', event.target.value)}
                  className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  value={editingPost.description}
                  onChange={event => handleEditChange('description', event.target.value)}
                  className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 h-28"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-slate-400">City</label>
                  <input
                    type="text"
                    value={editingPost.city}
                    onChange={event => handleEditChange('city', event.target.value)}
                    className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Age</label>
                  <input
                    type="number"
                    value={editingPost.age}
                    onChange={event => handleEditChange('age', Number(event.target.value))}
                    className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Category</label>
                  <select
                    value={editingPost.category}
                    onChange={event => handleEditChange('category', event.target.value as Category)}
                    className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200"
                  >
                    {Object.values(Category).map(category => (
                      <option key={category} value={category}>
                        {CATEGORY_LABELS[category]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Status</label>
                  <select
                    value={editingPost.status}
                    onChange={event => handleEditChange('status', event.target.value as PostStatus)}
                    className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200"
                  >
                    {Object.values(PostStatus).map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Timestamp</label>
                  <input
                    type="text"
                    value={new Date(editingPost.timestamp).toLocaleString()}
                    readOnly
                    className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, subtitle }: { title: string; value: string | number; subtitle: string }) => (
  <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800">
    <div className="text-sm text-slate-400">{title}</div>
    <div className="text-3xl font-bold text-white mt-2">{value}</div>
    <div className="text-xs text-slate-500 mt-2">{subtitle}</div>
  </div>
);
