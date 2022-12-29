---
title: Senden von Offline-Transaktionen
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Senden von Offline-Transaktionen
  - - meta
    - name: og:title
      content: Solana Kochbuch | Senden von Offline-Transaktionen
  - - meta
    - name: description
      content: Nach Unterzeichnung der Offline-Transaktion kann jeder sie im Netzwerk übertragen. Erfahren Sie mehr über das Senden von Offline-Transaktionen und Referenzen im Solana-Kochbuch.
  - - meta
    - name: og:description
      content: Nach Unterzeichnung der Offline-Transaktion kann jeder sie im Netzwerk übertragen. Erfahren Sie mehr über das Senden von Offline-Transaktionen und Referenzen im Solana-Kochbuch.
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

# Offline-Transaktion

## Transaktion unterzeichnen

Um eine Offline-Transaktion zu erstellen, müssen Sie die Transaktion signieren und dann kann jeder es im Netzwerk übertragen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/sign-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Transaktion teilweise signieren

Wenn für eine Transaktion mehrere Signaturen erforderlich sind, können Sie sie teilweise signieren.
Die anderen Unterzeichner können sie dann unterzeichnen und im Netzwerk übertragen.

Einige Beispiele dafür, wann dies nützlich ist:

- Senden Sie einen SPL-Token gegen Zahlung
- Signieren Sie eine Transaktion, damit Sie später ihre Echtheit überprüfen können
- Rufen Sie benutzerdefinierte Programme in einer Transaktion auf, die Ihre Unterschrift erfordern

In diesem Beispiel sendet Bob Alice einen SPL-Token als Gegenleistung für ihre Zahlung:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/partial-sign/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/partial-sign/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Langlebige Nonce

„RecentBlockhash“ ist ein wichtiger Wert für eine Transaktion. Ihre Transaktion wird abgelehnt, wenn Sie einen abgelaufenen aktuellen Blockhash verwenden (nach 150 Blöcken). Sie können "durable nonce" verwenden, um einen nie abgelaufenen aktuellen Blockhash zu erhalten. Um diesen Mechanismus auszulösen, muss Ihre Transaktion

1. Verwenden Sie ein im `Nonce-Konto` gespeichertes `nonce` als aktuellen Blockhash
2. Fügen Sie die Operation `Nonce Advance` in die erste Anweisung ein

### Erstellen Sie ein Nonce-Konto

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Holen Sie sich ein Nonce-Konto

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Verwenden Sie das Nonce-Konto

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
