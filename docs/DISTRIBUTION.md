# Plano de Distribuição — DS-Aurea

> Como o DS-Aurea chega até os projetos consumidores e como ele é construído internamente.

---

## Problema

O DS-Aurea tem **duas audiências opostas** que usam o mesmo formato de arquivo (`.md` com instruções para IA), mas com escopos incompatíveis:

1. **Quem consome o DS** — helios-app, helios-portal, uranus-portal. Precisa da skill instalada no projeto deles.
2. **Quem constrói o DS** — este repositório. Precisa de agentes e skills que ajudem a portar componentes e validar invariantes.

Se os dois forem misturados na mesma pasta, acontece o pior cenário: a skill que deveria ser o cérebro de design dos produtos fica presa dentro do `ds-aurea` e nunca chega em quem precisa dela.

---

## Princípio

```txt
      ┌─────────────────── ds-aurea ───────────────────┐
      │                                                │
  🔧 PRA DENTRO                                📦 PRA FORA
  agentes/skills que ajudam                    skill instalada nos produtos
  a CONSTRUIR o DS                             = cérebro de design
      │                                                │
  .claude/                                     skills/ + .claude-plugin/
  local, não distribuído                       distribuído via /plugin install
```

Regra: **`.claude/` nunca sai do repositório. `skills/` na raiz sempre sai.**

---

## Estrutura do repositório

```txt
ds-aurea/
  .claude-plugin/
    plugin.json              📦 manifesto do plugin
    marketplace.json         📦 catálogo (permite /plugin marketplace add)

  skills/                    📦 DISTRIBUÍDO
    aurea-ds/
      SKILL.md               roteador fino
      rules/
        use-ds-core.md
        use-tokens.md
        testid-contract.md
        when-ds-lacks.md
      knowledge/             cópia do ds-learning (viaja junto)
      examples/

  commands/                  📦 DISTRIBUÍDO
    ds-check.md              /ds-check — audita a tela contra o DS

  agents/                    📦 DISTRIBUÍDO (opcional)
    ds-reviewer.md           subagente de revisão no projeto consumidor

  .claude/                   🔧 LOCAL — some no consumidor
    agents/
      ds-curator.md          audita componente vs invariantes
    skills/
      port-component/
        SKILL.md             checklist: @lib/atoms/X → ds-core
    settings.json

  ds-core/                   código do Design System
  ds-learning/               fonte única de verdade das regras
  playground/

  CLAUDE.md                  ponteiro
  AGENTS.md                  invariantes sempre carregados
```

> ⚠️ **Regra de caminho crítica:** `skills/`, `commands/` e `agents/` ficam na **raiz do plugin**, nunca dentro de `.claude-plugin/`. O `.claude-plugin/` guarda só os manifestos JSON.

---

## Como o consumidor instala

Uma vez por projeto:

```txt
/plugin marketplace add <git-url-do-ds-aurea>
/plugin install aurea-ds
```

A partir daí o projeto tem:

- a skill `aurea-ds` disponível (invocável por `/aurea-ds` ou carregada automaticamente quando relevante);
- o comando `/ds-check`;
- o conhecimento do DS acessível à IA sem depender do que cada pessoa lembra.

Atualização do DS = atualizar o plugin. Sem `cp -r`, sem drift.

---

## Manifesto do plugin

`.claude-plugin/plugin.json`:

```json
{
  "name": "aurea-ds",
  "displayName": "Aurea Design System",
  "version": "0.1.0",
  "description": "Cérebro de design da Aurea: componentes, tokens e regras de interface para web e mobile",
  "author": { "name": "Aurea Phygital" },
  "repository": "<git-url>",
  "keywords": ["design-system", "aurea", "ui", "mobile"]
}
```

Apenas `name` é obrigatório. Os diretórios `skills/`, `commands/` e `agents/` são descobertos automaticamente na raiz — não precisam ser declarados.

`.claude-plugin/marketplace.json` publica o plugin para instalação:

```json
{
  "name": "aurea",
  "owner": { "name": "Aurea Phygital" },
  "plugins": [
    {
      "name": "aurea-ds",
      "source": "./",
      "description": "Cérebro de design da Aurea"
    }
  ]
}
```

> ⏳ O schema completo de `marketplace.json` precisa ser confirmado na documentação oficial antes do primeiro release. Campos acima são a forma esperada, não verificada.

---

## Design da skill: roteador, não enciclopédia

`SKILL.md` deve ser **fino** e rotear para os arquivos de apoio. Skill grande queima contexto em toda sessão do consumidor; roteador carrega só o necessário.

```md
---
name: aurea-ds
description: Design System da Aurea — componentes, tokens e regras de interface. Use ao criar ou alterar qualquer tela, componente ou estilo em projetos da Aurea.
---

⚡ If: task = criar/alterar tela → leia rules/use-ds-core.md
⚡ If: task = cor, espaçamento ou tipografia → leia rules/use-tokens.md
⚡ If: task = testID ou seletor de teste → leia rules/testid-contract.md
⚡ If: componente não existe no catálogo → leia rules/when-ds-lacks.md
```

Referência do padrão: `helios-app/AGENTS.md`, seção READING CONDITIONS.

---

## Fonte única de verdade

As regras de governança são escritas **uma vez** e consumidas pelos dois lados:

```txt
ds-learning/*.md          ← fonte única
   ├─→ AGENTS.md          referencia (construção)
   └─→ skills/aurea-ds/   empacota (distribuição)
```

Escrever a mesma regra em dois lugares garante divergência em poucos meses. Se a regra "cor só via token" existir no `AGENTS.md` e na `skill`, uma das duas vai ficar desatualizada.

**Decisão:** o `ds-learning/` é a fonte. O empacotamento para `skills/aurea-ds/knowledge/` é feito por script de build, não por cópia manual.

---

## Divisão de papel — construção interna

| Artefato | Tipo | Quando age | Papel |
|---|---|---|---|
| `AGENTS.md` | doc | sempre carregado | invariantes do projeto |
| `port-component` | skill local | sob demanda | passo-a-passo de extração `helios/@lib/atoms/X` → `ds-core` |
| `ds-curator` | agente local | pós-implementação | audita: Paper vazou? testID obrigatório? RHF no core? token hardcoded? |

`ds-curator` é **agente** e não skill de propósito: roda em contexto isolado, não polui a sessão principal, e permite auditar vários componentes em paralelo durante portes em lote.

---

## Alternativas descartadas

| Via | Por que não |
|---|---|
| `~/.claude/skills/` | user-level: cada pessoa instala manualmente, não versiona com o DS |
| copiar em cada repo | drift garantido; nada avisa quando o DS muda |
| npm `postinstall` copiando arquivos | frágil, acopla distribuição de conhecimento ao ciclo do bundler |
| skill dentro de `ds-aurea/.claude/` | só funciona dentro do ds-aurea — não chega no consumidor |

---

## Dependência entre skill e conhecimento

A skill instrui *"consulte o ds-learning antes de implementar"*. Se o consumidor instala só o plugin, ele não tem o `ds-learning/`.

Duas saídas:

- **A — knowledge viaja no plugin.** Os `.md` são empacotados em `skills/aurea-ds/knowledge/`. Simples, sem dependência externa.
- **B — skill referencia o pacote npm.** A skill lê os docs de `node_modules/@aurea/ds-core/docs/`. Evita duplicação, mas quebra se o pacote não estiver instalado.

**Escolha para o MVP: A.** O plugin precisa funcionar mesmo antes do `@aurea/ds-core` existir como pacote publicado.

---

## Faseamento

| Fase | Entrega | Depende de |
|---|---|---|
| **0** | `CLAUDE.md`, `AGENTS.md`, `.gitignore`, esqueleto de pastas | — |
| **1** | `.claude/skills/port-component` + `.claude/agents/ds-curator` | invariantes definidos |
| **2** | `ds-core/shared/tokens` + primeiros componentes mobile | decisão de estratégia mobile |
| **3** | catálogo de componentes | componentes existirem |
| **4** | `ds-learning/` com as regras reais | uso real dos componentes |
| **5** | `skills/aurea-ds/` + `plugin.json` + `marketplace.json` | ds-learning ter conteúdo |
| **6** | instalar no helios-app e validar em task real | plugin publicado |

A skill não tem o que dizer enquanto o `ds-core` estiver vazio. Por isso ela é Fase 5 — mas a **localização** é decidida agora, para não mover arquivo depois.

---

## Decisões em aberto

| # | Decisão | Opções | Impacto |
|---|---|---|---|
| D1 | Estratégia mobile | wrapper sobre react-native-paper · híbrido (wrapper + substituição gradual) · implementação própria | define custo do projeto: semanas vs trimestres |
| D2 | Distribuição do `ds-core` (código) | npm no GitLab Package Registry · git submodule · monorepo workspace · cópia manual | define versionamento e política de breaking change |
| D3 | Schema do `marketplace.json` | confirmar na doc oficial | bloqueia Fase 5 |

D1 e D2 não bloqueiam as Fases 0 e 1.

---

## Invariantes que a distribuição precisa preservar

1. **Paper encapsulado** — `react-native-paper` só pode ser importado dentro dos átomos do `ds-core/mobile`. Consumidor nunca importa Paper direto.
2. **`shared/` sem componente** — React Native e DOM não compartilham implementação. `shared/` guarda tokens, types e utils puros.
3. **`testID` é contrato** — prop obrigatória no catálogo. Sufixos derivados (`-error`, `-label`) documentados. Mudança de sufixo é *breaking change* de semver, porque quebra o repositório de testes E2E (Maestro) sem sinal no build.
4. **Core sem form-lib** — `ds-core/mobile/components/Input` não conhece react-hook-form. O binding vive em `ds-core/mobile/adapters/rhf/`, pacote opcional.

A skill distribuída deve ensinar essas quatro regras aos consumidores. São elas que impedem o DS de virar mais uma pasta de componentes.
