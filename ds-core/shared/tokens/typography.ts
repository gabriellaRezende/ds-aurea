// Fonte única em todos os produtos Aurea — não é slot de tema, é token de DS.
const fontFamily = 'Inter' as const;

const sizes = {
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
} as const;

const weights = {
  regular: '400' as const,
  medium: '500' as const,
  bold: '700' as const,
};

// Papéis semânticos — composição de tamanho, peso e altura de linha.
// Componentes usam papel (body, label…) em vez de tamanho numérico.
const roles = {
  heading: {
    fontSize: sizes.xl,
    fontWeight: weights.bold,
    lineHeight: 32,
  },
  subheading: {
    fontSize: sizes.lg,
    fontWeight: weights.medium,
    lineHeight: 26,
  },
  body: {
    fontSize: sizes.md,
    fontWeight: weights.regular,
    lineHeight: 20,
  },
  label: {
    fontSize: sizes.md,
    fontWeight: weights.medium,
    lineHeight: 20,
  },
  caption: {
    fontSize: sizes.sm,
    fontWeight: weights.regular,
    lineHeight: 16,
  },
} as const;

export const typography = {
  fontFamily,
  sizes,
  weights,
  roles,
} as const;

export type TypographySize = keyof typeof sizes;
export type TypographyWeight = keyof typeof weights;
export type TypographyRole = keyof typeof roles;
