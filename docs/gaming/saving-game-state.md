---
title: Saving game state
head:
  - - meta
    - name: title
      content: Solana Cookbook | Saving game state
  - - meta
    - name: og:title
      content: Solana Cookbook | Saving game state
  - - meta
    - name: description
      content: How to save the state of a game in a Solana program
  - - meta
    - name: og:description
      content: How to save the state of a game in a Solana program
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

# How to save game state

You can use Solana block chain to save the state of your game in program accounts. These are accounts that are owned by your program and they are derived from the program Id and some seeds. These can be thought of as data base entries. 
We can for example create a PlayerData account and use the players public key as a seed. This means every player can have one player account per wallet. These accounts can be up to 10Kb by default. If you need a bigger account look into [Manage big accounts](https://github.com/solana-developers/anchor-zero-copy-example)
This can be done in a program like this: 

```rust
pub fn init_player(ctx: Context<InitPlayer>) -> Result<()> {
    ctx.accounts.player.energy = MAX_ENERGY;
    ctx.accounts.player.health = MAX_HEALTH;
    ctx.accounts.player.last_login = Clock::get()?.unix_timestamp;
    Ok(())
}

#[derive(Accounts)]
pub struct InitPlayer <'info> {
    #[account( 
        init, 
        payer = signer,
        space = 1000,
        seeds = [b"player".as_ref(), signer.key().as_ref()],
        bump,
    )]
    pub player: Account<'info, PlayerData>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PlayerData {
    pub name: String,
    pub level: u8,
    pub xp: u64,
    pub health: u64,
    pub log: u64,
    pub energy: u64,
    pub last_login: i64
}

```

You can then interact with this player data via transaction instructions. Lets say we want the player to get experience for killing a monster for example: 

```rust
    pub fn kill_enemy(mut ctx: Context<KillEnemy>, enemyId: u8) -> Result<()> {
        let account = &mut ctx.accounts;

        ... handle energy

        if ctx.accounts.player.energy == 0 {
            return err!(ErrorCode::NotEnoughEnergy);
        }

        ... get enemy values by id and calculate battle

        ctx.accounts.player.xp = ctx.accounts.player.xp + 1;
        ctx.accounts.player.energy = ctx.accounts.player.energy - 1;

        ... handle level up
        
        msg!("You killed enemy and got 1 xp. You have {} xp and {} energy left.", ctx.accounts.player.xp, ctx.accounts.player.energy);
        Ok(())
    }
```

This is how this would look like from a js client: 

```js 
const wallet = useAnchorWallet();
const provider = new AnchorProvider(connection, wallet, {});
setProvider(provider);
const program = new Program(IDL, PROGRAM_ID, provider);

const [pda] = PublicKey.findProgramAddressSync(
  [Buffer.from("player", "utf8"), 
  publicKey.toBuffer()],
  new PublicKey(PROGRAM_ID)
);

try {
  const transaction = program.methods
    .initPlayer()
    .accounts({
      player: pda,
      signer: publicKey,
      systemProgram: SystemProgram.programId,
    })
    .transaction();

  const tx = await transaction;
  const txSig = await sendTransaction(tx, connection);
  await connection.confirmTransaction(txSig, "confirmed");
```

How to actually build this energy system you can learn here: 
[Building an Energy system](../gaming/energy-system)



