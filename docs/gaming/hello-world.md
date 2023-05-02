---
title: Hello World example
head:
  - - meta
    - name: title
      content: Solana Cookbook | Hello World example
  - - meta
    - name: og:title
      content: Solana Cookbook | Hello World example
  - - meta
    - name: description
      content: Get started building Solana games with a basic adventure game 
  - - meta
    - name: og:description
      content: Get started building Solana games with a basic adventure game
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

# Building an on-chain game on Solana

## Getting started with your first Solana game

Video Walkthrough:
<div class="video-block">
<iframe width="320" height="200" src="https://www.youtube.com/embed/_vQ3bSs3svs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Live Version. (use devnet in the embedded version)
<iframe height='400' scrolling='no' title='OZXQWp' src='https://solplay.de/TinyAdventure/index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 80%;'>
</iframe>

## Tiny Adventure

Tiny Adventure is a beginner-friendly Solana program created using the Anchor framework. The goal of this program is to show you how to create a simple game that allows players to track their position and move left or right.

The Tiny Adventure Program consists of only 3 instructions:

- `initialize` - This instruction sets up an on-chain account to store the player's position
- `move_left` - This instruction lets the player move their position to the left
- `move_right` - This instruction lets the player move their position to the right

In the upcoming sections, we'll walk through the process of building this game step by step.
You can find the complete source code, available to deploy from your browser, in this [Solana Playground example](https://beta.solpg.io/tutorials/tiny-adventure).

If need to familiarize yourself with the Anchor framework, feel free to check out the Anchor module of the [Solana Course](https://www.soldev.app/course) to get started.

### Getting Started

To start building the Tiny Adventure game, follow these steps:

Visit [Solana Playground](https://beta.solpg.io/) and create a new Anchor project. If you're new to Solana Playground, you'll also need to create a Playground Wallet. Here is an example of how to use Solana Playground:

![solpg.gif](./assets/hello-world/solpg.gif)

After creating a new project, replace the default starter code with the code below:

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

In this game, the player starts at position 0 and can move left or right. To show the player's progress throughout the game, we'll use message logs to display their journey.

### Defining the Game Data Account

The first step in building the game is to define a structure for the on-chain account that will store the player's position.

The `GameDataAccount` struct contains a single field, `player_position`, which stores the player's current position as an unsigned 8-bit integer.

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

### Initialize Instruction

After defining the program account, let’s implement the `initialize` instruction. This instruction initializes the `GameDataAccount` if it doesn't already exist, sets the `player_position` to 0, and print some message logs.

The `initialize` instruction requires 3 accounts:

- `new_game_data_account` - the `GameDataAccount` we are initializing
- `signer` - the player paying for the initialization of the `GameDataAccount`
- `system_program` - a required account when creating a new account

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

In this example, a Program Derived Address (PDA) is used for the `GameDataAccount` address. This enables us to deterministically locate the address later on. It is important to note that the PDA in this example is generated with a single fixed value as the seed (`level1`), limiting our program to creating only one `GameDataAccount`. The `init_if_needed` constraint then ensures that the `GameDataAccount` is initialized only if it doesn't already exist.

It is worth noting that the current implementation does not have any restrictions on who can modify the `GameDataAccount`. This effectively transforms the game into a multiplayer experience where everyone can control the player's movement.

Alternatively, you can use the signer's address as an extra seed in the `initialize` instruction, which would enable each player to create their own `GameDataAccount`.

### Move Left Instruction

Now that we can initialize a `GameDataAccount` account, let’s implement the `move_left` instruction. This lets a player update their `player_position`. In this example, moving left simply means decrementing the `player_position` by 1. We'll also set the minimum position to 0.

The only account needed for this instruction is the `GameDataAccount`.

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

### Move Right Instruction

Lastly, let’s implement the `move_right` instruction. Similarly, moving right will simply mean incrementing the `player_position` by 1. We’ll also limit the maximum position to 3.

Just like before, the only account needed for this instruction is the `GameDataAccount`.

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

### Build and Deploy

We've now completed the Tiny Adventure program! Your final program should resemble the following:

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

With the program completed, it's time to build and deploy it on Solana Playground!

If this is your first time using Solana Playground, create a Playground Wallet first and ensure that you're connected to a Devnet endpoint. Then, run `solana airdrop 2` until you have 6 SOL. Once you have enough SOL, build and deploy the program.


### Get Started with the Client

This next section will guide you through a simple client-side implementation for interacting with the game. We'll break down the code and provide detailed explanations for each step. In Solana Playground, navigate to the `client.ts` file and add the code snippets from the following sections.

First, let’s derive the PDA for the `GameDataAccount`. A PDA is a unique address in the format of a public key, derived using the program's ID and additional seeds. Feel free to check out the PDA lessons of the [Solana Course](https://www.soldev.app/course) for more details.

```js
// The PDA adress everyone will be able to control the character if the interact with your program
const [globalLevel1GameDataAccount, bump] =
  await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("level1", "utf8")],
    pg.program.programId
  );
```

Next, let’s try to fetch the game data account using the PDA from the previous step. If the account doesn't exist, we'll create it by invoking the `initialize` instruction from our program.

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

Now we are ready to interact with the game by moving left or right. This is done by invoking the `moveLeft` or `moveRight` instructions from the program and submitting a transaction to the Solana network. You can repeat this step as many times as you'd like.

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

Lastly, let’s use a `switch` statement to log the character's position based on the `playerPosition` value stored in the `gameDateAccount`. We’ll use this as a visual representation of the character's movement in the game.

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

Finally, run the client by clicking the “Run” button in Solana Playground. The output should be similar to the following:

```
Running client...
  client.ts:
    My address: 8ujtDmwpkQ4Bp4GU4zUWmzf65sc21utdcxFAELESca22
    My balance: 4.649749614 SOL
    Use 'solana confirm -v 4MRXEWfGqvmro1KsKb94Zz8qTZsPa9x99oMFbLBz2WicLnr8vdYYsQwT5u3pK5Vt1i9BDrVH5qqTXwtif6sCRJCy' to see the logs
    Player position is: 1
    ....o....
```

Congratulations! You have successfully built, deployed, and invoked the Tiny Adventure game from the client. To further illustrate the possibilities, check out this [demo](https://nextjs-tiny-adventure.vercel.app/) that demonstrates how to interact with the Tiny Adventure program through a Next.js frontend.

### Where to Go from Here

With the basic game complete, unleash your creativity and practice building independently by implementing your own ideas to enrich the game experience. Here are a few suggestions:

1. Modify the in-game texts to create an intriguing story. Invite a friend to play through your custom narrative and observe the on-chain transactions as they unfold!
2. Add a chest that rewards players with [Sol Rewards](./store-sol-in-pda) or let the player collect coins [Interact with tokens](./interact-with-tokens) as they progress through the game.
3. Create a grid that allows the player to move up, down, left, and right, and introduce multiple players for a more dynamic experience.

In the next installment, [Tiny Adventure Two](./store-sol-in-pda), we'll learn how to store SOL in the program and distribute it to players as rewards.
