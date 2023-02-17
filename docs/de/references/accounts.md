---
title: Accounts
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Kontoreferenzen
  - - meta
    - name: og:title
      content: Solana Kochbuch | Kontoreferenzen
  - - meta
    - name: description
      content: Erfahren Sie mehr über Konten auf Solana und wie Sie sie in Ihren Programmen verwenden.
  - - meta
    - name: og:description
      content: Erfahren Sie mehr über Konten auf Solana und wie Sie sie in Ihren Programmen verwenden.
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

# Accounts

## So erstellen Sie ein Systemkonto

Erstellen Sie ein Konto, das dem [Systemprogramm][1] gehört. Die Solana-Laufzeit gewährt dem Besitzer eines Kontos Zugriff darauf
in seine Daten schreiben oder Lamports übertragen. Beim Erstellen eines Kontos müssen wir einen festen Speicherplatz in Bytes vorbelegen
(`Raum`) und genügend Lamports, um die Miete zu decken. [Miete][2] sind Kosten, die anfallen, um Konten auf Solana am Leben zu erhalten.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So berechnen Sie die Kontokosten

Um Konten auf Solana am Leben zu erhalten, fallen Speicherkosten an, die als [Miete] [2] bezeichnet werden. Ein Konto kann vollständig befreit werden
aus der Mieteinziehung durch Hinterlegung von mindestens zwei Jahresmieten. Für die Berechnung müssen Sie berücksichtigen
die Datenmenge, die Sie im Konto speichern möchten.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## So erstellen Sie Konten mit Seeds

Sie können `createAccountWithSeed` verwenden, um Ihre Konten zu verwalten, anstatt eine Reihe verschiedener Schlüsselpaare zu erstellen.

### Generieren

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Erstellen

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Transferieren

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Only an account owned by system program can transfer via system program.
:::

## So erstellen Sie PDAs

[Vom Programm abgeleitete Adresses (PDA)][3] sind wie eine normale Adresse, jedoch mit mit den folgenden Unterschieden:

1. Abfall von der ed25519-Kurve
2. Verwendung des Programms zum Signieren anstelle des privaten Schlüssels

**Hinweis**: PDA-Konten können nur im Programm erstellt werden. Die Adresse kann clientseitig erstellt werden.

::: tip
Obwohl PDA von einer Programm-ID abgeleitet wird, bedeutet dies nicht, dass der PDA demselben Programm gehört. (Nehmen Sie ein Beispiel: Sie können Ihren PDA als Token-Konto initialisieren, das ein Konto ist, das dem Token-Programm gehört.)
:::

### Generieren Sie einen PDA

`findProgramAddress` fügt am Ende Ihres Seeds ein zusätzliches Byte hinzu.
Es beginnt bei 255 bis 0 und gibt den ersten öffentlichen Schlüssel außerhalb der Kurve zurück.
Sie erhalten immer dasselbe Ergebnis, wenn Sie dieselbe Programm-ID übergeben
und Samen.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Erstellen Sie einen PDA

Unten ist ein Beispielprogramm zum Erstellen eines PDA-Kontos, das dem Programm gehört, und ein Beispiel zum Aufrufen des Programms mit dem Client.

#### Program

Das Folgende zeigt eine einzelne Anweisung `system_instruction::create_account`, die ein Konto mit zugewiesener Datengröße von `space`, `rent_lamports` Anzahl von Lamports für den abgeleiteten PDA erstellt. Dies wird mit dem PDA unter Verwendung von "invoke_signed" signiert, ähnlich wie oben beschrieben.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So signieren Sie mit einem PDA

PDAs können nur innerhalb des Programms signiert werden. Unten ist ein Programm
Beispiel mit einem PDA signieren und das Programm mit dem Client aufrufen.

### Programm

Das Folgende zeigt eine einzelne Anweisung, die SOL von einem PDA überträgt
wurde von der Saat `Escrow` auf ein Konto übergeben. `invoke_signed` ist
verwendet, um mit dem PDA zu unterschreiben.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So erhalten Sie Programmkonten

Gibt alle Konten zurück, die einem Programm gehören. Weitere Informationen zu `getProgramAccounts` und seiner Konfiguration finden Sie im [Anleitungsabschnitt](../guides/get-program-accounts.md).

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## So schließen Sie Konten

Sie können ein Konto schließen (alle gespeicherten Daten löschen), indem Sie alle SOL. (Weitere Informationen finden Sie unter [rent][2])


#### Programm


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So erhalten Sie den Kontostand

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
If you want to get a token balance, you will need to know the address of token account. For more information, see [Token References](token.md)
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
