// Tema Aurea — identidade visual única do Design System.
// Uma marca, todos os produtos (Helios app, Uranus portal, e futuros) — não há
// mais tema por produto (ver AGENTS.md e PLANO.md, que ainda descrevem a
// premissa antiga de multimarca e precisam de atualização à parte).
//
// Cores extraídas do Brandbook Aurea ST (Traffic Solutions), confirmadas em 2026-09-28:
// Gold #F0C230 (conceito "Grandiosidade") = primary — cor-herói em quase toda
//   aplicação do manual (anel do logo, badge "ST", versão gradiente, mockups).
// Blue #16193C (conceito "Confiança") = accent — navy institucional, usado
//   como par do dourado em quase toda peça do manual.
// Marsala #3D0F07 (conceito "Sofisticação") não entra na UI: no tom exato ele
//   lê quase como preto em elementos pequenos. Documentar em ds-learning como
//   cor institucional de marketing/impressos, não como slot de tema.
//
// Gradiente: o manual usa um gradiente tonal só dentro do Gold (claro → base),
// não duas cores diferentes. Tom claro derivado por mistura com 30% de
// branco a partir do Gold confirmado: #F0C230 -> #F5D46E.

import type { ThemeColors } from './contract';
import { defaultLight, defaultDark } from './default';

const aureaGradient = {
  colors: ['#F5D46E', '#F0C230'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
} as const;

export const aureaLight = {
  ...defaultLight,
  primary: '#F0C230',
  accent: '#16193C',
  gradient: aureaGradient,
} satisfies ThemeColors;

export const aureaDark = {
  ...defaultDark,
  primary: '#F0C230',
  accent: '#16193C',
  gradient: aureaGradient,
} satisfies ThemeColors;
