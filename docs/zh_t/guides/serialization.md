---
title: 序列數據
head:
  - - meta
    - name: title
      content: Solana祕籍 | 序列數據
  - - meta
    - name: og:title
      content: Solana祕籍 | 序列數據
  - - meta
    - name: description
      content: Learn how to serialize and deserialize data on Solana
  - - meta
    - name: og:description
      content: Learn how to serialize and deserialize data on Solana
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

# 序列數據

當我們談論序列化時，我們指的是數據的序列化和反序列化。

序列化在Solana程序和程序賬戶的生命週期中的幾個點上起着作用：

1. 將指令數據序列化到客戶端上
2. 在程序中反序列化指令數據
3. 將賬戶數據序列化到程序中
4. 在客戶端上反序列化賬戶數據

重要的是，上述操作都應該採用相同的序列化方法。下面的示例演示了使用[Borsh](#resources)進行序列化。

本文檔的其餘部分中的示例摘錄自[Solana CLI 程序模板](#resources)

## 設置Borsh序列化

爲了使用Borsh進行序列化，需要在Rust程序、Rust客戶端、節點和/或Python客戶端中設置Borsh庫。

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## 如何序列化客戶端上的指令數據

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

如果你要將出站指令數據序列化併發送給程序，它必須與程序反序列化入站指令數據的方式保持一致。

在此模板中，指令數據塊是一個包含序列化數組的數據塊，例如：

| Instruction (Variant index) | Serialized Key                 | Serialized Value               |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)              | not applicable for instruction | not applicable for instruction |
| Mint (1)                    | "foo"                          | "bar"                          |
| Transfer (2)                | "foo"                          | not applicable for instruction |
| Burn (2)                    | "foo"                          | not applicable for instruction |

在下面的示例中，我們假設程序擁有的賬戶已經初始化完成。

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## 如何在程序中反序列化指令數據

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## 如何在程序中序列化賬戶數據 

<img src="./serialization/ser3.png" alt="Account Data Serialization">

程序賬戶數據塊（來自示例倉庫）的佈局如下：

| Byte 0           | Bytes 1-4                     | Remaining Byte up to 1019                   |
| ---------------- | ----------------------------- | ------------------------------------------- |
| Initialized flag | length of serialized BTreeMap | BTreeMap (where key value pairs are stored) |

### Pack

關於 [Pack][1] trait

可以更容易地隱藏賬戶數據序列化/反序列化的細節，使你的核心程序指令處理代碼更簡潔。因此，不需要將所有的序列化/反序列化邏輯放在程序處理代碼中，而是將這些細節封裝在以下三個函數中：

1. `unpack_unchecked` - 允許你對賬戶進行反序列化，而無需檢查它是否已被初始化。當實際處理初始化函數（變體索引爲0）時，這非常有用。
2. `unpack` - 調用你的Pack實現的`unpack_from_slice`函數，並檢查賬戶是否已被初始化。
3. `pack` - 調用您的Pack實現的`pack_into_slice`函數。

下面是我們示例程序的Pack trait實現。隨後是使用Borsh進行賬戶數據處理的示例。

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### 序列化/反序列化

爲了完成底層的序列化和反序列化：

1. `sol_template_shared::pack_into_slice` - 進行序列化的地方
2. `sol_template_shared::unpack_from_slice` - 進行反序列化的地方

**請關注** 在下面的示例中，我們在`BTREE_LENGTH`的數據佈局中的`BTREE_STORAGE`之前有一個`u32`（4字節）的分區。這是因爲在反序列化過程中，borsh會檢查您正在反序列化的切片的長度是否與它實際讀取的數據量一致，然後才進行對象的重組。下面演示的方法首先讀取`BTREE_LENGTH`，以獲取要從`BTREE_STORAGE`指針中`slice`的大小。

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### 用法

以下將所有內容整合在一起，並演示了程序與`ProgramAccountState`的交互，其中`ProgramAccountState`封裝了初始化標誌以及底層的`BTreeMap`用於存儲鍵值對。

首先，當我們想要初始化一個全新的賬戶時：

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

現在，我們可以執行其他指令，下面的示例演示了從客戶端發送指令來創建一個新的鍵值對：

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## 如何在客戶端中反序列化賬戶數據

客戶端可以調用Solana來獲取程序所擁有的賬戶，其中序列化的數據塊是返回結果的一部分。進行反序列化需要了解數據塊的佈局。

賬戶數據的佈局在[這裏](#account-data-serialization)已經被描述了。

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Solana TS/JS 常用映射

[Borsh Specification](#resources)中包含了大多數基本和複合數據類型的映射關係。

在TS/JS和Python中，關鍵是創建一個具有適當定義的Borsh模式，以便序列化和反序列化可以生成或遍歷相應的輸入。

首先，我們將演示在Typescript中對基本類型（數字、字符串）和複合類型（固定大小數組、Map）進行序列化，然後在Python中進行序列化，最後在Rust中進行等效的反序列化操作：

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## 高級構造

我們在之前的示例中展示瞭如何創建簡單的負載（Payloads）。有時，Solana會使用某些特殊類型。本節將演示如何正確映射TS/JS和Rust之間的類型，以處理這些情況。

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## 資料

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)

