---
title: Comment interagir avec des jetons dans des programmes
head:
  - - meta
    - name: title
      content: Solana Cookbook | Utilisation de jetons dans des jeux sur Solana
  - - meta
    - name: og:title
      content: Solana Cookbook | Utilisation de jetons dans des jeux sur Solana
  - - meta
    - name: description
      content: Apprenez à utiliser des jetons dans les jeux Solana grâce à ce tutoriel
  - - meta
    - name: og:description
      content: Apprenez à utiliser des jetons dans les jeux Solana grâce à ce tutoriel
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

# Utilisation de jetons dans des jeux sur Solana

Les tokens sur Solana peuvent servir à diverses fins, comme des récompenses dans les jeux, des incitations ou d'autres applications. Par exemple, vous pouvez créer des jetons et les distribuer aux joueurs lorsqu'ils accomplissent des actions spécifiques dans le jeu.

## Créer, Mint et Brûler des jetons avec Anchor

Dans ce tutoriel, nous allons créer un jeu en utilisant Anchor pour introduire les bases de l'interaction avec le Programme de Jeton (Token Program) de Solana. Le jeu s'articulera autour de quatre actions principales : créer une nouvelle adresse de mint pour le jeton, initialiser les comptes des joueurs, récompenser les joueurs pour avoir vaincu des ennemis et permettre aux joueurs de se soigner en brûlant des jetons.

Le programme est composé de 4 instructions :

- `create_mint` - Cette instruction crée une nouvelle adresse de mint pour le jeton avec une Adresse Dérivée de Programme (PDA) en tant qu'autorité de mint (mint authority) et crée le compte de métadonnées de jeton. Nous ajouterons une contrainte pour que seul un "admin" puisse invoquer cette instruction
- `init_player` - Cette instruction initialise un nouveau compte de joueur avec une santé de départ de 100
- `kill_enemy` - Cette instruction déduit 10 points de vie du compte du joueur lorsqu'il "vainc un ennemi" et mint 1 jeton en guise de récompense pour le joueur
- `heal` - Cette instruction permet à un joueur de brûler un jeton pour rétablir sa santé à 100 %.

Pour une vue d'ensemble de la relation entre les portefeuilles utilisateurs, les adresses de mint de jeton, les comptes de jetons et les comptes de métadonnées de jetons, il est possible d'explorer cette partie de la [documentation de Metaplex](https://docs.metaplex.com/programs/token-metadata/overview).

### Pour commencer

Pour commencer à créer le programme, suivez les étapes suivantes :

Visitez le [Solana Playground](https://beta.solpg.io/) et créez un nouveau projet Anchor. Si vous êtes nouveau sur Solana Playground, vous devrez également créer un portefeuille Playground.

Après avoir créé un nouveau projet, remplacez le code par défaut par le code ci-dessous :

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

Ici, nous mettons simplement en place les crates et les modules correspondants que nous utiliserons dans le cadre de ce programme. Nous allons utiliser les crates `anchor_spl` et `mpl_token_metadata` pour nous aider à interagir avec le Programme de Jeton et le Programme de Métadonnées des Jetons (Token Metadata program).

### Instruction de création d'un jeton

Tout d'abord, implémentons une instruction pour créer un nouveau jeton et son compte de métadonnées. Les métadonnées du jeton qui seront stockées sur la chaîne, notamment le nom, le symbole et l'URI, seront fournies en tant que paramètres de l'instruction.

De plus, nous n'autoriserons qu'un "admin" à invoquer cette instruction en définissant une constante `ADMIN_PUBKEY` et en l'utilisant comme contrainte. Veillez à remplacer `ADMIN_PUBKEY` par la clé publique de votre portefeuille Solana Playground.

L'instruction `create_mint` nécessite les comptes suivants :

- `admin` - le `ADMIN_PUBKEY` qui signe la transaction et paie pour l'initialisation des comptes
- `reward_token_mint` - la nouvelle adresse de mint de jeton que nous initialisons, avec un PDA comme adresse de mint et comme autorité de mint
- `metadata_account` - le compte de métadonnées que nous initialisons pour le jeton
- `token_program` - nécessaire pour interagir avec les instructions du Programme de Jeton
- `token_metadata_program` - compte nécessaire pour interagir avec les instructions du Programme de Métadonnées des Jetons
- `system_program`- compte obligatoire lors de la création d'un nouveau compte
- `rent` - Sysvar Rent, un compte nécessaire lors de la création du compte de métadonnées

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

L'instruction `create_mint` crée une nouvelle adresse de mint de jeton avec une Adresse Dérivée de Programme (PDA) comme adresse de mint et comme autorité de mint. L'instruction prend en paramètre un URI (métadonnées hors chaîne), un nom et un symbole.

Cette instruction crée ensuite un compte de métadonnées de jeton par le biais d'une Invocation de Programme Croisé (CPI) appelant l'instruction `create_metadata_accounts_v3` du Programme de Métadonnées des Jetons.

Le PDA est utilisé pour "signer" le CPI puiqu'il est l'autorité de mint, qui est un signataire obligatoire lors de la création du compte de métadonnées de jeton. Les données d'instruction (URI, nom, symbole) sont incluses dans la structure `DataV2` pour spécifier les métadonnées du nouveau jeton.

Nous vérifions également que l'adresse du compte `admin` signant la transaction correspond à la valeur de la constante `ADMIN_PUBKEY` afin de s'assurer que seul le portefeuille souhaité peut invoquer cette instruction.

```rust
const ADMIN_PUBKEY: Pubkey = pubkey!("REPLACE_WITH_YOUR_WALLET_PUBKEY");
```

### Instruction d'initialisation du joueur

Ensuite, implémentons l'instruction `init_player` qui crée un nouveau compte de joueur avec une santé initiale de 100. La constante `MAX_HEALTH` est fixée à 100 pour représenter la santé de départ.

L'instruction `init_player` nécessite les comptes suivants :

- `player_data` - le nouveau compte de joueur que nous initialisons, qui stockera la santé du joueur
- `player` - l'utilisateur qui signe la transaction et paie pour l'initialisation du compte
- `system_program` - compte obligatoire lors de la création d'un nouveau compte

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

Le compte `player_data` est initialisé à l'aide d'une Adresse Dérivée de Programme (PDA) dont la clé publique `player` est l'une des seeds. Cela garantit que chaque compte `player_data` est unique et associé à un `player`, ce qui permet à chaque joueur de créer son propre compte `player_data`.

### Instruction pour tuer un ennemi

Implémentons ensuite l'instruction `kill_enemy` qui réduit la santé du joueur de 10 et lui rapporte 1 jeton sur son compte de jetons en guise de récompense.

L'instruction `kill_enemy` nécessite les comptes suivants :

- `player` - le joueur qui reçoit le jeton
- `player_data` - le compte de données du joueur stockant l'état de santé actuel du joueur
- `player_token_account` - le compte de jetons associé du joueur où les jetons seront mint
- `reward_token_mint` - l'adresse de mint du jeton, spécifiant le type de jeton qui sera mint
- `token_program` - nécessaire pour interagir avec les instructions du Programme de Jeton
- `associated_token_program` - nécessaire lorsque l'on travaille avec des comptes de jetons associés
- `system_program` - compte obligatoire lors de la création d'un nouveau compte

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

La santé du joueur est réduite de 10 pour représenter le "combat avec l'ennemi". Nous allons également vérifier la santé actuelle du joueur et renvoyer une erreur Anchor personnalisée si la santé du joueur est à 0.

L'instruction utilise ensuite une Invocation de Programme Croisé (CPI) pour appeler l'instruction `mint_to` du Programme de Jeton et mint 1 jeton `reward_token_mint` dans `player_token_account` en guise de récompense pour avoir tué l'ennemi.

Étant donné que l'autorité de mint du jeton est une Adresse Dérivée de Programme (PDA), nous pouvons mint des jetons directement en appelant cette instruction sans signataire supplémentaire. En effet, le programme peut "signer" au nom du PDA, ce qui permet de mint des jetons sans exiger explicitement des signataires supplémentaires.

### Instruction de guérison

Implémentons ensuite l'instruction `heal` qui permet à un joueur de brûler 1 jeton et de restaurer sa santé à sa valeur maximale.

L'instruction `heal` nécessite les comptes suivants :

- `player` - le joueur qui exécute l'action de guérison
- `player_data` - le compte de données du joueur stockant l'état de santé actuel du joueur
- `player_token_account` - le compte de jetons associé du joueur où les jetons seront brûlés
- `reward_token_mint` - l'adresse de mint du jeton, spécifiant le type de jeton qui sera brûlé
- `token_program` - nécessaire pour interagir avec les instructions du Programme de Jeton
- `associated_token_program` - nécessaire lorsque l'on travaille avec des comptes de jetons associés

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

La santé du joueur est rétablie à sa valeur maximale à l'aide de l'instruction `heal`. L'instruction utilise ensuite une Invocation de Programme Croisé (CPI) pour appeler l'instruction `burn` du Programme de Jeton, qui brûle 1 token du `player_token_account` pour guérir le joueur.

### Compilation et Déploiement

Bravo ! Vous avez terminé le programme ! Vous pouvez le compiler et le déployer à l'aide du Solana Playground. Votre programme final devrait ressembler à ceci :

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

### Débuter avec le Client

Dans cette section, nous allons vous présenter une implémentation simple côté client pour interagir avec le programme. Pour commencer, naviguez jusqu'au fichier `client.ts` dans Solana Playground, supprimez le code par défaut et ajoutez les extraits de code des sections suivantes.

Commencez par ajouter le code suivant pour la configuration.

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

Ensuite, ajoutez les deux fonctions d'aide suivantes. Ces fonctions seront utilisées pour confirmer les transactions et récupérer les données du compte.

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

Ensuite, invoquez l'instruction `createMint` pour créer une nouvelle adresse de mint de jeton s'il n'existe pas déjà.

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

Appelez ensuite l'instruction `initPlayer` pour créer un nouveau compte de joueur s'il n'en existe pas déjà un.

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

Ensuite, invoquez l'instruction `killEnemy`.

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

Puis, invoquez l'instruction `heal`.

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

Enfin, exécutez le client en cliquant sur le bouton "Run" dans Solana Playground. Vous pouvez copier l'adresse de mint de jeton affichée dans la console et vérifier sur Solana Explorer que le jeton a maintenant des métadonnées. Le résultat devrait être similaire à ce qui suit :

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