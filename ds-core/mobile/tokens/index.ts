import { spacing } from '../../shared/tokens/spacing';
import { radius } from '../../shared/tokens/radius';
import { typography } from '../../shared/tokens/typography';
import { elevation } from '../../shared/tokens/elevation';
import { motion } from '../../shared/tokens/motion';
import { heliosLight, heliosDark } from '../../shared/themes/helios';
import { uranusLight, uranusDark } from '../../shared/themes/uranus';

const base = { spacing, borderRadius: radius, typography, elevation, motion } as const;

export const heliosLightTheme = { colors: heliosLight, ...base } as const;
export const heliosDarkTheme = { colors: heliosDark, ...base } as const;
export const uranusLightTheme = { colors: uranusLight, ...base } as const;
export const uranusDarkTheme = { colors: uranusDark, ...base } as const;

// Tipo derivado — usado pelo consumidor para a declaration merging do Unistyles.
export type AureaTheme = typeof heliosLightTheme;
