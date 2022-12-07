---
title: Programme
head:
  - - meta
    - name: title
      content: Solana Cookbook | Programme
  - - meta
    - name: og:title
      content: Solana Cookbook | Programme
  - - meta
    - name: description
      content: Programme (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programme and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Programme (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programme and more Core Concepts at The Solana cookbook.
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

# Programme

Jeder Entwickler kann Programme für die Solana-Blockchain schreiben und bereitstellen. Das Programm (in anderen Protokollen als Smart Contracts bekannt) dient als Grundlage für On-Chain-Aktivitäten und treibt alles an, von DeFi und NFTs bis hin zu Social Media und Gaming.

## Facts

::: tip Fact Sheet

- Programme verarbeiten [Aneweisungen](./transactions) sowohl von Endbenutzern als auch von anderen Programmen
- Alle Programme sind *zustandslos* (*stateless*): Alle Daten, mit denen sie interagieren, werden in separaten [Konten](./accounts.md) gespeichert, die über Anweisungen gegeben werden.
- Programme selbst werden in Konten gespeichert, die als "ausführbar" gekennzeichnet sind
- Alle Programme gehören dem [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) und werden von der [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime) ausgeführt
- Entwickler schreiben am häufigsten Programme in Rust oder C++, können aber jede Sprache wählen, die auf das [LLVM](https://llvm.org/)'s [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) Backend abziehlt
- Alle Programme haben einen einzigen Einstiegspunkt, an dem die Befehlsverarbeitung stattfindet (i.e. `process_instruction`); Parameter beinhalten immer:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`
:::

## Deep Dive

Im Gegensatz zu den meisten anderen Blockchains trennt Solana Code vollständig von Daten. Alle Daten, mit denen Programme interagieren, werden in separaten Konten gespeichert und als Referenzen über Anweisungen weitergegeben. Dieses Modell ermöglicht es, dass ein einziges generisches Programm über verschiedene Konten läuft, ohne dass zusätzliche Bereitstellungen (Deployments) erforderlich sind. Übliche Beispiele für dieses Muster finden sich in den Native- und SPL-Programmen.

### Native Programme & Die Solana Programm Bibliothek (SPL - Solana Program Library)

Solana ist mit einer Reihe von Programmen ausgestattet, die als Kernbausteine ​​für On-Chain-Interaktionen dienen. Diese Programme sind unterteilt in [Native Programme](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader)
und [Solana Programm (SPL) Bibliotheken](https://spl.solana.com/).

Native Programme stellen die Basisfunktionalität bereit, die für den Betrieb von Validatoren erforderlich ist. Unter diesen Programmen ist das bekannteste das [System Programm](https://docs.solana.com/developing/runtime-facilities/programs#system-program),
welches für die Verwaltung neuer Konten und die Übertragung von SOL zwischen zwei Parteien verantwortlich ist.

SPL-Programme unterstützen eine Reihe von On-Chain-Aktivitäten, darunter das Erstellen, Tauschen und Verleihen von Token sowie die Generierung von Stake-Pools und die Aufrechterhaltung eines On-Chain-Namensdienstes.
Das [SPL Token Program](https://spl.solana.com/token) an direkt über die CLI aufgerufen werden, während andere wie das [verbundene Token-Kontoprogramm](https://spl.solana.com/associated-token-account) werden normalerweise mit benutzerdefinierten Programmen zusammengestellt.

### Writing Programs

Programme werden am häufigsten mit Rust oder C++ entwickelt, können aber mit jeder Sprache entwickelt werden, die auf das BPF-Backend des LLVM abzielt. Jüngste Initiativen von [Neon Labs](https://neon-labs.org/) und [Solang](https://solang.readthedocs.io/en/latest/) ermöglichen jedoch [EVM](https://ethereum.org/en/developers/docs/evm/) Kompatibilität und ermöglichen es Entwicklern, Programme in Solidity zu schreiben.

Die meisten Rust-basierten Programme halten sich an die folgende Architektur:

| Datei          | Beschreibung                                        |
|----------------|-----------------------------------------------------|
| lib.rs         | Module registrieren                                 |
| entrypoint.rs  | Einstieg ins Programm                               |
| instruction.rs | Programm-API, (De-)Serialisierung von Befehlsdaten  |
| processor.rs   | Programmlogik                                       |
| state.rs       | Programmobjekte, (De-)Serialisierungszustand        |
| error.rs       | Programmspezifische Fehler                          |

Kürzlich hat sich  [Anchor](https://github.com/coral-xyz/anchor) zu einem beliebten Framework für die Entwicklung von Programmen entwickelt.
Anchor ist ein rechthaberisches Framework, ähnlich wie Ruby on Rails, das Boilerplates reduziert und den (De-)Serialisierungsprozess für die Rust-basierte Entwicklung rationalisiert.

Programme werden normalerweise entwickelt und in Localhost- und Devnet-Umgebungen getestet, bevor sie auf Testnet oder Mainnet bereitgestellt werden. Solana unterstützt die folgenden Umgebungen:

| Cluster-Umgebung     | RPC Verbindungs URL                                                       |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

Nach der Bereitstellung in einer Umgebung können Clients mit On-Chain-Programmen über  [RPC Verbindungen](https://docs.solana.com/developing/clients/jsonrpc-api) mit dem jeweiligen Cluster interagieren.

### Bereitstellen von Programmen

Entwickler können ihre Programme über die [CLI](https://docs.solana.com/cli/deploy-a-program) bereitstellen:

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Wenn ein Programm bereitgestellt wird, wird es zu einem [ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) kompiliert und in den Solana-Cluster hochgeladen. Programme befinden sich in Konten (ähnlich wie alles andere auf Solana), außer dass diese Konten als „ausführbar“ markiert und dem BPF Loader zugewiesen sind. Die Adresse dieses Kontos wird als „program_id“ bezeichnet und wird verwendet, um bei allen zukünftigen Transaktionen auf das Programm zu verweisen.

Solana unterstützt mehrere BPF Loader, wobei der neueste der [aktualisierbare BPF Lader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111).
Der BPF Loader ist dafür verantwortlich, das Konto des Programms zu verwalten und es den Clients über die „program_id“ zur Verfügung zu stellen.
Alle Programme haben einen einzigen Einstiegspunkt, an dem die Befehlsverarbeitung stattfindet (d. h. „process_instruction“), und die Parameter beinhalten immer:

- `program_id`: `pubkey`
- `accounts`: `array`,
- `instruction_data`: `byte array`

Einmal aufgerufen, werden Programme von der Solana-Laufzeit ausgeführt.

## Weitere Quellen

- [Offizielle Dokumentation](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL Dokumentation](https://spl.solana.com/)
- [Programm-Bereitstellung von Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit von Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programmierung auf Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [Eine Einführung in die Solana Blockchain von Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
