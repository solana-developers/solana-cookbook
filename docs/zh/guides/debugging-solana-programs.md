---
title: 调试 Solana 程序
head:
  - - meta
    - name: title
      content: Solana秘籍 | 调试 Solana 程序
  - - meta
    - name: og:title
      content: Solana秘籍 | 调试 Solana 程序
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

# 调试 Solana 程序

有许多选项和支持工具可用于测试和调试Solana程序。

## 综述

::: tip 事实表 
- `solana-program-test`  包可以使用基本的本地运行时，在其中可以交互式地测试和调试程序（例如在 vscode 中）。
- `solana-validator` 包可以使用`solana-test-validator`实现进行更可靠的测试，该测试发生在本地验证器节点上。你可以从编辑器中运行，但是程序中的断点将被忽略。
- CLI工具`solana-test-validator` 可以从命令行运行和加载你的程序，并处理来自命令行 Rust 应用程序或使用 web3 的 JavaScript/TypeScript 应用程序的事务执行。 
- 对于上述所有情况，建议在开始时大量使用`msg!`宏进行输出，然后在测试和确保行为稳定后将其移除。请记住，`msg!` 会消耗计算单位，如果达到计算单位的预算限制，最终可能导致程序失败。
:::

按照以下步骤使用 [solana-program-bpf-template](#resources)。将其克隆到你的计算机上：
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## 在编辑器中进行运行时测试和调试

打开文件 `src/lib.rs`

你会看到该程序非常简单，基本上只是记录程序入口函数`process_instruction`接收到的内容。

1.转到 `#[cfg(test)]` 部分，并点击`Run Tests`。这将构建程序，然后执行 `async fn test_transaction()` 测试。你将在 `vscode` 终端中看到简化的日志消息。
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2.在程序的第11行（`msg!`行）上设置一个断点。
3. 返回测试模块，点击`Debug`，几秒钟后调试器会在断点处停下，现在你可以检查数据、逐步执行函数等等。

这些测试也可以通过命令行运行：`cargo test` 或 `cargo test-bpf`。当然，任何断点都会被忽略。

多酷啊！

:::tip 请注意
你并没有使用验证节点，因此默认的程序、区块哈希等在验证节点中的行为可能与你的运行结果不同。这就是 Solana 团队为我们提供本地验证节点测试的原因！
:::


## 在编辑器中进行本地验证节点测试

在 `tests/integration.rs` 文件中，定义了使用程序加载本地验证节点进行集成测试。

默认情况下，模板仓库的集成测试只能通过命令行使用 `cargo test-bpf` 运行。以下步骤将使你能够在编辑器中运行测试，并显示程序的验证节点日志和 `msg!` 输出：

1. 在仓库目录中运行 `cargo build-bpf` 来构建示例程序
2. 在编辑器中打开 `tests/integration.rs` 文件
3. 将第 1 行注释掉 -> `// #![cfg(feature = "test-bpf")]`
4. 在第 19 行将其修改为：`.add_program("target/deploy/bpf_program_template", program_id)`
5. 在第 22 行插入以下内容`solana_logger::setup_with_default("solana_runtime::message=debug");`
6. 点击在 `test_validator_transaction()` 函数上方的 `Run Test`


这将加载验证节点，然后允许您构建一个交易（按照 Rust 的方式），并使用`RpcClient`提交给节点。

程序的输出也将打印在编辑器的终端中。例如（简化）：
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
在这里进行调试将允许你调试测试主体中使用的函数和方法，但不会在你的程序中设置断点。

非常出色，不是吗？

## 从客户端应用程序进行本地验证节点测试
最后，你可以从命令行启动一个本地验证节点，并使用`solana-test-validator`加载你的程序和任何账户。

在这种方法中，你需要一个客户端应用程序，可以使用Rust的 [RcpClient](#resources)，也可以使用
[JavaScript or Typescript clients](#resources)的客户端。

有关更多详细信息和选项，请参阅`solana-test-validator --help`。对于这个示例程序，以下是基本设置：

1. 在存储库文件夹中打开一个终端
2. 运行`solana config set -ul`命令，将配置设置为指向本地
3. 运行`solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. 打开另一个终端并运行`solana logs`以启动日志流
5. 然后，你可以运行客户端程序，并在您启动日志流的终端中观察程序输出

那可真是太棒了！

## 资料
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
