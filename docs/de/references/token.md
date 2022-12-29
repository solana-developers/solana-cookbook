---
title: Interaktion mit Tokens
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Interaktion mit Tokens
  - - meta
    - name: og:title
      content: Solana Kochbuch | Interaktion mit Tokens
  - - meta
    - name: description
      content: Erfahren Sie, wie Sie Token auf Solana verwenden, übertragen und mehr
  - - meta
    - name: og:description
      content: Erfahren Sie, wie Sie Token auf Solana verwenden, übertragen und mehr
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

# Zeichen

## Was benötige ich, um mit SPL-Tokens zu beginnen?

Jedes Mal, wenn Sie mit Token auf Solana interagieren, tun Sie es tatsächlich
Interaktion mit dem Solana Program Library Token oder SPL-Token
Standard. Der SPL-Token-Standard erfordert dazu eine bestimmte Bibliothek zu
verwenden, die Sie unten basierend auf Ihrer Sprache finden.

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## So erstellen Sie ein neues Token

Das Erstellen von Token erfolgt durch Erstellen eines sogenannten „Mint-Kontos“.
Dieses Mint-Konto wird später verwendet, um Token auf das Token-Konto eines Benutzers zu prägen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So erhalten Sie eine Token-Minze

Um die aktuelle Versorgung, Autorität oder Dezimalstellen eines Tokens zu erhalten,
Sie müssen die Kontoinformationen für die Token Mint abrufen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So erstellen Sie ein Token-Konto

Ein Token-Konto ist erforderlich, damit ein Benutzer Token halten kann.

Ein Benutzer hat mindestens ein Token-Konto für jeden Token-Typ, den er besitzt.

Zugehörige Token-Konten werden deterministisch für jedes Schlüsselpaar erstellt.
ATAs sind die empfohlene Methode der Verwaltung von Token-Konten.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So erhalten Sie ein Token-Konto

Jedes Token-Konto hat Informationen über das Token wie den Besitzer,
Minze, Betrag (Saldo) und Dezimalstellen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So erhalten Sie das Guthaben eines Token-Kontos

Das Token-Konto verfügt über das Token-Guthaben, das mit einem einmaligen "call" abgerufen werden kann
.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: Tipp
Ein Token-Konto kann nur eine Sorte ünze enthalten.
:::

## Wie man Token prägt

Wenn Sie Token prägen, erhöhen Sie den Vorrat und übertragen die neuen Token
auf ein bestimmtes Token-Konto.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So übertragen Sie Token

Sie können Token von einem Token-Konto auf ein anderes Token-Konto übertragen.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Wie man Token verbrennt

Sie können Token verbrennen (löschen), wenn Sie der Token-Besitzer sind.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So schließen Sie Token-Konten

Sie können ein Token-Konto schließen, wenn Sie es nicht mehr verwenden möchten.
Es gibt zwei Situationen:

1. Eingewickelter SOL - Beim Schließen wird ein umwickelter SOL in SOL umgewandelt
2. Andere Token – Sie können es nur schließen, wenn der Kontostand des Token-Kontos 0 beträgt.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So legen Sie die Autorität für Token-Konten oder Mints fest

Sie können die Autorität festlegen/aktualisieren. Es gibt 4 Arten:

1. MintTokens (Mint-Konto)
2. FreezeAccount (Mint-Konto)
3. AccountOwner (Token-Konto)
4. CloseAccount (Token-Konto)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So genehmigen Sie einen Token-Delegierten

Sie können einen Delegierten mit einem zulässigen Betrag festlegen. Nach Ihrer Einstellung ist der Delegierte wie ein anderer Besitzer Ihres Token-Kontos. `Ein Token-Konto kann nur an ein Konto gleichzeitig delegieren`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So widerrufen Sie einen Token-Delegierten

Widerrufen setzt den Delegierten auf null und den delegierten Betrag auf 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So verwalten Sie verpackte SOL

Verpacktes SOL genau wie jeder andere Token Mint. Der Unterschied besteht in der Verwendung von `syncNative`
und Erstellen von Token-Konten speziell für die Adresse „NATIVE_MINT“.

### Token-Konto erstellen

Wie [Create Token Account](#create-token-account), aber ersetzen Sie mint durch `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Guthaben hinzufügen

Es gibt zwei Möglichkeiten, das Gleichgewicht für Wrapped SOL hinzuzufügen

#### 1. Per SOL-Überweisung

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. Per Token-Transfer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## So erhalten Sie alle Token-Konten nach Eigentümer

Sie können Token-Konten nach Besitzer abrufen. Es gibt zwei Möglichkeiten, dies zu tun.

1. Erhalten Sie alle Token-Konten

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. Nach Mint filtern

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
