---
title: Serialisieren von Daten
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Serialisieren von Daten
  - - meta
    - name: og:title
      content: Solana Kochbuch | Serialisieren von Daten
  - - meta
    - name: description
      content: Erfahren Sie, wie Sie Daten auf Solana serialisieren und deserialisieren
  - - meta
    - name: og:description
      content: Erfahren Sie, wie Sie Daten auf Solana serialisieren und deserialisieren
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

# Serialisieren von Daten

Wenn wir von Serialisierung sprechen, meinen wir sowohl die Serialisierung von Daten als auch die Deserialisierung von Daten.

Die Serialisierung kommt an einigen Stellen im Lebenszyklus des Solana-Programms und der Programmkonten ins Spiel:

1. Serialisieren von Befehlsdaten an den Client
2. Deserialisieren von Befehlsdaten im Programm
3. Serialisieren von Kontodaten im Programm
4. Kontodaten auf dem Client deserialisieren

Es ist wichtig, dass die oben genannten Aktionen alle durch denselben Serialisierungsansatz unterstützt werden. Das
enthaltene Snippets demonstrieren die Serialisierung mit [Borsh](#Ressourcen).

Die Beispiele im Rest dieses Dokuments sind Auszüge aus der [Solana CLI Program Template](#Ressourcen)

## Einrichten der Borsh-Serialisierung

Bibliotheken für Borsh müssen für das Rust-Programm, den Rust-Client, den Node- und/oder den Python-Client eingerichtet werden.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## So serialisieren Sie Anweisungsdaten auf dem Client

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

Wenn Sie ausgehende Befehlsdaten serialisieren, um sie an ein Programm zu senden, muss dies widerspiegeln, wie das Programm die deserialisiert
eingehende Instruktionsdaten.

In dieser Vorlage ist ein Anweisungsdatenblock ein serialisiertes Array, das Folgendes enthält, mit Beispielen:

| Anweisung (Variant index) | Serialisierter Schlüssel          | Serialisierter Wert               |
| --------------------------|---------------------------------- | ----------------------------------|
| Initialisieren (0)        | nicht für den Unterricht geeignet | nicht für den Unterricht geeignet |
| Minze (1)                 | "Foo"                             | "Balken"                          |
| Übertragung (2)           | "Foo"                             | nicht für den Unterricht geeignet |
| Brennen (2)               | "Foo"                             | nicht für den Unterricht geeignet |

Im folgenden Beispiel gehen wir davon aus, dass das programmeigene Konto initialisiert wurde

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## So deserialisieren Sie Befehlsdaten im Programm

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## So serialisieren Sie Kontodaten im Programm

<img src="./serialization/ser3.png" alt="Account Data Serialization">

Der Datenblock des Programmkontos (aus dem Beispielrepo) ist wie folgt aufgebaut

| Byte 0               | Bytes 1-4                         | Restbyte bis 1019                                   |
| ---------------------| ----------------------------------| ----------------------------------------------------|
| Initialisiertes Flag | Länge der serialisierten BTreeMap | BTreeMap (wo Schlüsselwertpaare gespeichert werden) |

### Pack

Ein Wort zur Eigenschaft [Pack][1].

Die Pack-Eigenschaft erleichtert das Ausblenden der Details der Kontodatenserialisierung/-deserialisierung
von Ihrer Kernprogramm-Anweisungsverarbeitung. Anstatt also alles zu serialisieren/deserialisieren
Melden Sie sich im Programmverarbeitungscode an, und kapselt die Details hinter (3) Funktionen:

1. `unpack_unchecked` - Ermöglicht Ihnen, ein Konto zu deserialisieren, ohne zu prüfen, ob es initialisiert wurde. Dies
   ist nützlich, wenn Sie die Initialisierungsfunktion tatsächlich bearbeiten (Variantenindex 0)
2. `unpack` – Ruft Ihre Pack-Implementierung von `unpack_from_slice` auf und prüft, ob das Konto initialisiert wurde.
3. `pack` – Ruft Ihre Pack-Implementierung von `pack_into_slice` auf

Hier ist die Implementierung der Pack-Eigenschaft für unser Beispielprogramm. Darauf folgt das eigentliche
Verarbeitung der Kontodaten mit Borsh.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Serialisierung/Deserialisierung

So schließen Sie die zugrunde liegende Serialisierung und Deserialisierung ab:

1. `sol_template_shared::pack_into_slice` – Wo die eigentliche Serialisierung stattfindet
2. `sol_template_shared::unpack_from_slice` – Wo die eigentliche Deserialisierung stattfindet

**Beachten Sie**, dass wir im Folgenden eine `u32` (4 Bytes) Partition im Datenlayout für
`BTREE_LENGTH` vor `BTREE_STORAGE` haben. Dies liegt daran, dass Borsh während der Deserialisierung
überprüft, ob die Länge des Slice, das Sie deserialisieren, mit der Menge von Daten übereinstimmt
, die es vor der tatsächlichen Rekombination des empfangenden Objekts liest. Die Vorgehensweise
unten demonstriert liest zuerst die `BTREE_LENGTH`, um die Größe zu erhalten, aus der `slice` wird
`BTREE_STORAGE`-Zeiger.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Usage

Das Folgende fasst alles zusammen und zeigt, wie das Programm mit dem `ProgramAccountState` interagiert
die das Initialisierungsflag sowie die zugrunde liegende `BTreeMap` für unsere Schlüssel/Wert-Paare kapselt.

Zuerst, wenn wir ein brandneues Konto initialisieren möchten:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

Jetzt können wir nach unseren anderen Anweisungen arbeiten, wie man ein neues Schlüssel-Wert-Paar prägt,
das wir oben beim Senden von Anweisungen von einem Client demonstriert haben:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## So deserialisieren Sie Kontodaten auf dem Client

Kunden können Solana anrufen, um ein programmeigenes Konto abzurufen, in dem die serialisierten
Datenblock ein Teil der Rückgabe sind. Die Deserialisierung erfordert die Kenntnis des Datenblocks
Layout.

Das Layout der Kontodaten wurde [hier](#account-data-serialization) beschrieben

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Common Solana TS/JS Mappings

Die [Borsh Specification](#Ressourcen) enthält die meisten Zuordnungen für primitive und
zusammengesetzte Datentypen.

Der Schlüssel zu TS/JS und Python ist das Erstellen eines Borsh-Schemas mit einer richtigen Definition, also der Serialisierung
und deserialisieren können die entsprechenden Eingaben generieren oder ausführen.

Hier demonstrieren wir die Serialisierung von Primitiven (Zahlen, Zeichenfolgen) und zusammengesetzten Typen (Array mit fester Größe, Map).
zuerst in Typescript, dann in Python und dann äquivalente Deserialisierung auf der Rust-Seite:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Fortgeschrittene Konstrukte

In den vorherigen Beispielen haben wir gezeigt, wie Sie einfache Payloads erstellen. Manchmal
wirft Solana mit bestimmten Typen einen Fastball. Dieser Abschnitt wird demonstrieren
richtige Zuordnungen zwischen TS/JS und Rust zu handhaben.

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Ressourcen

- [Borsh Specification](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Solana CLI Program Template2](https://github.com/hashblock/solana-cli-program-template)
