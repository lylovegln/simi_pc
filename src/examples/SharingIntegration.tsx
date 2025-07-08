import React, { useState } from 'react';
import { SharingPopup } from '../components/SharingPopup';
import { ShareContent, SharePayload } from '../types/sharing';
import { Share2 } from 'lucide-react';
import './SharingIntegration.css';

/**
 * 示例：如何在现有应用中集成分享组件
 * Example: How to integrate the sharing component into existing applications
 */

// 模拟的内容项接口
interface ContentItem {
  id: string;
  type: 'text' | 'image' | 'article' | 'video' | 'file';
  title: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  createdAt: string;
  author: string;
}

// 模拟的内容数据
const mockContentItems: ContentItem[] = [
  {
    id: '1',
    type: 'article',
    title: '如何提高团队协作效率',
    description: '分享一些实用的团队协作技巧和工具推荐',
    url: 'https://example.com/teamwork-tips',
    createdAt: '2024-01-15',
    author: '张三'
  },
  {
    id: '2',
    type: 'image',
    title: '新产品界面设计',
    description: 'V2.0 版本的用户界面设计方案',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    createdAt: '2024-01-14',
    author: '李四'
  },
  {
    id: '3',
    type: 'file',
    title: '项目计划文档',
    description: '2024年第一季度项目计划',
    url: 'https://example.com/project-plan.pdf',
    createdAt: '2024-01-13',
    author: '王五'
  }
];

export const SharingIntegration: React.FC = () => {
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [currentShareContent, setCurrentShareContent] = useState<ShareContent | null>(null);

  // 将内容项转换为分享内容格式
  const convertToShareContent = (item: ContentItem): ShareContent => {
    const baseContent = {
      type: item.type as ShareContent['type'],
      title: item.title,
      description: item.description,
      url: item.url
    };

    switch (item.type) {
      case 'image':
        return {
          ...baseContent,
          imageUrl: item.imageUrl
        };
      case 'file':
        return {
          ...baseContent,
          fileName: `${item.title}.pdf`,
          fileUrl: item.url,
          fileSize: '1024000' // 1MB (模拟)
        };
      default:
        return baseContent;
    }
  };

  // 处理分享操作
  const handleShare = (item: ContentItem) => {
    const shareContent = convertToShareContent(item);
    setCurrentShareContent(shareContent);
    setIsSharePopupOpen(true);
  };

  // 分享完成回调
  const handleShareComplete = async (payload: SharePayload) => {
    try {
      // 这里可以调用你的API来处理分享
      console.log('分享内容:', payload);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 显示成功消息
      alert(`成功分享到 ${payload.target.name}！`);
      
      // 可以在这里记录分享统计、发送通知等
      logShareActivity(payload);
      
    } catch (error) {
      console.error('分享失败:', error);
      alert('分享失败，请重试');
    }
  };

  // 记录分享活动（示例）
  const logShareActivity = (payload: SharePayload) => {
    const logData = {
      contentId: payload.content.title,
      targetType: payload.targetType,
      targetName: payload.target.name,
      timestamp: new Date().toISOString(),
      message: payload.message
    };
    
    // 发送到分析服务
    console.log('分享活动记录:', logData);
    
    // 可以发送到Google Analytics、百度统计等
    // analytics.track('content_shared', logData);
  };

  return (
    <div className="sharing-integration">
      <h2>内容列表</h2>
      <p className="subtitle">点击分享按钮来分享内容</p>
      
      <div className="content-list">
        {mockContentItems.map((item) => (
          <div key={item.id} className="content-item">
            <div className="content-header">
              <h3>{item.title}</h3>
              <button 
                className="share-button"
                onClick={() => handleShare(item)}
                title="分享这个内容"
              >
                <Share2 size={18} />
                分享
              </button>
            </div>
            
            {item.description && (
              <p className="content-description">{item.description}</p>
            )}
            
            <div className="content-meta">
              <span className="author">作者: {item.author}</span>
              <span className="date">创建时间: {item.createdAt}</span>
              <span className="type">类型: {getTypeLabel(item.type)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 分享弹窗 */}
      {currentShareContent && (
        <SharingPopup
          isOpen={isSharePopupOpen}
          onClose={() => {
            setIsSharePopupOpen(false);
            setCurrentShareContent(null);
          }}
          content={currentShareContent}
          onShare={handleShareComplete}
        />
      )}


    </div>
  );
};

// 辅助函数：获取类型标签
const getTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    text: '文本',
    image: '图片',
    article: '文章',
    video: '视频',
    file: '文件'
  };
  return labels[type] || type;
};

// 导出默认组件
export default SharingIntegration;