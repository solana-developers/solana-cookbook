---
title: Feature Parity Testing
head:
  - - meta
    - name: title
      content: Solana Cookbook | Feature Parity Testing
  - - meta
    - name: og:title
      content: Solana Cookbook | Feature Parity Testing
  - - meta
    - name: description
      content: Features vary by Solana cluster. Feature testing ensures predictable results.
  - - meta
    - name: og:description
      content: Features vary by Solana cluster. Feature testing ensures predictable results.
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

# Feature Parity Testing

당신이 프로그램을 테스트할 때, 다양한 cluster들에서 동일한 것을 실행할 것이라는 확신은 프로그램의 질과 예측된 결과를 만들기 위해 매우 필수적입니다.

## Facts

::: tip Fact Sheet
- 기능들은 Solana validator들에게 소개되는 기능들로 사용하기 위해 활성화가 필요합니다.
- 기능들은 하나의 cluster(e.g. testnet) 에서 활성화될지 모르지만 다른 cluster(e.g. mainnet-beta) 에서는 아닐 수 있습니다.
- 그러나 로컬에서 기본 `solana-test-validator`를 실행할 때, 당신의 solana version에서 가능한 모든 기능들이 자동으로 활성화될 것입니다.
로컬에서 테스트할때 테스트 결과들은 다른 cluster에 배포하고 실행한 결과와 다를 수도 있습니다.

:::

## Scenario
당신이 3개의 Instuction들을 포함하는 하나의 Transaction을 갖고 각 Instruction은 대략 100_000 컴퓨터 유닛을 소비한다고 가정합시다.
Solana 1.8.x 버전에서 돌릴 때, 당신은 아래와 유사한 Instruction CU 소비를 보게 될 것입니다.

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

솔라나 1.9.2 버전에서 'transaction wide comput cap'이라 불리는 기능이 소개되었는데, 여기서 Transaction은 기본적으로 200_000 CU 에산을 갖고 캡슐화된 Instruction들은 이 Transaction 예산에서 **끌어와** 사용됩니다. 위에서 언급된 같은 Transaction을 실행하면 다른 결과를 얻게 될 것입니다:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

당신이 이것을 알지 못했다면, 당신의 Instruction은 변화가 없음에도 이것을 발생시키는 것을 보고 좌절할지도 모릅니다.
devnet에서는 괘찮지만 local에서는 실패?!?

당신의 정신을 지키기 위해 300_000 CU를 허락하도록 전체적인 Transaction budget을 증가시키는 능력이 존재합니다.
그러나 이 글은 **_Feature Parity_**를 가지고 테스트하는 것이 혼란을 피하기 위한 대책을 제공하는 이유임을 입증하는 것입니다.

## Feature Status
`solana feature status` command롤 특정 cluster에서 가능한 기능들이 무엇이 있는 지 쉽게 확인할 수 있습니다.
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

대안으로, 당신은 cluster들 사이에 모든 기능 상태를 확인하기 위해 [scfsd](#resources) 같은 도구를 사용할 수도 있습니다.
이것은 여기서는 이부분이지만 출력해주고, `solana-test-validator` 실행을 요구하지 않습니다.

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Parity Testing
위에서 언급했듯이, `solana-test-validator`는 **모든** 기능들을 자동으로 활성화합니다.
그래서, "devnet, testnet, mainnet-beta 같은 환경을 로컬에서는 어떻게 테스트할까요?"라는 질문에 대답하기 위해서.

해결책: 기능들을 비활성화 가능하게 하는 PR들이 솔라나 1.9.6 버전에 추가됐습니다:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Simple Demonstration
Suppose you have a simple program that logs the data it receives in it's entry-point. And you are
testing a transaction that adds two (2) instructions for your program.
당신이 entry-point에서 수신된 데이터를 출력하는 간단한 프로그램을 가지고 있다고 가정합시다.
그리고 당신은 프로그램에 2 개의 Intrustion을 추가하는 Transaction을 테스트하고 있습니다.

### All features activated
1. 당신은 하나의 터미널에서 test validator를 실행합니다.

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program target/deploy/PROGNAME.so --reset`
```

2. 다른 하나의 터미널에서 당신은 log streamer를 실행합니다.
```console
solana logs
```

3. 그리고 당신은 Transaction을 실행합니다. 당신은 log terminal에서 아래와 비슷한 것을 보게 될 것입니다 (명확성을 위해 일부 수정된):
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```
'transaction wide comput cap'이 자동으로 활성화되어 있기 때문에, 우리는 첫 Transaction의 200_000 CU부터 다운되는 각 Instruction을 볼 수 있습니다.


### Selective features deactivated
1. 우리는 CU budget 행위가 devnet에 있는 것처럼 실행하고 싶습니다. [Feature Status](#feature-status)에 설명된 도구를 사용해서 `transaction wide compute cap` public key를 고립시키고 test validator를 시작할 떄 `transaction wide compute cap` 옵션을 사용할 것입니다.

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. 우리는 이제 Instruction들이 각자의 200_000 budget을 갖고 있는 것을 볼 수 있습니다. 이것은 모든 upstream cluster들의 현재 상태입니다.
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Full Parity Testing
당신은 `solana-test-validator`를 실행할 때 `--deactivate-feature <FEATURE_PUBKEY>`를 추가하고 아직 활성화되지 않은 가 기능들을 식별하면서 특정 cluster와 완전히 같게 할 수 있습니다.
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

대안으로, [scfsd](#resources)는 한 클러스터를 위한 완전히 비활성화된 기능들로 스위치하는 command를 제공합니다.
이것은 `solana-test-validator`를 시작할 때 파라미터로 줍니다.
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

만약 당신이 validator가 실행 중일 때 또 다른 터미널을 열고 `solana feature status`를 실행하면, 당신은 devnet에서 비활성화된 기능들을 볼 것입니다.

## Full Parity Testing Programmatically
테스트 코드 내에서 test validator 실행을 다루는 사람들을 위해, TestValidatorGenesis를 사용해서 test validator의 activated/deactivated 기능을 수정하는 것이 가능합니다. Solana 1.9.6에서 이것을 지원하기 위한 function이 validator에 추가됐습니다.

프로그램의 루트 폴더에서 `tests` 폴더를 새로 생성하고 `parity_test.rs` 파일을 추가합니다.
여기 각 테스트를 위한 자주 사용되는 함수들이 있습니다

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

우리는 이제 `mod test {...}`의 바디에 모든 기능이 활성화된 기본 validator 세팅과 이전 예제에서 command line에서 `solana-test-validator`를 실행함으로써 `transaction wide compute cap`을 비활성화한 테스트를 위한 함수들을 추가할 수 있습니다.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

대안으로 [scfs engine gadget](#resources)은 특정 cluster에 비활성화된 모든 기능들의 전체 벡터를 만들 수 있습니다.
아래는 devnet에서 비활성화된 기능들을 얻기 위해 이 엔진을 사용한 내용입니다.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Happy Testing!


## Resources
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)