import type React from 'react';
import { theme } from '../../../../../design-system';

export const styles = {
  container: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.tertiary,
    borderRadius: '8px',
  } as React.CSSProperties,

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  } as React.CSSProperties,

  label: {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: theme.colors.secondary,
    marginBottom: 0,
  } as React.CSSProperties,

  inputGroup: {
    display: 'flex',
    gap: theme.spacing.sm,
    alignItems: 'center',
  } as React.CSSProperties,

  input: {
    flex: 1,
    minWidth: '120px',
  } as React.CSSProperties,
};
