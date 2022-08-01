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

PDA는 솔라나 프로그램 개발에 꼭 필요한 요소입니다. PDA를 이용하면 다른 유저가 계정의 시그니쳐를 생성할 걱정 없이 계정을 이용하여 사인을 할 수 있습니다. 계정을 대신하여 사인하는 것 외에도 프로그램은 PDA에 할당된 계정을 수정할 수 있습니다.

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Image courtesy of <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### PDA 생성하기

PDA의 컨셉을 이해하기 위해서는 PDA가 기술적으로 "생성"된것이 아닌 "발견"되었다는 사실을 이해해야합니다. PDA는 시드(`"vote_account"`과 같은 string)와 프로그램 id의 조합으로 생성됩니다. 이 조합은 sha256 해시 함수를 거쳐 ed25519 elliptic curve에 해당하는 공공키를 생성하는지 여부를 확인하는데 사용됩니다.

프로그램 id와 시드를 해시 함수에 대입하게되면 eliptic curve에 해당하지 않지만 유효한 공공키를 생성할 확률이 대략 50% 입니다. 이 경우, 인풋값을 조금 수정하여 위 과정을 다시 수행합니다. 퍼지 팩터의 기술적인 명칭은 범프입니다. 솔라나에서는 bump = 255에서 시작하여 bump = 254, bump = 253으로 eliptic curve위에 존재하지 않는 주소를 생성할때까지 반복합니다. 이런 방법이 극히 단순해 보일 수 있지만, 같은 PDA를 여러번 파생시키는데에 큰 역할을 합니다.

![PDA on the ellipitic curve](./pda-curve.png)

### PDA와 통신하기

PDA가 생성될때 `findProgramAddress`는 주소를 eliptic curve에서 제외시키는데 사용한 범프 (bump)와 주소를 리턴합니다. 이 범프를 이용하여 PDA가 요구되는 instruction을 프로그램이 [사인](../references/accounts.md#sign-with-a-pda)할 수 있습니다. 사인을 하기 위해서 프로그램은 instruction, 계정 리스트, PDA를 생성하기 위해 사용된 시드와 범프를 `invoke_signed`에 패스해야 합니다. Instruction을 사인하는것과 더불어 PDA는 본 주소가 생성한 `invoke_signed`역시 사인해야합니다.

PDA를 이용하여 개발을 할때에 [범프 시드를 본 계정 데이터에 저장](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100) 하는 일이 흔하게 보입니다. 이것은 개발자가 PDA를 instruction argument에 범프를 패스하지 않고도 쉽게 검증할 수 있게 도와줍니다.

## 유용한 정보
- [공식 문서](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [PDA 이해하기](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
