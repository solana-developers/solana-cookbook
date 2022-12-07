---
title: Migrieren von Programmdatenkonten
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Migrieren von Programmdatenkonten
  - - meta
    - name: og:title
      content: Solana Cookbook | Migrieren von Programmdatenkonten
  - - meta
    - name: description
      content: Grundsätzlich bedeutet das Versionieren von Daten zur Unterstützung der Migration, eine eindeutige Referenz für eine Sammlung von Daten zu erstellen. Diese Referenz kann die Form einer Abfrage, einer ID oder auch häufig einer Datetime-Kennung annehmen. Erfahren Sie mehr über Serialisierung und weitere Zutaten für Ihr Gericht im Kochbuch The Solana.
  - - meta
    - name: og:description
      content: Grundsätzlich bedeutet das Versionieren von Daten zur Unterstützung der Migration, eine eindeutige Referenz für eine Sammlung von Daten zu erstellen. Diese Referenz kann die Form einer Abfrage, einer ID oder auch häufig einer Datetime-Kennung annehmen. Erfahren Sie mehr über Serialisierung und weitere Zutaten für Ihr Gericht im Kochbuch The Solana.
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

# Migrieren eines Programmdatenkontos

## Wie können Sie die Datenkonten eines Programms migrieren?

Wenn Sie ein Programm erstellen, wird jedes damit vrknüpfte Datenkonto eine spezifische Struktur haben. 
Wenn Sie jemals ein Programm abgeleitetes Konto aktualisieren möchten, haben Sie am Ende eine Menge
von übrig gebliebenen programmabgeleiteten Konten mit der alten Struktur.

Mit der Kontoversionierung können Sie Ihre alten Konten auf upgraden
die neue Struktur.

:::tip Note
Dies ist nur eine von vielen Möglichkeiten, Daten in Program Owned Accounts (POA) zu migrieren.
:::

## Szenario

Um unsere Kontodaten zu versionieren und zu migrieren, stellen wir für jedes Konto (Account) jeweils eine **ID** bereit.
Diese ID ermöglicht es uns, die Kontoversion dann zu identifizieren wenn wir es an das Programm übergeben und behandeln das Konto somit als korrekt.

Nehmen Sie den folgenden Kontostand und das folgende Programm:

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

In unserer ersten Version eines Kontos gehen wir wie folgt vor:

| ID | Aktion |
| - | - |
|1| Fügen Sie ein Feld „Datenversion“ in Ihre Daten ein. Es kann eine einfache inkrementierende Ordnungszahl (z. B. u8) oder etwas Ausgefeilteres sein
|2| Ausreichend Speicherplatz für das Datenwachstum zuweisen
|3| Initialisieren einer Reihe von Konstanten, die über Programmversionen hinweg verwendet werden sollen
|4| Fügen Sie eine Kontoaktualisierungsfunktion unter „fn conversion_logic“ für zukünftige Upgrades hinzu

Angenommen, wir möchten die Konten unseres Programms jetzt um das erforderliche Feld, das `somestring`-Feld, aktualisieren.

Wenn wir dem vorherigen Konto keinen zusätzlichen Speicherplatz zugewiesen haben, könnten wir das tun
aktualisieren Sie das Konto nicht und stecken Sie fest.

## Upgrade des Kontos

In unserem neuen Programm wollen wir eine neue Eigenschaft für den Inhaltszustand hinzufügen.
Die folgenden Änderungen zeigen, wie wir die ursprünglichen Programm Konstrukte genutzt haben, und wie sie jetzt zum Einsatz kommen.

### 1. Kontoumwandlungslogik hinzufügen

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Linie(n) | Notiz |
| ------- | - |
| 6 | Wir haben Solanas `solana_program::borsh::try_from_slice_unchecked` hinzugefügt, um das Lesen von Teilmengen von Daten aus dem größeren Datenblock zu vereinfachen
| 13-26| Hier haben wir die alte Inhaltsstruktur, „AccountContentOld“, Zeile 24, beibehalten, bevor wir „AccountContentCurrent“ ab Zeile 17 erweitern.
| 60 | Wir stoßen die `DATA_VERSION`-Konstante an
| 71 | Wir haben jetzt eine "vorherige" Version und möchten ihre Größe wissen
| 86 | Der Coup de grâce fügt die Installation hinzu, um den vorherigen Inhaltsstatus auf den neuen (aktuellen) Inhaltsstatus zu aktualisieren

Wir aktualisieren dann unsere Anweisungen, um eine neue zum Aktualisieren von "somestring" hinzuzufügen, und einen Prozessor zum Handhaben der neuen Anweisung. Beachten Sie, dass das „Upgrade“ der Datenstruktur hinter „pack/unpack“ eingekapselt ist

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

Nach dem Erstellen und Senden einer Anweisung: `VersionProgramInstruction::SetString(String)` haben wir nun das folgende 'aktualisierte' Kontodatenlayout

<img src="./data-migration/pav2.png" alt="Program Account v2">

## Resources

* [Borsh Spezifikation](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Referenz Implementierung](https://github.com/FrankC01/versioning-solana)