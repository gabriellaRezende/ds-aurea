# Agentes e skills do DS-Aurea

Como a IA ajuda a **construir** o Design System da Aurea. Tudo aqui é interno — vive em `.claude/`, que nunca sai deste repositório (ver `docs/DISTRIBUTION.md`). Isso é diferente da skill que, no futuro, vai ser instalada nos projetos *consumidores* do DS (`skills/aurea-ds`, Fase 5 do `PLANO.md`) — aquela ensina a usar o DS pronto; esta aqui ensina a construir o DS.

---

## Visão geral — a esteira de criação de componente

```
Operador → skill:designer (documental → visual) → skill:dev (desenvolvedor → curador) → Entrega final
```

Um pedido de componente novo passa por dois papéis, cada um com duas etapas:

- **Designer** decide *o quê* construir e garante que existe *com o quê* construir (tokens).
- **Dev** implementa e depois é auditado por um segundo olhar, nunca o próprio autor.

Quem dispara isso é o comando `/ds-designer`, que age como orquestrador — recebe o pedido do Operador (você) e conduz a esteira inteira, parando pra confirmação antes de qualquer escrita em arquivo.

---

## Como invocar

```
/ds-designer                              → sem argumento: só responde "ds-designer ativo. Qual pedido?" e espera
/ds-designer cria o componente Chip       → roda a esteira completa
/ds-designer porta o Button do helios-app → idem, partindo de um componente existente
/ds-designer audita o SkeletonBox         → pula direto pro curador
/ds-designer onde estamos?                → diagnóstico de fase, sem executar nada
```

Pode anexar uma imagem de referência junto do pedido — ela orienta a etapa `visual`, mas nunca substitui os tokens que já existem em `ds-core/shared/`.

---

## Estrutura de arquivos

```
.claude/
├── commands/
│   └── ds-designer.md          comando /ds-designer — ponto de entrada, orquestra tudo abaixo
├── skills/
│   ├── designer/
│   │   ├── documental.md       componente já existe? é variante? escreve o .md de uso em ds-learning
│   │   └── visual.md           os tokens necessários existem? cria a diretriz quando faltar
│   ├── dev/
│   │   ├── desenvolvedor.md    implementa (mobile via port-component, web via uranus-web-portal-core)
│   │   └── curador.md          aciona o agente ds-curator (mobile e web)
│   └── port-component/
│       └── SKILL.md            checklist de portagem helios-app → ds-core/mobile (pré-existente)
└── agents/
    └── ds-curator.md           audita invariantes + Definition of Done, contexto isolado
```

---

## Cada peça, em detalhe

### `designer:documental`
Primeira parada de qualquer pedido. Busca nos dois inventários (mobile: `docs/mobile/inventario-helios-app.md`; web: ainda não existe um equivalente) se algo parecido já existe, decide se é componente novo ou variante de um existente, e escreve o contrato de **uso** — não de código — em `ds-learning/component-mobile/<Nome>.md` e/ou `ds-learning/component-web/<Nome>.md` (um arquivo por plataforma pedida): quando usar, quando não, onde é usado hoje (só como direcionamento — o componente é da lib, não de um produto). Conteúdo que vale pras duas plataformas vai em `ds-learning/global/`. Não fala de token — isso é do `visual`. A parte técnica (props, exemplos) não entra nesse `.md`: fica na `spec.md` que o `dev` escreve na pasta do componente em `ds-core`.

### `designer:visual`
Confere se os tokens que o componente precisa (cor, spacing, radius, tipografia, elevação, motion) já existem em `ds-core/shared/`. Se faltar, cria a diretriz — mas nunca inventa um valor de marca sem precedente; para e pergunta ao Operador. Cria a seção **Tokens** no `.md` do componente em `ds-learning`, só com nome de token (nunca hex). Garante que mobile e web usam o mesmo nome semântico pro mesmo valor, porque a identidade visual é única (ver `AGENTS.md` invariante 5).

### `dev:desenvolvedor`
Implementa o que `designer` definiu. Mobile: primitivos RN + Unistyles, Paper banido de todo o `ds-core` sem exceção (nem dentro do componente — AGENTS.md invariante 1), segue `port-component/SKILL.md` passo a passo. Web: base de referência é `uranus-web-portal-core` (hoje envolto em MUI); ainda não há invariante formal proibindo MUI no `ds-core/web`, é convenção proposta, não regra fechada. Escreve a `spec.md` técnica (props, exemplos, decisões de implementação) em `ds-core/<plataforma>/components/<Nome>/`, ao lado do código. Sempre mostra diff antes de gravar.

### `dev:curador`
Segundo olhar obrigatório — quem escreveu o componente nunca é quem aprova. Aciona o agente `ds-curator` uma vez, com todas as plataformas implementadas (contexto isolado, relatório BLOQUEADO/APROVADO por plataforma).

### `ds-curator` (agente)
Audita um componente pronto contra os invariantes do `AGENTS.md` e o Definition of Done do `PLANO.md` — um agente só para mobile e web: checklist comum, itens específicos de cada plataforma e, quando as duas foram pedidas, paridade (mesmo token, mesmas variantes). Itens de web que dependem de decisão em aberto (motor de estilo, MUI, playground web) saem como "não auditável ainda", nunca como aprovados. É **agente**, não skill, de propósito — auditoria não precisa de ida-e-volta com o usuário, então roda isolado e permite auditar vários componentes em paralelo num porte em lote.

### `port-component` (skill)
Pré-existente, reaproveitado sem alteração. Checklist de 7 passos pra portar um componente de `helios-app/src/core/lib/atoms/` pro `ds-core/mobile/`. O `dev:desenvolvedor` aciona ele para trabalho mobile.

---

## Por que skill aqui e agent ali

| Papel | Precisa de ida-e-volta com o Operador? | Hoje é... |
|---|---|---|
| `documental` | Sim — decide novo vs variante, às vezes pergunta | Skill |
| `visual` | Sim — pergunta cor/token quando falta | Skill |
| `desenvolvedor` | Um pouco — mostra diff antes de gravar | Skill (candidato a virar agent quando houver porte em lote, Fase 3) |
| `curador` / `ds-curator` | Não — critério fixo | Agent |

Skill roda na conversa principal (bom pra decisão interativa). Agent roda isolado (bom pra critério fixo, paralelizável, não polui a sessão).

---

## Lacunas conhecidas — não resolver por conta própria

Os próprios arquivos de skill sinalizam isso quando aparece; documentado aqui pra não perder de vista:

1. **Falta inventário web** — não existe equivalente ao `inventario-helios-app.md` para `uranus-web-portal-core`.
2. **Motor de estilo do `ds-core/web` não decidido** — Unistyles é mobile/RN, não serve pra web direto. Enquanto isso, o `ds-curator` marca esses itens de web como "não auditável ainda".

---

## Como isso se relaciona com o resto do repositório

- `CLAUDE.md` (raiz) — ponteiro geral do projeto, único doc solto na raiz.
- `AGENTS.md` — invariantes que toda etapa acima respeita (Paper banido, testID obrigatório, cor só via token, etc.).
- `PLANO.md` — fase atual e Definition of Done que `designer`/`dev` seguem.
- `docs/DISTRIBUTION.md` — por que isso tudo fica em `.claude/` e nunca vira parte do que é distribuído para os projetos consumidores.
