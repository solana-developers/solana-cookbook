---
title: Migrando cuentas de datos de programas
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Migrando cuentas de datos de programas
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Migrando cuentas de datos de programas
  - - meta
    - name: og:description
      content: Fundamentalmente, para versionar datos para dar soporte a una migración significa crear una referencia única para una colección de datos. Esta referencia puede tomar la forma de una consulta, un ID o también comúnmente un identificador de fecha y hora. Aprende sobre Serialización y más ingredientes para tu plato en el Libro de recetas de Solana.
  - - meta
    - name: og:description
      content: Fundamentalmente, para versionar datos para dar soporte a una migración significa crear una referencia única para una colección de datos. Esta referencia puede tomar la forma de una consulta, un ID o también comúnmente un identificador de fecha y hora. Aprende sobre Serialización y más ingredientes para tu plato en el Libro de recetas de Solana.
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

# Migración de cuentas de datos de programas

## ¿Cómo se pueden migrar las cuentas de datos de un programa?

Cuando crea un programa, cada cuenta de datos asociada con ese
programa tendrá una estructura de datos específica. Si alguna vez necesitas
actualizar una cuenta derivada del programa, puedes terminar teniendo un montón
de inconsistencias de cuentas derivadas del programa con la estructura anterior.

Con el control de versiones de la cuenta, puede actualizar sus cuentas antiguas a
la nueva estructura.

:::tip Nota
Esta es solo una de las muchas formas de migrar datos en Cuentas de propiedad del programa (POA).
:::

## Escenario

Para versionar y migrar los datos de nuestra cuenta, proporcionaremos un **id** para cada
cuenta. Este identificador nos permitirá identificar la versión de la cuenta cuando
se lo pasamos al programa, y ​​así manejar correctamente la cuenta.

Tomemos como ejemplo el siguiente estado de cuenta y programa:

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

En nuestra primera versión de una cuenta, estamos haciendo lo siguiente:

| ID | Action |
| - | - |
|1| Incluir un campo de 'versión de datos' en los datos. Puede ser un ordinal incremental simple (por ejemplo, u8) o algo más sofisticado
|2| Asignar suficiente espacio para el crecimiento de datos
|3| Inicializar una cantidad de constantes para usar en todas las versiones del programa
|4| Agregar una función `fn conversion_logic` para las futuras actualizaciones de cuenta

Digamos que queremos actualizar las cuentas de nuestro programa para incluir
un nuevo campo obligatorio, el campo `somestring`.

Si no asignáramos espacio adicional en la cuenta anterior, podríamos
no actualizar la cuenta y quedaría atascada.

## Actualizando la cuenta

En nuestro nuevo programa queremos agregar una nueva propiedad para el contenido del estado.
Los cambios a continuación muestran cómo aprovechamos la estructura inicial del programa para agregar el nuevo campo.

### 1. Agregar la lógica de conversión de cuenta

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Line(s) | Note |
| ------- | - |
| 6 | Hemos agregado `solana_program::borsh::try_from_slice_unchecked` de Solana para simplificar la lectura de subconjuntos del bloque de datos más grande
| 13-26| Aquí hemos conservado la estructura de contenido anterior, `AccountContentOld` línea 24, antes de extender `AccountContentCurrent` a partir de la línea 17.
| 60 | Actualizamos la constante `DATA_VERSION`
| 71 | Ahora tenemos una versión 'anterior' y queremos saber su tamaño
| 86 | El Coup de grâce está agregando la plomería para actualizar el contenido del estado anterior al estado nuevo (actual)

Luego actualizamos nuestras instrucciones, para agregar `somestring` y el procesador para manejar la nueva instrucción. Tenga en cuenta que la "actualización" de la estructura de datos está encapsulada detrás de `pack/unpack`.

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

Después de crear y enviar una instrucción: `VersionProgramInstruction::SetString(String)` ahora tenemos el siguiente diseño de datos de cuenta 'actualizado'

<img src="./data-migration/pav2.png" alt="Program Account v2">

## Resources

* [Especificación de Borsh](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Referencia de la implementación](https://github.com/FrankC01/versioning-solana)