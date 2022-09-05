---
title: Servicio de nombres
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Servicio de nombres
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Servicio de nombres
  - - meta
    - name: description
      content: El registro de nombres almacena información sobre el nombre de un dominio. Aprende cómo resolver dominios SOL, cómo hacer una búsqueda inversar, subdominios y más en Servicio de nombres y referencias en el Libro de recetas de Solana.
  - - meta
    - name: og:description
      content: El registro de nombres almacena información sobre el nombre de un dominio. Aprende cómo resolver dominios SOL, cómo hacer una búsqueda inversar, subdominios y más en Servicio de nombres y referencias en el Libro de recetas de Solana.
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

# Servicio de nombres

## Registro de nombres

El registro de nombres almacena información sobre el nombre de dominio. esta compuesto de dos cosas:

- La cabecera
- Los datos

Los datos para un nombre de dominio siempre tienen el prefijo del encabezado, a continuación se muestra la estructura del encabezado en JS:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/schema/schema.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/schema/schema.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Resolviendo dominios SOL

Los dominios .SOL son nombres de dominio únicos y fáciles de usar
que se convierten en claves públicas. Muchas billeteras las usan como
otra opción para enviar tokens o SOL. Puedes convertir
.SOL dominios a su clave pública con lo siguiente:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Búsqueda inversa

Esto se puede usar para resolver el nombre de dominio a partir de una clave pública.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Búsqueda de subdominios

Para resolver un subdominio necesitas:

1. Obtener la llave padre del dominio
2. Obtener la llave del subdominio
3. Obtener la información de la cuenta

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Encuentre todos los nombres de dominio que pertenecen a una clave pública

Puede recuperar todos los nombres de dominio de una billetera haciendo una solicitud `getProgramAccounts` con un filtro `memcmp`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/find-for-owner/find-for-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/find-for-owner/find-for-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Resolver un identificador de Twitter

Los identificadores de Twitter se pueden [registrar en el servicio de nombres de Solana](https://naming.bonfida.org/#/twitter-registration) y usarse como nombres de dominio .SOL

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Búsqueda inversa de un identificador de Twitter

Para encontrar la dirección SOL asociada a un identificador de Twitter, puede realizar una búsqueda inversa

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
