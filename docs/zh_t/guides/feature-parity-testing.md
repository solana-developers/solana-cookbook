---
title: 功能相等测试 
head:
  - - meta
    - name: title
      content: Solana秘籍 | 功能相等测试 
  - - meta
    - name: og:title
      content: Solana秘籍 | 功能相等测试 
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

# 功能相等测试 

当测试程序时，确保它在各个集群中以相同的方式运行对于确保质量和产生预期结果非常重要。

## 综述

::: tip 事实表
- 功能是为 Solana 验证节点引入的能力，需要激活才能使用。
- 某个集群（例如测试网）中可能激活了某些特性，而另一个集群（例如主网测试网）则未激活。
- 然而，在本地运行默认的`solana-test-validator`时，你的 Solana 版本中的所有可用功能都会自动激活。结果是，在本地测试时，特性和测试结果可能与在不同集群中部署和运行时不同！
:::

## 场景 

假设你有一个包含三（3）条指令的交易，每个指令大约消耗 100,000 计算单元（Compute Units，CU）。在运行 Solana 1.8.x 版本时，你会观察到指令的计算单元消耗类似于：

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

在 Solana 1.9.2 中引入了一个名为“transaction wide compute cap”的功能，其中默认情况下，一个交易具有 200,000 计算单元（CU）的预算，封装的指令从该交易预算中消耗。运行上述相同的交易将会有非常不同的行为：

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

天哪！如果你不知道这一点，你可能会感到沮丧，因为你的指令行为没有任何变化会导致这种情况。在开发网络上它正常工作，但在本地却失败了？！？

你可以增加整体交易预算，比如将其增加到 300,000 计算单元（CU），来保持你的理智，但这也展示了为什么以功能相等的方式进行测试是避免任何混淆的积极方式。

## 功能状态
使用`solana feature status`命令可以很容易地检查特定集群启用了哪些功能。
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

或者，你可以使用类似的工具，像 [scfsd](#resources)，观察所有集群上的功能状态。该工具会显示如下的部分屏幕内容，并且不需要`solana-test-validator`运行：

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## 功能相等测试

正如前面提到的，`solana-test-validator` 会自动激活所有功能。所以回答问题“如何在本地测试环境中与 devnet、testnet 或者 mainnet-beta 保持一致？”的解决方案是：Solana 1.9.6 添加了 PR 来允许禁用功能：

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## 简单演示
假设你有一个简单的程序，在其入口点中记录接收到的数据。你正在测试一个包含两（2）个指令的事务，用于执行你的程序。

### 所有功能已激活
1. 你在一个终端中启动测试验证节点：

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. 在另一个终端中启动日志流处理器：
```console
solana logs
```

3. 然后运行你的事务。你会在日志终端中看到类似的输出（为了清晰起见进行了编辑）：
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
因为我们的功能“事务整体计算容量”默认情况下是自动激活的，我们观察到每个指令从起始事务预算的 200,000 CU 中消耗 CU。

### 选择性功能已停用
1. 在这次运行中，我们希望使 CU 预算的行为与 devnet 中运行的行为保持一致。使用 Feature Status 中描述的工具，我们可以找到`transaction wide compute cap`的公钥，并在测试验证器启动时使用 `--deactivate-feature` 参数。

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. 现在我们可以在日志中看到我们的指令现在拥有自己的 200,000 CU 预算（为了清晰起见进行了编辑），这目前是所有上游集群的状态。
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

## 全面相等性测试
你可以通过识别尚未激活的每个功能，并在调用`solana-test-validator`时添加`--deactivate-feature <FEATURE_PUBKEY>`来与特定集群完全保持一致。
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

或者，scfsd](#resources) 提供了一个命令开关，用于输出集群的完整停用功能集，可以直接用于`solana-test-validator`的启动参数：
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

如果你在验证器运行时打开另一个终端，并运行`solana feature status`命令，你会看到一些在 devnet 中停用的功能也被停用了。

## 以编程方式进行全面相等性测试
对于那些在测试代码中控制运行测试验证器的人来说，可以使用`TestValidatorGenesis`来修改测试验证器的激活/停用功能。在 Solana 1.9.6 中，验证器构建器添加了一个函数来支持这个功能。

在您的程序文件夹的根目录下，创建一个名为`tests`的新文件夹，并添加一个`parity_test.rs`文件。以下是每个测试使用的基本函数（模板函数）：
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

现在我们可以在`mod test {...}`的主体中添加测试函数，来展示默认验证器的设置（所有功能都启用），然后禁用事务广域计算限制，就像之前在命令行中运行`solana-test-validator`的示例一样。

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

另外，[scfs engine gadget](#resources)可以生成一个包含某个集群的所有已停用功能的完整向量。以下示例演示了如何使用该 engine 来获取 devnet 的所有已停用功能列表。

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


愉快的测试！


## 资料
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)