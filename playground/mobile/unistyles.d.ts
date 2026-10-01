import type { AureaTheme } from '@aurea/ds-core/mobile';

// Declaration merging — informa ao Unistyles quais temas existem neste app.
// Identidade única: só light/dark, sem alternância de produto.
declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: AureaTheme;
    dark: AureaTheme;
  }
}
