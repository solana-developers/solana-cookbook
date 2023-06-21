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

# Paano i-save ang estado ng laro

Maaari mong gamitin ang Solana block chain para i-save ang estado ng iyong laro sa mga program account. Ito ay mga account na pagmamay-ari ng iyong programa at ang mga ito ay hango sa program Id at ilang mga buto. Ang mga ito ay maaaring isipin bilang mga entry ng data base.
Halimbawa, maaari tayong lumikha ng isang PlayerData account at gamitin ang pampublikong key ng mga manlalaro bilang isang binhi. Nangangahulugan ito na ang bawat manlalaro ay maaaring magkaroon ng isang player account sa bawat wallet. Ang mga account na ito ay maaaring hanggang 10Kb bilang default. Kung kailangan mo ng mas malaking account, tingnan ang [Manage big accounts](https://github.com/solana-developers/anchor-zero-copy-example)
Magagawa ito sa isang programa tulad nito:

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

Maaari kang makipag-ugnayan sa data ng player na ito sa pamamagitan ng mga instruction sa transaksyon. Sabihin nating gusto nating magkaroon ng karanasan ang player para sa pagpatay ng halimaw halimbawa:

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

Ganito ang magiging hitsura nito mula sa isang js client:

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

Kung paano aktwal na buuin ang sistema ng enerhiya na ito maaari mong matutunan dito:
[Pagbuo ng sistema ng Enerhiya](../gaming/energy-system)
