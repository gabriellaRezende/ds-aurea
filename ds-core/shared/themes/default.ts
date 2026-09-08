// Tema default — feedback, layout, texto, bordas e utilitários.
// Não inclui primary, accent nem gradient — esses slots são sempre de produto.
// Produtos estendem esse objeto e preenchem os slots de marca.

import type { ThemeColors } from './contract';

type DefaultColors = Omit<ThemeColors, 'primary' | 'accent' | 'gradient'>;

export const defaultLight = {
  success: '#1BC47D',
  info: '#40C4FF',
  warning: '#FFC107',
  error: '#FF5252',

  background: '#F6F8FA',
  surface: '#FFFFFF',
  surfaceCard: '#FFFFFF',
  backgroundSubtle: '#ECEFF1',

  textPrimary: '#263238',
  textSecondary: '#37474F',
  textTertiary: '#607D8B',
  textDisabled: '#9E9E9E',

  borderDefault: '#B0BEC5',
  borderSubtle: '#CFD8DC',

  overlay: 'rgba(38, 50, 56, 0.12)',
  backgroundDisabled: '#E0E0E0',
} satisfies DefaultColors;

export const defaultDark = {
  success: '#1BC47D',
  info: '#40C4FF',
  warning: '#FFC107',
  error: '#FF5252',

  background: '#121212',
  surface: '#2B2B2B',
  surfaceCard: '#1E1E1E',
  backgroundSubtle: '#263238',

  textPrimary: '#ECEFF1',
  textSecondary: '#CFD8DC',
  textTertiary: '#90A4AE',
  textDisabled: '#757575',

  borderDefault: '#546E7A',
  borderSubtle: '#37474F',

  overlay: 'rgba(236, 239, 241, 0.12)',
  backgroundDisabled: '#424242',
} satisfies DefaultColors;
