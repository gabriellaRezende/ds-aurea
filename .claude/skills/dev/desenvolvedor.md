# skill:desenvolvedor

Implementa o componente (ou a variante) exatamente como especificado pelo `.md` de `designer:documental` e pelos tokens de `designer:visual`. Não decide escopo nem token aqui — só executa o que já foi definido.

---

## Quando usar

Depois que `designer` (documental + visual) foi confirmado. Também quando `dev:curador` bloqueia e há correções pontuais a aplicar — sem reabrir o `designer`, a menos que a correção mude o contrato de uso.

## Regras gerais (AGENTS.md — valem nas duas plataformas)

- Contrato de props fechado e explícito — sem `extends` de lib externa, **sem `any`** (o `Button` de referência em `uranus-web-portal-core` tem `sx?: any` — não repita esse padrão no ds-core).
- `testID` obrigatório no contrato, nunca opcional.
- Nenhum valor visual hardcoded — tudo vem do token que `visual` definiu.

## Mobile

Base: primitivos do React Native (`Pressable`, `View`, `Text`, `TextInput`) + Unistyles v3. **Paper é banido de todo o `ds-core`, sem exceção** (AGENTS.md invariante 1 — "nenhum arquivo de `ds-core/` importa Paper", isso inclui o próprio arquivo do componente). O original em `helios-app` usa Paper; o componente novo reimplementa manualmente o que o Paper dava de graça (acessibilidade, ripple, estados) — nunca importa a lib.

- Portando de um componente que já existe no `helios-app`: siga `.claude/skills/port-component/SKILL.md` passo a passo — não duplique esse checklist aqui.
- Componente sem equivalente no `helios-app` (genuinamente novo): mesmo checklist a partir do Passo 2 (contrato de props), pulando o Passo 1 (não há original para ler).
- Sem `react-hook-form` dentro do componente — isso é adapter separado em `ds-core/mobile/adapters/rhf/`.
- Entrada no playground (`playground/mobile/`) faz parte da entrega — não é tarefa posterior.

## Web

Base: `ds-core/web/`. Referência de inspiração (não de cópia direta): `~/Documents/uranus-web-portal-core/src/lib/`, que hoje encapsula `@mui/material` + emotion/styled-components.

- Diferente do mobile, **não existe ainda uma invariante formal proibindo MUI no `ds-core/web`** — isso é uma decisão em aberto, não uma regra fechada. Até ela ser tomada, a convenção proposta (não obrigatória) é a mesma lógica do Paper: se usar MUI, só dentro do arquivo do componente, nunca vazando pra fora. Não trate isso como equivalente em rigor ao invariante 1 do mobile.
- O motor de estilo do `ds-core/web` é uma decisão de arquitetura ainda em aberto (ver `skill:visual`) — se ela não foi resolvida antes de chegar aqui, **pare e volte para `visual`**, não decida no meio da implementação.
- Ainda não existe playground web — se for o primeiro componente web, sinalize essa lacuna ao Operador em vez de pular a etapa silenciosamente.

## Spec técnica

Junto com o código, escreva `ds-core/<plataforma>/components/<Nome>/spec.md` — a única documentação que vive em `ds-core`. Ela fica ao lado do código para mudar no mesmo diff que ele e é distribuída junto com o pacote.

```markdown
# <Nome> — spec

Uso e tokens: `ds-learning/component-<plataforma>/<Nome>.md`

## Props

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|---|---|---|---|---|
| testID | string | sim | — | |

## Exemplos de uso

## Decisões de implementação

(o que não é óbvio lendo o código — ex: por que reimplementa o ripple em vez de usar Pressable puro)
```

Não repita na spec o que está no `.md` de `ds-learning` (quando usar, variantes, tokens) — linke. Não edite o `.md` de `ds-learning`: se a implementação revelar que o uso ou os tokens precisam mudar, volte para o `designer`.

## Se o pedido cobre mobile + web

Implemente os dois lados (código + `spec.md` de cada um) antes de encaminhar para `curador` — nunca entregue metade e chame o componente de pronto.

## Antes de gravar qualquer arquivo

Mostre o diff ou o arquivo completo e aguarde confirmação — exceto se o usuário já autorizou execução autônoma nesta sessão.

## Encadeamento

Depois de escrever → `skill:curador`.
