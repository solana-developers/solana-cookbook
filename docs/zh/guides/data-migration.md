---
title: 迁移程序的数据账户
head:
  - - meta
    - name: title
      content: Solana秘籍 | 迁移程序的数据账户
  - - meta
    - name: og:title
      content: Solana秘籍 | 迁移程序的数据账户
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

# 迁移程序的数据账户

## 你如何迁移一个程序的数据账户？

当你创建一个程序时，与该程序关联的每个数据账户都将具有特定的数据结构。如果你需要升级一个程序派生账户，那么你将得到一堆具有旧结构的剩余程序派生账户。

通过账户版本控制，您可以将旧账户升级到新的结构。

:::tip 注意
这只是在程序拥有的账户（POA）中迁移数据的众多方法之一。
:::

## 场景

为了对账户数据进行版本控制和迁移，我们将为每个账户提供一个ID。该ID允许我们在将其传递给程序时识别账户的版本，从而正确处理账户。

假设有以下账户状态和程序：

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

在我们账户的第一个版本中，我们执行以下操作：

| ID | Action |
| - | - |
|1| Include a 'data version' field in your data. It can be a simple incrementing ordinal (e.g. u8) or something more sophisticated
|2| Allocating enough space for data growth
|3| Initializing a number of constants to be used across program versions
|4| Add an update account function under `fn conversion_logic` for future upgrades

假设我们现在希望升级程序的账户，包括一个新的必需字段：`somestring`字段。

如果我们之前没有为账户分配额外的空间，我们将无法升级该账户，而被卡住。

## 升级账户

在我们的新程序中，我们希望为内容状态添加一个新属性。下面的变化展示了我们如何利用初始的程序结构，并在现在使用时进行修改。

### 1. 添加账户转换逻辑

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
| 6 | We've added Solana's `solana_program::borsh::try_from_slice_unchecked` to simplify reading subsets of data from the larger data block
| 13-26| Here we've preserved the old content structure, `AccountContentOld` line 24, before extending the `AccountContentCurrent` starting in line 17.
| 60 | We bump the `DATA_VERSION` constant
| 71 | We now have a 'previous' version and we want to know it's size
| 86 | The Coup de grâce is adding the plumbing to upgrade the previous content state to the new (current) content state

然后，我们更新指令，添加一个新的指令来更新`somestring`，并更新处理器来处理新的指令。请注意，"升级"数据结构是通过`pack/unpack`封装起来的。

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

在构建并提交指令`VersionProgramInstruction::SetString(String)`后，我们现在有了以下 "升级" 的账户数据布局。

<img src="./data-migration/pav2.png" alt="Program Account v2">

## 资料

* [Borsh Specification](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)