---
title: Funktionsparitätstest
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Funktionsparitätstest
  - - meta
    - name: og:title
      content: Solana Cookbook | Funktionsparitätstest
  - - meta
    - name: description
      content: Die Funktionen variieren je nach Solana-Cluster. Funktionstests sorgen für vorhersagbare Ergebnisse.
  - - meta
    - name: og:description
      content: Die Funktionen variieren je nach Solana-Cluster. Funktionstests sorgen für vorhersagbare Ergebnisse.
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

# Funktionsparitätstest

Beim Testen Ihres Programms ist die Zusicherung erwartete Ergebnisse zu produzieren als auch in verschiedenen Clustern gleich ausgeführt wird, sowohl für die Qualität als auch für die Sicherheit  von entscheidender Bedeutung.

## Fakten

::: tip Fact Sheet

- Funktionen sind Funktionen, die in Solana-Validatoren eingeführt werden und für deren Verwendung eine Aktivierung erforderlich ist.
- Funktionen können in einem Cluster (z. B. Testnet) aktiviert werden, in einem anderen (z. B. Mainnet-Beta) jedoch nicht.
- Jedoch; Wenn Sie standardmäßig `solana-test-validator` lokal ausführen, werden alle verfügbaren Funktionen in Ihrer
Die Solana-Version wird automatisch aktiviert. Das Ergebnis ist, dass beim Testen vor Ort die Fähigkeiten und Ergebnisse von
Ihre Tests sind möglicherweise nicht die gleichen, wenn Sie sie in einem anderen Cluster bereitstellen und ausführen!
:::

## Szenario

Angenommen, Sie haben eine Transaktion, die drei (3) Anweisungen enthält, und jede Anweisung verbraucht ungefähr
100_000 Recheneinheiten (CU). Wenn Sie eine Solana 1.8.x-Version ausführen, würden Sie Ihren Befehls-CU-Verbrauch ähnlich wie folgt beobachten:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

In Solana 1.9.2 wurde eine Funktion namens „transaktionsweite Rechenobergrenze“ eingeführt, bei der eine Transaktion standardmäßig ein Budget von 200_000 CU hat und die Anweisungen **_draw down_** aus diesem Transaktionsbudget gekapselten sind.
Die selbe Transaktion, wie oben erwähnt laufen zu lassen, würde ein ganz anderes Verhalten haben:

| Instruction | Starting CU | Execution | Remaining CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

Huch! Wenn Sie sich dessen nicht bewusst wären, wären Sie wahrscheinlich frustriert, da sich Ihr Unterrichtsverhalten dadurch nicht geändert hat.
Auf devnet hat es gut funktioniert, aber lokal hat es nicht funktioniert?!?

Es besteht die Möglichkeit, das gesamte Transaktionsbudget zu erhöhen, sagen wir auf 300_000 CU, und Ihre geistige Gesundheit zu retten.
Dies zeigt jedoch, warum das Testen mit **_Feature Parity_** eine proaktive Möglichkeit bietet, Verwirrung zu vermeiden.

## Feature Status

Mit dem Befehl „solana feature status“ lässt sich recht einfach überprüfen, welche Funktionen für einen bestimmten Cluster aktiviert sind.

```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

Alternativ können Sie ein Tool wie [scfsd](#resources) verwenden, um den gesamten Funktionsstatus über Cluster hinweg zu beobachten
was den hier gezeigten Teilbildschirm anzeigen würde und nicht erfordert, dass `solana-test-validator` läuft:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Paritätstest

Wie oben erwähnt, aktiviert der `solana-test-validator` **alle** Features automatisch.
Wie wird die Frage "Wie kann ich lokal in einer Umgebung testen, die Parität mit devnet hat,
Testnet oder sogar Mainnet-Beta?" also beantwortet?

Lösung: PRs wurden zu Solana 1.9.6 hinzugefügt, um die Deaktivierung von Funktionen zu ermöglichen:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Einfache Vorführung

Angenommen, Sie haben ein einfaches Programm, das die empfangenen Daten an seinem Einstiegspunkt protokolliert.
Und du testest eine Transaktion, die zwei (2) Anweisungen für Ihr Programm hinzufügt.

### Alle Funktionen aktiviert

1. Sie starten den Test Validator in einem Terminal:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. In einem anderen Terminal starten Sie den Log-Streamer:

```console
solana logs
```

3. Anschließend führen Sie Ihre Transaktion aus. Sie werden etwas Ähnliches im Protokollterminal sehen (aus Gründen der Übersichtlichkeit bearbeitet):

```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```

Da unser Feature „transaktionsweites Compute Cap“ standardmäßig automatisch aktiviert ist, beachten wir das jeweils
Anweisung, die CU aus dem anfänglichen Transaktionsbudget von 200_000 CU abzieht.

### Selektive Funktionen deaktiviert

1. Für diesen Lauf wollen wir so laufen, dass das CU-Budgetverhalten mit dem übereinstimmt, was in devnet läuft. Verwenden
die in [Funktionsstatus](#feature-status) beschriebenen Tools isolieren wir den öffentlichen Schlüssel „transaktionsweite Compute-Obergrenze“.
und verwenden Sie das `--deactivate-feature` beim Start des Testvalidators

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```

2. Wir sehen jetzt in unseren Protokollen, dass unsere Anweisungen jetzt ein eigenes Budget von 200_000 CU haben (aus Gründen der Klarheit bearbeitet).
derzeit der Zustand in allen Upstream-Clustern:

```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Vollständiger Paritätstest

Sie können mit einem bestimmten Cluster in voller Parität sein, indem Sie jedes Feature identifizieren, das dies nicht ist
noch aktiviert und fügen Sie jeweils ein `--deactivate-feature <FEATURE_PUBKEY>` hinzu, wenn Sie `solana-test-validator` aufrufen:

```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Alternativ stellt [scfsd](#Ressourcen) einen Befehlsschalter zur Verfügung, um das vollständig deaktivierte Feature auszugeben
Set für einen Cluster, der direkt in den Start von "solana-test-validator" eingespeist wird:

```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

Wenn Sie ein anderes Terminal öffnen, während der Validator läuft, und "solana feature status" sehen Sie
deaktivierte Features, die im devnet deaktiviert gefunden wurden

## Vollständiger Paritätstest programmgesteuert

Für diejenigen, die die Ausführung des Testvalidators in ihrem Testcode kontrollieren, Modifizieren
Die aktivierten/deaktivierten Funktionen des Testvalidators sind mit TestValidatorGenesis möglich. Mit
Solana 1.9.6 wurde dem Validator Builder eine Funktion hinzugefügt, um dies zu unterstützen.

Erstellen Sie im Stammverzeichnis Ihres Programmordners einen neuen Ordner mit dem Namen „tests“ und fügen Sie eine Datei „parity_test.rs“ hinzu
Datei. Hier sind die Kesselplatzfunktionen (Kesselplatte, wenn Sie so wollen), die von jedem Test verwendet werden

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Wir können jetzt Testfunktionen in den Hauptteil von `mod test {...}` einfügen, um die Standardeinstellung zu demonstrieren
Validator-Setup (alle Funktionen aktiviert) und dann die „transaktionsweite Compute-Obergrenze“ deaktivieren
wie in den vorherigen Beispielen, die `solana-test-validator` von der Befehlszeile aus ausführen.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

Alternativ kann das [scfs engine gadget](#Ressourcen) einen vollständig deaktivierten Vektor von Funktionen für einen Cluster erzeugen. 
Im Folgenden wird die Verwendung dieser Engine zum Abrufen einer Liste aller deaktivierten Features für devnet veranschaulicht.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Fröhliches testen!


## Ressourcen
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)