import { UserGroup, ExternalApp } from '../types/sharing';

export const mockUserGroups: UserGroup[] = [
  {
    id: '1',
    name: '产品团队',
    memberCount: 12,
    description: '产品开发和设计团队',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '2',
    name: '技术讨论组',
    memberCount: 25,
    description: '技术分享和讨论',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '3',
    name: '市场营销',
    memberCount: 8,
    description: '市场推广和活动策划',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face'
  },
  {
    id: '4',
    name: '公司全员',
    memberCount: 156,
    description: '全公司成员群组'
  },
  {
    id: '5',
    name: '设计师联盟',
    memberCount: 15,
    description: 'UI/UX设计师交流群',
    avatar: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop&crop=face'
  }
];

export const mockExternalApps: ExternalApp[] = [
  // Social Media
  {
    id: 'wechat',
    name: '微信',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/wechat.svg',
    color: '#07C160',
    category: 'social'
  },
  {
    id: 'weibo',
    name: '微博',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/sinaweibo.svg',
    color: '#E6162D',
    category: 'social'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/twitter.svg',
    color: '#1DA1F2',
    category: 'social'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/facebook.svg',
    color: '#1877F2',
    category: 'social'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/linkedin.svg',
    color: '#0A66C2',
    category: 'social'
  },

  // Messaging
  {
    id: 'qq',
    name: 'QQ',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/tencentqq.svg',
    color: '#EB1923',
    category: 'messaging'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/telegram.svg',
    color: '#26A5E4',
    category: 'messaging'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/whatsapp.svg',
    color: '#25D366',
    category: 'messaging'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/discord.svg',
    color: '#5865F2',
    category: 'messaging'
  },

  // Productivity
  {
    id: 'slack',
    name: 'Slack',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/slack.svg',
    color: '#4A154B',
    category: 'productivity'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/microsoftteams.svg',
    color: '#6264A7',
    category: 'productivity'
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/notion.svg',
    color: '#000000',
    category: 'productivity'
  },
  {
    id: 'trello',
    name: 'Trello',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/trello.svg',
    color: '#0052CC',
    category: 'productivity'
  },

  // Storage
  {
    id: 'googledrive',
    name: 'Google Drive',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/googledrive.svg',
    color: '#4285F4',
    category: 'storage'
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/dropbox.svg',
    color: '#0061FF',
    category: 'storage'
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/microsoftonedrive.svg',
    color: '#0078D4',
    category: 'storage'
  },
  {
    id: 'baidupan',
    name: '百度网盘',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/baidu.svg',
    color: '#2932E1',
    category: 'storage'
  }
];