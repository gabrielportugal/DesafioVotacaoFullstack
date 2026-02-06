import type React from 'react';
import { theme } from '../../../../../design-system';

export const styles = {
  modalBody: {
    padding: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
  } as React.CSSProperties,

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  } as React.CSSProperties,

  label: {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: theme.colors.secondary,
    marginBottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,

  charCount: {
    fontSize: '0.85rem',
    fontWeight: 400,
    color: '#666',
  } as React.CSSProperties,

  infoBox: {
    backgroundColor: theme.colors.tertiary,
    padding: theme.spacing.md,
    borderRadius: '8px',
    border: `1px solid ${theme.colors.primary}`,
  } as React.CSSProperties,

  infoText: {
    fontSize: '0.9rem',
    color: theme.colors.secondary,
    lineHeight: '1.5',
  } as React.CSSProperties,

  buttonGroup: {
    display: 'flex',
    gap: theme.spacing.sm,
    width: '100%',
    justifyContent: 'flex-end',
  } as React.CSSProperties,
};
