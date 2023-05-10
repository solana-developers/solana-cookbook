---
title: Sauvegarder l'état d'un jeu
head:
  - - meta
    - name: title
      content: Solana Cookbook | Sauvegarder l'état d'un jeu
  - - meta
    - name: og:title
      content: Solana Cookbook | Sauvegarder l'état d'un jeu
  - - meta
    - name: description
      content: Comment sauvegarder l'état d'un jeu dans un programme Solana ?
  - - meta
    - name: og:description
      content: Comment sauvegarder l'état d'un jeu dans un programme Solana ?
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

# Comment sauvegarder l'état d'un jeu ?

Vous pouvez utiliser la blockchain Solana pour sauvegarder l'état de votre jeu dans des comptes de programme. Il s'agit de comptes qui appartiennent à votre programme et qui sont dérivés de l'identifiant du programme et de certaines seeds. On peut les considérer comme des entrées de base de données.
Nous pouvons par exemple créer un compte PlayerData et utiliser la clé publique du joueur comme seed. Cela signifie que chaque joueur peut avoir un compte de joueur par portefeuille. Ces comptes peuvent avoir une taille maximale de 10 Ko par défaut. Si vous avez besoin d'un compte plus grand, consultez [Gérer les grands comptes](https://github.com/solana-developers/anchor-zero-copy-example)
Cela peut être fait dans un programme comme cela :

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

Vous pouvez ensuite interagir avec ces données par le biais d'instructions de transaction. Disons, par exemple, que nous voulons que le joueur obtienne de l'expérience en tuant un monstre : 

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

Voici à quoi cela ressemblerait à partir d'un client js :

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

Pour savoir comment construire ce mécanisme d'énergie, veuillez consulter le chapitre suivant :
[Construire un système d'énergie](../gaming/energy-system)



