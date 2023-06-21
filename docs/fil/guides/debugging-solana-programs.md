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

# Pagde-debug ng Mga Programang Solana

Mayroong ilang mga opsyon at pansuportang tool para sa pagsubok at pag-debug ng isang Solana program.

## Mga Katotohanan

::: tip Fact Sheet
- Ang crate `solana-program-test` ay nagbibigay-daan sa paggamit ng mga walang laman na buto **_local runtime_** kung saan maaari mong subukan at i-debug
interactive ang iyong programa (hal. sa vscode).
- Ang crate `solana-validator` ay nagbibigay-daan sa paggamit ng `solana-test-validator` na pagpapatupad para sa mas matatag
pagsubok na nangyayari sa isang **_local validator node_**. Maaari kang tumakbo mula sa editor **_ngunit breakpoints sa
hindi pinapansin ang programa_**.
- Ang CLI tool na `solana-test-validator` ay nagpapatakbo at naglo-load ng iyong programa at nagpoproseso ng pagpapatupad ng transaksyon mula sa
command line Rust application o Javascript/Typescript application gamit ang web3.
- Para sa lahat ng nasa itaas, ang liberal na paggamit ng `msg!` na macro sa iyong programa ay inirerekomenda sa simula at pagkatapos
inaalis ang mga ito habang sinusubok mo at tinitiyak ang solidong gawi. Tandaan na ang `msg!` ay gumagamit ng Compute Units na
maaaring tuluyang mabigo ang iyong programa sa pamamagitan ng pagpindot sa mga limitasyon ng badyet ng Compute Unit.
:::

Ang mga hakbang sa mga sumusunod na seksyon ay gumagamit ng [solana-program-bpf-template](#resources). I-clone iyon sa iyo
makina:
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Runtime Testing at Debugging sa editor

Buksan ang file na `src/lib.rs`

Makikita mo na ang programa ay medyo simple at karaniwang nag-log lamang ng nilalaman na natanggap ni
ang function ng entrypoint ng programa: `process_instruction`

1. Pumunta sa seksyong `#[cfg(test)]` at i-click ang `Run Tests`. Ito ang bubuo ng programa at pagkatapos
isagawa ang `async fn test_transaction()` na pagsubok. Makikita mo ang mga log message (pinasimple) sa vscode terminal sa ibaba
ang pinagmulan.
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. Magtakda ng breakpoint sa mga programang `msg!` na linya (11)
3. Bumalik sa test module, i-click ang `Debug` at sa loob ng ilang segundo ay titigil ang debugger sa breakpoint at
ngayon ay maaari mong suriin ang data, hakbang sa pamamagitan ng mga function, atbp.

Ang mga pagsubok na ito ay pinapatakbo din mula sa command line na may:
`cargo test` o `cargo test-bpf`. Siyempre, ang anumang mga breakpoint ay hindi papansinin.

Gaano ka ka-groovy!

:::tip Tandaan
Tandaan na hindi ka gumagamit ng validator node kaya ang mga default na programa, blockhashes, atbp. ay hindi kinakatawan o
ay hindi kikilos tulad ng gagawin nila kapag tumatakbo sa validator node. Ito ang dahilan kung bakit kami binigyan ng gang sa Solana
Pagsubok sa Lokal na Validator Node!
:::


## Lokal na Validator Node Testing sa editor

Ang integration testing gamit ang programmatic loading ng isang lokal na validator node ay tinukoy sa
`tests/integration.rs` file.

Bilang default, ang mga pagsubok sa pagsasama ng template repo ay maipapatakbo lamang mula sa command line
gamit ang `cargo test-bpf`. Ang mga sumusunod na hakbang ay magbibigay-daan sa iyo na tumakbo sa loob ng editor din
bilang pagpapakita ng mga log ng validator ng program at mga output ng `msg!` mula sa iyong programa:

1. Sa repo directory patakbuhin ang `cargo build-bpf` para buuin ang sample program
2. Sa editor, buksan ang `tests/integration.rs`
3. Magkomento sa linya 1 -> `// #![cfg(feature = "test-bpf")]`
4. Sa linya 19 baguhin ito upang mabasa: `.add_program("target/deploy/bpf_program_template", program_id)`
5. Ipasok ang sumusunod sa linya 22 `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. I-click ang `Run Test` sa itaas ng `test_validator_transaction()` function

Ilo-load nito ang validator node pagkatapos ay papayagan kang bumuo ng isang transaksyon (ang Rust na paraan) at
isumite sa node gamit ang `RcpClient`.

Ang output ng programa ay magpi-print din sa terminal ng editor. Halimbawa (pinasimple):
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
Ang pag-debug dito ay magbibigay-daan sa iyong i-debug ang mga function at pamamaraan na ginamit sa **_test body_** ngunit gagawin
hindi breakpoint sa iyong programa.

_The bee's knees eh?_

## Lokal na Validator Node Testing mula sa Client Apps
Panghuli, maaari kang magsimula ng isang lokal na validating node at i-load ang iyong program at anumang mga account gamit ang `solana-test-validator`
mula sa command line.

Sa diskarteng ito, kakailanganin mo ng client application gamit ang Rust [RcpClient](#resources) o sa
[JavaScript o Typescript client](#resources)

Tingnan ang `solana-test-validator --help` para sa higit pang mga detalye at opsyon. Para sa halimbawang programa narito ang pag-setup ng vanilla:
1. Magbukas ng terminal sa repo folder
2. Patakbuhin ang `solana config set -ul` upang itakda ang configuration upang tumuro sa lokal
3. Patakbuhin ang `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. Magbukas ng isa pang terminal at patakbuhin ang `solana logs` upang simulan ang log streamer
5. Pagkatapos ay maaari mong patakbuhin ang iyong programa ng kliyente at obserbahan ang output ng programa sa terminal kung saan mo sinimulan ang log streamer

Now that is the cat's pajamas YO!

## Resources
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
