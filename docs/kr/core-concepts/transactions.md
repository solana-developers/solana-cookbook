---
title: Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Transactions
  - - meta
    - name: description
      content: Transaction are bundles of Multiple operational units on Solana. Learn more about Transaction and Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Multiple operational units on Solana can be bundled into a single unit called Transaction. Learn more about Core Concepts at The Solana cookbook.
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

# Transactions

Client들은 Cluster에 Transaction을 보냄으로써 [programs](./programs.md)들을 호출합니다.
하나의 Transaction은 각자의 Program을 대상으로 하는 다수의 Instruction들을 포함할 수 있습니다.
Transaction이 보내졌을 때, Solana [Runtime](https://docs.solana.com/developing/programming-model/runtime)은 Transaction의 Instruction들을 순서대로 처리할 것입니다. 만약 한 Instruction의 어떤 부분이라도 실패한다면, 전체 Transaction은 실패할 것입니다.

## Facts

::: tip Fact Sheet
- Instruction은 Solana에서 가장 기본적인 연산 단위입니다.
- 각 Instruction은 아래 내용을 포함합니다:
    - 대상 Program의 `program_id`
    - 읽거나 쓸려고 하는 모든 `accounts`를 담은 하나의 Array
    - 대상 Program에 명시된 byte array 형태의 `instruction_data`
- 다수의 Instruction들은 하나의 Transaction으로 묶일 수 있습니다. 
- 각 Transaction은 아래 내용을 포함합니다:
    - 읽거나 쓸려고 하는 모든 `accounts`를 담은 하나의 Array
    - 하나 이상의 `instructions`
    - 최근 `blockhash`
    - 하나 이상의 `signatures`
- Instruction들은 순서대로 처리된다.
- 만약 Instuction의 한 부분이라도 실패한다면, 전체 Transaction은 실패한다.
- Transaction은 1232 바이트로 제한된다.
:::

## Deep Dive

Solana Runtime은 Instruction과 Transaction 둘 모두에게 읽거나 쓸 모든 Account의 목록을 명시하도록 요구합니다.
사전에 Account들의 목록을 요구함으로써, Runtime은 모든 Transaction들을 병렬로 실행할 수 있습니다.

한 Transaction이 Cluster로 보내지면, Runtime은 이 Transaction의 Instruction들을 순차로 처리할 것입니다.
각 Instruction을 받는 Program은 Instruction의 데이터를 해석하고 명시된 Account들을 동작시킬 것입니다.
Program은 성공을 반환할 수도 있고 에러 코드를 반환할 수도 있습니다. 만약 에러가 반환되면, Transaction은 즉시 실패할 것입니다.

Account의 데이터를 변경하거나 출금하려고 하는 Transaction에는 해당 Account 소유자의 서명이 요구됩니다.
변경될 Account는 `wriable` 표시됩니다.
Transaction 요금 지불자가 필요한 rent와 Transaction 요금을 지불한다면, Account에 입금하는 데에는 소유자의 서명이 필요하지 않습니다.

모든 Transaction들은 전송 전에 [recent blockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash)를 참조해야 합니다. Blockhash는 중복을 방지하고 오래된 Transaction을 제거하기 위해 사용됩니다. Transaction Blockhash는 최대 150 blocks까지, 혹은 최대 1분 19초까지 허용됩니다.

### Fees

Solana 네트워크는 두 종류의 요금을 걷습니다.
- Transaction 전파를 위한 [Transaction fees](https://docs.solana.com/transaction_fees) (”gas fees” 라고 알려진)
- On-chain에 데이터 저장을 위한 [Rent fees](https://docs.solana.com/developing/programming-model/accounts#rent)

Solana의 Transaction fees에는 사용자들이 다음 block에 포함될 기회를 증가시키기 위해 더 높은 요금을 지불할 수 있는 fee market 개념이 없습니다.
이 글을 쓰는 시점에, Transaction fees는 사용되는 자원의 양에 의해서가 아니라 오직 요구된 서명들(i.e. `lamports_per_signature`)의 개수에 의해 결정됩니다.
이것은 현재 모든 Transaction들에 대한 1232 바이트의 엄격한 한도가 존재하기 때문입니다.

모든 Transaction은 Transaction에 서명하기 위해 최소 하나의 `writable` Account를 요구합니다.
전송될 때, 처음 직력화된 수정 가능한 서명자 Account가 요금 지불자가 될 것입니다.
이 Account는 Transaction이 성공하는지 실패하는지와 상관없이 Transaction에 대한 비용을 지불합니다.
만약 요금 지불자가 Transaction 요금을 지불하기 위한 충분한 Balance를 갖고 있지 않다면, 이 Transaction은 거절됩니다.

이 글을 작성하는 시점에는, 모든 Transaction 요금의 50 퍼센트는 Block을 생산하는 Validator가 가져가고, 나머지 50 퍼센트는 소멸됩니다.
이러한 구조는 Validator들이 가능한 많은 Transaction들을 처리하도록 보상하기 위함입니다.

## Other Resources

- [Official Documentation](https://docs.solana.com/developing/programming-model/transactions)
- [Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
