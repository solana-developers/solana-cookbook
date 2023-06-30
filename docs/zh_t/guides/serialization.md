---
title: 序列数据
head:
  - - meta
    - name: title
      content: Solana秘籍 | 序列数据
  - - meta
    - name: og:title
      content: Solana秘籍 | 序列数据
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

# 序列数据

当我们谈论序列化时，我们指的是数据的序列化和反序列化。

序列化在Solana程序和程序账户的生命周期中的几个点上起着作用：

1. 将指令数据序列化到客户端上
2. 在程序中反序列化指令数据
3. 将账户数据序列化到程序中
4. 在客户端上反序列化账户数据

重要的是，上述操作都应该采用相同的序列化方法。下面的示例演示了使用[Borsh](#resources)进行序列化。

本文档的其余部分中的示例摘录自[Solana CLI 程序模板](#resources)

## 设置Borsh序列化

为了使用Borsh进行序列化，需要在Rust程序、Rust客户端、节点和/或Python客户端中设置Borsh库。

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

## 如何序列化客户端上的指令数据

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

如果你要将出站指令数据序列化并发送给程序，它必须与程序反序列化入站指令数据的方式保持一致。

在此模板中，指令数据块是一个包含序列化数组的数据块，例如：

| Instruction (Variant index) | Serialized Key                 | Serialized Value               |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)              | not applicable for instruction | not applicable for instruction |
| Mint (1)                    | "foo"                          | "bar"                          |
| Transfer (2)                | "foo"                          | not applicable for instruction |
| Burn (2)                    | "foo"                          | not applicable for instruction |

在下面的示例中，我们假设程序拥有的账户已经初始化完成。

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

## 如何在程序中反序列化指令数据

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## 如何在程序中序列化账户数据 

<img src="./serialization/ser3.png" alt="Account Data Serialization">

程序账户数据块（来自示例仓库）的布局如下：

| Byte 0           | Bytes 1-4                     | Remaining Byte up to 1019                   |
| ---------------- | ----------------------------- | ------------------------------------------- |
| Initialized flag | length of serialized BTreeMap | BTreeMap (where key value pairs are stored) |

### Pack

关于 [Pack][1] trait

可以更容易地隐藏账户数据序列化/反序列化的细节，使你的核心程序指令处理代码更简洁。因此，不需要将所有的序列化/反序列化逻辑放在程序处理代码中，而是将这些细节封装在以下三个函数中：

1. `unpack_unchecked` - 允许你对账户进行反序列化，而无需检查它是否已被初始化。当实际处理初始化函数（变体索引为0）时，这非常有用。
2. `unpack` - 调用你的Pack实现的`unpack_from_slice`函数，并检查账户是否已被初始化。
3. `pack` - 调用您的Pack实现的`pack_into_slice`函数。

下面是我们示例程序的Pack trait实现。随后是使用Borsh进行账户数据处理的示例。

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### 序列化/反序列化

为了完成底层的序列化和反序列化：

1. `sol_template_shared::pack_into_slice` - 进行序列化的地方
2. `sol_template_shared::unpack_from_slice` - 进行反序列化的地方

**请关注** 在下面的示例中，我们在`BTREE_LENGTH`的数据布局中的`BTREE_STORAGE`之前有一个`u32`（4字节）的分区。这是因为在反序列化过程中，borsh会检查您正在反序列化的切片的长度是否与它实际读取的数据量一致，然后才进行对象的重组。下面演示的方法首先读取`BTREE_LENGTH`，以获取要从`BTREE_STORAGE`指针中`slice`的大小。

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### 用法

以下将所有内容整合在一起，并演示了程序与`ProgramAccountState`的交互，其中`ProgramAccountState`封装了初始化标志以及底层的`BTreeMap`用于存储键值对。

首先，当我们想要初始化一个全新的账户时：

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

现在，我们可以执行其他指令，下面的示例演示了从客户端发送指令来创建一个新的键值对：

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## 如何在客户端中反序列化账户数据

客户端可以调用Solana来获取程序所拥有的账户，其中序列化的数据块是返回结果的一部分。进行反序列化需要了解数据块的布局。

账户数据的布局在[这里](#account-data-serialization)已经被描述了。

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

[Borsh Specification](#resources)中包含了大多数基本和复合数据类型的映射关系。

在TS/JS和Python中，关键是创建一个具有适当定义的Borsh模式，以便序列化和反序列化可以生成或遍历相应的输入。

首先，我们将演示在Typescript中对基本类型（数字、字符串）和复合类型（固定大小数组、Map）进行序列化，然后在Python中进行序列化，最后在Rust中进行等效的反序列化操作：

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

## 高级构造

我们在之前的示例中展示了如何创建简单的负载（Payloads）。有时，Solana会使用某些特殊类型。本节将演示如何正确映射TS/JS和Rust之间的类型，以处理这些情况。

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## 资料

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)

