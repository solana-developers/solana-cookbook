---
title: Writing Programs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Solana Program References
  - - meta
    - name: og:title
      content: Solana Cookbook | Solana Program References
  - - meta
    - name: description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
  - - meta
    - name: og:description
      content: Learn how to write programs on Solana, with references on cross program invocation, reading accounts, and more
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
---

# Writing Programs

## How to transfer SOL in a program

당신의 Solana Program은 System Program을 호출하지 않고 하나의 Account에서 다른 Account로 전송할 수 있습니다.
핵심적인 규칙은 당신의 Program이 **소유한** 모든 Account에서 다른 Account들로 lamports를 보낼 수 있다는 것입니다.

전송을 받는 Account는 당신이 Program이 소유한 Account가 아니어야 합니다.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## How to get clock in a program

2가지 방법으로 clock을 얻을 수 있습니다.

1. Instruction에 `SYSVAR_CLOCK_PUBKEY`을 넘기는 것
2. Instruction 안에서 직접 Clock에 접근하는 것

어떤 레거시 Program들은 Account로 여전히 `SYSVAR_CLOCK_PUBKEY`를 기대하기 때문에, 두 가지 방법 모두 알아두는 것이 좋습니다.

### Passing Clock as an account inside an instruction

초기화를 위한 하나의 Account와 sysvar pubkey를 받는 하나의 Instruction을 만들어 봅시다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

이제 Cient를 통해 clock의 sysvar public address를 보냅니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Accessing Clock directly inside an instruction

이제 같은 Instruction이지만 Client로부터 `SYSVAR_CLOCK_PUBKEY`를 받지 않는 Instruction을 만들어 봅시다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Client 사이드 Instruction은 이제 오직 state와 payer Account들만 보낼 필요가 있습니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to change account size

당신은 `realloc`을 사용해 Program이 소유한 Account의 크기를 변경할 수 있습니다.
`realloc`은 Account를 10KB까지 리사이즈 할 수 있습니다.
당신이 Account의 크기를 증가시키기 위해 `realloc`을 사용할 때, Account의 rent 면제를 유지하기 위해서는 lamports를 보내야 합니다.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to do Cross Program Invocation

Program 간의 호출은 당신의 Program안에서 단순히 또 다른 Program의 Instruction을 호출하는 것입니다.
하나의 좋은 예제는 Uniwap의 `swap` 기능입니다.
`UniswapV2Router` Contract는 스왑을 위해 필요한 로직을 호출하고, 한 사람으로부터 다른 사람에게 스왑 하기 위해 `ERC20` Contract의 전송 기능을 호출합니다.
같은 방식으로, 우리는 Program의 Instruction을 다양한 목적으로 호출할 수 있습니다.

첫 번째 예제 `SPL Token Program's transfer` Instruction을 살펴봅시다.
전송을 위해 필요한 Account들:

1. The Source Token Account (우리의 Token들을 담고 있는 Account)
2. The Destination Token Account (우리의 Token들을 전송할 대상 Account)
3. The Source Token Account's Holder (우리가 서명할 우리의 지갑 Address)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
대응되는 Client Instruction은 아래 있습니다. mint와 token 생성 Instruction을 알고 싶다면, 근처에 있는 전체 코드를 참조하세요.
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

이제 또 다른 `System Program's create_account` Insctuction 예제를 살펴봅시다.
위에 언급한 Instruction과 이것은 약간의 차이가 있습니다. 우리는 `invoke` 함수 안에 있는 Account들 중 하나로 `token_program`을 보내지 않아야 합니다.
그러나, 호출하는 Instruction은 `program_id`를 보내도록 요구받는 예외 케이스들이 있습니다.
우리의 경우 `System Program's` program_id("11111111111111111111111111111111") 입니다. 
그래서 이제 필요한 Account들은 아래와 같습니다:
``

1. rent를 지불하는 payer Account
2. 생성될 Account
3. System Program Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Client 사이드 코드는 아래처럼 보일 것입니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to create a PDA

Program Derived Address는 쉽게 말해 private key를 갖고 있지 않은 프로그램이 소유한 Account입니다. 대신, seeds와 bump(곡선 밖에 있도록 만드는 넌스 값) 값에 의해 서명됩니다.
Program Address를 "**Generating**" 하는 것은 "**creating**" 하는 것과는 다릅니다. 누군가 `Pubkey::find_program_address`를 사용해 PDA를 generate 할 수 있습니다.
PDA를 creating 하는 것은 주소 공간을 초기화하고 상태를 설정하는 것을 의미합니다. 보통의 키쌍을 가진 Account는 Program 밖에서 생성될 수 있고 상태를 초기화할 수 있습니다. 불행히도, PDA는 서명할 수 없는 특성 때문에 On-Chain에서 생성될 수 있습니다. 따라서 PDA의 생성을 위해 funding Account의 서명과 함께 PDA의 seeds를 넘기기 위해 `invoke_signed`를 사용합니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Client에서는 아래처럼 요구되는 Account들을 보낼 수 있습니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to read accounts

솔라나에서 거의 모든 Instruction들은 최소 2~3개의 Account들을 요구합니다. 그리고 그것들은 어떤 순서로 요구하는지에 대해 Instruction handler에 언급될 것입니다.
만약 Account들을 수동으로 명시하는 것 대신에 Rust에 있는 `iter()`의 이점을 활용한다면 간단해집니다. `next_account_info` 메소드는 기본적으로 iterable 한 객체를 자르고 Accout 배열에 있는 현재 Account를 반환합니다. 다수의 Account들과 그들 각각에 대한 파싱을 요구하는 간단한 Instruction 예제를 봅시다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to verify accounts

Solana Program에는 상태가 존재하지 않기 때문에, Program creator는 악의적인 Account의 진입을 피하기 위해 보내려는 Account들을 가능한 많이 검증해야 합니다.
아래와 같은 기본적인 사항들을 체크할 수 있습니다.

1. 예상한 대로 서명 Account가 실제로 서명한 것인지 확인
2. 예상한 대로 상태 Account가 writable로 표시되었는지 확인
3. 예상한 대로 상태 Account의 소유자가 호출된 program id와 같은지 확인
4. 처음으로 상태를 초기화하는 거라면, Account가 이미 초기화되었는지 확인
5. 필요할 때 Cross Program id들이 넘어왔는지 확인

아래는 위에서 언급한 체크 사항들이 정의된 에제로, 상태 Account를 초기화하는 기본 Instruction입니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## How to read multiple instructions from a transaction

Solana는 현재 Transaction의 모든 Instruction들을 엿볼 수 있게 해 줍니다.
우리는 Instruction들을 변수에 저장하고 반복시킵니다.
우린 이걸 가지고 의심되는 Transaction들을 검사한다던지 등 많은 것들을 할 수 있습니다.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
