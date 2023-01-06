---
title: Programme schreiben
head:
  - - meta
    - name: title
      content: Solana Cookbook | Referenzen zum Solana-Programm
  - - meta
    - name: og:title
      content: Solana Cookbook | Referenzen zum Solana-Programm
  - - meta
    - name: description
      content: Erfahren Sie, wie Sie Programme mit Verweisen auf programmübergreifende Aufrufe, Lesekonten und mehr auf Solana schreiben
  - - meta
    - name: og:description
      content: Erfahren Sie, wie Sie Programme mit Verweisen auf programmübergreifende Aufrufe, Lesekonten und mehr auf Solana schreiben
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

# Programme schreiben

## So übertragen Sie SOL in einem Programm

Ihr Solana-Programm kann Lamports von einem Konto auf ein anderes übertragen
ohne das Systemprogramm "aufzurufen". Die Grundregel ist die
Ihr Programm kann Lamports von jedem Konto übertragen, das Ihrem Programm überhaupt auf irgendein Konto **gehört**
.

Das Empfängerkonto *muss nicht* ein Konto Ihres Programms sein.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## Wie bekomme ich die Uhr in ein Programm?

Das Erhalten einer Uhr kann auf zwei Arten erfolgen

1. Übergabe von `SYSVAR_CLOCK_PUBKEY` an eine Anweisung
2. Direkter Zugriff auf die Uhr innerhalb einer Anweisung.

Es ist schön, beide Methoden zu kennen, da einige ältere Programme immer noch den `SYSVAR_CLOCK_PUBKEY` als Konto erwarten.

### Passing Clock als Konto innerhalb einer Anweisung

Lassen Sie uns eine Anweisung erstellen, die ein Konto zum Initialisieren und den Sysvar-Pubkey erhält

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Nun übergeben wir die öffentliche Sysvar-Adresse der Uhr über den Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Direkter Zugriff auf die Uhr innerhalb einer Anweisung

Lassen Sie uns dieselbe Anweisung erstellen, aber ohne den `SYSVAR_CLOCK_PUBKEY` von der Client-Seite zu erwarten.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Die clientseitige Anweisung muss jetzt nur noch die Staats- und Zahlerkonten übergeben.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So ändern Sie die Kontogröße

Sie können die Größe eines programmeigenen Kontos mit der Verwendung ändern
von "realloc". `realloc` kann die Größe eines Kontos auf bis zu 10 KB ändern.
Wenn Sie "realloc" verwenden, um die Größe eines Kontos zu erhöhen,
müssen Sie Lamports übertragen, um dieses Konto mietfrei zu behalten.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Wie man einen programmübergreifenden Aufruf durchführt

Ein programmübergreifender Aufruf wird einfach als Aufruf von Programmanweisungen innerhalb unseres Programms bezeichnet

. Ein bestes Beispiel hervorzuheben ist die "swap"-Funktionalität von Uniswap.
Der `UniswapV2Router` Vertrag, ruft die notwendige Logik auf, und ruft die Übertragungsfunktion des "ERC20"-Vertrags auf, die von einer Person zur anderen wechseln.
Genauso können wir die  Anweisung eines Programms aufrufen, um eine Vielzahl von Zwecken zu erfüllen.

Werfen wir einen Blick auf unser erstes Beispiel, nämlich die
Anweisung zur Übertragung des SPL-Token-Programms. Die erforderlichen
Konten, die wir für eine Überweisung benötigen, sind

1. Das Quell-Token-Konto (Das Konto, auf dem wir unsere Token halten)
2. Das Ziel-Token-Konto (das Konto, auf das wir unsere Token übertragen würden)
3. Inhaber des Quell-Token-Kontos (Unsere Wallet-Adresse, für die wir unterschreiben würden)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
Die entsprechende Client-Anweisung wäre wie folgt. Um die Mint- und Token-Erstellungsanweisungen zu kennen, lesen Sie bitte den vollständigen Code in der Nähe.
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Schauen wir uns nun ein weiteres Beispiel an, nämlich die Anweisung create_account des Systemprogramms. Es gibt einen kleinen Unterschied zwischen der oben erwähnten Anweisung und dieser. Dort mussten wir das `token_program` nie als eines der Konten innerhalb der `invoke`-Funktion übergeben. Es gibt jedoch Ausnahmen, bei denen Sie die `program_id` der aufrufenden Anweisung übergeben müssen. In unserem Fall wäre es die program_id des `Systemprogramms`. ("11111111111111111111111111111111"). So jetzt wären die benötigten Accounts

1. Das Zahlerkonto, das die Miete finanziert
2. Das Konto, das erstellt werden soll
3. Systemprogrammkonto

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Der entsprechende clientseitige Code sieht wie folgt aus

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So erstellen Sie einen PDA

Eine vom Programm abgeleitete Adresse ist einfach ein Konto, das dem Programm gehört, aber keinen privaten Schlüssel hat. Stattdessen wird seine Signatur durch eine Reihe von Samen und eine Beule (eine Nonce, die sicherstellt, dass es außerhalb der Kurve liegt) erhalten. Das „**Generieren**“ einer Programmadresse unterscheidet sich von dem „**Erstellen**“. Man kann einen PDA mit `Pubkey::find_program_address` generieren. Das Erstellen eines PDA bedeutet im Wesentlichen, die Adresse mit Leerzeichen zu initialisieren und den Status darauf zu setzen. Ein normales Keypair-Konto kann außerhalb unseres Programms erstellt und dann zur Initialisierung seines Status gefüttert werden. Leider wurde es für PDAs in einer Kette erstellt, da es nicht möglich ist, im eigenen Namen zu unterzeichnen. Daher verwenden wir "invoke_signed", um die Samen des PDA zusammen mit der Signatur des Finanzierungskontos zu übergeben, was zur Kontoerstellung eines PDA führt.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Man kann die erforderlichen Konten wie folgt per Client senden

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Wie man Konten liest

Fast alle Anweisungen in Solana würden mindestens 2 - 3 Konten erfordern, und sie würden über den Anweisungshandlern erwähnt, in welcher Reihenfolge diese Konten erwartet werden. Es ist ziemlich einfach, wenn wir die Methode `iter()` in Rust nutzen, anstatt die Konten manuell zu indizieren. Die Methode "next_account_info" schneidet im Grunde den ersten Index des Iterables und gibt das Konto zurück, das im Konten-Array vorhanden ist. Sehen wir uns eine einfache Anweisung an, die eine Reihe von Konten erwartet und jedes von ihnen analysieren muss.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So verifizieren Sie Konten

Da Programme in Solana zustandslos sind, müssen wir als Programmersteller sicherstellen, dass die übergebenen Konten so weit wie möglich validiert werden, um einen böswilligen Kontoeintrag zu vermeiden. Die grundlegenden Überprüfungen, die man durchführen kann, sind

1. Überprüfen Sie, ob das erwartete Unterzeichnerkonto tatsächlich unterschrieben hat
2. Überprüfen Sie, ob die erwarteten Statuskonten als beschreibbar markiert wurden
3. Überprüfen Sie, ob der Besitzer des erwarteten Statuskontos die aufgerufene Programm-ID ist
4. Wenn Sie den Status zum ersten Mal initialisieren, überprüfen Sie, ob das Konto bereits initialisiert wurde oder nicht.
5. Überprüfen Sie, ob alle übergebenen programmübergreifenden IDs (falls erforderlich) wie erwartet sind.

Eine grundlegende Anweisung, die ein Heldenstatuskonto initialisiert, jedoch mit den oben erwähnten Überprüfungen, wird unten definiert.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So lesen Sie mehrere Anweisungen aus einer Transaktion

Solana ermöglicht es uns, einen Blick auf alle Anweisungen in der aktuellen Transaktion zu werfen. Wir können sie in einer Variablen und speichern
über sie iterieren. Wir können damit viele Dinge tun, z. B. nach verdächtigen Transaktionen suchen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
