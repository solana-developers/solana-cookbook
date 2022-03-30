---
title: Solana Pay
head:
  - - meta
    - name: title
      content: Solana Cookbook | Solana Pay Reference
  - - meta
    - name: og:title
      content: Solana Cookbook | Solana Pay Reference
  - - meta
    - name: description
      content: Learn how to use Solana Pay
  - - meta
    - name: og:description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
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

# Solana Pay

**@solana/pay** is a JavaScript library for facilitating commerce on Solana by using a token transfer URL scheme. The URL scheme ensures that no matter the wallet or service used, the payment request must be created and interpreted in one standard way.

## How to receive payments with Solana pay

To start getting payments using Solana pay you need to have a native SOL address. This address is going to be the merchant address which is going to get funded whenever a user pays using solana pay.

Let's Look into how you can integrate Solana Pay in your Application and start accepting SOL.

### Creating a SOL Payment request

In this Code-snippet we are going to look into how create a payment request URL and encode it into a QR Code

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/solana-pay/sol-payment/sol-payment.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/solana-pay/sol-payment/sol-payment.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Creating a SPL Token payment request

In this Code-snippet we are going to look into how create a payment request in which a User can transfer a token of a specific mint type accepted by the merchant.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/solana-pay/spl-payment/spl-payment.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/solana-pay/spl-payment/spl-payment.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
