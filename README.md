# 私米分享组件 (Simi Sharing Component)

一个功能丰富的分享弹窗组件，支持多种内容类型和分享目标。

## 功能特点

### 📱 分享目标
- **内部群组分享**: 支持组织内部的用户群组
- **外部应用分享**: 支持社交媒体、消息应用、生产力工具、云存储等

### 📄 支持的内容类型
- **文本**: 纯文本内容分享
- **图片**: 图片文件分享
- **文章**: 文章链接分享
- **视频**: 视频内容分享
- **文件**: 各种文件类型分享

### ⚙️ 分享设置 (内部分享)
- 过期时间设置 (1小时 - 永不过期)
- 访问密码保护
- 评论权限控制
- 下载权限控制

### 🎨 设计特色
- 现代化的UI设计
- 响应式布局
- 流畅的动画效果
- 搜索和分类功能
- 支持中文界面

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 组件使用

### 基本用法

```tsx
import { SharingPopup } from './components/SharingPopup';
import { ShareContent, SharePayload } from './types/sharing';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const content: ShareContent = {
    type: 'text',
    title: '分享标题',
    description: '分享描述',
    text: '要分享的文本内容'
  };

  const handleShare = async (payload: SharePayload) => {
    console.log('分享数据:', payload);
    // 处理分享逻辑
  };

  return (
    <SharingPopup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      content={content}
      onShare={handleShare}
    />
  );
};
```

### 内容类型示例

#### 文本分享
```tsx
const textContent: ShareContent = {
  type: 'text',
  title: '重要公告',
  text: '这是一个重要的公告内容',
  description: '团队公告'
};
```

#### 图片分享
```tsx
const imageContent: ShareContent = {
  type: 'image',
  title: '产品设计图',
  description: '最新的产品界面设计',
  imageUrl: 'https://example.com/image.jpg'
};
```

#### 文章分享
```tsx
const articleContent: ShareContent = {
  type: 'article',
  title: '技术分享文章',
  description: '深入探讨最佳实践',
  url: 'https://example.com/article'
};
```

#### 视频分享
```tsx
const videoContent: ShareContent = {
  type: 'video',
  title: '产品演示视频',
  description: '最新功能演示',
  videoUrl: 'https://example.com/video.mp4'
};
```

#### 文件分享
```tsx
const fileContent: ShareContent = {
  type: 'file',
  title: '项目文档',
  description: '完整的项目需求文档',
  fileName: '需求文档.pdf',
  fileSize: '2048000', // 字节
  fileUrl: 'https://example.com/file.pdf'
};
```

## API 文档

### SharingPopup Props

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `isOpen` | `boolean` | ✅ | 控制弹窗显示状态 |
| `onClose` | `() => void` | ✅ | 关闭弹窗的回调函数 |
| `content` | `ShareContent` | ✅ | 要分享的内容对象 |
| `onShare` | `(payload: SharePayload) => Promise<void>` | ✅ | 分享操作的回调函数 |

### ShareContent 接口

```tsx
interface ShareContent {
  type: 'text' | 'image' | 'article' | 'video' | 'file';
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  videoUrl?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string; // 字节数
  text?: string;
}
```

### SharePayload 接口

```tsx
interface SharePayload {
  content: ShareContent;
  target: UserGroup | ExternalApp;
  targetType: 'internal' | 'external';
  options?: ShareOptions;
  message?: string;
}
```

## 自定义配置

### 添加新的外部应用

编辑 `src/data/mockData.ts` 文件中的 `mockExternalApps` 数组：

```tsx
{
  id: 'new-app',
  name: '新应用',
  icon: 'https://example.com/icon.svg',
  color: '#FF6B6B',
  category: 'social' // 'social' | 'messaging' | 'productivity' | 'storage'
}
```

### 添加新的用户群组

编辑 `src/data/mockData.ts` 文件中的 `mockUserGroups` 数组：

```tsx
{
  id: 'new-group',
  name: '新群组',
  memberCount: 20,
  description: '群组描述',
  avatar: 'https://example.com/avatar.jpg' // 可选
}
```

## 样式自定义

组件使用 CSS 自定义属性，可以通过覆盖 CSS 变量来自定义主题：

```css
.sharing-popup {
  --primary-color: #007AFF;
  --border-radius: 16px;
  --animation-duration: 0.2s;
}
```

## 技术栈

- **React 18** - 现代化的React框架
- **TypeScript** - 类型安全的JavaScript
- **Lucide React** - 现代化的图标库
- **Vite** - 快速的构建工具
- **CSS3** - 现代化的样式

## 浏览器支持

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件！
