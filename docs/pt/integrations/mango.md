---
title: Mango Markets
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Construindo com o Mango Markets
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Construindo com o Mango Markets
  - - meta
    - name: description
      content: Mango Markets oferece o padrão da indústria para negociação descentralizada com margem cruzada. Aprenda a usar e construir com o Mango Markets.
  - - meta
    - name: og:description
      content: Mango Markets oferece o padrão da indústria para negociação descentralizada com margem cruzada. Aprenda a usar e construir com o Mango Markets.
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
---

# Mango Markets

O Mango fornece um único local para emprestar, pegar emprestado, trocar e alavancar criptoativos por meio de um mecanismo de risco na cadeia. Você pode se conectar ao programa na cadeia do Mango usando as bibliotecas de API do Cliente. Você também precisará da biblioteca de API JavaScript da Solana.

<CodeGroup>
  <CodeGroupItem title="TS" active>
  
```
"@blockworks-foundation/mango-client": "^3.3.27",
"@solana/web3.js": "^1.37.0"
```
  </CodeGroupItem>
</CodeGroup>

## Como obter um Grupo Mango

Um grupo Mango é uma cesta de tokens com margem cruzada, que contém informações abrangentes do mercado sobre tokens, mercados da DEX Serum, mercados perpétuos, oráculos, fundo de seguro e cofres de taxas. Cada versão do Mango Markets usa um Grupo Mango diferente contendo diferentes tokens. O grupo atual da versão 3 é o `mainnet.1`. Aqui está uma tabela mostrando os vários grupos:


| Grupo                | Versão     | Cluster   |
|----------------------|-------------|------------------|
| mainnet.1            | v3          | mainnet          |
| devnet.2             | v3          | devnet           |
| devnet.3             | v3          | devnet           | 
| BTC_ETH_SOL_SRM_USDC | v2          | mainnet & devnet |
| BTC_ETH_USDT         | v2          | devnet           |
| BTC_ETH_USDC         | v2          | testnet          |


:::tip Observação
Se você deseja usar os grupos v2, precisará usar a biblioteca de cliente v2. Você pode encontrá-la [aqui](https://github.com/blockworks-foundation/mango-client-ts).
:::


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-group/load-group.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-group/load-group.preview.en.ts)

  </template>
  
  </SolanaCodeGroupItem>
  
</SolanaCodeGroup>

## Como criar uma conta Mango

Uma conta Mango está associada a um Grupo Mango. Ela mantém seus tokens e permite que você negocie os mercados desse Grupo. Você pode encontrar a referência [aqui](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#createMangoAccount).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
  
  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Anchor">

  <template v-slot:default>

@[code](@/code/mango/create-account/create-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/create-account/create-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como depositar USDC em uma conta Mango

Depois de criar uma conta Mango, você precisará adicionar tokens a ela para efetuar negociações. Você pode encontrar a referência para o método de depósito [aqui](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#deposit).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/deposit/deposit.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/deposit/deposit.preview.en.ts)  

  </template>
  
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como efetuar uma ordem spot

O Mango interage com o Protocolo Serum para efetuar ordens spot em mercados. Você pode efetuar uma ordem spot fazendo isso. Você pode encontrar a referência para a função `placeSpotOrder` [aqui](https://blockworks-foundation.github.io/mango-client-v3/classes/MangoClient.html#placeSpotOrder). O Mango tem um arquivo de configuração que contém informações sobre grupos, mercados, tokens e oráculos, e você pode encontrá-lo [aqui](https://github.com/blockworks-foundation/mango-client-v3/blob/main/src/ids.json). Usamos informações desse arquivo para encontrar o grupo e o mercado corretos.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>
    
  <template v-slot:default>

@[code](@/code/mango/place-spot-order/place-spot-order.en.ts) 

  </template>

  <template v-slot:preview>

@[code](@/code/mango/place-spot-order/place-spot-order.preview.en.ts)

  </template>
 
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como carregar lances

O Mango usa as informações do mercado do Protocolo Serum para carregar lances. Você pode carregá-los diretamente do Serum para trabalhar com o Mango. Você pode saber mais sobre os mercados do Serum [aqui](https://github.com/project-serum/serum-ts/tree/master/packages/serum).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-bids/load-bids.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-bids/load-bids.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Como carregar ofertas

O Mango usa as informações de mercado do Protocolo Serum para carregar ofertas. Você pode carregá-las diretamente do Serum para trabalhar com o Mango. Você pode saber mais sobre os mercados do Serum [aqui](https://github.com/project-serum/serum-ts/tree/master/packages/serum).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/mango/load-asks/load-asks.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/mango/load-asks/load-asks.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Outros recursos

- [Bibliotecas de cliente](https://docs.mango.markets/development-resources/client-libraries)
- [Documentação do Mango](https://docs.mango.markets)
- [Introdução técnica](https://mango-markets.notion.site/Technical-Intro-to-Mango-Markets-15a650e4799e41c8bfc043fbf079e6f9)
