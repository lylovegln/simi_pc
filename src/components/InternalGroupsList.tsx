import React from 'react';
import { Users, Check } from 'lucide-react';
import { UserGroup } from '../types/sharing';

interface InternalGroupsListProps {
  groups: UserGroup[];
  selectedGroup: UserGroup | null;
  onGroupSelect: (group: UserGroup) => void;
}

export const InternalGroupsList: React.FC<InternalGroupsListProps> = ({
  groups,
  selectedGroup,
  onGroupSelect
}) => {
  return (
    <div className="groups-list">
      <div className="groups-list__header">
        <span className="groups-list__title">选择群组</span>
        <span className="groups-list__count">{groups.length} 个群组</span>
      </div>
      <div className="groups-list__items">
        {groups.map((group) => {
          const isSelected = selectedGroup?.id === group.id;
          return (
            <div
              key={group.id}
              className={`group-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onGroupSelect(group)}
            >
              <div className="group-item__avatar">
                {group.avatar ? (
                  <img src={group.avatar} alt={group.name} />
                ) : (
                  <div className="group-item__avatar-placeholder">
                    <Users size={20} />
                  </div>
                )}
              </div>
              <div className="group-item__info">
                <div className="group-item__name">{group.name}</div>
                <div className="group-item__members">{group.memberCount} 名成员</div>
                {group.description && (
                  <div className="group-item__description">{group.description}</div>
                )}
              </div>
              {isSelected && (
                <div className="group-item__selected">
                  <Check size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};