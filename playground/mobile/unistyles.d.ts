import type { AureaTheme } from '@aurea/ds-core/mobile';

// Declaration merging — informa ao Unistyles quais temas existem neste app.
// O playground registra os quatro temas para permitir alternância de produto e modo.
declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    heliosLight: AureaTheme;
    heliosDark: AureaTheme;
    uranusLight: AureaTheme;
    uranusDark: AureaTheme;
  }
}
