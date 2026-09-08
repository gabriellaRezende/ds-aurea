// Adaptador mobile — compõe tokens compartilhados + tema num objeto de tema do Unistyles.
// O projeto consumidor passa esse objeto para StyleSheet.configure().

import { spacing } from '../../shared/tokens/spacing';
import { radius } from '../../shared/tokens/radius';
import { typography } from '../../shared/tokens/typography';
import { elevation } from '../../shared/tokens/elevation';
import { motion } from '../../shared/tokens/motion';
import { heliosLight, heliosDark } from '../../shared/themes/helios';

export const heliosLightTheme = {
  colors: heliosLight,
  spacing,
  borderRadius: radius,
  typography,
  elevation,
  motion,
} as const;

export const heliosDarkTheme = {
  colors: heliosDark,
  spacing,
  borderRadius: radius,
  typography,
  elevation,
  motion,
} as const;

// Tipo derivado do tema — usado pelo consumidor para fazer a declaration merging do Unistyles.
// Ver docs/INSTALLATION.md — seção "Configuração obrigatória do Babel".
export type AureaTheme = typeof heliosLightTheme;
