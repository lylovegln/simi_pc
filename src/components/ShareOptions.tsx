import React from 'react';
import { Clock, Lock, MessageCircle, Download } from 'lucide-react';

interface ShareOptionsType {
  allowComments: boolean;
  expireAfter: number;
  password: string;
  allowDownload: boolean;
}

interface ShareOptionsProps {
  options: ShareOptionsType;
  onChange: (options: ShareOptionsType) => void;
}

export const ShareOptions: React.FC<ShareOptionsProps> = ({ options, onChange }) => {
  const updateOption = <K extends keyof ShareOptionsType>(
    key: K,
    value: ShareOptionsType[K]
  ) => {
    onChange({ ...options, [key]: value });
  };

  const expirationOptions = [
    { value: 1, label: '1小时' },
    { value: 6, label: '6小时' },
    { value: 24, label: '1天' },
    { value: 72, label: '3天' },
    { value: 168, label: '1周' },
    { value: 0, label: '永不过期' }
  ];

  return (
    <div className="share-options">
      <div className="share-options__header">
        <span>分享设置</span>
      </div>

      <div className="share-options__section">
        <div className="share-options__item">
          <div className="share-options__item-header">
            <Clock size={16} />
            <span>过期时间</span>
          </div>
          <select
            className="share-options__select"
            value={options.expireAfter}
            onChange={(e) => updateOption('expireAfter', Number(e.target.value))}
          >
            {expirationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="share-options__item">
          <div className="share-options__item-header">
            <Lock size={16} />
            <span>访问密码</span>
          </div>
          <input
            type="password"
            className="share-options__input"
            placeholder="可选，设置访问密码"
            value={options.password}
            onChange={(e) => updateOption('password', e.target.value)}
          />
        </div>

        <div className="share-options__toggles">
          <label className="share-options__toggle">
            <input
              type="checkbox"
              checked={options.allowComments}
              onChange={(e) => updateOption('allowComments', e.target.checked)}
            />
            <div className="share-options__toggle-slider"></div>
            <div className="share-options__toggle-label">
              <MessageCircle size={16} />
              <span>允许评论</span>
            </div>
          </label>

          <label className="share-options__toggle">
            <input
              type="checkbox"
              checked={options.allowDownload}
              onChange={(e) => updateOption('allowDownload', e.target.checked)}
            />
            <div className="share-options__toggle-slider"></div>
            <div className="share-options__toggle-label">
              <Download size={16} />
              <span>允许下载</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};