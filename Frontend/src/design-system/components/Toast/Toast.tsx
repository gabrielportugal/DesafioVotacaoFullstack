import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import { theme } from '../../theme';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  show: boolean;
  message: string;
  variant?: ToastVariant;
  onClose: () => void;
  autoHideDuration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  show,
  message,
  variant = 'success',
  onClose,
  autoHideDuration = 3000,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return theme.colors.primary;
      case 'error':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      default:
        return theme.colors.primary;
    }
  };

  const toastStyle: React.CSSProperties = {
    backgroundColor: getBackgroundColor(),
    color: theme.colors.white,
    minWidth: '300px',
  };

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <BootstrapToast
        show={show}
        onClose={onClose}
        delay={autoHideDuration}
        autohide
        style={toastStyle}
      >
        <BootstrapToast.Header
          closeButton
          style={{
            backgroundColor: getBackgroundColor(),
            color: theme.colors.white,
            borderBottom: 'none',
          }}
        >
          <strong className="me-auto">
            {variant === 'success' && 'Sucesso'}
            {variant === 'error' && 'Erro'}
            {variant === 'warning' && 'Aviso'}
            {variant === 'info' && 'Informação'}
          </strong>
        </BootstrapToast.Header>
        <BootstrapToast.Body style={{ color: theme.colors.white }}>
          {message}
        </BootstrapToast.Body>
      </BootstrapToast>
    </ToastContainer>
  );
};
