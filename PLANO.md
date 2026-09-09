# Plano de Implementação — Mobile primeiro

> O que precisa ser feito para sair do repositório vazio até o `ds-core/mobile` sendo consumido pelo helios-app.
>
> Base: [inventário do helios-app](ds-core/docs/mobile/inventario-helios-app.md) (Etapa 1, concluída).

---

## Onde estamos

| Etapa do roadmap | Status |
| --- | --- |
| 1. Mapear componentes mobile | ✅ Concluída |
| 1. Mapear componentes web | ⬜ Adiada (mobile primeiro) |
| 2. Organizar o ds-core | ⬜ Próxima |
| 3. Catálogos de componentes | ⬜ |
| 4. ds-learning | ⬜ |
| 5. ds-skill | ⬜ |
| 6. Playground | ⬜ — **antecipado**: entra logo após os tokens e cresce junto com os componentes |
| 7. Projeto piloto (helios-app) | ⬜ |

Hoje o repositório tem só a estrutura de pastas vazia, o README e o inventário. Nenhum `package.json`, nenhum toolchain.

**Stack alvo** (herdada do helios-app): Expo ~55, React Native 0.83, React 19.2, TypeScript ~5.9, React Native Paper ^5.15, Unistyles ^3.1, Node 22.

---

## Decisões a tomar antes de escrever código

Cinco decisões que mudam o desenho. Recomendação em cada uma; as três primeiras bloqueiam a Fase 0.

### D1 — Monorepo ou pastas soltas? 🔴 bloqueia

**Recomendação: monorepo com npm workspaces.**

O ponto do DS é ser consumido por outros repositórios. Workspaces dão versionamento, `package.json` próprio por pacote e um caminho natural para publicar. Pastas soltas obrigam consumo por path relativo, que não escala para o Uranus.

Custo: setup inicial maior (raiz + tsconfig base + build por pacote).

### D2 — Como o helios-app instala o `@aurea/ds-core`? 🔴 bloqueia

**Recomendação: registry privado do GitLab, com `file:` local durante o desenvolvimento.**

Opções e trade-offs:

| Via | Prós | Contras |
| --- | --- | --- |
| Registry privado GitLab | versionamento real, `npm i @aurea/ds-core@1.2.0` | precisa configurar `.npmrc` + token de CI |
| Dependência git (`git+ssh://…#tag`) | zero infra | sem semver de verdade, `npm i` mais lento |
| `file:../ds-aurea/ds-core` | iteração instantânea | só serve para dev local |

A Aurea já usa GitLab, então o registry é o caminho de menor atrito a médio prazo.

### D3 — O `ds-core/mobile` embrulha o React Native Paper? 🔴 bloqueia

Essa é a decisão mais cara de reverter.

**Recomendação: sim, manter o Paper por baixo — mas com contrato fechado.**

Os componentes do helios-app são wrappers finos do Paper. Duas saídas:

- **Manter o Paper** como dependência de par (`peerDependency`). Migração barata, Material Design 3 de graça, acessibilidade pronta. Preço: todo produto Aurea mobile fica preso ao Paper e ao Material Design.
- **Reimplementar do zero** sobre primitivos do RN. Liberdade visual total e nenhum peso extra. Preço: refazer acessibilidade, estados, ripple, animação — semanas de trabalho e risco de regressão.

Como o objetivo do MVP é padronizar o que já existe, e não redesenhar a identidade da Aurea, manter o Paper é o certo. **Mas o contrato de props precisa ser fechado** — hoje `Button` faz `extends ButtonProps` e vaza a API inteira do Paper. Sem fechar isso, a Etapa 3 (catálogo) não tem o que catalogar e o `ds-skill` não consegue validar nada.

> Se um dia a Aurea quiser sair do Material Design, o contrato fechado é justamente o que torna a troca possível sem quebrar os consumidores.

### D4 — O `ds-core/mobile` distribui código-fonte ou compilado? ⚠️ técnica

**Recomendação: publicar TypeScript fonte, não bundle compilado.**

Não é preferência — é exigência do Unistyles 3. O plugin Babel dele precisa **processar os arquivos** dos componentes, e por padrão ignora `node_modules`. Um consumidor do `@aurea/ds-core` vai precisar declarar isso no próprio `babel.config.js`:

```js
// babel.config.js do produto consumidor
['react-native-unistyles/plugin', {
  root: 'src',
  autoProcessImports: ['@aurea/ds-core'],
}]
```

Consequências que precisam entrar na documentação de instalação:

- publicar `.ts`/`.tsx` fonte (sem passo de build para o pacote mobile);
- `react-native-unistyles`, `react-native-paper`, `react`, `react-native` como **peerDependencies** — nunca dependências diretas, sob pena de duplicar instância e quebrar o tema;
- o passo do `babel.config.js` é obrigatório e silencioso quando esquecido (estilos simplesmente não aplicam). Vale um item de troubleshooting.

### D5 — Como o helios-app migra? ⚠️ processo

**Recomendação: strangler por alias de import, componente a componente.**

O helios-app é um app em produção (v2.2.4). Trocar tudo de uma vez é risco desnecessário. O caminho:

1. instalar `@aurea/ds-core` ao lado do código atual;
2. apontar o alias `@lib/atoms/Button` do `tsconfig` para o DS, um componente por vez;
3. deletar o componente local quando o DS cobrir 100% dos usos;
4. o `guard:no-tailwind` do projeto vira modelo para um `guard:no-local-atoms`.

Assim o app nunca fica quebrado e cada componente migrado é um PR pequeno e revisável.

---

## Fase 0 — Fundação do repositório

**Depende de:** D1, D2, D3, D4.

- [ ] `package.json` na raiz com workspaces (`ds-core`, `playground/*`)
- [ ] `ds-core/package.json` como `@aurea/ds-core`, com peerDependencies de `react`, `react-native`, `react-native-paper`, `react-native-unistyles`
- [ ] `tsconfig.base.json` + `tsconfig.json` por pacote, com `paths` para `@aurea/ds-core/*`
- [ ] ESLint + Prettier — copiar a config do helios-app para não divergir de estilo entre repos
- [ ] `.editorconfig`, `.gitignore`, `.nvmrc` (Node 22)
- [ ] `exports` map no `package.json` do `ds-core` separando `./shared`, `./mobile` e `./web` — impede um app web de importar acidentalmente código de RN
- [ ] CI mínima no GitLab: `typecheck` + `lint`

**Saída:** repositório instalável, com typecheck passando e nada dentro ainda.

---

## Fase 1 — Tokens e contrato de tema

**Depende de:** Fase 0. Corresponde à Onda 1 do inventário.

### 1.1 Tokens de Design System

Valores iguais para todo produto, extraídos do `sharedTokens` do helios-app.

- [ ] `ds-core/shared/tokens/spacing.ts` — `xs` 4 · `sm` 8 · `md` 16 · `lg` 24 · `xl` 32 + `safeArea.header` 48 · `safeArea.footer` 64
- [ ] `ds-core/shared/tokens/radius.ts` — `none` 0 · `xs` 2 · `sm` 4 · `md` 8 · `lg` 12 · `xl` 16 · `full` 9999
- [ ] `ds-core/shared/tokens/typography.ts` — `Inter`, tamanhos 12/14/18/24, pesos 400/500/700
- [ ] `ds-core/shared/tokens/index.ts` + tipos derivados (`type Spacing = keyof typeof spacing`)

### 1.2 Preencher as lacunas do inventário

Trabalho novo — não existe no helios-app hoje. Precisa de decisão de design, não só de código.

- [ ] `elevation.ts` — sombras para card, modal, FAB, bottom sheet
- [ ] `motion.ts` — durações e easings
- [ ] **Papéis semânticos na tipografia** — hoje são 4 tamanhos numéricos. Definir `heading`/`body`/`caption`/`label` com tamanho + peso + altura de linha
- [ ] Renomear `gray500`/`gray200` para slots semânticos (`disabledBackground`, `disabledText`)

> Esses quatro itens são os únicos da Fase 1 que exigem alguém de design decidindo. O resto é transcrição.

### 1.3 Contrato de tema

- [ ] `ds-core/shared/themes/contract.ts` — `type ThemeColors` com todos os slots
- [ ] `ds-core/shared/themes/default.ts` — feedback, layout, texto, bordas e utilitários (light + dark)
- [ ] `ds-core/shared/themes/helios.ts` — marca Helios: `primary` `#E53935`, `accent` `#1BC47D`, `gradient`
- [ ] Converter `gradient` da sintaxe CSS para valor cru (cores + stops), com adaptador por plataforma
- [ ] Teste de paridade: light e dark declaram exatamente os mesmos slots
- [ ] Teste de contraste WCAG AA nos pares texto/fundo dos dois temas

### 1.4 Adaptador mobile

- [ ] `ds-core/mobile/tokens/index.ts` — compõe tokens + tema num objeto de tema do Unistyles
- [ ] `ds-core/mobile/providers/` — `StyleSheet.configure()` recebendo o tema do produto
- [ ] Tipagem do módulo (`UnistylesThemes`) para o consumidor ter autocomplete

**Saída:** o helios-app consegue instalar o `ds-core`, passar `heliosTheme` e ter os mesmos valores de hoje — sem nenhum componente migrado ainda. Base pronta para o playground da Fase 2.

---

## Fase 2 — Playground (esqueleto)

**Depende de:** Fase 1. **Vem antes dos componentes, de propósito.**

O playground não é entrega final, é **ferramenta de trabalho**. Ele precisa existir antes do primeiro componente para que cada um seja construído sendo visto — e depois cresce junto, um componente por vez.

Com os tokens da Fase 1 prontos, já dá para montar um playground útil mesmo sem nenhum componente:

- [ ] App Expo em `playground/mobile`, consumindo `@aurea/ds-core` por workspace
- [ ] Alternador de tema (light/dark)
- [ ] Alternador de produto (Helios/Uranus) — mesmo componente trocando de marca
- [ ] Tela de tokens: paleta, escala de spacing, radius, tipografia, elevação
- [ ] Navegação por componente (lista vazia no começo)
- [ ] Painel de controles reaproveitável — variante, tamanho, estado (`default`, `disabled`, `loading`, `error`, `success`)
- [ ] Hot reload funcionando contra o `ds-core` do workspace

O alternador de produto é o item mais valioso: é ele que prova na tela que **cor é de produto e componente é de DS**. E a tela de tokens já é útil sozinha — dá para revisar a escala de spacing e as lacunas de elevação/tipografia da Fase 1.2 olhando, em vez de imaginando.

**Saída:** ambiente rodando onde qualquer componente novo aparece assim que é escrito.

---

## Pré-Fase 3 — EAS Build + expo-dev-client

**Fazer antes de qualquer código da Fase 3.** A Fase 3 reativa o Unistyles v3 (NitroModules), que não roda no Expo Go. Sem isso, o playground quebra no primeiro componente.

- [ ] Instalar `expo-dev-client` no playground/mobile
- [ ] Instalar e configurar a CLI do EAS (`npm install -g eas-cli`)
- [ ] `eas login` + `eas build:configure` (gera `eas.json`)
- [ ] Reativar `react-native-unistyles` no `package.json` do playground
- [ ] Reativar o plugin `react-native-unistyles/plugin` no `babel.config.js`
- [ ] Voltar `"newArchEnabled": true` no `app.json`
- [ ] Rodar `eas build --profile development --platform android` (build na nuvem, ~10 min)
- [ ] Instalar o `.apk` gerado no celular — substitui o Expo Go
- [ ] Validar: playground abre, tema troca, tokens aparecem

A partir daí o ciclo diário volta a ser `npx expo start` + QR, igual ao Expo Go, mas com suporte a NitroModules.

> **Por que agora?** O playground está rodando no Expo Go com uma config simplificada (sem Unistyles, reanimated v3, newArch off). Essa config foi intencional para a Fase 2. A Pré-Fase 3 desfaz essas concessões antes de o primeiro componente com Unistyles existir.

---

## Fase 3 — Atoms

**Depende de:** Fases 1, 2 e Pré-Fase 3. Onda 2 do inventário.

Ordem sugerida, do mais simples ao mais acoplado:

1. `SkeletonBox`, `CharacterCount`, `ProgressBar` — sem estado, sem formulário
2. `Chip`, `Checkbox`, `Switch`, `RadioButtonSimple` — estado booleano/seleção
3. `Button` — o mais usado, e o que precisa da maior mudança de contrato
4. `Textfield` — desfazer o reexport e resolver a fronteira atom/widget
5. `DatePickerInput`, `TimePickerInput`, `DateTimePickerInput` — locale `pt-BR`, 24h
6. `Icon`, `PerformantList`

### Definition of Done — vale para todo componente

Um componente **não está pronto** enquanto os seis itens não fecharem. A entrada no playground faz parte do componente, não é tarefa posterior:

- [ ] contrato de props fechado e explícito — sem `extends XProps` do Paper, sem `any`
- [ ] todos os valores visuais vindos de token (o `Button` hoje hardcoda `borderRadius: 4`)
- [ ] `testID` + `accessibilityLabel` + `accessibilityRole` + `accessibilityHint` no contrato
- [ ] funciona em light e dark
- [ ] **entrada no playground cobrindo todas as variantes e estados**
- [ ] doc em `ds-core/docs/mobile/components/<Nome>.md`

Na prática o ciclo por componente é: escreve o componente → registra no playground → olha nos dois temas e nas duas marcas → ajusta → documenta. O playground fecha o loop antes de o componente sair da mão de quem escreveu.

Não migram: `Conditional` (o próprio `DESIGN.md` desencoraja) e `withSkeleton` (é HOC, entra como utilitário).

**Saída:** conjunto de atoms instalável, e um playground que cresceu de tela vazia para catálogo visual completo.

---

## Fase 4 — Catálogo

**Depende de:** Fase 3. Etapa 3 do roadmap.

É o que transforma o DS de "biblioteca" em "algo que a IA consegue validar".

- [ ] Definir o **schema** do catálogo: por componente — props aceitas com tipo e obrigatoriedade, variantes válidas, estados suportados, tokens que consome, regras de uso
- [ ] `ds-core/mobile/catalog/mobileComponentCatalog.ts`
- [ ] Tipar o catálogo de forma que ele **derive** dos componentes reais, para não desatualizar
- [ ] Teste que quebra quando um componente é adicionado sem entrada no catálogo

> A tentação aqui é escrever o catálogo à mão. Se ele for um arquivo manual, vai divergir do código em semanas. O esforço extra de derivar dos tipos é o que garante que a IA não valide contra ficção.

---

## Fase 5 — ds-learning

**Depende de:** nada. **Pode rodar em paralelo com qualquer fase, desde o primeiro dia.**

O `DESIGN.md` do helios-app já traz quase todo o conteúdo — é trabalho de separar o que é global do que é do produto.

- [ ] `global/principles/` — nunca hardcodar valores; escala de spacing; tema duplo sem ramificar por nome; PT-BR
- [ ] `global/accessibility/` — contrato `testID`/`accessibilityLabel`/`Role`/`Hint`, alvo ≥ 44dp, e o *porquê* (agente de campo, uma mão, sol, chuva)
- [ ] `global/ux-patterns/` — padrão de formulário (RHF + Zod), árvore de decisão de select
- [ ] `global/interaction-rules/` — toast vs dialog vs progress
- [ ] `decisions/destructive-actions.md` — destrutivo usa `error`, nunca `primary`; à direita; 2 ações
- [ ] `products/helios-app/` — safe area edge-to-edge, toast Android-only, particularidades de Expo
- [ ] Regra editorial: **`ds-learning` nunca cita hex.** Fala de slot semântico. É o que impede a doc de desatualizar quando a marca muda.

---

## Fase 6 — Piloto no helios-app

**Depende de:** Fases 3, 4 e 5. Segue a estratégia da D5.

- [ ] Instalar `@aurea/ds-core` no helios-app
- [ ] Configurar `autoProcessImports` no `babel.config.js`
- [ ] Trocar o tema local pelo tema do DS — **sem trocar componente ainda**, validando que nada muda visualmente
- [ ] Migrar um atom de baixo risco (`SkeletonBox` ou `CharacterCount`) e rodar `npm run verify`
- [ ] Migrar `Button` — o de maior alcance e maior risco
- [ ] Registrar no `ds-learning` toda lacuna que aparecer
- [ ] Guard de CI contra reintrodução de atom local

**Saída:** prova de que o modelo funciona num app em produção. É aqui que o projeto deixa de ser proposta.

---

## Depois

Fora do escopo deste plano, na ordem do roadmap: **ds-skill** (Etapa 5), **web** (Etapas 1–3 para a plataforma web), **Uranus** (Etapa 8), **UI Contract / UI Spec** (Etapa 9).

O `ds-skill` depende do catálogo da Fase 3 para ter o que validar — antes disso ele seria só prompt, que é exatamente o que o README diz para evitar.

---

## Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Plugin Babel do Unistyles não configurado no consumidor | Estilos não aplicam, **sem erro** | Doc de instalação + teste de fumaça no piloto que falha se o tema não resolver |
| Prender o DS ao Material Design (D3) | Difícil mudar identidade depois | Contrato de props fechado isola o consumidor do Paper |
| Catálogo escrito à mão diverge do código | `ds-skill` valida contra ficção | Derivar dos tipos + teste que quebra |
| helios-app evolui durante a migração | Retrabalho, divergência | Strangler por alias (D5); PRs pequenos |
| Renomear tokens (`gray500` → semântico) quebra usos | Regressão visual | Manter alias deprecado por uma versão |
| Só um produto mapeado | Generalizar em cima de amostra de 1 | Adiar decisão duvidosa até o Uranus entrar; na dúvida, deixar no produto |
| Peer deps duplicadas (duas instâncias de RN/Unistyles) | Tema não resolve, erros obscuros | `peerDependencies` estritas + `resolutions` no piloto |

---

## Sequenciamento

```txt
D1 D2 D3 D4  ─── decisões
      ↓
   Fase 0  ─── fundação
      ↓
   Fase 1  ─── tokens + tema
      ↓
   Fase 2  ─── playground (esqueleto)        Fase 5
      ↓                                    (ds-learning)
   Fase 3  ─── atoms  ⟲ cada componente     roda em paralelo
      ↓              nasce visível          desde o dia 1
   Fase 4  ─── catálogo
      ↓
   Fase 6  ─── piloto helios-app
```

O caminho crítico é **Fase 0 → 1 → 2 → 3 → 4 → 6**. A Fase 5 não bloqueia nada e pode ser tocada por outra pessoa desde o primeiro dia.

**O playground entra cedo de propósito.** Ele não é entrega de vitrine no fim do projeto — é o ambiente onde os componentes são construídos. Cada componente da Fase 3 nasce com sua entrada no playground (ver Definition of Done), então ele cresce de tela vazia até catálogo visual completo, um componente por vez. Empurrá-lo para o fim significaria escrever componente às cegas e só descobrir problema visual depois de tudo pronto.

> Isso diverge do roadmap do [README](README.md), onde o Playground é a Etapa 6. A ordem do README faz sentido como sequência de *entregas*; esta aqui é a sequência de *execução*.

O primeiro marco que vale perseguir é o fim da **Fase 2**: tokens no DS, playground rodando, tema do Helios trocando para o do Uranus na tela — tudo isso sem ter migrado um componente sequer. O modelo inteiro validado com risco quase zero.
