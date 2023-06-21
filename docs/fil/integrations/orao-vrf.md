---
title: ORAO VRF
head:
- - meta
- name: title
  content: Solana Cookbook | Using ORAO VRF with Solana
- - meta
- name: og:title
  content: Solana Cookbook | Using ORAO VRF with Solana
- - meta
- name: description
  content: In this tutorial, you learn how to use ORAO VRF with Solana and Anchor.
- - meta
- name: og:description
  content: In this tutorial, you learn how to use ORAO VRF with Solana and Anchor.
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

Ang ORAO VRF ay isang multi-party na nabe-verify na random function na oracle batay sa EDDSA. Nagagawa nitong magbigay
64 bytes ng nabe-verify na randomness bilang tugon sa isang kahilingan sa randomness.

## Pangunahing senaryo ng paggamit

1. Gumawa ng bagong kahilingan sa randomness.
     * Ang operasyong ito ay nangangailangan ng natatanging _seed_ na ibibigay ng kliyente.
         Ang seed na ito ay ginagamit para sa randomness verification.
2. Gamitin ang nabuong randomness sa sandaling matupad ang kahilingan.
     * Ang Oracle ay tutuparin ang mga bagong kahilingan sa lalong madaling panahon, ang pamamaraang ito
         kasama ang hakbang sa pag-verify, kaya dapat walang hindi na-verify na randomness
         lalabas on-chain.
3. (Opsyonal) I-verify ang nabuong randomness off-chain.
     * Nagagawa mong [`i-verify ang nabuong randomness`](https://github.com/orao-network/solana-vrf/blob/6cc9a80ec280b96a97321b8bfe2904a6e432c38e/rust/examples/off-chain/src/main.rs#L48). ang epektibong listahan
         ng mga awtoridad sa pagtupad (ito ay isang bahagi ng pampublikong magagamit na VRF
         pagsasaayos). May mga katulong para dito sa mga SDK.

## SDKs

There are two SDKs available:

1. Ang [`orao-solana-vrf`](https://docs.rs/orao-solana-vrf) crate – ang code sa ibaba ay batay sa Rust SDK na ito.
2. Ang JS SDK – JavaScript SDK, pati na rin ang source code ng Rust SDK, ay available sa publiko
     repository sa GitHub [`solana-vrf`](https://github.com/orao-network/solana-vrf). Lahat ng pagsubok sa loob
     ang repo na ito ay batay sa JavaScript SDK.

## Anatomy ng isang random na kahilingan

Ang istraktura ng [`RandomnessRequest`][1] ay ginagamit upang iimbak ang hiniling na randomness:

* `seed` field – nag-iimbak ng request seed
* Field ng `randomness` – ito ang field ng interes, na nag-iimbak ng natupad na randomness.
     Ito ay magiging sero hanggang sa matupad ang randomness request.
* Field ng `mga tugon` – maaari mong tingnan ang field na ito kung sakaling handa kang magsagawa ng off-chain
     pag-verify (may mga katulong para dito sa parehong SDK)

## Anatomy ng isang configuration ng VRF

Ang istraktura ng [`NetworkState`][2] ay nagtataglay ng on-chain na VRF data. Dito natin pag-uusapan ang `config` nito,
field, na nag-iimbak ng [`NetworkConfiguration`][3]. Ang field na maaaring kawili-wili sa iyo ay:

* `request_fee` – ang paghiling ng randomness ay magkakahalaga ng ganito karaming lampor
* `fulfillment_authorities` – mga pampublikong susi ng mga awtoridad sa pagtupad
* `token_fee_cofig` - kung tinukoy, posible na magbayad ng mga bayarin sa SPL sa halip na SOL

## Rust-katutubong halimbawa

Ipapakita ng seksyong ito ang paggamit sa labas ng chain ([magagamit ang buong code sa GitHub][4])

### 1. I-setup ang koneksyon

Ang Rust SDK ay batay sa [`anchor-client`](https://docs.rs/anchor-client) library, kaya kakailanganin mo
para makuha ang instance ng `Program` para magamit ito:

```rust
let payer: Keypair = ..; // get this from the solana configuration
let client = Client::new_with_options(Cluster::Devnet, Rc::new(payer), CommitmentConfig::finalized());
let program = client.program(orao_solana_vrf::id());
```

### 2. Gumawa ng kahilingan

Mayroong isang maginhawang [`RequestBuilder`][5] para sa layuning ito:

```rust
let seed = rand::random();
let tx = RequestBuilder::new(seed)
    .build(&program)
    .expect("Randomness request")
    .send_with_spinner_and_config(RpcSendTransactionConfig::default())
    .expect("Transaction hash");
```

### 3. Maghintay para sa katuparan

Mayroong maraming mga paraan upang maghintay para sa katuparan kabilang ang pub-sub,
ngunit ang halimbawang ito ay gagamit ng isang simpleng loop:

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

## Halimbawa ng CPI

Ang CPI ay isang abbreviation para sa Cross Program Invocation – isang paraan para sa isang kontrata na tumawag sa isa pa
kontrata sa loob ng isang transaksyon. Ang seksyong ito ay maglalarawan nito
([magagamit ang buong code sa GitHub][6]).

Ang kontrata na gagamitin namin upang ilarawan ang CPI ay isang simpleng single-player na Russian Roulette kung saan
ang kinalabasan ng isang round ay nagmula sa isang natupad na randomness.

*Tandaan:* ang pagiging random ay hindi kaagad magagamit para sa iyong kontrata, kaya kakailanganin mo
upang idisenyo ito sa paraang maghihintay ito na matupad ang randomness. Sa ating halimbawa isang manlalaro
ay hindi makakapagsimula ng isa pang round hanggang sa matapos ang kasalukuyang (hanggang sa randomness
ay natupad).

### 1. Lumikha ng kontrata

Ang mga halimbawang ito ay batay sa [Anchor Framework](https://github.com/coral-xyz/anchor).
Mangyaring kumonsulta sa [Anchor Book](https://book.anchor-lang.com/) kung paano gumawa ng kontrata.

Upang magsagawa ng CPI na tawag, kakailanganin mong idagdag ang orao VRF rust SDK na may feature na `cpi`
sa listahan ng iyong mga dependency:

```toml
[dependencies]
# ...
orao-solana-vrf = { version = "0.2.3", default-features = false, features = ["cpi"] }
```

### 2. Kolektahin ang mga kinakailangang account

Ang bawat pagtuturo ng Solana ay nangangailangan ng tamang listahan ng mga account. Kakailanganin nating tawagan ang Kahilingan
pagtuturo kaya narito ang listahan ng mga kinakailangang account:

* nagbabayad - kliyente ng VRF
* network_state – VRF on-chain state address
* treasury - address ng VRF treasury (kinuha mula sa VRF on-chain state)
* kahilingan - PDA upang iimbak ang randomness (nagmula sa binhi)
* system_program – kinakailangan upang lumikha ng kahilingan na account

Nangangahulugan ang nasa itaas na kailangan ng aming pagtuturo ang lahat ng mga account na ito bukod sa sarili nitong mga account.
Lalo na ang aming pagtuturo sa Russian-Roulette ay mangangailangan ng sumusunod na listahan ng mga account:

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

### 3. Magsagawa ng CPI na tawag

Sa Anchor Framework mayroong `CpiContext` para sa layuning ito (mangyaring kumonsulta
ang [kaugnay na seksyon](https://book.anchor-lang.com/anchor_in_depth/CPIs.html)
ng Anchor Book):

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

### 4. Gamitin ang natupad na randomness

Nakukuha ng aming kontrata ang bilog na kinalabasan mula sa natupad na randomness, round na isinasaalang-alang
upang maging in-progress kung hindi pa natutupad ang randomness:

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
