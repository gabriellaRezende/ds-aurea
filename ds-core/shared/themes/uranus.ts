// Tema Uranus — paleta de marca placeholder.
// Valores reais entram quando o inventário do Uranus for feito.
// Roxo como primary e azul como accent — distintos o suficiente do Helios
// para que o alternador de produto prove visualmente que cor é de produto.

import type { ThemeColors } from './contract';
import { defaultLight, defaultDark } from './default';

const uranusGradient = {
  colors: ['#7C3AED', '#4338CA'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
} as const;

export const uranusLight = {
  ...defaultLight,
  primary: '#7C3AED',
  accent: '#3B82F6',
  gradient: uranusGradient,
} satisfies ThemeColors;

export const uranusDark = {
  ...defaultDark,
  primary: '#7C3AED',
  accent: '#3B82F6',
  gradient: uranusGradient,
} satisfies ThemeColors;
