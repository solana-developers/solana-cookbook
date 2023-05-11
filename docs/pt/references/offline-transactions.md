---
title: Enviando Transações Offline
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Enviando Transações Offline
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Enviando Transações Offline
  - - meta
    - name: description
      content: Após assinar a Transação Offline, qualquer pessoa pode transmiti-la na rede. Saiba mais sobre o envio de Transações Offline e referências no Livro de Receitas da Solana.
  - - meta
    - name: og:description
      content: Após assinar a Transação Offline, qualquer pessoa pode transmiti-la na rede. Saiba mais sobre o envio de Transações Offline e referências no Livro de Receitas da Solana.
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

# Transações Offline

## Assinatura de Transação

Para criar uma transação offline, você precisa assinar a transação e, em seguida, qualquer pessoa pode transmiti-la na rede.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/sign-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Assinatura Parcial de Transação

Quando uma transação requer múltiplas assinaturas, você pode assiná-la parcialmente. Os outros signatários podem então assinar e transmiti-la na rede.

Alguns exemplos de quando isso é útil:

- Ao enviar um token SPL em troca de pagamento;
- Ao assinar uma transação para que você possa verificar posteriormente sua autenticidade;
- Ao chamar programas personalizados em uma transação que requerem sua assinatura.

Neste exemplo, Bob envia um token SPL para Alice em troca de seu pagamento:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/partial-sign/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/partial-sign/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Nonce Durável

`RecentBlockhash` é um valor importante para uma transação. Sua transação será rejeitada se você usar um hash de bloco recente expirado (após 150 blocos). Você pode usar um nonce durável (`durable nonce`) para obter um hash de bloco recente nunca expirado. Para acionar esse mecanismo, sua transação deve:

1. usar um `nonce` armazenado em `nonce account` como um hash de bloco recente;
2. colocar a operação `nonce advance` na primeira instrução.

### Criar Conta de Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Obter Conta de Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Usar Conta de Nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
