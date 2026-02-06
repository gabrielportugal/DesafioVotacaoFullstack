export const theme = {
  colors: {
    primary: '#3fa110',
    secondary: '#146E37',
    tertiary: '#D7E6C8',
    white: '#F3F3F3',
    black: '#030303',
    text: {
      primary: '#030303',
      secondary: '#666666',
      light: '#999999',
    },
    background: {
      default: '#F3F3F3',
      card: '#FFFFFF',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
};

export type Theme = typeof theme;
