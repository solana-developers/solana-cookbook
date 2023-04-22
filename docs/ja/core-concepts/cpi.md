---
title: プログラム間呼び出し(CPI)
head:
  - - meta
    - name: title
      content: Solana Cookbook | CPIs
  - - meta
    - name: og:title
      content: Solana Cookbook | CPIs
  - - meta
    - name: description
      content: CPIs enable programs to call instructions on other programs, allowing for the composability of Solana programs. Learn about CPIs and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: CPIs enable programs to call instructions on other programs, allowing for the composability of Solana programs. Learn about CPIs and more Core Concepts at The Solana cookbook.
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

# プログラム間呼び出し(CPI)

 プログラム間呼び出し(Cross-Program Invocation/CPI) あるプログラムから別のプログラムへの直接呼び出しで、Solanaプログラムの構成可能性を高めることができます。クライアントが JSON RPC を使用して任意のプログラムを呼び出すことができるように、任意のプログラムが CPI を介して他のプログラムを呼び出すことができます。CPI は基本的に、Solana エコシステム全体を開発者が自由に使える1つの巨大なAPIに変えます。

このセクションの目的は、高レベルの概要CPIを提供することです。詳細な説明、例、チュートリアルについては、以下のリンク先のリソースを参照してください。

## 概要

::: tip Fact Sheet
- プログラム間呼び出し（CPI）は、呼び出されているプログラムの特定の命令を対象とした、あるプログラムから別のプログラムへの呼び出しです。
- CPI を使用すると、呼び出し元プログラムは署名者特権を呼び出し先プログラムに拡張できます。
- プログラムは、命令内で`invoke`または`invoke_signed`を使用してCPIを実行できます。
- `invoke`は、PDAが署名者として機能する必要なく、呼び出しの前に必要なすべての署名にアクセスできる場合に使用されます。
- `invoke_signed`は、呼び出しプログラムからのPDAがCPIの署名者として必要な場合に使用されます。
- 別のプログラムに対してCPIが作成された後、呼び出し先プログラムは最大深さ4まで他のプログラムに対してさらにCPIを作成できます。
:::

## 詳細

プログラム間呼び出し(CPI) は、Solanaプログラムの構成可能性を高め、開発者が既存のプログラムの命令を利用して構築できるようにします。

CPI を実行するには、`solana_program`クレートにある[invoke](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke.html)メソッド、または[invoke_signed](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke_signed.html)メソッドを利用します。

```rust
// Used when there are not signatures for PDAs needed
pub fn invoke(
    instruction: &Instruction,
    account_infos: &[AccountInfo<'_>]
) -> ProgramResult

// Used when a program must provide a 'signature' for a PDA, hence the signer_seeds parameter
pub fn invoke_signed(
    instruction: &Instruction,
    account_infos: &[AccountInfo<'_>],
    signers_seeds: &[&[&[u8]]]
) -> ProgramResult
```

CPI を作成するには、呼び出されるプログラムで命令を指定および構築し、その命令に必要なアカウントのリストを提供する必要があります。署名者としてPDAが必要な場合は、`invoke_signed`を使用するときに`signers_seeds`も指定する必要があります。

### `invoke`を用いたCPI

`invoke`は、署名者として機能する PDA を必要としない CPI を作成するときに使用されます。CPIを作成するとき、Solanaランタイムは、プログラムに渡された元の署名を呼び出し先プログラムに拡張します。

```rust
invoke(
    &some_instruction,                           // instruction to invoke
    &[account_one.clone(), account_two.clone()], // accounts required by instruction
)?;
```

### `invoke_signed`を用いたCPI

署名者としてPDAを必要とするCPIを作成するには、`invoke_signed`関数を使用し、必要なシードを提供して呼び出しプログラムの必要なPDAを導出します。

```rust
invoke_signed(
    &some_instruction,                   // instruction to invoke
    &[account_one.clone(), pda.clone()], // accounts required by instruction, where one is a pda required as signer
    &[signers_seeds],                    // seeds to derive pda
)?;
```

PDA には独自の秘密鍵はありませんが、CPI を介して命令で署名者として機能することができます。PDAが呼び出しプログラムに属していることを確認するには、署名者として必要なPDAを生成するために使用されるシードを、`signers_seeds`として含める必要があります。

Solanaランタイムは、提供されたシードと呼び出しプログラムの`program_id`を使用して`create_program_address`を内部的に呼び出します。結果のPDAは、命令で提供されたアドレスと比較されます。一致する場合、PDAは有効な署名者と見なされます。

### CPI `Instruction`

呼び出しを行っているプログラムによっては、`Instruction`を作成するためのヘルパー関数を備えたクレートが利用できる場合があります。多くの個人や組織は、プログラムの呼び出しを簡素化するために、これらの種類の関数を公開するプログラムと一緒に、公開されているクレートを作成しています。

CPI に必要な`Instruction`タイプの定義には、以下が含まれます:

- `program_id` - 命令を実行するプログラムの公開鍵
- `accounts` - 命令の実行中に読み書きできるすべてのアカウントのリスト
- `data` -  instructionが必要とする命令データ

```rust
pub struct Instruction {
    pub program_id: Pubkey,
    pub accounts: Vec<AccountMeta>,
    pub data: Vec<u8>,
}
```

`AccountMeta`構造体には次の定義があります:

```rust
pub struct AccountMeta {
    pub pubkey: Pubkey,
    pub is_signer: bool,
    pub is_writable: bool,
}
```

CPIを作成するときは、次の構文を使用して各アカウントの`AccountMeta`を指定します:

- `AccountMeta::new` - 書き込み可能である
- `AccountMeta::new_readonly` - 書き込み**不可**
- `(pubkey, true)` - アカウントが署名者である
- `(pubkey, false)` - アカウントが署名者**でない**

以下はその一例です:

```rust
use solana_program::instruction::AccountMeta;

let account_metas = vec![
    AccountMeta::new(account1_pubkey, true),
    AccountMeta::new(account2_pubkey, false),
    AccountMeta::new_readonly(account3_pubkey, false),
    AccountMeta::new_readonly(account4_pubkey, true),
]
```

### CPI `AccountInfo`
`invoke`および`invoke_signed`を使用するには、`account_infos`のリストも必要です。命令の`AccountMeta`のリストと同様に、呼び出しているプログラムが読み書きする各アカウントのすべての`AccountInfo`を含める必要があります。

参考までに、`AccountInfo`構造体には次の定義があります:

```rust
/// Account information
#[derive(Clone)]
pub struct AccountInfo<'a> {
    /// Public key of the account
    pub key: &'a Pubkey,
    /// Was the transaction signed by this account's public key?
    pub is_signer: bool,
    /// Is the account writable?
    pub is_writable: bool,
    /// The lamports in the account.  Modifiable by programs.
    pub lamports: Rc<RefCell<&'a mut u64>>,
    /// The data held in this account.  Modifiable by programs.
    pub data: Rc<RefCell<&'a mut [u8]>>,
    /// Program that owns this account
    pub owner: &'a Pubkey,
    /// This account's data contains a loaded program (and is now read-only)
    pub executable: bool,
    /// The epoch at which this account will next owe rent
    pub rent_epoch: Epoch,
}
```

[Clone](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html#impl-Clone-for-AccountInfo%3C'a%3E)トレイトを使用して、必要なアカウントごとに`AccountInfo`のコピーを作成できます。これは`solana_program`クレートの[AccountInfo](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html)構造体に実装されています。

```rust
let accounts_infos = [
    account_one.clone(),
    account_two.clone(),
    account_three.clone(),
];
```

このセクションではCPIの概要を説明しましたが、より詳細な説明、例、チュートリアルについては、以下のリンク先のリソースを参照してください。

## その他参考資料
- [Official Documentation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations)
- [Solana Cookbook Reference](https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation)
- [Solana Course Native CPI Lesson](https://www.soldev.app/course/cpi)
- [Solana Course Anchor CPI Lesson](https://www.soldev.app/course/anchor-cpi)
- [Solana Developers Program Examples](https://github.com/solana-developers/program-examples/tree/main/basics/cross-program-invocation)
