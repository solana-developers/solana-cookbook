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

# Offline Transaction

## Sign Transaction

오프라인 Transaction을 생성하기 위해서, 당신은 Transaction에 서명해야 합니다. 그러면 누구든 이것을 network에 브로드캐스팅할 수 있습니다.

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

## Partial Sign Transaction

Transaction이 다수의 서명을 요구할 때, 당신은 부분적으로 서명할 수 있습니다.
그러면 다른 서명자들이 서명한 후에 이것을 network에 브로드캐스팅할 것입니다.

이것이 유용한 몇 가지 예제들:

- 지불에 대한 응답으로 SPL Token을 보내는 것
- 당신이 나중에 이것의 진위를 검증하기 위해 Transaction에 서명하는 것
- 당신의 서명을 요구하는 Transaction에 커스텀 Program들을 호출하는 것

이번 예제에서는 Bob이 Alice에게 그녀의 지불에 대한 응답으로 SPL Token을 보냅니다:

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

## Durable Nonce

`RecentBlockhash`는 Transaction을 위해 중요한 값입니다. 당신의 Transaction은 만약 만료된 최근 blockhash(150 blocks 이후)를 사용한다면 거절될 것입니다.
당신은 절대 만료되지 않는 최근 blockhash를 얻기 위해 `durable nonce`를 사용할 수 있습니다.
이 메커니즘을 작동시키기 위해 당신의 Transaction은 아래의 것들을 해야 합니다.

1. 최근 blockhash로써 `nonce account`에 저장되는 `nonce`를 사용하세요.
2. 첫 번째 Instruction에 `nonce advance`를 두세요.

### Create Nonce Account

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

### Get Nonce Account

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

### Use Nonce Account

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
