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

There are a number of options and supporting tools for testing and debugging a Solana program.

## Facts

::: tip Fact Sheet
- The crate `solana-program-test` enables use of bare bones **_local runtime_** where you can test and debug
your program interactively (e.g. in vscode).
- The crate `solana-validator` enables use of the `solana-test-validator` implementation for more robust
testing that occurs on a **_local validator node_**. You can run from the editor **_but breakpoints in the
program are ignored_**.
- The CLI tool `solana-test-validator` runs and loads your program and processes transaction execution from
command line Rust applications or Javascript/Typescript applications using web3.
- For all the above, liberal use of `msg!` macro in your program is recommended at the start and then
removing them as you test and ensure rock solid behavior. Remember that `msg!` consumes Compute Units which
can eventually fail your program by hitting the Compute Unit budget caps.
:::

The steps in the following sections use the [solana-program-bpf-template](#resources). Clone that to your
machine:
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Runtime Testing and Debugging in editor

Open the file `src/lib.rs`

You'll see that the program is a pretty simple and basically just logs the content received by
the program entrypoint function: `process_instruction`

1. Go to the `#[cfg(test)]` section and click `Run Tests`. This will build the program and then
execute the `async fn test_transaction()` test. You will see the log messages (simplified) in the vscode terminal below
the source.
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. Set a breakpoint on the programs `msg!` line (11)
3. Back in the test module, click `Debug` and within seconds the debugger will stop on the breakpoint and
now you can examine data, step through functions, etc., etc..

These tests are also run from the command line with:
`cargo test` or `cargo test-bpf`. Of course any breakpoints will be ignored.

How groovy can you get!

:::tip Note
Keep in mind you are not using a validator node so default programs, blockhashes, etc. are not represented or
will not behave as they would when running in validator node. This is why the gang at Solana gave us
Local Validator Node testing!
:::


## Local Validator Node Testing in editor

Integration testing using programmatic loading of a local validator node is defined in the
`tests/integration.rs` file.

By default, the template repo integration tests will only be runnable from the command line
using `cargo test-bpf`. The following steps will enable you to run within the editor as well
as displaying program validator logs and `msg!` outputs from your program:

1. In the repo directory run `cargo build-bpf` to build the sample program
2. In the editor, open `tests/integration.rs`
3. Comment out line 1 -> `// #![cfg(feature = "test-bpf")]`
4. On line 19 change it to read: `.add_program("target/deploy/bpf_program_template", program_id)`
5. Insert the following at line 22 `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. Click `Run Test` above the `test_validator_transaction()` function

This will load the validator node then allowing you to construct a transaction (the Rust way) and
submit to the node using the `RcpClient`.

The program's output will also print out in the editor terminal. For example (simplified):
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
Debugging here will allow you to debug the functions and methods used in the **_test body_** but will
not breakpoint in your program.

The bee's knees eh?

## Local Validator Node Testing from Client Apps
Lastly, you can start a local validating node and load your program and any accounts using the `solana-test-validator`
from the command line.

In this approach, you will need a client application either using Rust [RcpClient](#resources) or in
[JavaScript or Typescript clients](#resources)

See `solana-test-validator --help` for more details and options. For the example program here is vanilla setup:
1. Open a terminal in the repo folder
2. Run `solana config set -ul` to set the configuration to point to local
3. Run `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. Open another terminal and run `solana logs` to start the log streamer
5. You can then run your client program and observe program output in the terminal where you started the log streamer

Now that is the cat's pajamas YO!

## Resources
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
