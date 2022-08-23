---
title: Name Service
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Name Service
  - - meta
    - name: og:title
      content: คู่มือ Solana | Name Service
  - - meta
    - name: description
      content: name registry จะมีไว้เก็บข้อมูลเกี่ยวกับ domain name เรียนรู้เกี่ยวกับ Resolving SOL domains, การ look up Reverse/Subdomain และอื่นๆ เกี่ยวกับ Name Service และข้อมูลอ้างอิงได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: name registry จะมีไว้เก็บข้อมูลเกี่ยวกับ domain name เรียนรู้เกี่ยวกับ Resolving SOL domains, การ look up Reverse/Subdomain และอื่นๆ เกี่ยวกับ Name Service และข้อมูลอ้างอิงได้ที่คู่มือ Solana.
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

# Name Service

## Name registry

name registry จะมีไว้เก็บข้อมูลเกี่ยวกับ domain name ซึ่งจะแบ่งเป็น 2 ส่วนคือ:

- The header
- The data

ข้อมูลของ domain name จะขึ้นต้นด้วย header ส่วนด้านล่างนี้คือ structure ของ header ใน JS:

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

## Resolving SOL domains

.SOL domains จะไม่ซ้ำ (unique), จดจำได้ง่าย (human-friendly) เป็น domain names
ที่ถูกเปลี่ยนเป็น public keys. หลายๆ wallets ใช้มันเป็นทางเลือกในการส่ง tokens หรือ SOL เราสามารถเปลี่ยน .SOL domains เป็น public keys ได้ตามนี้:

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

## Reverse look up

การทำ Reverse look up จะช่วยทำให้เราหา (resolve) domain name จาก public key ได้

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

## Subdomain look up

ในการ resolve ส่วน subdomain เราจะต้อง:

1. หา parent domain key
2. หา subdomain key
3. ดึงข้อมูล account info

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

## หาทุก domain names ที่ public key นี้เป็นเจ้าของ

เราสามารถดึงข้อมูลทุก domain names ของ wallet ใดๆ โดยใช้ `getProgramAccounts` และ `memcmp` filter

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

## Resolve a Twitter handle

Twitter handles สามารถจะ [ลงทะเบียนบน Solana name service](https://naming.bonfida.org/#/twitter-registration) ได้ และสามารถใช้เหมือน .SOL domain names ได้

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

## Reverse look up of a Twitter handle

ในการหา SOL address ที่ associated กับ Twitter handle เราสามารถทำการ reverse look up ได้

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
