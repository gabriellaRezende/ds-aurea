# Fundação visual — guia rápido para produto novo

> Para quem está montando a base visual (web e/ou mobile) de um produto novo da Aurea e precisa de um ponto de partida sem se perder.

## O que isto é e o que não é

Isto **não é** o Design System completo (`@aurea/ds-core`) — é uma base mínima de tokens e regras para destravar a estilização de um produto novo hoje, sem esperar o ds-core amadurecer.

Os valores de tokens abaixo (spacing, radius, tipografia, elevação, motion) são os mesmos já decididos e implementados em `ds-core/shared/tokens/` — não são específicos deste produto, são a fonte única da Aurea. A paleta de cor (seção 2) é a única parte que este produto precisa decidir por conta própria, porque é uma marca nova.

Quando o `ds-core` tiver um adapter web e o catálogo de componentes (ver `PLANO.md` do `ds-aurea`), este produto pode migrar para consumir `@aurea/ds-core` diretamente em vez de reimplementar esses tokens localmente — o caminho é o mesmo strangler já usado no helios-app (trocar tema primeiro, componente depois).

---

## 1. Tokens de valor

Válidos para qualquer produto Aurea, web ou mobile. Não redefina estes valores — se um caso de uso não encaixar em nenhum, é sinal de lacuna no token, não motivo para hardcodar.

### Spacing (px)

| Token | Valor |
|---|---|
| `xs` | 4 |
| `sm` | 8 |
| `md` | 16 |
| `lg` | 24 |
| `xl` | 32 |
| `safeArea.header` | 48 |
| `safeArea.footer` | 64 |

### Radius (px)

| Token | Valor |
|---|---|
| `none` | 0 |
| `xs` | 2 |
| `sm` | 4 |
| `md` | 8 |
| `lg` | 12 |
| `xl` | 16 |
| `full` | 9999 |

### Tipografia

Fonte única: **Inter**.

Use sempre o **papel semântico**, nunca o tamanho numérico solto:

| Papel | Tamanho | Peso | Altura de linha |
|---|---|---|---|
| `heading` | 24 | 700 (bold) | 32 |
| `subheading` | 18 | 500 (medium) | 26 |
| `body` | 14 | 400 (regular) | 20 |
| `label` | 14 | 500 (medium) | 20 |
| `caption` | 12 | 400 (regular) | 16 |

### Elevação

Valores abstratos — cada plataforma converte para seu formato nativo (`box-shadow` na web, `shadow*` + `elevation` no Android/RN).

| Token | offsetY | blur | opacity | Android elevation |
|---|---|---|---|---|
| `none` | 0 | 0 | 0 | 0 |
| `xs` | 1 | 2 | 0.12 | 1 |
| `sm` | 2 | 4 | 0.14 | 2 |
| `md` | 4 | 8 | 0.16 | 4 |
| `lg` | 8 | 16 | 0.18 | 8 |
| `xl` | 16 | 32 | 0.20 | 16 |

### Motion

Durações (ms):

| Token | Valor |
|---|---|
| `fast` | 100 |
| `medium` | 200 |
| `slow` | 300 |

Easings (cubic-bezier):

| Token | Curva |
|---|---|
| `easeIn` | `cubic-bezier(0.4, 0, 1, 1)` |
| `easeOut` | `cubic-bezier(0, 0, 0.2, 1)` |
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 2. Contrato de tema

Estes são os slots semânticos que **todo** tema Aurea precisa preencher.

Os slots de feedback, layout, texto, borda e utilitário abaixo são **reaproveitados do tema default do `ds-core`** (`ds-core/shared/themes/default.ts`) — já validados em light e dark, não precisam de decisão nova. Os slots de marca (`primary`, `accent`, `gradient`) ficam **a definir** — são sempre específicos do produto, nunca do DS.

Regra: nenhum componente usa hex direto. Todo lugar que precisar de cor lê um destes slots.

### Marca — a definir

| Slot | O que representa | Valor |
|---|---|---|
| `primary` | Cor de marca principal | `#0787D7` |
| `accent` | Cor de marca secundária | `#52B9F9` |
| `gradient` | Gradiente de marca (cores + stops) | ver bloco abaixo |

> `accent` derivado de `primary` como variação monocromática (mesmo H≈203°/S≈94%, luminosidade subindo de ~43% pra ~65%) — mesma família de cor, útil para ênfase secundária/hover sem competir com o `primary`.

**Gradient config** (formato cru do `GradientConfig` — `ds-core/shared/themes/contract.ts` — cada plataforma adapta o consumo: mobile via `expo-linear-gradient`, web via `linear-gradient()` CSS):

```ts
gradient: {
  colors: ['#03A9F4', '#0D47A1'],
  locations: [0, 1],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
}
```

> Direção assumida como horizontal (esquerda→direita), a partir do preview linear compartilhado. Confirme o ângulo real no arquivo de design antes de fechar — se não for exatamente horizontal, ajuste `start`/`end` proporcionalmente (ex.: diagonal 45° seria `start: {x:0,y:0}`, `end: {x:1,y:1}`).

Em CSS equivale a:

```css
--gradient-primary: linear-gradient(90deg, #03A9F4 0%, #0D47A1 100%);
```

### Hover — regra derivada do `primary`

O hover em todos os sistemas Aurea é o próprio `primary` sobreposto a **12% de opacidade** — não é uma cor nova, é uma regra de derivação. Qualquer produto recalcula o valor a partir do seu próprio `primary`; não copie o hex final de outro produto.

| Slot | Regra | Valor calculado para este produto (`primary` `#0787D7`) |
|---|---|---|
| `primaryHover` | `primary` a 12% de opacidade | `rgba(7, 135, 215, 0.12)` (equivalente `#0787D71F` em hex8) |

Uso: aplicado como overlay/background do elemento interativo no estado hover (botão, item de lista, etc.) — nunca como cor de texto, e nunca substituindo o `primary` do estado padrão.

### Feedback, layout, texto, borda e utilitário — reaproveitado do tema default

| Slot | O que representa | Light | Dark |
|---|---|---|---|
| `success` | Feedback positivo | `#1BC47D` | `#1BC47D` |
| `info` | Feedback informativo | `#40C4FF` | `#40C4FF` |
| `warning` | Feedback de atenção | `#FFC107` | `#FFC107` |
| `error` | Feedback de erro | `#FF5252` | `#FF5252` |
| `background` | Fundo padrão da tela | `#F6F8FA` | `#121212` |
| `surface` | Fundo de elementos elevados (card, modal) | `#FFFFFF` | `#2B2B2B` |
| `surfaceCard` | Fundo específico de card, se distinto de `surface` | `#FFFFFF` | `#1E1E1E` |
| `backgroundSubtle` | Fundo de destaque leve (ex.: linha zebrada) | `#ECEFF1` | `#263238` |
| `textPrimary` | Texto principal | `#263238` | `#ECEFF1` |
| `textSecondary` | Texto de apoio | `#37474F` | `#CFD8DC` |
| `textTertiary` | Texto de menor ênfase | `#607D8B` | `#90A4AE` |
| `textDisabled` | Texto em estado desabilitado | `#9E9E9E` | `#757575` |
| `borderDefault` | Borda padrão | `#B0BEC5` | `#546E7A` |
| `borderSubtle` | Borda discreta | `#CFD8DC` | `#37474F` |
| `overlay` | Sobreposição (modal, drawer) | `rgba(38, 50, 56, 0.12)` | `rgba(236, 239, 241, 0.12)` |
| `backgroundDisabled` | Fundo de elemento desabilitado | `#E0E0E0` | `#424242` |

Depois de preencher `primary`/`accent`/`gradient`, confira contraste WCAG AA entre eles e os slots de texto/fundo acima (principalmente `textPrimary` sobre `primary`, se `primary` virar fundo de botão) — os slots reaproveitados já passaram nesse teste entre si, mas a cor de marca é nova e ainda não foi validada contra eles.

---

## 3. Aplicação em Web

Traduza a tabela de tokens para CSS custom properties. Exemplo de ponto de partida:

```css
:root {
  /* spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* tipografia */
  --font-family: 'Inter', sans-serif;
  --font-size-body: 14px;
  --font-weight-regular: 400;
  --line-height-body: 20px;

  /* tema — preencher com os valores da seção 2 */
  --color-primary: /* ... */;
  --color-primary-hover: /* primary a 12% — ver seção 2, Hover */;
  --color-background: /* ... */;
  --color-text-primary: /* ... */;
}
```

Regra: nenhum componente usa `#hex` ou `rgb()` direto no CSS — sempre `var(--color-*)`. Isso é o que garante trocar tema (ou dar suporte a dark mode) sem editar componente.

> Não use como referência os tokens do `uranus-web-portal-core` — aquele projeto tem três sistemas de estilo coexistindo (MUI, dois Stitches separados) com nomenclaturas divergentes entre si e do `ds-core`. É legado pré-ds-aurea, não um padrão a seguir.

---

## 4. Aplicação em Mobile

Componha os tokens num tema do Unistyles v3:

```ts
import { StyleSheet } from 'react-native-unistyles';

const theme = {
  colors: {
    primary: /* valor da seção 2 */,
    primaryHover: /* primary a 12% — ver seção 2, Hover */,
    background: /* valor da seção 2 */,
    textPrimary: /* valor da seção 2 */,
    // ...demais slots do contrato
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { none: 0, xs: 2, sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
};

StyleSheet.configure({
  themes: { default: theme },
  settings: { initialTheme: 'default' },
});
```

Use sempre `theme.colors.*` dentro do `StyleSheet.create` — nunca string de cor literal no componente.

---

## 5. Regras não-negociáveis

Adaptado das invariantes do `ds-core` (`AGENTS.md`) para fora do contexto do ds-core:

1. **Cor só via token semântico.** Nenhum hex/rgb hardcoded em componente. Toda cor vem de um slot do tema (seção 2) — é o que garante light/dark e troca de marca sem editar componente por componente.
2. **Spacing e radius só vêm da escala.** Se um valor não existe na escala (seção 1), o problema é a escala estar incompleta — não criar um valor solto ad hoc.
3. **Tipografia por papel semântico, não por tamanho numérico.** Componente usa `body`/`heading`/`label`, não "14px" direto — isso é o que permite ajustar a escala inteira depois sem caçar número por número.
4. **`testID` (mobile) / atributo de teste estável (web) desde o início.** Não é opcional — é o que permite escrever teste E2E sem reescrever toda vez que o componente muda.
5. **Acessibilidade não é opcional.** Alvo de toque mínimo de 44dp/44px, `accessibilityRole`/`role`, contraste AA — construir isso depois é sempre mais caro do que construir junto.
