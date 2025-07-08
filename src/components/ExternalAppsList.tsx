import React, { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { ExternalApp } from '../types/sharing';

interface ExternalAppsListProps {
  apps: ExternalApp[];
  selectedApp: ExternalApp | null;
  onAppSelect: (app: ExternalApp) => void;
}

export const ExternalAppsList: React.FC<ExternalAppsListProps> = ({
  apps,
  selectedApp,
  onAppSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'social', name: '社交媒体' },
    { id: 'messaging', name: '消息应用' },
    { id: 'productivity', name: '生产力工具' },
    { id: 'storage', name: '云存储' }
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="external-apps">
      <div className="external-apps__search">
        <div className="search-input">
          <Search size={16} />
          <input
            type="text"
            placeholder="搜索应用..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="external-apps__categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="external-apps__grid">
        {filteredApps.map((app) => {
          const isSelected = selectedApp?.id === app.id;
          return (
            <div
              key={app.id}
              className={`external-app-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onAppSelect(app)}
              style={{ '--app-color': app.color } as React.CSSProperties}
            >
              <div className="external-app-item__icon">
                <img src={app.icon} alt={app.name} />
              </div>
              <div className="external-app-item__name">{app.name}</div>
              {isSelected && (
                <div className="external-app-item__selected">
                  <Check size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="external-apps__empty">
          <p>未找到匹配的应用</p>
        </div>
      )}
    </div>
  );
};