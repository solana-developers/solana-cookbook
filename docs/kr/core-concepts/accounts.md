---
title: Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Accounts
  - - meta
    - name: og:title
      content: Solana Cookbook | Accounts
  - - meta
    - name: description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
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

# Accounts (계정)

솔라나에서 계정은 state를 저장하기 위하여 사용됩니다. 계정은 솔라나의 기초적인 구조에 꼭 필요한 컨셉입니다.

## 팩트체크

::: tip 팩트 시트

- 계정은 데이터를 저장하기 위하여 사용된다
- 각 계정은 고유한 주소를 가진다
- 계정은 10MB의 최대 용량을 가진다
- PDA 계정은 10KB의 최대 용량을 가진다
- PDA 계정은 프로그램을 대신하여 사인을 할 수 있다 
- 계정 용량은 생성시에 고정이 되어 있지만 [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)를 이용하여 바꿀 수 있다
- 계정 데이터 저장소는 rent(임대료)를 지불하여 사용한다
- 계정 소유자는 System Program으로 기본값 설정이 되어있다.
  :::

## 자세한 설명

### 계정 모델

솔라나에는 세가지 종류의 계정이 있습니다:

- 데이터 계정: 데이터를 저장하는 계정
- 프로그램 계정: 실행 가능한 프로그램을 저장하는 계정
- 네이티브 계정: 시스템, 지분, 투표와 같은 솔라나의 네이티브 프로그램을 지칭하는 계정

데이터 계정은 두 가지 종류로 나뉘어집니다:

- 시스템 소유 계정
- PDA (프로그램 파생 주소) 계정

각 계정은 주소 (공공 키)가 있으며 소유자 (프로그램 계정의 주소)이 있습니다. 다음 표는 계정이 저장하는 정보를 설명합니다.

| 필드        | 설명                                    |
| ---------- | ---------------------------------------------- |
| lamports   | 계정이 소유한 lamport의 개수                        |
| owner      | 계정의 프로그램 소유자                                |
| executable | 계정이 지시 (instructions)들을 실행시킬 수 있는지 여부   |
| data       | 계정에 저장된 처리 전 바이트 배열 데이터 (raw data byte array)|
| rent_epoch | 계정이 임대료를 지불해야하는 다음 epoch                 |

소유권에 대하여 몇가지 중요한 규칙이 있습니다:

- 계정의 소유자만이 계정의 데이터와 lamport를 전송할 수 있습니다
- 소유권과 관계없이 누구나 데이터 계정에 lamport를 전송할 수 있습니다
- 계정의 데이터가 삭제된 후 계정의 소유자는 새로운 소유자를 임명할 수 있습니다

프로그램 계정은 state를 저장하지 않습니다.

예시로, 카운터 변수의 숫자를 증가 시킬 수 있는 카운터 프로그램이 있다면 카운터 코드를 저장하는 프로그램과 카운터 변수를 저장하는 프로그램 두개가 필요합니다. 

![](./account_example.jpeg)

계정이 삭제되는것을 방지하기 위하여 임대료를 지불해야합니다.

### 임대료

계정에 데이터를 저장하기 위해서 SOL을 임대료로 지불해야합니다. 2년동안 계정 임대료 지불에 요규되는 최소 밸런스를 유지할 시 임대료를 더 이상 지불하지 않아도 됩니다. 임대료를 회수하기 위해서 계정 사용을 종료시키고 lamports를 본인 지갑으로 전송할 수 있습니다.

임대료는 두가지 상황에서 지불됩니다:

1. Transaction에 참조 (포함) 되었을때
2. 매 epoch마다

계정에서 지불한 임대료의 일부는 파괴 (burn)되며, 나머지는 투표 계정들에게 매 슬롯의 마지막에 배분됩니다.

만약 계정이 임대료를 지불해야하는 만큼의 lamport를 소유하고 있지 않으면 계정은 다른 곳으로 배정되며 (deallocate) 데이터는 삭제됩니다.

## 유용한 정보

- [솔라나 계정 모델](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [공식 문서](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### 크레딧

This core concept is credited to Pencilflip. [Follow him on Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
