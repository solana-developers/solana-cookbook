---
title: Transaktionen
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Transaktionen
  - - meta
    - name: og:title
      content: Solana Cookbook | Transaktionen
  - - meta
    - name: description
      content: Transaktionen sind Bündel mehrerer operativer Einheiten auf Solana. Erfahren Sie mehr über Transaktions- und Kernkonzepte im Solana-Kochbuch.
  - - meta
    - name: og:description
      content: Transaktionen sind Bündel mehrerer operativer Einheiten auf Solana. Erfahren Sie mehr über Transaktions- und Kernkonzepte im Solana-Kochbuch.
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

# Transaktionen

Clients können [Programme](./programs.md) durch Senden einer Transaktion an einen Cluster aufrufen. Eine einzelne Transaktion kann mehrere Answeisungen beinhalten - jedes zielt auf sein eigenes Programm ab.
Wenn eine Transaktion übermittelt wird, verarbeitet der Solana [Runtime](https://docs.solana.com/developing/programming-model/runtime) seine Anweisungen der Reihe nach und atomar. Wenn ein Teil einer Anweisung fehlschlägt, schlägt die gesamte Transaktion fehl.

## Fakten

::: tip Fact Sheet
- Anweisungen sind die grundlegendste operative Einheit auf Solana
- Jede Anweisung enthält:
- Die `program_id` des beabsichtigten Programms
    - Ein Array aller `Accounts`, von denen gelesen oder in die geschrieben werden soll
    - Ein "instruction_data"-Byte-Array, das für das vorgesehene Programm spezifisch ist
- Mehrere Anweisungen können zu einer einzigen Transaktion gebündelt werden
- Jede Transaktion enthält:
    - Ein Array aller `Accounts`, von denen gelesen oder in die geschrieben werden soll
    - Eine oder mehrere `Anweisungen`
    - Ein neuer `Blockhash`
    - Eine oder mehrere „Signaturen“.
- Anweisungen werden der Reihe nach und atomar verarbeitet
- Wenn ein Teil einer Anweisung fehlschlägt, schlägt die gesamte Transaktion fehl.
- Transaktionen sind auf 1232 Bytes begrenzt
:::

## Deep Dive

Die Solana-Laufzeit erfordert sowohl Anweisungen als auch Transaktionen, um eine Liste aller Accounts anzugeben, von denen sie lesen oder in die sie schreiben möchten. Indem diese Accounts im Voraus angefordert werden, ist die Laufzeit in der Lage,
die Ausführung über alle Transaktionen hinweg zu parallelisieren.

Wenn eine Transaktion an einen Cluster übermittelt wird, verarbeitet die Laufzeitumgebung ihre Anweisungen der Reihe nach und atomar. Für jede Anweisung interpretiert das empfangende Programm sein Datenarray und verarbeitet seine angegebenen Accounts. Das Programm kehrt entweder erfolgreich oder mit einem Fehlercode zurück. Wenn ein Fehler zurückgegeben wird, schlägt die gesamte Transaktion sofort fehl.

Jede Transaktion, die darauf abzielt, ein Konto zu belasten oder seine Daten zu ändern, erfordert die Unterschrift seines Kontoinhabers. Jedes Konto, das geändert wird, wird als „beschreibbar“ markiert. Ein Konto kann ohne Zustimmung des Inhabers gutgeschrieben werden, solange der Zahler der Transaktionsgebühr die erforderlichen Mieten und Transaktionsgebühren trägt.

Vor der Übermittlung, müssen alle Transaktionen auf einen [aktuellen blockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) verweisen.
Der Blockhash wird verwendet, um Duplizierungen zu verhindern und veraltete Transaktionen zu beseitigen. Das maximale Alter des Blockhashs einer Transaktion beträgt 150 Blöcke oder etwa 1 Minute 19 Sekunden zum Zeitpunkt des Schreibens dieses Artikels.

### Gebühren

Das Solana-Netzwerk erhebt zwei Arten von Gebühren:

- [Transaktionsgebühren](https://docs.solana.com/transaction_fees) zur Verbreitung der Transaktion (auch bekannt als „Gasgebühren“)
- [Mietgebühren](https://docs.solana.com/developing/programming-model/accounts#rent) zum Speichern von Daten in der Kette

In Solana sind Transaktionsgebühren deterministisch: Es gibt kein Konzept für einen Gebührenmarkt, auf dem Benutzer höhere Gebühren zahlen können, um ihre Chancen zu erhöhen, in den nächsten Block aufgenommen zu werden.
Zum Zeitpunkt der Erstellung dieses Artikels werden die Transaktionsgebühren nur durch die Anzahl der erforderlichen Unterschriften (d. h. „lamports_per_signature“) bestimmt, nicht durch die Menge der verwendeten Ressourcen.
Dies liegt daran, dass derzeit für alle Transaktionen eine feste Obergrenze von 1232 Bytes gilt.

Alle Transaktionen erfordern mindestens ein „beschreibbares“ Konto, um die Transaktion zu signieren. Nach der Übermittlung ist das zuerst serialisierte Konto des beschreibbaren Unterzeichners der Gebührenzahler.
Dieses Konto zahlt für die Kosten der Transaktion, unabhängig davon, ob die Transaktion erfolgreich ist oder fehlschlägt. Wenn der Gebührenzahler nicht über ein ausreichendes Guthaben verfügt, um die Transaktionsgebühr zu bezahlen, wird die Transaktion abgebrochen.

Zum Zeitpunkt der Erstellung dieses Artikels werden 50 % aller Transaktionsgebühren von dem Validator eingezogen, der den Block produziert, während die restlichen 50 % verbrannt werden.
Diese Struktur dient dazu, die Prüfer dazu anzuregen, so viele Transaktionen wie möglich während ihrer Slots im Leader-Zeitplan zu verarbeiten.

## Other Resources

- [Offizielle Dokumentation](https://docs.solana.com/developing/programming-model/Transaktionen)
- [Transaktionsstruktur](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaktionsgebühren von Justin Starry](https://jstarry.notion.site/transactions-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [Eine Einfühhrung in Solana von Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaktionsverarbeitung von Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana-Transaktion im Detail von Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
