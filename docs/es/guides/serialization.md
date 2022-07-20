---
title: Serializando datos
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Serializando datos
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Serializando datos
  - - meta
    - name: description
      content: Aprende como serializar y deserealizar datos en Solana
  - - meta
    - name: og:description
      content: Aprende como serializar y deserealizar datos en Solana
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

# Serializando datos

Cuando hablamos de serialización, nos referimos tanto a la serialización de datos como a la deserialización de datos.

La serialización entra en juego en algunos puntos a lo largo del ciclo de vida de las cuentas del programa y los 
programa en Solana:

1. Serialización de datos de instrucciones en el cliente
2. Deserializar datos de instrucción en el programa
3. Serialización de datos de la cuenta en el programa
4. Deserialización de datos de cuenta en el cliente

Es importante que todas las acciones anteriores estén respaldadas por el mismo enfoque de serialización. Los fragmentos 
(snippets) incluidos demuestran la serialización mediante [Borsh](#resources).

Los ejemplos en el resto de este documento son extractos tomados de la 
[Plantilla del programa CLI de Solana](#resources)

## Configuración para la serialización con Borsh

Las bibliotecas para Borsh deben configurarse para el programa Rust, el cliente Rust, el cliente Node y/o Python.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## Cómo serializar datos de instrucciones en el cliente

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

Si está serializando datos de instrucciones de salida para enviar a un programa, debe reflejar cómo el programa 
deserializa el datos de instrucciones entrantes.

En esta plantilla, un bloque de datos de instrucción es una matriz serializada que contiene, con ejemplos:

| Instrucción (Índice variable) | Llave serializada              | Valor serializado              |
| ----------------------------- | ------------------------------ | ------------------------------ |
| Initialize (0)                | no aplica para la instrucción  | no aplica para la instrucción  |
| Mint (1)                      | "foo"                          | "bar"                          |
| Transfer (2)                  | "foo"                          | no aplica para la instrucción  |
| Burn (2)                      | "foo"                          | no aplica para la instrucción  |

En el siguiente ejemplo, asumimos que la cuenta propiedad del programa se ha inicializado

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## How to deserialize instruction data on the program

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Cómo serializar los datos de la cuenta en el programa

<img src="./serialization/ser3.png" alt="Account Data Serialization">

El bloque de datos de la cuenta del programa (como se ve en el repositorio) está estructurado de la siguiente manera:

| Byte 0                  | Bytes 1-4                         | Bytes hasta 1019                                       |
| ----------------------- | --------------------------------- | ------------------------------------------------------ |
| bandera de inicializado | longitud del BTreeMap serializado | BTreeMap (donde los pares clave/valor son almacenados) |

### Pack

Unas palabras sobre el trait [Pack][1]

El trait Pack hace que sea más fácil ocultar los detalles de la serialización/deserialización de los datos de la cuenta
en el procesamiento de instrucciones de su programa principal. En lugar de poner la serialización/deserialización 
en el código del programa, encapsula los detalles por detrás de (3) funciones:

1. `unpack_unchecked` - Le permite deserializar una cuenta sin validar si se ha inicializado. Es útil cuando realmente 
está procesando la función de inicialización (índice 0)
2. `unpack` - LLama a tu implementación de `unpack_from_slice` y valida si la cuenta se ha inicializado.
3. `pack` - LLama a tu implementación de `pack_into_slice`

Here is the implementation of the Pack trait for our sample program. This is followed with the actual
processing of the account data using borsh. 

Aquí está la implementación del trait Pack para nuestro programa de ejemplo. Seguido del procesamiento actual de la 
cuenta usando borsh.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Serialización/Deserealización

Para completar la serialización y deserialización internamente:

1. `sol_template_shared::pack_into_slice` - Donde la serialización ocurre realmente
2. `sol_template_shared::unpack_from_slice` - Donde la deserialización ocurre realmente

**Ten en cuenta** que tenemos una partición `u32` (4 bytes) en el diseño de datos para
`BTREE_LENGTH` que precede a `BTREE_STORAGE`. Esto se debe a que borsh, durante la deserialización,
comprueba que la longitud del segmento que está deserializando coincide con la cantidad de
datos que lee antes de la recombinación real del objeto receptor. El enfoque que se muestra a continuación primero 
lee `BTREE_LENGTH` para obtener el tamaño para hacer `slice` del puntero `BTREE_STROAGE`.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Usage

Lo siguiente es el consolidado y demuestra cómo el programa interactúa con `ProgramAccountState`
que encapsula el indicador de inicialización, así como el `BTreeMap` interno para nuestros pares clave/valor.

Primero cuando queremos inicializar una cuenta nueva:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

Ahora podemos operar en nuestras otras instrucciones como se puede apreciar al hacer mint de un nuevo
par clave/valor que anteriormente demostramos cuando enviamos instrucciones desde un cliente:

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## Cómo deserializar los datos de la cuenta en el cliente

Los clientes pueden llamar a Solana para obtener la cuenta propiedad del programa, en la que la respuesta es un bloque 
de datos serializado. La deserialización requiere conocer la estructura del bloque de datos.

La estructura del bloque de datos se muestra [aquí](#account-data-serialization)

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Mappins comunes de Solana TS/JS

La [especificación de Borsh](#resources) contiene la mayoría de los mapeos para primitivos y
tipos de datos compuestos.

La clave para TS/JS y Python es crear un esquema de Borsh con una definición adecuada para que la serialización
y deserialización puede generar o recorrer las respectivas entradas.

Aquí demostramos la serialización de primitivos (números, cadenas) y tipos compuestos (matriz de tamaño fijo, Map)
primero en Typescript, luego en Python y luego la deserialización equivalente en el lado de Rust:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Construcciones avanzadas

Hemos mostrado cómo crear cargas útiles simples en ejemplos anteriores. Algunas veces
Solana lanza una bola rápida con ciertos tipos. Esta sección demostrará el mapeo adecuado entre TS/JS y Rust 
para manejar esos casos:

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Recursos

- [Especificación de Borsh](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Python Borsh Documentation](https://near.github.io/borsh-construct-py/)
- [Programa CLI de Solana Template2](https://github.com/hashblock/solana-cli-program-template)
