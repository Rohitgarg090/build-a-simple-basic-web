export const tokens = {
  primary: '#6366f1',
  primaryFg: '#ffffff',
  background: '#111827',
  surface: '#1f2937',
  surfaceAlt: '#374151',
  text: '#f9fafb',
  textMuted: '#9ca3af',
  accent: '#f59e0b',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  border: '#374151',
  fontFamily: 'Inter, system-ui, sans-serif',
  borderRadius: '8px',
  borderRadiusSm: '4px',
  borderRadiusLg: '16px',
} as const

export type Tokens = typeof tokens
}