# Invariantes do DS-Aurea

Regras que não mudam, independente da fase ou componente. Leia antes de qualquer implementação.

---

## 1. Paper encapsulado

`react-native-paper` só pode ser importado dentro de `ds-core/mobile/components/`.

O projeto consumidor **nunca** importa Paper diretamente. Se algo do Paper não está exposto pelo ds-core, o caminho é adicionar ao ds-core — nunca abrir o encapsulamento no consumidor.

Sinal de violação: `import { ... } from 'react-native-paper'` fora de `ds-core/mobile/components/`.

---

## 2. shared/ sem componente de UI

`ds-core/shared/` guarda tokens, types e utils puros — sem dependência de plataforma.

React Native e DOM não compartilham implementação de componente. Nenhum componente visual vai para `shared/`. O que pode ir: `spacing`, `borderRadius`, `typography`, `type ThemeColors`, utilitários sem JSX.

Sinal de violação: qualquer `import from 'react-native'` ou `import from 'react'` (JSX) dentro de `ds-core/shared/`.

---

## 3. testID é contrato de semver

`testID` é prop obrigatória em todo componente do catálogo — não opcional.

Sufixos derivados (`-label`, `-error`, `-icon`) são documentados por componente e tratados como contrato público. Mudança de sufixo = **breaking change de semver**, porque quebra o repositório de testes E2E (Maestro) sem nenhum erro de build.

Sinal de violação: componente sem `testID` obrigatório no contrato de props.

---

## 4. ds-core não conhece react-hook-form

`ds-core/mobile/components/` não importa react-hook-form.

Um `Input` no ds-core recebe `value` e `onChange` puros. O binding RHF fica em `ds-core/mobile/adapters/rhf/` — pacote separado e opcional. Misturar RHF no componente base impede uso em contextos sem formulário.

Sinal de violação: `import { Controller, useFormContext, ... } from 'react-hook-form'` dentro de `ds-core/mobile/components/`.

---

## 5. Cor só via token semântico

Nenhum componente usa valor de cor hardcoded (hex, rgb, hsl).

Toda cor vem de um slot semântico do tema (`theme.colors.primary`, `theme.colors.error`, etc). Isso garante que light/dark funcionem e que trocar a marca Helios por outra não exija editar componentes.

Sinal de violação: string de cor literal em qualquer arquivo de `ds-core/`.

---

## READING CONDITIONS

| Se a task envolve... | Leia também... |
|---|---|
| Escrever ou alterar componente | `PLANO.md` (Definition of Done) + invariantes acima |
| Portar componente do helios-app | skill `.claude/skills/port-component/SKILL.md` |
| Auditar componente já escrito | agente `.claude/agents/ds-curator.md` |
| Tokens ou tema | `ds-core/docs/mobile/inventario-helios-app.md` — seção Tokens |
| Escrever ds-learning | Nunca citar hex — falar de slot semântico |
| Qualquer dúvida de sequência | `PLANO.md` — seção da fase atual |
