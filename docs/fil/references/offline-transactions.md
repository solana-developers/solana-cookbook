---
title: Sending Offline Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Sending Offline Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Sending Offline Transactions
  - - meta
    - name: description
      content: After signing the Offline Transaction, anyone can broadcast it on the network. Learn more about Sending Offline Transactions and references at The Solana cookbook.
  - - meta
    - name: og:description
      content: After signing the Offline Transaction, anyone can broadcast it on the network. Learn more about Sending Offline Transactions and references at The Solana cookbook.
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

# Offline na Transaksyon

## Mag-sign Transaksyon

Upang lumikha ng isang offline na transaksyon, kailangan mong lagdaan ang transaksyon at pagkatapos
kahit sino ay maaaring i-broadcast ito sa network.

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

## Bahagyang Sign Transaksyon

Kapag ang isang transaksyon ay nangangailangan ng maraming lagda, maaari mo itong bahagyang lagdaan.
Ang iba pang mga pumirma ay maaaring pumirma at mai-broadcast ito sa network.

Ilang halimbawa kung kailan ito kapaki-pakinabang:

- Magpadala ng token ng SPL bilang kapalit ng pagbabayad
- Pumirma ng isang transaksyon upang ma-verify mo ang pagiging tunay nito
- Tumawag sa mga pasadyang programa sa isang transaksyon na nangangailangan ng iyong lagda

Sa halimbawang ito, pinadalhan ni Bob si Alice ng isang token ng SPL bilang kapalit sa kanyang pagbabayad:

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

## Matibay Nonce

Ang `RecentBlockhash` ay isang mahalagang halaga para sa isang transaksyon. Tatanggihan ang iyong transaksyon kung gumamit ka ng nag-expire kamakailang blockhash (pagkatapos ng 150 block). Maaari mong gamitin ang `durable nonce` para makakuha ng hindi nag-expire kamakailang blockhash. Upang ma-trigger ang mekanismong ito, dapat ang iyong transaksyon

1. gumamit ng `nonce` na naka-store sa `nonce account` bilang kamakailang blockhash
2. ilagay ang `nonce advance` na operasyon sa unang pagtuturo

### Lumikha ng Nonce Account

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

### Kumuha ng Nonce Account

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

### Gumamit ng Nonce Account

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
