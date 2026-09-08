// Tema Helios — paleta de marca do produto Helios.
// Estende o tema default e preenche os slots de produto (primary, accent, gradient).
//
// Nota: accent (#1BC47D) é o mesmo valor que success no tema default.
// Isso é uma coincidência do Helios — os dois slots são mantidos separados
// para que outros produtos possam divergir sem quebrar o contrato.

import type { ThemeColors } from './contract';
import { defaultLight, defaultDark } from './default';

// Gradient original CSS: linear-gradient(180deg, #E53935 -11.43%, #880E4F 120.48%)
// Convertido para o formato GradientConfig (cru, sem sintaxe CSS).
// expo-linear-gradient no mobile; CSS no web.
const heliosGradient = {
  colors: ['#E53935', '#880E4F'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
} as const;

export const heliosLight = {
  ...defaultLight,
  primary: '#E53935',
  accent: '#1BC47D',
  gradient: heliosGradient,
} satisfies ThemeColors;

export const heliosDark = {
  ...defaultDark,
  primary: '#E53935',
  accent: '#1BC47D',
  gradient: heliosGradient,
} satisfies ThemeColors;
