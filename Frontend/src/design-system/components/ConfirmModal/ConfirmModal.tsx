import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { Button } from '../Button';
import { theme } from '../../theme';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary' | 'success';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
}) => {
  const modalHeaderStyle: React.CSSProperties = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderBottom: 'none',
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: '1.25rem',
  };

  const messageStyle: React.CSSProperties = {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#333',
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing.sm,
    justifyContent: 'flex-end',
  };

  return (
    <BootstrapModal show={isOpen} onHide={onCancel} centered>
      <BootstrapModal.Header closeButton style={modalHeaderStyle}>
        <BootstrapModal.Title style={titleStyle}>
          {title}
        </BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body style={{ padding: theme.spacing.xl }}>
        <p style={messageStyle}>{message}</p>
      </BootstrapModal.Body>

      <BootstrapModal.Footer style={{ borderTop: 'none', padding: theme.spacing.xl }}>
        <div style={buttonGroupStyle}>
          <Button
            label={cancelLabel}
            onClick={onCancel}
            variant="primary"
            outline
          />
          <Button
            label={confirmLabel}
            onClick={onConfirm}
            variant={variant}
          />
        </div>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
