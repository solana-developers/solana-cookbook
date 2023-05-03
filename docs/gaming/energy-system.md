---
title: Energy System
head:
  - - meta
    - name: title
      content: Solana Cookbook | Energy System
  - - meta
    - name: og:title
      content: Solana Cookbook | Energy System in Solana Games
  - - meta
    - name: description
      content: Build Energy Systems for Casual Games on Solana with these Easy Steps
  - - meta
    - name: og:description
      content: Build Energy Systems for Casual Games on Solana with these Easy Steps
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

# Energy System

Casual games commonly use energy systems, meaning that actions in the game cost energy which refills over time. In this guide we will walk through how to build one on Solana.
It is recommended to start with the [Hello World Example](../gaming/hello-world) if you do not have any prior Solana knowledge.

Here is a complete example source code based on the Solana dapp scaffold with a react client:

[Source](https://github.com/solana-developers/solana-game-starter-kits/tree/main/lumberjack)

## Anchor program

In this tutorial, we will guide you through the process of creating a program that gradually replenishes the player's energy reserves over time. This, in turn, will enable them to execute various actions within the game.
In our example, a lumber jack will chops trees with every tree rewarding one wood and cost one energy.

### Creating the player account

First the player needs to create an account which saves the state of our player. Notice the last_login time saves the current unix time stamp of the player he interacts with the program.
With this state, we will be able to calculate how much energy the player has at a certain point in time.
We also have a value for how much wood the lumber jack chucks in the game.

```rust

pub fn init_player(ctx: Context<InitPlayer>) -> Result<()> {
    ctx.accounts.player.energy = MAX_ENERGY;
    ctx.accounts.player.last_login = Clock::get()?.unix_timestamp;
    Ok(())
}

...

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
    pub wood: u64,
    pub energy: u64,
    pub last_login: i64
}
```

### Choping trees

Then whenever the player calls the `chop_tree` instruction we will check if the player has enough energy and reward him with one wood.

```rust
    #[error_code]
    pub enum ErrorCode {
        #[msg("Not enough energy")]
        NotEnoughEnergy,
    }

    pub fn chop_tree(mut ctx: Context<ChopTree>) -> Result<()> {
        let account = &mut ctx.accounts;
        update_energy(account)?;

        if ctx.accounts.player.energy == 0 {
            return err!(ErrorCode::NotEnoughEnergy);
        }

        ctx.accounts.player.wood = ctx.accounts.player.wood + 1;
        ctx.accounts.player.energy = ctx.accounts.player.energy - 1;
        msg!("You chopped a tree and got 1 wood. You have {} wood and {} energy left.", ctx.accounts.player.wood, ctx.accounts.player.energy);
        Ok(())
    }
```

### Calculating the energy

The interesting part happens in the `update_energy` function. We check how much time has passed and calculate the energy that the player will have at the given time.
We will do the same in the client. We lazily update the energy instead of polling it all the time.
The is a common technique in game development.

```rust

const TIME_TO_REFILL_ENERGY: i64 = 60;
const MAX_ENERGY: u64 = 10;

pub fn update_energy(ctx: &mut ChopTree) -> Result<()> {
    let mut time_passed: i64 = &Clock::get()?.unix_timestamp - &ctx.player.last_login;
    let mut time_spent: i64 = 0;
    while time_passed > TIME_TO_REFILL_ENERGY {
        ctx.player.energy = ctx.player.energy + 1;
        time_passed -= TIME_TO_REFILL_ENERGY;
        time_spent += TIME_TO_REFILL_ENERGY;
        if ctx.player.energy == MAX_ENERGY {
            break;
        }
    }

    if ctx.player.energy >= MAX_ENERGY {
        ctx.player.last_login = Clock::get()?.unix_timestamp;
    } else {
        ctx.player.last_login += time_spent;
    }

    Ok(())
}
```

## Js client

Here is a complete example based on the Solana dapp scaffold with a react client:
[Source](https://github.com/solana-developers/solana-game-starter-kits/tree/main/lumberjack)


### Create connection

In the Anchor.ts file we create a connection:

```js
export const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
);
```

Notice that the confirmation parameter is set to 'confirmed'. This means that we wait until the transactions are confirmed instead of finalized. This means that we wait until the super majority of the network said that the transaction is valid. This takes around 400ms and there was never a confirmed transaction which did not get finalized. So for games this is the perfect confirmation flag.

### Initialize player data

First thing we do is find the program address for the player account using the seed string `player`and the player's public key. Then we call `initPlayer` to create the account.

```js
const [pda] = PublicKey.findProgramAddressSync(
  [Buffer.from("player", "utf8"), publicKey.toBuffer()],
  new PublicKey(LUMBERJACK_PROGRAM_ID)
);

const transaction = program.methods
  .initPlayer()
  .accounts({
    player: pda,
    signer: publicKey,
    systemProgram: SystemProgram.programId,
  })
  .transaction();

const tx = await transaction;
const txSig = await sendTransaction(tx, connection, {
  skipPreflight: true,
});

await connection.confirmTransaction(txSig, "confirmed");

```

### Subscribe to account updates

Here you can see how to get account data in the js client and how to subscribe to an account. `connection.onAccountChange` creates a socket connection to the RPC node which will push any changes that happen to the account to the client.
This is faster than fetching new account data after every change.
We can then use the `program.coder` to decode the account data into the TS types and directly use it in the game.

```js
useEffect(() => {
    if (!publicKey) {return;}
    const [pda] = PublicKey.findProgramAddressSync(
        [Buffer.from("player", "utf8"), publicKey.toBuffer()],
        new PublicKey(LUMBERJACK_PROGRAM_ID)
      );
    try {
      program.account.playerData.fetch(pda).then((data) => {
        setGameState(data);
      });
    } catch (e) {
      window.alert("No player data found, please init!");
    }

    connection.onAccountChange(pda, (account) => {
        setGameState(program.coder.accounts.decode("playerData", account.data));
    });

  }, [publicKey]);
```

### Calculate energy and show count down

In the javascript client we can then perform the same logic as in the program to precalculate how much energy the player would have at this point in time and show a countdown timer for the player so that he knows when the next energy will be available:

```js
useEffect(() => {
    const interval = setInterval(async () => {
        if (gameState == null || gameState.lastLogin == undefined || gameState.energy >= 10) {return;}
        const lastLoginTime = gameState.lastLogin * 1000;
        let timePassed = ((Date.now() - lastLoginTime) / 1000);
        while (timePassed > TIME_TO_REFILL_ENERGY && gameState.energy < MAX_ENERGY) {
            gameState.energy = (parseInt(gameState.energy) + 1);
            gameState.lastLogin = parseInt(gameState.lastLogin) + TIME_TO_REFILL_ENERGY;
            timePassed -= TIME_TO_REFILL_ENERGY;
        }
        setTimePassed(timePassed);
        let nextEnergyIn = Math.floor(TIME_TO_REFILL_ENERGY - timePassed);
        if (nextEnergyIn < TIME_TO_REFILL_ENERGY && nextEnergyIn > 0) {
            setEnergyNextIn(nextEnergyIn);
        } else {
            setEnergyNextIn(0);
        }

    }, 1000);

    return () => clearInterval(interval);
}, [gameState, timePassed]);

...

{(gameState && <div className="flex flex-col items-center">
    {("Wood: " + gameState.wood + " Energy: " + gameState.energy + " Next energy in: " + nextEnergyIn )}
</div>)}

```

With this you can now build any energy based game and even if someone builds a bot for the game the most he can do is play optimally, which maybe even easier to achieve when playing normally depending on the logic of your game.

This game becomes even better when combined with the [Token example](../gaming/interact-with-tokens) and you actually drop some spl token to the players.
