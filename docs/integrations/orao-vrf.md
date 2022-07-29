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
  content: In this tutorial, you learn how to use ORAO VRF in Solana.
- - meta
- name: og:description
  content: In this tutorial, you learn how to use ORAO VRF in Solana.
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

ORAO VRF is a multi-party verifiable random function oracle based on EDDSA. It is able to provide
64 bytes of verifiable randomness in response to a randomness request.

## Basic usage scenario

1.  Create a new randomness request.
    *   This operation requires a unique _seed_ to be given by a client.
        This seed is used for randomness verification.
2.  Use generated randomness as soon as request is fulfilled.
    *   Oracle will fulfill new requests as soon as possible, this procedure
        includes the verification step, so no unverified randomness should
        appear on-chain.
3.  (Optional) Verify generated randomness off-chain.
    *   You are able to verify generated randomness against the effective list
        of fulfillment authorities (it's a part of publicly available VRF
        configuration). There are helpers for this in SDKs.

## SDKs

There are two SDKs available:

1.  [`orao-solana-vrf`](https://docs.rs/orao-solana-vrf) crate – the code bellow is based on this Rust SDK.
2.  JS SDK – JavaScript SDK, as well as the source code of the Rust SDK, is available in the public
    repository on GitHub [`solana-vrf`](https://github.com/orao-network/solana-vrf). All tests within
    this repo are based on the JavaScript SDK.

## Anatomy of a randomness request.

The [`RandomnessRequest`][1] structure is used to store the requested randomness:

*   `seed` field – stores the request seed
*   `randomness` field – this is the field of interest, that stores the fulfilled randomness.
    It will be zeroed until the randomness request is fulfilled.
*   `responses` field – you may look at this field in case you are willing to perform off-chain
    verification (there are helpers for this in both SDKs)

## Anatomy of a VRF configuration

The [`NetworkState`][2] structure holds the on-chain VRF data. Here we'll talk about its `config`,
field, that stores the [`NetworkConfiguration`][3]. The field that may be interesting to you are:

*   `request_fee` – randomness request will cost this many lamports
*   `fulfillment_authorities` – public keys of fulfillment authorities
*   `token_fee_cofig` - if defined, then it's possible to pay fees in SPL instead of SOL

## Rust-native example

This section will illustrate the off-chain usage ([full code is available on GitHub][4])

### 1. Setup the connection

Rust SDK is based on the [`anchor-client`](https://docs.rs/anchor-client) library, so you'll need
to acquire the `Program` instance to use it:

```rust
let payer: Keypair = ..; // get this from the solana configuration
let client = Client::new_with_options(Cluster::Devnet, Rc::new(payer), CommitmentConfig::finalized());
let program = client.program(orao_solana_vrf::id());
```

### 2. Create a request

There is a convenient [`RequestBuilder`][5] for this purpose:

```rust
let seed = rand::random();
let tx = RequestBuilder::new(seed)
    .build(&program)
    .expect("Randomness request")
    .send_with_spinner_and_config(RpcSendTransactionConfig::default())
    .expect("Transaction hash");
```

### 3. Wait for fulfillment

There are multiple ways to wait for fulfillment including pub-sub,
but this example will use a simple loop:

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

## CPI Example

CPI is an abbreviation for Cross Program Invocation – a way for one contract to call another
contract within a single transaction. This section will illustrate this
([full code is available in on GitHub][6]).

The contract we'll use to illustrate the CPI is a simple single-player Russian Roulette where
the outcome of a round is derived from a fulfilled randomness.

*Note:* the randomness will not be immediately available for your contract, so you'll need
to design it in a way that it'll wait for randomness being fulfilled. In our example a player
won't be able to start another round until the current one is finished (until the randomness
is fulfilled).

### 1. Create the contract

This examples is based on the [Anchor Framework](https://github.com/coral-xyz/anchor).
Please consult the [Anchor Book](https://book.anchor-lang.com/) on how to create a contract.

To perform a CPI call you'll need to add the rust SDK with the `cpi` feature
into the list of your dependencies:

```toml
[dependencies]
# ...
orao-solana-vrf = { version = "0.2", default-features = false, features = ["cpi"] }
```

### 2. Collect the necessary accounts

Each Solana instruction requires a proper list of accounts. We'll need to call the Request
instruction so here is the list of required accounts:

* payer – VRF client
* network_state – VRF on-chain state address
* treasury - address of a VRF treasury (taken from the VRF on-chain state)
* request - PDA to store the randomness (derived from the seed)
* system_program – required to create the request account

Above means that our instruction needs all this accounts besides it's own accounts.
Particularly our Russian-Roulette instruction will require the following list of accounts:

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

    /// This account point to the last VRF request, it is necessary to validate that the player
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

### 3. Perform a CPI call

In the Anchor Framework there is a `CpiContext` for this purpose (please consult
the [corresponding section](https://book.anchor-lang.com/anchor_in_depth/CPIs.html)
of the Anchor Book):

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

### 4. Use the fulfilled randomness

Our contract derives round outcome from the fulfilled randomness, round considered
to be in-progress if randomness is not yet fulfilled:

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