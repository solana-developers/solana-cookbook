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

# Pag-iimbak ng SOL sa mga PDA para sa Mga Gantimpala sa Laro

Walkthrough ng Video:
<div class="video-block">
<iframe width="320" height="200" src="https://www.youtube.com/embed/gILXyWvXu7M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Live na Bersyon. (gamitin ang devnet)
<iframe height='400' scrolling='no' title='OZXQWp' src='https://solplay.de/TinyAdventureTwo/index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 80%;'>
</iframe>

## Tiny Adventure Anchor Program - Ikalawang Bahagi

Sa tutorial na ito, bubuuin namin ang larong Tiny Adventure at magpapakilala ng chest na may reward na 0.1 SOL. Ang dibdib ay "spawn" sa isang partikular na posisyon, at kapag naabot ng manlalaro ang posisyon na iyon, makakatanggap sila ng gantimpala. Ang layunin ng programang ito ay ipakita kung paano mag-imbak ng SOL sa loob ng isang account ng programa at ipamahagi ito sa mga manlalaro.

Ang Tiny Adventure Two Program ay binubuo ng 3 instruction:

- `initialize_level_one` - Ang instruction na ito ay nagpapasimula ng dalawang on-chain na account: isa para sa pag-record ng posisyon ng player at isa pa para sa paghawak ng SOL reward na kumakatawan sa "reward chest".
- `reset_level_and_spawn_chest` - Nire-reset ng instruction na ito ang posisyon ng player sa zero at "re-respawn" ang isang reward chest sa pamamagitan ng paglilipat ng SOL mula sa user na gumagamit ng instruction sa reward chest account.
- `move_right` - Ang pagtuturo na ito ay nagbibigay-daan sa manlalaro na ilipat ang kanilang posisyon sa kanan at kolektahin ang SOL sa reward chest kapag naabot na nila ang isang partikular na posisyon.

Sa mga sumusunod na seksyon, gagabayan ka namin sa pagbuo ng programa nang sunud-sunod. Mahahanap mo ang kumpletong source code, na maaaring direktang i-deploy mula sa iyong browser gamit ang Solana Playground, sa link na ito: [Open In Playground](https://beta.solpg.io/tutorials/tiny-adventure-two).

### Nagsisimula

Upang simulan ang pagbuo ng larong Tiny Adventure, sundin ang mga hakbang na ito:

Bisitahin ang [Solana Playground](https://beta.solpg.io/) at gumawa ng bagong Anchor project. Kung bago ka sa Solana Playground, kakailanganin mo ring gumawa ng Playground Wallet.

Pagkatapos gumawa ng bagong proyekto, palitan ang default na starter code ng code sa ibaba:

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

Sa larong ito, magsisimula ang manlalaro sa posisyon 0 at makakagalaw lamang sa kanan. Upang mailarawan ang pag-unlad ng manlalaro sa buong laro, gagamit kami ng mga log ng mensahe upang kumatawan sa kanilang paglalakbay patungo sa reward chest!

### Pagtukoy sa Chest Vault Account

Idagdag ang `CHEST_REWARD` na pare-pareho sa simula ng programa. Ang `CHEST_REWARD` ay kumakatawan sa dami ng lamports na ilalagay sa chest at ibibigay bilang mga reward. Ang mga Lampor ay ang pinakamaliit na bahagi ng isang SOL, na may 1 bilyong lampor na katumbas ng 1 SOL.

Para mag-imbak ng SOL reward, tutukuyin namin ang isang bagong `ChestVaultAccount` struct. Isa itong walang laman na struct dahil direkta nating ia-update ang mga lamports sa account. Hahawakan ng account ang gantimpala ng SOL at hindi na kailangang mag-imbak ng anumang karagdagang data.

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

### Pagtukoy sa Game Data Account

Upang masubaybayan ang posisyon ng manlalaro sa loob ng laro, kailangan nating tukuyin ang isang istraktura para sa on-chain na account na mag-iimbak ng posisyon ng manlalaro.

Ang `GameDataAccount` struct ay naglalaman ng isang field, `player_position`, na nag-iimbak ng kasalukuyang posisyon ng player bilang isang unsigned 8-bit integer.

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

Sa tinukoy na `GameDataAccount` struct, maaari mo na itong gamitin upang mag-imbak at mag-update ng posisyon ng player habang nakikipag-ugnayan sila sa laro. Habang ang manlalaro ay gumagalaw nang pakanan at sumusulong sa laro, ang kanilang posisyon ay ia-update sa loob ng `GameDataAccount`, na magbibigay-daan sa iyong subaybayan ang kanyang pag-usad patungo sa dibdib na naglalaman ng SOL reward.

### Simulan ang Level One Instruction

Sa tinukoy na `GameDataAccount` at `ChestVaultAccount`, ipatupad natin ang instruction na `initialize_level_one`. Sinisimulan ng instruction na ito ang `GameDataAccount` at `ChestVaultAccount`, itinatakda ang posisyon ng manlalaro sa 0, at ipinapakita ang panimulang mensahe.

Ang instruction na `initialize_level_one` ay nangangailangan ng 4 na account:

- `new_game_data_account` - ang `GameDataAccount` na sinisimulan nating iimbak ang posisyon ng player
- `chest_vault` - ang `ChestVaultAccount` na sinisimulan nating iimbak ang SOL reward
- `signer` - ang manlalaro na nagbabayad para sa pagsisimula ng mga account
- `system_program` - isang kinakailangang account kapag gumagawa ng bagong account

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

Parehong ginawa ang `GameDataAccount` at `ChestVaultAccount` gamit ang Program Derived Address (PDA) bilang address ng account, na nagbibigay-daan sa amin na tiyak na mahanap ang address sa ibang pagkakataon. Tinitiyak ng hadlang na `init_if_needed` na ang mga account ay sinisimulan lamang kung wala pa ang mga ito. Dahil ang mga PDA para sa parehong mga account sa pagtuturo na ito ay gumagamit ng isang nakapirming binhi, ang aming programa ay maaari lamang lumikha ng isa sa bawat uri ng account. Sa katunayan, ang pagtuturo ay kakailanganin lamang na gamitin nang isang beses.

Kapansin-pansin na ang kasalukuyang pagpapatupad ay walang anumang mga paghihigpit sa kung sino ang maaaring baguhin ang `GameDataAccount`, na epektibong ginagawang isang multiplayer na karanasan ang laro kung saan makokontrol ng lahat ang paggalaw ng manlalaro.

Bilang kahalili, maaari mong gamitin ang address ng lumagda bilang isang karagdagang binhi sa pagtuturo na `pasimulan`, na nagpapahintulot sa bawat manlalaro na lumikha ng kanilang sariling `GameDataAccount`.

### I-reset ang Antas at Pagtuturo sa Dibdib ng Spawn

Susunod, ipatupad natin ang instruction na `reset_level_and_spawn_chest`, na nagre-reset sa posisyon ng player sa simula at pinupuno ang dibdib ng reward na 0.1 SOL.

Ang pagtuturo sa `reset_level_and_spawn_chest` ay nangangailangan ng 4 na account:

- `new_game_data_account` - ang `GameDataAccount` na nag-iimbak ng posisyon ng player
- `chest_vault` - ang `ChestVaultAccount` na nag-iimbak ng SOL reward
- `signer` - ang player na nagbibigay ng SOL reward para sa chest
- `system_program` - ang program na ipapatawag namin upang ilipat ang SOL gamit ang isang cross-program invocation (CPI), higit pa dito sa ilang sandali

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

Kasama sa instruction na ito ang cross-program invocation (CPI) para ilipat ang SOL mula sa nagbabayad patungo sa `ChestVaultAccount`. Ang cross-program invocation ay kapag ang isang programa ay nag-invoke ng pagtuturo sa isa pang programa. Sa kasong ito, gumagamit kami ng CPI para i-invoke ang instruction na `Transfer` mula sa `system_program` para ilipat ang SOL mula sa nagbabayad patungo sa `ChestVaultAccount`.

Ang mga cross-program invocations ay isang pangunahing konsepto sa Solana programming model, na nagbibigay-daan sa mga program na direktang makipag-ugnayan sa mga instruction mula sa iba pang mga program. Para sa mas malalim na pagsisid sa mga CPI, huwag mag-atubiling tuklasin ang mga aralin sa CPI na available sa [Solana Course](https://www.soldev.app/course).

### Pagtuturo sa Pakanan

Panghuli, ipatupad natin ang instruction na `move_right` na kinabibilangan ng logic para sa pagkolekta ng chest reward. Kapag naabot ng isang manlalaro ang posisyon 3 at naipasok ang tamang "password", ililipat ang reward mula sa **`ChestVaultAccount`** papunta sa account ng manlalaro. Kung ang isang maling password ay ipinasok, isang custom na Anchor Error ay ibabalik. Kung ang manlalaro ay nasa posisyon 3 na, isang mensahe ang mai-log. Kung hindi, ang posisyon ay dagdagan ng 1 upang kumatawan sa paglipat sa kanan.

Ang pangunahing layunin ng functionality na "password" na ito ay upang ipakita kung paano isama ang mga parameter sa isang pagtuturo at ang pagpapatupad ng mga custom na Anchor Error para sa pinahusay na paghawak ng error. Sa halimbawang ito, ang tamang password ay magiging "gib".

Ang instruction na `move_right` ay nangangailangan ng 3 account:

- `new_game_data_account` - ang `GameDataAccount` na nag-iimbak ng posisyon ng player
- `chest_vault` - ang `ChestVaultAccount` na nag-iimbak ng SOL reward
- `player_wallet` - ang wallet ng player na humihiling ng pagtuturo at ang potensyal na tatanggap ng SOL reward

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

Upang ilipat ang mga lampor mula sa reward chest papunta sa player account, hindi kami maaaring gumamit ng Cross-Program Invocation (CPI) tulad ng ginawa namin dati, dahil ang `ChestVaultAccount` ay hindi pagmamay-ari ng system program. Sa halip, direkta nating binabago ang mga lamport sa loob ng mga account sa pamamagitan ng paggamit ng `try_borrow_mut_laports`. Tandaan na ang account na iyong ibinabawas sa mga laport ay dapat na isang signer, at palaging tinitiyak ng runtime na ang kabuuang balanse ng account ay mananatiling pantay pagkatapos ng isang transaksyon.

Tandaan na ang Program Derived Accounts (PDAs) ay nag-aalok ng dalawang pangunahing feature:

1. Magbigay ng isang tiyak na paraan upang mahanap ang address ng isang account
2. Payagan ang programa kung saan nagmula ang isang PDA na "mag-sign" para sa kanila

Ito ang dahilan kung bakit namin nagagawang ibawas ang mga lampor mula sa `ChestVaultAccount` nang hindi tahasang nangangailangan ng dagdag na pumirma para sa pagtuturo.

### Bumuo at I-deploy

Mahusay na trabaho! Nakumpleto mo na ngayon ang ikalawang bahagi ng programang Tiny Adventure! Ang iyong huling programa ay dapat magmukhang ganito:

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
    // Dapat nating tukuyin ang espasyo upang makapagsimula ng account.
    // Ang unang 8 byte ay default na discriminator ng account,
    // ang susunod na 1 byte ay mula sa NewAccount.data na uri u8.
    // (u8 = 8 bits unsigned integer = 8 bytes)
    // Maaari mo ring gamitin ang lumagda bilang seed [signer.key().as_ref()],
    #[account(
        init_if_needed,
        seeds = [b"level1"],
        bump,
        payer = signer,
        space = 8 + 1
    )]
    pub new_game_data_account: Account<'info, GameDataAccount>,
    // Ito ang PDA kung saan idedeposito natin ang reward na SOL at
    // mula sa kung saan ipinadala namin ito pabalik sa unang manlalaro na umabot sa dibdib.
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

Ngayong kumpleto na ang programa, buuin at i-deploy natin ito gamit ang Solana Playground!

Kung bago ka sa Solana Playground, magsimula sa paggawa ng Playground Wallet at tiyaking nakakonekta ka sa isang Devnet endpoint. Susunod, patakbuhin `solana airdrop 2` hanggang magkaroon ka ng 6 na SOL. Kapag mayroon kang sapat na SOL, buuin at i-deploy ang programa.

### Magsimula sa Kliyente

Sa seksyong ito, tatalakayin natin ang isang simpleng pagpapatupad sa panig ng kliyente para sa pakikipag-ugnayan sa laro. Sisirain namin ang code at magbibigay ng mga detalyadong paliwanag para sa bawat hakbang. Upang makapagsimula, mag-navigate sa `client.ts` na file sa Solana Playground, alisin ang placeholder code, at idagdag ang mga snippet ng code mula sa mga sumusunod na seksyon.

Una, kunin natin ang mga PDA (Program Derived Addresses) para sa `GameDataAccount` at `ChestVaultAccount`. Ang PDA ay isang natatanging address sa format ng isang pampublikong susi, na hinango gamit ang ID ng programa at mga karagdagang binhi.

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

Susunod, tatawagin namin ang instruction na `initializeLevelOne` para i-set up ang `GameDataAccount` at `ChestVaultAccount`.

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

Pagkatapos nito, gagamitin namin ang instruction na `resetLevelAndSpawnChest` para itakda ang posisyon ng player sa 0 at punan ang `ChestVaultAccount` ng 0.1 SOL.

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

Ngayon ay maaari na tayong makipag-ugnayan sa laro sa pamamagitan ng pagtawag sa `moveRight` na pagtuturo. Sa halimbawang ito, uulitin namin ang instruction na ito hanggang sa maabot ng manlalaro ang posisyon upang mangolekta ng reward mula sa `ChestVaultAccount`.

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

Panghuli, pindutin ang "Run" na buton sa Solana Playground para i-execute ang client. Kapag nag-input ka ng kahit ano maliban sa "gib" bilang password para sa **`moveRight`** na pagtuturo, dapat mong makita ang sumusunod na mensahe ng error kapag naabot mo ang posisyon upang i-claim ang chest reward:

```
Error Code: WrongPassword. Error Number: 6000. Error Message: Password was wrong.
```

Gayunpaman, kung ipinasok mo ang tamang password, ang output ay dapat maging katulad ng sumusunod:

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

Magaling! Matagumpay kang nakagawa, na-deploy, at nakipag-ugnayan sa Tiny Adventure Two mula sa panig ng kliyente. Nagsama ka ng bagong feature na nagbibigay-daan sa mga manlalaro na mangolekta ng mga reward sa pamamagitan ng pag-abot sa dibdib sa dulo ng level. Bukod dito, natutunan mo kung paano maglipat ng SOL sa loob ng isang Anchor program gamit ang mga cross-program invocations at sa pamamagitan ng direktang pagbabago ng mga lampor sa mga account.

Huwag mag-atubiling magpatuloy sa pagbuo nang nakapag-iisa at pahusayin ang laro gamit ang mga karagdagang feature tulad ng mga bagong level o alternatibong reward!