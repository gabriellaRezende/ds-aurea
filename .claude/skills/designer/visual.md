# skill:visual

Depois que `documental` define **o quê** vai ser construído, `visual` garante que existe **com o quê** construir — os tokens e diretrizes visuais. Cria o que faltar; nunca deixa o `dev` inventar valor.

---

## Quando usar

Sempre depois de `documental`, antes de passar para `skill:dev`.

## Como avaliar

### 1. Levantar o que o componente precisa

A partir do `.md` que `documental` escreveu (variantes, estados, onde aparece), liste os slots semânticos necessários: cor (por estado — default/disabled/error/success), spacing, radius, tipografia, elevation, motion.

### 2. Conferir se já existem

- **Mobile:** `ds-core/shared/tokens/` (spacing, radius, typography, elevation, motion) e `ds-core/shared/themes/` (contract, default, aurea).
- **Web:** hoje não há tokens web equivalentes — `ds-core/web/` está vazio. Se o pedido envolve web, isso é uma lacuna maior que um token faltando: **não existe ainda a decisão de qual motor de estilo o `ds-core/web` vai usar** (CSS-in-JS próprio, CSS variables, ou outra abordagem — Unistyles é uma lib mobile/RN, não se aplica a web direto). Não decida isso sozinho dentro do fluxo de um componente — sinalize como bloqueio de nível mais alto e pergunte ao Operador antes de criar token web ad-hoc.

> **Tema único:** existe uma só identidade visual, em `ds-core/shared/themes/aurea.ts` (`aureaLight`/`aureaDark`). Não há tema por produto — componentes consomem os slots semânticos (`theme.colors.*`) e qualquer produto que usar o componente recebe a mesma identidade.

### 3. Se faltar um slot (mobile)

Crie a diretriz seguindo as regras já estabelecidas no `PLANO.md` (seção 1.2 — papéis semânticos, nunca nome de cor cru tipo `gray500`). Regra inegociável: **nada hardcoded** — todo valor visual do componente tem que vir de um slot nomeado.

Se a decisão for de julgamento de design puro (uma cor de marca nova, um timing de motion sem precedente) e não houver nada análogo no tema atual para se basear — **pare e pergunte ao Operador**. Não invente.

### 4. Paridade mobile ↔ web — é a mesma identidade, não uma coincidência

Não existe mais tema por produto nem por plataforma — existe **uma identidade visual única**, definida uma vez em `ds-core/shared/`. Se o pedido é para as duas plataformas, o **nome semântico do slot e o valor por trás dele** têm que ser os mesmos dos dois lados (ex: `colors.error` é a mesma cor em mobile e web), mudando só a forma técnica de aplicar (Unistyles vs o motor de estilo do web, ainda em aberto). Divergência aqui não é uma inconsistência de estilo — é a identidade única quebrada.

### 5. Nunca inventar o valor exato

Se o slot precisar de um valor novo (cor de marca, timing de motion, etc.) e não houver nada análogo no tema atual pra se basear, **pare e peça o valor exato ao Operador** — hex, token ou referência visual.

### 6. Apresentar para confirmação

Crie a seção **Tokens** no(s) `.md` em `ds-learning` que o `documental` escreveu: para cada parte/estado do componente, o nome do token (`theme.colors.error`, `spacing.lg`). É dela que o `dev` parte para implementar. Liste os tokens usados e os tokens novos criados (se houver), e aguarde confirmação antes de passar para `dev`.

## Nunca

- Nunca hardcode um valor "só dessa vez" para não bloquear o fluxo.
- Nunca escreva hex ou valor cru (`#E53935`, `16px`) no `.md` de `ds-learning` — só nome de token. Valor cru desatualiza quando a paleta muda; o nome do token não.
- Nunca decida sozinho o motor de estilo do `ds-core/web` dentro do fluxo de um componente — isso é decisão de arquitetura, não de token.

## Encadeamento

Depois de confirmado → `skill:desenvolvedor` (em `.claude/skills/dev/`).
