import React from 'react';
import { theme } from '../../theme';

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'primary' | 'secondary';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  className = '',
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return theme.colors.primary;
      case 'danger':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      default:
        return theme.colors.primary;
    }
  };

  const badgeStyle: React.CSSProperties = {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: getBackgroundColor(),
    color: theme.colors.white,
    display: 'inline-block',
  };

  return <span style={badgeStyle} className={className}>{label}</span>;
};
