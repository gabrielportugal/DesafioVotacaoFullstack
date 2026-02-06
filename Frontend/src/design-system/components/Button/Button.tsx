import { Button as BootstrapButton } from 'react-bootstrap';

export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size,
  disabled = false,
  fullWidth = false,
  outline = false,
}) => {
  const buttonVariant = outline ? `outline-${variant}` : variant;

  return (
    <BootstrapButton
      variant={buttonVariant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {label}
    </BootstrapButton>
  );
};
