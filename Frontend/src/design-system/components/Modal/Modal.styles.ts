import { theme } from '../../theme';

export const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } as React.CSSProperties,

  modal: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xxl,
    maxWidth: '500px',
    width: '90%',
    boxShadow: theme.shadows.lg,
  } as React.CSSProperties,

  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,

  message: {
    fontSize: '1rem',
    color: theme.colors.text.secondary,
    lineHeight: '1.6',
    marginBottom: theme.spacing.xl,
  } as React.CSSProperties,

  button: {
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    border: 'none',
    borderRadius: theme.borderRadius.sm,
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
};
