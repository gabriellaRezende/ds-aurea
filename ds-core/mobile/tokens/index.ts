import { spacing } from '../../shared/tokens/spacing';
import { radius } from '../../shared/tokens/radius';
import { typography } from '../../shared/tokens/typography';
import { elevation } from '../../shared/tokens/elevation';
import { motion } from '../../shared/tokens/motion';
import { aureaLight, aureaDark } from '../../shared/themes/aurea';

const base = { spacing, borderRadius: radius, typography, elevation, motion } as const;

export const aureaLightTheme = { colors: aureaLight, ...base } as const;
export const aureaDarkTheme = { colors: aureaDark, ...base } as const;

// Tipo derivado — usado pelo consumidor para a declaration merging do Unistyles.
export type AureaTheme = typeof aureaLightTheme;
