---
title: Programmkonten Abfragen
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Programmkonten Abfragen
  - - meta
    - name: og:title
      content: Solana Kochbuch | Programmkonten Abfragen
  - - meta
    - name: description
      content: Lernen Sie, wie Sie Daten auf Solana mit getProgramAccounts und accountsDB abfragen
  - - meta
    - name: og:description
      content: Lernen Sie, wie Sie Daten auf Solana mit getProgramAccounts und accountsDB abfragen
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

# Programmkonten Abfragen

Eine RPC-Methode, die alle Konten zurückgibt, die einem Programm gehören. Paginierung wird derzeit nicht unterstützt. Anfragen an „getProgramAccounts“ sollten die Parameter „dataSlice“ und/oder „filters“ enthalten, um die Antwortzeit zu verbessern und nur beabsichtigte Ergebnisse zurückzugeben.

## Fakten

::: tip Parameters

- „programId“: „string“ – Pubkey des abzufragenden Programms, bereitgestellt als base58-codierter String
- (optional) `configOrCommitment`: `object` - Konfigurationsparameter, die die folgenden optionalen Felder enthalten:
    - (optional) `commitment`: `string` - [Staatliche Verpflichtung](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (optional) `encoding`: `string` - Encoding für Kontodaten, entweder: `base58`, `base64` oder `jsonParsed`. Beachten Sie, dass Benutzer von web3js stattdessen [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts) verwenden sollten.
    - (optional) `dataSlice`: `object` - Beschränken Sie die zurückgegebenen Kontodaten basierend auf:
        - `offset`: `number` - Anzahl der Bytes in Kontodaten, um mit der Rückgabe zu beginnen
        - `length`: `number` - Anzahl der zurückzugebenden Kontodaten-Bytes
    - (optional) `filters`: `array` - Filtern Sie die Ergebnisse mit den folgenden Filterobjekten:
        - `memcmp`: `object` - Passen Sie eine Reihe von Bytes an Kontodaten an:
            - `offset`: `number` - Anzahl der Bytes in den Kontodaten, um mit dem Vergleich zu beginnen
            - `bytes`: `string` - Zu vergleichende Daten, als Base58-codierter String, begrenzt auf 129 Bytes
        - `dataSize`: `number` - Vergleicht die Kontodatenlänge mit der bereitgestellten Datengröße
    - (optional) `withContext`: `boolean` - Das Ergebnis in ein [RpcResponse JSON-Objekt] einschließen (https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

::::

##### Antwort

Standardmäßig gibt `getProgramAccounts` ein Array von JSON-Objekten mit der folgenden Struktur zurück:

- `pubkey`: `string` - Der Konto-Pubkey als base58-codierter String
- „account“: „object“ – ein JSON-Objekt mit den folgenden Unterfeldern:
    - `lamports`: `number`, Anzahl der dem Konto zugeordneten Lamports
    - `owner`: `string`, Der base58-kodierte Pubkey des Programms, dem das Konto zugewiesen wurde
    - „Daten“: „Zeichenfolge“ | „Objekt“ – Daten, die dem Konto zugeordnet sind, entweder als codierte Binärdaten oder im JSON-Format, abhängig vom bereitgestellten Codierungsparameter
    - `executable`: `boolean`, Angabe ob das Konto ein Programm enthält
    - `rentEpoch`: `number`, Die Epoche, in der dieses Konto das nächste mal Miete schuldet
:::

## Deep Dive

„getProgramAccounts“ ist eine vielseitige RPC-Methode, die alle Konten zurückgibt, die einem Programm gehören. Wir können "getProgramAccounts" für eine Reihe nützlicher Abfragen verwenden, z. B. um Folgendes zu finden:

- Alle Token-Konten für eine bestimmte Brieftasche
- Alle Token-Konten für eine bestimmte Minze (d. h. alle [SRM](https://www.projectserum.com/)-Inhaber)
- Alle benutzerdefinierten Konten für ein bestimmtes Programm (d. h. alle Benutzer von [Mango](https://mango.markets/))

Trotz seiner Nützlichkeit wird `getProgramAccounts` aufgrund seiner derzeitigen Beschränkungen oft missverstanden. Viele der von „getProgramAccounts“ unterstützten Abfragen erfordern RPC-Knoten, um große Datensätze zu scannen. Diese Scans sind sowohl speicher- als auch ressourcenintensiv. Daher können zu häufige oder zu umfangreiche Aufrufe zu Verbindungszeitüberschreitungen führen. Darüber hinaus unterstützt der Endpunkt „getProgramAccounts“ zum Zeitpunkt der Erstellung dieses Dokuments keine Paginierung. Wenn die Ergebnisse einer Abfrage zu groß sind, wird die Antwort abgeschnitten.

Um diese derzeitigen Beschränkungen zu umgehen, bietet `getProgramAccounts` eine Reihe nützlicher Parameter: nämlich `dataSlice` und die `filters`-Optionen `memcmp` und `dataSize`. Durch die Bereitstellung von Kombinationen dieser Parameter können wir den Umfang unserer Abfragen auf überschaubare und vorhersehbare Größen reduzieren.

Ein gängiges Beispiel für „getProgramAccounts“ ist die Interaktion mit dem [SPL-Token-Programm] (https://spl.solana.com/token). 
Das Anfordern aller Konten des Token-Programms mit einem [einfachen Aufruf](../references/accounts.md#get-program-accounts) würde eine enorme Datenmenge erfordern. Durch die Bereitstellung von Parametern können wir jedoch effizient nur die Daten anfordern, die wir verwenden möchten.

### `filters`

Der häufigste Parameter, der mit „getProgramAccounts“ verwendet wird, ist das „filters“-Array. Dieses Array akzeptiert zwei Arten von Filtern, „dataSize“ und „memcmp“. Bevor Sie einen dieser Filter verwenden, sollten wir uns damit vertraut machen, wie die angeforderten Daten angeordnet und serialisiert sind.

#### `dataSize`

Im Fall des Token-Programms können wir sehen, dass [Token-Konten 165 Byte lang sind](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106). Insbesondere hat ein Token-Konto acht verschiedene Felder, wobei jedes Feld eine vorhersagbare Anzahl von Bytes erfordert. Wir können anhand der folgenden Abbildung visualisieren, wie diese Daten angeordnet sind.

![Account Größe](./get-program-accounts/account-size.png)

Wenn wir alle Token-Konten finden möchten, die unserer Wallet-Adresse gehören, könnten wir „{ dataSize: 165 }“ zu unserem „filters“-Array hinzufügen, um den Umfang unserer Abfrage auf nur Konten einzugrenzen, die genau 165 Byte lang sind. Dies allein würde jedoch nicht ausreichen. Wir müssten auch einen Filter hinzufügen, der nach Konten sucht, die unserer Adresse gehören. Dies können wir mit dem `memcmp`-Filter erreichen.

#### `memcmp`

Der `memcmp`-Filter oder "Speichervergleichsfilter" ermöglicht es uns, Daten in jedem Feld zu vergleichen, das in unserem Konto gespeichert ist.
Insbesondere können wir nur nach Konten abfragen, die mit einem bestimmten Satz von Bytes an einer bestimmten Position übereinstimmen. `memcmp` erfordert zwei Argumente:

- `offset`: Die Position, an der mit dem Datenvergleich begonnen werden soll. Diese Position wird in Bytes gemessen und als ganze Zahl ausgedrückt.
- `bytes`: Die Daten, die mit den Daten des Kontos übereinstimmen sollen. Dies wird als Base-58-codierte Zeichenfolge dargestellt und sollte auf weniger als 129 Bytes begrenzt sein.

Es ist wichtig zu beachten, dass "memcmp" nur Ergebnisse zurückgibt, die eine genaue Übereinstimmung mit "Bytes" sind. Derzeit werden keine Vergleiche für Werte unterstützt, die kleiner oder größer als die von uns bereitgestellten „Bytes“ sind.

In Übereinstimmung mit unserem Beispiel für das Token-Programm können wir unsere Abfrage so ändern, dass nur Token-Konten zurückgegeben werden, die unserer Wallet-Adresse gehören. Wenn wir uns ein Token-Konto ansehen, können wir sehen, dass die ersten beiden Felder, die auf einem Token-Konto gespeichert sind, beide Pubkeys sind und dass jeder Pubkey 32 Bytes lang ist. Da „Eigentümer“ das zweite Feld ist, sollten wir unser „memcmp“ bei einem „Offset“ von 32 Bytes beginnen. Von hier aus suchen wir nach Konten, deren Eigentümerfeld mit unserer Brieftaschenadresse übereinstimmt.

![Account Größe](./get-program-accounts/memcmp.png)

Wir können diese Abfrage über das folgende Beispiel aufrufen:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.sh)

  </CodeGroupItem>
</CodeGroup>

### `dataSlice`

Abgesehen von den beiden Filterparametern ist der dritthäufigste Parameter für „getProgramAccounts“ „dataSlice“. Im Gegensatz zum Parameter "filters" reduziert "dataSlice" nicht die Anzahl der von einer Abfrage zurückgegebenen Konten. Stattdessen begrenzt „dataSlice“ die Datenmenge für jedes Konto.

Ähnlich wie `memcmp` akzeptiert `dataSlice` zwei Argumente:

- `offset`: Die Position (in Bytes), an der mit der Rückgabe von Kontodaten begonnen werden soll
- `length`: Die Anzahl der Bytes, die zurückgegeben werden sollen

`dataSlice`ist besonders nützlich, wenn wir Abfragen für einen großen Datensatz ausführen, uns aber nicht um die Kontodaten selbst kümmern. Ein Beispiel dafür wäre, wenn wir die Anzahl der Token-Konten (d. h. die Anzahl der Token-Inhaber) für eine bestimmte Token-Münze ermitteln wollten.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.sh)

  </CodeGroupItem>
</CodeGroup>

Durch die Kombination aller drei Parameter (`dataSlice`, `dataSize` und `memcmp`) können wir den Umfang unserer Abfrage begrenzen und effizient nur die Daten zurückgeben, an denen wir interessiert sind.

## Other Resources

- [RPC API Dokumentation](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Web3js Dokumentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [JSON-parsed Web3js Dokumentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
