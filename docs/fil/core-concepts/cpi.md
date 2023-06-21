---
title: Cross Program Invocations (CPIs)
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

# Cross Program Invocations (CPIs)

Ang Cross-Program Invocation (CPI) ay isang direktang tawag mula sa isang programa patungo sa isa pa, na nagbibigay-daan para sa composability ng mga programang Solana. Tulad ng sinumang kliyente na maaaring tumawag sa anumang programa gamit ang JSON RPC, anumang programa ay maaaring tumawag sa anumang iba pang programa sa pamamagitan ng isang CPI. Talagang ginagawa ng mga CPI ang buong Solana ecosystem sa isang higanteng API na magagamit mo bilang isang developer.

Ang layunin ng seksyong ito ay magbigay ng mataas na antas ng pangkalahatang-ideya na mga CPI. Mangyaring sumangguni sa mga naka-link na mapagkukunan sa ibaba para sa mas detalyadong mga paliwanag, halimbawa, at walkthrough.

## Facts

::: tip Fact Sheet
- Ang Cross-Program Invocation (CPI) ay isang tawag mula sa isang programa patungo sa isa pa, na nagta-target ng isang partikular na instruction sa tinatawag na program
- Binibigyang-daan ng mga CPI ang programa sa pagtawag na palawigin ang mga pribilehiyo ng pagpirma nito sa programang tumatawag
- Maaaring magsagawa ng mga CPI ang mga programa gamit ang alinman sa `invoke` o `invoke_signed` sa loob ng kanilang mga instruction
- Ang `invoke` ay ginagamit kapag ang lahat ng kinakailangang lagda ay naa-access bago ang invocation, nang hindi nangangailangan ng mga PDA na kumilos bilang mga pumirma
- Ang `invoke_signed` ay ginagamit kapag ang mga PDA mula sa programa sa pagtawag ay kinakailangan bilang mga pumirma sa CPI
- Pagkatapos maisagawa ang isang CPI sa isa pang programa, ang program na tumatawag ay maaaring gumawa ng karagdagang mga CPI sa iba pang mga programa, hanggang sa maximum na lalim na 4
:::

## Deep Dive

Pinapagana ng Cross Program Invocations (CPIs) ang composability ng mga programang Solana, na nagbibigay-daan sa mga developer na gamitin at bumuo sa pagtuturo ng mga kasalukuyang programa.

Upang magsagawa ng mga CPI, gamitin ang [invoke](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke.html) o [invoke_signed](https://docs.rs/solana-program /latest/solana_program/program/fn.invoke_signed.html) function na makikita sa `solana_program` crate.

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

Upang makagawa ng CPI, kailangan mong tukuyin at bumuo ng isang pagtuturo sa programang ini-invoke at magbigay ng listahan ng mga account na kailangan para sa pagtuturo na iyon. Kung ang isang PDA ay kinakailangan bilang isang pumirma, ang `signers_seeds` ay dapat ding ibigay kapag gumagamit ng `invoke_signed`.

### CPI with `invoke`

Ginagamit ang function na `invoke` kapag gumagawa ng CPI na hindi nangangailangan ng anumang PDA upang kumilos bilang mga pumirma. Kapag gumagawa ng mga CPI, pinapahaba ng runtime ng Solana ang orihinal na lagda na ipinasa sa isang programa sa programa ng callee.

```rust
invoke(
    &some_instruction,                           // instruction to invoke
    &[account_one.clone(), account_two.clone()], // accounts required by instruction
)?;
```

### CPI with `invoke_signed`

Para gumawa ng CPI na nangangailangan ng PDA bilang signer, gamitin ang `invoke_signed` function at ibigay ang mga kinakailangang seed para makuha ang kinakailangang PDA ng calling program.

```rust
invoke_signed(
    &some_instruction,                   // instruction to invoke
    &[account_one.clone(), pda.clone()], // accounts required by instruction, where one is a pda required as signer
    &[signers_seeds],                    // seeds to derive pda
)?;
```

Bagama't walang sariling mga pribadong susi ang mga PDA, maaari pa rin silang kumilos bilang isang lumagda sa isang pagtuturo sa pamamagitan ng CPI. Para ma-verify na ang isang PDA ay kabilang sa calling program, ang mga seed na ginamit upang bumuo ng PDA na kinakailangan bilang isang signer ay dapat isama bilang `signers_seeds`.

Ang runtime ng Solana ay panloob na tatawag sa `create_program_address` gamit ang mga seed na ibinigay at ang `program_id` ng calling program. Ang resultang PDA ay ihahambing sa mga address na ibinigay sa pagtuturo. Kung may tugma, ang PDA ay itinuturing na isang wastong pumirma.

### CPI `Instruction`

Depende sa program kung saan ka tumatawag, maaaring mayroong available na crate na may mga function ng helper para sa paggawa ng `Instruction`. Maraming indibidwal at organisasyon ang gumagawa ng mga crates na available sa publiko kasama ng kanilang mga programa na naglalantad ng mga ganitong uri ng mga function upang pasimplehin ang pagtawag sa kanilang mga programa.

Ang kahulugan ng uri ng `Pagtuturo` na kinakailangan para sa isang CPI ay kinabibilangan ng:

- `program_id` - ang pampublikong key ng program na nagsasagawa ng pagtuturo
- `accounts` - isang listahan ng lahat ng account na maaaring basahin o sulatan sa panahon ng pagpapatupad ng pagtuturo
- `data` - ang data ng pagtuturo na kinakailangan ng pagtuturo

```rust
pub struct Instruction {
    pub program_id: Pubkey,
    pub accounts: Vec<AccountMeta>,
    pub data: Vec<u8>,
}
```

The `AccountMeta` struct has the following definition:

```rust
pub struct AccountMeta {
    pub pubkey: Pubkey,
    pub is_signer: bool,
    pub is_writable: bool,
}
```

Kapag gumagawa ng CPI, gamitin ang sumusunod na syntax upang tukuyin ang `AccountMeta` para sa bawat account:

- `AccountMeta::new` - nagsasaad ng maisusulat
- `AccountMeta::new_readonly` - nagsasaad ng *hindi* masusulat
- `(pubkey, true)` - nagsasaad na ang account ay lumagda
- `(pubkey, false)` - nagsasaad na ang account ay *hindi* pumirma

Narito ang isang halimbawa:

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

Para magamit ang `invoke` at `invoke_signed`, kailangan din ng listahan ng `account_infos`. Katulad ng listahan ng `AccountMeta` sa pagtuturo, kailangan mong isama ang lahat ng `AccountInfo` ng bawat account kung saan babasahin o susulatan ng program na iyong tinatawagan.

Para sa sanggunian, ang `AccountInfo` struct ay may sumusunod na kahulugan:

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

Maaari kang lumikha ng kopya ng `AccountInfo` para sa bawat kinakailangang account gamit ang [Clone](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html#impl-Clone-for-AccountInfo%3C'a%3E) na katangian, na ipinatupad para sa [AccountInfo](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html) struct sa `solana_program` crate .

```rust
let accounts_infos = [
    account_one.clone(),
    account_two.clone(),
    account_three.clone(),
];
```

Bagama't ang seksyong ito ay nagbigay ng mataas na antas na pangkalahatang-ideya ng mga CPI, ang mga mas detalyadong paliwanag, halimbawa, at walkthrough ay makikita sa mga naka-link na mapagkukunan sa ibaba.

## Other Resources
- [Official Documentation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations)
- [Solana Cookbook Reference](https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation)
- [Solana Course Native CPI Lesson](https://www.soldev.app/course/cpi)
- [Solana Course Anchor CPI Lesson](https://www.soldev.app/course/anchor-cpi)
- [Solana Developers Program Examples](https://github.com/solana-developers/program-examples/tree/main/basics/cross-program-invocation)
