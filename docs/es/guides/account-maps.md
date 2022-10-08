---
title: Cómo usar Map en cuentas
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Cómo usar Map en cuentas
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Cómo usar Map en cuentas
  - - meta
    - name: description
      content: Las estructuras Map (clave/valor) son comunmente usadas para almacenar datos. Aprende cómo usar la estructura Map en el libro de recetas de Solana.
  - - meta
    - name: og:description
      content: Las estructuras Map (clave/valor) son comunmente usadas para almacenar datos. Aprende cómo usar la estructura Map en el libro de recetas de Solana.
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

# Cómo usar Map en cuentas

Los mapas son estructuras de datos que usamos con frecuencia en la programación para asociar una **clave** con un **valor** de algún tipo. La clave y el valor pueden ser de cualquier tipo arbitrario y la clave actúa como un identificador para un valor dado que se está guardando. Luego, dada su clave, nos permite insertar, recuperar y actualizar estos valores de manera eficiente.

El modelo de cuenta de Solana, como sabemos, requiere que los datos del programa y sus datos de estado relevantes se almacenen en diferentes cuentas. Estas cuentas tienen una dirección asociada a ellas. ¡Esto, en sí mismo, actúa como un mapa! Obtenga más información sobre el modo de cuenta de Solana [aquí] [AccountCookbook].

Por lo tanto, tendría sentido almacenar sus **valores** en cuentas separadas, siendo su dirección la **clave** necesaria para recuperar el valor. Pero esto trae algunos problemas, tales como,

* Las direcciones mencionadas anteriormente probablemente no sean las **claves** ideales porque son difíciles de recordar.

* Las direcciones mencionadas anteriormente se referían a claves públicas de diferentes **Pares de claves**, donde cada clave pública (o *dirección*) tendría asociada una **clave privada**. Se requeriría esta clave privada para firmar diferentes instrucciones cuando sea necesario, lo que requiere que almacenemos la clave privada en algún lugar, ¡lo cual definitivamente **no** se recomienda!

Esto presenta un problema al que se enfrentan muchos desarrolladores de Solana, que es implementar una lógica similar a `Map` en sus programas. Veamos un par de formas para solucionar este problema,

## Derivando PDAs

PDA significa [Program Derived Address][PDA] o en español, direcciones derivadas de programa, que de forma simple podemos decir que son cuentas **derivadas** de un conjunto de semillas y un id de programa (o _dirección_). 

Lo único de las PDA es que estas direcciones **no** están asociadas con ninguna clave privada. Esto se debe a que estas direcciones no se encuentran en la curva ED25519. Por lo tanto, **solo** el programa, del cual se derivó esta _dirección_, puede firmar una instrucción con las semillas y el id del programa. Obtenga más información sobre esto [aquí][CPI].

Ahora que tenemos una idea de lo que son las PDA, ¡utilicémoslas para mapear algunas cuentas! Tomaremos un ejemplo de un programa **Blog** para demostrar cómo se implementaría.

En este programa de Blog, nos gustaría que cada 'Usuario' tuviera un solo 'Blog'. Este blog podría tener cualquier número de 'Publicaciones'. Eso significaría que estamos **asignando** a cada usuario a un blog, y cada publicación está **asignada** a un blog determinado.

En resumen, hay un mapeo `1:1` entre un usuario y su blog, mientras que un mapeo `1:N` entre un blog y sus publicaciones.

Para el mapeo `1:1`, nos gustaría que la dirección de un blog se derive **solo** de su usuario, lo que nos permitiría recuperar un blog, dada su autoridad (o _usuario_). Por lo tanto, las semillas de un blog consistirían en su **clave de autoridad** y posiblemente un prefijo de **"blog"**, para actuar como un identificador de tipo.

Para el mapeo `1:N`, nos gustaría que la dirección de cada publicación se derive **no solo** del blog con el que está asociada, sino también de otro **identificador**, lo que nos permite diferenciar entre `N ` número de publicaciones en el blog. En el siguiente ejemplo, la dirección de cada publicación se deriva de la **clave del blog**, un **slug** para identificar cada publicación y un prefijo de **"publicación"**, para actuar como un identificador de tipo.

El código es como se muestra a continuación,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

En el lado del cliente, puede usar `PublicKey.findProgramAddress()` para obtener la dirección de cuenta requerida `Blog` y `Post`, que puede pasar a `connection.getAccountInfo()` para obtener los datos de la cuenta. A continuación se muestra un ejemplo,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Map simple

Otra forma de implementar el mapeo sería tener una estructura de datos `BTreeMap` almacenada explícitamente en una sola cuenta. La propia dirección de esta cuenta podría ser una PDA o la clave pública de un par de claves generadas.

Este método de asignación de cuentas no es ideal por las siguientes razones:

* Primero tendrá que inicializar la cuenta que almacena el `BTreeMap`, antes de poder insertarle los pares clave-valor necesarios. Luego, también deberá almacenar la dirección de esta cuenta en algún lugar, para actualizarla cuando se necesite.

* Existen limitaciones de memoria para una cuenta, donde una cuenta puede tener un tamaño máximo de **10 megabytes**, lo que restringe el `BTreeMap` para almacenar una gran cantidad de pares clave-valor.

Por lo tanto, después de considerar su caso de uso, puede implementar este método como se muestra a continuación,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

El código del lado del cliente para probar el programa anterior se vería como se muestra a continuación,

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/es/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/es/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/es/programs.html#create-a-program-derived-address