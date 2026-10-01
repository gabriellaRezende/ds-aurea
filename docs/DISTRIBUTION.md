# Plano de Distribuição — DS-Aurea

> O que fica dentro do ds-aurea, o que sai para os projetos consumidores e por qual caminho cada parte chega lá.

---

## O ciclo completo

O ds-aurea tem duas audiências, e cada pasta serve a uma delas:

```txt
┌──────────────────────────────── ds-aurea/ ────────────────────────────────┐
│                                                                           │
│  🔧 CONSUMO INTERNO                    📦 CONSUMO PELOS OUTROS PROJETOS    │
│  só o ds-aurea usa                     helios-app, helios-portal, uranus  │
│                                                                           │
│  .claude/                              ds-core/      componentes + spec   │
│    skills e agentes que ajudam         ds-learning/  conhecimento de uso  │
│    a estruturar o próprio DS           ds-skill/     skill que cria telas │
│                                                      nos outros projetos  │
└───────────────────────────────────────────────────────────────────────────┘
```

| Pasta | O que é | Quem usa | Como chega no consumidor |
|---|---|---|---|
| `.claude/` | skills e agentes de construção (`/ds-designer`, `port-component`, `ds-curator`) | só o ds-aurea | **não chega** — nunca sai do repositório |
| `ds-core/` | componentes, tokens, temas e a `spec.md` técnica de cada componente | outros projetos | pacote npm `@aurea/ds-core` (ver `docs/INSTALLATION.md`) |
| `ds-learning/` | conhecimento de uso: quando usar, quando não, tokens, princípios | outros projetos | **dentro do `ds-skill`** — o consumidor não instala o `ds-learning` direto, quem lê é a IA do projeto |
| `ds-skill/` | a skill que orienta a IA a criar telas nos outros projetos usando o DS | outros projetos | plugin do Claude Code (`/plugin install`) |

Regra: **`.claude/` nunca sai do repositório. `ds-skill/` sempre sai.** Uma skill de construção nunca vai para o `ds-skill`, e a skill de consumo nunca fica presa em `.claude/` — se ficasse, só funcionaria aqui dentro e nunca chegaria em quem precisa dela.

---

## Estrutura do repositório

```txt
ds-aurea/
  .claude/                     🔧 INTERNO — nunca distribuído
    commands/
      ds-designer.md           /ds-designer — orquestra a esteira designer → dev → curador
    skills/
      designer/                documental.md, visual.md
      dev/                     desenvolvedor.md, curador.md
      port-component/          checklist helios-app → ds-core/mobile
    agents/
      ds-curator.md            audita componente vs invariantes
    README.md                  como a esteira funciona

  .claude-plugin/
    marketplace.json           📦 catálogo do marketplace — aponta para ./ds-skill

  ds-core/                     📦 npm @aurea/ds-core
    shared/                    tokens, temas, types, utils
    mobile/components/<Nome>/  código + spec.md
    web/components/<Nome>/     código + spec.md

  ds-learning/                 📦 fonte do conhecimento (viaja dentro do ds-skill)
    component-mobile/<Nome>.md
    component-web/<Nome>.md
    global/

  ds-skill/                    📦 o plugin em si — raiz do plugin
    .claude-plugin/
      plugin.json              manifesto do plugin
    skills/
      aurea-ds/
        SKILL.md               roteador fino
        rules/                 como a IA trabalha no projeto consumidor
          use-ds-core.md
          use-tokens.md
          testid-contract.md
          when-ds-lacks.md
        knowledge/             ⚙️ GERADO — nunca editar à mão
    commands/
      ds-check.md              /ds-check — audita a tela contra o DS

  docs/                        processo e decisões do projeto (não distribuído)
  playground/                  visualização dos componentes (não distribuído)
  CLAUDE.md                    ponteiro
  AGENTS.md                    invariantes de construção
```

> ⚠️ **Regra de caminho:** dentro do `ds-skill/`, as pastas `skills/` e `commands/` ficam na raiz do plugin, nunca dentro de `ds-skill/.claude-plugin/`. O `.claude-plugin/` guarda só o manifesto JSON.

Há dois `.claude-plugin/`, cada um com um papel:

- `ds-aurea/.claude-plugin/marketplace.json` — o **marketplace**. Diz "este repositório publica um plugin, e ele está em `./ds-skill`".
- `ds-aurea/ds-skill/.claude-plugin/plugin.json` — o **plugin**. Diz o nome, a versão e a descrição.

Assim, só o conteúdo de `ds-skill/` é instalado no consumidor. `.claude/`, `ds-core/`, `docs/` e `playground/` não vão junto.

---

## `rules/` e `knowledge/` — por que são separados

Dentro da skill há duas coisas diferentes:

| Pasta | Responde | Escrita onde |
|---|---|---|
| `rules/` | *como* a IA trabalha — quando consultar o DS, o que fazer quando falta componente, como checar uma tela | à mão, dentro do `ds-skill/` |
| `knowledge/` | *o que* o DS é — componentes, props, tokens, regras de uso | **gerada** a partir do `ds-learning/` e das `spec.md` do `ds-core/` |

`rules/` não repete conteúdo do DS. Ela diz "antes de montar uma tela, leia `knowledge/component-mobile/`" — nunca "o Button tem as variantes X e Y". O conteúdo fica só no `knowledge/`.

---

## Fonte única de verdade

Cada informação é escrita **uma vez**, no lugar dela, e o `knowledge/` só recebe cópias:

```txt
ds-learning/component-mobile/*.md   ──┐
ds-learning/component-web/*.md      ──┤
ds-learning/global/**               ──┼──→  script de build  ──→  ds-skill/skills/aurea-ds/knowledge/
ds-core/mobile/components/*/spec.md ──┤
ds-core/web/components/*/spec.md    ──┘
```

Forma esperada do `knowledge/` gerado:

```txt
knowledge/
  global/                      ← ds-learning/global/
  component-mobile/<Nome>.md   ← ds-learning/component-mobile/<Nome>.md
  component-web/<Nome>.md      ← ds-learning/component-web/<Nome>.md
  spec-mobile/<Nome>.md        ← ds-core/mobile/components/<Nome>/spec.md
  spec-web/<Nome>.md           ← ds-core/web/components/<Nome>/spec.md
```

**Por que copiar e não apontar para `../ds-learning`:** quando o plugin é instalado, o Claude Code copia só a pasta do plugin (`ds-skill/`). Caminhos que saem dela, como `../ds-learning`, não existem no consumidor.

**Por que gerar por script e não copiar à mão:** cópia manual é drift garantido. A mesma regra escrita em dois lugares fica desatualizada em um deles em poucos meses.

**O `knowledge/` gerado é commitado.** O plugin é instalado direto do git, sem passo de build no consumidor. Então o script roda antes de cada release, o resultado entra no commit, e a CI falha se o `knowledge/` estiver diferente do que o script geraria.

A alternativa de a skill ler os docs de `node_modules/@aurea/ds-core/` foi descartada: quebra em projeto que ainda não instalou o pacote, e o `ds-learning` não faz parte do pacote npm.

---

## Como o consumidor instala

Uma vez por projeto:

```txt
/plugin marketplace add <git-url-do-ds-aurea>
/plugin install aurea-ds@aurea
```

(`aurea-ds` é o nome do plugin; `aurea` é o nome do marketplace.)

A partir daí o projeto tem:

- a skill `aurea-ds`, carregada automaticamente quando a task envolve tela, componente ou estilo;
- o comando `/ds-check`;
- o conhecimento do DS disponível para a IA, sem depender do que cada pessoa lembra.

O código dos componentes chega separado, pelo npm (`@aurea/ds-core`). A skill **ensina a usar** o ds-core; ela não entrega o código.

Atualizar o DS = publicar nova versão do `@aurea/ds-core` + atualizar o plugin. Sem `cp -r`, sem drift.

---

## Manifestos

`ds-aurea/.claude-plugin/marketplace.json`:

```json
{
  "name": "aurea",
  "owner": { "name": "Aurea Phygital" },
  "plugins": [
    {
      "name": "aurea-ds",
      "source": "./ds-skill",
      "description": "Cérebro de design da Aurea"
    }
  ]
}
```

`ds-aurea/ds-skill/.claude-plugin/plugin.json`:

```json
{
  "name": "aurea-ds",
  "version": "0.1.0",
  "description": "Cérebro de design da Aurea: componentes, tokens e regras de interface para web e mobile",
  "author": { "name": "Aurea Phygital" },
  "repository": "<git-url>",
  "keywords": ["design-system", "aurea", "ui", "mobile", "web"]
}
```

Só `name` é obrigatório no `plugin.json`. As pastas `skills/` e `commands/` são descobertas automaticamente na raiz do plugin.

> ⏳ Confirmar os dois schemas na documentação oficial do Claude Code antes do primeiro release. Os campos acima são a forma esperada, não verificada.

---

## Design da skill: roteador, não enciclopédia

O `SKILL.md` deve ser **fino** e só apontar para os arquivos de apoio. Uma skill grande gasta contexto em toda sessão do consumidor; um roteador carrega só o necessário.

```md
---
name: aurea-ds
description: Design System da Aurea — componentes, tokens e regras de interface. Use ao criar ou alterar qualquer tela, componente ou estilo em projetos da Aurea.
---

⚡ If: task = criar/alterar tela → leia rules/use-ds-core.md
⚡ If: task = cor, espaçamento ou tipografia → leia rules/use-tokens.md
⚡ If: task = testID ou seletor de teste → leia rules/testid-contract.md
⚡ If: componente não existe no DS → leia rules/when-ds-lacks.md
```

Referência do padrão: `AGENTS.md`, seção READING CONDITIONS.

---

## Regras que a skill precisa ensinar ao consumidor

Os invariantes do `AGENTS.md` são escritos para quem **constrói** o DS. A skill traduz para quem **usa**:

| Invariante (`AGENTS.md`) | O que a skill ensina no projeto consumidor |
|---|---|
| 1. Paper proibido no ds-core | usar componente do `@aurea/ds-core`; não criar um equivalente com Paper ou MUI quando o DS já tem |
| 2. `shared/` sem componente | importar de `@aurea/ds-core/mobile` ou `@aurea/ds-core/web`, nunca componente de `shared` |
| 3. `testID` é contrato de semver | passar `testID` sempre; os sufixos (`-label`, `-error`) são estáveis e podem ser usados nos testes E2E |
| 4. ds-core sem react-hook-form | para formulário, usar o adapter `ds-core/mobile/adapters/rhf/`, não embrulhar o componente na mão |
| 5. Cor só via token semântico | nunca hex na tela; usar `theme.colors.*` e os tokens de spacing, radius e tipografia |

O conteúdo dessas regras de uso vive no `ds-learning/global/` (e, portanto, no `knowledge/`). Os arquivos de `rules/` só apontam para ele.

---

## Quando cada parte entra

As fases são as do `PLANO.md`. A distribuição não tem numeração própria.

| Momento (`PLANO.md`) | O que acontece na distribuição | Status |
|---|---|---|
| Fase 0 — Fundação | `.claude/` interno criado; pasta `ds-skill/` reservada, vazia | ✅ |
| Fases 3 e 4 — Atoms e Catálogo | `ds-core` ganha componentes, `spec.md` e catálogo — é o que a skill vai ensinar | pendente |
| Fase 5 — ds-learning (paralela) | `ds-learning` ganha conteúdo de uso e regras globais | pendente |
| Fase 6 — Piloto helios-app | helios-app consome só o `@aurea/ds-core`, ainda sem a skill | pendente |
| Depois — Etapa 5 do roadmap (ds-skill) | `marketplace.json`, `plugin.json`, `SKILL.md`, `rules/`, script de build do `knowledge/` + checagem na CI | pendente |
| Depois | instalar o plugin no helios-app e validar numa task real | pendente |

A skill não tem o que ensinar enquanto o `ds-core` e o `ds-learning` estiverem vazios. Por isso ela vem depois do catálogo. A **localização** (`ds-skill/`) já está decidida, para não mover arquivo depois.

---

## Alternativas descartadas

| Via | Por que não |
|---|---|
| skill dentro de `ds-aurea/.claude/` | só funciona dentro do ds-aurea — não chega no consumidor |
| `~/.claude/skills/` (nível do usuário) | cada pessoa instala à mão; não versiona com o DS |
| copiar a skill em cada repositório | drift garantido; nada avisa quando o DS muda |
| npm `postinstall` copiando arquivos | frágil; acopla a distribuição de conhecimento ao ciclo do bundler |
| skill lendo `node_modules/@aurea/ds-core/` | quebra sem o pacote instalado; `ds-learning` não está no pacote |
| plugin na raiz do ds-aurea (`skills/` solta na raiz) | mistura plugin com o resto do repositório; `ds-skill/` como raiz do plugin deixa explícito o que é distribuído |

---

## Decisões em aberto

| Decisão | Opções | Impacto |
|---|---|---|
| Schema de `marketplace.json` e `plugin.json` | confirmar na documentação oficial | bloqueia o primeiro release do plugin |
| Onde e como roda o script de build do `knowledge/` | script npm na raiz (`npm run build:skill`) + job de CI que compara | bloqueia o primeiro release do plugin |

Decisões já fechadas que a distribuição respeita estão no `PLANO.md` (D1–D5) e no `AGENTS.md`.
