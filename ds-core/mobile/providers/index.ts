// Provider mobile — registra os temas do DS no Unistyles.
//
// configureHeliosTheme() — registro mínimo para apps que usam só o Helios.
// configureAllThemes()   — registro completo (Helios + Uranus), usado no Playground.
//
// Após a chamada, adicionar no projeto consumidor um arquivo unistyles.d.ts:
//
//   import type { AureaTheme } from '@aurea/ds-core/mobile';
//   declare module 'react-native-unistyles' {
//     export interface UnistylesThemes {
//       heliosLight: AureaTheme;
//       heliosDark:  AureaTheme;
//     }
//   }
//
// Ver docs/INSTALLATION.md para o passo completo.

import { StyleSheet } from 'react-native-unistyles';
import {
  heliosLightTheme,
  heliosDarkTheme,
  uranusLightTheme,
  uranusDarkTheme,
} from '../tokens';

export type { AureaTheme } from '../tokens';

export function configureHeliosTheme(config?: { adaptiveThemes?: boolean }) {
  StyleSheet.configure({
    themes: {
      light: heliosLightTheme,
      dark: heliosDarkTheme,
    },
    settings: {
      adaptiveThemes: config?.adaptiveThemes ?? true,
    },
  });
}

// Registro completo com todos os produtos — usado pelo Playground.
// Temas nomeados explicitamente para permitir alternância manual de produto.
export function configureAllThemes() {
  StyleSheet.configure({
    themes: {
      heliosLight: heliosLightTheme,
      heliosDark: heliosDarkTheme,
      uranusLight: uranusLightTheme,
      uranusDark: uranusDarkTheme,
    },
    settings: {},
  });
}
