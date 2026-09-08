export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  safeArea: {
    header: 48,
    footer: 64,
  },
} as const;

export type Spacing = keyof Omit<typeof spacing, 'safeArea'>;
export type SafeAreaSpacing = keyof typeof spacing.safeArea;
