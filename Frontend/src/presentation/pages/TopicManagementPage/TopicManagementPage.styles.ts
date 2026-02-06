import { theme } from '../../../design-system';

export const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: theme.colors.background.default,
  } as React.CSSProperties,

  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: theme.spacing.xl,
    width: '100%',
    boxSizing: 'border-box',
  } as React.CSSProperties,

  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  } as React.CSSProperties,

  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  } as React.CSSProperties,

  title: {
    flex: 1,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.colors.text.primary,
    margin: 0,
  } as React.CSSProperties,

  message: {
    padding: theme.spacing.xl,
    textAlign: 'center',
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.md,
    color: theme.colors.text.secondary,
  } as React.CSSProperties,

  errorMessage: (messageStyle: React.CSSProperties) => ({
    ...messageStyle,
    color: '#dc3545',
    marginBottom: theme.spacing.lg,
  }) as React.CSSProperties,

  actionButtons: {
    display: 'flex',
    gap: theme.spacing.sm,
  } as React.CSSProperties,
};
