---
title: Serviço de Nomes
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Serviço de Nomes
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Serviço de Nomes
  - - meta
    - name: description
      content: O registro de nomes armazena informações sobre o nome de domínio. Saiba mais sobre a resolução de domínios SOL, busca reversa/subdomínio, mais sobre o serviço de nomes e referências no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: O registro de nomes armazena informações sobre o nome de domínio. Saiba mais sobre a resolução de domínios SOL, busca reversa/subdomínio, mais sobre o serviço de nomes e referências no Livro de Receitas da Solana.
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

# Serviço de Nomes

## Registro de Nomes

O registro de nomes armazena informações sobre o nome de domínio. Ele é composto por duas partes:

- O cabeçalho (Header)
- Os dados (Data)

Os dados para um nome de domínio sempre têm o cabeçalho como prefixo. Abaixo está a estrutura do cabeçalho em JS:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/schema/schema.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/schema/schema.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Resolvendo domínios SOL

Os domínios .SOL são nomes de domínio exclusivos e amigáveis ​​para humanos que se convertem em chaves públicas. Muitas carteiras usam isso como outra opção para enviar tokens ou SOL. Você pode converter os domínios .SOL em sua chave pública com o seguinte:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Busca Reversa

Isso pode ser usado para encontrar o nome de domínio a partir de sua chave pública.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Busca do Subdomínio

Para encontrar um subdomínio, você precisa:

1. Obter a chave do domínio-pai
2. Obter a chave do subdomínio
3. Recuperar as informações da conta

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Encontrar todos os nomes de domínio de propriedade de uma chave pública

Você pode recuperar todos os nomes de domínio de uma carteira fazendo uma solicitação `getProgramAccounts` com um filtro `memcmp`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/find-for-owner/find-for-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/find-for-owner/find-for-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Resolver um identificador do Twitter

Os identificadores do Twitter podem ser [registrados no serviço de nomes da Solana](https://naming.bonfida.org/#/twitter-registration) e ser usados ​​como nomes de domínio .SOL.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Busca reversa de um identificador do Twitter

Para encontrar o endereço SOL associado a um identificador do Twitter, você pode fazer uma busca reversa.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
