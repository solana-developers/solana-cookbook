---
title: 功能相等測試 
head:
  - - meta
    - name: title
      content: Solana祕籍 | 功能相等測試 
  - - meta
    - name: og:title
      content: Solana祕籍 | 功能相等測試
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

# 功能相等測試 

當測試程序時，確保它在各個集羣中以相同的方式運行對於確保質量和產生預期結果非常重要。

## 綜述

::: tip 事實表
- 功能是爲 Solana 驗證節點引入的能力，需要激活才能使用。
- 某個集羣（例如測試網）中可能激活了某些特性，而另一個集羣（例如主網測試網）則未激活。
- 然而，在本地運行默認的`solana-test-validator`時，你的 Solana 版本中的所有可用功能都會自動激活。結果是，在本地測試時，特性和測試結果可能與在不同集羣中部署和運行時不同！
:::

## 場景 

假設你有一個包含三（3）條指令的交易，每個指令大約消耗 100,000 計算單元（Compute Units，CU）。在運行 Solana 1.8.x 版本時，你會觀察到指令的計算單元消耗類似於：

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

在 Solana 1.9.2 中引入了一個名爲“transaction wide compute cap”的功能，其中默認情況下，一個交易具有 200,000 計算單元（CU）的預算，封裝的指令從該交易預算中消耗。運行上述相同的交易將會有非常不同的行爲：

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

天哪！如果你不知道這一點，你可能會感到沮喪，因爲你的指令行爲沒有任何變化會導致這種情況。在開發網絡上它正常工作，但在本地卻失敗了？！？

你可以增加整體交易預算，比如將其增加到 300,000 計算單元（CU），來保持你的理智，但這也展示了爲什麼以功能相等的方式進行測試是避免任何混淆的積極方式。

## 功能狀態
使用`solana feature status`命令可以很容易地檢查特定集羣啓用了哪些功能。
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

或者，你可以使用類似的工具，像 [scfsd](#resources)，觀察所有集羣上的功能狀態。該工具會顯示如下的部分屏幕內容，並且不需要`solana-test-validator`運行：

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## 功能相等測試

正如前面提到的，`solana-test-validator` 會自動激活所有功能。所以回答問題“如何在本地測試環境中與 devnet、testnet 或者 mainnet-beta 保持一致？”的解決方案是：Solana 1.9.6 添加了 PR 來允許禁用功能：

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## 簡單演示
假設你有一個簡單的程序，在其入口點中記錄接收到的數據。你正在測試一個包含兩（2）個指令的事務，用於執行你的程序。

### 所有功能已激活
1. 你在一個終端中啓動測試驗證節點：

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. 在另一個終端中啓動日誌流處理器：
```console
solana logs
```

3. 然後運行你的事務。你會在日誌終端中看到類似的輸出（爲了清晰起見進行了編輯）：
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
因爲我們的功能“事務整體計算容量”默認情況下是自動激活的，我們觀察到每個指令從起始事務預算的 200,000 CU 中消耗 CU。

### 選擇性功能已停用
1. 在這次運行中，我們希望使 CU 預算的行爲與 devnet 中運行的行爲保持一致。使用 Feature Status 中描述的工具，我們可以找到`transaction wide compute cap`的公鑰，並在測試驗證器啓動時使用 `--deactivate-feature` 參數。

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. 現在我們可以在日誌中看到我們的指令現在擁有自己的 200,000 CU 預算（爲了清晰起見進行了編輯），這目前是所有上游集羣的狀態。
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

## 全面相等性測試
你可以通過識別尚未激活的每個功能，並在調用`solana-test-validator`時添加`--deactivate-feature <FEATURE_PUBKEY>`來與特定集羣完全保持一致。
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

或者，scfsd](#resources) 提供了一個命令開關，用於輸出集羣的完整停用功能集，可以直接用於`solana-test-validator`的啓動參數：
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

如果你在驗證器運行時打開另一個終端，並運行`solana feature status`命令，你會看到一些在 devnet 中停用的功能也被停用了。

## 以編程方式進行全面相等性測試
對於那些在測試代碼中控制運行測試驗證器的人來說，可以使用`TestValidatorGenesis`來修改測試驗證器的激活/停用功能。在 Solana 1.9.6 中，驗證器構建器添加了一個函數來支持這個功能。

在您的程序文件夾的根目錄下，創建一個名爲`tests`的新文件夾，並添加一個`parity_test.rs`文件。以下是每個測試使用的基本函數（模板函數）：
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

現在我們可以在`mod test {...}`的主體中添加測試函數，來展示默認驗證器的設置（所有功能都啓用），然後禁用事務廣域計算限制，就像之前在命令行中運行`solana-test-validator`的示例一樣。

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

另外，[scfs engine gadget](#resources)可以生成一個包含某個集羣的所有已停用功能的完整向量。以下示例演示瞭如何使用該 engine 來獲取 devnet 的所有已停用功能列表。

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


愉快的測試！


## 資料
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)