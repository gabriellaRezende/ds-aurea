// Preview do produto novo documentado em
// ds-learning/global/foundations/fundacao-visual.md.
//
// Standalone: NÃO integrado ao switcher Helios/Uranus (PlaygroundContext)
// nem ao catálogo oficial de temas do ds-core. É só uma visualização das
// decisões de marca tomadas nesse documento, até o produto ter nome e
// eventualmente entrar como tema de verdade em ds-core/shared/themes/.
import { defaultLight, defaultDark } from '@aurea/ds-core/shared';
import type { GradientConfig } from '@aurea/ds-core/shared';

export const novoProdutoGradient: GradientConfig = {
  colors: ['#03A9F4', '#0D47A1'],
  locations: [0, 1],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};

export const novoProdutoLight = {
  ...defaultLight,
  primary: '#0787D7',
  accent: '#52B9F9',
  gradient: novoProdutoGradient,
};

export const novoProdutoDark = {
  ...defaultDark,
  primary: '#0787D7',
  accent: '#52B9F9',
  gradient: novoProdutoGradient,
};

// Não é slot do ThemeColors — é a regra de derivação documentada
// (primary a 12% de opacidade), usada em hover e, em item de menu,
// também no estado selecionado/ativo.
export const novoProdutoPrimaryHover = 'rgba(7, 135, 215, 0.12)';
