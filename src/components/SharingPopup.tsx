import React, { useState, useCallback } from 'react';
import { X, Users, ExternalLink, Share2, Send } from 'lucide-react';
import { ContentType, ShareTarget, ShareContent, SharePayload, UserGroup, ExternalApp } from '../types/sharing';
import { InternalGroupsList } from './InternalGroupsList';
import { ExternalAppsList } from './ExternalAppsList';
import { ContentPreview } from './ContentPreview';
import { ShareOptions } from './ShareOptions';
import { mockUserGroups, mockExternalApps } from '../data/mockData';
import './SharingPopup.css';

interface SharingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: ShareContent;
  onShare: (payload: SharePayload) => Promise<void>;
}

export const SharingPopup: React.FC<SharingPopupProps> = ({
  isOpen,
  onClose,
  content,
  onShare
}) => {
  const [activeTab, setActiveTab] = useState<ShareTarget>('internal');
  const [selectedTarget, setSelectedTarget] = useState<UserGroup | ExternalApp | null>(null);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState({
    allowComments: true,
    expireAfter: 24,
    password: '',
    allowDownload: true
  });
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = useCallback(async () => {
    if (!selectedTarget) return;

    setIsSharing(true);
    try {
      await onShare({
        content,
        target: selectedTarget,
        targetType: activeTab,
        options,
        message: message.trim() || undefined
      });
      onClose();
    } catch (error) {
      console.error('Failed to share:', error);
    } finally {
      setIsSharing(false);
    }
  }, [selectedTarget, content, activeTab, options, message, onShare, onClose]);

  const handleTargetSelect = useCallback((target: UserGroup | ExternalApp) => {
    setSelectedTarget(target);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="sharing-popup-overlay" onClick={onClose}>
      <div className="sharing-popup" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sharing-popup__header">
          <div className="sharing-popup__title">
            <Share2 size={20} />
            <span>分享内容</span>
          </div>
          <button className="sharing-popup__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content Preview */}
        <div className="sharing-popup__content-preview">
          <ContentPreview content={content} />
        </div>

        {/* Tabs */}
        <div className="sharing-popup__tabs">
          <button
            className={`sharing-popup__tab ${activeTab === 'internal' ? 'active' : ''}`}
            onClick={() => setActiveTab('internal')}
          >
            <Users size={16} />
            <span>群组分享</span>
          </button>
          <button
            className={`sharing-popup__tab ${activeTab === 'external' ? 'active' : ''}`}
            onClick={() => setActiveTab('external')}
          >
            <ExternalLink size={16} />
            <span>外部应用</span>
          </button>
        </div>

        {/* Target Lists */}
        <div className="sharing-popup__targets">
          {activeTab === 'internal' ? (
            <InternalGroupsList
              groups={mockUserGroups}
              selectedGroup={selectedTarget as UserGroup}
              onGroupSelect={handleTargetSelect}
            />
          ) : (
            <ExternalAppsList
              apps={mockExternalApps}
              selectedApp={selectedTarget as ExternalApp}
              onAppSelect={handleTargetSelect}
            />
          )}
        </div>

        {/* Share Options (only for internal sharing) */}
        {activeTab === 'internal' && (
          <div className="sharing-popup__options">
            <ShareOptions options={options} onChange={setOptions} />
          </div>
        )}

        {/* Message */}
        <div className="sharing-popup__message">
          <textarea
            className="sharing-popup__message-input"
            placeholder={activeTab === 'internal' ? '添加消息给群组成员...' : '添加分享消息...'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="sharing-popup__actions">
          <button className="sharing-popup__cancel" onClick={onClose}>
            取消
          </button>
          <button
            className="sharing-popup__share"
            onClick={handleShare}
            disabled={!selectedTarget || isSharing}
          >
            <Send size={16} />
            <span>{isSharing ? '分享中...' : '分享'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};