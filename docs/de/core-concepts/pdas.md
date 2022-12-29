---
title: Programmabgeleitete Adressen (PDAs)
head:
  - - meta
    - name: title
      content: Solana KOchbuch | PDAs
  - - meta
    - name: og:title
      content: Solana KOchbuch | PDAs
  - - meta
    - name: description
      content: PDAs beherbergen Accounts, die von einem bestimmten Programm gesteuert werden sollen. Erfahren Sie mehr über PDAs und weitere Kernkonzepte im Solana-Kochbuch.
  - - meta
    - name: og:description
      content: PDAs beherbergen Accounts, die von einem bestimmten Programm gesteuert werden sollen. Erfahren Sie mehr über PDAs und weitere Kernkonzepte im Solana-Kochbuch.
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

# Programm-eigene-Adressen (PDAs)

Program-eigene-Adressen (PDAs) sind das zu Hause von Accounts die dazu designed sind, um von einem bestimmten Programm kontrolliert bzw. gesteuert zu werden.
Mit PDAs können Programme programmgesteuert für bestimmte Adressen signieren, ohne einen privaten Schlüssel zu benötigen. PDAs dienen als Grundlage für [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations),
wodurch Solana-Apps miteinander kombinierbar sind.

## Fakten

::: tip Fact Sheet

- PDAs sind 32-Byte-Strings, die wie öffentliche Schlüssel aussehen, aber keine entsprechenden privaten Schlüssel haben
- `findProgramAddress` wird einen PDA deterministisch aus einer programId und Seeds (Sammlung von Bytes) ableiten
- Ein Bump (ein Byte) wird verwendet, um einen potenziellen PDA von der elliptischen Kurve ed25519 zu schieben
- Programme können für ihre PDAs signieren, indem sie die Seeds und Bump bereitstellen [invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)
- Ein PDA kann nur von dem Programm signiert werden, von dem es abgeleitet wurde
- PDAs ermöglichen es Programmen nicht nur, verschiedene Anweisungen zu signieren, sondern bieten auch eine Hashmap-ähnliche Schnittstelle um [Accounts zu indexieren](../guides/account-maps.md)
:::

## Deep Dive

PDAs sind ein wesentlicher Baustein für die Entwicklung von Programmen auf Solana. Mit PDAs können Programme für Accounts signieren und gleichzeitig sicherstellen, dass kein externer Benutzer auch eine gültige Signatur für dasselbe Konto erstellen kann. Zusätzlich zum Signieren von Accounts können bestimmte Programme auch Accounts ändern, die auf ihren PDAs geführt werden.

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Bildausschnit von <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### Generating PDAs

Um das Konzept hinter PDAs zu verstehen, kann es hilfreich sein zu bedenken, dass PDAs nicht technisch erstellt, sondern eher gefunden werden. PDAs werden aus einer Kombination von Seeds (z. B. der Zeichenfolge „vote_account““) und einer Programm-ID generiert.
Diese Kombination aus Seeds und Programm-ID wird dann durch eine sha256-Hash-Funktion geleitet, um zu sehen, ob sie einen öffentlichen Schlüssel generieren, der auf der elliptischen Kurve ed25519 liegt.

![PDA on the ellipitic curve](./pda-curve.png)

### Interaktion mit PDAs

Wenn ein PDA generiert wird, gibt `findProgramAddress` sowohl die Adresse als auch den Bump zurück, der verwendet wird, um die Adresse aus der elliptischen Kurve zu entfernen.
Mit diesem Bump bewaffnet, kann ein Programm dann für jede Anweisung, die seinen PDA erfordert, [signieren](../references/accounts.md#sign-with-a-pda).
Um zu signieren, sollten Programme die Anweisung, die Liste der Accounts und die Seeds und Bump, die verwendet werden, um den PDA abzuleiten, an „invoke_signed“ übergeben.
Zusätzlich zum Signieren von Anweisungen müssen PDAs auch für ihre eigene Erstellung über "invoke_signed" signieren.

Beim Bauen mit PDAs ist es üblich, [den Bump Seed in den Kontodaten selbst zu speichern](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100).
Auf diese Weise können Entwickler einen PDA einfach validieren, ohne den Bump als Anweisungsargument übergeben zu müssen.having to pass in the bump as an instruction argument.

## Andere Quellen

- [Offizielle Dokumentation](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Programmeigene Accounts verstehen](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
