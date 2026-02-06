import React from 'react';
import { theme } from '../../theme';
import { styles } from './Modal.styles';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  confirmLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  confirmLabel = 'OK',
}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>
        <button
          style={styles.button}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.secondary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.primary;
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
};
