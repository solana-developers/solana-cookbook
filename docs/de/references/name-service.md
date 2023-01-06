---
title: Name Service
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Namensregistrierung
  - - meta
    - name: og:title
      content: Solana Kochbuch | Namensregistrierung
  - - meta
    - name: description
      content: Die Namensregistrierung speichert Informationen über den Domänennamen. Erfahren Sie mehr über das Auflösen von SOL-Domains, Reverse/Subdomain-Lookup, mehr über Name Service und Referenzen im Solana-Kochbuch.
  - - meta
    - name: og:description
      content: Die Namensregistrierung speichert Informationen über den Domänennamen. Erfahren Sie mehr über das Auflösen von SOL-Domains, Reverse/Subdomain-Lookup, mehr über Name Service und Referenzen im Solana-Kochbuch.

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

# Namensdienst

## Namensregister

Die Namensregistrierung speichert Informationen über den Domänennamen. Es besteht aus zwei Dingen:

- Die Kopfzeile
- Die Daten

Den Daten für einen Domainnamen wird immer der Header vorangestellt, unten ist die Struktur des Headers in JS:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/schema/schema.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/schema/schema.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## SOL-Domänen auflösen

.SOL-Domains sind einzigartige, menschenfreundliche Domainnamen
die in publicKeys konvertiert werden. Viele Wallets verwenden diese als
eine weitere Option zum Senden von Token oder SOL. Sie können konvertieren
.SOL-Domains zu ihrem publicKey mit dem Folgenden:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Rückwärtssuche

Dies kann verwendet werden, um den Domänennamen aus seinem öffentlichen Schlüssel aufzulösen

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Subdomain nachschlagen

Um eine Subdomain aufzulösen, müssen Sie:

1. Holen Sie sich den Schlüssel der übergeordneten Domäne
2. Holen Sie sich den Subdomain-Schlüssel
3. Rufen Sie die Kontoinformationen ab

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Finden Sie alle Domainnamen, die einem öffentlichen Schlüssel gehören

Sie können alle Domänennamen einer Brieftasche abrufen, indem Sie eine `getProgramAccounts`-Anfrage mit einem `memcmp`-Filter durchführen

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/find-for-owner/find-for-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/find-for-owner/find-for-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Ein Twitter-Handle auflösen

Twitter-Handles können [beim Solana-Namensdienst registriert] (https://naming.bonfida.org/#/twitter-registration) und wie .SOL-Domainnamen verwendet werden

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Umgekehrte Suche nach einem Twitter-Handle

Um die mit einem Twitter-Handle verknüpfte SOL-Adresse zu finden, können Sie eine Rückwärtssuche durchführen

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
