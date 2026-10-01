---
name: port-component
description: Checklist passo a passo para portar um componente do helios-app (src/core/lib/atoms/) para o ds-core. Use ao iniciar a portagem de qualquer atom ou molecule.
---

# Skill: Portar componente do helios-app para o ds-core

Use esta skill ao iniciar a portagem de qualquer componente do `helios-app` para o `ds-core/mobile/`.

---

## Antes de começar

1. Leia `AGENTS.md` — os invariantes são não-negociáveis.
2. Leia `docs/mobile/inventario-helios-app.md` — verifique os problemas já identificados para o componente.
3. Confirme a fase atual em `PLANO.md` — a ordem de portagem importa (atoms simples antes dos acoplados).

---

## Passo 1 — Ler o original

Leia o componente em `~/Documents/helios-app/src/core/lib/atoms/<Nome>/` (ou `molecules/`, `organisms/`).

Anote:
- quais props ele aceita hoje
- quais props vêm herdadas do Paper (`extends ButtonProps` etc.)
- quais valores estão hardcoded (cor, spacing, borderRadius)
- se importa react-hook-form
- se usa `any` em algum lugar

---

## Passo 2 — Definir o contrato fechado

Escreva a interface de props do zero — sem herdar props externas, sem `any`.

Inclua obrigatoriamente:
- `testID: string` — **required**, não optional
- `accessibilityLabel: string` — **required**
- `accessibilityRole: AccessibilityRole`
- `accessibilityHint?: string` — opcional, mas declarado

Inclua só o que o componente realmente usa e expõe. Se precisar de algo do Paper que não está na interface, considere se deve ser exposto ou se é detalhe de implementação.

---

## Passo 3 — Substituir valores hardcoded por tokens

Para cada valor hardcoded encontrado no Passo 1:

| Hardcoded | Substituto |
|---|---|
| Hex de cor | `theme.colors.<slot>` |
| Número de spacing | `theme.spacing.<escala>` |
| Número de borderRadius | `theme.borderRadius.<escala>` |
| Número de fontSize | `theme.typography.sizes.<escala>` |

Se o token semântico não existe ainda, anote a lacuna — ela precisa ser preenchida na Fase 1 antes de continuar.

---

## Passo 4 — Escrever o componente em ds-core

Crie o arquivo em `ds-core/mobile/components/<Nome>/index.tsx`.

Regras:
- **Sem Paper** — nenhum arquivo de `ds-core/` importa Paper, nem o próprio arquivo do componente (AGENTS.md invariante 1, zero exceção). O que o Paper dava de graça no original (acessibilidade, ripple, estados) é reimplementado explicitamente sobre `Pressable`/`View`/`Text`/`TextInput` — não herdado.
- `StyleSheet.create` do Unistyles — nunca valores literais de cor
- Componente recebe o tema via Unistyles (`useStyles` / `createStyleSheet`)
- Sem lógica de negócio, sem chamadas de API, sem estado de formulário

---

## Passo 5 — Criar entrada no playground

Crie (ou edite) `playground/mobile/<Nome>Playground.tsx` com:
- todas as variantes declaradas no contrato
- todos os estados: `default`, `disabled`, `loading` (se aplicável), `error`, `success`
- alternador de tema (light/dark) herdado do playground

O playground é o momento de ver o componente — ajuste o que estiver errado antes de documentar.

---

## Passo 6 — Documentar

Cada componente tem dois documentos, com donos diferentes:

- **`ds-learning/component-mobile/<Nome>.md`** — uso + tokens. Escrito pelo `designer` (`documental` + `visual`). Conteúdo que vale pras duas plataformas vai em `ds-learning/global/`, não aqui.
- **`ds-core/mobile/components/<Nome>/spec.md`** — props, exemplos de uso e decisões de implementação. Escrito aqui, no formato definido em `.claude/skills/dev/desenvolvedor.md` (seção "Spec técnica"). É a única documentação que vive em `ds-core`.

No fluxo via `/ds-designer`, o `.md` de `ds-learning` já existe — escreva só a `spec.md` e não edite o de `ds-learning`. Se estiver usando esta skill isoladamente (sem `designer` ter rodado antes), crie também o `.md` de `ds-learning`:

```markdown
# <Nome>

Descrição de uma linha.

## Quando usar

## Quando não usar

## Onde é usado

## Variantes

| Variante | Quando |
|---|---|

## Estados

| Estado | Comportamento |
|---|---|

## Tokens

(nome do token por parte/estado — nunca hex ou valor cru)
```

---

## Passo 7 — Auditar

Rode o agente `ds-curator` sobre o componente:

```
use agent ds-curator: audite o componente <Nome> — plataformas: mobile
```

Corrija tudo que o agente apontar antes de considerar o componente pronto.

---

## Definition of Done (relembrete)

Nenhum componente está pronto enquanto os seis itens abaixo não fecharem:

- [ ] Contrato de props fechado e explícito
- [ ] Todos os valores visuais vindos de token
- [ ] `testID` + `accessibilityLabel` + `accessibilityRole` + `accessibilityHint` no contrato
- [ ] Funciona em light e dark
- [ ] Entrada no playground cobrindo todas as variantes e estados
- [ ] Doc de uso + tokens em `ds-learning/component-mobile/<Nome>.md` e spec técnica em `ds-core/mobile/components/<Nome>/spec.md`
