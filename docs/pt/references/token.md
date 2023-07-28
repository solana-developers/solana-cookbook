---
title: Interagindo com Tokens
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Interagindo com Tokens
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Interagindo com Tokens
  - - meta
    - name: description
      content: Aprenda como usar, transferir e fazer mais coisas com tokens na Solana
  - - meta
    - name: og:description
      content: Aprenda como usar, transferir e fazer mais coisas com tokens na Solana
  - - meta
    - name: og:image
      content: https://solanacookbook.com/cookbook-sharing-card.png
  - - meta
    - name: og:image:alt
      content: Solana splash card
  - - meta
    - name: twitter:card
      content: summary
  - - meta
    - name: twitter:site
      content: "@solanacookbook"
  - - meta
    - name: twitter:image
      content: "https://solanacookbook.com/cookbook-sharing-card.png"
  - - meta
    - name: robots
      content: index,follow,noodp
  - - meta
    - name: googlebot
      content: index,follow
footer: MIT Licensed
---

# Tokens

## O que eu preciso para começar com Tokens SPL?

Toda vez que você interage com tokens na Solana, na verdade está interagindo com o padrão de Token SPL (SPL-Token, ou Solana Program Library Token). O padrão de Token SPL requer o uso de uma biblioteca específica, que você pode encontrar abaixo com base na sua linguagem.

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## Como criar um novo Token

A criação de tokens é feita através da criação do que é chamado de "conta de cunhagem" (mint account). Essa conta de cunhagem é usada posteriormente para cunhar tokens para a conta de tokens do usuário.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como obter uma conta de cunhagem de tokens

Para obter a oferta atual, a autoridade ou as casas decimais que um token tem, você precisará obter as informações da conta para a cunhagem do token.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como criar uma conta de token

Uma conta de token é necessária para que um usuário possa guardar os tokens.

Um usuário terá pelo menos uma conta de token para cada tipo de token que possuir.

Contas de Token Associadas (ATA) são contas criadas de forma determinística para cada par de chaves. As ATAs são o método recomendado para gerenciar contas de tokens.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como obter uma conta de token

Cada conta de token possui informações sobre o token, como o proprietário, cunhagem, quantidade (saldo) e casas decimais.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como obter o saldo de uma conta de token

A conta de token tem o saldo do token, que pode ser obtido com uma única chamada.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: tip
Uma conta de token só pode conter um tipo de item cunhado. Quando você especifica uma conta de token, também especifica a cunhagem. 
:::

## Como cunhar novos tokens

Quando você cunha novos tokens, aumenta a oferta e transfere os novos tokens para uma conta de token específica.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como transferir tokens

Você pode transferir tokens de uma conta de token para outra conta de token.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como queimar tokens

Você pode queimar tokens se você for o proprietário do token.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como encerrar contas de token

Você pode encerrar uma conta de token se não quiser mais usá-la. Existem duas situações:

1. Wrapped SOL - O encerramento converte SOL encapsulado em SOL;
2. Outros Tokens - Você só pode fazer o encerramento se o saldo da conta de token for 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como definir autoridade em contas ou cunhagem de token

Você pode definir/atualizar a autoridade. Existem 4 tipos:

1. MintTokens (conta de cunhagem)
2. FreezeAccount (conta de cunhagem)
3. AccountOwner (conta de token)
4. CloseAccount (conta de token)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como aprovar um delegado de token

Você pode definir um delegado com uma quantidade permitida. Após a configuração, o delegado é como outro proprietário da sua conta de token. **Uma conta de token só pode delegar para uma conta de cada vez**.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como revogar um delegado de token

Revogar definirá o delegado como nulo e a quantidade delegada como 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como gerenciar o SOL encapsulado

O SOL encapsulado é como qualquer outro token cunhado. A diferença é o uso de `syncNative` e a criação de contas de token especificamente no endereço `NATIVE_MINT`.

### Criar conta de token

Da mesma forma que [Criar conta de token](#create-token-account) mas substitua `MINT` por `NATIVE_MINT`.

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Adicionar saldo

Existem duas maneiras de adicionar saldo para o SOL encapsulado:

#### 1. Por transferência de SOL

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. Por transferência de token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como obter todas as contas de token pelo proprietário

Você pode buscar contas de token pelo proprietário. Existem duas maneiras de fazer isso.

1. Obter todas as contas de token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. Filtrar por cunhagem

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
