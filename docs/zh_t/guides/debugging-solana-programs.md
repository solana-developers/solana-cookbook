---
title: 調試 Solana 程序
head:
  - - meta
    - name: title
      content: Solana祕籍 | 調試 Solana 程序
  - - meta
    - name: og:title
      content: Solana祕籍 | 調試 Solana 程序
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

# 調試 Solana 程序

有許多選項和支持工具可用於測試和調試Solana程序。

## 綜述

::: tip 事實表 
- `solana-program-test`  包可以使用基本的本地運行時，在其中可以交互式地測試和調試程序（例如在 vscode 中）。
- `solana-validator` 包可以使用`solana-test-validator`實現進行更可靠的測試，該測試發生在本地驗證器節點上。你可以從編輯器中運行，但是程序中的斷點將被忽略。
- CLI工具`solana-test-validator` 可以從命令行運行和加載你的程序，並處理來自命令行 Rust 應用程序或使用 web3 的 JavaScript/TypeScript 應用程序的事務執行。 
- 對於上述所有情況，建議在開始時大量使用`msg!`宏進行輸出，然後在測試和確保行爲穩定後將其移除。請記住，`msg!` 會消耗計算單位，如果達到計算單位的預算限制，最終可能導致程序失敗。
:::

按照以下步驟使用 [solana-program-bpf-template](#resources)。將其克隆到你的計算機上：
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## 在編輯器中進行運行時測試和調試

打開文件 `src/lib.rs`

你會看到該程序非常簡單，基本上只是記錄程序入口函數`process_instruction`接收到的內容。

1.轉到 `#[cfg(test)]` 部分，並點擊`Run Tests`。這將構建程序，然後執行 `async fn test_transaction()` 測試。你將在 `vscode` 終端中看到簡化的日誌消息。
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2.在程序的第11行（`msg!`行）上設置一個斷點。
3. 返回測試模塊，點擊`Debug`，幾秒鐘後調試器會在斷點處停下，現在你可以檢查數據、逐步執行函數等等。

這些測試也可以通過命令行運行：`cargo test` 或 `cargo test-bpf`。當然，任何斷點都會被忽略。

多酷啊！

:::tip 請注意
你並沒有使用驗證節點，因此默認的程序、區塊哈希等在驗證節點中的行爲可能與你的運行結果不同。這就是 Solana 團隊爲我們提供本地驗證節點測試的原因！
:::


## 在編輯器中進行本地驗證節點測試

在 `tests/integration.rs` 文件中，定義了使用程序加載本地驗證節點進行集成測試。

默認情況下，模板倉庫的集成測試只能通過命令行使用 `cargo test-bpf` 運行。以下步驟將使你能夠在編輯器中運行測試，並顯示程序的驗證節點日誌和 `msg!` 輸出：

1. 在倉庫目錄中運行 `cargo build-bpf` 來構建示例程序
2. 在編輯器中打開 `tests/integration.rs` 文件
3. 將第 1 行註釋掉 -> `// #![cfg(feature = "test-bpf")]`
4. 在第 19 行將其修改爲：`.add_program("target/deploy/bpf_program_template", program_id)`
5. 在第 22 行插入以下內容`solana_logger::setup_with_default("solana_runtime::message=debug");`
6. 點擊在 `test_validator_transaction()` 函數上方的 `Run Test`


這將加載驗證節點，然後允許您構建一個交易（按照 Rust 的方式），並使用`RpcClient`提交給節點。

程序的輸出也將打印在編輯器的終端中。例如（簡化）：
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
在這裏進行調試將允許你調試測試主體中使用的函數和方法，但不會在你的程序中設置斷點。

非常出色，不是嗎？

## 從客戶端應用程序進行本地驗證節點測試
最後，你可以從命令行啓動一個本地驗證節點，並使用`solana-test-validator`加載你的程序和任何賬戶。

在這種方法中，你需要一個客戶端應用程序，可以使用Rust的 [RcpClient](#resources)，也可以使用
[JavaScript or Typescript clients](#resources)的客戶端。

有關更多詳細信息和選項，請參閱`solana-test-validator --help`。對於這個示例程序，以下是基本設置：

1. 在存儲庫文件夾中打開一個終端
2. 運行`solana config set -ul`命令，將配置設置爲指向本地
3. 運行`solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. 打開另一個終端並運行`solana logs`以啓動日誌流
5. 然後，你可以運行客戶端程序，並在您啓動日誌流的終端中觀察程序輸出

那可真是太棒了！

## 資料
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
