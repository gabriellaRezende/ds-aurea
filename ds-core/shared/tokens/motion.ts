// Durações em milissegundos.
const duration = {
  fast: 100,
  medium: 200,
  slow: 300,
} as const;

// Curvas de easing como parâmetros de cubic-bezier [x1, y1, x2, y2].
// Cada plataforma converte para o formato nativo (Animated.Easing no RN, CSS no web).
const easing = {
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
} as const;

export const motion = {
  duration,
  easing,
} as const;

export type MotionDuration = keyof typeof duration;
export type MotionEasing = keyof typeof easing;
