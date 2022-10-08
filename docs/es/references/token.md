---
title: Interactuando con tokens
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Interactuando con tokens
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Interactuando con tokens
  - - meta
    - name: description
      content: Learn how to use, transfer, and more with tokens on Solana
  - - meta
    - name: og:description
      content: Learn how to use, transfer, and more with tokens on Solana
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

# Token

## ¿Qué necesito para comenzar a trabajar con SPL-Tokens?

Cada vez que interactúas con tokens en Solana, en realidad estás
interactuando con el token el programa (SPL) Token de Solana, o el estándar 
SPL-Token. El estándar SPL-Token requiere una librería específica para
ser utilizado, la cual puedes encontrar a continuación en función de tu 
lenguaje.

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## ¿Cómo crear un nuevo token?

La creación de tokens se realiza creando lo que se llama una cuenta "mint".
Esta cuenta "mint" se usa luego para acuñar (o crear y enviar) tokens a una 
cuenta de token y también para crear el suministro inicial.

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

## ¿Cómo obtener un token "mint"?

El suministro actual, autoridad o decimales que tiene un token, los puedes 
obtener desde la información de cuenta del token "mint".

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

## ¿Cómo crear una cuenta de token?

Una cuenta de token es necesaria para almacenar los tokens (una cuenta por 
cada token). Cada cuenta de token "mint" tiene una cuenta de cuenta de token 
asociada a ella.

Las cuentas de token asociadas (ATA) se crean de forma determinista
para cada par de llaves (keypair). Los ATA son el método recomendado
de administrar cuentas token.

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

## ¿Cómo obtener un cuenta de token?

Cada cuenta de token tiene información sobre el token, como el propietario,
mint, cantidad (saldo) y decimales.

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

## ¿Cómo obtener el saldo de una cuenta token?

La cuenta de token tiene el saldo del token, el cual se puede obtener con un
sola llamada.

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

::: tip
Una cuenta token solo puede tener un tipo de mint. Cuando especificas una 
cuenta de token, también especificas un mint.
:::

## ¿Cómo crear (mint) nuevos tokens?

Cuando creas tokens, aumenta el suministro y los nuevos tokens se transfieren 
a una cuenta de token específica.

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

## ¿Cómo transferir tokens?

Puedes transferir tokens de una cuenta de token a otra cuenta de token.

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

## ¿Cómo quemar tokens?

Puedes quemar tokens de los tokens que tú seas el dueño.

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

## ¿Cómo cerrar cuentas de token?

Puedes cerrar una cuenta de token si ya no desea usarla.
Hay dos situaciones:

1. Wrapped SOL - Cerrar la cuenta convierte Wrapped SOL to SOL
2. Other Tokens - La puedes cerrar solo si el saldo de la cuenta está en 0.

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

## ¿Cómo establecer la autoridad en cuentas de tokens o mints?

Puede configurar/actualizar la autoridad. Hay 4 tipos:

1. MintTokens (mint account)
2. FreezeAccount (mint account)
3. AccountOwner (token account)
4. CloseAccount (token account)

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

## ¿Cómo aprobar una delegación de token?

Puedes establecer una delegación con una cantidad permitida. Después de su configuración, la delegación es como otro propietario de tu cuenta token. `Una cuenta token solo puede delegar en una cuenta al mismo tiempo`

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

## ¿Cómo revocar una delegación de token?

Revocar establecerá el delegado a nulo y establecerá la cantidad delegada en 0.

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

## ¿Cómo manejar Wrapped SOL?

Wrapped SOL es como cualquier otro token mint. La diferencia es usar `syncNative`
y crear cuentas token específicamente en la dirección `NATIVE_MINT`.

### Crear una cuenta de token

Como [Crear una cuenta de token](#create-token-account) pero reemplazar mint con `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Agregar saldo

Hay dos formas de agregar saldo para Wrapped SOL

#### 1. Por transferencia de SOL

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

#### 2. Por transferencia de token

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

## ¿Cómo obtener todas las cuentas de token por propietario?

Puedes obtener las cuentas de token por propietario. Hay dos maneras de hacerlo.

1. Obtener todas las cuenta de token

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

2. Filtrar por mint

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