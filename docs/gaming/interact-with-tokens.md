---
title: How interact with tokens in programs
head:
  - - meta
    - name: title
      content: Solana Cookbook | How interact with tokens in programs
  - - meta
    - name: og:title
      content: Solana Cookbook | How interact with tokens in programs
  - - meta
    - name: description
      content: A small game that shows how game can interact with the Solana block chain
  - - meta
    - name: og:description
      content: A small game that shows how game can interact with the Solana block chain
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

# How to interact with tokens

Solana has tokens which can be used as rewards for games. The tokens use the SPL Token program and are following all the same standard.
You can store these Tokens in a Solana program and send them to player when they do certain actions in the game.
Problem here is that a Token Account needs to be owned by the SPL Token Program. 
So to work around this we can create a Token Account and then set the Authority of this account to our PDA. 

This will be the owner of the token account that will be owned by the program: 

```js 
    #[account(
        init_if_needed,
        payer = signer,
        seeds=[b"token_account_owner_pda".as_ref()],
        bump,
        space = 8
    )]
    token_account_owner_pda: AccountInfo<'info>,
```

And this is how we can derive the Token Account. As you can see the seeds are a string and the mint of the token. Like this we can have a token_vault for any token we want. 
The authority is our token pda. What [Anchor Framework](https://www.anchor-lang.com/) does internally is creating a token account and setting its authority to our pda. 

```js
    #[account(
        init_if_needed,
        payer = signer,
        seeds=[b"token_vault".as_ref(), mint_of_token_being_sent.key().as_ref()],
        token::mint=mint_of_token_being_sent,
        token::authority=token_account_owner_pda,
        bump
    )]
    vault_token_account: Account<'info, TokenAccount>,
```

We also need to pass in the Token Mint and the token account of the sender so that the Solana runtime knows all the accounts needed in advance. 

```js
    #[account(mut)]
    pub sender_token_account: Account<'info, TokenAccount>,

    pub mint_of_token_being_sent: Account<'info, Mint>,
```

With all accounts in place we can then trigger a transfer from the users token account to the token account owned by our PDA: 

```js
    let transfer_instruction = Transfer {
        from: ctx.accounts.sender_token_account.to_account_info(),
        to: ctx.accounts.vault_token_account.to_account_info(),
        authority: ctx.accounts.signer.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        transfer_instruction,
    );

    anchor_spl::token::transfer(cpi_ctx, data)?;
```

When we want to transfer something out of the token account that is owned by our PDA we need to invoke the cross program invocation with the same seeds we used to create the PDA: 

```js 
        let transfer_instruction = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.sender_token_account.to_account_info(),
            authority: ctx.accounts.token_account_owner_pda.to_account_info(),
        };

        let seeds = &[b"token_account_owner_pda".as_ref(), &[bump]];
        let signer = &[&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            transfer_instruction,
            signer,
        );

        anchor_spl::token::transfer(cpi_ctx, data)?;
```

This is how you can find the correct PDA addresses in the js client:

```js 
let [tokenAccountOwnerPda, bump] = await PublicKey.findProgramAddress(
  [Buffer.from("token_account_owner_pda", "utf8")],
  pg.PROGRAM_ID
);

let [token_vault, bump2] = await PublicKey.findProgramAddress(
  [Buffer.from("token_vault", "utf8"), mint.toBuffer()],
  pg.PROGRAM_ID
);
```

These account addresses we can then pass in the transaction. It's a nice trick to set skipPreflight to true so you can copy the signature into a Solana explorer and see exactly what happened on chain. Without it the transaction would fail in the simulation step if you have an error. 

```js
let accounts = {
  tokenAccountOwnerPda: tokenAccountOwnerPda,
  vaultTokenAccount: token_vault,
  senderTokenAccount: tokenAccount.address,
  mintOfTokenBeingSent: mint,
  signer: pg.wallet.publicKey,
};

let confirmOptions = {
  skipPreflight: true,
};

let txHash = await pg.program.methods
  .initialize(bump, new anchor.BN(1000))
  .accounts(accounts)
  .signers([pg.wallet.keypair])
  .rpc(confirmOptions);
```

Here the whole code to copy paste. You can for example run it in [Solana Playground](https://beta.solpg.io/)<br />

Anchor: 

```js
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{CloseAccount, Mint, Token, TokenAccount, Transfer},
};

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("EpsdsqPKT9giZAzLDcaqk1Ys5VLEYfXJh2H6mSpEDQ63");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, bump: u8, data: u64) -> Result<()> {
        msg!("Changed data to: {}!", data);

        // Below is the actual instruction that we are going to send to the Token program.
        let transfer_instruction = Transfer {
            from: ctx.accounts.sender_token_account.to_account_info(),
            to: ctx.accounts.vault_token_account.to_account_info(),
            authority: ctx.accounts.signer.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            transfer_instruction,
        );

        // The `?` at the end will cause the function to return early in case of an error.
        // This pattern is common in Rust.
        anchor_spl::token::transfer(cpi_ctx, data)?;

        // Below is the actual instruction that we are going to send to the Token program.
        let transfer_instruction = Transfer {
            from: ctx.accounts.vault_token_account.to_account_info(),
            to: ctx.accounts.sender_token_account.to_account_info(),
            authority: ctx.accounts.token_account_owner_pda.to_account_info(),
        };

        let seeds = &[b"token_account_owner_pda".as_ref(), &[bump]];
        let signer = &[&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            transfer_instruction,
            signer,
        );

        // The `?` at the end will cause the function to return early in case of an error.
        // This pattern is common in Rust.
        anchor_spl::token::transfer(cpi_ctx, data)?;

        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // Derived PDAs
    #[account(
        init_if_needed,
        payer = signer,
        seeds=[b"token_account_owner_pda".as_ref()],
        bump,
        space = 8
    )]
    token_account_owner_pda: AccountInfo<'info>,

    #[account(
        init_if_needed,
        payer = signer,
        seeds=[b"token_vault".as_ref(), mint_of_token_being_sent.key().as_ref()],
        token::mint=mint_of_token_being_sent,
        token::authority=token_account_owner_pda,
        bump
    )]
    vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub sender_token_account: Account<'info, TokenAccount>,

    pub mint_of_token_being_sent: Account<'info, Mint>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
    token_program: Program<'info, Token>,
    rent: Sysvar<'info, Rent>,
}

```

And the js client to transfer 1000 tokens in the vault and send it out again:

```js 
import {
  TOKEN_PROGRAM_ID,
  createMint,
  getMint,
  mintTo,
  getAccount,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";


const mintAuthority = pg.wallet.keypair;
const freezeAuthority = Keypair.generate();

const mint = await createMint(
  pg.connection,
  pg.wallet.keypair,
  mintAuthority.publicKey,
  freezeAuthority.publicKey,
  9 // We are using 9 decimals to match the CLI decimal default exactly
);

let [tokenAccountOwnerPda, bump] = await PublicKey.findProgramAddress(
  [Buffer.from("token_account_owner_pda", "utf8")],
  pg.PROGRAM_ID
);

let [token_vault, bump2] = await PublicKey.findProgramAddress(
  [Buffer.from("token_vault", "utf8"), mint.toBuffer()],
  pg.PROGRAM_ID
);

console.log("Mint: " + mint.toBase58());

let mintInfo = await getMint(pg.connection, mint);

console.log("Mint Supply" + mintInfo.supply.toString());

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  pg.connection,
  pg.wallet.keypair,
  mint,
  pg.wallet.keypair.publicKey
);

console.log("SenderTokeAccount: " + tokenAccount.address.toBase58());
console.log("VaultAccount: " + token_vault);
console.log("TokenAccountOwnerPda: " + tokenAccountOwnerPda);
console.log("Signer: " + pg.wallet.publicKey);

let tokenAccountInfo = await getAccount(pg.connection, tokenAccount.address);

console.log("Owned token amount: " + tokenAccountInfo.amount.toString());

await mintTo(
  pg.connection,
  pg.wallet.keypair,
  mint,
  tokenAccount.address,
  mintAuthority,
  100000000000 // 100 Token with 9 decimals
);

mintInfo = await getMint(pg.connection, mint);

console.log(mintInfo.supply.toString());

tokenAccountInfo = await getAccount(pg.connection, tokenAccount.address);
console.log(tokenAccountInfo.amount.toString());

let accounts = {
  tokenAccountOwnerPda: tokenAccountOwnerPda,
  vaultTokenAccount: token_vault,
  senderTokenAccount: tokenAccount.address,
  mintOfTokenBeingSent: mint,
  signer: pg.wallet.publicKey,
};
console.log(`accounts ${accounts}'`);

let confirmOptions = {
  skipPreflight: true,
};
let txHash = await pg.program.methods
  .initialize(bump, new anchor.BN(1000))
  .accounts(accounts)
  .signers([pg.wallet.keypair])
  .rpc(confirmOptions);

console.log(`solana confirm -v ${txHash}`);
await pg.connection.confirmTransaction(txHash);

```
