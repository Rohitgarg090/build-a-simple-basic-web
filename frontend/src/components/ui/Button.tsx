import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'inherit',
    fontWeight: 600,
    borderRadius: '8px',
    border: '1px solid transparent',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    pointerEvents: disabled || loading ? 'none' : 'auto',
    transition: 'background 0.2s ease, opacity 0.2s ease, border-color 0.2s ease',
    outline: 'none',
    opacity: disabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      fontSize: '13px',
      padding: '6px 12px',
      height: '32px',
    },
    md: {
      fontSize: '14px',
      padding: '8px 16px',
      height: '40px',
    },
    lg: {
      fontSize: '16px',
      padding: '10px 20px',
      height: '48px',
    },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#6366f1',
      color: '#ffffff',
      borderColor: '#6366f1',
    },
    secondary: {
      backgroundColor: '#1f2937',
      color: '#f9fafb',
      borderColor: '#374151',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#f9fafb',
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      borderColor: '#ef4444',
    },
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const spinnerSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

  const Spinner = () => (
    <svg
      width={spinnerSize}
      height={spinnerSize}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'spin 0.8s linear infinite',
        flexShrink: 0,
      }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeOpacity="0.3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <button
      type={type}
      style={combinedStyles}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      aria-busy={loading}
      aria-disabled={disabled || loading}
    >
      {loading && <Spinner />}
      {loading ? <span style={{ opacity: 0.8 }}>{children}</span> : children}
    </button>
  );
};
}