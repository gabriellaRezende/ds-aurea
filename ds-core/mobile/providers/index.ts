// Provider mobile — registra o tema do DS no Unistyles.
//
// configureAureaTheme() — registra a identidade visual única (light + dark).
//
// Após a chamada, adicionar no projeto consumidor um arquivo unistyles.d.ts:
//
//   import type { AureaTheme } from '@aurea/ds-core/mobile';
//   declare module 'react-native-unistyles' {
//     export interface UnistylesThemes {
//       light: AureaTheme;
//       dark:  AureaTheme;
//     }
//   }
//
// Ver docs/INSTALLATION.md para o passo completo.

import { StyleSheet } from 'react-native-unistyles';
import { aureaLightTheme, aureaDarkTheme } from '../tokens';

export type { AureaTheme } from '../tokens';

export function configureAureaTheme(config?: { adaptiveThemes?: boolean }) {
  StyleSheet.configure({
    themes: {
      light: aureaLightTheme,
      dark: aureaDarkTheme,
    },
    settings: {
      adaptiveThemes: config?.adaptiveThemes ?? true,
    },
  });
}
