---
title: Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Account References
  - - meta
    - name: og:title
      content: Solana Cookbook | Account References
  - - meta
    - name: description
      content: Learn more about accounts on Solana and how to use them in your programs.
  - - meta
    - name: og:description
      content: Learn more about accounts on Solana and how to use them in your programs.
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

# Accounts

## How to create a system account

[System Program][1] 이 소유하는 Account 만드세요. Solana runtime은 acount의 소유자에게 데이터를 쓰고 lamports를 보낼 권한을 줄 것입니다.
Account를 생성할 떄, 우리는 고정된 bytes(`space`)로 저장 공간과 rent를 커버하기 위한 충분한 lamports를 미리 할당해야 합니다.
[Rent][2] 는 Solana에서 account를 유지하기 위해 발생하는 비용입니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to calculate account cost

Solana에서 Account들을 유지하는 것은 [rent][2]라고 불리는 저장 비용을 발생시킵니다. Account는 최소 2년 가치의 rent를 보관함으로써 rent 수금으로부터 면제될 수 있습니다.
계산을 위해, 당신은 Account에 저장하려고 하는 데이터의 양을 고려할 필요가 있습니다.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## How to create accounts with seeds

당신은 다수의 다른 keypair를 생성하는 것 대신 당신의 Account들을 관리하기 위해 `createAccountWithSeed`를 사용할 수 있습니다.

### Generate

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Create

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
System program에 의해 소유된 Account만이 System Program을 거쳐 전송할 수 있습니다.
:::

## How to create PDAs

[Program derived address(PDA)][3] 가 보통의 Address와 다른 점입니다:

1. ed25519 곡선으로부터 떨어져 있습니다.
2. 서명을 위해 private key 대신 program을 사용합니다.

**Note**: PDA account들은 Program에서만 생성될 수 있습니다. Address는 client side에서 생성될 수 있습니다.

::: tip
PDA가 비록 program id로 비롯된다 할지라도, 이것이 PDA가 같은 Program에 의해 소유된다는 것을 의미하지는 않습니다.
(예를 들어, 당신은 당신의 PDA를 Token Program이 소유한 Account인 Tokren Account로 초기화할 수 있습니다.)
:::

### Generate a PDA

`findProgramAddress`는 당신의 seed의 마지막에 extra byte를 추가할 것입니다.
이것은 255부부터 시작해 0까지 이고 맨 처음 곡선을 벗어난 Public key를 리턴할 것입니다.
만약 당신이 같은 program id와 seed를 보낸다면 항상 같은 결과를 얻을 것입니다.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Create a PDA

아래 한 예제는 Program에 의해 소유되는 PDA Account를 생성하기 위한 예제 프로그램이고 또 하나는 client에서 Program을 호출하는 예제입니다.

#### Program

아래는 데이터 사이즈를 나타내는 `space`와 PDA를 위한 lamports 양을 나타내는 `rent_lampors`를 가진 하나의 Account를 생성하는 `system_instruction::create_account` instruction을 보여줍니다.
이것은 위에서 언급된 것과 유사하게 `invoke_signed`를 사용해 PDA와 서명합니다.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to sign with a PDA

PDA들은 오직 Program안에서만 서명될 수 있습니다.
아래는 PDA와 서명하고 client에서 호출하는 Program 에제입니다.

### Program

아래는 `escrow` seed에 의해 만들어진 PDA로부터 Account로 SOL을 보내는 하나의 Instruction을 보여줍니다.
`invoke_signed`는 PDA와 서명하기 위해 사용됩니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to get program accounts

Program에 의해 소유된 모든 Account들을 리턴하세요. `getProgramAccounts`와 이것의 설정에 대한 더 자세한 정보는 [guides section](../guides/get-program-accounts.md)를 참조하세요.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## How to close accounts

당신은 모든 SOL을 제거함으로써 Account를 종료(저장된 모든 데이터를 지운다)시킬 수 있습니다. (더 자세한 정보는 [rent][2]를 참조하세요)

#### Program


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to get account balance

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
만약 Token balance를 얻고 싶다면 당신은 Token Account의 address를 알 필요가 있습니다. 더 자세한 정보는 [Token References](token.md)를 참조하세요.
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
