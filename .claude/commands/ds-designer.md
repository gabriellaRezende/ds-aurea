# Agente DS Designer — DS-Aurea

Você orquestra a esteira de criação de componentes do Design System da Aurea. Quando invocado via `/ds-designer`, siga este protocolo.

```
Operador → skill:designer (documental → visual) → skill:dev (desenvolvedor → curador) → Entrega final
```

---

## 0. Detectar o modo de invocação

**Se `$ARGUMENTS` estiver vazio:**
Responda exatamente com:

> ds-designer ativo. Qual componente ou pedido? (pode anexar uma imagem de referência, se tiver)

Pare aqui. Não leia nenhum arquivo, não execute nenhuma skill. Aguarde a instrução do usuário na próxima mensagem.

**Se `$ARGUMENTS` contiver uma instrução:**
Você é o **Operador** entregando a solicitação. Continue para os passos abaixo.

---

## 1. Ler a solicitação

- Se veio uma imagem junto, trate como referência visual/funcional — não como fonte de verdade de token. Ela ajuda o `visual` a entender intenção, mas cor/spacing/radius finais sempre vêm de `ds-core/shared/tokens` e `ds-core/shared/themes`, nunca extraídos direto de pixel da imagem.
- Identifique a plataforma alvo: mobile, web, ou ambas. **Por padrão, um componente novo nasce em mobile e web juntos** — só trate como single-platform se o Operador disser isso explicitamente (ex: "só pro app", "só web").

## 2. skill:designer — sempre primeiro

Leia e execute, nesta ordem:

1. `.claude/skills/designer/documental.md` — confere se o componente já existe (ou se é variante de um existente) e escreve/atualiza o `.md` de regras em `ds-learning`.
2. `.claude/skills/designer/visual.md` — confere se os tokens necessários existem; cria a diretriz quando não existir.

Apresente o resultado (contrato + tokens) para confirmação do Operador antes de passar para o dev.

## 3. skill:dev — depois do designer aprovado

Leia e execute, nesta ordem:

1. `.claude/skills/dev/desenvolvedor.md` — implementa o componente (mobile e/ou web, conforme decidido no passo 1) a partir do que o designer definiu.
2. `.claude/skills/dev/curador.md` — audita o que foi entregue.

Se o curador **bloquear**: volte para `desenvolvedor.md` só com as correções apontadas, e rode `curador.md` de novo. Repita até aprovar.

## 4. Confirmação antes de escrever

Para qualquer criação/edição de arquivo (componente, doc, token, playground), mostre o plano ou o diff e aguarde confirmação — exceto se o usuário já autorizou execução autônoma nesta sessão.

## 5. Entrega final

Quando o curador aprovar (mobile e web, se ambos foram pedidos), resuma:

```
ENTREGA — <Nome do componente>

Plataformas: [mobile | web | mobile + web]
Documental: [.md criado/atualizado em ds-learning — caminho]
Visual: [tokens usados; tokens novos criados, se houver]
Dev: [arquivos criados/alterados]
Curador: APROVADO — [mobile: sim/não] [web: sim/não]

Próxima ação sugerida: [se ficou faltando algo, ex: itens de web marcados pelo curador como "não auditável ainda"]
```

## 6. Instrução recebida

$ARGUMENTS
