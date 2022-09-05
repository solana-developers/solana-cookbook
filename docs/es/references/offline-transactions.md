---
title: Enviando transacciones offline
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Enviando transacciones offline
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Enviando transacciones offline
  - - meta
    - name: description
      content: Después de firmar una transacción offline, cualquier puede enviarla a la red. Aprenda más sobre enviar transacciones offline y referencias en Libro de recetas de Solana.
  - - meta
    - name: og:description
      content: Después de firmar una transacción offline, cualquier puede enviarla a la red. Aprenda más sobre enviar transacciones offline y referencias en Libro de recetas de Solana.
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

# Transacción offline

## Firmar una transacción

Para crear una transacción offline, debes firmar la transacción y luego
cualquiera puede transmitirla en la red.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/sign-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Firma parcial de una transacción

Cuando una transacción requiere varias firmas, puede firmarla parcialmente.
Los otros firmantes pueden firmarla y difundirlo en la red.

Algunos ejemplos de cuando esto es útil:

- Enviar un token SPL a cambio de un pago
- Firmar una transacción para que luego puedas verificar su autenticidad
- Llame a programas personalizados en una transacción que requieran tu firma

En este ejemplo, Bob le envía a Alice un token SPL a cambio de su pago:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/partial-sign/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/partial-sign/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Nonce de larga duración (Durable Nonce)

`RecentBlockhash` es un valor importante para una transacción. Su transacción será rechazada si utiliza un blockhash reciente caducado (después de 150 bloques). Puede usar `durable nonce` para obtener un blockhash reciente que nunca haya caducado. Para activar este mecanismo, tu transacción debe:

1. usar un `nonce` almacenado en una `nonce account` como un blockhash reciente
2. poner como primera instrucción `nonce advance` 

### Crear una cuenta nonce 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Obtener una cuenta nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Usar una cuenta nonce

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
