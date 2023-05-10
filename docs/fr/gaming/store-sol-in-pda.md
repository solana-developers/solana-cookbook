---
title: Stockage de SOL dans un PDA
head:
  - - meta
    - name: title
      content: Solana Cookbook | Stockage de SOL dans un PDA
  - - meta
    - name: og:title
      content: Solana Cookbook | Stockage de SOL dans un PDA
  - - meta
    - name: description
      content: Grâce aux PDAs, vous pouvez récompenser les joueurs qui jouent à votre jeu en leur offrant des SOL. Découvrez comment distribuer des récompenses en SOL à partir d'un PDA lorsque les joueurs trouvent des coffres dans ce jeu.
  - - meta
    - name: og:description
      content: Grâce aux PDAs, vous pouvez récompenser les joueurs qui jouent à votre jeu en leur offrant des SOL. Découvrez comment distribuer des récompenses en SOL à partir d'un PDA lorsque les joueurs trouvent des coffres dans ce jeu.
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

# Stockage de SOL dans des PDAs pour récompenser les joueurs

Guide Vidéo:
<div class="video-block">
<iframe width="320" height="200" src="https://www.youtube.com/embed/gILXyWvXu7M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Version Live. (utilisez le devnet)
<iframe height='400' scrolling='no' title='OZXQWp' src='https://solplay.de/TinyAdventureTwo/index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 80%;'>
</iframe>

## Programme Anchor Tiny Adventure - Deuxième Partie

Dans ce tutoriel, nous allons recréer le jeu Tiny Adventure et introduire un coffre qui contient une récompense de 0,1 SOL. Le coffre "apparaîtra" à un endroit précis, et lorsque le joueur l'atteindra, il recevra la récompense. L'objectif de ce programme est de montrer comment stocker des SOL dans un compte de programme et le distribuer aux joueurs

Le programme Tiny Adventure Two se compose de trois instructions :

- `initialize_level_one` - Cette instruction initialise deux comptes sur la chaîne : l'un pour stocker la position du joueur et l'autre pour conserver la récompense en SOL qui représente le "coffre à récompenses".
- `reset_level_and_spawn_chest` - Cette instruction remet la position du joueur à zéro et fait réapparaître un coffre à récompense en transférant des SOL depuis le portefeuille de l'utilisateur invoquant l'instruction vers le compte du coffre à récompense. 
- `move_right` - Cette instruction permet au joueur de se déplacer vers la droite et de collecter les SOL dans le coffre à récompense une fois qu'il a atteint une position spécifique.

Dans les sections suivantes, nous vous guiderons pas à pas dans l'élaboration du programme. Vous pouvez trouver le code source complet, qui peut être déployé directement depuis votre navigateur en utilisant le Solana Playground, à ce lien : [Ouvrir Dans Playground](https://beta.solpg.io/tutorials/tiny-adventure-two).

### Pour commencer

Pour commencer à créer le jeu Tiny Adventure, suivez les étapes suivantes :

Visitez le [Solana Playground](https://beta.solpg.io/) et créez un nouveau projet Anchor. Si vous êtes nouveau sur Solana Playground, vous devrez également créer un portefeuille Playground.

Après avoir créé un nouveau projet, remplacez le code par défaut par le code ci-dessous :

```rust
use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111");

#[program]
mod tiny_adventure_two {
    use super::*;
}

fn print_player(player_position: u8) {
    if player_position == 0 {
        msg!("A Journey Begins!");
        msg!("o.........💎");
    } else if player_position == 1 {
        msg!("..o.......💎");
    } else if player_position == 2 {
        msg!("....o.....💎");
    } else if player_position == 3 {
        msg!("........\\o/💎");
        msg!("..........\\o/");
        msg!("You have reached the end! Super!");
    }
}
```

Dans ce jeu, le joueur commence à la position 0 et ne peut se déplacer que vers la droite. Pour montrer la progression du joueur tout au long du jeu, nous utiliserons des journaux de messages pour représenter son voyage vers le coffre à récompense !

### Définition du compte du coffre à récompense

Ajoutez la constante `CHEST_REWARD` au début du programme. `CHEST_REWARD` représente la quantité de lamports qui seront placés dans le coffre et donnés en récompense. Les lamports sont les plus petites fractions d'un SOL, 1 milliard de lamports étant égal à 1 SOL.

Pour stocker la récompense en SOL, nous allons définir une nouvelle structure `ChestVaultAccount`. Il s'agit d'une structure vide car nous mettrons directement à jour les lamports du compte. Le compte contiendra la récompense en SOL et n'aura pas besoin de stocker des données supplémentaires.

```rust
use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111");

#[program]
mod tiny_adventure_two {
    use super::*;

    // The amount of lamports that will be put into chests and given out as rewards.
    const CHEST_REWARD: u64 = LAMPORTS_PER_SOL / 10; // 0.1 SOL
}

...

// Define the Chest Vault Account structure
#[account]
pub struct ChestVaultAccount {}
```

### Définition du Compte de Données du Jeu

Pour suivre la position du joueur dans le jeu, nous devons définir une structure pour le compte qui stockera la position du joueur sur la chaîne.

La structure `GameDataAccount` contient un seul champ, `player_position`, qui stocke la position actuelle du joueur sous la forme d'un entier non signé de 8 bits.

```rust

use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use anchor_lang::system_program;

declare_id!("11111111111111111111111111111111");

#[program]
mod tiny_adventure_two {
    use super::*;
    ...

}

...

// Define the Game Data Account structure
#[account]
pub struct GameDataAccount {
    player_position: u8,
}
```

Maintenant que la structure `GameDataAccount` est définie, vous pouvez maintenant l'utiliser pour stocker et mettre à jour la position du joueur lorsqu'il interagit avec le jeu. Au fur et à mesure que le joueur se déplace vers la droite et progresse dans le jeu, sa position est mise à jour dans le `GameDataAccount`, ce qui vous permet de suivre sa progression vers le coffre contenant la récompense en SOL.

### Instruction d'initialisation du niveau un

Maintenant que les comptes `GameDataAccount` et `ChestVaultAccount` sont définis, implémentons l'instruction `initialize_level_one`. Cette instruction initialise les comptes `GameDataAccount` et `ChestVaultAccount`, fixe la position du joueur à 0 et affiche le message de départ.

L'instruction `initialize_level_one` nécessite 4 comptes :

- `new_game_data_account` - le compte `GameDataAccount` que nous initialisons pour stocker la position du joueur
- `chest_vault` - le compte `ChestVaultAccount` que nous initialisons pour stocker la récompense en SOL
- `signer` - le joueur qui paie pour l'initialisation des comptes
- `system_program` - compte obligatoire lors de la création d'un nouveau compte

```rust
#[program]
pub mod tiny_adventure_two {
    use super::*;

    pub fn initialize_level_one(_ctx: Context<InitializeLevelOne>) -> Result<()> {
        msg!("A Journey Begins!");
        msg!("o.......💎");
        Ok(())
    }

    ...
}

// Specify the accounts required by the initialize_level_one instruction
#[derive(Accounts)]
pub struct InitializeLevelOne<'info> {
    #[account(
        init_if_needed,
        seeds = [b"level1"],
        bump,
        payer = signer,
        space = 8 + 1
    )]
    pub new_game_data_account: Account<'info, GameDataAccount>,
    #[account(
        init_if_needed,
        seeds = [b"chestVault"],
        bump,
        payer = signer,
        space = 8
    )]
    pub chest_vault: Account<'info, ChestVaultAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

...
```

Les comptes `GameDataAccount` et `ChestVaultAccount` sont créés en utilisant une Adresse Dérivée de Programme (PDA) comme adresse de compte. Cela nous permet de retrouver les adresses de manière déterministe par la suite. La contrainte `init_if_need` garantit que les comptes ne sont initialisés que s'ils n'existent pas déjà. Étant donné que les PDAs des deux comptes de cette instruction utilisent une seule seed fixe, notre programme ne peut créer qu'un seul compte de chaque type. En effet, l'instruction ne doit être invoquée qu'une seule fois.

Il est intéressant de noter que l'implémentation actuelle n'a aucune restriction sur qui peut modifier `GameDataAccount`. Cela transforme le jeu en une expérience multijoueur où chacun peut contrôler les mouvements du joueur.

Sinon, vous pouvez utiliser l'adresse du signataire comme une seed supplémentaire dans l'instruction `initialize`, ce qui permettrait à chaque joueur de créer son propre `GameDataAccount`.

### Réinitialisation du niveau et instruction d'apparition du coffre

Ensuite, implémentons l'instruction `reset_level_and_spawn_chest`, qui réinitialise la position du joueur au départ et remplit le coffre avec une récompense de 0.1 SOL.

L'instruction `reset_level_and_spawn_chest` nécessite 4 comptes :

- `new_game_data_account` - le compte `GameDataAccount` qui stocke la position du joueur
- `chest_vault` - le compte `ChestVaultAccount` qui stocke les récompenses en SOL
- `signer` - le joueur qui dépose la récompense en SOL dans le coffre
- `system_program` - le programme que nous invoquerons pour transférer les SOL à l'aide d'une Invocation de Programme Croisé (CPI), plus d'informations à ce sujet dans un instant

```rust
#[program]
pub mod tiny_adventure_two {
    use super::*;
    ...

    pub fn reset_level_and_spawn_chest(ctx: Context<SpawnChest>) -> Result<()> {
        ctx.accounts.game_data_account.player_position = 0;

        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.payer.to_account_info().clone(),
                to: ctx.accounts.chest_vault.to_account_info().clone(),
            },
        );
        system_program::transfer(cpi_context, CHEST_REWARD)?;

        msg!("Level Reset and Chest Spawned at position 3");

        Ok(())
    }

    ...
}

// Specify the accounts required by the reset_level_and_spawn_chest instruction
#[derive(Accounts)]
pub struct SpawnChest<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(mut, seeds = [b"chestVault"], bump)]
    pub chest_vault: Account<'info, ChestVaultAccount>,
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
    pub system_program: Program<'info, System>,
}

...
```

Cette instruction comprend une Invocation de Programme Croisée (CPI) pour transférer des SOL du portefeuille du payeur au compte `ChestVaultAccount`. On parle d'Invocation de Programme Croisée lorsqu'un programme invoque une instruction d'un autre programme. Ici, nous utilisons un CPI pour invoquer l'instruction `Transfer` du `system_program` afin de transférer des SOL du portefeuille du payeur vers le `ChestVaultAccount`.

Les Invocations de Programme Croisée sont un concept clé du modèle de programmation de Solana, qui permet aux programmes d'interagir directement avec les instructions d'autres programmes. Pour approfondir les CPIs, n'hésitez pas à explorer les leçons sur les CPIs disponibles dans le [Solana Course](https://www.soldev.app/course).

### Instruction de Déplacement vers la Droite

Enfin, implémentons l'instruction `move_right` qui inclut la logique de collecte de la récompense du coffre. Lorsqu'un joueur atteint la position 3 et entre le bon "mot de passe", la récompense est transférée de **`ChestVaultAccount`** vers le compte du joueur. Si un mot de passe incorrect est saisi, une erreur Anchor personnalisée est renvoyée. Si le joueur est déjà en position 3, un message sera affiché. Sinon, la position sera incrémentée de 1 pour représenter le déplacement vers la droite.

L'objectif principal de cette fonctionnalité "mot de passe" est de montrer comment incorporer des paramètres dans une instruction et comment mettre en œuvre des erreurs Anchor personnalisées pour améliorer la gestion des erreurs. Dans cet exemple, le mot de passe correct sera "gib".

L'instruction `move_right` nécessite 3 comptes :

- `new_game_data_account` - le compte `GameDataAccount` qui stocke la position du joueur
- `chest_vault` - le compte `ChestVaultAccount` qui stocke les récompenses en SOL
- `player_wallet` - le portefeuille du joueur qui invoque l'instruction et le destinataire potentiel de la récompense en SOL

```rust
#[program]
pub mod tiny_adventure_two {
    use super::*;
    ...

    // Instruction to move right
    pub fn move_right(ctx: Context<MoveRight>, password: String) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 3 {
            msg!("You have reached the end! Super!");
        } else if game_data_account.player_position == 2 {
            if password != "gib" {
                return err!(MyError::WrongPassword);
            }

            game_data_account.player_position = game_data_account.player_position + 1;

            msg!(
                "You made it! Here is your reward {0} lamports",
                CHEST_REWARD
            );

            **ctx
                .accounts
                .chest_vault
                .to_account_info()
                .try_borrow_mut_lamports()? -= CHEST_REWARD;
            **ctx
                .accounts
                .player
                .to_account_info()
                .try_borrow_mut_lamports()? += CHEST_REWARD;
        } else {
            game_data_account.player_position = game_data_account.player_position + 1;
            print_player(game_data_account.player_position);
        }
        Ok(())
    }

    ...
}

// Specify the accounts required by the move_right instruction
#[derive(Accounts)]
pub struct MoveRight<'info> {
    #[account(mut, seeds = [b"chestVault"], bump)]
    pub chest_vault: Account<'info, ChestVaultAccount>,
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
    #[account(mut)]
    pub player: Signer<'info>,
}

// Custom Anchor Error
#[error_code]
pub enum MyError {
    #[msg("Password was wrong")]
    WrongPassword,
}

...
```

Pour transférer les lamports du coffre à récompense vers le compte du joueur, nous ne pouvons pas utiliser une Invocation de Programme Croisé (CPI) comme nous l'avons fait précédemment, puisque le `ChestVaultAccount` n'est pas détenu par le Programme du Système. Au lieu de cela, nous modifions directement les lamports dans les comptes en utilisant `try_borrow_mut_lamports`.  N'oubliez pas que le compte sur lequel vous déduisez des lamports doit être un signataire, et que le runtime s'assure toujours que les soldes totaux des comptes restent égaux après une transaction.

Il convient de noter que les Adresses Dérivées de Programme (PDAs) présentent deux caractéristiques principales :

1. Fournir un moyen déterministe de trouver l'adresse d'un compte
2. Permettre au programme dont est issu le PDA de "signer" pour lui.

C'est la raison pour laquelle nous sommes en mesure de déduire les lamports du `ChestVaultAccount` sans exiger explicitement un signataire supplémentaire pour l'instruction.

### Compilation et Déploiement

Bravo ! Vous avez maintenant terminé la partie 2 du programme Tiny Adventure ! Votre programme final devrait ressembler à ceci :

```rust
use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;
use anchor_lang::system_program;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("7gZTdZg86YsYbs92Rhv63kZUAkoww1kLexJg8sNpgVQ3");

#[program]
mod tiny_adventure_two {
    use super::*;

    // The amount of lamports that will be put into chests and given out as rewards.
    const CHEST_REWARD: u64 = LAMPORTS_PER_SOL / 10; // 0.1 SOL

    pub fn initialize_level_one(_ctx: Context<InitializeLevelOne>) -> Result<()> {
        // Usually in your production code you would not print lots of text because it cost compute units.
        msg!("A Journey Begins!");
        msg!("o.......💎");
        Ok(())
    }

    pub fn reset_level_and_spawn_chest(ctx: Context<SpawnChest>) -> Result<()> {
        ctx.accounts.game_data_account.player_position = 0;

        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.payer.to_account_info().clone(),
                to: ctx.accounts.chest_vault.to_account_info().clone(),
            },
        );
        system_program::transfer(cpi_context, CHEST_REWARD)?;

        msg!("Level Reset and Chest Spawned at position 3");

        Ok(())
    }

    pub fn move_right(ctx: Context<MoveRight>, password: String) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 3 {
            msg!("You have reached the end! Super!");
        } else if game_data_account.player_position == 2 {
            if password != "gib" {
                return err!(MyError::WrongPassword);
            }

            game_data_account.player_position = game_data_account.player_position + 1;

            msg!(
                "You made it! Here is your reward {0} lamports",
                CHEST_REWARD
            );

            **ctx
                .accounts
                .chest_vault
                .to_account_info()
                .try_borrow_mut_lamports()? -= CHEST_REWARD;
            **ctx
                .accounts
                .player
                .to_account_info()
                .try_borrow_mut_lamports()? += CHEST_REWARD;
        } else {
            game_data_account.player_position = game_data_account.player_position + 1;
            print_player(game_data_account.player_position);
        }
        Ok(())
    }
}

fn print_player(player_position: u8) {
    if player_position == 0 {
        msg!("A Journey Begins!");
        msg!("o.........💎");
    } else if player_position == 1 {
        msg!("..o.......💎");
    } else if player_position == 2 {
        msg!("....o.....💎");
    } else if player_position == 3 {
        msg!("........\\o/💎");
        msg!("..........\\o/");
        msg!("You have reached the end! Super!");
    }
}

#[derive(Accounts)]
pub struct InitializeLevelOne<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 1 byte come from NewAccount.data being type u8.
    // (u8 = 8 bits unsigned integer = 8 bytes)
    // You can also use the signer as seed [signer.key().as_ref()],
    #[account(
        init_if_needed,
        seeds = [b"level1"],
        bump,
        payer = signer,
        space = 8 + 1
    )]
    pub new_game_data_account: Account<'info, GameDataAccount>,
    // This is the PDA in which we will deposit the reward SOL and
    // from where we send it back to the first player reaching the chest.
    #[account(
        init_if_needed,
        seeds = [b"chestVault"],
        bump,
        payer = signer,
        space = 8
    )]
    pub chest_vault: Account<'info, ChestVaultAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SpawnChest<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    #[account(mut, seeds = [b"chestVault"], bump)]
    pub chest_vault: Account<'info, ChestVaultAccount>,
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MoveRight<'info> {
    #[account(mut, seeds = [b"chestVault"], bump)]
    pub chest_vault: Account<'info, ChestVaultAccount>,
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
    #[account(mut)]
    pub player: Signer<'info>,
}

#[account]
pub struct GameDataAccount {
    player_position: u8,
}

#[account]
pub struct ChestVaultAccount {}

#[error_code]
pub enum MyError {
    #[msg("Password was wrong")]
    WrongPassword,
}
```

Une fois le programme terminé, il est temps de le compiler et de le déployer sur Solana Playground !

Si vous utilisez Solana Playground pour la première fois, créez d'abord un portefeuille Playground et assurez-vous que vous êtes connecté au Devnet. Ensuite, exécutez `solana airdrop 2` jusqu'à ce que vous ayez 6 SOL. Une fois que vous avez suffisamment de SOL, compilez (build) et déployez (deploy) le programme.

### Débuter avec le Client

La section suivante vous guidera à travers une implémentation simple côté client pour interagir avec le jeu. Nous allons décomposer le code et fournir des explications détaillées pour chaque étape. Pour commencer, naviguez jusqu'au fichier `client.ts` dans Solana Playground, supprimez le code par défaut et ajoutez les extraits de code des sections suivantes.

Tout d'abord, dérivons le PDA pour le `GameDataAccount` et le `ChestVaultAccount`. Un PDA est une adresse unique au format d'une clé publique qui est dérivée de l'identifiant du programme et de seeds supplémentaires.

```js
// The PDA adress everyone will be able to control the character if the interact with your program
const [globalLevel1GameDataAccount, bump] =
  await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("level1", "utf8")],
    //[pg.wallet.publicKey.toBuffer()], <- You could also add the player wallet as a seed, then you would have one instance per player. Need to also change the seed in the rust part
    pg.program.programId
  );

// This is where the program will save the sol reward for the chests and from which the reward will be payed out again
const [chestVaultAccount, chestBump] =
  await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("chestVault", "utf8")],
    pg.program.programId
  );
```

Ensuite, nous allons appeler l'instruction `initializeLevelOne` pour initialiser les comptes `GameDataAccount` et `ChestVaultAccount`.

```js
// Initialize level
let txHash = await pg.program.methods
  .initializeLevelOne()
  .accounts({
    chestVault: chestVaultAccount,
    newGameDataAccount: globalLevel1GameDataAccount,
    signer: pg.wallet.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  .signers([pg.wallet.keypair])
  .rpc();

console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
await pg.connection.confirmTransaction(txHash);

let balance = await pg.connection.getBalance(pg.wallet.publicKey);
console.log(
  `My balance before spawning a chest: ${balance / web3.LAMPORTS_PER_SOL} SOL`
);
```

Après cela, nous utiliserons l'instruction `resetLevelAndSpawnChest` pour fixer la position du joueur à 0 et remplir le `ChestVaultAccount` avec 0.1 SOL.

```js
// Set the player position back to 0 and pay to fill up the chest with sol
txHash = await pg.program.methods
  .resetLevelAndSpawnChest()
  .accounts({
    chestVault: chestVaultAccount,
    gameDataAccount: globalLevel1GameDataAccount,
    payer: pg.wallet.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  .signers([pg.wallet.keypair])
  .rpc();

console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
await pg.connection.confirmTransaction(txHash);

console.log("Level reset and chest spawned 💎");
console.log("o........💎");
```

Nous pouvons maintenant interagir avec le jeu en appelant l'instruction `moveRight`. Dans cet exemple, nous allons boucler cette instruction jusqu'à ce que le joueur atteigne la position lui permettant de collecter la récompense dans le `ChestVaultAccount`.

```js

// Here we move to the right three times and collect the chest at the end of the level
for (let i = 0; i < 3; i++) {
  txHash = await pg.program.methods
    .moveRight("gib")
    .accounts({
      chestVault: chestVaultAccount,
      gameDataAccount: globalLevel1GameDataAccount,
      player: pg.wallet.publicKey,
    })
    .signers([pg.wallet.keypair])
    .rpc();

  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
  await pg.connection.confirmTransaction(txHash);
  let balance = await pg.connection.getBalance(pg.wallet.publicKey);
  console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

  let gameDateAccount = await pg.program.account.gameDataAccount.fetch(
    globalLevel1GameDataAccount
  );

  console.log("Player position is:", gameDateAccount.playerPosition.toString());

  switch (gameDateAccount.playerPosition) {
    case 0:
      console.log("A journey begins...");
      console.log("o........💎");
      break;
    case 1:
      console.log("....o....💎");
      break;
    case 2:
      console.log("......o..💎");
      break;
    case 3:
      console.log(".........\\o/💎");
      console.log("...........\\o/");
      break;
  }
}
```

Enfin, appuyez sur le bouton "Run" dans le Solana Playground pour exécuter le client. Si vous entrez autre chose que "gib" comme mot de passe pour l'instruction  **`moveRight`**, vous rencontrerez le message d'erreur suivant lorsque vous atteindrez la position permettant de réclamer la récompense du coffre :

```
Error Code: WrongPassword. Error Number: 6000. Error Message: Password was wrong.
```

Cependant, si vous entrez le bon mot de passe, la sortie devrait ressembler à ce qui suit :

```
Running client...
  client.ts:
    Use 'solana confirm -v CX8VWV5Jp1kXDkZrTdeeyibgZg3B3cXAzchzCfNHvJoqARSGHeEU5injypxFwiKFcHPcWFG9BeNSrqZAdENtL2t' to see the logs
    My balance before spawning a chest: 6.396630254 SOL
    Use 'solana confirm -v 3HwAS1RK7beL3mGoNdFYWteJXF3NdJXiEskJrHtuJ6Tu9ow67Zo3yScQBEPQyish33hP8WyuVanmq93wEFJ2LQcx' to see the logs
    Level reset and chest spawned 💎
    o........💎
    Use 'solana confirm -v 43KnGrx5VQYd8LctsNaNqN1hg69vE6wiiTbdxTC1uM3Hasnq7ZdM9zWx4JS39AKNz2FpQr9a3ZnEA7XscEzmXQ5U' to see the logs
    My balance: 6.296620254 SOL
    Player position is: 1
    ....o....💎
    Use 'solana confirm -v AGxYWDw49d4y5dLon5M42eu1qG8g2Yf7FeTr3Dpbf1uFXnMeUzp4XWmHyQP1YRNpT8acz4aTJU9f2FQpL6BSAkY' to see the logs
    My balance: 6.296615254 SOL
    Player position is: 2
    ......o..💎
    Use 'solana confirm -v 5pjAU5NrS4u91QLWZTvo9aXBtR3c6g981UGSxrWDoDW5MehXnx5LnAxu4jKLp1p75RKpVSgMBgg2zHX3WDyci7AK' to see the logs
    My balance: 6.396610254 SOL
    Player position is: 3
    .........\o/💎
    ...........\o/
```

Bravo ! Vous avez réussi à créer, déployer et interagir avec Tiny Adventure Two du côté client. Vous avez intégré une nouvelle fonctionnalité qui permet aux joueurs d'obtenir des récompenses en atteignant le coffre situé à la fin du niveau. De plus, vous avez appris à transférer des SOL à l'intérieur d'un programme Anchor en utilisant des Invocation de Programme Croisée et en modifiant directement les lamports dans les comptes.

N'hésitez pas à continuer à construire de manière indépendante et à améliorer le jeu avec des fonctionnalités supplémentaires telles que de nouveaux niveaux ou des récompenses alternatives !