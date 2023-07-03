---
title: 遷移程序的數據賬戶
head:
  - - meta
    - name: title
      content: Solana祕籍 | 遷移程序的數據賬戶
  - - meta
    - name: og:title
      content: Solana祕籍 | 遷移程序的數據賬戶
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

# 遷移程序的數據賬戶

## 你如何遷移一個程序的數據賬戶？

當你創建一個程序時，與該程序關聯的每個數據賬戶都將具有特定的數據結構。如果你需要升級一個程序派生賬戶，那麼你將得到一堆具有舊結構的剩餘程序派生賬戶。

通過賬戶版本控制，您可以將舊賬戶升級到新的結構。

:::tip 注意
這只是在程序擁有的賬戶（POA）中遷移數據的衆多方法之一。
:::

## 場景

爲了對賬戶數據進行版本控制和遷移，我們將爲每個賬戶提供一個ID。該ID允許我們在將其傳遞給程序時識別賬戶的版本，從而正確處理賬戶。

假設有以下賬戶狀態和程序：

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

在我們賬戶的第一個版本中，我們執行以下操作：

| ID | Action |
| - | - |
|1| 在您的数据中包含一个"数据版本"字段。它可以是一个简单递增的序数（例如，u8），或者是更复杂的形式。
|2| 為數據增長分配足夠的空間
|3| 初始化一些常數，以在程式版本間使用。
|4| 在`fn conversion_logic`下添加一個更新帳戶的功能，以供未來升級使用。

假設我們現在希望升級程序的賬戶，包括一個新的必需字段：`somestring`字段。

如果我們之前沒有爲賬戶分配額外的空間，我們將無法升級該賬戶，而被卡住。

## 升級賬戶

在我們的新程序中，我們希望爲內容狀態添加一個新屬性。下面的變化展示了我們如何利用初始的程序結構，並在現在使用時進行修改。

### 1. 添加賬戶轉換邏輯

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
| 6 | 我们已经添加了Solana的`solana_program::borsh::try_from_slice_unchecked`，以简化从较大数据块中读取子集数据的操作。
| 13-26| 在这里，我们保留了旧的内容结构，在第24行的`AccountContentOld`之前，然后在第17行开始扩展`AccountContentCurrent`。
| 60 | 我们增加了`DATA_VERSION`常数。
| 71 | 现在我们有一个“之前”的版本，并且我们想知道它的大小。
| 86 | 最后的致命一击是添加管道，将之前的内容状态升级到新的（当前的）内容状态。

然後，我們更新指令，添加一個新的指令來更新`somestring`，並更新處理器來處理新的指令。請注意，"升級"數據結構是通過`pack/unpack`封裝起來的。

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

在構建並提交指令`VersionProgramInstruction::SetString(String)`後，我們現在有了以下 "升級" 的賬戶數據佈局。

<img src="./data-migration/pav2.png" alt="Program Account v2">

## 資料

* [Borsh Specification](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)