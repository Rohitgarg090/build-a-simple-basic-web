import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  onClick,
}) => {
  const paddingStyles = {
    none: '0',
    sm: '12px',
    md: '20px',
    lg: '32px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)',
    padding: paddingStyles[padding],
    cursor: onClick ? 'pointer' : 'default',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
    color: '#f9fafb',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.2), 0 2px 6px rgba(0, 0, 0, 0.3)';
      e.currentTarget.style.transform = 'translateY(-1px)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { onClick(); } } : undefined}
    >
      {children}
    </div>
  );
};
}