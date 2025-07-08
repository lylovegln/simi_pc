import React, { useState } from 'react';
import { SharingPopup } from './components/SharingPopup';
import { ShareContent, SharePayload } from './types/sharing';
import { Share2, FileText, Image, Play, File, Type } from 'lucide-react';
import './App.css';

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<ShareContent>({
    type: 'text',
    title: '示例文本分享',
    text: '这是一个文本分享的示例，展示了如何使用分享弹窗组件。'
  });

  const sampleContents: ShareContent[] = [
    {
      type: 'text',
      title: '重要公告',
      text: '这是一个重要的公告内容，需要分享给团队成员。',
      description: '团队公告'
    },
    {
      type: 'image',
      title: '产品设计图',
      description: '最新的产品界面设计',
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop'
    },
    {
      type: 'article',
      title: '技术分享：React最佳实践',
      description: '深入探讨React开发中的最佳实践和性能优化技巧',
      url: 'https://example.com/react-best-practices'
    },
    {
      type: 'video',
      title: '产品演示视频',
      description: '最新功能的演示和使用指南',
      videoUrl: 'https://example.com/demo-video.mp4'
    },
    {
      type: 'file',
      title: '项目文档',
      description: '完整的项目需求文档',
      fileName: '项目需求文档.pdf',
      fileSize: '2048000', // 2MB in bytes
      fileUrl: 'https://example.com/project-requirements.pdf'
    }
  ];

  const handleShare = async (payload: SharePayload) => {
    console.log('分享内容:', payload);
    
    // 模拟分享API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 显示成功消息
    alert(`已成功分享到: ${payload.target.name}`);
  };

  const openPopup = (content: ShareContent) => {
    setCurrentContent(content);
    setIsPopupOpen(true);
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type size={20} />;
      case 'image': return <Image size={20} />;
      case 'article': return <FileText size={20} />;
      case 'video': return <Play size={20} />;
      case 'file': return <File size={20} />;
      default: return <File size={20} />;
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'text': return '文本';
      case 'image': return '图片';
      case 'article': return '文章';
      case 'video': return '视频';
      case 'file': return '文件';
      default: return '内容';
    }
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>私米分享组件演示</h1>
        <p>点击下方任意内容卡片来测试分享功能</p>
      </div>

      <div className="app__content">
        <div className="content-grid">
          {sampleContents.map((content, index) => (
            <div key={index} className="content-card">
              <div className="content-card__header">
                <div className="content-card__icon">
                  {getContentIcon(content.type)}
                </div>
                <div className="content-card__type">
                  {getContentTypeLabel(content.type)}
                </div>
              </div>
              <div className="content-card__body">
                <h3 className="content-card__title">{content.title}</h3>
                {content.description && (
                  <p className="content-card__description">{content.description}</p>
                )}
                {content.text && (
                  <p className="content-card__text">{content.text}</p>
                )}
                {content.fileName && (
                  <div className="content-card__file-info">
                    <span>文件: {content.fileName}</span>
                    {content.fileSize && (
                      <span>大小: {(parseInt(content.fileSize) / 1024 / 1024).toFixed(1)} MB</span>
                    )}
                  </div>
                )}
              </div>
              <button 
                className="content-card__share-btn"
                onClick={() => openPopup(content)}
              >
                <Share2 size={16} />
                <span>分享</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <SharingPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        content={currentContent}
        onShare={handleShare}
      />
    </div>
  );
};

export default App;