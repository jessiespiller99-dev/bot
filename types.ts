
export enum PostStatus {
  PENDING = 'PENDING',
  LIVE = 'LIVE',
  FLAGGED = 'FLAGGED',
  EXPIRED = 'EXPIRED'
}

export enum Category {
  ESCORT = 'Personals Services Escorts',
  CASUAL = 'Personals Casual Encounters'
}

export interface AdPost {
  id: string;
  title: string;
  description: string;
  age: number;
  city: string;
  category: Category;
  status: PostStatus;
  timestamp: string;
  workerId: string;
  ipAddress: string;
  liveLink?: string;
}

export interface WorkerPC {
  id: string;
  name: string;
  ipAddress: string;
  status: 'ONLINE' | 'OFFLINE' | 'POSTING';
  lastSeen: string;
  totalPosts: number;
}

export interface CampaignConfig {
  titles: string[];
  descriptions: string[];
  cities: string[];
  ages: number[];
  category: Category;
  imageUrls: string[];
}
