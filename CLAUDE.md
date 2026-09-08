# DS-Aurea

Design System da Aurea — base técnica, documentação e skill de orientação para projetos web e mobile.

## Arquivos de referência rápida

| Arquivo | O que contém |
|---|---|
| `README.md` | Visão geral, proposta e roadmap do projeto |
| `PLANO.md` | Sequenciamento de fases e Definition of Done por componente |
| `AGENTS.md` | Invariantes carregados em toda sessão — leia antes de implementar |
| `docs/DISTRIBUTION.md` | Separação `.claude/` (construção) vs `skills/` (distribuição) |
| `docs/INSTALLATION.md` | Configuração obrigatória do babel no projeto consumidor |
| `ds-core/docs/mobile/inventario-helios-app.md` | Inventário completo do helios-app (Etapa 1 concluída) |

## Estrutura do repositório

```
ds-aurea/
  ds-core/           implementação técnica (shared/, mobile/, web/)
  ds-learning/       documentação de princípios, padrões e decisões
  ds-skill/          skill para distribuição nos projetos consumidores (futuro)
  playground/        visualização de componentes e tokens (futuro)
  docs/              documentação de processo e decisões do projeto
  .claude/           agentes e skills INTERNOS — nunca distribuídos
  skills/            skill distribuída — instalada nos projetos consumidores (futuro)
```

## Estado atual

| Fase | Status |
|---|---|
| Etapa 1 — Inventário mobile (helios-app) | Concluída |
| Fase 0 — Fundação do repositório | Concluída |
| Fase 1 — Tokens e contrato de tema | Próxima |
| Fase 2 — Playground (esqueleto) | Pendente |
| Fase 3 — Atoms | Pendente |
| Fase 4 — Catálogo | Pendente |
| Fase 5 — ds-learning | Pode rodar em paralelo |
| Fase 6 — Piloto helios-app | Pendente |

## Antes de implementar qualquer coisa

1. Leia `AGENTS.md` — invariantes que não mudam.
2. Leia `PLANO.md` — fase atual, sequência e Definition of Done.
3. Para portar componente do helios-app: use `.claude/skills/port-component`.
4. Para auditar componente já escrito: use `.claude/agents/ds-curator`.
