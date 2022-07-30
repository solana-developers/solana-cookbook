---
title: Program Derived Addresses (PDAs)
head:
  - - meta
    - name: title
      content: Solana Cookbook | PDAs
  - - meta
    - name: og:title
      content: Solana Cookbook | PDAs
  - - meta
    - name: description
      content: PDAs are home to accounts that are designed to be controlled by a specific program. Learn about PDAs and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: PDAs are home to accounts that are designed to be controlled by a specific program. Learn about PDAs and more Core Concepts at The Solana cookbook.
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

# 프로그램 파생 주소 (PDAs)

프로그램 파생 주소 (PDAs)는 특정 프로그램에 의하여 작동해야하는 계정을 지칭합니다. PDA를 이용하면 프로그램이 특정 주소의 transaction을 보안 키 (Private Key) 없이 사인할 수 있습니다. PDA는 솔라나 앱들이 서로 composable 할 수 있도록 하는 [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations)의 근간이 됩니다.

## 팩트체크

::: tip 팩트 시트
- PDA는 공공키 (public key) 처럼 보이는 32byte string이지만, 할당된 보안키 (private key)는 없습니다
- `findProgramAddress`는 programID와 시드 (collection of bytes)로 부터 PDA를 생성합니다
- 범프 (one byte)는 잠재적 PDA를 ed25519 elliptic curve로 부터 시프트하는데 사용됩니다
- 프로그램은 시드와 범프를 [invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)에게 제공하여 PDA를 사인할 수 있습니다
- PDA는 derive된 프로그램 만으로 부터 사인될 수 있습니다
- PDA는 프로그램이 instruction을 사인하도록하는 기능외에 해쉬맵 (hashmap)과 같은 인터페이스를 제공합니다. [계정 인덱싱](../guides/account-maps.md)
:::

# 자세한 설명

PDAs are an essential building block for developing programs on Solana. With PDAs, programs can sign for accounts while guaranteeing that no external user could also generate a valid signature for the same account. In addition to signing for accounts, certain programs can also modify accounts held at their PDAs.
PDA는 솔라나 프로그램 개발에 꼭 필요한 요소입니다. PDA를 이용하면 프로그램은 

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Image courtesy of <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### Generating PDAs

To understand the concept behind PDAs, it may be helpful to consider that PDAs are not technically created, but rather found. PDAs are generated from a combination of seeds (such as the string `“vote_account”`) and a program id. This combination of seeds and program id is then run through a sha256 hash function to see whether or not they generate a public key that lies on the ed25519 elliptic curve.

In running our program id and seeds through a hash function, there is a ~50% chance that we actually end up with a valid public key that does lie on the elliptic curve. In this case, we simply add something to fudge our input a little bit and try again. The technical term for this fudge factor is a bump. In Solana, we start with bump = 255 and simply iterate down through bump = 254, bump = 253, etc. until we get an address that is not on the elliptic curve. This may seem rudimentary, but once found it gives us a deterministic way of deriving the same PDA over and over again. 

![PDA on the ellipitic curve](./pda-curve.png)

### Interacting with PDAs

When a PDA is generated, `findProgramAddress` will return both the address and the bump used to kick the address off of the elliptic curve. Armed with this bump, a program can then [sign](../references/accounts.md#sign-with-a-pda) for any instruction that requires its PDA. In order to sign, programs should pass the instruction, the list of accounts, and the seeds and bump used to derive the PDA to `invoke_signed`. In addition to signing for instructions, PDAs must also sign for their own creation via `invoke_signed`.

When building with PDAs, it is common to [store the bump seed](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100) in the account data itself. This allows developers to easily validate a PDA without having to pass in the bump as an instruction argument.

## Other Resources
- [Official Documentation](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Understanding Program Derived Addresses](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
