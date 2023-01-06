---
title: Transaktionen Wiederholen
head:
  - - meta
    - name: title
      content: Solana Cookbook | Transaktionen Wiederholen
  - - meta
    - name: og:title
      content: Solana Cookbook | Transaktionen Wiederholen
  - - meta
    - name: description
      content: In einigen Fällen kann eine scheinbar gültige Transaktion verworfen werden, bevor sie in einen Block aufgenommen wird. Um dem entgegenzuwirken, können Anwendungsentwickler ihre eigene benutzerdefinierte Rebroadcasting-Logik entwickeln. Erfahren Sie mehr über das Wiederholen von Transaktionen und mehr im Solana-Kochbuch.
  - - meta
    - name: og:description
      content: In einigen Fällen kann eine scheinbar gültige Transaktion verworfen werden, bevor sie in einen Block aufgenommen wird. Um dem entgegenzuwirken, können Anwendungsentwickler ihre eigene benutzerdefinierte Rebroadcasting-Logik entwickeln. Erfahren Sie mehr über das Wiederholen von Transaktionen und mehr im Solana-Kochbuch.
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

# Die Reise einer Transaktion

In einigen Fällen kann eine scheinbar gültige Transaktion verworfen werden, bevor sie in einen Block aufgenommen wird. Dies tritt am häufigsten in Zeiten von Netzwerküberlastung auf, wenn ein RPC-Knoten die Transaktion nicht erneut an den [Leader] (https://docs.solana.com/terminology#leader) sendet.
Für einen Endbenutzer kann es so aussehen, als würde seine Transaktion vollständig verschwinden. Während RPC-Knoten mit einem generischen Rebroadcasting-Algorithmus ausgestattet sind, sind Anwendungsentwickler auch in der Lage, ihre eigene benutzerdefinierte Rebroadcasting-Logik zu entwickeln.

## Fakten

::: tip Fact Sheet
- RPC-Knoten versuchen, Transaktionen unter Verwendung eines generischen Algorithmus erneut auszusenden
- Anwendungsentwickler können ihre eigene benutzerdefinierte Rebroadcasting-Logik implementieren
- Entwickler sollten den Parameter "maxRetries" in der JSON-RPC-Methode "sendTransaction" nutzen
- Entwickler sollten Preflight-Prüfungen aktivieren, um Fehler zu melden, bevor Transaktionen übermittelt werden
- Bevor Sie eine Transaktion neu signieren, ist es **sehr wichtig** sicherzustellen, dass der Blockhash der ursprünglichen Transaktion abgelaufen ist
:::

## Die Reise einer Transaktion

### Wie Anwender Transaktionen übermitteln

In Solana gibt es kein Konzept eines Mempools. Alle Transaktionen, ob programmgesteuert oder von einem Endbenutzer initiiert, werden effizient an Leader weitergeleitet, damit sie in einem Block verarbeitet werden können.
Es gibt zwei Hauptwege, auf denen eine Transaktion an Führungskräfte gesendet werden kann:

1. Per Proxy über einen RPC-Server und die JSON-RPC-Methode [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction).
2. Direkt zu Führungskräften über einen [TPU-Client] (https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)

Die überwiegende Mehrheit der Endbenutzer übermittelt Transaktionen über einen RPC-Server. Wenn ein Client eine Transaktion übermittelt, versucht der empfangende RPC-Knoten wiederum, die Transaktion sowohl an den aktuellen als auch an den nächsten Leader zu senden. Bis die Transaktion von einem Leader verarbeitet wird, gibt es keine Aufzeichnung der Transaktion außerhalb dessen, was dem Client und den weiterleitenden RPC-Knoten bekannt ist. Im Fall eines TPU-Clients wird das Rebroadcasting und die Leader-Weiterleitung vollständig von der Client-Software gehandhabt.

![Transaction Journey](./retrying-transactions/tx-journey.png)

### Wie RPC-Knoten Transaktionen senden

Nachdem ein RPC-Knoten eine Transaktion über „sendTransaction“ empfangen hat, konvertiert er die Transaktion in ein [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol)-Paket, bevor er es an die relevanten Leader weiterleitet. UDP ermöglicht es Validatoren, schnell miteinander zu kommunizieren, bietet jedoch keine Garantien für die Transaktionszustellung.

Da Solanas Leader-Zeitplan vor jeder [Epoche](https://docs.solana.com/terminology#epoch) (~2 Tage) bekannt ist, sendet ein RPC-Knoten seine Transaktion direkt an die aktuellen und nächsten Leader. Dies steht im Gegensatz zu anderen Klatschprotokollen wie Ethereum, die Transaktionen zufällig und breit über das gesamte Netzwerk verbreiten. Standardmäßig versuchen RPC-Knoten alle zwei Sekunden, Transaktionen an Leader weiterzuleiten, bis entweder die Transaktion abgeschlossen ist oder der Blockhash der Transaktion abläuft (150 Blöcke oder ~1 Minute 19 Sekunden zum Zeitpunkt des Schreibens dieses Artikels). Wenn die Größe der ausstehenden Rebroadcast-Warteschlange größer als [10.000 Transaktionen](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20) ist, werden neu übermittelte Transaktionen fallengelassen. Es gibt Befehlszeilen-[Argumente](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172), die die Logik der RPC-Operatoren anpassen können, um das Standardverhalten dieser Wiederholung zu ändern.

Wenn ein RPC-Knoten eine Transaktion sendet, versucht er, die Transaktion an die [Transaction Processing Unit (TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867) eines Leaders weiterzuleiten . Die TPU verarbeitet Transaktionen in fünf verschiedenen Phasen:

- [Fetch Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [SigVerify Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Banking Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Broadcast Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Image Courtesy of Jito Labs</small>

Von diesen fünf Phasen ist die Fetch-Phase für den Empfang von Transaktionen verantwortlich. Innerhalb der Fetch-Phase kategorisieren Validatoren eingehende Transaktionen nach drei Ports:

- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) verarbeitet regelmäßige Transaktionen wie Token-Transfers, NFT-Mints und Programmanweisungen
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) konzentriert sich ausschließlich auf Stimmrechtsgeschäfte
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) leitet unverarbeitete Pakete an den nächsten Leader weiter, wenn der aktuelle Leader nicht in der Lage ist, alle Transaktionen zu verarbeiten

Weitere Informationen zum TPU finden Sie unter [dieser hervorragenden Beschreibung von Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## Wie Transaktionen verworfen werden

Während der Reise einer Transaktion gibt es einige Szenarien, in denen die Transaktion unbeabsichtigt aus dem Netzwerk fallen gelassen werden kann.

### Bevor eine Transaktion verarbeitet wird

Wenn das Netzwerk eine Transaktion verwirft, wird es dies höchstwahrscheinlich tun, bevor die Transaktion von einem Leader verarbeitet wird. UDP [Paketverlust](https://en.wikipedia.org/wiki/Packet_loss) ist der einfachste Grund, warum dies auftreten kann. In Zeiten intensiver Netzwerklast ist es auch möglich, dass Validierer von der schieren Anzahl der für die Verarbeitung erforderlichen Transaktionen überwältigt werden. Während Validatoren in der Lage sind, überschüssige Transaktionen über `tpu_forwards` weiterzuleiten, gibt es eine Grenze für die Datenmenge, die [weitergeleitet](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389) werden kann . Darüber hinaus ist jede Weiterleitung auf einen einzelnen Sprung zwischen Prüfern beschränkt. Das heißt, Transaktionen, die auf dem `tpu_forwards`-Port empfangen werden, werden nicht an andere Validatoren weitergeleitet.

Es gibt auch zwei weniger bekannte Gründe, warum eine Transaktion verworfen werden kann, bevor sie verarbeitet wird. Das erste Szenario umfasst Transaktionen, die über einen RPC-Pool übermittelt werden. Gelegentlich kann ein Teil des RPC-Pools dem Rest des Pools ausreichend voraus sein. Dies kann zu Problemen führen, wenn Knoten innerhalb des Pools zusammenarbeiten müssen. In diesem Beispiel wird der [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) der Transaktion  aus dem erweiterten Teil des Pools (Backend A) abgefragt. Wenn die Transaktion an den verzögerten Teil des Pools (Backend B) gesendet wird, erkennen die Knoten den erweiterten Blockhash nicht und verwerfen die Transaktion. Dies kann bei der Transaktionsübermittlung erkannt werden, wenn Entwickler [Preflight-Prüfungen](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) für `sendTransaction` aktivieren.

![Über RPC Pool gelöscht](./retrying-transactions/dropped-via-rpc-pool.png)

Vorübergehende Netzwerk-Forks können auch zu abgebrochenen Transaktionen führen. Wenn ein Validator seine Blöcke innerhalb der Banking-Phase nur langsam wiedergibt, kann er am Ende einen Minority Fork erstellen. Wenn ein Client eine Transaktion erstellt, ist es möglich, dass die Transaktion auf einen `recentBlockhash` verweist, der nur auf dem Minority Fork existiert. Nachdem die Transaktion übermittelt wurde, kann der Cluster von seinem Minority Fork wegschalten, bevor die Transaktion verarbeitet wird. In diesem Szenario wird die Transaktion verworfen, weil der Blockhash nicht gefunden wird.

![Aufgrund von Minority Fork fallen gelassen (vor der Verarbeitung)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### Nachdem eine Transaktion verarbeitet wurde und bevor sie abgeschlossen wird

Für den Fall, dass eine Transaktion auf einen „recentBlockhash“ von einem Minority Fork verweist, ist es immer noch möglich, dass die Transaktion verarbeitet wird. In diesem Fall würde es jedoch vom Leader auf dem Minority Fork verarbeitet. Wenn dieser Anführer versucht, seine verarbeiteten Transaktionen mit dem Rest des Netzwerks zu teilen, würde er keinen Konsens mit der Mehrheit der Validatoren erzielen, die den Minority Fork nicht anerkennen. Zu diesem Zeitpunkt würde die Transaktion fallen gelassen, bevor sie abgeschlossen werden könnte.

![Gefallen aufgrund von Minority Fork (nach Verarbeitung)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Umgang mit abgebrochenen Transaktionen

Während RPC-Knoten versuchen, Transaktionen erneut zu übertragen, ist der von ihnen verwendete Algorithmus generisch und oft für die Anforderungen bestimmter Anwendungen ungeeignet. Um sich auf Zeiten der Netzwerküberlastung vorzubereiten, sollten Anwendungsentwickler ihre eigene Rebroadcasting-Logik anpassen.

### Ein eingehender Blick in sendTransaction

Wenn es um das Senden von Transaktionen geht, ist die RPC-Methode `sendTransaction` das primäre Tool, das Entwicklern zur Verfügung steht. `sendTransaction` ist nur für die Weiterleitung einer Transaktion von einem Client an einen RPC-Knoten verantwortlich. Wenn der Knoten die Transaktion empfängt, gibt `sendTransaction` die Transaktions-ID zurück, die zum Verfolgen der Transaktion verwendet werden kann. Eine erfolgreiche Antwort zeigt nicht an, ob die Transaktion vom Cluster verarbeitet oder abgeschlossen wird.

:::tip

#### Request Parameters

- `transaction`: `string` - vollständig signierte Transaktion als verschlüsselte Zeichenfolge
- (optional) `Konfigurationsobjekt`: `Objekt`
    - `skipPreflight`: `boolean` - wenn wahr, die Preflight-Transaktionsprüfungen überspringen (Standard: falsch)
    - (optional) `preflightCommitment`: `string` - [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) Level zur Verwendung für Preflight-Simulationen gegen den Bank-Slot (Standard: "abgeschlossen").
    - (optional) `encoding`: `string` - Codierung, die für die Transaktionsdaten verwendet werden. Entweder "base58" (langsam) oder "base64". (Standard: "base58").
    - (optional) `maxRetries`: `usize` - Maximale Anzahl von Malen für den RPC-Knoten, um erneut zu versuchen, die Transaktion an den Leader zu senden. Wenn dieser Parameter nicht angegeben wird, wiederholt der RPC-Knoten die Transaktion, bis sie abgeschlossen ist oder bis der Blockhash abläuft.

#### Antwort

- `transaction id`: `string` – Erste in die Transaktion eingebettete Transaktionssignatur als base-58-codierte Zeichenfolge. Diese Transaktions-ID kann mit [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) verwendet werden, um Statusaktualisierungen abzurufen.
:::

## Anpassen der Reroadcast-Logik

Um ihre eigene Rebroadcasting-Logik zu entwickeln, sollten Entwickler den Parameter `maxRetries` von `sendTransaction` nutzen. Falls angegeben, überschreibt `maxRetries` die standardmäßige Wiederholungslogik eines RPC-Knotens, sodass Entwickler den Wiederholungsprozess [innerhalb vernünftiger Grenzen](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274) manuell steuern können.

Ein gängiges Muster für das manuelle Wiederholen von Transaktionen besteht darin, `lastValidBlockHeight` vorübergehend zu speichern, das von [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash) stammt. Nach dem Zwischenspeichern kann eine Anwendung dann 
[die Blockhöhe des Clusters abfragen](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) und die Transaktion in einem angemessenen Intervall manuell wiederholen. In Zeiten von Netzwerküberlastung ist es vorteilhaft, „maxRetries“ auf 0 zu setzen und manuell über einen benutzerdefinierten Algorithmus erneut zu senden. Während einige Anwendungen möglicherweise einen [exponentiellen Backoff](https://en.wikipedia.org/wiki/Exponential_backoff)-Algorithmus verwenden, entscheiden sich andere wie [Mango](https://www.mango.markets/) dafür,
Transaktionen in einem konstanten Intervall [kontinuierlich erneut einzureichen](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713), bis eine Zeitüberschreitung aufgetreten ist.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/retrying-transactions/retry.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/retrying-transactions/retry.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Bei der Abfrage über `getLatestBlockhash` sollten Anwendungen ihre beabsichtigte [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)-Ebene angeben. Indem sie ihr Commitment auf „bestätigt“ (abgestimmt) oder „abgeschlossen“ (~30 Blöcke nach „bestätigt“) setzen, kann eine Anwendung vermeiden, einen Blockhash von einem Minority Fork abzufragen.

Wenn eine Anwendung Zugriff auf RPC-Knoten hinter einem Load Balancer hat, kann sie ihre Arbeitslast auch auf bestimmte Knoten aufteilen. RPC-Knoten, die datenintensive Anfragen wie [getProgramAccounts](./get-program-accounts.md) bedienen, neigen möglicherweise dazu, ins Hintertreffen zu geraten, und können auch für die Weiterleitung von Transaktionen ungeeignet sein. Für Anwendungen, die zeitkritische Transaktionen verarbeiten, kann es ratsam sein, dedizierte Knoten zu haben, die nur "sendTransaction" verarbeiten.

### Die Kosten für das Überspringen des Preflights

Standardmäßig führt "sendTransaction" drei Preflight-Prüfungen durch, bevor eine Transaktion übermittelt wird. Insbesondere wird `sendTransaction`:

- Überprüfen, ob alle Unterschriften gültig sind
- Überprüfen, ob der referenzierte Blockhash innerhalb der letzten 150 Blöcke liegt
- Die Transaktion mit dem durch "preflightCommitment" angegebenen Bankfach simulieren

Für den Fall, dass eine dieser drei Preflight-Prüfungen fehlschlägt, wird `sendTransaction` einen Fehler auslösen, bevor die Transaktion übermittelt wird. Preflight-Prüfungen können oft den Unterschied zwischen dem Verlust einer Transaktion und der ordnungsgemäßen Behandlung eines Fehlers durch einen Client ausmachen. Um sicherzustellen, dass diese häufigen Fehler berücksichtigt werden, wird empfohlen, dass Entwickler `skipPreflight` auf `false` setzen.

### Wann Transaktionen neu signiert werden müssen

Trotz aller Wiederholungsversuche kann es vorkommen, dass ein Kunde eine Transaktion erneut signieren muss. Bevor Sie eine Transaktion neu signieren, ist es **sehr wichtig** sicherzustellen, dass der Blockhash der ursprünglichen Transaktion abgelaufen ist. Wenn der anfängliche Blockhash noch gültig ist, ist es möglich, dass beide Transaktionen vom Netzwerk akzeptiert werden. Für einen Endbenutzer würde dies so aussehen, als ob er dieselbe Transaktion unbeabsichtigt zweimal gesendet hätte.

In Solana kann eine verworfene Transaktion sicher verworfen werden, sobald der Blockhash, auf den sie verweist, älter ist als die von „getLatestBlockhash“ empfangene „lastValidBlockHeight“. Entwickler sollten diese `lastValidBlockHeight` im Auge behalten, indem sie [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo) abfragen und mit `blockHeight` in der Antwort vergleichen. Sobald ein Blockhash für ungültig erklärt wurde, können Clients mit einem neu abgefragten Blockhash erneut signieren.

## Danksagungen

Vielen Dank an Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__) und [Jito Labs](https://twitter.com/jito_labs) für ihre Bewertung und ihr Feedback.
