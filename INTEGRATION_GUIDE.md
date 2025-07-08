# 分享组件集成指南

本指南将帮助你在现有项目中集成私米分享组件。

## 🚀 快速集成

### 1. 复制必要文件

将以下文件复制到你的项目中：

```
src/
├── components/
│   ├── SharingPopup.tsx
│   ├── SharingPopup.css
│   ├── InternalGroupsList.tsx
│   ├── ExternalAppsList.tsx
│   ├── ContentPreview.tsx
│   └── ShareOptions.tsx
├── types/
│   └── sharing.ts
└── data/
    └── mockData.ts
```

### 2. 安装依赖

```bash
npm install lucide-react
# 或者
yarn add lucide-react
```

### 3. 基础使用

```tsx
import React, { useState } from 'react';
import { SharingPopup } from './components/SharingPopup';
import { ShareContent, SharePayload } from './types/sharing';

const MyComponent = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  const content: ShareContent = {
    type: 'text',
    title: '我的内容标题',
    text: '要分享的内容'
  };

  const handleShare = async (payload: SharePayload) => {
    // 处理分享逻辑
    console.log('分享数据:', payload);
  };

  return (
    <>
      <button onClick={() => setIsShareOpen(true)}>
        分享
      </button>
      
      <SharingPopup
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        content={content}
        onShare={handleShare}
      />
    </>
  );
};
```

## 🔧 高级集成

### 自定义用户群组数据

替换 `mockUserGroups` 为你的真实数据：

```tsx
// 从API获取用户群组
const fetchUserGroups = async (): Promise<UserGroup[]> => {
  const response = await fetch('/api/user-groups');
  return response.json();
};

// 在组件中使用
const [userGroups, setUserGroups] = useState<UserGroup[]>([]);

useEffect(() => {
  fetchUserGroups().then(setUserGroups);
}, []);
```

### 自定义外部应用

编辑 `mockExternalApps` 来配置支持的外部应用：

```tsx
export const externalApps: ExternalApp[] = [
  {
    id: 'slack',
    name: 'Slack',
    icon: '/icons/slack.svg',
    color: '#4A154B',
    category: 'productivity'
  },
  // 添加更多应用...
];
```

### 实现分享功能

```tsx
const handleShare = async (payload: SharePayload) => {
  if (payload.targetType === 'internal') {
    // 内部分享
    await shareToInternalGroup(payload);
  } else {
    // 外部分享
    await shareToExternalApp(payload);
  }
};

const shareToInternalGroup = async (payload: SharePayload) => {
  const response = await fetch('/api/share/internal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      groupId: payload.target.id,
      content: payload.content,
      options: payload.options,
      message: payload.message
    })
  });
  
  if (!response.ok) {
    throw new Error('分享失败');
  }
};

const shareToExternalApp = async (payload: SharePayload) => {
  const app = payload.target as ExternalApp;
  
  switch (app.id) {
    case 'wechat':
      await shareToWeChat(payload);
      break;
    case 'slack':
      await shareToSlack(payload);
      break;
    // 处理其他应用...
  }
};
```

## 📱 响应式适配

组件已经包含响应式设计，但你可以进一步自定义：

```css
/* 移动端优化 */
@media (max-width: 640px) {
  .sharing-popup {
    width: 95vw;
    max-height: 90vh;
  }
}

/* 大屏幕优化 */
@media (min-width: 1200px) {
  .sharing-popup {
    max-width: 700px;
  }
}
```

## 🎨 主题自定义

### 颜色主题

```css
:root {
  --primary-color: #007AFF;
  --primary-hover: #0056b3;
  --border-color: #e0e0e0;
  --text-color: #1a1a1a;
  --text-secondary: #666;
  --background: #ffffff;
  --background-secondary: #f8f9fa;
}

/* 暗色主题 */
[data-theme="dark"] {
  --primary-color: #0A84FF;
  --border-color: #333;
  --text-color: #ffffff;
  --text-secondary: #999;
  --background: #1a1a1a;
  --background-secondary: #2a2a2a;
}
```

### 自定义CSS变量

```css
.sharing-popup {
  --popup-border-radius: 16px;
  --popup-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  --animation-duration: 0.3s;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 🔌 与现有状态管理集成

### Redux 集成

```tsx
// actions/sharing.ts
export const openSharePopup = (content: ShareContent) => ({
  type: 'OPEN_SHARE_POPUP',
  payload: content
});

export const closeSharePopup = () => ({
  type: 'CLOSE_SHARE_POPUP'
});

// reducers/sharing.ts
interface SharingState {
  isOpen: boolean;
  content: ShareContent | null;
}

const sharingReducer = (state: SharingState, action: any) => {
  switch (action.type) {
    case 'OPEN_SHARE_POPUP':
      return {
        isOpen: true,
        content: action.payload
      };
    case 'CLOSE_SHARE_POPUP':
      return {
        isOpen: false,
        content: null
      };
    default:
      return state;
  }
};

// 在组件中使用
const SharingContainer = () => {
  const { isOpen, content } = useSelector(state => state.sharing);
  const dispatch = useDispatch();

  return (
    <SharingPopup
      isOpen={isOpen}
      onClose={() => dispatch(closeSharePopup())}
      content={content}
      onShare={handleShare}
    />
  );
};
```

### Zustand 集成

```tsx
// stores/sharing.ts
import { create } from 'zustand';

interface SharingStore {
  isOpen: boolean;
  content: ShareContent | null;
  openShare: (content: ShareContent) => void;
  closeShare: () => void;
}

export const useSharingStore = create<SharingStore>((set) => ({
  isOpen: false,
  content: null,
  openShare: (content) => set({ isOpen: true, content }),
  closeShare: () => set({ isOpen: false, content: null })
}));

// 在组件中使用
const SharingContainer = () => {
  const { isOpen, content, closeShare } = useSharingStore();

  return (
    <SharingPopup
      isOpen={isOpen}
      onClose={closeShare}
      content={content}
      onShare={handleShare}
    />
  );
};
```

## 📊 分析和监控

### 分享事件追踪

```tsx
const handleShare = async (payload: SharePayload) => {
  // 开始分享
  analytics.track('share_started', {
    content_type: payload.content.type,
    target_type: payload.targetType,
    target_name: payload.target.name
  });

  try {
    await performShare(payload);
    
    // 分享成功
    analytics.track('share_completed', {
      content_type: payload.content.type,
      target_type: payload.targetType,
      target_name: payload.target.name,
      has_message: !!payload.message
    });
  } catch (error) {
    // 分享失败
    analytics.track('share_failed', {
      content_type: payload.content.type,
      target_type: payload.targetType,
      error: error.message
    });
  }
};
```

### 性能监控

```tsx
import { performance } from 'perf_hooks';

const SharingPopup = ({ isOpen, ...props }) => {
  useEffect(() => {
    if (isOpen) {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // 记录渲染时间
        analytics.track('popup_render_time', {
          duration: renderTime,
          component: 'SharingPopup'
        });
      };
    }
  }, [isOpen]);

  // 组件渲染...
};
```

## 🧪 测试

### 单元测试示例

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SharingPopup } from './SharingPopup';

describe('SharingPopup', () => {
  const mockContent = {
    type: 'text' as const,
    title: 'Test Content',
    text: 'Test text'
  };

  const mockOnShare = jest.fn();
  const mockOnClose = jest.fn();

  test('renders when open', () => {
    render(
      <SharingPopup
        isOpen={true}
        content={mockContent}
        onShare={mockOnShare}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('分享内容')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('calls onClose when close button clicked', () => {
    render(
      <SharingPopup
        isOpen={true}
        content={mockContent}
        onShare={mockOnShare}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
```

## 🌐 国际化支持

```tsx
// i18n/sharing.ts
export const sharingTranslations = {
  zh: {
    shareContent: '分享内容',
    internalGroups: '群组分享',
    externalApps: '外部应用',
    selectGroup: '选择群组',
    searchApps: '搜索应用...',
    addMessage: '添加消息...',
    share: '分享',
    cancel: '取消'
  },
  en: {
    shareContent: 'Share Content',
    internalGroups: 'Internal Groups',
    externalApps: 'External Apps',
    selectGroup: 'Select Group',
    searchApps: 'Search apps...',
    addMessage: 'Add message...',
    share: 'Share',
    cancel: 'Cancel'
  }
};

// 在组件中使用
const { t } = useTranslation('sharing');

<span>{t('shareContent')}</span>
```

## 🚀 部署建议

### 1. 代码分割

```tsx
// 懒加载分享组件
const SharingPopup = lazy(() => import('./components/SharingPopup'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SharingPopup {...props} />
    </Suspense>
  );
};
```

### 2. 资源优化

```typescript
// 预加载外部应用图标
const preloadAppIcons = () => {
  mockExternalApps.forEach(app => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = app.icon;
    link.as = 'image';
    document.head.appendChild(link);
  });
};
```

### 3. CDN 配置

```javascript
// webpack.config.js 或 vite.config.ts
export default {
  build: {
    rollupOptions: {
      external: ['lucide-react'],
      output: {
        globals: {
          'lucide-react': 'LucideReact'
        }
      }
    }
  }
};
```

## 📞 支持和反馈

如果在集成过程中遇到问题，请：

1. 查看示例代码：`src/examples/SharingIntegration.tsx`
2. 阅读 API 文档：`README.md`
3. 提交 Issue 或 PR

祝你集成顺利！🎉