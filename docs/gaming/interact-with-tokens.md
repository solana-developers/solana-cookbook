---
title: How interact with tokens in programs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Using tokens in games on Solana
  - - meta
    - name: og:title
      content: Solana Cookbook | Using tokens in games on Solana
  - - meta
    - name: description
      content: Learn how to use tokens in Solana games with an on-chain tutorial
  - - meta
    - name: og:description
      content: Learn how to use tokens in Solana games with an on-chain tutorial
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

# Using tokens in games on Solana

Tokens on Solana can serve various purposes, such as in-game rewards, incentives, or other applications. For example, you can create tokens and distribute them to players when they complete specific in-game actions.

## Create, Mint, and Burn Tokens with Anchor

In this tutorial, we will build a game using Anchor to introduce the basics of interacting with the Token Program on Solana. The game will be structured around four main actions: creating a new token mint, initializing player accounts, rewarding players for defeating enemies, and allowing players to heal by burning tokens.

The program consists of 4 instructions:

- `create_mint` - This instruction creates a new token mint with a Program Derived Address (PDA) as the mint authority and creates the metadata account for the mint. We will add a constraint that allows only an "admin" to invoke this instruction
- `init_player` - This instruction initializes a new player account with a starting health of 100
- `kill_enemy` - This instruction deducts 10 health points from the player account upon “defeating an enemy” and mints 1 token as a reward for the player
- `heal` - This instruction allows a player to burn 1 token to restore their health back to 100

For a high-level overview of the relationship among user wallets, token mints, token accounts, and token metadata accounts, consider exploring this portion of the [Metaplex documentation](https://docs.metaplex.com/programs/token-metadata/overview).

### Getting Started

To start building the program, follow these steps:

Visit the [Solana Playground](https://beta.solpg.io/) and create a new Anchor project. If you're new to Solana Playground, you'll also need to create a Playground Wallet.

After creating a new project, replace the default starter code with the code below:

```rust
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{create_metadata_accounts_v3, CreateMetadataAccountsV3, Metadata},
    token::{burn, mint_to, Burn, Mint, MintTo, Token, TokenAccount},
};
use mpl_token_metadata::{pda::find_metadata_account, state::DataV2};
use solana_program::{pubkey, pubkey::Pubkey};

declare_id!("11111111111111111111111111111111");

#[program]
pub mod anchor_token {
    use super::*;
}
```

Here we are simply bringing into scope the crates and corresponding modules we will be using for this program. We’ll be using the `anchor_spl` and `mpl_token_metadata` crates to help us interact with the Token program and the Token Metadata program.

### Create Mint instruction

First, let’s implement an instruction to create a new token mint and its metadata account. The on-chain token metadata, including the name, symbol, and URI, will be provided as parameters to the instruction.

Additionally, we'll only allow an "admin" to invoke this instruction by defining an `ADMIN_PUBKEY` constant and using it as a constraint. Be sure to replace the `ADMIN_PUBKEY` with your Solana Playground wallet public key.

The `create_mint` instruction requires the following accounts:

- `admin` - the `ADMIN_PUBKEY` that signs the transaction and pays for the initialization of the accounts
- `reward_token_mint` - the new token mint we are initializing, using a PDA as both the mint account’s address and its mint authority
- `metadata_account` - the metadata account we are initializing for the token mint
- `token_program` - required for interacting with instructions on the Token program
- `token_metadata_program` - required account for interacting with instructions on the Token Metadata program
- `system_program`- a required account when creating a new account
- `rent` - Sysvar Rent, a required account when creating the metadata account

```rust
// Only this public key can call this instruction
const ADMIN_PUBKEY: Pubkey = pubkey!("REPLACE_WITH_YOUR_WALLET_PUBKEY");

#[program]
pub mod anchor_token {
    use super::*;

    // Create new token mint with PDA as mint authority
    pub fn create_mint(
        ctx: Context<CreateMint>,
        uri: String,
        name: String,
        symbol: String,
    ) -> Result<()> {
        // PDA seeds and bump to "sign" for CPI
        let seeds = b"reward";
        let bump = *ctx.bumps.get("reward_token_mint").unwrap();
        let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];

        // On-chain token metadata for the mint
        let data_v2 = DataV2 {
            name: name,
            symbol: symbol,
            uri: uri,
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        };

        // CPI Context
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata_account.to_account_info(), // the metadata account being created
                mint: ctx.accounts.reward_token_mint.to_account_info(), // the mint account of the metadata account
                mint_authority: ctx.accounts.reward_token_mint.to_account_info(), // the mint authority of the mint account
                update_authority: ctx.accounts.reward_token_mint.to_account_info(), // the update authority of the metadata account
                payer: ctx.accounts.admin.to_account_info(), // the payer for creating the metadata account
                system_program: ctx.accounts.system_program.to_account_info(), // the system program account
                rent: ctx.accounts.rent.to_account_info(), // the rent sysvar account
            },
            signer,
        );

        create_metadata_accounts_v3(
            cpi_ctx, // cpi context
            data_v2, // token metadata
            true,    // is_mutable
            true,    // update_authority_is_signer
            None,    // collection details
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMint<'info> {
    #[account(
        mut,
        address = ADMIN_PUBKEY
    )]
    pub admin: Signer<'info>,

    // The PDA is both the address of the mint account and the mint authority
    #[account(
        init,
        seeds = [b"reward"],
        bump,
        payer = admin,
        mint::decimals = 9,
        mint::authority = reward_token_mint,

    )]
    pub reward_token_mint: Account<'info, Mint>,

    ///CHECK: Using "address" constraint to validate metadata account address
    #[account(
        mut,
        address=find_metadata_account(&reward_token_mint.key()).0
    )]
    pub metadata_account: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub token_metadata_program: Program<'info, Metadata>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}
```

The `create_mint` instruction creates a new token mint, using a Program Derived Address (PDA) as both the address of the token mint and its mint authority. The instruction takes a URI (off-chain metadata), name, and symbol as parameters.

This instruction then creates a metadata account for the token mint through a Cross-Program Invocation (CPI) calling the `create_metadata_accounts_v3` instruction from the Token Metadata program.

The PDA is used to "sign" the CPI since it is the mint authority, which is a required signer when creating the metadata account for a mint. The instruction data (URI, name, symbol) is included in the `DataV2` struct to specify the new token mint's metadata.

We also verify that the address of the `admin` account signing the transaction matches the value of the `ADMIN_PUBKEY` constant to ensure only the intended wallet can invoke this instruction.

```rust
const ADMIN_PUBKEY: Pubkey = pubkey!("REPLACE_WITH_YOUR_WALLET_PUBKEY");
```

### Init Player Instruction

Next, let's implement the `init_player` instruction which creates a new player account with an initial health of 100. The constant `MAX_HEALTH` is set to 100 to represent the starting health.

The `init_player` instruction requires the following accounts:

- `player_data` - the new player account we are initializing, which will store the player's health
- `player` - the user who signs the transaction and pays for the initialization of the account
- `system_program` - a required account when creating a new account

```rust
// Player max health
const MAX_HEALTH: u8 = 100;

#[program]
pub mod anchor_token {
    use super::*;
    ...

    // Create new player account
    pub fn init_player(ctx: Context<InitPlayer>) -> Result<()> {
        ctx.accounts.player_data.health = MAX_HEALTH;
        Ok(())
    }
}
...

#[derive(Accounts)]
pub struct InitPlayer<'info> {
    #[account(
        init,
        payer = player,
        space = 8 + 8,
        seeds = [b"player".as_ref(), player.key().as_ref()],
        bump,
    )]
    pub player_data: Account<'info, PlayerData>,
    #[account(mut)]
    pub player: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PlayerData {
    pub health: u8,
}
```

The `player_data` account is initialized using a Program Derived Address (PDA) with the `player` public key as one of the seeds. This ensures that each `player_data` account is unique and associated with the `player`, allowing every player to create their own `player_data` account.

### Kill Enemy Instruction

Next, let's implement the `kill_enemy` instruction which reduces the player's health by 10 and mints 1 token to the player's token account as a reward.

The `kill_enemy` instruction requires the following accounts:

- `player` - the player receiving the token
- `player_data` - the player data account storing the player’s current health
- `player_token_account` - the player's associated token account where tokens will be minted
- `reward_token_mint` - the token mint account, specifying the type of token that will be minted
- `token_program` - required for interacting with instructions on the token program
- `associated_token_program` - required when working with associated token accounts
- `system_program` - a required account when creating a new account

```rust
#[program]
pub mod anchor_token {
    use super::*;
    ...

    // Mint token to player token account
    pub fn kill_enemy(ctx: Context<KillEnemy>) -> Result<()> {
        // Check if player has enough health
        if ctx.accounts.player_data.health == 0 {
            return err!(ErrorCode::NotEnoughHealth);
        }
        // Subtract 10 health from player
        ctx.accounts.player_data.health = ctx.accounts.player_data.health.checked_sub(10).unwrap();

        // PDA seeds and bump to "sign" for CPI
        let seeds = b"reward";
        let bump = *ctx.bumps.get("reward_token_mint").unwrap();
        let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];

        // CPI Context
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.reward_token_mint.to_account_info(),
                to: ctx.accounts.player_token_account.to_account_info(),
                authority: ctx.accounts.reward_token_mint.to_account_info(),
            },
            signer,
        );

        // Mint 1 token, accounting for decimals of mint
        let amount = (1u64)
            .checked_mul(10u64.pow(ctx.accounts.reward_token_mint.decimals as u32))
            .unwrap();

        mint_to(cpi_ctx, amount)?;
        Ok(())
    }
}
...

#[derive(Accounts)]
pub struct KillEnemy<'info> {
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(
        mut,
        seeds = [b"player".as_ref(), player.key().as_ref()],
        bump,
    )]
    pub player_data: Account<'info, PlayerData>,

    // Initialize player token account if it doesn't exist
    #[account(
        init_if_needed,
        payer = player,
        associated_token::mint = reward_token_mint,
        associated_token::authority = player
    )]
    pub player_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"reward"],
        bump,
    )]
    pub reward_token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Not enough health")]
    NotEnoughHealth,
}
```

The player's health is reduced by 10 to represent the “battle with the enemy”. We’ll also check the player's current health and return a custom Anchor error if the player has 0 health.

The instruction then uses a cross-program invocation (CPI) to call the `mint_to` instruction from the Token program and mints 1 token of the `reward_token_mint` to the `player_token_account` as a reward for killing the enemy.

Since the mint authority for the token mint is a Program Derived Address (PDA), we can mint tokens directly by calling this instruction without additional signers. The program can "sign" on behalf of the PDA, allowing token minting without explicitly requiring extra signers.

### Heal Instruction

Next, let's implement the `heal` instruction which allows a player to burn 1 token and restore their health to its maximum value.

The `heal` instruction requires the following accounts:

- `player` - the player executing the healing action
- `player_data` - the player data account storing the player’s current health
- `player_token_account` - the player's associated token account where the tokens will be burned
- `reward_token_mint` - the token mint account, specifying the type of token that will be burned
- `token_program` - required for interacting with instructions on the token program
- `associated_token_program` - required when working with associated token accounts

```rust
#[program]
pub mod anchor_token {
    use super::*;
    ...

    // Burn token to health player
    pub fn heal(ctx: Context<Heal>) -> Result<()> {
        ctx.accounts.player_data.health = MAX_HEALTH;

        // CPI Context
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: ctx.accounts.reward_token_mint.to_account_info(),
                from: ctx.accounts.player_token_account.to_account_info(),
                authority: ctx.accounts.player.to_account_info(),
            },
        );

        // Burn 1 token, accounting for decimals of mint
        let amount = (1u64)
            .checked_mul(10u64.pow(ctx.accounts.reward_token_mint.decimals as u32))
            .unwrap();

        burn(cpi_ctx, amount)?;
        Ok(())
    }
}
...

#[derive(Accounts)]
pub struct Heal<'info> {
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(
        mut,
        seeds = [b"player".as_ref(), player.key().as_ref()],
        bump,
    )]
    pub player_data: Account<'info, PlayerData>,

    #[account(
        mut,
        associated_token::mint = reward_token_mint,
        associated_token::authority = player
    )]
    pub player_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"reward"],
        bump,
    )]
    pub reward_token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}
```

The player's health is restored to its maximum value using the `heal` instruction. The instruction then uses a cross-program invocation (CPI) to call the `burn` instruction from the Token program, which burns 1 token from the `player_token_account` to heal the player.

### Build and Deploy

Great job! You've now completed the program! Go ahead and build and deploy it using the Solana Playground. Your final program should look like this:

```rust
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{create_metadata_accounts_v3, CreateMetadataAccountsV3, Metadata},
    token::{burn, mint_to, Burn, Mint, MintTo, Token, TokenAccount},
};
use mpl_token_metadata::{pda::find_metadata_account, state::DataV2};
use solana_program::{pubkey, pubkey::Pubkey};

declare_id!("CCLnXJAJYFjCHLCugpBCEQKrpiSApiRM4UxkBUHJRrv4");

const ADMIN_PUBKEY: Pubkey = pubkey!("REPLACE_WITH_YOUR_WALLET_PUBKEY");
const MAX_HEALTH: u8 = 100;

#[program]
pub mod anchor_token {
    use super::*;

    // Create new token mint with PDA as mint authority
    pub fn create_mint(
        ctx: Context<CreateMint>,
        uri: String,
        name: String,
        symbol: String,
    ) -> Result<()> {
        // PDA seeds and bump to "sign" for CPI
        let seeds = b"reward";
        let bump = *ctx.bumps.get("reward_token_mint").unwrap();
        let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];

        // On-chain token metadata for the mint
        let data_v2 = DataV2 {
            name: name,
            symbol: symbol,
            uri: uri,
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        };

        // CPI Context
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata_account.to_account_info(), // the metadata account being created
                mint: ctx.accounts.reward_token_mint.to_account_info(), // the mint account of the metadata account
                mint_authority: ctx.accounts.reward_token_mint.to_account_info(), // the mint authority of the mint account
                update_authority: ctx.accounts.reward_token_mint.to_account_info(), // the update authority of the metadata account
                payer: ctx.accounts.admin.to_account_info(), // the payer for creating the metadata account
                system_program: ctx.accounts.system_program.to_account_info(), // the system program account
                rent: ctx.accounts.rent.to_account_info(), // the rent sysvar account
            },
            signer,
        );

        create_metadata_accounts_v3(
            cpi_ctx, // cpi context
            data_v2, // token metadata
            true,    // is_mutable
            true,    // update_authority_is_signer
            None,    // collection details
        )?;

        Ok(())
    }

    // Create new player account
    pub fn init_player(ctx: Context<InitPlayer>) -> Result<()> {
        ctx.accounts.player_data.health = MAX_HEALTH;
        Ok(())
    }

    // Mint tokens to player token account
    pub fn kill_enemy(ctx: Context<KillEnemy>) -> Result<()> {
        // Check if player has enough health
        if ctx.accounts.player_data.health == 0 {
            return err!(ErrorCode::NotEnoughHealth);
        }
        // Subtract 10 health from player
        ctx.accounts.player_data.health = ctx.accounts.player_data.health.checked_sub(10).unwrap();

        // PDA seeds and bump to "sign" for CPI
        let seeds = b"reward";
        let bump = *ctx.bumps.get("reward_token_mint").unwrap();
        let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];

        // CPI Context
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.reward_token_mint.to_account_info(),
                to: ctx.accounts.player_token_account.to_account_info(),
                authority: ctx.accounts.reward_token_mint.to_account_info(),
            },
            signer,
        );

        // Mint 1 token, accounting for decimals of mint
        let amount = (1u64)
            .checked_mul(10u64.pow(ctx.accounts.reward_token_mint.decimals as u32))
            .unwrap();

        mint_to(cpi_ctx, amount)?;
        Ok(())
    }

    // Burn Token to health player
    pub fn heal(ctx: Context<Heal>) -> Result<()> {
        ctx.accounts.player_data.health = MAX_HEALTH;

        // CPI Context
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: ctx.accounts.reward_token_mint.to_account_info(),
                from: ctx.accounts.player_token_account.to_account_info(),
                authority: ctx.accounts.player.to_account_info(),
            },
        );

        // Burn 1 token, accounting for decimals of mint
        let amount = (1u64)
            .checked_mul(10u64.pow(ctx.accounts.reward_token_mint.decimals as u32))
            .unwrap();

        burn(cpi_ctx, amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMint<'info> {
    #[account(
        mut,
        address = ADMIN_PUBKEY
    )]
    pub admin: Signer<'info>,

    // The PDA is both the address of the mint account and the mint authority
    #[account(
        init,
        seeds = [b"reward"],
        bump,
        payer = admin,
        mint::decimals = 9,
        mint::authority = reward_token_mint,

    )]
    pub reward_token_mint: Account<'info, Mint>,

    ///CHECK: Using "address" constraint to validate metadata account address
    #[account(
        mut,
        address=find_metadata_account(&reward_token_mint.key()).0
    )]
    pub metadata_account: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub token_metadata_program: Program<'info, Metadata>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct InitPlayer<'info> {
    #[account(
        init,
        payer = player,
        space = 8 + 8,
        seeds = [b"player".as_ref(), player.key().as_ref()],
        bump,
    )]
    pub player_data: Account<'info, PlayerData>,
    #[account(mut)]
    pub player: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct KillEnemy<'info> {
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(
        mut,
        seeds = [b"player".as_ref(), player.key().as_ref()],
        bump,
    )]
    pub player_data: Account<'info, PlayerData>,

    // Initialize player token account if it doesn't exist
    #[account(
        init_if_needed,
        payer = player,
        associated_token::mint = reward_token_mint,
        associated_token::authority = player
    )]
    pub player_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"reward"],
        bump,
    )]
    pub reward_token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Heal<'info> {
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(
        mut,
        seeds = [b"player".as_ref(), player.key().as_ref()],
        bump,
    )]
    pub player_data: Account<'info, PlayerData>,

    #[account(
        mut,
        associated_token::mint = reward_token_mint,
        associated_token::authority = player
    )]
    pub player_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"reward"],
        bump,
    )]
    pub reward_token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

#[account]
pub struct PlayerData {
    pub health: u8,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Not enough health")]
    NotEnoughHealth,
}
```

### Get Started with the Client

In this section, we'll walk you through a simple client-side implementation for interacting with the program. To get started, navigate to the `client.ts` file in Solana Playground, remove the placeholder code, and add the code snippets from the following sections.

Start by adding the following code for the setup.

```js
import { Metaplex } from "@metaplex-foundation/js";
import { getMint, getAssociatedTokenAddressSync } from "@solana/spl-token";

// metaplex token metadata program ID
const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

// metaplex setup
const metaplex = Metaplex.make(pg.connection);

// token metadata
const metadata = {
  uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
  name: "Solana Gold",
  symbol: "GOLDSOL",
};

// reward token mint PDA
const [rewardTokenMintPda] = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from("reward")],
  pg.PROGRAM_ID
);

// player data account PDA
const [playerPDA] = anchor.web3.PublicKey.findProgramAddressSync(
  [Buffer.from("player"), pg.wallet.publicKey.toBuffer()],
  pg.PROGRAM_ID
);

// reward token mint metadata account address
const rewardTokenMintMetadataPDA = await metaplex
  .nfts()
  .pdas()
  .metadata({ mint: rewardTokenMintPda });

// player token account address
const playerTokenAccount = getAssociatedTokenAddressSync(
  rewardTokenMintPda,
  pg.wallet.publicKey
);
```

Next, add the following two helper functions.  These functions will be used to confirm transactions and fetch account data.

```js
async function logTransaction(txHash) {
  const { blockhash, lastValidBlockHeight } =
    await pg.connection.getLatestBlockhash();

  await pg.connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature: txHash,
  });

  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
}

async function fetchAccountData() {
  const [playerBalance, playerData] = await Promise.all([
    pg.connection.getTokenAccountBalance(playerTokenAccount),
    pg.program.account.playerData.fetch(playerPDA),
  ]);

  console.log("Player Token Balance: ", playerBalance.value.uiAmount);
  console.log("Player Health: ", playerData.health);
}
```

Next, invoke the `createMint` instruction to create a new token mint if it does not already exist.

```js
let txHash;

try {
  const mintData = await getMint(pg.connection, rewardTokenMintPda);
  console.log("Mint Already Exists");
} catch {
  txHash = await pg.program.methods
    .createMint(metadata.uri, metadata.name, metadata.symbol)
    .accounts({
      rewardTokenMint: rewardTokenMintPda,
      metadataAccount: rewardTokenMintMetadataPDA,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
    })
    .rpc();
  await logTransaction(txHash);
}
console.log("Token Mint: ", rewardTokenMintPda.toString());
```

Next, call the `initPlayer` instruction to create a new player account if one does not already exist.

```js
try {
  const playerData = await pg.program.account.playerData.fetch(playerPDA);
  console.log("Player Already Exists");
  console.log("Player Health: ", playerData.health);
} catch {
  txHash = await pg.program.methods
    .initPlayer()
    .accounts({
      playerData: playerPDA,
      player: pg.wallet.publicKey,
    })
    .rpc();
  await logTransaction(txHash);
  console.log("Player Account Created");
}
```

Next, invoke the `killEnemy` instruction.

```js
txHash = await pg.program.methods
  .killEnemy()
  .accounts({
    playerData: playerPDA,
    playerTokenAccount: playerTokenAccount,
    rewardTokenMint: rewardTokenMintPda,
  })
  .rpc();
await logTransaction(txHash);
console.log("Enemy Defeated");
await fetchAccountData();
```

Next, invoke the `heal` instruction.

```js
txHash = await pg.program.methods
  .heal()
  .accounts({
    playerData: playerPDA,
    playerTokenAccount: playerTokenAccount,
    rewardTokenMint: rewardTokenMintPda,
  })
  .rpc();
await logTransaction(txHash);
console.log("Player Healed");
await fetchAccountData();
```

Finally, run the client by clicking the “Run” button in Solana Playground. You can copy the Token Mint address printed to the console and verify on Solana Explorer that the token now has metadata. The output should be similar to the following:

```
Running client...
  client.ts:
    Use 'solana confirm -v 3AWnpt2Wy6jQckue4QeKsgDNKhKkhpewPmRtxvJpzxGgvK9XK9KEpTiUzAQ5vSC6CUoUjc6xWZCtrihVrFy8sACC' to see the logs
    Token Mint:  3eS7hdyeVX5g8JGhn3Z7qFXJaewoJ8hzgvubovQsPm4S
    Use 'solana confirm -v 63jbBr5U4LG75TiiHfz65q7yKJfHDhGP2ocCiDat5M2k4cWtUMAx9sHvxhnEguLDKXMbDUQKUt1nhvyQkXoDhxst' to see the logs
    Player Account Created
    Use 'solana confirm -v 2ziK41WLoxfEHvtUgc5c1SyKCAr5FvAS54ARBJrjqh9GDwzYqu7qWCwHJCgMZyFEVovYK5nUZhDRHPTMrTjq1Mm6' to see the logs
    Enemy Defeated
    Player Token Balance:  1
    Player Health:  90
    Use 'solana confirm -v 2QoAH22Q3xXz9t2TYRycQMqpEmauaRvmUfZ7ZNKUEoUyHWqpjW972VD3eZyeJrXsviaiCC3g6TE54oKmKbFQf2Q7' to see the logs
    Player Healed
    Player Token Balance:  0
    Player Health:  100
```