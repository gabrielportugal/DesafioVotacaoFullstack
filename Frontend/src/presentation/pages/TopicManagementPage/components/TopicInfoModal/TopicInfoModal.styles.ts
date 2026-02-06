import { theme } from '../../../../../design-system';

export const styles = {
  modalBody: {
    padding: theme.spacing.xl,
    maxHeight: '90vh',
    overflowY: 'auto',
  } as React.CSSProperties,

  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
  } as React.CSSProperties,

  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    alignItems: 'flex-start',
  } as React.CSSProperties,

  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.colors.text.primary,
  } as React.CSSProperties,

  description: {
    fontSize: '0.875rem',
    color: theme.colors.text.secondary,
    lineHeight: '1.5',
  } as React.CSSProperties,

  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  } as React.CSSProperties,
  
  infoSession: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  } as React.CSSProperties,

  sessionsContainer: {
    maxHeight: '140px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  } as React.CSSProperties,

  label: {
    fontWeight: 700,
    fontSize: '0.875rem',
    color: theme.colors.text.primary,
  } as React.CSSProperties,

  value: {
    fontSize: '0.875rem',
    color: theme.colors.text.secondary,
    lineHeight: '1.5',
  } as React.CSSProperties,

  sessionItem: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.xs,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  } as React.CSSProperties,

  sessionInfo: {
    fontSize: '0.875rem',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  } as React.CSSProperties,

  loadingMessage: {
    textAlign: 'center',
    padding: theme.spacing.xl,
    color: theme.colors.text.secondary,
  } as React.CSSProperties,

  errorMessage: {
    textAlign: 'center',
    padding: theme.spacing.xl,
    color: '#dc3545',
  } as React.CSSProperties,

  resultContainer: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.sm,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  } as React.CSSProperties,

  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,

  resultLabel: {
    fontSize: '0.875rem',
    color: theme.colors.text.primary,
    fontWeight: 600,
  } as React.CSSProperties,

  resultValue: {
    fontSize: '1rem',
    fontWeight: 700,
  } as React.CSSProperties,
};
