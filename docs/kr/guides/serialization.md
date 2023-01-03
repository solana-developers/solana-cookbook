---
title: Serializing Data
head:
  - - meta
    - name: title
      content: Solana Cookbook | Serializing Data
  - - meta
    - name: og:title
      content: Solana Cookbook | Serializing Data
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

# Serializing Data

여기서 Serialization에 대해 얘기할 때, Data를 serializing 하는 것과 deserializing 하는 것 모두를 의미합니다.

Solana Program과 Program Account들의 생명 주기를 따라서 Serialization이 동작하는 몇 가지 포인트들이 있습니다:

1. Client에서 Instruction Data를 Serializing 하는 것
2. Program에서 Instruction Data를 Deserializing 하는 것
3. Program에서 Account Data를 Serializing 하는 것
4. Client에서 Account Data를 Deserializing 하는 것

위의 행위들은 모두 같은 Serialization 접근에 의해 지원된다는 것이 중요합니다.
포함된 Snippet들이 [Borsh](#resources)를 사용하는 Serialization을 보여주고 있습니다.

이 문서의 나머지 예제들은 [Solana CLI Program Template](#resources)으로부터 가져온 것들입니다.

## Setting up for Borsh Serialization

Rust Program, Rust Client, Node 그리고/또는 Python Client에 Borsh 라이브러리가 설치되어야 합니다.

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

## How to serialize instruction data on the client

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

만약 outbound Instruction Data를 Program에 보내기 위해 serializing 한다면, 이것은 Program이 inbound Instruction Data를 어떻게 deserializing 해야 하는지 그대로 보여줍니다.

이 템플릿에서, 하나의 Instruction Data block은 serialize 된 배열이며, 아래의 예제들을 포함하고 있습니다.


| Instruction (Variant index) | Serialized Key                 | Serialized Value               |
| --------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)              | Instruction에 적용되지 않음        | Instruction에 적용되지 않음        |
| Mint (1)                    | "foo"                          | "bar"                          |
| Transfer (2)                | "foo"                          | Instruction에 적용되지 않음        |
| Burn (2)                    | "foo"                          | Instruction에 적용되지 않음        |

아래 예제에서, Account를 소유한 Program은 초기화 되었다고 가정합니다.


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

## How to deserialize instruction data on the program

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## How to serialize account data on the program

<img src="./serialization/ser3.png" alt="Account Data Serialization">

Program Account Data block(샘플 저장소에 있는)은 다음과 같이 구성되어 있습니다.

| Byte 0           | Bytes 1-4                     | Remaining Byte up to 1019                   |
| ---------------- | ----------------------------- | ------------------------------------------- |
| Initialized flag | length of serialized BTreeMap | BTreeMap (where key value pairs are stored) |

### Pack

[Pack][1] trait에 대한 설명

Pack trait은 당신의 Core Program이 Instruction을 처리하기 위해 Account Data를 serialization/deserialization 하는 것에 대한 상세한 내용을 숨기는 것을 쉽게 만들어 줍니다.
그래서 Pack trait은 Program에 모든 serialize/desrialize 코드를 작성하는 것 대신에, 아래 나오는 3개의 Functions들 뒤로 상세 내용들을 캡슐화해줍니다.

1. `unpack_unchecked` - Account가 초기화되었는지 체크하는 것 없이 deserialize 가능하게 해 줍니다. 이것은 초기화 함수 (variant index 0)를 다룰 때 유용합니다.
2. `unpack` - `unpack_from_slice`의 Pack 구현체를 호출하고 Account가 초기화되었는지 체크합니다.
3. `pack` - `pack_into_slice`의 Pack 구현체를 호출합니다.

샘플 Program을 위한 Pack trait 구현체가 입니다. 이것은 Borsh를 사용해서 실제 Account Data의 처리를 보여줍니다.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Serialization/Deserialization

아래의 serialization 그리고 deserialization을 완성하기 위해:

1. `sol_template_shared::pack_into_slice` - 실제 serialization이 일어나는 곳
2. `sol_template_shared::unpack_from_slice` - 실제 deserialization이 일어나는 곳

Data 배치를 보면 `BTREE_STORAGE` 앞에 `BTREE_LENGTH`를 위한 `u32`(4 bytes) 타입의 부분을 가지고 있다는 사실에 주목하세요. 이것은 borsh가 serialization을 하는 동안 실제 수신된 객체를 재결합하기 앞서, 당신이 deserializing 하는 slice의 길이가 읽으려는 데이터의 양과 일치하는지 확인하기 때문입니다.
아래에 예시가 증명해주듯이 먼저 `BTREE_STORAGE` pointer로부터 `slice`에 대한 크기를 얻기 위해 `BTREE_LENGTH`를 읽습니다.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Usage

아래는 모든 것을 합쳐 놓았고 Program이 어떻게 `ProgramAccountState`와 상호 작용하는지를 보여줍니다. `ProgramAccountState`는 초기화 flag 뿐만 아니라 key/value 쌍을 위한 `BTreeMap`을 캡슐화합니다.

첫 번째로, 새로운 Account를 초기화하고 싶을 때:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

이제 우리는 다른 Instruction들을 동작시킬 수 있습니다.
아래는 Client에서 Instruction들을 보낼 때 보여줬던 새로운 key value 쌍을 minting 하는 것을 보여줍니다.

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## How to deserialize account data on the client

Client들은 Program이 소유한 Account를 가지고 오기 위해 Solana를 호출할 수 있고, 이때 serialize 된 Data block은 반환 값의 일부입니다. Deserializing을 위해서는 Data block 배치를 알아야 합니다.

Account Data의 배치는 [여기](#account-data-serialization)에 설명되어 있습니다.

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

## Common Solana TS/JS Mappings

[Borsh Specification](#resources)는 원시 타입과 복합 데이터 타입들을 위한 대부분의 맵핑을 포함하고 있습니다.

TS/JS와 Python에서의 핵심은 적절한 정의를 가지고 Serialize와 Deserialize가 각각의 input들을 생산하고 다룰 수 있게 Borsh 스키마를 생성하는 것입니다.

여기서는 원시 타입(numbers, strings)들과 복합 타입(fixed size arry, Map)들에 대한 serialization을 보여준다.
먼저 Typesecript과 Python 그러고 나서 대응되는 Deserialization을 Rust에서 보여줍니다.

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

## Advanced Constructs

이전 예제들에서 간단한 Payload들을 생성하는 방법을 보여줬습니다.
때때로 Solana는 특정 타입들에 대해서 throw a fastball 합니다.
이번 섹션에서는 TS/JS 와 Rust 사이에서 그것들을 다루기 위한 적절한 맵핑을 보여줍니다.


### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Resources

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)
