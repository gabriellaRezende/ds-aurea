// Provider mobile — registra os temas do DS no Unistyles.
// O projeto consumidor chama configureHeliosTheme() no entry point do app (App.tsx / _layout.tsx).
//
// Após a chamada, adicionar no projeto consumidor um arquivo unistyles.d.ts:
//
//   import type { AureaTheme } from '@aurea/ds-core/mobile';
//   declare module 'react-native-unistyles' {
//     export interface UnistylesThemes {
//       light: AureaTheme;
//       dark: AureaTheme;
//     }
//   }
//
// Ver docs/INSTALLATION.md para o passo completo.

import { StyleSheet } from 'react-native-unistyles';
import { heliosLightTheme, heliosDarkTheme } from '../tokens';

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
