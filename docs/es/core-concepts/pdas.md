---
title: Direcciones derivadas de programa (PDAs)
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | PDAs
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | PDAs
  - - meta
    - name: description
      content: PDAs son cuentas diseñadas específicamente para ser controladas por programas. Aprende más sobre PDAs y otros conceptos del core de Solana en el libro de recetas de Solana.
  - - meta
    - name: og:description
      content: PDAs son cuentas diseñadas específicamente para ser controladas por programas. Aprende más sobre PDAs y otros conceptos del core de Solana en el libro de recetas de Solana.
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

# Direcciones derivadas de programa (PDAs)

Direcciones derivadas de programa (PDAs) son cuentas diseñadas específicamente para ser controladas por programas. Con PDAs, los programas puede firmar para ciertas direcciones sin la necesidad de una llave privada. PDAs sirven como la base para la [Invocación entre programas](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations), que permite la composición entre apps de Solana.

## Hechos

::: tip Hola de hechos
- PDAs son cadenas de 32 bytes que lucen como llaves públicas pero no tienen una llave privada relacionada
- `findProgramAddress` deriva de forma determinista un PDA de un programId y unas semillas (colección de bytes)
- Un bump (un byte) es usado para empujar a un potencial PDA fuera de la curva elíptica ed25519
- Los programas pueden firmar por sus PDAs usando sus seeds y bump [invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)
- Un PDA solo puede ser firmado por el programa del cual ha sido derivada
- Además de permitir a los programas firmar diferentes instrucciones, PDAs también brindan una interfaz tipo hashmap para [indexar cuentas](../guides/account-maps.md)
:::

# Un vistazo más profundo

Los PDA son un componente esencial para desarrollar programas en Solana. Con las PDA, los programas pueden firmar cuentas mientras garantizan que ningún usuario externo pueda generar una firma válida para la misma. Además de firmar cuentas, ciertos programas también pueden modificar cuentas en sus PDA.

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Image courtesy of <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### Generando PDAs

Para entender el concepto detrás de las PDA, puede ser útil considerar que las PDA no se crean técnicamente, sino que se encuentran. Los PDA se generan a partir de una combinación de semillas (como la cadena `“vote_account”`) y un id de programa. Esta combinación de semillas y de un id de programa luego se ejecuta a través de una función hash sha256 para ver si generan o no una clave pública que se encuentra en la curva elíptica ed25519.

Al ejecutar el id del programa y las semillas de nuestro programa a través de una función hash, hay una probabilidad de ~50% de que en realidad terminemos con una clave pública válida que se encuentre en la curva elíptica. En este caso, simplemente agregamos algo para modificar un poco nuestra entrada y lo intentamos de nuevo. El término técnico para este algo es un bump. En Solana, comenzamos con bump = 255 y simplemente iteramos hacia abajo, bump = 254, bump = 253, etc. hasta que obtengamos una dirección que no esté en la curva elíptica. Esto puede parecer rudimentario, pero una vez encontrado nos da una forma determinista de derivar el mismo PDA una y otra vez.

![PDA en la curva elíptica](./pda-curve.png)

### Interactuando con PDAs

Cuando un PDA es generado, `findProgramAddress` retorna la dirección y el bump usado para sacar la dirección fuera de la curva elíptica. Con el bump, un programa puede [firmar](../references/accounts.md#sign-with-a-pda) por cualquier transacción que requiera el PDA. Para firmar, los programas deben pasar la instrucción, la lista de las cuentas, las semillas y el bump usado para derivar el PDA a la función `invoke_signed`. Además de firmar para instrucciones, PDAs también deben firmar su propia creación con `invoke_signed`.

Cuando se crean PDAs, es común [guardar el bump y los seeds](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100) en los datos de la misma cuenta. Esto permite a los desarrolladores validar fácilmente un PDA sin tener que enviar el bump como argumento en la instrucción.

## Other Resources
- [Documentación oficial](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Entendiendo las direcciones derivadas de programa](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
