---
title: Debugging Solana Programs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Debugging Solana Programs
  - - meta
    - name: og:title
      content: Solana Cookbook | Debugging Solana Programs
  - - meta
    - name: description
      content: There are a number of options and supporting tools for testing and debugging a Solana BPF program.
  - - meta
    - name: og:description
      content: There are a number of options and supporting tools for testing and debugging a Solana BPF program.
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

# Debugging Solana Programs

Solana Program을 테스트하고 디버깅하기 위한 몇 가지 선택지와 도구들이 존재합니다.

## Facts

::: tip Fact Sheet
- crate `solana-program-test`는 당신의 프로그램을 interatively 테스트하고 디버깅 할 수 있게 하는 **_local runtime_** 사용을 가능하게 해줍니다. (e.g. in vscode).
- crate `solana-validator`는 **_local validator node_**에서 일어나는 더 완성된 테스트를 위한 `solana-test-validator` 구현의 사용을 가능하게 해줍니다.
- CLI tool `solana-test-validator`는 당신의 프로그램을 실행시키고 command line Rust Application 또는 web3를 사용하는 Javascript/Typescript Application 으로부의 Transaction을 처리합니다.
위 보든 것들을 위해, 먼저 당신의 Program에서`msg!` 매크로 사용하시고 테스트 함에 따라 그것들을 지우길 추천합니다.
`msg!`가 컴퓨터 자원을 소비한다는 것을 기억하세요. 갑자기 당신의 프로그램을 실패하게 만들 수 있습니다.
:::

아래 섹션의 단계들은 [solana-program-bpf-template](#resources)를 사용합니다.
당신의 컴퓨터에 Clone 하세요:
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Runtime Testing and Debugging in editor

Open the file `src/lib.rs`

당신은 이 프로그램이 되게 단순하고 단지 Program entrypoint function인 `process_instruction`에 의해 수신된 내용을 기록하는 것임을 알 수 있습니다.

1. `#[cfg(test)]` 섹션으로 가서 `Run Tests`를 클릭하세요. 이것은 Program을 빌드할 것이고 `async fn test_transaction()` 테스트를 실행할 것입니다.
당신은 아래에 vscode 터미널에서 로그 메시지들을 볼 것입니다.
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. Program의 `msg!` line (11)에 breakpoint를 거세요.
3. test 모듈로 돌아와, `Debug`를 클릭하면 몇 초 안에 디버거가 breakpoint에서 멈출 것입니다. 그리고 당신은 데이터와 함수들를 포함한 여러가지를 조사해볼 수 있습니다.

이 테스트들은 comman line으로도 실행할 수 있습니다:
`cargo test` or `cargo test-bpf`. 물론 여기에선 breakpoint가 무시됩니다.

:::tip Note
당신이 validator 노드를 사용하고 있지 않다는 것을 명심하세요.
그래서 기본 Program들, blockhash들, 기다 등등은 나타나지 않고 실제 Validator 노드를 실행하고 있을 떄 처럼 행동 하지 않습니다.
This is why the gang at Solana gave us Local Validator Node testing!
:::


## Local Validator Node Testing in editor

local validator node의 자동 로딩을 사용한 통합테스트는 `tests/integration.rs` 파일에 정의되어 있습니다.

기본적으로, template repo 통합 테스트는 command line에서 `cargo test-bpf`를 사용해서만 실행시킬 수 있을 것입니다.
아래 단계들은 당신이 에디터에서 실행하는 것을 가능하게 해줄 뿐만아니라, program validator log들과 `msg!` 결과들을 보여줄 것입니다:

1. 프로젝트 경로에서 샘플 프로그램을 빌드하기 위해 `cargo build-bpf`를 실행하세요.
2. 에디터에서 `tests/integration.rs`를 여세요.
3. line 1을 주석처리하세요. -> `// #![cfg(feature = "test-bpf")]`
4. line 19를 변경하세요: `.add_program("target/deploy/bpf_program_template", program_id)`
5. line 22에 추가하세요. `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. `test_validator_transaction()` 함수 위에 `Run Test`를 클릭하세요.

이것은 validator 노드를 로드할 것이고 당신이 Transaction을 생성하도록 할 것이며 `RpcClient`를 사용해 노드에게 보낼 것입니다.

프로그램의 결과가 역시 에디터의 터미널에 출력될 것입니다. 간단한 예시:
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```
디버깅하는것은 당신이 **_test body_** 에서 사용되는 함수와 메소드들을 디버그하도록 해줄것 이지만 breakpoint는 동작하지 않을 것입니다.

## Local Validator Node Testing from Client Apps
마지막으로, 당신은 comman line의 `solana-test-validator`를 사용해 local validating node를 실행할 수 있고 당신의 프로그램과 Account들을 로드할 수 있습니다.

여기에서 당신은 Rust의 [RcpClient](#resources)를 사용하거나 [JavaScript or Typescript clients](#resources)에 있는 client application이 필요할 것입니다.

`solana-test-validator --help`를 사용하면 더 자세한 내용과 옵션들을 볼 수 있습니다. 예제 프로그램을 위한 단계는 여기있습니다:
1. 프로젝트 경로에서 터미널을 엽니다.
2. local로 설정하기 위해 `solana config set -ul`을 실행합니다.
3. `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`을 실행합니다.
4. 또 다른 터미널을 열고 log streamer를 시작하기 위해 `solana logs`를 실행합니다.
5. 당신은 이제 Client Program을 실행할 수 있고 프로그램 결과를 log streamer를 실행한 터미널에서 확인할 수 있습니다.

## Resources
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
