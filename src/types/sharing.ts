export type ContentType = 'text' | 'image' | 'article' | 'video' | 'file';

export type ShareTarget = 'internal' | 'external';

export interface UserGroup {
  id: string;
  name: string;
  memberCount: number;
  avatar?: string;
  description?: string;
}

export interface ExternalApp {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'social' | 'messaging' | 'productivity' | 'storage';
}

export interface ShareContent {
  type: ContentType;
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  videoUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  text?: string;
}

export interface ShareOptions {
  allowComments?: boolean;
  expireAfter?: number; // hours
  password?: string;
  allowDownload?: boolean;
}

export interface SharePayload {
  content: ShareContent;
  target: UserGroup | ExternalApp;
  targetType: ShareTarget;
  options?: ShareOptions;
  message?: string;
}