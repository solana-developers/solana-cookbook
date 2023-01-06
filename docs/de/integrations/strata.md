---
title: Strata
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Building on Strata Protocol
  - - meta
    - name: og:title
      content: Solana Kochbuch | Building on Strata Protocol
  - - meta
    - name: description
      content: Strata ist ein Protokoll zum Starten von Token auf Solana. Erfahren Sie, wie Sie Strata verwenden und darauf aufbauen.
  - - meta
    - name: og:description
      content: Strata ist ein Protokoll zum Starten von Token auf Solana. Erfahren Sie, wie Sie Strata verwenden und darauf aufbauen.
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

# Strata

Strata ist ein Protokoll zum Starten von Token, das auf Solana basiert.
Sie können Strata verwenden, um jede Art von fungiblen Token zu starten, von sozialen Token bis hin zu Dao- und Gamefi-Token.
Sie können auch Schichten mit allem zusammenstellen, das Festpreismechanismen verwendet, um dynamische Preismechanismen wie z. B. die Metaplex CandyMachine zu erhalten.

Ausführlichere Dokumente sind [hier](docs.strataprotocol.com) verfügbar . Sie können auch die GUI unter [Strata Launchpad](app.strataprotocol.com) verwenden.

## So erstellen Sie ein vollständig verwaltetes Token

Ein vollständig verwalteter Strata-Token ist ein Token, bei dem die Liquidität durch das Protokoll verwaltet wird. Das Ergebnis ist, dass Sie sofort einen handelbaren Token erhalten, ohne dass Pools oder Liquiditätsanbieter erforderlich sind. 
Ein vollständig verwaltetes Token ist ein normales spl-Token mit Metaplex-Token-Metadaten und einer zugehörigen Bindungskurve.
Die Bindungskurve verwaltet die Liquidität, die Preisgestaltung und das Angebot dieses Tokens.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/create-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/create-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Wie man einen Token kauft und verkauft

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/buy-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/buy-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/fully-managed/sell-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/fully-managed/sell-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Wie man Liquidität aufbaut

Strata kann auch Token verkaufen, wenn Sie den Vorrat manuell verwalten möchten. Dies kann für das Liquiditäts-Bootstrapping nützlich sein, bevor Sie Ihren Token auf einem Dex auflisten. 
Sie können [hier](https://docs.strataprotocol.com/marketplace/lbc) mehr darüber lesen oder Ihre eigenen unter [Strata Launchpad](app.strataprotocol.com) starten.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/strata/lbc/create.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/strata/lbc/create.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Other Resources

- [Typescript Client Documentation](https://docs.strataprotocol.com) - Live code examples to create and manage Strata tokens
- [Strata Launchpad](https://app.strataprotocol.com/launchpad) - Launch a token using the GUI
