---
title: Obtener cuentas de programa
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Obtener cuentas de programa
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Obtener cuentas de programa
  - - meta
    - name: description
      content: Aprende como obtener datos en Solana usando getProgramAccounts y accountsDB
  - - meta
    - name: og:description
      content: Aprende como obtener datos en Solana usando getProgramAccounts y accountsDB
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

# Obtener cuentas de programa

Existe un método RPC que devuelve todas las cuentas que son propiedad de un programa. Actualmente no se admite la paginación. Las solicitudes a `getProgramAccounts` deben incluir los parámetros `dataSlice` y/o `filters` para mejorar el tiempo de respuesta y devolver solo los resultados que se necesitan.

## Hechos

::: tip Parámetros

- `programId`: `string` - Llave pública del programa a consultar, codificada en base58
- (optional) `configOrCommitment`: `object` - Parámetros de configuración que contienen los siguientes campos opcionales:
    - (optional) `commitment`: `string` - [Compromiso del estado (state commitment)](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (optional) `encoding`: `string` - La codificación para los datos de la cuenta, puede ser: `base58`, `base64`, or `jsonParsed`. Los usuarios de web3js deben usar [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
    - (optional) `dataSlice`: `object` - Configuración para limitar los datos que se retornan:
        - `offset`: `number` - Número de bytes en los datos de la cuenta donde iniciar
        - `length`: `number` - Número de bytes de datos de la cuenta a devolver
    - (optional) `filters`: `array` - Configuración para filtrar los resultados:
        - `memcmp`: `object` - Coincidencia de bytes con los datos de la cuenta:
            - `offset`: `number` - Número de bytes en los datos de la cuenta donde empezar a comparar
            - `bytes`: `string` - Datos a comparar, como cadena codificada en base58 limitada a 129 bytes
        - `dataSize`: `number` - Compara la longitud de los datos de la cuenta con el tamaño de datos proporcionado
    - (optional) `withContext`: `boolean` - Envuelve el resultado en un [Objeto JSON RpcResponse](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

##### Respuesta

Por defecto `getProgramAccounts` devolverá una matriz de objetos JSON con la siguiente estructura:

- `pubkey`: `string` - La clave pública de la cuenta codificada en base58
- `account`: `object` - un objeto JSON, con los siguientes subcampos:
    - `lamports`: `number` - número de lamports asignado a la cuenta
    - `owner`: `string` - La clave pública del programa al que se ha asignado la cuenta codificada en base58
    - `data`: `string` | `object` - datos asociados con la cuenta, ya sea como datos binarios o en formato JSON según el parámetro de codificación proporcionado
    - `executable`: `boolean` - Indicación si la cuenta contiene un programa
    - `rentEpoch`: `number` - La época en la que esta cuenta adeudará alquiler
:::

## Un vistazo más profundo

`getProgramAccounts` es un método RPC versátil que devuelve todas las cuentas propiedad de un programa. Podemos usar `getProgramAccounts` para una serie de consultas útiles, como encontrar:

- Todas las cuentas de token para una billetera en particular
- Todas las cuentas para un mint en particular (ej. Todos los titulares (holders) de [SRM](https://www.projectserum.com/))
- Todas las cuentas para un programa en particular (ej. Todos los usuarios de [Mango](https://mango.markets/))

A pesar de su utilidad, `getProgramAccounts` a menudo se malinterpreta debido a sus limitaciones actuales. Muchas de las consultas admitidas por `getProgramAccounts` requieren nodos RPC para escanear grandes conjuntos de datos. Estos escaneos consumen muchos recursos y memoria. Como resultado, las llamadas que son demasiado frecuentes o de un alcance demasiado grande pueden provocar tiempos de espera mayores al permitido (timeouts). Además, en el momento de escribir este artículo, el extremo `getProgramAccounts` no admite la paginación. Si los resultados de una consulta son demasiado grandes, la respuesta se truncará.

Para resolver temporalmente estas restricciones, `getProgramAccounts` ofrece una serie de parámetros útiles: por ejemplo, `dataSlice` y las opciones de `filtros` `memcmp` y `dataSize`. Al proporcionar combinaciones de estos parámetros, podemos reducir el alcance de nuestras consultas a tamaños manejables y predecibles.

Un ejemplo común de `getProgramAccounts` consiste en interactuar con el [Programa de tokens SPL](https://spl.solana.com/token). Solicitar todas las cuentas propiedad del Programa Token con una [llamada básica](../references/accounts.md#get-program-accounts) implicaría una enorme cantidad de datos. Sin embargo, al proporcionar parámetros, podemos solicitar de manera eficiente solo los datos que pretendemos utilizar.

#### `filters`
El parámetro más común para usar con `getProgramAccounts` es la matriz `filters`. Esta matriz acepta dos tipos de filtros, `dataSize` y `memcmp`. Antes de usar cualquiera de estos filtros, debemos estar familiarizados con la forma en que se distribuyen y serializan los datos que solicitamos.

#### `dataSize`
En el caso del Programa Token (Token Program), podemos ver que [las cuentas de token tienen una longitud de 165 bytes](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106). Específicamente, una cuenta de token tiene ocho campos diferentes, y cada campo requiere una cantidad predecible de bytes. Podemos visualizar cómo se distribuyen estos datos usando la siguiente ilustración.

![Tamaño de la cuenta](./get-program-accounts/account-size.png)

Si quisiéramos encontrar todas las cuentas de token que pertenecen a nuestra dirección de billetera, podríamos agregar `{ dataSize: 165 }` a nuestra matriz de `filtros` para limitar el alcance de nuestra consulta a solo cuentas que tengan exactamente 165 bytes de longitud. Esto solo, sin embargo, sería insuficiente. También necesitaríamos agregar un filtro que busque cuentas propiedad de nuestra dirección. Podemos lograr esto con el filtro `memcmp`.

#### `memcmp`
El filtro `memcmp`, o filtro de "comparación de memoria", nos permite comparar datos en cualquier campo almacenado en nuestra cuenta. Específicamente, solo podemos consultar cuentas que coincidan con un conjunto de bytes en una posición específica. `memcmp` requiere dos argumentos:

- `offset`: La posición para comenzar a comparar datos. Esta posición se mide en bytes y se expresa como un número entero.
- `bytes`: Los datos que deben coincidir con los datos de la cuenta. Esto se representa como una cadena codificada en base 58 que debe limitarse a menos de 129 bytes.

Es importante tener en cuenta que `memcmp` solo devolverá resultados que coincidan exactamente en `bytes`. Actualmente, no admite comparaciones de valores menores o mayores que los "bytes" que proporcionamos.

De acuerdo con nuestro ejemplo del Programa de tokens, podemos modificar nuestra consulta para que solo devuelva las cuentas de tokens que pertenecen a nuestra dirección de billetera. Al observar una cuenta de token, podemos ver que los dos primeros campos almacenados en una cuenta de token son claves públicas y que cada clave pública tiene una longitud de 32 bytes. Dado que `owner` es el segundo campo, deberíamos comenzar nuestro `memcmp` en un `offset` de 32 bytes. A partir de aquí, buscaremos cuentas cuyo campo de propietario coincida con la dirección de nuestra billetera.

![Tamaño de la cuenta](./get-program-accounts/memcmp.png)

Podemos hacer esta búsqueda utilizando el siguiente ejemplo:

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

Además de los dos parámetros de filtro, el tercer parámetro más común para `getProgramAccounts` es `dataSlice`. A diferencia del parámetro `filters`, `dataSlice` no reducirá el número de cuentas devueltas por una consulta. En cambio, `dataSlice` limitará la cantidad de datos para cada cuenta.

Así como `memcmp`, `dataSlice` acepta dos argumentos:

- `offset`: La posición (en número de bytes) en la que comenzar a devolver los datos de la cuenta
- `length`: El número de bytes que se deben devolver

`dataSlice` es particularmente útil cuando ejecutamos consultas en un gran conjunto de datos pero en realidad no nos preocupamos por los datos de la cuenta en sí. Un ejemplo de esto sería si quisiéramos encontrar la cantidad de cuentas de token (es decir, la cantidad de titulares o holders) para un mint específico.

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

Al combinar los tres parámetros (`dataSlice`, `dataSize` y `memcmp`) podemos limitar el alcance de nuestra consulta y devolver de manera eficiente solo los datos que nos interesan.

## Otros recursos

- [Documentación del API RPC](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Documentación de Web3js](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [Documentación de Web3js convertido a JSON](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
