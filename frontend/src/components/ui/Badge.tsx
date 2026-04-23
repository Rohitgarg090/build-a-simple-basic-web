import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className = '' }) => {
  const variantStyles: Record<string, string> = {
    success: 'bg-green-500 bg-opacity-20 text-green-400 border border-green-500 border-opacity-40',
    warning: 'bg-amber-500 bg-opacity-20 text-amber-400 border border-amber-500 border-opacity-40',
    error: 'bg-red-500 bg-opacity-20 text-red-400 border border-red-500 border-opacity-40',
    info: 'bg-amber-500 bg-opacity-20 text-amber-400 border border-amber-500 border-opacity-40',
    default: 'bg-gray-700 bg-opacity-60 text-gray-300 border border-gray-600 border-opacity-40',
  };

  const inlineStyles: Record<string, React.CSSProperties> = {
    success: { backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e', borderColor: 'rgba(34,197,94,0.3)' },
    warning: { backgroundColor: 'rgba(245,158,11,0.15)', color: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)' },
    error: { backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' },
    info: { backgroundColor: 'rgba(245,158,11,0.15)', color: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)' },
    default: { backgroundColor: 'rgba(31,41,55,0.8)', color: '#9ca3af', borderColor: 'rgba(55,65,81,0.6)' },
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
      style={inlineStyles[variant]}
    >
      {children}
    </span>
  );
};
}