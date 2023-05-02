---
title: Storing SOL in a PDA
head:
  - - meta
    - name: title
      content: Solana Cookbook | Storing SOL in a PDA
  - - meta
    - name: og:title
      content: Solana Cookbook | Storing SOL in a PDA
  - - meta
    - name: description
      content: Using PDAs, you can reward SOL to players playing your game. Learn how to reward SOL from a PDA when players find chests in this game.
  - - meta
    - name: og:description
      content: Using PDAs, you can reward SOL to players playing your game. Learn how to reward SOL from a PDA when players find chests in this game.
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

# Storing SOL in PDAs for Game Rewards

Video Walkthrough:
<div class="video-block">
<iframe width="320" height="200" src="https://www.youtube.com/embed/gILXyWvXu7M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Live Version. (use devnet)
<iframe height='400' scrolling='no' title='OZXQWp' src='https://solplay.de/TinyAdventureTwo/index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 80%;'>
</iframe>

## Tiny Adventure Anchor Program - Part Two

In this tutorial, we will rebuild the Tiny Adventure game and introduce a chest with a reward of 0.1 SOL. The chest will "spawn" at a specific position, and when the player reaches that position, they will receive the reward. The goal of this program is to demonstrate how to store SOL within a program account and distribute it to players.

The Tiny Adventure Two Program consists of 3 instructions:

- `initialize_level_one` - This instruction initializes two on-chain accounts: one for recording the player's position and another for holding the SOL reward that represents the “reward chest”.
- `reset_level_and_spawn_chest` - This instruction resets the player's position to zero and "respawns" a reward chest by transferring SOL from the user invoking the instruction to the reward chest account.
- `move_right` - This instruction allows the player to move their position to the right and collect the SOL in the reward chest once they reach a specific position.

In the following sections, we will guide you through building the program step by step. You can find the complete source code, which can be deployed directly from your browser using the Solana Playground, at this link:  [Open In Playground](https://beta.solpg.io/tutorials/tiny-adventure-two).

### Getting Started

To start building the Tiny Adventure game, follow these steps:

Visit the [Solana Playground](https://beta.solpg.io/) and create a new Anchor project. If you're new to Solana Playground, you'll also need to create a Playground Wallet.

After creating a new project, replace the default starter code with the code below:

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

In this game, the player starts at position 0 and can only move right. To visualize the player's progress throughout the game, we'll use message logs to represent their journey towards the reward chest!

### Defining the Chest Vault Account

Add the `CHEST_REWARD` constant at the beginning of the program. The `CHEST_REWARD` represents the amount of lamports that will be put into the chest and given out as rewards. Lamports are the smallest fractions of a SOL, with 1 billion lamports being equal to 1 SOL.

To store the SOL reward, we will define a new `ChestVaultAccount` struct. This is an empty struct because we will be directly updating the lamports in the account. The account will hold the SOL reward and does not need to store any additional data.

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

### Defining the Game Data Account

To keep track of the player's position within the game, we need to define a structure for the on-chain account that will store the player's position.

The `GameDataAccount` struct contains a single field, `player_position`, which stores the player's current position as an unsigned 8-bit integer.

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

With the `GameDataAccount` struct defined, you can now use it to store and update the player's position as they interact with the game. As the player moves right and progresses through the game, their position will be updated within the `GameDataAccount`, allowing you to track their progress towards the chest containing the SOL reward.

### Initialize Level One Instruction

With the `GameDataAccount` and `ChestVaultAccount` defined, let's implement the `initialize_level_one` instruction. This instruction initializes both the `GameDataAccount` and `ChestVaultAccount`, sets the player's position to 0, and displays the starting message.

The `initialize_level_one` instruction requires 4 accounts:

- `new_game_data_account` - the `GameDataAccount` we are initializing to store the player’s position
- `chest_vault` - the `ChestVaultAccount` we are initializing to store the SOL reward
- `signer` - the player paying for the initialization of the accounts
- `system_program` - a required account when creating a new account

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

Both the `GameDataAccount` and `ChestVaultAccount` are created using a Program Derived Address (PDA) as the address of the account, allowing us to deterministically locate the address later. The `init_if_needed` constraint ensures that the accounts are only initialized if they don't already exist. Since the PDAs for both accounts in this instruction use a single fixed seed, our program can only create one of each type of account. In effect, the instruction would only ever need to be invoked one time.

It's worth noting that the current implementation does not have any restrictions on who can modify the `GameDataAccount`, effectively turning the game into a multiplayer experience where everyone can control the player's movement.

Alternatively, you can use the signer's address as an extra seed in the `initialize` instruction, allowing each player to create their own `GameDataAccount`.

### Reset Level and Spawn Chest Instruction

Next, let's implement the `reset_level_and_spawn_chest` instruction, which resets the player's position to the start and fills up the chest with a reward of 0.1 SOL.

The `reset_level_and_spawn_chest` instruction requires 4 accounts:

- `new_game_data_account` - the `GameDataAccount` storing the player's position
- `chest_vault` - the `ChestVaultAccount` storing the SOL reward
- `signer` - the player providing the SOL reward for the chest
- `system_program` - the program we'll be invoking to transfer SOL using a cross-program invocation (CPI), more on this shortly

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

This instruction includes a cross-program invocation (CPI) to transfer SOL from the payer to the `ChestVaultAccount`. A cross-program invocation is when one program invokes an instruction on another program. In this case, we use a CPI to invoke the `Transfer` instruction from the `system_program` to transfer SOL from the payer to the `ChestVaultAccount`.

Cross-program invocations are a key concept in the Solana programming model, enabling programs to directly interact with instructions from other programs. For a deeper dive into of CPIs, feel free to explore the CPI lessons available in the [Solana Course](https://www.soldev.app/course).

### Move Right Instruction

Finally, let's implement the `move_right` instruction which includes the logic for collecting the chest reward. When a player reaches position 3 and inputs the correct “password”, the reward is transferred from the **`ChestVaultAccount`** to the player's account. If an incorrect password is entered, a custom Anchor Error is returned. If the player is already at position 3, a message will be logged. Otherwise, the position will be incremented by 1 to represent moving to the right.

The main purpose of this "password" functionality is to demonstrate how to incorporate parameters into an instruction and the implementation of custom Anchor Errors for improved error handling. In this example, the correct password will be "gib".

The `move_right` instruction requires 3 accounts:

- `new_game_data_account` - the `GameDataAccount` storing the player's position
- `chest_vault` - the `ChestVaultAccount` storing the SOL reward
- `player_wallet` - the wallet of the player invoking the instruction and the potential recipient of SOL reward

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

To transfer lamports from the reward chest to the player account, we can't use a Cross-Program Invocation (CPI) as we did previously, since the `ChestVaultAccount` isn't owned by the system program. Instead, we directly modify the lamports within the accounts by using `try_borrow_mut_lamports`.  Keep in mind that the account you deduct lamports from must be a signer, and the runtime always makes sure that the total account balances stay equal after a transaction.

Note that Program Derived Accounts (PDAs) offer two main features:

1. Provide a deterministic way to find an account's address
2. Allow the program from which a PDA is derived to "sign" for them

This is the reason we are able to deduct lamports from the `ChestVaultAccount` without explicitly requiring an extra signer for the instruction.

### Build and Deploy

Great job! You've now completed part two of the Tiny Adventure program! Your final program should look like this:

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

Now that the program is complete, let's build and deploy it using the Solana Playground!

If you're new to the Solana Playground, start by creating a Playground Wallet and make sure you're connected to a Devnet endpoint. Next, run `solana airdrop 2` until you have 6 SOL. Once you have enough SOL,  build and deploy the program.

### Get Started with the Client

In this section, we'll walk through a simple client-side implementation for interacting with the game. We will break down the code and provide detailed explanations for each step. To get started, navigate to the `client.ts` file in Solana Playground, remove the placeholder code, and add the code snippets from the following sections.

First, let's derive the PDAs (Program Derived Addresses) for the `GameDataAccount` and `ChestVaultAccount`. A PDA is a unique address in the format of a public key, derived using the program's ID and additional seeds.

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

Next, we'll call the `initializeLevelOne` instruction to set up the `GameDataAccount` and `ChestVaultAccount`.

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

After that, we'll use the `resetLevelAndSpawnChest` instruction to set the player's position to 0 and fill the `ChestVaultAccount` with 0.1 SOL.

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

Now we can interact with the game by calling the `moveRight` instruction. In this example, we'll loop through this instruction until the player reaches the position to collect the reward from the `ChestVaultAccount`.

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

Finally, press the "Run" button in the Solana Playground to execute the client. When you input anything other than "gib" as the password for the **`moveRight`** instruction, you should encounter the following error message upon reaching the position to claim the chest reward:

```
Error Code: WrongPassword. Error Number: 6000. Error Message: Password was wrong.
```

However, if you enter the correct password, the output should resemble the following:

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

Well done! You have successfully created, deployed, and interacted with Tiny Adventure Two from the client side. You've incorporated a new feature that allows players to collect rewards by reaching the chest at the end of the level. Moreover, you've learned how to transfer SOL within an Anchor program using cross-program invocations and by directly modifying lamports in accounts.

Feel free to continue building independently and enhance the game with additional features like new levels or alternative rewards!