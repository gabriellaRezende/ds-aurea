# Inventário Mobile — helios-app

> Etapa 1 do roadmap. Levantamento do que já existe no `helios-app` para servir de base ao `ds-core/mobile`.

- **Fonte**: `~/Documents/helios-app` (`helios` v2.2.4)
- **Data do levantamento**: 2026-09-01
- **Stack**: Expo + React Native, **React Native Paper** (Material Design 3) estilizado com **Unistyles**
- **Documentação existente na origem**: `DESIGN.md`, `ARCHITECTURE.md`, `AGENTS.md`, `docs/architecture/*`

---

## Resumo

O helios-app já tem um Design System interno maduro, organizado em **Atomic Design** (`src/core/lib/`) com tokens centralizados (`src/theme/unistyles.theme.ts`) e regras escritas (`DESIGN.md`).

Isso muda o ponto de partida do projeto: o `ds-core/mobile` não começa do zero, começa **extraindo e generalizando** o que já existe aqui.

| Camada | Quantidade | Localização na origem |
| --- | --- | --- |
| Atoms | 15 componentes | `src/core/lib/atoms/` |
| Molecules | 18 componentes | `src/core/lib/molecules/` |
| Organisms | 8 componentes | `src/core/lib/organisms/` |
| Templates | 15 componentes | `src/core/lib/templates/` |
| Widgets (form controllers, dialogs, selects) | ~60 arquivos | `src/core/components/` |

**Ponto de atenção que orienta todo o resto do documento**: o helios-app é *um produto*, não o Design System. O que o `ds-core` herda daqui são os **componentes** e os tokens **não-cromáticos**. A paleta de cor é da marca Helios e pertence ao nível de produto — ver [Modelo de temas](#modelo-de-temas).

---

## Tokens

Definidos em `src/theme/unistyles.theme.ts` como dois temas — `heliosTheme` (light) e `heliosDarkTheme` (dark) — compartilhando um bloco `sharedTokens`.

### Nível Design System — iguais para todo produto

São medidas, não identidade visual. Vão direto para `ds-core/shared/tokens/`.

| Grupo | Chaves | Valores |
| --- | --- | --- |
| `spacing` | `xs` `sm` `md` `lg` `xl` | 4, 8, 16, 24, 32 |
| `spacing.safeArea` | `header` `footer` | 48, 64 |
| `borderRadius` | `none` `xs` `sm` `md` `lg` `xl` `full` | 0, 2, 4, 8, 12, 16, 9999 |
| `typography.fontFamily` | — | `Inter` |
| `typography.sizes` | `sm` `md` `lg` `xl` | 12, 14, 18, 24 |
| `typography.weights` | `regular` `medium` `bold` | 400, 500, 700 |

> `fontFamily` é `Inter` em todos os produtos Aurea — é token de Design System, não slot de tema. Produto não escolhe fonte.

### Nível produto — paleta da marca Helios

Estes valores **não são do Design System**. Estão registrados aqui como inventário do que o Helios usa hoje, e devem virar `ds-core/shared/themes/helios.ts`.

| Grupo | Chaves | Light | Dark |
| --- | --- | --- | --- |
| Marca | `primary` | `#E53935` | `#E53935` |
| | `accent` | `#1BC47D` | `#1BC47D` |
| | `gradient` | `linear-gradient(180deg, #E53935 -11.43%, #880E4F 120.48%)` | idem |

### Nível produto com default do DS — feedback, layout, texto, bordas

Estes o Design System pode entregar prontos num tema neutro; o produto sobrescreve só se precisar. Hoje o Helios usa:

| Grupo | Chaves | Light | Dark |
| --- | --- | --- | --- |
| Feedback | `success` | `#1BC47D` | `#1BC47D` |
| | `info` | `#40C4FF` | `#40C4FF` |
| | `warning` | `#FFC107` | `#FFC107` |
| | `error` | `#FF5252` | `#FF5252` |
| Layout | `background` | `#F6F8FA` | `#121212` |
| | `surface` | `#FFFFFF` | `#2B2B2B` |
| | `surfaceCard` | `#FFFFFF` | `#1E1E1E` |
| | `backgroundSubtle` | `#ECEFF1` | `#263238` |
| Texto | `textPrimary` | `#263238` | `#ECEFF1` |
| | `textSecondary` | `#37474F` | `#CFD8DC` |
| | `textTertiary` | `#607D8B` | `#90A4AE` |
| Bordas | `borderDefault` | `#B0BEC5` | `#546E7A` |
| | `borderSubtle` | `#CFD8DC` | `#37474F` |
| Utilitário | `overlay` | `rgba(38, 50, 56, 0.12)` | `rgba(236, 239, 241, 0.12)` |
| | `gray500` | `#9E9E9E` | `#757575` |
| | `gray200` | `#E0E0E0` | `#424242` |

> Reparar que `accent` (marca) e `success` (feedback) são o mesmo `#1BC47D`. Coincidência do Helios, não regra — o `ds-core` precisa manter os dois slots separados para que outro produto possa divergir.

### Observações sobre os tokens

- **`gradient` está em sintaxe CSS** (`linear-gradient(...)`), que React Native não interpreta. Precisa de `expo-linear-gradient` no consumo. Ao mover para o tema, o valor cru (cores + stops) fica em `shared/`, e cada plataforma adapta o formato.
- **`primary` é vermelho** e é reservado a CTAs primários / superfícies de marca. Confirmações destrutivas usam `error`, não `primary`. Essa distinção é regra de DS e deve ir para o `ds-learning`.
- **`gray500` / `gray200` não têm semântica** — são usados para estado desabilitado. Ao migrar, renomear para algo semântico (`disabledBackground`, `disabledText`), senão o slot não significa nada para quem consome.
- Não há tokens de **elevação/sombra** nem de **duração de animação**. Lacuna.
- A escala tipográfica tem 4 tamanhos numéricos e não distingue papel (título, corpo, legenda). Lacuna.

---

## Modelo de temas

Decisão que este inventário assume, e que separa o que é DS do que é produto:

| O quê | Onde vive | Formato |
| --- | --- | --- |
| **Contrato** — quais slots semânticos existem | `ds-core/shared/themes/contract.ts` | `type ThemeColors` |
| **Default neutro** — feedback, layout, texto, bordas | `ds-core/shared/themes/default.ts` | valores |
| **Paleta por produto** — marca, e o que divergir do default | `ds-core/shared/themes/helios.ts` | valores |
| **Regras de uso** — quando usar cada slot | `ds-learning` | Markdown, **sem hex** |

Estrutura resultante:

```txt
ds-core/
  shared/
    tokens/            spacing, borderRadius, typography
    themes/
      contract.ts      type ThemeColors — os slots
      default.ts       feedback + neutros do DS
      helios.ts        marca Helios (+ overrides)
      uranus.ts        marca Uranus
  mobile/
    tokens/            adapta tema → StyleSheet.configure do Unistyles
  web/
    tokens/            adapta tema → CSS vars / provider
```

Por que assim:

- **Cor em código, não em Markdown.** O tipo `ThemeColors` faz o compilador cobrar slots faltando, e o `ds-skill` consegue validar se um token é oficial. Documentação não valida nada e deriva.
- **Marca é a mesma em web e mobile**, então a paleta fica em `shared/`. Só o *formato de consumo* muda por plataforma.
- **`ds-learning` fala de cor sem citar hex.** Assim não desatualiza quando a marca muda.

Custo aceito: mudar a cor do Helios exige release do `ds-core`. É barato — paleta é dado aditivo e nada mais importa aquele arquivo, então não quebra os outros produtos.

---

## Atoms (`src/core/lib/atoms/`)

| Componente | Props principais | Variantes | Estados |
| --- | --- | --- | --- |
| `Button` | `mode` (obrigatório), `icon`, `onPress`, `children`, `loading`, `disabled`, `testID` + todos de `ButtonProps` do Paper | `text` `outlined` `contained` `elevated` `contained-tonal` | `loading`, `disabled` |
| `Textfield` | Reexporta `TextField` de `@widgets/forms/TextField`: `isSearchable`, `onSearch`, `errorMessage`, `inputRef` + `TextInputProps` do Paper | com/sem busca | `error` (via `errorMessage`), `disabled` |
| `Checkbox` | `label` (obrigatório), `onChange`, `defaultValue`, `name`, `disabled`, `testID` | — | `checked`, `disabled` |
| `Switch` | `label` (obrigatório), `value`, `onChange`, `name`, `disabled`, `testID` | — | `on/off`, `disabled` |
| `RadioButtonSimple` | `items[]` (obrigatório), `title`, `value`, `onChange`, `error`, `testID` | — | `error` |
| `Chip` | `label` (obrigatório), `selected`, `disabled`, `onPress`, `onChange`, `isListed`, `showSelectedCheck`, `testID`, `style` | interativo (com `onPress`) / somente-leitura (sem `onPress`), `isListed` | `selected`, `disabled` |
| `ProgressBar` | `height`, `progress`, `animated`, `indeterminate`, `progressDuration`, `indeterminateDuration`, `onCompletion`, `backgroundColor`, `trackColor`, `style` | determinado / indeterminado | — |
| `CharacterCount` | `count`, `limit` | — | — |
| `SkeletonBox` | `height` (obrigatório), `width`, `borderRadius`, `style` | — | — |
| `DatePickerInput` | — (locale `pt-BR`) | — | — |
| `TimePickerInput` | — (24h) | — | — |
| `DateTimePickerInput` | — | — | — |
| `Icon` | Reexporta `Ionicons` do `@expo/vector-icons`; tipo `IconNames` = `keyof glyphMap` | — | — |
| `PerformantList` | — (lista virtualizada) | — | — |
| `Conditional` | helper de render condicional | — | — |
| `withSkeleton` | HOC, não é componente | — | — |

### Problemas encontrados nos atoms

- **`Button` hardcoda `borderRadius: 4`** (`src/core/lib/atoms/Button/index.tsx:29`), violando a regra do próprio `DESIGN.md` de nunca hardcodar radius. O valor equivale a `borderRadius.sm` — deve virar token na migração.
- **`Button` usa `onPress?: any`**, perdendo tipagem. Corrigir ao portar.
- **`Button` estende `ButtonProps` do Paper inteiro**, então o contrato público é muito maior do que a tabela sugere. Isso inviabiliza catálogo: a IA não consegue saber o que é permitido. No `ds-core` a superfície precisa ser fechada e explícita.
- **`Chip`, `RadioButtonSimple`, `Switch` usam `onChange?: (...event: any[]) => void`** — assinatura herdada do React Hook Form, sem tipo.
- **`Conditional` é desencorajado pelo próprio `DESIGN.md`** ("explicit `{x && <…/>}` é mais claro"). Candidato a não migrar.
- **`Textfield` é só um reexport** de um widget em outra camada — a fronteira atom/widget está borrada.

---

## Molecules (`src/core/lib/molecules/`)

`Accordion`, `ActionCard`, `ChipsGroup`, `ClientLogo`, `ErrorQueryScreen`, `ErrorScreen`, `GuideCard`, `ImageS3`, `ImageSavedFileSystem`, `ListedChip`, `LoadProgressList`, `LoadingScreen`, `LoginHeaderLogo`, `ProductLogo`, `SelectSimple`, `SmartImage`, `SvgUriFromUrl`, `SvgWebViewFromUrl`

| Grupo | Componentes | Vai pro `ds-core`? |
| --- | --- | --- |
| Genéricos | `Accordion`, `ActionCard`, `ChipsGroup`, `ListedChip`, `SelectSimple` | Sim — padrões de UI reutilizáveis |
| Estados de tela | `ErrorScreen`, `LoadingScreen`, `ErrorQueryScreen` | Sim, mas `ErrorQueryScreen` é acoplado à feature Query |
| Imagem | `SmartImage`, `ImageS3`, `ImageSavedFileSystem`, `SvgUriFromUrl`, `SvgWebViewFromUrl` | Parcial — `SmartImage` sim; os outros carregam infraestrutura (S3, filesystem) |
| Marca/produto | `ClientLogo`, `LoginHeaderLogo`, `ProductLogo` | Não — específicos do Helios |
| Domínio | `GuideCard`, `LoadProgressList` | Não — específicos do negócio |

---

## Organisms (`src/core/lib/organisms/`)

`ActionBar`, `Alert`, `AppBottomSheet`, `FAB`, `Modal`, `MultiStepForm`, `SelectModalSimple`, `Signature`

Todos genéricos o suficiente para o `ds-core`, exceto `Signature` (assinatura digital — vira DS se outros produtos Aurea assinarem; senão fica no produto).

---

## Templates (`src/core/lib/templates/`)

`Camera`, `Detail`, `FooterForm`, `ImagePreview`, `ImageSourcePicker`, `List`, `PicturePreview`, `PreFormPipeline`, `PrintReview`, `Query`, `QueryDetail`, `Review`, `ScreenHeader`, `SelectModalComplete`, `SuccessScreen`

Camada mais acoplada ao produto. `Query`, `QueryDetail`, `PreFormPipeline`, `PrintReview` e `Review` são fluxos do Helios. `FooterForm`, `ScreenHeader`, `List`, `Detail`, `SuccessScreen` e `SelectModalComplete` são padrões de layout reaproveitáveis.

---

## Widgets (`src/core/components/`)

Camada paralela aos atoms, organizada por função e não por atomicidade.

### `forms/` — controllers do React Hook Form

Padrão: HOC `withFormControl<>()` que envolve um componente base (`value` / `onChange` / `error`) e o liga a um `Controller`, com `HelperText` de erro embutido.

| Controller | Primitivo por baixo |
| --- | --- |
| `InputControlled` | `Textfield` |
| `CheckboxControlled` | `Checkbox` |
| `SwitchControlled` | `Switch` |
| `RadioButtonControlled` | `RadioButtonSimple` |
| `SelectControlled` | select inline |
| `SelectModalControlled` | select em modal (leve) |
| `SelectModalCompleteControlled` | select em modal com busca + virtualização |
| `DatePickerControlled` / `TimePickerControlled` / `DateTimePickerControlled` | pickers |
| `ChipsControlled` / `ChipsGroupControlled` | seleção por chip |
| `TextField` | campo composto (com contador de caracteres) |
| `MeasureCurrencyInput` | input de medida/moeda |

Apoio: `FocusFlowContext` (foco entre campos no submit) e `FormFieldRegistry`.

**Regra de escolha de select já documentada:**

| Situação | Componente |
| --- | --- |
| 2–4 opções, todas visíveis | `RadioButtonControlled` |
| Dropdown inline, < 15 opções | `SelectControlled` |
| Modal, 15–200 opções com busca | `SelectModalControlled` |
| Modal com busca/virtualização (padrão para código novo) | `SelectModalCompleteControlled` |

### `dialogs/`

`BaseDialog` (canônico), `DiscardDialog`, `SaveDialog`, `DraftConfirmationModal`.

`BaseDialog` renderiza dentro de `Portal` do Paper, é composável (`Header`/`Content`/`Footer`), com `visible`, `onDismiss`, `title`, `actions[]`, `scrollable`, `dismissable` e `dismissableBackdrop` independentes, e exige `testID` + `accessibilityLabel` + `accessibilityHint` em produção.

### `selects/`

26 arquivos, **todos de domínio** (`VehicleTypeSelect`, `DriverDocTypeSelect`, `CountrySelect`, …), sempre em pares `X` / `XSimple`. Nenhum vai para o `ds-core` — são aplicações do padrão de select ao negócio do Helios. O que vai é o **padrão**, já capturado em `SelectModalCompleteControlled`.

### Outros

`navigation/` (`DrawerContent`, `MenuActions`, `MoreActionsHeader`), `providers/FeatureFlag`, `system/` (`AppStatusScreen`, `ErrorBoundaryFallback`), `gallery/`, `documents/`, `draft/` — mistura de genérico e domínio.

---

## Regras já documentadas (candidatas ao `ds-learning`)

O `DESIGN.md` do helios-app já contém material pronto para virar `ds-learning/global/` e `ds-learning/products/helios-app/`:

| Tema | Conteúdo | Destino sugerido |
| --- | --- | --- |
| Tokens e regras de uso | Nunca hardcodar cor/spacing/radius; só a escala de spacing; adicionar token exige atualizar os dois temas | `ds-learning/global/principles/` |
| Tema duplo | Componentes funcionam nos dois; nunca ramificar por nome de tema, só por valor de token | `ds-learning/global/principles/` |
| Padrão de formulário | RHF + Zod, um schema por form, sem validação de negócio no schema, submit fino | `ds-learning/global/ux-patterns/` |
| Escolha de select | Árvore de decisão por quantidade de opções | `ds-learning/global/ux-patterns/` |
| Modal/dialog | `BaseDialog` é canônico; nunca criar modal customizado; destrutivo à direita com `error` | `ds-learning/decisions/destructive-actions.md` |
| Toast | Feedback efêmero não bloqueante; **Android-only hoje**, no-op em iOS/web | `ds-learning/global/interaction-rules/` |
| Safe area | Política "topo edge-to-edge, base respeita o sistema"; três lugares oficiais de tratamento | `ds-learning/products/helios-app/` (muito específico de Android/Expo) |
| Acessibilidade | `testID` + `accessibilityLabel` (PT-BR) + `accessibilityRole` + `accessibilityHint` obrigatórios; alvo de toque ≥ 44dp | `ds-learning/global/accessibility/` |
| i18n | PT-BR apenas, sem lib de i18n; datas via `date-fns` + locale `ptBR` | `ds-learning/global/principles/` |
| Padrões banidos | Tailwind/NativeWind, literais hardcoded, modal customizado, lógica de negócio em `ui/`, `console.log` | `ds-learning/global/principles/` |

**Nota sobre acessibilidade**: a justificativa registrada é forte e vale preservar — "agentes de campo trabalham com uma mão só, no sol, na chuva, no barulho. A11y é funcional." Esse tipo de *porquê* é exatamente o que o `ds-learning` existe para guardar.

---

## Lacunas identificadas

1. **Sem contrato de tema** — hoje os dois temas são objetos literais soltos, sem tipo que force paridade de slots entre eles.
2. **Sem tokens de elevação/sombra** — cards e modais provavelmente usam valores soltos.
3. **Sem tokens de animação** (duração, easing).
4. **Escala tipográfica sem papel semântico** — 4 tamanhos numéricos, sem `heading`/`body`/`caption`.
5. **`gradient` em sintaxe CSS** dentro de um projeto React Native.
6. **Slots sem semântica** — `gray500` / `gray200` não dizem para que servem.
7. **Fronteira atom/widget borrada** — `Textfield` é atom que reexporta widget.
8. **Contratos abertos** — vários componentes estendem props do Paper inteiras, impedindo catálogo confiável.
9. **Toast é Android-only** — se algum produto Aurea for iOS, é bloqueio.
10. **Nenhum catálogo estruturado** — nada legível por máquina hoje.

---

## Recomendação para a Etapa 2

Migrar em três ondas, por grau de acoplamento:

**Onda 1 — tokens e contrato de tema.**
Levar `sharedTokens` (spacing, radius, tipografia) para `ds-core/shared/tokens/`. Criar `contract.ts` com o tipo `ThemeColors`, `default.ts` com os neutros e feedback do DS, e `helios.ts` com a marca Helios. Corrigir o formato do `gradient` e dar semântica aos grays. Preencher elevação e animação.

**Onda 2 — atoms genéricos.**
`Button`, `Checkbox`, `Switch`, `Chip`, `RadioButtonSimple`, `ProgressBar`, `SkeletonBox`, `CharacterCount`, pickers. Fechando os contratos de props — sem `extends ButtonProps`, sem `any`. É isso que torna o catálogo da Etapa 3 possível.

**Onda 3 — organisms e padrões.**
`BaseDialog`, `AppBottomSheet`, `FAB`, `ActionBar`, `Alert`, `MultiStepForm` e o padrão `withFormControl`.

Ficam de fora do `ds-core`: os 26 selects de domínio, os logos, e os templates de fluxo do Helios (`Query`, `Review`, `PrintReview`, `PreFormPipeline`).
