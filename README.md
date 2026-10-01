# DS-Aurea

> Camada de Design System, conhecimento e orientação para que projetos da Aurea implementem interfaces de forma padronizada em web e mobile.

---

## Visão Geral

O DS-Aurea tem como objetivo centralizar o Design System da Aurea e permitir que projetos diferentes usem os mesmos componentes, tokens, padrões e regras de interface.

A proposta é organizar três partes principais:

- **ds-core**: implementação técnica do Design System para web e mobile.
- **ds-learning**: documentação em Markdown com princípios, padrões, regras e decisões.
- **ds-skill**: instruções para que uma IA trabalhe dentro dos projetos respeitando o Design System.

Essas três partes são feitas para serem consumidas pelos outros projetos da Aurea. Além delas, o repositório tem a pasta `.claude/`, com as skills e agentes que ajudam a construir o próprio DS. Ela é de uso interno e nunca sai do ds-aurea (ver [docs/DISTRIBUTION.md](docs/DISTRIBUTION.md)).

No MVP, o foco não é criar uma plataforma completa de geração automática de telas. O foco é criar uma base simples e utilizável, onde os componentes de web e mobile estejam organizados, documentados e disponíveis para validação em um Playground.

O Storybook não será implementado neste momento. No lugar dele, o projeto usará um Playground para visualizar componentes, tokens, variações e exemplos de uso.

---

## Problema

O fluxo tradicional de criação de interfaces costuma depender de muitas interpretações manuais:

```txt
Requisito
  ↓
UX/UI interpreta
  ↓
Prototipação
  ↓
Desenvolvimento interpreta novamente
  ↓
Implementação
  ↓
Validação
```

Esse processo pode gerar:

- divergência entre documentação, protótipo e implementação;
- uso inconsistente do Design System;
- retrabalho entre design e desenvolvimento;
- criação de componentes duplicados;
- dificuldade para escalar padrões entre produtos;
- dependência excessiva de interpretação manual.

Mesmo com um Design System existente, a aplicação correta dos componentes ainda depende do conhecimento individual de cada pessoa do time.

---

## Proposta

O DS-Aurea transforma o Design System em uma base operacional para projetos da Aurea.

O fluxo inicial é:

```txt
ds-core
  ↓
ds-learning
  ↓
ds-skill
  ↓
Projeto consumidor
  ↓
Interface implementada com padrão Aurea
```

Cada parte tem uma responsabilidade clara:

- **ds-core**: concentra componentes, tokens, providers, hooks e utilitários técnicos.
- **ds-core/web**: implementação dos componentes para aplicações web.
- **ds-core/mobile**: implementação dos componentes para aplicações mobile.
- **ds-learning**: explica por que os padrões existem e como devem ser usados.
- **ds-skill**: orienta a IA dentro dos projetos consumidores.
- **playground**: permite validar visualmente componentes e variações sem Storybook.
- **.claude**: skills e agentes internos que ajudam a construir o DS — não é distribuído.

Como cada parte chega no projeto consumidor:

| Parte | Caminho |
| --- | --- |
| `ds-core` | pacote npm `@aurea/ds-core` |
| `ds-learning` | viaja dentro do `ds-skill` (cópia gerada por script) |
| `ds-skill` | plugin do Claude Code, instalado com `/plugin install` |
| `.claude`, `playground`, `docs` | não saem do ds-aurea |

Artefatos como **UI Contract**, **UI Spec** e **Code Generator** continuam sendo importantes, mas entram como evolução depois que a base do Design System estiver organizada.

---

## Papel do Design System

O Design System é a fonte única de verdade da interface.

Ele centraliza:

- tokens de design;
- componentes reutilizáveis de web;
- componentes reutilizáveis de mobile;
- variações permitidas;
- estados dos componentes;
- regras de uso;
- padrões de composição;
- catálogo de componentes;
- documentação técnica.

Neste projeto, o `ds-core` já deve nascer separado por plataforma:

```txt
ds-core/
  web/
  mobile/
  shared/
```

Essa separação permite que web e mobile tenham componentes e tokens próprios, sem misturar responsabilidades.

O que for comum às duas plataformas pode ficar em `shared`. O que for específico de cada plataforma fica em `web` ou `mobile`.

---

## Papel da IA

A IA não deve decidir a interface visual.

Ela deve:

- ler a demanda do projeto;
- consultar a documentação do Design System;
- respeitar os componentes disponíveis no ds-core;
- seguir as regras definidas pelo Design System;
- usar tokens oficiais;
- evitar componentes fora do padrão;
- apontar quando uma demanda não é atendida pelo Design System.

A inteligência do sistema não fica apenas no prompt ou na IA. Ela é construída a partir de:

- documentação em Markdown;
- catálogo de componentes;
- exemplos de uso;
- regras do Design System.

Em uma evolução futura, a IA também poderá apoiar a geração de UI Contract, UI Spec e código.

---

## Sem Storybook no MVP

Neste momento, o projeto não precisa de Storybook.

O Storybook é útil para documentar e testar componentes isolados, mas ele pode aumentar o esforço inicial do projeto.

Por isso, o MVP deve usar um **Playground** simples.

O Playground deve permitir:

- visualizar componentes web;
- visualizar componentes mobile;
- testar tokens de cada plataforma;
- testar variações dos componentes;
- testar estados como default, disabled, loading, error e success;
- validar exemplos de uso;
- comparar padrões entre web e mobile quando fizer sentido.

Fluxo esperado do Playground:

```txt
Selecionar plataforma
  ↓
Selecionar componente
  ↓
Selecionar variação/estado
  ↓
Visualizar resultado
```

---

## Estrutura Inicial do Projeto

A estrutura inicial deve refletir a separação entre core técnico, conhecimento e skill da IA:

```txt
ds-aurea/
  ds-core/
    shared/
      tokens/
        colors.ts
        spacing.ts
        typography.ts
        radius.ts
      utils/
      types/

    web/
      components/
        Button/
        Input/
        Card/
        Modal/
      tokens/
        colors.ts
        spacing.ts
        typography.ts
      providers/
      hooks/
      catalog/
        webComponentCatalog.ts

    mobile/
      components/
        Button/
        Input/
        Card/
        Modal/
      tokens/
        colors.ts
        spacing.ts
        typography.ts
      providers/
      hooks/
      catalog/
        mobileComponentCatalog.ts

  ds-learning/
    component-mobile/
      Button.md
    component-web/
      Button.md
    global/
      foundations/
      principles/
      accessibility/
      ux-patterns/
      interaction-rules/
      decisions/
        destructive-actions.md
      mobile/

  ds-skill/
    .claude-plugin/
      plugin.json
    skills/
      aurea-ds/
        SKILL.md
        rules/
          use-ds-core.md
          use-tokens.md
          testid-contract.md
          when-ds-lacks.md
        knowledge/        gerado a partir do ds-learning + spec.md do ds-core
    commands/
      ds-check.md

  .claude-plugin/
    marketplace.json      publica o ds-skill como plugin

  .claude/                interno — skills e agentes que constroem o DS

  playground/
    web/
    mobile/

  docs/                   processo e decisões do projeto

  README.md
```

Cada componente tem uma `spec.md` técnica (props, exemplos, decisões de implementação) ao lado do código, em `ds-core/<plataforma>/components/<Nome>/`. O uso do componente (quando usar, quando não, tokens) fica em `ds-learning/component-<plataforma>/<Nome>.md`.

Essa estrutura mantém o projeto simples, mas já deixa claro que web e mobile são plataformas diferentes dentro do mesmo Design System.

---

## ds-core

O `ds-core` é a parte técnica do Design System.

Ele responde:

```txt
Como o Design System é implementado?
```

Ele deve conter:

- componentes web;
- componentes mobile;
- tokens compartilhados;
- tokens específicos por plataforma;
- providers;
- hooks;
- tipos;
- catálogos de componentes.

Exemplo:

```txt
ds-core/
  shared/
    tokens/
    types/

  web/
    components/
    tokens/
    providers/
    hooks/
    catalog/

  mobile/
    components/
    tokens/
    providers/
    hooks/
    catalog/
```

Resultado para a empresa:

- padronização técnica entre produtos;
- reutilização de componentes;
- consistência entre web e mobile;
- menor risco de cada projeto implementar interface de um jeito diferente.

---

## ds-learning

O `ds-learning` é a base de conhecimento do Design System.

Ele responde:

```txt
Por que usamos esse padrão?
Quando usar?
Quando não usar?
O que vale só para mobile ou só para web?
```

Exemplo:

```txt
ds-learning/
  component-mobile/     uso de cada componente mobile
  component-web/        uso de cada componente web
  global/               conhecimento transversal (não é de um componente)
    foundations/
    principles/
    accessibility/
    ux-patterns/
    interaction-rules/
    decisions/          decisões de design registradas (ex.: ações destrutivas)
    mobile/             regras que valem para toda tela mobile (safe area, Expo)
```

O conhecimento não é separado por produto. Uma regra que nasceu no helios-app vale para qualquer app mobile da Aurea.

O `ds-learning` não é instalado direto nos projetos consumidores. Ele é copiado por script para dentro do `ds-skill`, e quem o lê é a IA do projeto.

Resultado para a empresa:

- documentação viva dos padrões;
- redução de decisões repetidas;
- melhor alinhamento entre design, produto e desenvolvimento;
- base de contexto para a IA.

---

## ds-skill

O `ds-skill` é a camada que orienta a IA dentro dos projetos consumidores.

Ele responde:

```txt
Como a IA deve trabalhar em um projeto que usa o Design System da Aurea?
```

A skill deve instruir a IA a:

- identificar se o projeto usa web ou mobile;
- verificar quais componentes do ds-core estão disponíveis;
- consultar o ds-learning antes de implementar;
- usar tokens oficiais;
- respeitar regras globais e regras específicas do produto;
- não criar componentes novos sem necessidade;
- sinalizar quando uma demanda não tem componente correspondente no DS.

O `ds-skill` é distribuído como plugin do Claude Code. O plugin leva junto uma cópia do conhecimento (`knowledge/`), gerada por script a partir do `ds-learning` e das `spec.md` do `ds-core`. Assim a skill funciona no projeto consumidor sem acesso ao repositório do ds-aurea. Detalhes em [docs/DISTRIBUTION.md](docs/DISTRIBUTION.md).

Fluxo dentro de um projeto consumidor:

```txt
Projeto recebe uma task
  ↓
Skill valida contexto do projeto
  ↓
Skill consulta o conhecimento do DS (cópia do ds-learning + specs)
  ↓
Skill usa componentes do ds-core
  ↓
IA implementa ou orienta a implementação
  ↓
Dev revisa
```

Resultado para a empresa:

- IA trabalhando com governança;
- menos uso incorreto do Design System;
- entregas mais consistentes entre projetos;
- apoio direto ao desenvolvimento sem depender de Storybook.

---

## Playground

O Playground substitui o Storybook no MVP.

Ele responde:

```txt
Como verificar rapidamente componentes, tokens, variações e estados?
```

Ele pode ser dividido por plataforma:

```txt
playground/
  web/
    ButtonPlayground.tsx
    InputPlayground.tsx

  mobile/
    ButtonPlayground.tsx
    InputPlayground.tsx
```

O Playground deve permitir testar:

- componente;
- variante;
- tamanho;
- estado;
- tema;
- tokens aplicados;
- exemplos de composição.

Resultado para a empresa:

- validação visual rápida;
- menos dependência de ferramentas externas no MVP;
- facilidade para demonstrar o Design System;
- base futura para documentação visual mais completa.

---

## Evolução Futura: UI Contract

O UI Contract não precisa ser implementado no primeiro momento.

Ele entra como evolução futura, quando o DS-Aurea deixar de ser apenas uma camada de orientação e passar a apoiar geração estruturada de interface.

O UI Contract representa a intenção da tela.

Ele responde:

```txt
O que essa tela precisa fazer?
```

Exemplo:

```json
{
  "screen": "Login",
  "intent": "authentication",
  "fields": [
    {
      "name": "email",
      "type": "email",
      "required": true
    },
    {
      "name": "password",
      "type": "password",
      "required": true
    }
  ],
  "actions": [
    {
      "type": "submit",
      "label": "Entrar"
    }
  ]
}
```

O Contract não define se será usado um `TextInput`, `PasswordInput`, `FormLayout` ou `Button`. Ele descreve a necessidade funcional.

Resultado futuro para a empresa:

- transformar requisitos em estruturas padronizadas;
- reduzir ambiguidade entre produto, design e desenvolvimento;
- preparar a geração automática de telas.

---

## Evolução Futura: UI Spec

A UI Spec também entra como evolução futura.

Ela representa a composição da tela usando componentes do Design System.

Ela responde:

```txt
Como essa tela será montada usando componentes oficiais?
```

Exemplo:

```json
{
  "screen": "Login",
  "layout": {
    "component": "FormLayout",
    "children": [
      {
        "component": "TextInput",
        "props": {
          "name": "email",
          "label": "E-mail",
          "type": "email",
          "required": true
        }
      },
      {
        "component": "TextInput",
        "props": {
          "name": "password",
          "label": "Senha",
          "type": "password",
          "required": true
        }
      },
      {
        "component": "Button",
        "props": {
          "label": "Entrar",
          "variant": "primary"
        }
      }
    ]
  }
}
```

A UI Spec deve ser validada contra o Component Catalog para garantir que a interface usa apenas componentes e propriedades permitidas.

Resultado futuro para a empresa:

- validar se uma tela usa apenas componentes oficiais;
- preparar geração de código;
- criar uma ponte entre intenção funcional e implementação visual.

---

## Documentação em Markdown

A documentação em Markdown tem duas funções:

- orientar pessoas do time;
- fornecer contexto para a IA futuramente.

Ela não substitui o Contract nem a Spec.

Diferença entre os formatos:

```txt
.md
  explica regras, contexto e boas práticas

.contract.json
  descreve a intenção funcional da tela

.spec.json
  descreve a montagem da tela com componentes do DS

componentCatalog.ts
  define quais componentes existem e como podem ser usados
```

Exemplo de documentação de componente:

```md
# Button

Use o Button para ações explícitas do usuário.

## Variantes

- primary: ação principal da tela
- secondary: ação alternativa
- ghost: ação discreta

## Regras

- Use apenas uma ação primary principal por seção.
- Não use Button para navegação textual simples.
- Em estado loading, o botão não deve permitir novo clique.
```

---

## Uso nos Projetos Consumidores

O DS-Aurea deve ser pensado para apoiar projetos paralelos da Aurea.

Exemplo:

```txt
Projeto DS-Aurea
  contém ds-core, ds-learning, ds-skill e Playground

Projeto Produto A
  instala o plugin ds-skill
  usa componentes web ou mobile do ds-core
  segue as regras do ds-learning (que chegam junto com a skill)

Projeto Produto B
  instala o plugin ds-skill
  usa os mesmos componentes do ds-core
  mantém a mesma base visual
```

No projeto consumidor, a configuração é feita uma vez:

```txt
npm install @aurea/ds-core                       código dos componentes

/plugin marketplace add <git-url-do-ds-aurea>    skill + conhecimento
/plugin install aurea-ds@aurea
```

O DS-Aurea seria responsável por:

- identificar o tipo de projeto;
- consultar as regras de uso do Design System;
- orientar a implementação;
- validar se os componentes e tokens usados pertencem ao ds-core;
- apontar exceções ou lacunas quando necessário.

---

## Roadmap

### Etapa 1: Mapear Componentes Web e Mobile

Levantar quais componentes já existem em web e mobile, quais tokens usam, quais variações possuem e quais estados precisam ser suportados.

Entrega:

- inventário de componentes web;
- inventário de componentes mobile;
- lista de tokens por plataforma;
- identificação de componentes compartilhados e específicos.

Resultado para a empresa:

- clareza sobre o que já existe;
- redução de duplicação;
- base inicial para organizar o Design System por plataforma.

---

### Etapa 2: Organizar o ds-core

Criar o `ds-core` com separação entre `shared`, `web` e `mobile`.

Entrega:

- estrutura inicial do ds-core;
- componentes web organizados;
- componentes mobile organizados;
- tokens compartilhados;
- tokens específicos por plataforma.

Resultado para a empresa:

- base técnica reutilizável;
- padronização entre projetos;
- separação clara entre web e mobile.

---

### Etapa 3: Criar Catálogos de Componentes

Criar catálogos estruturados para web e mobile, informando quais componentes existem, quais propriedades aceitam e quais variações possuem.

Entrega:

- `webComponentCatalog.ts`;
- `mobileComponentCatalog.ts`;
- definição de props permitidas;
- mapeamento de variações e estados.

Resultado para a empresa:

- o Design System passa a ser consumível por sistemas;
- a IA consegue saber o que pode ou não pode usar;
- menor risco de uso incorreto dos componentes.

---

### Etapa 4: Criar o ds-learning

Criar a documentação em Markdown com princípios, padrões, regras de interação, acessibilidade e decisões de design.

Entrega:

- documentação global;
- documentação por componente, para mobile e web;
- decisões registradas;
- exemplos de uso e exceções.

Resultado para a empresa:

- conhecimento centralizado;
- menos dependência de decisões informais;
- base textual para orientar pessoas e IA.

---

### Etapa 5: Criar o ds-skill

Criar a skill que orienta a IA a trabalhar dentro dos projetos seguindo o ds-core e o ds-learning.

Entrega:

- `SKILL.md`;
- regras de uso do DS;
- instruções de validação do projeto;
- exemplos de comportamento esperado da IA;
- manifestos do plugin (`plugin.json` e `marketplace.json`);
- script que gera o `knowledge/` a partir do `ds-learning` e das `spec.md`.

Resultado para a empresa:

- IA com comportamento mais previsível;
- menos implementações fora do padrão;
- apoio direto ao desenvolvimento nos projetos consumidores.

---

### Etapa 6: Criar o Playground

Criar um Playground para visualizar componentes, tokens, estados e variações de web e mobile.

Entrega:

- Playground web;
- Playground mobile;
- exemplos de componentes;
- controles para testar variações e estados.

Resultado para a empresa:

- validação rápida por design, desenvolvimento e produto;
- substituição inicial do Storybook no MVP;
- facilidade para revisar componentes sem montar telas reais.

---

### Etapa 7: Conectar em um Projeto Piloto

Usar o DS-Aurea em um projeto real ou projeto de teste para validar o fluxo.

Entrega:

- projeto consumidor usando ds-core;
- skill conectada ao contexto do projeto;
- validação de uma task real;
- ajustes no ds-learning a partir do uso.

Resultado para a empresa:

- comprovação prática do modelo;
- identificação de lacunas no Design System;
- redução de risco antes de escalar para outros produtos.

---

### Etapa 8: Escalar para Outros Projetos

Replicar o uso do DS-Aurea em outros projetos da empresa.

Entrega:

- `@aurea/ds-core` e o plugin `ds-skill` instalados em cada projeto;
- lacunas encontradas em cada projeto registradas no ds-learning;
- expansão do uso do ds-core e ds-learning.

Resultado para a empresa:

- maior consistência entre produtos;
- reaproveitamento de componentes e decisões;
- governança mais forte do Design System.

---

### Etapa 9: Evoluir para UI Contract e UI Spec

Depois da base estar validada, criar artefatos estruturados para representar intenção e composição de telas.

Entrega:

- primeiros UI Contracts;
- primeiras UI Specs;
- validação contra os catálogos de componentes.

Resultado para a empresa:

- preparação para automação mais avançada;
- menor ambiguidade na criação de telas;
- ponte entre documentação, DS e implementação.

---

### Etapa 10: Evoluir para Geração Assistida

Adicionar geração assistida por IA e, futuramente, geração de código a partir de UI Specs.

Entrega:

- geração assistida de UI Contract;
- geração assistida de UI Spec;
- geração inicial de código;
- validações automatizadas.

Resultado para a empresa:

- mais velocidade na criação de interfaces;
- menor retrabalho;
- IA trabalhando dentro dos limites do Design System.

---

## Resumo do Fluxo

```txt
Mapear componentes web/mobile
  ↓
Organizar ds-core
  ↓
Criar catálogos web/mobile
  ↓
Criar ds-learning
  ↓
Criar ds-skill
  ↓
Criar Playground
  ↓
Conectar em projeto piloto
  ↓
Escalar para outros projetos
  ↓
Evoluir para UI Contract e UI Spec
  ↓
Evoluir para geração assistida
```

---

## Resultado Esperado

Ao final da primeira entrega, o DS-Aurea deve permitir que projetos da Aurea usem componentes web e mobile do Design System de forma mais consistente, com apoio de documentação estruturada, Playground e orientação para IA.

Ao final da evolução, o DS-Aurea também poderá apoiar a transformação de documentação funcional em interfaces padronizadas, usando UI Contract, UI Spec e geração assistida.

Para a empresa, isso proporciona:

- mais velocidade na criação de telas;
- menos retrabalho entre design e desenvolvimento;
- maior consistência entre produtos;
- melhor governança do Design System;
- redução de componentes duplicados;
- base preparada para automação com IA;
- possibilidade de escalar padrões para diferentes projetos e plataformas;
- uso separado e organizado de web e mobile dentro do mesmo ecossistema.
