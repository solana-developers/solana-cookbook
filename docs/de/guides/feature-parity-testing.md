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

When testing your program, assurances that it will run the same in various clusters is essential to both quality and
producing expected outcomes.

## Facts

::: tip Fact Sheet
- Features are capabilities that are introduced to Solana validators and require activation to be used.
- Features may be activated in one cluster (e.g. testnet) but not so in another (e.g. mainnet-beta).
- However; when running default `solana-test-validator` locally, all available features in your
Solana version are automagically activated. The result is that when testing locally, the capabilities and results of
your testing may not be the same when deploying and running in a different cluster!
:::

## Scenario
Assume you have a Transaction that contained three (3) instructions and each instruction consumes approximately
100_000 Compute Units (CU). When running in a Solana 1.8.x version, you would observe your instruction CU consumption similar to:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

In Solana 1.9.2 a feature called 'transaction wide compute cap' was introduced where a Transaction, by default,
has a 200_000 CU budget and the encapsulated instructions **_draw down_** from that Transaction budget. Running the same
transaction as noted above would have very different behavior:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

Yikes! If you were unaware of this you'd likely be frustrated as there was no change to your instruction behavior that
would cause this. In devnet it worked fine, but locally it was failing?!?

There is the ability to increase the overall Transaction budget, to lets say 300_000 CU, and salvage your sanity
but this demonstrates why testing with **_Feature Parity_** provides a proactive way to avoid any confusion.

## Feature Status
It is fairly easy to check what features are enabled for a particular cluster with the `solana feature status` command.
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

Alternatively, you could use a tool like [scfsd](#resources) to observe all feature state across clusters
which would display, partial screen shown here, and does not require `solana-test-validator` to be running:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Parity Testing
As noted above, the `solana-test-validator` activates **all** features automagically.
So to answer the question "How can I test locally in an environment that has parity with devnet,
testnet or even mainnet-beta?".

Solution: PRs were added to Solana 1.9.6 to allow deactivation of features:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Simple Demonstration
Suppose you have a simple program that logs the data it receives in it's entry-point. And you are
testing a transaction that adds two (2) instructions for your program.

### All features activated
1. You start the test validator in one terminal:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. In another terminal you start the log streamer:
```console
solana logs
```

3. You then run your transaction. You would see something similar in the log terminal (edited for clarity):
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
Because our feature 'transaction wide compute cap' is automatically activated by default, we observe each
instruction drawing down CU from the starting Transaction budget of 200_000 CU.

### Selective features deactivated
1. For this run, we want to run so that the CU budget behavior is in parity with what is running in devnet. Using
the tool(s) described in [Feature Status](#feature-status) we isolate the `transaction wide compute cap` public key
and use the `--deactivate-feature` on the test validator startup

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. We now see in our logs that our instructions now have their own 200_000 CU budget (edited for clarity) which is
currently the state in all upstream clusters:
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
You can be in full parity with a specific cluster by identifying each feature that is not
yet activated and add a `--deactivate-feature <FEATURE_PUBKEY>` for each when invoking `solana-test-validator`:
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Alternatively, [scfsd](#resources) provides a command switch to output the complete deactivated feature
set for a cluster to feed directly into the `solana-test-validator` startup:
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

If you open another terminal, while the validator is running, and `solana feature status` you will see
features deactivated that were found deactivated in devnet

## Full Parity Testing Programmatically
For those who control running the test validator within their test code, modifying
the test validator activated/deactivated features is possible using TestValidatorGenesis. With
Solana 1.9.6 a function has been added to the validator builder to support this.

At the root of your program folder, create a new folder called `tests` and add a `parity_test.rs`
file. Here is the boiler place functions (boiler-plate if you will) used by each test

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

We can now add test functions in the body of `mod test {...}` to demonstrate default
validator setup (all features enabled) and then disabling the `transaction wide compute cap` as
per previous examples running `solana-test-validator` from the command line.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

Alternatively, the [scfs engine gadget](#resources) can produce a full vector of deactivated
features for a cluster. The following demonstrates using that engine to get a list
of all deactivated features for devnet.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Happy Testing!


## Resources
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)