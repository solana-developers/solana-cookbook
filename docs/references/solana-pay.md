---
title: Solana Pay
head:
  - - meta
    - name: title
      content: Solana Cookbook | Solana Pay
  - - meta
    - name: og:title
      content: Solana Cookbook | Solana Pay
  - - meta
    - name: description
      content: Learn how to use Solana Pay
  - - meta
    - name: og:description
      content: Learn to use Solana pay to accept payment's in SOL and SPL tokens.
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

**@solana/pay** is a JavaScript library for facilitating commerce on Solana by using a token transfer URL scheme. The URL scheme ensures that no matter the wallet or service used, the payment request must be created and interpreted in one standard way. Know more about the Solana Pay Specifications [here](https://docs.solanapay.com/spec)

## How to receive payments with Solana pay

To start getting payments using Solana pay you need to have a native SOL address. This address is going to be the merchant address which is going to get funded whenever a user pays using solana pay.

Let's Look into how you can integrate Solana Pay in your Application and start accepting SOL.

### Creating a SOL Payment request

To create a SOL payment request, we first generate a QR code with a payment request URI.

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

To create a SPL token payment request, we first generate a QR code with a payment request URI.

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

## Other Resources

[website](https://solanapay.com/)
[docs](https://docs.solanapay.com/)
[github](https://github.com/solana-labs/solana-pay)
[point-of-sale-demo](https://solana-labs.github.io/solana-pay/app/new?recipient=GvHeR432g7MjN9uKyX3Dzg66TqwrEWgANLnnFZXMeyyj&label=Solana+Pay)
