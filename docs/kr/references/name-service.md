---
title: Name Service
head:
  - - meta
    - name: title
      content: Solana Cookbook | Name Service
  - - meta
    - name: og:title
      content: Solana Cookbook | Name Service
  - - meta
    - name: description
      content: The name registry stores information about the domain name. Learn about Resolving SOL domains, Reverse/Subdomain look up, more about Name Service and references at The Solana cookbook.
  - - meta
    - name: og:description
      content: The name registry stores information about the domain name. Learn about Resolving SOL domains, Reverse, Subdomain look up, more about Name Service and references at The Solana cookbook.
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

Name registry는 도메인 이름에 대한 정보를 저장합니다. 이것은 두 가지로 구성되어 있습니다:

- The header
- The data

도메인 이름을 위한 데이터는 항상 header의 앞에 붙습니다. 아래는 JS코드로 header 구조체를 보여줍니다:

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

.SOL 도메인들은 유니크한 publicKey들로 전환되는 인간 친화적인 도메인 네임들입니다.
많은 지갑들이 이것들을 Token과 SOL을 보내기 위한 또 다른 옵션으로 사용합니다.
당신은 .SOL 도메인들을 아래와 같이 publicKey로 변환할 수 있습니다.

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

아래와 같이 public key로부터 도메인 이름을 알아내기 위해 사용될 수 있습니다.

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

서브 도메인을 알아내기 위해 당신이 필요한 것들:

1. 부모 도메인의 Key를 얻으세요.
2. 서브 도메인의 Key를 얻으세요.
3. Account 정보를 조회하세요.

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

## Find all the domain names owned by a public key

당신은 `memcmp` 필터와 함께 `getProgramAccount`를 요청해서 지갑의 모든 도메인 네임들을 조회할 수 있습니다.

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

Twitter handles는 [Solana name service에 등록](https://naming.bonfida.org/#/twitter-registration)될 수 있고 .SOL 도메인 네임들처럼 사용될 수 있습니다.

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

한 Twitter handle과 연관된 SOL address를 찾기 위해서 당신은 reverse look up을 수행할 수 있습니다.

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
