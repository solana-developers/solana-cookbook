---
title: Jupiter
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Tausche tokens mit Jupiter
  - - meta
    - name: og:title
      content: Solana Cookbook | Tausche tokens mit Jupiter
  - - meta
    - name: description
      content: Jupiter ist der wichtigste Liquiditätsaggregator für Solana und bietet die größte Auswahl an Token und die beste Route Discovery zwischen allen Token-Paaren.
  - - meta
    - name: og:description
      content: Jupiter ist der wichtigste Liquiditätsaggregator für Solana und bietet die größte Auswahl an Token und die beste Route Discovery zwischen allen Token-Paaren.
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

# Jupiter

Jupiter ist der wichtigste Liquiditätsaggregator für Solana und bietet die größte Auswahl an Token und die beste Route Discovery zwischen allen Token-Paaren.

## Installation

@jup-ag/core ist das Core-Paket, das verwendet wird, um mit Jupiter-On-Chain-Programmen zu interagieren, um Swaps zwischen zwei möglichen Token-Paaren durchzuführen.

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/core
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/core
```

  </CodeGroupItem>
</CodeGroup>

### Abrufen der Token-Liste von Jupiter

Alle möglichen Token, die mit Jupiter für ein bestimmtes Netzwerk ausgetauscht werden können, werden abgerufen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Laden der Jupiter-Instanz

Die Jupiter-Instanz wird mit den bereitgestellten Konfigurationen erstellt. Es gibt viele optionale Parameter, die die Instanz benötigt, um mehr darüber zu erfahren. Gehen Sie [hier](https://docs.jup.ag/jupiter-core/full-guide)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/loading-instance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/loading-instance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Abrufen der RouteMap

Die RouteMap identifiziert, welche Token gegen ein bestimmtes Eingabetoken ausgetauscht werden können. Die Routenkarte enthält nur Token-Mint-Adressen und keine Metadaten.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/route-map/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/route-map/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Abrufen der Routen für gegebene Input- und Output-Token

Die `computeRoutes`-Methode nimmt die Eingabe-Mint-Adresse und die Ausgabe-Mint-Adresse auf und gibt alle möglichen Routen in der Reihenfolge des besten Preises zuerst aus.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/routes/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/routes/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Führen Sie den Token-Tausch durch

Hier wird die "Exchange"-Methode aufgerufen, die die Transaktion für eine gegebene Route aufbaut.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/swap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/swap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## So verwenden Sie Jupiter in einer React-Anwendung

### Installation

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @jup-ag/react-hook
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install @jup-ag/react-hook
```

  </CodeGroupItem>
</CodeGroup>

### Anbieter hinzufügen

Wir richten hier den JupiterProvider ein, um den useJupiter-Hook über die React-App zu nutzen. Der Cluster-Parameter ist auf **mainnet-beta** gesetzt, um eine große Auswahl an Token zu erhalten, aber wenn Sie möchten, können Sie ihn auch auf **devnet** ändern

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/providerSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/providerSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Abrufen der Token-Liste

Alle möglichen Token, die in einem gegebenen Netzwerk getauscht werden können, werden abgerufen und im Zustand gespeichert.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/react-token-list/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/react-token-list/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Aufbau des Staates

InputMint und OutputMint sind Zustände, die hinzugefügt werden, damit sie untereinander ausgetauscht oder auch vom Benutzer übernommen werden können.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/inputSetup/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/inputSetup/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Verwenden des useJupiter-Reaktionshooks

Der useJupiter-Hook nimmt alle erforderlichen Parameter, um die Routen zu finden, über die Token von InputMint und OutputMint ausgetauscht werden können. Um mehr darüber zu erfahren, gehen Sie [hier](https://docs.jup.ag/jupiter-react/using-the-react-hook)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/useJupiter/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/useJupiter/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Durchführung des Swaps

Nachdem Sie alle Daten für useJupiter Hook bereitgestellt haben. Wir können die Jupiter-Instanz verwenden, um einen Austausch mit der Methode „exchange“ durchzuführen

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/reactSwap/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/reactSwap/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## So verwenden Sie die Jupiter-API

Dies ist der einfachste Weg, mit Jupiter-Programmen zu interagieren, um zwei beliebige bereitgestellte Token auszutauschen.

### Installation

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn i @solana/web3.js
yarn i cross-fetch
yarn i @project-serum/anchor
yarn i bs58
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm i @solana/web3.js
npm i cross-fetch
npm i @project-serum/anchor
npm i bs58
```

  </CodeGroupItem>
</CodeGroup>

### Abrufen der Routenkarte

Diese API ruft alle verfügbaren Token ab, die mit der Jupiter-API ausgetauscht werden können. Eine Liste aller möglichen Token-Routen wird hier abgerufen und „allInputMints“ enthält die Liste aller möglichen Input-Token nach Mint-Adresse und „swappableOutputForSol“ enthält alle möglichen Token, die in diesem Fall gegen SOL ausgetauscht werden können.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/retriveapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/retriveapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Abrufen der serialisierten Transaktion zum Ausführen von Swap

Die POST-API-Anforderung erfolgt mit der gewünschten Route und der Brieftaschenadresse des Benutzers. Es gibt einige optionale Parameter, die dieser API hinzugefügt werden können, wie **wrapUnwrapSOL** und **feeAccount**, um mehr darüber zu erfahren Gehen Sie hier die offiziellen Dokumente durch [link](https://docs.jup.ag/jupiter-api/swap-api-for-solana)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/getTxapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/getTxapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Ausführung der Swap-Transaktion

Ein Transaktionsobjekt wird erstellt und dann vom Benutzer signiert.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/jupiter/executeapi/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/jupiter/executeapi/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Other Resources

- [Main Docs](https://docs.jup.ag/)
- [Jupiter Core Example Code](https://github.com/jup-ag/jupiter-core-example)
- [Jupiter React Example Code](https://github.com/jup-ag/jupiter-api-nextjs-example)
- [Jupiter API Example Code](https://github.com/jup-ag/api-arbs-example)
