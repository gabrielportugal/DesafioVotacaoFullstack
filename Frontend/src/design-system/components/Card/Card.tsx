import React from 'react';
import { theme } from '../../theme';
import { styles } from './Card.styles';

export interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  buttonLabel = 'Acessar',
  onButtonClick,
  className = '',
}) => {
  return (
    <div style={styles.card} className={className}>
      {icon && <div style={styles.iconContainer}>{icon}</div>}
      
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        
        {onButtonClick && (
          <button
            style={styles.button}
            onClick={onButtonClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.primary;
              e.currentTarget.style.color = theme.colors.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.colors.primary;
            }}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};
