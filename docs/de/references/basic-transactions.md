---
title: Transaktionen versenden
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Transaktionen versenden
  - - meta
    - name: og:title
      content: Solana Kochbuch | Transaktionen versenden
  - - meta
    - name: description
      content: Lernen Sie grundlegende Transaktionen wie das Senden von SOL, SPL-Tokens, das Berechnen von Transaktionskosten und weitere Referenzen zum Aufbauen auf Solana im Solana-Kochbuch.
  - - meta
    - name: og:description
      content: Lernen Sie grundlegende Transaktionen wie das Senden von SOL, SPL-Tokens, das Berechnen von Transaktionskosten und weitere Referenzen zum Aufbauen auf Solana im Solana-Kochbuch.
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

# Transaktionen versenden

##So senden Sie SOL

Um SOL zu senden, müssen Sie mit dem [SystemProgram][1] interagieren.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Python">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.py)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.rs)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program

## So senden Sie SPL-Tokens

Verwenden Sie das [Token-Programm][1], um SPL-Token zu übertragen. Um ein SPL-Token zu senden, müssen Sie die Kontoadresse des SPL-Tokens kennen. Sie können sowohl die Adresse abrufen als auch Token senden
mit folgendem Beispiel.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://spl.solana.com/token

## So berechnen Sie die Transaktionskosten

Zur Berechnung wird die Anzahl der Unterschriften der Transaktionskosten, die eine Transaktion benötigt
herangezogen. Solange Sie kein Konto erstellen, werden dies die endgültigen Transaktionskosten sein. Um mehr über die Erstellungskosten eines Konto zu erfahren
, siehe [Berechnung der Mietbefreiung](accounts.md#calculating-rent-exemption)

Die beiden folgenden Beispiele zeigen die beiden derzeit verfügbaren Möglichkeiten zur Berechnung der geschätzten Transaktionskosten.

Das erste Beispiel verwendet „getEstimatedFee“, eine neue Methode in der Klasse „Transaction“, während das zweite Beispiel „getFeeForMessage“ verwendet, das „getFeeCalculatorForBlockhash“ in der Klasse „Connection“ ersetzt.

### getEstimatedFee

<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### getFeeForMessage

<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So fügen Sie einer Transaktion eine Notiz hinzu

Jede Transaktion kann unter Verwendung des [Memo-Programms] [2] eine Nachricht hinzufügen.
Aktuell muss noch die `programID` aus dem **Memo-Programm** hinzugefügt werden
manuell `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## So ändern Sie das Computing-Budget, die Gebühr &amp; Priorität für eine Transaktion

Die Transaktionspriorität (TX) wird zusätzlich zur Grundgebühr durch die Zahlung einer Priorisierungsgebühr erreicht.
Standardmäßig ist das Rechenbudget das Produkt von
200.000 Compute Units (CU) * Anzahl der Anweisungen, mit einem Maximum von 1,4 Mio. CU.
Die Grundgebühr beträgt 5.000 Lamports. Ein microLamport ist 0,000001 Lamport.

Das Gesamtrechenbudget oder die Priorisierungsgebühr für eine einzelne TX kann umgeändert werden.
Hinzufügen von Anweisungen aus dem ComputeBudgetProgram.

`ComputeBudgetProgram.setComputeUnitPrice({ microLamports: Zahl })`
wird eine Priorisierungsgebühr über der Grundgebühr (5.000 Lamports) hinzugefügt. Um das zu bestimmen Der Wert der Priorisierungsgebühr in Lamports
die in microLamports bereitgestellt werden, werden mit dem CU-Budget multipliziert. Wenn Ihr CU-Budget beispielsweise 1 Mio. CU beträgt, und Sie
Fügen Sie 1 microLamport/CU hinzu, beträgt die Priorisierungsgebühr 1 Lamport (1M * 0,000001).
Die Gesamtgebühr beträgt dann 5001 Lamports.

Verwenden Sie zum Festlegen „ComputeBudgetProgram.setComputeUnitLimit({units: number})“.
das neue Compute-Budget. Der angegebene Wert ersetzt den Standardwert.
Transaktionen sollten die erforderliche Mindestmenge an CU anfordern
Ausführung, um den Durchsatz zu maximieren oder Gebühren zu minimieren.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.tsx))

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.rs))

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.rs))

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Program Logs Example ( [Explorer](https://explorer.solana.com/tx/2mNPXeoy3kFxo12L8avsEoep65S4Ehvw2sheduDrAXbmmNJwTtXNmUrb5MM3s15eki2MWSQrwyKGAUQFZ9wAGo9K/) ):

<CodeGroup>
  <CodeGroupItem title="Log Output">

  @[code](@/code/basic-transactions/compute-budget/log_output.txt)

  </CodeGroupItem>
</CodeGroup>


[2]: https://spl.solana.com/memo
