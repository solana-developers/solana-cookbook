---
title: Debuggen von Solana-Programmen
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Debuggen von Solana-Programmen
  - - meta
    - name: og:title
      content: Solana Kochbuch | Debuggen von Solana-Programmen
  - - meta
    - name: description
      content: Es gibt eine Reihe von Optionen und unterstützenden Tools zum Testen und Debuggen eines Solana BPF-Programms.
  - - meta
    - name: og:description
      content: Es gibt eine Reihe von Optionen und unterstützenden Tools zum Testen und Debuggen eines Solana BPF-Programms.
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

# Debuggen von Solana-Programmen

Es gibt eine Reihe von Optionen und unterstützenden Tools zum Testen und Debuggen eines Solana-Programms.

## Fakten

::: tip Fact Sheet

- Die Kiste `solana-program-test` ermöglicht die Verwendung von Bare Bones **_local runtime_**, wo Sie testen und debuggen können
Ihr Programm interaktiv (z. B. in vscode).
- Die Kiste „solana-validator“ ermöglicht die Verwendung der „solana-test-validator“-Implementierung für mehr robustere
Tests, die auf einem **_local validator node_** stattfinden. Sie können den Editor ausführen **_aber Haltepunkte in der
Programm werden ignoriert_**.
- Das CLI-Tool `solana-test-validator` führt und lädt Ihr Programm und verarbeitet die Transaktionsausführung
Befehlszeilen-Rust-Anwendungen oder Javascript-/Typescript-Anwendungen, die web3 verwenden.
- Für alle oben genannten Punkte wird die großzügige Verwendung des `msg!`-Makros in Ihrem Programm zu Beginn und danach empfohlen.
Entfernen Sie sie beim Testen und stellen Sie ein felsenfestes Verhalten sicher. Denken Sie daran, dass
"msg!" Recheneinheiten verbraucht, die Ihr Programm schließlich scheitern lassen kann, indem Sie die Budgetobergrenzen für Compute Units erreichen.
:::

Die Schritte in den folgenden Abschnitten verwenden die [solana-program-bpf-template](#resources).
Klonen Sie das auf Ihre Maschine:

```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```

## Laufzeittests und Debugging im Editor

Öffnen Sie die Datei `src/lib.rs`

Sie werden sehen, dass das Programm ziemlich einfach ist und im Grunde nur die empfangenen Inhalte protokolliert
die Programmeintrittspunktfunktion: `process_instruction`

1. Gehen Sie zum Abschnitt „#[cfg(test)]“ und klicken Sie auf „Tests ausführen“. Dadurch wird das Programm erstellt und dann
Führen Sie den Test „async fn test_transaction()“ aus. Sie sehen die Protokollmeldungen (vereinfacht) im vscode-Terminal unten
der Quelle.

```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```

2. Setzen Sie einen Haltepunkt in der Zeile „msg!“ des Programms (11)
3. Zurück im Testmodul klicken Sie auf „Debug“ und innerhalb von Sekunden stoppt der Debugger am Haltepunkt und können jetzt die Daten untersuchen, Funktionen schrittweise durchlaufen usw. usw.

Diese Tests werden auch über die Befehlszeile ausgeführt mit:
`cargo test` oder `cargo test-bpf`. Eventuelle Haltepunkte werden natürlich ignoriert.

Wie groovig kann man werden!

:::tip Note
Denken Sie daran, dass Sie keinen Validierungsknoten verwenden, sodass Standardprogramme, Blockhashes usw. nicht dargestellt werden oder
sich nicht so verhalten, wie sie es tun würden, wenn im Validator-Knoten ausgeführt würden. Deshalb hat uns die Solana Gang Lokales-Node-Validierungs-testing gegeben.
:::

## Testen des lokalen Validator-Knotens im Editor

Integrationstests mit programmgesteuertem Laden eines lokalen Validierungsknotens sind in definiert
Datei „tests/integration.rs“.

Standardmäßig können die Vorlagenrepo-Integrationstests nur über die Befehlszeile mit `cargo test-bpf` ausgeführt werden.
Mit den folgenden Schritten können Sie auch die Anzeige von Programm-Validator-Logs und `msg!`-Ausgaben Ihres Programms, innerhalb des Editors arbeiten:

1. Führen Sie im Repo-Verzeichnis `cargo build-bpf` aus, um das Beispielprogramm zu erstellen
2. Öffnen Sie im Editor „tests/integration.rs“.
3. Zeile 1 auskommentieren -> `// #![cfg(feature = "test-bpf")]`
4. Ändern Sie es in Zeile 19 wie folgt: `.add_program("target/deploy/bpf_program_template", program_id)`
5. Fügen Sie in Zeile 22 Folgendes ein: `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. Klicken Sie über der Funktion „test_validator_transaction()“ auf „Test ausführen“.

Dadurch wird der Validator-Knoten geladen und Sie können dann eine Transaktion erstellen (auf Rust-Weise) und
unter Verwendung des `RcpClient` an den Knoten übermitteln.

Die Ausgabe des Programms wird auch im Editor-Terminal ausgedruckt. Zum Beispiel (vereinfacht):

```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```

Das Debuggen hier ermöglicht es Ihnen, die im **_test body_** verwendeten Funktionen und Methoden zu debuggen, wird aber
kein Haltepunkt in Ihrem Programm.

Die Knie der Biene, oder?

## Testen lokaler Validator-Knoten von Client-Apps

Schließlich können Sie einen lokalen Validierungsknoten starten und Ihr Programm und alle Konten mit dem `solana-test-validator` laden
von der Kommandozeile.

Mit dieser Methode, wirst du eine client application oder Rust benutzen
Bei diesem Ansatz benötigen Sie eine Client-Anwendung, die entweder in Rust [RcpClient](#Ressourcen)  oder in [JavaScript or Typescript clients](#Ressourcen) verwendet wird.

Siehe `solana-test-validator --help` für weitere Details und Optionen. Für das Beispielprogramm hier ist Vanilla Setup:

1. Öffnen Sie ein Terminal im Repo-Ordner
2. Führen Sie `solana config set -ul` aus, um die Konfiguration so einzustellen, dass sie auf lokal zeigt
3. Führen Sie „solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so“ aus
4. Öffnen Sie ein anderes Terminal und führen Sie „solana logs“ aus, um den Log-Streamer zu starten
5. Sie können dann Ihr Client-Programm ausführen und die Programmausgabe in dem Terminal beobachten, in dem Sie den Log-Streamer gestartet haben

Nun, das ist der Schlafanzug der Katze YO!

## Ressourcen

[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
