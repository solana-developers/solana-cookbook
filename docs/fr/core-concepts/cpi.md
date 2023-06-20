---
title: Invocations de Programme Croisé (CPIs)
head:
  - - meta
    - name: title
      content: Solana Cookbook | CPIs
  - - meta
    - name: og:title
      content: Solana Cookbook | CPIs
  - - meta
    - name: description
      content: Les CPI permettent aux programmes d'appeler des instructions d'autres programmes, ce qui permet la composabilité des programmes Solana. Découvrez les CPIs et d'autres concepts fondamentaux dans le Solana Cookbook.
  - - meta
    - name: og:description
      content: Les CPI permettent aux programmes d'appeler des instructions d'autres programmes, ce qui permet la composabilité des programmes Solana. Découvrez les CPIs et d'autres concepts fondamentaux dans le Solana Cookbook.
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

# Invocations de Programme Croisé (CPIs)

Une Invocation de Programme Croisé (CPI) est un appel direct d'un programme à un autre, ce qui permet la composabilité des programmes Solana. Tout comme n'importe quel client peut appeler n'importe quel programme à l'aide d'une méthode JSON-RPC, n'importe quel programme peut appeler n'importe quel autre programme par l'intermédiaire d'une CPI. Les CPIs transforment l'ensemble de l'écosystème Solana en une API géante à la disposition des développeurs.

L'objectif de cette section est de fournir une vue d'ensemble des CPIs. Veuillez vous référer aux ressources ci-dessous pour obtenir des explications plus détaillées, des exemples et des guides.

## Faits

::: tip Fiche d'Information
- Une Invocation de Programme Croisé (CPI) est un appel d'un programme à un autre qui cible une instruction spécifique du programme appelé
- Les CPIs permettent au programme appelant d'étendre ses privilèges de signature au programme appelé
- Les programmes peuvent exécuter des CPI en utilisant soit `invoke` ou `invoke_signed` dans leurs instructions
- `invoke` est utilisé lorsque toutes les signatures requises sont accessibles avant l'invocation. Il n'est pas nécessaire que des PDAs soient signataires
- `invoke_signed` est utilisé lorsque des PDAs du programe appelant doivent être signataires dans la CPI
- Lorsqu'une CPI est effectuée auprès d'un autre programme, le programme appelé peut effectuer d'autres CPI auprès d'autres programmes, jusqu'à une profondeur maximale de 4
:::

## Examen plus approfondi

Les Invocations de Programmes Croisés (CPIs) permettent la composabilité des programmes Solana, ce qui permet aux développeurs d'utiliser les instructions des programmes existants et de construire à partir de celles-ci.

Pour exécuter des CPIs, utilisez la fonction [invoke](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke.html) ou [invoke_signed](https://docs.rs/solana-program/latest/solana_program/program/fn.invoke_signed.html) qui se trouve dans la crate `solana_program`.

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

Pour réaliser une CPI, vous devez spécifier et construire une instruction du programme invoqué et fournir une liste de comptes nécessaires à cette instruction. Si un PDA est requis comme signataire, `signers_seeds` doit également être fourni lors de l'utilisation de `invoke_signed`.

### CPI avec `invoke`

La fonction `invoke` est utilisée lorsque nous réalisons une CPI qui ne nécessite pas la signature de PDA. Lors de la réalisation de CPIs, le runtime de Solana étend la signature originelle transmise à un programme au programme appelé.

```rust
invoke(
    &some_instruction,                           // instruction to invoke
    &[account_one.clone(), account_two.clone()], // accounts required by instruction
)?;
```

### CPI avec `invoke_signed`

Pour réaliser une CPI qui nécessite la signature d'un PDA, utilisez la fonction `invoke_signed` et fournissez les seeds nécessaires pour dériver le PDA requis du programme appelant.

```rust
invoke_signed(
    &some_instruction,                   // instruction to invoke
    &[account_one.clone(), pda.clone()], // accounts required by instruction, where one is a pda required as signer
    &[signers_seeds],                    // seeds to derive pda
)?;
```

Bien que les PDAs ne possèdent pas de clés privées propres, ils peuvent néanmoins agir en tant que signataire d'une instruction par le biais d'une CPI. Pour vérifier qu'un PDA appartient au programme appelant, les seeds utilisées pour générer le PDA qui doit signer doivent être incluses dans `signers_seeds`.

Le runtime de Solana appellera en interne `create_program_address` en utilisant les seeds fournies et le `program_id` du programme appelant. Le PDA obtenu est ensuite comparé aux adresses fournies dans l'instruction. S'il y a correspondance, le PDA est considéré comme un signataire valide.

### CPI `Instruction`

Selon le programme appelé, il peut y avoir une crate disponible avec des fonctions d'aide pour créer l'`Instruction`. De nombreuses personnes et organisations créent des crates accessibles au public avec leurs programmes qui expliquent ce type de fonctions afin de simplifier l'appel de leurs programmes.

La définition du type `Instruction` nécessaire pour une CPI comprend :

- `program_id` - la clé publique du programme qui exécute l'instruction
- `accounts` - une liste de tous les comptes qui peuvent être lus ou écrits pendant l'exécution de l'instruction
- `data` -  les données d'instruction nécessaires à l'instruction

```rust
pub struct Instruction {
    pub program_id: Pubkey,
    pub accounts: Vec<AccountMeta>,
    pub data: Vec<u8>,
}
```

La structure `AccountMeta` a la définition suivante :

```rust
pub struct AccountMeta {
    pub pubkey: Pubkey,
    pub is_signer: bool,
    pub is_writable: bool,
}
```

Lors de la création d'une CPI, utilisez la syntaxe suivante pour spécifier le `AccountMeta` de chaque compte :

- `AccountMeta::new` - indique qu'il est accessible en écriture
- `AccountMeta::new_readonly` - indique qu'il est *non* accessible en écriture
- `(pubkey, true)` - indique que le compte est signataire
- `(pubkey, false)` - indique que le compte *n'est pas* signataire

Voici un exemple :

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

Pour utiliser `invoke` et `invoke_signed`, une liste d'`account_infos` est également nécessaire. Comme pour la liste des `AccountMeta` de l'instruction, vous devez inclure toutes les `AccountInfo` de chaque compte que le programme que vous appelez va lire ou dans lequel il va écrire.

Pour information, la structure `AccountInfo` a la définition suivante :

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

Vous pouvez créer une copie de `AccountInfo` pour chaque compte nécessaire en utilisant le trait [Clone](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html#impl-Clone-for-AccountInfo%3C'a%3E) qui est implémenté pour la structure [AccountInfo](https://docs.rs/solana-program/latest/solana_program/account_info/struct.AccountInfo.html) dans le crate `solana_program`.

```rust
let accounts_infos = [
    account_one.clone(),
    account_two.clone(),
    account_three.clone(),
];
```

Bien que cette section ait fourni une vue d'ensemble des CPI, des explications plus détaillées, des exemples et des guides peuvent être trouvés dans les ressources ci-dessous.

## Autres Ressources
- [Documentation offcielle](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations)
- [Référence Solana Cookbook](https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation)
- [Solana Course Native CPI Lesson](https://www.soldev.app/course/cpi)
- [Solana Course Anchor CPI Lesson](https://www.soldev.app/course/anchor-cpi)
- [Exemple de programmes par Solana Developers](https://github.com/solana-developers/program-examples/tree/main/basics/cross-program-invocation)
