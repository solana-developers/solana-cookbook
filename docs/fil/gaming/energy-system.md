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

# Sistema ng Enerhiya

Ang mga kaswal na laro ay karaniwang gumagamit ng mga sistema ng enerhiya, ibig sabihin, ang mga pagkilos sa laro ay nagkakahalaga ng enerhiya na muling pinupuno sa paglipas ng panahon. Sa gabay na ito tatalakayin natin kung paano bumuo ng isa sa Solana.
Inirerekomenda na magsimula sa [Hello World Example](../gaming/hello-world) kung wala kang anumang dating kaalaman sa Solana.

Narito ang isang kumpletong halimbawa ng source code batay sa Solana dapp scaffold na may react client:

[Source](https://github.com/solana-developers/solana-game-starter-kits/tree/main/lumberjack)

## Anchor program

Sa tutorial na ito, gagabayan ka namin sa proseso ng paglikha ng isang program na unti-unting nagre-replenishes sa mga reserbang enerhiya ng player sa paglipas ng panahon. Ito, sa turn, ay magbibigay-daan sa kanila na magsagawa ng iba't ibang mga aksyon sa loob ng laro.
Sa aming halimbawa, ang isang lumber jack ay magpuputol ng mga puno sa bawat puno ay nagbibigay ng isang kahoy at nagkakahalaga ng isang enerhiya.

### Paggawa ng player account

Una kailangan ng player na gumawa ng account na nagse-save sa estado ng aming player. Pansinin na ang last_login time ay nagse-save sa kasalukuyang unix time stamp ng player na nakikipag-ugnayan siya sa program.
Sa ganitong estado, magagawa nating kalkulahin kung gaano karaming enerhiya ang mayroon ang manlalaro sa isang tiyak na punto ng oras.
Mayroon din kaming halaga para sa kung gaano karaming kahoy ang ibinabato ng lumber jack sa laro.

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

### Pagputol ng mga puno
Pagkatapos ay sa tuwing tatawag ang manlalaro ng `chop tree` na pagtuturo ay susuriin natin kung ang manlalaro ay may sapat na lakas at gagantimpalaan siya ng isang kahoy.


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

### Kinakalkula ang enerhiya

Ang kawili-wiling bahagi ay nangyayari sa `update_energy` function. Sinusuri namin kung gaano karaming oras ang lumipas at kinakalkula ang enerhiya na magkakaroon ng manlalaro sa ibinigay na oras.
Ganun din ang gagawin namin sa client. Tamad kaming nag-a-update ng enerhiya sa halip na botohan ito sa lahat ng oras.
Ang ay isang karaniwang pamamaraan sa pagbuo ng laro.

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

Narito ang isang kumpletong halimbawa batay sa Solana dapp scaffold na may react client:
[Source](https://github.com/solana-developers/solana-game-starter-kits/tree/main/lumberjack)


### Lumikha ng koneksyon

Sa Anchor.ts file lumikha kami ng isang koneksyon:

```js
export const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
);
```

Pansinin na ang parameter ng pagkumpirma ay nakatakda sa 'nakumpirma'. Nangangahulugan ito na maghihintay kami hanggang sa makumpirma ang mga transaksyon sa halip na ma-finalize. Nangangahulugan ito na maghihintay tayo hanggang sa sabihin ng super majority ng network na valid ang transaksyon. Ito ay tumatagal ng humigit-kumulang 400ms at walang nakumpirmang transaksyon na hindi na-finalize. Kaya para sa mga laro ito ang perpektong bandila ng kumpirmasyon.

### Magsimula ng data ng player

Ang unang bagay na gagawin namin ay hanapin ang address ng programa para sa player account gamit ang seed string `manlalaro` at ang pampublikong key ng player. Pagkatapos ay tinatawagan namin ang `initPlayer` upang gawin ang account.

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

### Mag-subscribe sa mga update sa account

Dito makikita mo kung paano kumuha ng data ng account sa js client at kung paano mag-subscribe sa isang account. Gumagawa ang `connection.onAccountChange` ng socket connection sa RPC node na magtutulak ng anumang pagbabagong mangyayari sa account sa kliyente.
Ito ay mas mabilis kaysa sa pagkuha ng bagong data ng account pagkatapos ng bawat pagbabago.
Pagkatapos ay maaari nating gamitin ang `program.coder` upang i-decode ang data ng account sa mga uri ng TS at direktang gamitin ito sa laro.

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

### Kalkulahin ang enerhiya at ipakita ang count down

Sa javascript client, maaari nating gawin ang parehong logic tulad ng sa program para makalkula kung gaano karaming enerhiya ang mayroon ang player sa oras na ito at magpakita ng countdown timer para sa player upang malaman niya kung kailan magiging available ang susunod na enerhiya:

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

Sa pamamagitan nito maaari ka na ngayong bumuo ng anumang larong nakabatay sa enerhiya at kahit na ang isang tao ay bumuo ng isang bot para sa laro ang pinakamaraming magagawa niya ay maglaro nang mahusay, na marahil ay mas madaling makamit kapag naglalaro nang normal depende sa lohika ng iyong laro.

Ang larong ito ay nagiging mas mahusay kapag isinama sa [halimbawa ng Token](../gaming/interact-with-tokens) at talagang nag-drop ka ng ilang spl token sa mga manlalaro.
