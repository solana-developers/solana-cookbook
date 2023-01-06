---
title: ORAO VRF
head:
- - meta
- name: title
  content: Solana Kochbuch | Verwendung von ORAO VRF mit Solana
- - meta
- name: og:title
  content: Solana Kochbuch | Verwendung von ORAO VRF mit Solana
- - meta
- name: description
  content: In diesem Tutorial erfahren Sie, wie Sie ORAO VRF mit Solana und Anchor verwenden.
- - meta
- name: og:description
  content: In diesem Tutorial erfahren Sie, wie Sie ORAO VRF mit Solana und Anchor verwenden.
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

ORAO VRF ist ein von mehreren Parteien verifizierbares Zufallsfunktionsorakel, das auf EDDSA basiert. Es ist in der Lage, bereitzustellen
64 Bytes überprüfbare Zufälligkeit als Antwort auf eine Zufälligkeitsanforderung.

## Grundlegendes Nutzungsszenario

1. Erstellen Sie eine neue Zufälligkeitsanforderung.
    * Für diese Operation muss ein eindeutiger _Seed_ vom Client angegeben werden.
        Dieser Startwert wird für die Zufälligkeitsprüfung verwendet.
2. Verwenden Sie die generierte Zufälligkeit, sobald die Anfrage erfüllt ist.
    * Oracle wird neuen Anfragen so schnell wie möglich nachkommen, dieses Verfahren
        enthält den Überprüfungsschritt, sollte also keine unbestätigte Zufälligkeit aufweisen
        erscheinen in der Kette.
3. (Optional) Überprüfen Sie die generierte Zufälligkeit außerhalb der Kette.
    * Sie können [`erzeugte Zufälligkeit verifizieren`](https://github.com/orao-network/solana-vrf/blob/6cc9a80ec280b96a97321b8bfe2904a6e432c38e/rust/examples/off-chain/src/main.rs#L48) gegen die wirksame Liste
        von Erfüllungsbehörden (es ist ein Teil des öffentlich zugänglichen VRF
        Aufbau). In SDKs gibt es dafür Helfer.

## SDKs (Software Developer Kits - Software-entwicklungs-packet)

Es sind zwei SDKs verfügbar:

1. Die Kiste [`orao-solana-vrf`](https://docs.rs/orao-solana-vrf) – der folgende Code basiert auf diesem Rust SDK.
2. Das JS SDK – JavaScript SDK sowie der Quellcode des Rust SDK sind öffentlich verfügbar
    Repository auf GitHub [`solana-vrf`](https://github.com/orao-network/solana-vrf). Alle Tests innerhalb
    Dieses Repo basiert auf dem JavaScript SDK.

## Anatomie einer Zufälligkeitsanforderung

Die Struktur [`RandomnessRequest`][1] wird verwendet, um die angeforderte Zufälligkeit zu speichern:

* „Seed“-Feld – speichert den Anforderungs-Seed
* „Randomness“-Feld – das ist das Interessenfeld, das die erfüllte Zufälligkeit speichert.
    Es wird auf Null gesetzt, bis die Zufälligkeitsanforderung erfüllt ist.
* Feld „Antworten“ – Sie können sich dieses Feld ansehen, falls Sie bereit sind, außerhalb der Kette aufzutreten
    Verifizierung (hierfür gibt es Helfer in beiden SDKs)

## Anatomie einer VRF-Konfiguration

Die Struktur [`NetworkState`][2] enthält die On-Chain-VRF-Daten. Hier sprechen wir über seine `config`,
Feld, das die [`NetworkConfiguration`][3] speichert. Folgende Bereiche könnten für Sie interessant sein:

* `request_fee` – Zufälligkeitsanfrage kostet so viele Lamports
* `fulfillment_authorities` – öffentliche Schlüssel der Erfüllungsbehörden
* `token_fee_cofig` - wenn definiert, dann ist es möglich, Gebühren in SPL statt in SOL zu zahlen

## Rust-natives Beispiel

Dieser Abschnitt veranschaulicht die Off-Chain-Nutzung ([vollständiger Code ist auf GitHub verfügbar][4])

### 1. Stellen Sie die Verbindung her

Rust SDK basiert auf der [`anchor-client`](https://docs.rs/anchor-client)-Bibliothek, daher benötigen Sie sie,
um die `Program`-Instanz zu erwerben, um sie zu verwenden:

```rust
let payer: Keypair = ..; // get this from the solana configuration
let client = Client::new_with_options(Cluster::Devnet, Rc::new(payer), CommitmentConfig::finalized());
let program = client.program(orao_solana_vrf::id());
```

### 2. Erstellen Sie eine Anfrage

Dafür gibt es einen praktischen [`RequestBuilder`][5]:

```rust
let seed = rand::random();
let tx = RequestBuilder::new(seed)
    .build(&program)
    .expect("Randomness request")
    .send_with_spinner_and_config(RpcSendTransactionConfig::default())
    .expect("Transaction hash");
```

### 3. Warte auf die Erfüllung

Es gibt mehrere Möglichkeiten, auf die Erfüllung zu warten, einschließlich Pub-Sub,
aber dieses Beispiel wird eine einfache Schleife verwenden:

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

## CPI-Beispiel

CPI ist eine Abkürzung für Cross Program Invocation – eine Möglichkeit für einen Vertrag innerhalb einer einzigen Transaktion, einen anderen Vertrag aufzurufen.
Dieser Abschnitt soll dies veranschaulichen ([vollständiger Code ist auf GitHub verfügbar][6]).

Der Vertrag, den wir zur Veranschaulichung des CPI verwenden, ist ein einfaches Einzelspieler-Russisch-Roulette, bei dem
das Ergebnis einer Runde ergibt sich aus einer erfüllten Zufälligkeit.

*Hinweis:* Die Zufälligkeit wird für Ihren Vertrag nicht sofort verfügbar sein, also müssen Sie
es so zu gestalten, dass es auf die Erfüllung der Zufälligkeit wartet. In unserem Beispiel ein Spieler
nicht in der Lage sein, eine weitere Runde zu beginnen, bis die aktuelle beendet ist (bis die Randomness
erfüllt ist).

### 1. Erstellen Sie den Vertrag

Dieses Beispiel basiert auf dem [Anchor Framework](https://github.com/coral-xyz/anchor).
Bitte konsultieren Sie das [Anchor Buch](https://book.anchor-lang.com/), um zu erfahren, wie Sie einen Vertrag erstellen.

Um einen CPI-Aufruf durchzuführen, müssen Sie das orao VRF rust SDK mit der „cpi“-Funktion hinzufügen
in die Liste Ihrer Abhängigkeiten:

```toml
[dependencies]
# ...
orao-solana-vrf = { version = "0.2.3", default-features = false, features = ["cpi"] }
```

### 2. Sammeln Sie die erforderlichen Konten

Jede Solana-Anweisung erfordert eine ordnungsgemäße Kontenliste. Wir müssen die Anfrage anrufen
Anleitung, hier ist die Liste der erforderlichen Konten:

* Zahler – VRF-Kunde
* network_state – VRF-On-Chain-Statusadresse
* Schatzkammer - Adresse der VRF-Schatzkammer (aus dem VRF-On-Chain-Zustand entnommen)
* Anfrage - PDA zum Speichern der Zufälligkeit (abgeleitet vom Seed)
* system_program – erforderlich, um das Anforderungskonto zu erstellen

Oben bedeutet, dass unsere Anweisung alle diese Konten neben ihren eigenen Konten benötigt.
Insbesondere für unsere Russisch-Roulette-Anleitung benötigen Sie die folgende Kontenliste:

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

### 3. Führen Sie einen CPI-Aufruf durch

Im Anchor Framework gibt es dafür einen `CpiContext` (bitte konsultieren
der [entsprechende Abschnitt](https://book.anchor-lang.com/anchor_in_depth/CPIs.html)
des Ankerbuchs):

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

### 4. Nutzen Sie die erfüllte Zufälligkeit

Unser Vertrag leitet das Rundenergebnis aus der erfüllten Zufälligkeit ab, rundenbetrachtet
in Bearbeitung, wenn Zufälligkeit noch nicht erfüllt ist:

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
