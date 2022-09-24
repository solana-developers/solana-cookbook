---
title: Migrating Program Data Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Program Accounts Data Migration
  - - meta
    - name: og:title
      content: Solana Cookbook | Program Accounts Data Migration
  - - meta
    - name: description
      content: Fundamentally to version data in support of migration means to create a unique reference for a collection of data. This reference can take the form of a query, an ID, or also commonly a datetime identifier. Learn about Serialization and more Ingredients for your dish at The Solana cookbook.
  - - meta
    - name: og:description
      content: Fundamentally to version data in support of migration means to create a unique reference for a collection of data. This reference can take the form of a query, an ID, or also commonly a datetime identifier. Learn about Serialization and more Ingredients for your dish at The Solana cookbook.
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

# Migrating a Programs Data Accounts

## How can you migrate a program's data accounts?

당신이 Program을 생성할 때, 그 Program과 연관된 각각의 Data Account는 특수한 Data 구조를 가질 것입니다.
만약 당신이 Program Derived Account를 업그레이드 할 필요가 있다면, 당신은 결국 이전 구주를 갖고 남아 있는 다수의 Program Derived Account를 갖게 될 것입니다.

Account versioning을 통해 당신은 이전 Account들을 새로운 구조로 업그레이드 할 수 있습니다.

:::tip Note
이것은 단지 Program Owned Account(POA)들에 있는 데이터를 이관하는 많은 방법들 중 하나일 뿐입니다.
:::

## Scenario

우리의 Account Data에 version을 명시하고 이관하기 위해서, 우리는 각 Account에 대한 하나의 **id**를 받을 것입니다.
이 id는 Account의 version을 식별할 수 있게 해줍니다.
우리가 id를 Program에 보냄으로써 Account를 정확히 다룰 수 있습니다.

아래는 Account 상태와 Program을 나타냅니다: 

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

우리의 첫 번째 Account 버전에서 우리는 아래의 것들을 하고 있습니다:

| ID | Action |
| - | - |
|1| 너의 data 안에 있는 'data version' 필드를 포함. 이것은 단순히 순서를 증가시키는 것이거나 좀 더 복잡한 무언가가 될 수 있습니다.
|2| Data 성장을 위한 충분한 공간 할당
|3| Program Version들 사이에서 사용될 수 있는 몇 가지 상수들에 대한 초기화.
|4| 미래에 업그레이드를 위한 `fn conversion_logic`에 Account 업데이트 기능 추가

이제 `somestring`이라는 새롭게 요구되는 필드를 포함하기 위해 우리 Program의 Account들을 업그레이드해봅시다.

만약 우리가 이전 Account에 여분의 공간을 할당하지 않았다면, 우리는 Account를 업그레이드 할 수 없을 것입니다.

## Upgrading the Account

우리의 새로운 Program에서 우리는 content state를 위해 새로운 속성을 추가하고 싶습니다.
아래의 변경 사항은 우리가 초기 Program의 구조들을 어떻게 변경하는지에 대한 것입니다.


### 1. Add account conversion logic

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Line(s) | Note |
| ------- | - |
| 6 | 더 큰 Data block으로부터 간단히 데이터의 일부를 읽기 위해 Solana의 `solana_program::borsh::try_from_slice_unchecked`를 추가했습니다.
| 13-26 | line 17에서 시작하는 `AccountContentCurrent`가 확장하기 전에, `AccountContentOld` line 24에서 이전 Content 구조를 보존합니다.
| 60 | `DATA_VERSION` 상수
| 71 | 우리는 이제 'previous' version을 갖고 있고 이것의 사이즈를 알고 싶습니다.
| 86 | 이전 content 상태를 새로운(현재) content 상태로 업그레이드 하기 위한 연결 고리에 대한 추가.


그러고 나서 새로운 Instruction들을 다루기 위한 프로세서와 `somestring`을 업데이트 하기 위해 우리의 Instruction들을 업데이트 합니다.
데이터 구조에 대한 'upgrading'은 `pack/unpack` 뒤로 캡슐화 되어 있다는 사실에 주의하세요.

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

`VersionProgramInstruction::SetString(String)`이라는 Instruction을 빌드하고 제출한 후, 이제 우리는 아래의 '업그레이드된' Account Data 구조를 갖습니다.


<img src="./data-migration/pav2.png" alt="Program Account v2">

## Resources

* [Borsh Specification](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)