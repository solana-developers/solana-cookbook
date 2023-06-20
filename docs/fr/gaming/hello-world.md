---
title: Exemple Hello World
head:
  - - meta
    - name: title
      content: Solana Cookbook | Exemple Hello World
  - - meta
    - name: og:title
      content: Solana Cookbook | Exemple Hello World
  - - meta
    - name: description
      content: Commencez à créer des jeux Solana avec un jeu d'aventure basique
  - - meta
    - name: og:description
      content: Commencez à créer des jeux Solana avec un jeu d'aventure basique
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

# Créer un jeu on-chain sur Solana

## Commencez votre premier jeu Solana

Guide vidéo:
<div class="video-block">
<iframe width="320" height="200" src="https://www.youtube.com/embed/_vQ3bSs3svs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Version live. (utilisez le devnet dans la version intégrée)
<iframe height='400' scrolling='no' title='OZXQWp' src='https://solplay.de/TinyAdventure/index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 80%;'>
</iframe>

## Tiny Adventure

Tiny Adventure est un programme Solana dont l'utilisation est adaptée aux débutants et créé à l'aide du framework Anchor. L'objectif de ce programme est de vous montrer comment créer un jeu simple qui permet aux joueurs de connaître leur position et de se déplacer vers la gauche ou vers la droite.

Le programme Tiny Adventure comprend seulement 3 instructions :

- `initialize` - Cette instruction crée un compte sur la chaîne pour stocker la position du joueur
- `move_left` - Cette instruction permet au joueur de se déplacer vers la gauche
- `move_right` - Cette instruction permet au joueur de se déplacer vers la droite

Dans les sections suivantes, nous allons suivre le processus de construction de ce jeu étape par étape.
Vous pouvez trouver le code source complet, prêt à être déployé à partir de votre navigateur, dans cet [exemple Solana Playground](https://beta.solpg.io/tutorials/tiny-adventure).

Si vous avez besoin de vous familiariser avec le framework Anchor, n'hésitez pas à consulter le module Anchor de [Solana Course](https://www.soldev.app/course) pour commencer.

### Pour commencer

Pour commencer à créer le jeu Tiny Adventure, suivez les étapes suivantes :

Visiter le [Solana Playground](https://beta.solpg.io/) et créer un nouveau projet Anchor. Si vous êtes nouveau sur Solana Playground, vous devrez également créer un portefeuille Playground. Voici un exemple d'utilisation de Solana Playground :

![solpg.gif](./assets/hello-world/solpg.gif)

Après avoir créé un nouveau projet, remplacez le code par défaut par le code ci-dessous :

```rust
use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
mod tiny_adventure {
    use super::*;
}

fn print_player(player_position: u8) {
    if player_position == 0 {
        msg!("A Journey Begins!");
        msg!("o.......");
    } else if player_position == 1 {
        msg!("..o.....");
    } else if player_position == 2 {
        msg!("....o...");
    } else if player_position == 3 {
        msg!("........\\o/");
        msg!("You have reached the end! Super!");
    }
}
```

Dans ce jeu, le joueur commence à la position 0 et peut se déplacer à gauche ou à droite. Pour montrer la progression du joueur tout au long du jeu, nous utiliserons des journaux de messages.

### Définition du Compte de Données du Jeu

La première étape de la création du jeu consiste à définir une structure pour le compte qui stockera la position du joueur sur la chaîne.

La structure `GameDataAccount` contient un seul champ, `player_position`, qui stocke la position actuelle du joueur sous la forme d'un entier non signé de 8 bits.

```rust
use anchor_lang::prelude::*;

declare_id!("11111111111111111111111111111111");

#[program]
mod tiny_adventure {
    use super::*;

}

...

// Define the Game Data Account structure
#[account]
pub struct GameDataAccount {
    player_position: u8,
}
```

### Instruction d'Initialisation

Après avoir défini le compte du programme, implémentons l'instruction `initialize`. Cette instruction initialise `GameDataAccount` s'il n'existe pas déjà, fixe `player_position` à 0, et affiche quelques journaux de messages.

L'instruction `initialize` nécessite 3 comptes :

- `new_game_data_account` - le `GameDataAccount` que nous initialisons
- `signer` - le joueur qui paie pour l'initialisation de `GameDataAccount`
- `system_program` - compte obligatoire lors de la création d'un nouveau compte

```rust
#[program]
pub mod tiny_adventure {
    use super::*;

    // Instruction to initialize GameDataAccount and set position to 0
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.new_game_data_account.player_position = 0;
        msg!("A Journey Begins!");
        msg!("o.......");
        Ok(())
    }
}

// Specify the accounts required by the initialize instruction
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init_if_needed,
        seeds = [b"level1"],
        bump,
        payer = signer,
        space = 8 + 1
    )]
    pub new_game_data_account: Account<'info, GameDataAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

...
```

Dans cet exemple, une Adresse Dérivée de Programme (PDA) est utilisée pour l'adresse `GameDataAccount`. Cela nous permet de retrouver l'adresse de manière déterministe par la suite. Il est important de noter que le PDA de cet exemple est généré avec une seule valeur fixe comme seed (`level1`), ce qui limite notre programme à la création d'un seul `GameDataAccount`. La contrainte `init_if_need` assure que `GameDataAccount` est initialisé seulement s'il n'existe pas déjà.

Il est intéressant de noter que l'implémentation actuelle n'a aucune restriction sur qui peut modifier `GameDataAccount`. Cela transforme le jeu en une expérience multijoueur où chacun peut contrôler les mouvements du joueur.

Sinon, vous pouvez utiliser l'adresse du signataire comme une seed supplémentaire dans l'instruction `initialize`, ce qui permettrait à chaque joueur de créer son propre `GameDataAccount`.

### Instruction de Déplacement vers la Gauche

Maintenant que nous savons initialiser `GameDataAccount`, implémentons l'instruction `move_left`. Celle-ci permet à un joueur de mettre à jour sa `player_position`. Dans cet exemple, se déplacer vers la gauche signifie simplement décrémenter `player_position` de 1. La position minimale est également fixée à 0.

Le seul compte nécessaire pour cette instruction est `GameDataAccount`.

```rust
#[program]
pub mod tiny_adventure {
    use super::*;
    ...

    // Instruction to move left
    pub fn move_left(ctx: Context<MoveLeft>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 0 {
            msg!("You are back at the start.");
        } else {
            game_data_account.player_position -= 1;
            print_player(game_data_account.player_position);
        }
        Ok(())
    }
}

// Specify the account required by the move_left instruction
#[derive(Accounts)]
pub struct MoveLeft<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

...
```

### Instruction de Déplacement vers la Droite

Enfin, implémentons l'instruction `move_right`. De la même manière, se déplacer vers la droite signifie simplement incrémenter `player_position` de 1. Nous fixons également la position maximale à 3.

Comme précédemment, le seul compte nécessaire pour cette instruction est `GameDataAccount`.

```rust
#[program]
pub mod tiny_adventure {
    use super::*;
		...

		// Instruction to move right
		pub fn move_right(ctx: Context<MoveRight>) -> Result<()> {
		    let game_data_account = &mut ctx.accounts.game_data_account;
		    if game_data_account.player_position == 3 {
		        msg!("You have reached the end! Super!");
		    } else {
		        game_data_account.player_position = game_data_account.player_position + 1;
		        print_player(game_data_account.player_position);
		    }
		    Ok(())
		}
}

// Specify the account required by the move_right instruction
#[derive(Accounts)]
pub struct MoveRight<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

...
```

### Compilation et Déploiement

Nous avons maintenant terminé le programme Tiny Adventure ! Votre programme final devrait ressembler à ce qui suit :

```rust
use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("BouPBVWkdVHbxsdzqeMwkjqd5X67RX5nwMEwxn8MDpor");

#[program]
mod tiny_adventure {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.new_game_data_account.player_position = 0;
        msg!("A Journey Begins!");
        msg!("o.......");
        Ok(())
    }

    pub fn move_left(ctx: Context<MoveLeft>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 0 {
            msg!("You are back at the start.");
        } else {
            game_data_account.player_position -= 1;
            print_player(game_data_account.player_position);
        }
        Ok(())
    }

    pub fn move_right(ctx: Context<MoveRight>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 3 {
            msg!("You have reached the end! Super!");
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
        msg!("o.......");
    } else if player_position == 1 {
        msg!("..o.....");
    } else if player_position == 2 {
        msg!("....o...");
    } else if player_position == 3 {
        msg!("........\\o/");
        msg!("You have reached the end! Super!");
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init_if_needed,
        seeds = [b"level1"],
        bump,
        payer = signer,
        space = 8 + 1
    )]
    pub new_game_data_account: Account<'info, GameDataAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MoveLeft<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

#[derive(Accounts)]
pub struct MoveRight<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}

#[account]
pub struct GameDataAccount {
    player_position: u8,
}
```

Une fois le programme terminé, il est temps de le compiler et de le déployer sur Solana Playground !

Si vous utilisez Solana Playground pour la première fois, créez d'abord un portefeuille Playground et assurez-vous que vous êtes connecté au Devnet. Ensuite, exécutez `solana airdrop 2` jusqu'à ce que vous ayez 6 SOL. Une fois que vous avez suffisamment de SOL, compilez (build) et déployez (deploy) le programme.


### Débuter avec le Client

La section suivante vous guidera à travers une implémentation simple côté client pour interagir avec le jeu. Nous allons décomposer le code et fournir des explications détaillées pour chaque étape. Dans Solana Playground, naviguez jusqu'au fichier `client.ts` et ajoutez les extraits de code des sections suivantes.

Tout d'abord, dérivons le PDA pour le `GameDataAccount`. Un PDA est une adresse unique au format d'une clé publique qui est dérivée de l'identifiant du programme et de seeds supplémentaires. N'hésitez pas à consulter les cours sur les PDAs de [Solana Course](https://www.soldev.app/course) pour plus de détails.

```js
// The PDA adress everyone will be able to control the character if the interact with your program
const [globalLevel1GameDataAccount, bump] =
  await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("level1", "utf8")],
    pg.program.programId
  );
```

Ensuite, essayons de récupérer le compte de données du jeu en utilisant le PDA de l'étape précédente. Si le compte n'existe pas, nous le créerons en invoquant l'instruction `initialize` de notre programme.

```js
let txHash;
let gameDateAccount;
try {
  gameDateAccount = await pg.program.account.gameDataAccount.fetch(
    globalLevel1GameDataAccount
  );
} catch {
  // Check if the account is already initialized, other wise initialize it
  txHash = await pg.program.methods
    .initialize()
    .accounts({
      newGameDataAccount: globalLevel1GameDataAccount,
      signer: pg.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .signers([pg.wallet.keypair])
    .rpc();

  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
  await pg.connection.confirmTransaction(txHash);
  console.log("A journey begins...");
  console.log("o........");
}
```

Nous sommes maintenant prêts à interagir avec le jeu en nous déplaçant vers la gauche ou la droite. Pour ce faire, il suffit d'invoquer les instructions `moveLeft` ou `moveRight` du programme et de soumettre une transaction au réseau Solana. Vous pouvez répéter cette étape autant de fois que vous le souhaitez.

```js
// Here you can play around now, move left and right
txHash = await pg.program.methods
  //.moveLeft()
  .moveRight()
  .accounts({
    gameDataAccount: globalLevel1GameDataAccount,
  })
  .signers([pg.wallet.keypair])
  .rpc();
console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
await pg.connection.confirmTransaction(txHash);

gameDateAccount = await pg.program.account.gameDataAccount.fetch(
  globalLevel1GameDataAccount
);

console.log("Player position is:", gameDateAccount.playerPosition.toString());
```

Enfin, utilisons une instruction `switch` pour afficher la position du personnage en fonction de la valeur `playerPosition` stockée dans `gameDateAccount`. Il s'agit d'une représentation visuelle des mouvements du personnage dans le jeu.

```js
switch (gameDateAccount.playerPosition) {
  case 0:
    console.log("A journey begins...");
    console.log("o........");
    break;
  case 1:
    console.log("....o....");
    break;
  case 2:
    console.log("......o..");
    break;
  case 3:
    console.log(".........\\o/");
    break;
}
```

Enfin, exécutez le client en cliquant sur le bouton "Run" dans Solana Playground. Le résultat devrait être similaire à ce qui suit :

```
Running client...
  client.ts:
    My address: 8ujtDmwpkQ4Bp4GU4zUWmzf65sc21utdcxFAELESca22
    My balance: 4.649749614 SOL
    Use 'solana confirm -v 4MRXEWfGqvmro1KsKb94Zz8qTZsPa9x99oMFbLBz2WicLnr8vdYYsQwT5u3pK5Vt1i9BDrVH5qqTXwtif6sCRJCy' to see the logs
    Player position is: 1
    ....o....
```

Félicitations ! Vous avez réussi à créer, déployer et invoquer le jeu Tiny Adventure à partir du client. Pour mieux comprendre, regardez cette [démo] (https://nextjs-tiny-adventure.vercel.app/) qui montre comment interagir avec le programme Tiny Adventure par le biais d'un frontend Next.js.

### Que faire à partir de maintenant ?

Une fois le jeu de base terminé, libérez votre créativité et exercez-vous à construire de manière indépendante en mettant en œuvre vos propres idées pour enrichir l'expérience de jeu. Voici quelques suggestions :

1. Modifier les textes du jeu pour créer une histoire intrigante, inviter un ami à jouer à votre récit personnalisé et observer les transactions de la chaîne au fur et à mesure qu'elles se déroulent !
2. Ajouter un coffre qui récompense les joueurs avec des [récompenses en SOL](./store-sol-in-pda) ou laisser le joueur collecter des pièces (cf. [Interagir avec des jetons](./interact-with-tokens)) au fur et à mesure qu'il progresse dans le jeu.
3. Créer une grille qui permette au joueur de se déplacer vers le haut, le bas, la gauche et la droite, et introduiser plusieurs joueurs pour une expérience plus dynamique.

Dans le prochain chapitre, [Tiny Adventure Two](./store-sol-in-pda), nous apprendrons à stocker des SOL dans le programme et à en distribuer aux joueurs sous forme de récompenses.
