import React from 'react';
import { FileText, Image, Play, File, Type } from 'lucide-react';
import { ShareContent } from '../types/sharing';

interface ContentPreviewProps {
  content: ShareContent;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ content }) => {
  const getContentIcon = () => {
    switch (content.type) {
      case 'text':
        return <Type size={20} />;
      case 'image':
        return <Image size={20} />;
      case 'article':
        return <FileText size={20} />;
      case 'video':
        return <Play size={20} />;
      case 'file':
        return <File size={20} />;
      default:
        return <File size={20} />;
    }
  };

  const getContentTypeLabel = () => {
    switch (content.type) {
      case 'text':
        return '文本';
      case 'image':
        return '图片';
      case 'article':
        return '文章';
      case 'video':
        return '视频';
      case 'file':
        return '文件';
      default:
        return '内容';
    }
  };

  const formatFileSize = (size: string | undefined) => {
    if (!size) return '';
    const sizeNum = parseFloat(size);
    if (sizeNum < 1024) return `${sizeNum} B`;
    if (sizeNum < 1024 * 1024) return `${(sizeNum / 1024).toFixed(1)} KB`;
    if (sizeNum < 1024 * 1024 * 1024) return `${(sizeNum / 1024 / 1024).toFixed(1)} MB`;
    return `${(sizeNum / 1024 / 1024 / 1024).toFixed(1)} GB`;
  };

  return (
    <div className="content-preview">
      <div className="content-preview__header">
        <div className="content-preview__icon">
          {getContentIcon()}
        </div>
        <div className="content-preview__type">
          {getContentTypeLabel()}
        </div>
      </div>

      <div className="content-preview__body">
        {/* Image Preview */}
        {content.type === 'image' && content.imageUrl && (
          <div className="content-preview__image">
            <img src={content.imageUrl} alt={content.title || '图片'} />
          </div>
        )}

        {/* Video Preview */}
        {content.type === 'video' && content.videoUrl && (
          <div className="content-preview__video">
            <video controls>
              <source src={content.videoUrl} />
            </video>
          </div>
        )}

        {/* Text Content */}
        <div className="content-preview__text">
          {content.title && (
            <div className="content-preview__title">{content.title}</div>
          )}
          {content.description && (
            <div className="content-preview__description">{content.description}</div>
          )}
          {content.text && (
            <div className="content-preview__text-content">{content.text}</div>
          )}
        </div>

        {/* File Information */}
        {content.type === 'file' && (
          <div className="content-preview__file-info">
            {content.fileName && (
              <div className="content-preview__file-name">{content.fileName}</div>
            )}
            {content.fileSize && (
              <div className="content-preview__file-size">
                大小: {formatFileSize(content.fileSize)}
              </div>
            )}
          </div>
        )}

        {/* URL */}
        {content.url && (
          <div className="content-preview__url">
            <a href={content.url} target="_blank" rel="noopener noreferrer">
              {content.url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};