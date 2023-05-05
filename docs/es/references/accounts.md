---
title: Cuentas
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Cuentas
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Cuentas
  - - meta
    - name: description
      content: Aprende más sobre cuentas en Solana y cómo usarlas en tus programas.
  - - meta
    - name: og:description
      content: Aprende más sobre cuentas en Solana y cómo usarlas en tus programas.
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

# Cuentas

## Cómo crear una cuenta del sistema

Crea una cuenta del sistema que pertenezca al programa [System Program][1]. El 
runtime de Solana dará acceso al dueño de la cuenta a escribir datos y 
transferir lamports. Cuando se crea una cuenta, debemos definir un espacio de 
almacenamiento en bytes (`space`) y lamports suficientes para cubrir la renta. 
La renta ([Rent][2]) es un costo en Solana para mantener las cuentas activas.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo calcular el costo de una cuenta

Mantener activas las cuentas en Solana incurre en un costo de almacenamiento 
llamado renta ([Rent][2]). Una cuenta puede quedar completamente exenta
del cobro del alquiler mediante el depósito de al menos dos años de alquiler. 
Para el cálculo hay que tener en cuenta la cantidad de datos que pretende 
almacenar en la cuenta.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Cómo crear cuentas con semillas

Puedes usar `createAccountWithSeed` para crear cuentas en vez de crear diferentes cuentas con diferentes pares de llaves.

### Generar

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Crear

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Transferir

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Only an account owned by system program can transfer via system program.
:::

## Cómo crear PDAs

Las cuentas derivadas de programa o [Program derived address(PDA)][3] son como cuentas normales con las siguientes diferencias:

1. Salen de la curva ed25519
2. El programa es el que firma en vez de una llave privada

**Nota**: Las cuentas derivadas de programa solo pueden ser creadas en los 
programas. La dirección puede creada del lado del cliente.

::: tip
Aunque la cuenta derivada del programa (PDA) se deriva de un id de programa, no 
significa que la PDA sea propiedad del mismo programa. Por ejemplo, puedes crear un PDA como una cuenta de token, la cual es propiedad del programa token
:::

### Generar una cuenta derivada de programa (PDA)

`findProgramAddress` agregará un byte adicional al final de su semilla.
Comienza de 255 a 0 y devuelve la primera clave pública fuera de la curva.
Siempre obtendrá el mismo resultado si pasa la misma identificación del programa
y semilla

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Crear una cuenta derivada de programa (PDA)

A continuación verás un programa ejemplo para crear una cuenta derivada de 
programa y un ejemplo de cómo llamar al programa desde el cliente.

#### Programa

A continuación se muestra una única instrucción 
`system_instruction::create_account` que crea una cuenta con un tamaño de datos 
asignado de `space`, `rent_lamports` cantidad de lamports para la cuenta 
derivada de programa. Esto se firma con la cuenta derivada del programa usando 
`invoke_signed` similar a como lo vimos anteriormente.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Cliente

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo firmar con una cuenta derivada de programa (PDA)

Las cuentas derivadas de programa (PDA) solo se pueden firmar dentro del 
programa. A continuación se muestra un programa ejemplo de firma con una PDA y 
una llamada al programa con el cliente.

### Programa

A continuación se muestra una única instrucción que transfiere SOL desde una 
PDA que fue derivada con la semilla `escrow` a una cuenta que se envía. 
`invoke_signed` es usado para firmar con la cuenta derivada de programa (PDA).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Cliente

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo obtener cuentas de programas

Retorna todas las cuentas derivadas de programa que es dueño un programa. Revisa la [sección Guías](../guides/get-program-accounts.md) para más información de `getProgramAccounts` y su configuración.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Cómo cerrar cuentas

Puedes cerrar una cuenta y borrar todos sus datos al eliminar todo el SOL. 
Puedes ver la renta ([rent][2]) para más información

#### Programa


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo obtener el balance de una cuenta

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Si deseas obtener el saldo de un token, deberás conocer la dirección de la cuenta de token. Para obtener más información, consulte [Referencias de tokens](token.md)
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
