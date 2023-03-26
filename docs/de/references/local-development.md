---
title: Local Development
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Lokale Entwicklung
  - - meta
    - name: og:title
      content: Solana Kochbuch | Lokale Entwicklung
  - - meta
    - name: description
      content: Richten Sie Local Validator für die lokale Entwicklerumgebung und Airdrop SOL ein. Erfahren Sie mehr über lokale Entwicklung und weitere Referenzen für Building on Solana im Solana-Kochbuch.
  - - meta
    - name: og:description
      content: Richten Sie Local Validator für die lokale Entwicklerumgebung und Airdrop SOL ein. Erfahren Sie mehr über lokale Entwicklung und weitere Referenzen für Building on Solana im Solana-Kochbuch.
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

# Lokale Entwicklung

## Starten eines lokalen Validators

Das lokale Testen Ihres Programmcodes kann viel zuverlässiger sein als
Testen auf devnet und kann Ihnen beim Testen helfen, bevor Sie es auf devnet ausprobieren.

Sie können Ihren Local-Test-Validator einrichten, indem Sie die [Solana Tool Suite](/getting-started/installation.md#install-cli) installieren.
und läuft

„Konsole
solana-Test-Validator
```

Zu den Vorteilen der Verwendung von Local-Test-Validator gehören:

- Keine RPC-Ratenbegrenzungen
- Keine Airdrop-Grenzen
- Direkte On-Chain-Programmbereitstellung (`--bpf-program ...`)
- Konten aus einem öffentlichen Cluster klonen, einschließlich Programme (`--clone ...`)
- Konfigurierbare Aufbewahrung des Transaktionsverlaufs (`--limit-ledger-size ...`)
- Konfigurierbare Epochenlänge (`--slots-per-epoch ...`)
- Zu einem beliebigen Slot springen (`--warp-slot ...`)
```

## Verbindung zu Umgebungen

Wenn Sie an der Solana-Entwicklung arbeiten, müssen Sie eine Verbindung herstellen
zu einem bestimmten RPC-API-Endpunkt. Solana hat 3 öffentliche Entwicklung
Umgebungen:
- mainnet-beta https://api.mainnet-beta.solana.com
- devnet https://api.devnet.solana.com
- testnet https://api.testnet.solana.com

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Schließlich können Sie sich auch mit einem privaten Cluster verbinden, entweder einem lokalen oder einem
läuft remote mit folgendem:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Abonnieren von Veranstaltungen

Websockets bieten eine Pub/Sub-Schnittstelle, auf der Sie auf bestimmte Ereignisse lauschen können. Anstatt einen typischen HTTP-Endpunkt in regelmäßigen Abständen zu pingen, um häufige Updates zu erhalten, können Sie diese Updates stattdessen nur dann erhalten, wenn sie auftreten.

Solanas web3 [`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) generiert unter der Haube einen Websocket-Endpunkt und registriert einen Websocket-Client, wenn Sie eine neue ` Connection`-Instanz (siehe Quellcode [hier](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)).

Die Klasse „Connection“ legt Pub/Sub-Methoden offen – sie beginnen alle mit „on“, wie Event-Emitter. Wenn Sie diese Listener-Methoden aufrufen, wird ein neues Abonnement für den Websocket-Client dieser „Connection“-Instanz registriert. Die Pub/Sub-Beispielmethode, die wir unten verwenden, ist [`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange). Der Rückruf stellt die aktualisierten Zustandsdaten über Argumente bereit (siehe [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback) als Beispiel).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Test SOL erhalten

Wenn Sie lokal arbeiten, benötigen Sie zum Senden etwas SOL
Transaktionen. In Nicht-Mainnet-Umgebungen können Sie SOL per empfangen
Airdrop an Ihre Adresse

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Verwenden von Mainnet-Konten und -Programmen

Häufig verlassen sich lokale Tests auf Programme und Konten, die nur im Mainnet verfügbar sind. Die Solana CLI ermöglicht beides:
* Laden Sie Programme und Konten herunter
* Laden Sie Programme und Konten in einen lokalen Validator

### So laden Sie Konten aus dem Mainnet

Es ist möglich, das SRM-Token-Mint-Konto in eine Datei herunterzuladen:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Das Laden in Ihr lokales Netz erfolgt dann, indem die Datei und die Zieladresse des Kontos (auf dem lokalen Cluster) beim Starten des Validators übergeben werden:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### So laden Sie Programme aus dem Mainnet

Ebenso ist es möglich, das Programm Serum Dex v3 herunterzuladen:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Das Laden in Ihr lokales Netz erfolgt dann, indem Sie beim Starten des Validators die Datei und die Zieladresse des Programms (auf dem lokalen Cluster) übergeben:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
