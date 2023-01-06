---
title: Accounts
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Accounts
  - - meta
    - name: og:title
      content: Solana Kochbuch | Accounts
  - - meta
    - name: description
      content: Accounts sind ein wesentlicher Baustein für die Entwicklung auf Solana. Erfahren Sie mehr über Accounts und weitere Kernkonzepte im Solana-Kochbuch.
  - - meta
    - name: og:description
      content: Accounts sind ein wesentlicher Baustein für die Entwicklung auf Solana. Erfahren Sie mehr über Accounts und weitere Kernkonzepte im Solana-Kochbuch.
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

Accounts innerhalb von Solana werden zum Speichern des Zustands verwendet. Sie sind ein wesentlicher
Baustein für die Entwicklung auf Solana.

## Fakten

::: tip Fact Sheet

- Accounts werden genutzt um Daten zu speichern
- Jedes Konto hat eine eindeutige (einmalig vorhandene) Adresse
- Accounts haben eine maximale Größe von 10MB (10 Mega Bytes)
- PDA Accounts haben eine maximale Größe von 10KB (10 Kilo Bytes)
- PDA Accounts können verwendet werden, um im Namen eines Programms zu signieren
- Accountgrößen sind bei erstellung festgelegt, können aber mit [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size) angepasst werden
- Für Accountsdatenspeicher wird "Miete" gezahlt (in SOL)
- Der Standard-Accounts-Besitzer ist das Systemprogramm
  :::

## Deep Dive

### Accounts Model

Auf Solana gibt es 3 Arten von Accounts:

- Daten Accounts speichern Daten
- Program Accounts speichern ausführbare Programme
- Native Accounts die native Programme auf Solana angeben (wie z.B. System, Stake, und Vote )  

Es gibt 2 Arten von Daten Accounts:

- Systemeigene Accounts
- PDA-Accounts (Program Derived Address).

Jedes Konto hat eine Adresse (normalerweise einen öffentlichen Schlüssel) und einen Besitzer
(Adresse eines Programmkontos). Die vollständige Feldliste speichert ein Konto
ist unten zu finden.

| Feld      | Beschreibung                                    |
| ---------- | ---------------------------------------------- |
| lamports   | Die Anzahl der Lamports im Besitz dieses Kontos   |
| owner      | Der Programmbesitzer dieses Kontos             |
| executable | Ob dieses Konto Anweisungen verarbeiten kann  |
| data       | Das Rohdaten-Byte-Array, das von diesem Konto gespeichert wird |
| rent_epoch | Die nächste Epoche, in der dieses Konto Miete schuldet |

Es gibt ein paar wichtige Eigentumsregeln:

- Nur der Besitzer eines Datenkontos kann seine Daten ändern und Lamports belasten
- Jeder darf Lamports auf ein Datenkonto gutschreiben
- Der Inhaber eines Kontos kann einen neuen Inhaber zuweisen, wenn die Daten des Kontos auf Null gesetzt werden

ProgrammAccounts speichern keinen Status.

Wenn Du beispielsweise ein Zählerprogramm hast, mit dem Du einen Zähler erhöhen kannst, musst Du
zwei Accounts erstellen - ein Konto zum Speichern des Programmcodes und eines zum Speichern
der Zähler.

![](./account_example.jpeg)

Um zu verhindern, dass ein Konto gelöscht wird, müssen Sie Miete zahlen.

### Miete

Daten auf Accounts zu speichern kostet SOL - diese Zahlung wird Miete genannt.
Wenn du eine Mindesteinzahlung von 2 Jahren Miete tätigst, wird dein Account von zukünftiger
Miete befreit. Du kannst vorausgezahlte Miete durch schließen von Accounts zurück in deine Wallet bekommen.

Die Miete wird zu zwei verschiedenen Zeitpunkten gezahlt:

1. Wenn es von einer Transaktion referenziert wird
2. Einmal pro Epoche

Ein Teil der über Accounts eingezogenen Miete wird vernichtet, während der Rest verteilt wird
Accounts am Ende jedes Slots zu bestimmen.

Reicht das Konto nicht aus, um die Miete zu zahlen, wird das Konto aufgelöst und die Daten
ENTFERNT.

Wichtig ist auch zu beachten, dass NeuAccounts mietfrei sein müssen.

## Andere Ressourcen

- [Solana Accounts Model](https://solana.wiki/zh-cn/docs/de/account-model/#account-storage)
- [Official Documentation](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Credit

Dieses Kernkonzept wird Pencilflip zugeschrieben. [Folgt ihm auf Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
