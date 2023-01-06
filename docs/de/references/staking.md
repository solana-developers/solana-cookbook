---
title: Staking
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Staking
  - - meta
    - name: og:title
      content: Solana Kochbuch | Staking
  - - meta
    - name: description
      content: Stake SOL und verdiene Belohnungen für die Unterstützung bei der Sicherung des Netzwerks.
  - - meta
    - name: og:description
      content: Stake SOL und verdiene Belohnungen für die Unterstützung bei der Sicherung des Netzwerks. Erfahren Sie mehr über das Erstellen von Beteiligungskonten, das Delegieren von Beteiligungen, das Zurückziehen von Beteiligungen und weitere Referenzen zum Aufbau auf Solana im Solana-Kochbuch.
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

# Staking



## Holen Sie sich aktuelle Validatoren

Wir können SOL einsetzen und Belohnungen verdienen, wenn wir helfen, das Netzwerk zu sichern. Zum Abstecken delegieren wir SOL an Validatoren, die wiederum Transaktionen verarbeiten.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Einsatzkonto erstellen

Alle Staking-Anweisungen werden vom [Stake-Programm] (https://docs.solana.com/developing/runtime-facilities/programs#stake-program) abgewickelt. Zunächst erstellen wir ein [Stake-Konto](https://docs.solana.com/staking/stake-accounts), das anders erstellt und verwaltet wird als ein standardmäßiges 
[Systemkonto](accounts.md#create-a-system-Konto). Insbesondere müssen wir die „Stake Authority“ und „Withdrawal Authority“ des Kontos festlegen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/create-stake-account/create-stake-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/create-stake-account/create-stake-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Stake delegieren

Sobald ein Stake Konto finanziert ist, kann die Stake Autoritat es an einen Prüfer delegieren. Jedes Staking Konto kann jeweils nur an einen Validator delegiert werden. Darüber hinaus müssen alle Token im Konto entweder delegiert oder nicht delegiert sein. Einmal delegiert, dauert es mehrere Epochen, bis ein Staking Konto aktiv wird.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/delegate-stake/delegate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/delegate-stake/delegate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Delegator durch Validatoren abrufen

Möglicherweise haben mehrere Konten auf ein bestimmtes Validator-Konto gesetzt.
Um alle Staker abzurufen, verwenden wir die API „getProgramAccounts“ oder „getParsedProgramAccounts“.
Weitere Informationen finden Sie im Abschnitt [Leitfäden](/guides/get-program-accounts.html).
Die Staking Accounts sind 200 Bytes lang und der Voter Public Key beginnt bei 124 Bytes. [Referenz](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Stake deaktivieren

Nachdem ein Pfahlkonto delegiert wurde, kann die „Pfahlbehörde“ jederzeit entscheiden, das Konto zu deaktivieren. Die Deaktivierung kann mehrere Epochen dauern und ist erforderlich, bevor SOL zurückgezogen wird.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/deactivate-stake/deactivate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/deactivate-stake/deactivate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Stake Auszahlen

Nach der Deaktivierung kann die `Withdrawal Authority` SOL zurück auf ein Systemkonto abheben. Sobald ein Stake-Konto nicht mehr delegiert ist und einen Saldo von 0 SOL hat, wird es effektiv zerstört.

<!-- <CodeGroup>
  <CodeGroupItem title="TS" active> -->
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/withdraw-stake/withdraw-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/withdraw-stake/withdraw-stake.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>
