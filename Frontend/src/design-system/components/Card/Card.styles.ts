import { theme } from '../../theme';

export const styles = {
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.lg,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.card,
    borderBottom: `1px solid ${theme.colors.tertiary}`,
  } as React.CSSProperties,

  iconContainer: {
    fontSize: '2rem',
    color: theme.colors.primary,
    flexShrink: 0,
  } as React.CSSProperties,

  content: {
    flex: 1,
  } as React.CSSProperties,

  title: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  } as React.CSSProperties,

  description: {
    fontSize: '0.875rem',
    color: theme.colors.text.secondary,
    lineHeight: '1.5',
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,

  button: {
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
};
