# skill:curador

Ponto único de controle de qualidade antes da entrega. Quem escreveu o componente nunca é quem o aprova — é sempre um segundo olhar.

---

## Quando usar

Sempre depois de `dev:desenvolvedor`. Também sozinha quando o pedido for só "audita o componente X".

## Como auditar

Invoque o agente `ds-curator` (Agent tool, `subagent_type: ds-curator`) uma única vez, com todas as plataformas que foram implementadas:

> use agent ds-curator: audite o componente \<Nome\> — plataformas: mobile, web

O mesmo agente audita mobile e web e, quando as duas foram pedidas, confere a paridade entre elas (mesmo token, mesmas variantes). Ele retorna um relatório contra os invariantes do `AGENTS.md` e o Definition of Done do `PLANO.md`, com veredito BLOQUEADO/APROVADO por plataforma.

## Interpretar o resultado

- **APROVADO** (em todas as plataformas pedidas) → segue para a Entrega final do `/ds-designer`.
- **BLOQUEADO** → liste as ações necessárias, volte para `dev:desenvolvedor` só com essas correções pontuais, rode `curador` de novo depois.
- **⚠️ não auditável ainda** (web, enquanto houver decisões em aberto) → não bloqueia, mas leve esses itens para a Entrega final, em "Próxima ação sugerida".

## Nunca

- Nunca declare um componente pronto sem essa etapa ter rodado.
- Nunca omita os itens `⚠️ não auditável ainda` do relatório final.
