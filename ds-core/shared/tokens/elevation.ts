// Escala de elevação — valores abstratos sem dependência de plataforma.
// O adaptador mobile converte esses valores em shadow styles do React Native.
export const elevation = {
  none: {
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowOpacity: 0,
    androidElevation: 0,
  },
  xs: {
    shadowOffsetY: 1,
    shadowBlur: 2,
    shadowOpacity: 0.12,
    androidElevation: 1,
  },
  sm: {
    shadowOffsetY: 2,
    shadowBlur: 4,
    shadowOpacity: 0.14,
    androidElevation: 2,
  },
  md: {
    shadowOffsetY: 4,
    shadowBlur: 8,
    shadowOpacity: 0.16,
    androidElevation: 4,
  },
  lg: {
    shadowOffsetY: 8,
    shadowBlur: 16,
    shadowOpacity: 0.18,
    androidElevation: 8,
  },
  xl: {
    shadowOffsetY: 16,
    shadowBlur: 32,
    shadowOpacity: 0.20,
    androidElevation: 16,
  },
} as const;

export type Elevation = keyof typeof elevation;
