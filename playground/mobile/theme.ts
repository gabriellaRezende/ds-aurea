// Importa os objetos de tema diretamente do fonte, sem passar pelo
// ds-core/mobile/index.ts (que importa os providers que dependem do
// react-native-unistyles/NitroModules — incompatível com Expo Go).
export { aureaLightTheme, aureaDarkTheme } from '../../ds-core/mobile/tokens';
export type { AureaTheme } from '../../ds-core/mobile/tokens';
