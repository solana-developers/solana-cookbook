---
title: Kontozuordnungen
---

# Kontozuordnungen

Zuordnungen (Maps) sind Datenstrukturen, die wir häufig beim Programmieren verwenden, um einen **Schlüssel** mit einem **Wert** irgendeiner Art zu verknüpfen. Der Schlüssel und der Wert können von jedem beliebigen Typ sein, und der Schlüssel dient als Kennung für einen bestimmten Wert, der gespeichert wird.
Es ermöglicht uns dann, angesichts seines Schlüssels, diese Werte effizient einzufügen, abzurufen und zu aktualisieren.

Wie wir wissen, erfordert das Kontomodell von Solana, dass Programmdaten und ihre relevanten Zustandsdaten in verschiedenen Konten gespeichert werden. Diesen Konten ist eine Adresse zugeordnet. Dies dient an sich als Karte! Erfahren Sie [hier][AccountCookbook] mehr über den Kontomodus von Solana.

Es wäre also sinnvoll, Ihre **Werte** in separaten Konten zu speichern, wobei deren Adresse der **Schlüssel** ist, der zum Abrufen des Werts erforderlich ist. Aber das bringt ein paar Probleme mit sich, wie z.B.

* Die oben genannten Adressen sind höchstwahrscheinlich keine idealen **Schlüssel**, an die Sie sich erinnern und den erforderlichen Wert abrufen könnten.

* Die oben erwähnten Adressen beziehen sich auf öffentliche Schlüssel verschiedener **Schlüsselpaare**, wobei jedem öffentlichen Schlüssel (oder *Adresse*) auch ein **privater Schlüssel** zugeordnet wäre. Dieser private Schlüssel müsste bei Bedarf verschiedene Anweisungen unterzeichnen, sodass wir den privaten Schlüssel irgendwo speichern müssen, was definitiv **nicht** empfohlen wird!

Dies stellt ein Problem dar, mit dem viele Solana-Entwickler konfrontiert sind, nämlich das Implementieren einer "Map"-ähnlichen Logik in ihre Programme. Schauen wir uns ein paar Möglichkeiten an, wie wir dieses Problem angehen würden.

## Ableitende PDAs

PDA steht für [Program Derived Address][PDA], und sind kurz gesagt Adressen **abgeleitet** von einer Reihe von Seeds und einer Programm-ID (oder _address_).

The unique thing about PDAs is that, these addresses are **not** associated with any private key. This is because these addresses do not lie on the ED25519 curve. Hence, **only** the program, from which this _address_ was derived, can sign an instruction with the key, provided the seeds as well. Learn more about this [here][CPI].

Nachdem wir nun eine Vorstellung davon haben, was PDAs sind, verwenden wir sie, um einige Konten zuzuordnen! Wir nehmen ein Beispiel eines **Blog**-Programms, um zu demonstrieren, wie dies implementiert werden würde.

In diesem Blog-Programm möchten wir, dass jeder „Benutzer“ einen einzigen „Blog“ hat. Dieser Blog kann beliebig viele `Beiträge` haben. Das würde bedeuten, dass wir jeden Benutzer einem Blog **zuordnen** und jeder Beitrag einem bestimmten Blog **zugeordnet** wird.

Kurz gesagt, es gibt eine 1:1-Zuordnung zwischen einem Benutzer und seinem/ihrem Blog, während eine 1:N-Zuordnung zwischen einem Blog und seinen Beiträgen besteht.

Für die 1:1-Zuordnung möchten wir, dass die Adresse eines Blogs **nur** von seinem Benutzer abgeleitet wird, was es uns ermöglichen würde, ein Blog abzurufen, wenn seine Autorität (oder _user_) gegeben ist. 
Daher würden die Schlüssel für einrn Blog aus dem Schlüssel seiner **Autorität** und möglicherweise einem Präfix von **"Blog"** bestehen, das als Typidentifizierer fungiert.

For the `1:N` mapping, we would want each post's address to be derived **not only** from the blog which it is associated with, but also another **identifier**, allowing us to differentiate between the `N` number of posts in the blog. In the example below, each post's address is derived from the **blog's key**, a **slug** to identify each post, and a prefix of **"post"**, to act as a type identifier.

Der Code ist wie unten gezeigt,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Auf der Client-Seite können Sie „PublicKey.findProgramAddress()“ verwenden, um die erforderliche „Blog“- und „Post“-Kontoadresse zu erhalten, die Sie an „connection.getAccountInfo()“ übergeben können, um die Kontodaten abzurufen. Ein Beispiel ist unten gezeigt,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

##  Einzelnes Kartenkonto

Eine andere Möglichkeit, das Mapping zu implementieren, wäre, eine `BTreeMap`-Datenstruktur explizit in einem einzigen Konto zu speichern. Die Adresse dieses Kontos selbst könnte ein PDA oder der öffentliche Schlüssel eines generierten Schlüsselpaars sein.

Diese Methode zum Zuordnen von Konten ist aus folgenden Gründen nicht ideal:

* Sie müssen zuerst das Konto initialisieren, in dem die `BTreeMap` gespeichert ist, bevor Sie die erforderlichen Schlüssel-Wert-Paare darin einfügen können. Dann müssen Sie auch die Adresse dieses Kontos irgendwo speichern, um sie jedes Mal zu aktualisieren.

*  Es gibt Speicherbeschränkungen für ein Konto, wobei ein Konto eine maximale Größe von **10 Megabyte** haben kann, wodurch die `BTreeMap` daran gehindert wird, eine große Anzahl von Schlüssel-Wert-Paaren zu speichern.

Daher können Sie nach Berücksichtigung Ihres Anwendungsfalls diese Methode wie unten gezeigt implementieren:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Der clientseitige Code zum Testen des obigen Programms würde wie folgt aussehen:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[Konten-Kochbuch]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address