// Contrato de tema — define todos os slots semânticos de cor que qualquer tema Aurea deve declarar.
// O compilador usa esse tipo para cobrar slots faltando em default.ts e helios.ts.

// Gradiente como valor cru — cada plataforma adapta o formato de consumo.
// Mobile: expo-linear-gradient. Web: CSS linear-gradient().
export type GradientConfig = {
  colors: readonly string[];
  locations?: readonly number[]; // valores entre 0 e 1
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export type ThemeColors = {
  // Marca — definidos pelo produto, nunca pelo DS
  primary: string;
  accent: string;
  gradient: GradientConfig;

  // Feedback
  success: string;
  info: string;
  warning: string;
  error: string;

  // Layout
  background: string;
  surface: string;
  surfaceCard: string;
  backgroundSubtle: string;

  // Texto
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;

  // Bordas
  borderDefault: string;
  borderSubtle: string;

  // Utilitário
  overlay: string;
  backgroundDisabled: string;
};
