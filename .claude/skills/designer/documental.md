# skill:documental

Primeira parada de qualquer pedido de componente. Decide **o quê** vai ser construído antes de qualquer token ou linha de código, e inicia a documentação de uso do componente.

---

## Quando usar

Sempre, no início de qualquer pedido de componente novo ou alteração de um existente. Nunca pule direto para tokens ou código.

## Como avaliar

### 0. Formulário de entendimento

Antes de buscar qualquer coisa, entenda o **objetivo** do componente. Monte o formulário abaixo, **pré-preencha com o que já veio no pedido** (texto e imagem) e pergunte ao Operador só o que ficou em aberto — numa única mensagem, não uma pergunta por vez. "Não sei" é resposta válida em tudo que não for obrigatório.

```
FORMULÁRIO — <nome provisório do componente>

A. Objetivo
 1. [obrigatório] Que problema o usuário resolve com isso?
    (descreva a situação, não a peça — "o usuário precisa confirmar que quer excluir", não "preciso de um modal vermelho")
 2. [obrigatório] Qual a função principal?
    ( ) exibir informação  ( ) capturar entrada  ( ) disparar ação
    ( ) navegar            ( ) dar feedback/status  ( ) agrupar/estruturar conteúdo
 3. Onde ele já é (ou vai ser) usado hoje? Tela ou fluxo — só como referência.

B. Comportamento
 4. O que vai dentro? (texto, ícone, imagem, contador, outro componente…) — o conteúdo varia de tamanho?
 5. É interativo? O que acontece ao tocar/clicar?
 6. Quais estados precisa ter? (ex: vazio, carregando, erro, desabilitado, selecionado)

C. Pistas de reuso
 7. Parece com algo que já existe hoje? Qual tela / nome?
 8. Se sim, por que o que existe não serve?
 9. Referência visual (imagem, Figma, print) — opcional.

D. Escopo
10. Plataforma: ( ) mobile + web (padrão)  ( ) só mobile  ( ) só web
```

Regras:

- Não avance para o passo 1 sem as obrigatórias (1 e 2) respondidas.
- Não reescreva a resposta do Operador com outras palavras antes de usar: o objetivo dele é a fonte do "O que é" e do "Quando usar" no `.md`.

### 1. Já existe algo que resolve isso?

Use as respostas do formulário para orientar a busca:

- **Função (2)** → por onde começar no inventário: exibir/feedback costuma estar em atoms e molecules; capturar entrada em `forms/` e `selects/`; agrupar/estruturar em organisms e templates; disparar ação de confirmação em `dialogs/`.
- **Pistas (7)** → nomes e telas para procurar direto no código, antes de varrer categorias.
- **Por que não serve (8)** → se o motivo é "falta uma variação" ou "o texto/ícone é outro", é forte candidato a variante (passo 2), não componente novo.

Busque nos dois lados antes de decidir que é novo:

- **Mobile:** `ds-core/mobile/components/`, e o que ainda não foi portado em `docs/mobile/inventario-helios-app.md` (inventário do `helios-app` — artefato de migração da Etapa 1, não é doc de uso do DS, fica em `docs/` e não em `ds-learning/`).
- **Web:** `ds-core/web/` (hoje vazio) e `~/Documents/uranus-web-portal-core/src/lib/` + `src/components/` — a base de referência web. **Não existe ainda um inventário equivalente ao de mobile para esse projeto.** Se o pedido envolve web e você precisar varrer o que já existe lá, sinalize que falta um `docs/web/inventario-uranus-web-portal-core.md` e sugira criá-lo (mesmo formato do inventário mobile) antes de prosseguir — não invente que não existe nada só porque não há inventário escrito.

### 2. É componente novo ou variante de um existente?

Regra: se o pedido pode ser resolvido com uma prop/variant nova em um componente que já existe, **sem quebrar o contrato atual**, é variante — não duplique componente. Só é componente novo quando a responsabilidade/semântica é genuinamente diferente.

Se for variante: identifique exatamente qual prop muda e quais estados ela introduz.

### 3. Escrever/atualizar o `.md` em `ds-learning`

Cada componente tem **um `.md` de uso por plataforma** em `ds-learning`, com o que o `designer` define: o uso (este passo) e os tokens (`visual`, logo depois). A parte técnica (props, exemplos de código) não entra aqui — fica na `spec.md` que o `dev` escreve dentro da pasta do componente em `ds-core`. A estrutura de `ds-learning` tem três pastas de primeiro nível:

- `ds-learning/component-mobile/<Nome>.md` — doc do componente mobile
- `ds-learning/component-web/<Nome>.md` — doc do componente web
- `ds-learning/global/` — conhecimento compartilhado entre as duas plataformas (princípios, fundação visual, decisões) — não é por componente

Um componente pedido pra mobile e web (o padrão, ver comando `/ds-designer`) gera **dois arquivos**, um em cada pasta de plataforma — não um arquivo só compartilhado, porque o uso pode divergir entre plataformas. Cada um cobre:

- **O que é** — descrição de uma linha.
- **Quando usar** / **quando não usar**.
- **Onde é usado** — lista das telas/fluxos que usam o componente hoje, só como direcionamento (vem da pergunta 3 do formulário). O componente é da lib, não de um produto: qualquer produto pode usar, e essa lista não restringe nem define variação por produto.
- **Variantes e estados esperados**, em linguagem de uso (não de código). O `visual` completa este mesmo arquivo com a seção de tokens; as props ficam na `spec.md` do `dev`, não aqui.

Token não é papel do documental: não crie seção de tokens nem sugira token aqui.

Se for variante de componente existente: edite o(s) `.md` já existente(s), não crie arquivo novo.
Se, ao escrever, perceber que o conteúdo vale pras duas plataformas igualmente (ex: uma regra de quando usar Chip vs Badge, não específica de mobile ou web) — isso é candidato a `ds-learning/global/`, não a um dos dois arquivos de componente.

### 4. Apresentar para confirmação

Mostre o resultado (existe/não existe, novo/variante, rascunho do `.md`) e aguarde confirmação do Operador antes de passar para `visual`.

## Nunca

- Nunca declare "componente novo" sem ter checado os dois inventários (ou sinalizado a falta do inventário web).

## Encadeamento

Depois de confirmado → `skill:visual`.
