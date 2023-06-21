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

# Paggamit ng mga token sa mga laro sa Solana

Ang mga token sa Solana ay maaaring maghatid ng iba't ibang layunin, gaya ng mga in-game na reward, insentibo, o iba pang application. Halimbawa, maaari kang lumikha ng mga token at ipamahagi ang mga ito sa mga manlalaro kapag nakumpleto nila ang mga partikular na in-game na aksyon.

## Lumikha, Mint, at Mag-burn ng mga Token gamit ang Anchor

Sa tutorial na ito, bubuo kami ng laro gamit ang Anchor para ipakilala ang mga pangunahing kaalaman sa pakikipag-ugnayan sa Token Program sa Solana. Ang laro ay bubuoin sa paligid ng apat na pangunahing aksyon: paggawa ng bagong token mint, pagsisimula ng mga account ng manlalaro, pagbibigay ng reward sa mga manlalaro sa pagkatalo sa mga kaaway, at pagpapahintulot sa mga manlalaro na gumaling sa pamamagitan ng pagsunog ng mga token.

Ang programa ay binubuo ng 4 na mga instruction:

- `create_mint` - Lumilikha ang instruction na ito ng bagong token mint na may Program Derived Address (PDA) bilang awtoridad ng mint at gumagawa ng metadata account para sa mint. Magdaragdag kami ng isang hadlang na nagbibigay-daan lamang sa isang "admin" na gamitin ang instruction na ito
- `init_player` - Ang instruction na ito ay nagpapasimula ng bagong player account na may panimulang kalusugan na 100
- `kill_enemy` - Ibinabawas ng instruction na ito ang 10 health point mula sa player account kapag "natalo ang isang kaaway" at nagbibigay ng 1 token bilang reward para sa player
- `heal` - Ang pagtuturo na ito ay nagbibigay-daan sa isang manlalaro na magsunog ng 1 token upang maibalik ang kanilang kalusugan sa 100

Para sa isang mataas na antas na pangkalahatang-ideya ng ugnayan ng mga wallet ng user, token mints, token account, at token metadata account, isaalang-alang ang pag-explore sa bahaging ito ng [dokumentasyon ng Metaplex](https://docs.metaplex.com/programs/token-metadata /pangkalahatang-ideya).

### Pagsisimula

Upang simulan ang pagbuo ng programa, sundin ang mga hakbang na ito:

Bisitahin ang [Solana Playground](https://beta.solpg.io/) at gumawa ng bagong Anchor project. Kung bago ka sa Solana Playground, kakailanganin mo ring gumawa ng Playground Wallet.

Pagkatapos gumawa ng bagong proyekto, palitan ang default na starter code ng code sa ibaba:

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

Dito ay dinadala lamang namin sa saklaw ang mga crates at kaukulang mga module na aming gagamitin para sa program na ito. Gagamitin namin ang `anchor_spl` at `mpl_token_metadata` crates upang matulungan kaming makipag-ugnayan sa Token program at sa Token Metadata program.

### Lumikha ng pagtuturo ng Mint

Una, ipatupad natin ang isang instruction para gumawa ng bagong token mint at ang metadata account nito. Ang on-chain token metadata, kasama ang pangalan, simbolo, at URI, ay ibibigay bilang mga parameter sa pagtuturo.

Bukod pa rito, papayagan lang namin ang isang "admin" na gamitin ang instruction na ito sa pamamagitan ng pagtukoy ng `ADMIN_PUBKEY` na pare-pareho at paggamit nito bilang isang hadlang. Tiyaking palitan ang `ADMIN_PUBKEY` ng iyong Solana Playground wallet na pampublikong key.

Ang instruction na `create_mint` ay nangangailangan ng mga sumusunod na account:

- `admin` - ang `ADMIN_PUBKEY` na pumipirma sa transaksyon at nagbabayad para sa pagsisimula ng mga account
- `reward_token_mint` - ang bagong token mint na sinisimulan namin, gamit ang isang PDA bilang parehong address ng mint account at awtoridad nito sa mint
- `metadata_account` - ang metadata account na sinisimulan namin para sa token mint
- `token_program` - kinakailangan para sa pakikipag-ugnayan sa mga instruction sa Token program
- `token_metadata_program` - kinakailangang account para sa pakikipag-ugnayan sa mga instruction sa Token Metadata program
- `system_program`- isang kinakailangang account kapag gumagawa ng bagong account
- `rent` - Sysvar Rent, isang kinakailangang account kapag gumagawa ng metadata account

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

Ang instruction na `create_mint` ay lumilikha ng bagong token mint, gamit ang Program Derived Address (PDA) bilang parehong address ng token mint at ang awtoridad ng mint nito. Ang pagtuturo ay kumukuha ng URI (off-chain metadata), pangalan, at simbolo bilang mga parameter.

Ang instruction na ito ay gagawa ng metadata account para sa token mint sa pamamagitan ng Cross-Program Invocation (CPI) na tumatawag sa `create_metadata_accounts_v3` na pagtuturo mula sa Token Metadata program.

Ginagamit ang PDA para "pirmahan" ang CPI dahil ito ang awtoridad ng mint, na kinakailangang lumagda kapag gumagawa ng metadata account para sa isang mint. Ang data ng pagtuturo (URI, pangalan, simbolo) ay kasama sa `DataV2` struct upang tukuyin ang metadata ng bagong token mint.

Bini-verify din namin na ang address ng `admin` account na pumipirma sa transaksyon ay tumutugma sa halaga ng `ADMIN_PUBKEY` na pare-pareho upang matiyak na ang nilalayong wallet lang ang makakapag-invoke ng instruction na ito.

```rust
const ADMIN_PUBKEY: Pubkey = pubkey!("REPLACE_WITH_YOUR_WALLET_PUBKEY");
```

### Init Player Instruction

Susunod, ipatupad natin ang instruction na `init_player` na lumilikha ng bagong account ng manlalaro na may paunang kalusugan na 100. Ang pare-parehong `MAX_HEALTH` ay nakatakda sa 100 upang kumatawan sa panimulang kalusugan.

Ang instruction na `init_player` ay nangangailangan ng mga sumusunod na account:

- `player_data` - ang bagong account ng manlalaro na aming sinisimulan, na mag-iimbak ng kalusugan ng manlalaro
- `player` - ang user na pumirma sa transaksyon at nagbabayad para sa pagsisimula ng account
- `system_program` - isang kinakailangang account kapag gumagawa ng bagong account

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

Sinisimulan ang `player_data` account gamit ang Program Derived Address (PDA) na may public key na `player` bilang isa sa mga seed. Tinitiyak nito na ang bawat `player_data` account ay natatangi at nauugnay sa `player`, na nagpapahintulot sa bawat manlalaro na lumikha ng kanilang sariling `player_data` account.

### Instruksyon ng Patayin ang Kaaway

Susunod, ipatupad natin ang instruction na `kill_enemy` na nagbabawas ng 10 sa kalusugan ng manlalaro at nagbibigay ng 1 token sa token account ng manlalaro bilang reward.

Ang instruction na `kill_enemy` ay nangangailangan ng mga sumusunod na account:

- `player` - ang player na tumatanggap ng token
- `player_data` - ang player data account na nag-iimbak ng kasalukuyang kalusugan ng player
- `player_token_account` - ang nauugnay na token account ng manlalaro kung saan gagawa ng mga token
- `reward_token_mint` - ang token mint account, na tumutukoy sa uri ng token na ilalagay
- `token_program` - kinakailangan para sa pakikipag-ugnayan sa mga instruction sa token program
- `associated_token_program` - kinakailangan kapag nagtatrabaho sa mga nauugnay na token account
- `system_program` - isang kinakailangang account kapag gumagawa ng bagong account

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

Ang kalusugan ng manlalaro ay nabawasan ng 10 upang kumatawan sa "labanan sa kalaban". Susuriin din namin ang kasalukuyang kalusugan ng player at magbabalik ng custom na Anchor error kung ang player ay may 0 health.

Ang pagtuturo pagkatapos ay gumagamit ng cross-program invocation (CPI) para tawagan ang `mint_to` na pagtuturo mula sa Token program at mag-mint ng 1 token ng `reward_token_mint` sa `player_token_account` bilang reward sa pagpatay sa kaaway.

Dahil ang awtoridad ng mint para sa token mint ay Program Derived Address (PDA), maaari kaming direktang mag-mint ng mga token sa pamamagitan ng pagtawag sa instruction na ito nang walang karagdagang pumirma. Ang programa ay maaaring "mag-sign" sa ngalan ng PDA, na nagpapahintulot sa token minting nang hindi tahasang nangangailangan ng mga karagdagang pumirma.

### Heal Instruction

Susunod, ipatupad natin ang instruction na `heal` na nagbibigay-daan sa isang manlalaro na magsunog ng 1 token at ibalik ang kanilang kalusugan sa pinakamataas na halaga nito.

Ang pagtuturo ng `heal` ay nangangailangan ng mga sumusunod na account:

- `player` - ang player na nagsasagawa ng healing action
- `player_data` - ang player data account na nag-iimbak ng kasalukuyang kalusugan ng player
- `player_token_account` - ang nauugnay na token account ng manlalaro kung saan susunugin ang mga token
- `reward_token_mint` - ang token mint account, na tumutukoy sa uri ng token na susunugin
- `token_program` - kinakailangan para sa pakikipag-ugnayan sa mga instruction sa token program
- `associated_token_program` - kinakailangan kapag nagtatrabaho sa mga nauugnay na token account

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

Ang kalusugan ng manlalaro ay ibinalik sa pinakamataas na halaga nito gamit ang `heal` na pagtuturo. Ang pagtuturo ay gumagamit ng cross-program invocation (CPI) para tawagan ang `burn` na pagtuturo mula sa Token program, na nagsusunog ng 1 token mula sa `player_token_account` upang pagalingin ang player.

### Bumuo at I-deploy

Mahusay na trabaho! Nakumpleto mo na ngayon ang programa! Sige at buuin at i-deploy ito gamit ang Solana Playground. Ang iyong huling programa ay dapat magmukhang ganito:

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

### Magsimula sa Kliyente

Sa seksyong ito, gagabayan ka namin sa isang simpleng pagpapatupad sa panig ng kliyente para sa pakikipag-ugnayan sa programa. Upang makapagsimula, mag-navigate sa `client.ts` na file sa Solana Playground, alisin ang placeholder code, at idagdag ang mga snippet ng code mula sa mga sumusunod na seksyon.

Magsimula sa pamamagitan ng pagdaragdag ng sumusunod na code para sa setup.

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

Susunod, idagdag ang sumusunod na dalawang function ng helper. Gagamitin ang mga function na ito upang kumpirmahin ang mga transaksyon at kunin ang data ng account.

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

Susunod, gamitin ang instruction na `createMint` para gumawa ng bagong token mint kung wala pa ito.

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

Susunod, tawagan ang instruction na `initPlayer` para gumawa ng bagong player account kung wala pa.

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

Panghuli, patakbuhin ang kliyente sa pamamagitan ng pag-click sa pindutang "Run" sa Solana Playground. Maaari mong kopyahin ang address ng Token Mint na naka-print sa console at i-verify sa Solana Explorer na ang token ay mayroon na ngayong metadata. Ang output ay dapat na katulad ng sumusunod:

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