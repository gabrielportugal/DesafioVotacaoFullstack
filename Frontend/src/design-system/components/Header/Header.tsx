import React from 'react';
import { theme } from '../../theme';

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const headerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.md,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.colors.white,
    margin: 0,
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>
          {title}
          {subtitle && ` | ${subtitle}`}
        </h1>
      </div>
    </header>
  );
};
