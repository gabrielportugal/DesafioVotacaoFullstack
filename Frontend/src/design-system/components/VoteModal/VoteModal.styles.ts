import { theme } from '../../theme';
import type { VoteChoice } from '../../../types/Vote';

export const styles = {
  modalHeader: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderBottom: 'none',
  } as React.CSSProperties,

  title: {
    fontWeight: 700,
    fontSize: '1.25rem',
  } as React.CSSProperties,

  modalBody: {
    padding: theme.spacing.xl,
  } as React.CSSProperties,

  topicContainer: {
    marginBottom: theme.spacing.xl,
  } as React.CSSProperties,

  sectionTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  } as React.CSSProperties,

  description: {
    fontSize: '0.875rem',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  } as React.CSSProperties,

  formGroup: {
    marginBottom: theme.spacing.xl,
  } as React.CSSProperties,

  formLabel: {
    fontWeight: 600,
    color: theme.colors.text.primary,
  } as React.CSSProperties,

  inputError: {
    borderColor: '#dc3545',
    borderWidth: '2px',
  } as React.CSSProperties,

  errorMessage: {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginTop: theme.spacing.xs,
    fontWeight: 500,
  } as React.CSSProperties,

  voteContainer: {
    marginBottom: theme.spacing.md,
  } as React.CSSProperties,

  voteLabel: {
    fontWeight: 600,
    color: theme.colors.text.primary,
    display: 'block',
    marginBottom: theme.spacing.sm,
  } as React.CSSProperties,

  voteButtonsContainer: {
    display: 'flex',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  } as React.CSSProperties,

  modalFooter: {
    borderTop: 'none',
    padding: theme.spacing.xl,
  } as React.CSSProperties,

  getVoteButtonStyle: (
    choice: VoteChoice | null,
    voteChoice: VoteChoice,
    isSubmitting: boolean
  ): React.CSSProperties => {
    const isSelected = choice === voteChoice;
    const isYes = voteChoice === 'Sim';
    
    const baseColor = isYes ? theme.colors.primary : '#dc3545';
    
    return {
      flex: 1,
      padding: theme.spacing.lg,
      border: `2px solid ${baseColor}`,
      backgroundColor: isSelected ? baseColor : 'transparent',
      color: isSelected ? theme.colors.white : baseColor,
      borderRadius: theme.borderRadius.sm,
      fontSize: '1rem',
      fontWeight: 600,
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      opacity: isSubmitting ? 0.6 : 1,
      transition: 'all 0.2s ease',
    };
  },
};
