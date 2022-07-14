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
- 계정 주인은 System Program으로 기본값 설정이 되어있다.
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

각 계정은 주소 (공공 키)가 있으며 주인 (프로그램 계정의 주소)이 있습니다. 다음 표는 계정이 저장하는 정보를 설명합니다.

| 필드        | 설명                                    |
| ---------- | ---------------------------------------------- |
| lamports   | 계정이 소유한 lamport의 개수                        |
| owner      | 계정의 프로그램 주인                                |
| executable | 계정이 지시 (instructions)들을 실행시킬 수 있는지 여부   |
| data       | 계정에 저장된 처리 전 바이트 배열 데이터 (raw data byte array)|
| rent_epoch | 계정이 임대료를 지불해야하는 다음 epoch                 |

There are a few important ownership rules:

- Only a data account's owner can modify its data and debit lamports
- Anyone is allowed to credit lamports to a data account
- The owner of an account may assign a new owner if the account's data is zeroed out

Program accounts do not store state.

For example, if you have a counter program that lets you increment a counter, you
must create two accounts, one account to store the program's code, and one to store
the counter.

![](./account_example.jpeg)

To prevent an account from being deleted, you must pay rent.

### Rent

Storing data on accounts costs SOL to maintain, and it is funded by what is called
rent. If you maintain a minimum balance equivalent to 2 years of rent payments in an
account, your account will be exempt from paying rent. You can retrieve rent by closing
the account and sending the lamports back to your wallet.

Rent is paid during two different timings:

1. When referenced by a transaction
2. Once an epoch

A percentage of rent collected by accounts is destroyed, while the rest is distributed
to vote accounts at the end of every slot.

If the account does not have enough to pay rent, the account will be deallocated and the data
removed.

## Other Resources

- [Solana Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Official Documentation](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Credit

This core concept is credited to Pencilflip. [Follow him on Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
