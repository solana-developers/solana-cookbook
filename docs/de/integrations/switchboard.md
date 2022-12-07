---
title: Switchboard
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Verwenden von Switchboard zum Erstellen von Onchain-Datenfeeds
  - - meta
    - name: og:title
      content: Solana Kochbuch | Verwenden von Switchboard zum Erstellen von Onchain-Datenfeeds
  - - meta
    - name: description
      content: Switchboard ermöglicht es Bauherren, die Leistung von Solana freizusetzen, indem sie leistungsstarke Daten-Feeds von jeder API aus erstellen.
  - - meta
    - name: og:description
      content: Switchboard ermöglicht es Bauherren, die Leistung von Solana freizusetzen, indem sie leistungsstarke Daten-Feeds von jeder API aus erstellen.
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

# Switchboard

Switchboard ist ein Oracle-Protokoll, das es Entwicklern ermöglicht, Daten für eine Vielzahl von Anwendungsfällen wie Preis-Feeds, NFT-Mindestpreise, Sportstatistiken oder sogar überprüfbare Zufälligkeiten on-chain zu beziehen. Im Allgemeinen ist Switchboard eine Off-Chain-Ressource, auf die sich Entwickler berufen können, um hochintegrierte Daten on-Chain zu überbrücken und die nächste Generation von Web3 und DeFi voranzutreiben.

## Daten Feeds

Switchboard bietet eine JavaScript/TypeScript-Bibliothek namens **@switchboard-xyz/switchboard-v2**
. Diese Bibliothek kann verwendet werden, um On-Chain-Daten aus vorhandenen Datenfeeds zu erreichen oder Ihre eigenen benutzerdefinierten Feeds zu veröffentlichen. 
Erfahren Sie mehr darüber [hier](https://www.npmjs.com/package/@switchboard-xyz/switchboard-v2)

### Daten aus einem Aggregator-Feed lesen

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Erstellen eines neuen Aggregator-Feed

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Lesen Sie Daten aus einem Aggregator-Feed-in-Programm

Switchboard bietet eine Kiste namens **switchboard_v2**
Erfahren Sie mehr darüber [hier](https://docs.rs/switchboard-v2/0.1.10/switchboard_v2/)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### So erstellen Sie einen Feed vom Publisher

Die offizielle Switchboard-Dokumentation enthält eine ausführliche Anleitung zum Erstellen eines Feeds vom Herausgeber.
Sehen Sie es sich [hier](https://docs.switchboard.xyz/feed/publisher) an .

## Oracles

Die einzigartige Funktion von Switchboard besteht darin, dass Sie Ihr eigenes Orakel erstellen und lokal ausführen können.

### Erstelen eines Oracle

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.oracle.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.oracle.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Ausführen eines lokalen Oracle

Sie können ein Orakel lokal ausführen und es Ihrer eigenen Orakelwarteschlange zuweisen, um zu testen, wie Ihr Programm in der Produktion funktionieren kann. Mainnet-Orakel sollten immer in Hochverfügbarkeitsumgebungen mit einigen Überwachungsfunktionen ausgeführt werden.

#### Anforderungen

 - Docker-compose

Erstellen Sie eine docker-compose.yml-Datei mit den Umgebungsvariablen in [Oracle Config](/integrations/switchboard.html#oracle-config)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/local/docker-compose.oracle.local.en.yml)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/local/docker-compose.oracle.local.en.yml)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Führen Sie den Container mit „docker-compose up“ aus

### Oracle Config

<table>
  <thead>
    <tr>
      <th>Env Variable</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ORACLE_KEY</td>
      <td>
        <b>
          <u>Required</u>
        </b>
        <br />
        <b>Type</b> - Public Key
        <br />
        <b>Description</b> - Public key of the oracle account that has been
        granted permissions to use an oracle queue <br />
      </td>
    </tr>
    <tr>
      <td>HEARTBEAT_INTERVAL</td>
      <td>
        <b>
          <u>Optional</u>
        </b>
        <br />
        <b>Type</b> - Number (seconds)
        <br />
        <b>Default</b> - 30
        <br />
        <b>Description</b> - Seconds between oracle heartbeats. Queues have
        different oracle heartbeat requirements. Recommended value is 15
      </td>
    </tr>
    <tr>
      <td>GCP_CONFIG_BUCKET</td>
      <td>
        <b>
          <u>Optional</u>
        </b>
        <br />
        <b>Type</b> - GCP Resource Path
        <br />
        <b>Default</b> - Looks for configs.json in the current working
        directory. If not found, no config is loaded.
        <br />
        <b>Description</b> - Contains API keys for private API endpoints
      </td>
    </tr>
    <tr>
      <td>UNWRAP_STAKE_THRESHOLD</td>
      <td>
        <b>
          <u>Optional</u>
        </b>
        <br />
        <b>Type</b> - Number (SOL amount, Ex. 1.55)
        <br />
        <b>Default</b> - 0, disabled.
        <br />
        <b>Description</b> - The Solana balance amount to trigger an unwrap stake action. When an oracle's Solana balance falls below the set threshold, the node will automatically unwrap funds from the oracle's staking wallet, leaving at least 0.1 wSOL or 10% more than the queue's minimum stake requirement. 
      </td>
    </tr>
  </tbody>
</table>

## Verifizierbare Zufallsfunktion (VRF)

Eine verifizierbare Zufallsfunktion (VRF) ist eine Pseudozufallsfunktion mit öffentlichem Schlüssel, die beweist, dass ihre Ausgaben korrekt berechnet wurden

### Lesen eines VRF-Kontos

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/read.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/read.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/read.vrf.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/read.vrf.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Erstellen eines VRF-Kontos

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/create.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/create.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  

</SolanaCodeGroup>

### Fordern von Zufälligkeit vom vrf-Konto

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/switchboard/client/request.vrf.client.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/client/request.vrf.client.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/switchboard/on-chain/request.vrf.on-chain.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/switchboard/on-chain/request.vrf.on-chain.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Resources

### APIs and Libraries

 - [Switchboard Task Types](https://docs.switchboard.xyz/api/tasks)
 - [Rust API Docs](https://docs.rs/switchboard-v2/latest/switchboard_v2/)
 - [Typescript API Docs](https://docs.switchboard.xyz/api/ts)
 - [Python API Docs](https://docs.switchboard.xyz/api/py)
 - [CLI Docs](https://docs.switchboard.xyz/api/cli)

### Examples

 - [[Client] Custom Data Feed Walkthrough](https://github.com/switchboard-xyz/switchboard-v2/tree/main/packages/feed-walkthrough)
 - [[Program] Anchor Feed Parser](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-feed-parser)
 - [[Program] Anchor VRF Parser](https://github.com/switchboard-xyz/switchboard-v2/tree/main/programs/anchor-vrf-parser)

### More Information

 - [Protocol Documentation](https://docs.switchboard.xyz/introduction)
 - [SuperteamDAO Deep Dive](https://crawling-cent-d6b.notion.site/The-Switchboard-Deep-Dive-717df6ba0b92465e8118351466257a0f)