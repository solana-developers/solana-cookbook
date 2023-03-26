---
title: ORAO VRF
head:
- - meta
- name: title
  content: Solana Cookbook | Utilisation de ORAO VRF avec Solana
- - meta
- name: og:title
  content: Solana Cookbook | Utilisation de ORAO VRF avec Solana
- - meta
- name: description
  content: Dans ce tutoriel, vous allez apprendre à utiliser ORAO VRF avec Solana et Anchor.
- - meta
- name: og:description
  content: Dans ce tutoriel, vous allez apprendre à utiliser ORAO VRF avec Solana et Anchor.
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
---

# ORAO VRF

ORAO VRF est un oracle à fonction aléatoire vérifiable multipartite basé sur EDDSA. Il est capable de fournir 64 octets aléatoires vérifiables en réponse à une requête.

## Scénario d'utilisation de base

1.  Création d'une nouvelle requête d'aléatoire.
    *   Cette opération nécessite qu'une _seed_ unique soit donnée par le client.
        Cette seed est utilisée pour la vérification du caractère aléatoire.
2.  Utilisation du caractère aléatoire généré dès que la requête est traitée.
    *   L'oracle traitera les nouvelles requêtes dès que possible. Cette procédure inclut l'étape de vérification, de sorte qu'aucun élément aléatoire non vérifié n'apparaisse sur la chaîne.
3.  (Facultatif) Vérification du caractère aléatoire généré hors chaîne.
    *   Vous êtes en mesure de [`vérifier le caractère aléatoire généré`](https://github.com/orao-network/solana-vrf/blob/6cc9a80ec280b96a97321b8bfe2904a6e432c38e/rust/examples/off-chain/src/main.rs#L48) par rapport à la liste effective des autorités de traitement (c'est une partie de la configuration VRF disponible publiquement). Il existe des aides pour cela dans les SDKs.

## SDKs

Deux SDKs sont disponibles :

1.  Le crate [`orao-solana-vrf`](https://docs.rs/orao-solana-vrf) – le code ci-dessous est basé sur ce SDK Rust.
2.  Le SDK JS - SDK JavaScript, ainsi que le code source du SDK Rust, sont disponibles dans le dépôt public sur GitHub [`solana-vrf`](https://github.com/orao-network/solana-vrf). Tous les tests de ce répertoire sont basés sur le SDK JavaScript.

## Anatomie d'une requête d'aléatoire

La structure [`RandomnessRequest`][1] est utilisée pour stocker le caractère aléatoire demandé :

*   Champ `seed` - stocke la seed de la requête
*   Champ `randomness` – c'est le champ intéressant. Il stocke le caractère aléatoire obtenu.
    Il sera vide jusqu'à ce que la requête d'aléatoire soit satisfaite.
*   Champ `responses` – vous pouvez regarder ce champ au cas où vous seriez prêt à effectuer une vérification hors chaîne. (il y a des aides pour cela dans chaque SDKs)

## Anatomie d'une configuration VRF

La structure [`NetworkState`][2] contient les données VRF de la chaîne. Nous allons parler ici de son champ `config`, qui stocke la [`NetworkConfiguration`][3]. Les champs qui peuvent vous intéresser sont les suivants :

*   `request_fee` – la requête d'aléatoire coûtera ce nombre de lamports
*   `fulfillment_authorities` – les clés publiques des autorités de traitement
*   `token_fee_cofig` - s'il est défini, alors il est possible de payer les frais en SPL au lieu de SOL

## Exemple Rust-natif

Cette section va illustrer l'utilisation hors chaîne ([le code complet est disponible sur GitHub][4])

### 1. Configurer la connexion

Le SDK Rust est basé sur la bibliothèque [`anchor-client`](https://docs.rs/anchor-client), vous devrez donc acquérir l'instance `Program` pour l'utiliser :

```rust
let payer: Keypair = ..; // get this from the solana configuration
let client = Client::new_with_options(Cluster::Devnet, Rc::new(payer), CommitmentConfig::finalized());
let program = client.program(orao_solana_vrf::id());
```

### 2. Créer une requête

Il existe un [`RequestBuilder`][5] très pratique à cet effet :

```rust
let seed = rand::random();
let tx = RequestBuilder::new(seed)
    .build(&program)
    .expect("Randomness request")
    .send_with_spinner_and_config(RpcSendTransactionConfig::default())
    .expect("Transaction hash");
```

### 3. Attendre le traitement

Il existe de multiples façons d'attendre le traitement, y compris la méthode pub-sub. L'exemple suivant utilise une simple boucle :

```rust
let randomness_address = orao_solana_vrf::randomness_account_address(&seed);
let randomness_account = loop {
    match program.account::<Randomness>(randomness_address) {
        Ok(randomness) if randomness.fulfilled().is_some() => break randomness,
        _ => {
            std::thread::sleep(Duration::from_secs(1));
            continue;
        }
    }
}
println!("Randomness for seed {:?} is fulfilled with {:?}", seed, randomness_account.randomness);
```

## Exemple CPI

CPI est l'abréviation de Cross Program Invocation, un moyen pour un contrat d'appeler un autre contrat dans une même transaction. Cette section va l'illustrer ([le code complet est disponible sur GitHub][6]).

Le contrat que nous utiliserons pour illustrer le CPI est une roulette russe à un joueur où le résultat d'un tour est dérivé d'un caractère aléatoire.

*Remarque :* le caractère aléatoire ne sera pas immédiatement disponible pour votre contrat, vous devrez donc le concevoir de manière à ce qu'il attende que le caractère aléatoire soit rempli. Dans notre exemple, un joueur ne pourra pas commencer un autre tour avant que le tour actuel ne soit terminé (c'est à dire jusqu'à ce que le caractère aléatoire soit rempli).

### 1. Créer le contrat

Ces exemples sont basés sur le [Framework Anchor](https://github.com/coral-xyz/anchor).
Veuillez consulter le [Livre d'Anchor](https://book.anchor-lang.com/) pour savoir comment créer un contrat.

Pour effectuer un appel CPI, vous devez ajouter le SDK Rust orao VRF avec la fonctionnalité `cpi` dans la liste de vos dépendances :

```toml
[dependencies]
# ...
orao-solana-vrf = { version = "0.2.3", default-features = false, features = ["cpi"] }
```

### 2. Collecter les comptes nécessaires

Chaque instruction Solana nécessite une liste de comptes appropriés. Nous devrons appeler l'instruction Request, voici donc la liste des comptes requis :

* payer – client VRF
* network_state – Adresse d'état du VRF sur la chaîne
* treasury - adresse de la trésorerie du VRF (extrait de l'état du VRF sur la chaîne)
* request - PDA pour stocker le caractère aléatoire (dérivé de la seed)
* system_program – nécessaire pour créer le compte de la requête

Cela signifie que notre instruction a besoin de tous ces comptes en plus de ses propres comptes.
En particulier, notre instruction Russian-Roulette nécessitera la liste de comptes suivante :

```rust
#[derive(Accounts)]
#[instruction(force: [u8; 32])]
pub struct SpinAndPullTheTrigger<'info> {
    /// Player will be the `payer` account in the CPI call.
    #[account(mut)]
    player: Signer<'info>,

    /// This is the player state account, it is required by Russian-Roulette to store player data
    // (number of rounds played and info to derive the last round outcome)
    #[account(
        init_if_needed,
        payer = player,
        space = 8 + PlayerState::SIZE,
        seeds = [
            PLAYER_STATE_ACCOUNT_SEED,
            player.key().as_ref()
        ],
        bump
    )]
    player_state: Account<'info, PlayerState>,

    /// This account points to the last VRF request, it is necessary to validate that the player
    /// is alive and is able to play another round.
    /// CHECK:
    #[account(
        seeds = [RANDOMNESS_ACCOUNT_SEED.as_ref(), player_state.force.as_ref()],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]
    prev_round: AccountInfo<'info>,

    /// This account is the current VRF request account, it'll be the `request` account in the CPI call.
    /// CHECK:
    #[account(
        mut,
        seeds = [RANDOMNESS_ACCOUNT_SEED.as_ref(), &force],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]
    random: AccountInfo<'info>,

    /// VRF treasury account, it'll be the `treasury` account in the CPI call.
    /// CHECK:
    #[account(mut)]
    treasury: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [CONFIG_ACCOUNT_SEED.as_ref()],
        bump,
        seeds::program = orao_solana_vrf::ID
    )]

    /// VRF on-chain state account, it'll be the `network_state` account in the CPI call.
    config: Account<'info, NetworkState>,

    /// VRF program address to invoke CPI
    vrf: Program<'info, OraoVrf>,

    /// System program address to create player_state and to be used in CPI call.
    system_program: Program<'info, System>,
}
```

### 3. Effectuer un appel CPI

Dans le framework Anchor, il existe un `CpiContext` à cet effet (veuillez consulter la [section correspondante](https://book.anchor-lang.com/anchor_in_depth/CPIs.html)
du Livre d'Anchor):

```rust
let cpi_program = ctx.accounts.vrf.to_account_info();
let cpi_accounts = orao_solana_vrf::cpi::accounts::Request {
    payer: ctx.accounts.player.to_account_info(),
    network_state: ctx.accounts.config.to_account_info(),
    treasury: ctx.accounts.treasury.to_account_info(),
    request: ctx.accounts.random.to_account_info(),
    system_program: ctx.accounts.system_program.to_account_info(),
};
let cpi_ctx = anchor_lang::context::CpiContext::new(cpi_program, cpi_accounts);
orao_solana_vrf::cpi::request(cpi_ctx, force)?;
```

### 4. Utiliser le caractère aléatoire obtenu

Notre contrat dérive le résultat du tour à partir du caractère aléatoire obtenu, le tour étant considérée comme en cours si le caractère aléatoire n'est pas encore obtenu :

```rust
/// Last round outcome.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CurrentState {
    /// Player is alive and able to play.
    Alive,
    /// Player is dead and can't play anymore.
    Dead,
    /// Player is waiting for current round to finish.
    Playing,
}

/// Derives last round outcome.
pub fn current_state(randomness: &Randomness) -> CurrentState {
    if let Some(randomness) = randomness.fulfilled() {
        if is_dead(randomness) {
            CurrentState::Dead
        } else {
            CurrentState::Alive
        }
    } else {
        CurrentState::Playing
    }
}

/// Decides whether player is dead or alive.
fn is_dead(randomness: &[u8; 64]) -> bool {
    // use only first 8 bytes for simplicyty
    let value = randomness[0..size_of::<u64>()].try_into().unwrap();
    u64::from_le_bytes(value) % 6 == 0
}
```

[1]: https://docs.rs/orao-solana-vrf/latest/orao_solana_vrf/state/struct.Randomness.html
[2]: https://docs.rs/orao-solana-vrf/latest/orao_solana_vrf/state/struct.NetworkState.html
[3]: https://docs.rs/orao-solana-vrf/latest/orao_solana_vrf/state/struct.NetworkConfiguration.html
[4]: https://github.com/orao-network/solana-vrf/tree/master/rust/examples/off-chain
[5]: https://docs.rs/orao-solana-vrf/latest/orao_solana_vrf/struct.RequestBuilder.html
[6]: https://github.com/orao-network/solana-vrf/tree/master/rust/examples/cpi
