---
title: Escribiendo Programas
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Referencia de programas en Solana
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Referencia de programas en Solana
  - - meta
    - name: description
      content: Aprende cómo escribir programas en Solana con referencias de invocación entre programas, lectura de cuentas y más
  - - meta
    - name: og:description
      content: Aprende cómo escribir programas en Solana con referencias de invocación entre programas, lectura de cuentas y más
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

# Escribiendo Programas

## Cómo transferir SOL a un programa

Tu programa en Solana puede transferir lamports de una cuenta a otra
sin 'invocar' al programa del Sistema (System Program). La regla fundamental es 
que tu programa puede transferir lamports desde cualquier cuenta **propiedad** 
de tu programa a cualquier cuenta.

La cuenta del destinatario *no tiene que ser* una cuenta propiedad de tu 
programa.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## Cómo obtener una referencia al reloj en un programa

Se puede obtener un reloj de dos maneras:

1. Enviando `SYSVAR_CLOCK_PUBKEY` en una instrucción
2. Accediendo a Clock directamente dentro de una instrucción.

Es bueno conocer ambos métodos porque algunos programas antiguos aún esperan 
`SYSVAR_CLOCK_PUBKEY` cómo una cuenta.

### Enviando Clock cómo una cuenta dentro de una instrucción

Vamos a crear una instrucción que reciba una cuenta para inicializar y la clave pública de sysvar

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Ahora enviamos la dirección pública de la variable del sistema (sysvar) del reloj desde el cliente

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Accediendo al reloj directamente dentro de una instrucción

Creemos la misma instrucción pero sin esperar `SYSVAR_CLOCK_PUBKEY` desde el 
cliente

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

La instrucción del cliente ahora solo necesita enviar el estado y las cuentas 
que pagan la transacción

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo cambiar el tamaño de una cuenta

Puede cambiar el tamaño de una cuenta propiedad del programa con el uso
de `realloc`. `realloc` puede cambiar el tamaño de una cuenta hasta 10 KB.
Cuando uses `realloc` para aumentar el tamaño de una cuenta, debes transferir 
lamports para mantener esa cuenta exenta de alquiler.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo hacer una invocación entre programas (Cross Program Invocation)

Una invocación de programa cruzada (Cross Program Invocation), simplemente 
llama a la instrucción de otro programa dentro del nuestro. Un buen ejemplo es 
el `swap` de Uniswap. El contrato `UniswapV2Router`, llama a la lógica 
necesaria para hacer swap, y llama a la función de transferencia del contrato 
`ERC20` para hacer swap de una persona a otra. De la misma manera, podemos
llamer a la instrucción de un programa de acuerdo a nuestras necesidades.

Echemos un vistazo a nuestro primer ejemplo, que es la instrucción 
`Transferencia del Programa Token SPL`. Las cuentas requeridas para que la 
transferencia ocurra son:

1. La cuenta de token de origin (La cuenta donde tenemos los tokens)
2. La cuenta de token de destino  (La cuenta a la que le vamos a transferir los tokens)
3. La cuenta principal del dueño de los tokens a transferir (La dirección con la que vamos a firmar)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
La instrucción del cliente sería la siguiente. Para conocer las instrucciones de creación de token y mint, consulte el código completo.
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Ahora echemos un vistazo a otro ejemplo, que es la instrucción `create_account` del programa del sistema. Hay una ligera diferencia entre la instrucción mencionada anteriormente y esta. En la anterior, nunca tuvimos que pasar `token_program` como una de las cuentas dentro de la función `invoke`. Sin embargo, hay excepciones en las que debe pasar el `program_id` de la instrucción de invocación. En nuestro caso, sería el id_programa del 'Programa del sistema' ("111111111111111111111111111111111"). Así que ahora las cuentas requeridas serían:

1. La cuenta del pagador de la renta
2. La cuenta que va a ser creada
3. La cuenta del programa del sistema

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

El código del lado del cliente se verá de la siguiente manera:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo crear una cuenta derivada de programa (PDA)

Una dirección derivada del programa es simplemente una cuenta propiedad del programa, pero no tiene clave privada. En cambio, su firma se obtiene mediante un conjunto de semillas y un "bump" (un número que asegura que está fuera de la curva). "**Generar**" una dirección de programa es diferente de "**crearla**". Se puede generar un PDA usando `Pubkey::find_program_address`. Crear un PDA esencialmente significa inicializar la dirección con espacio y establecer el estado. Se puede crear una cuenta Keypair normal fuera de nuestro programa y luego enviarla para inicializar su estado. Desafortunadamente, para las PDA, se tienen que crear en la blockchain, debido a la naturaleza de no poder firmar en su nombre. Por lo tanto, usamos `invoke_signed` para pasar las semillas de la PDA, junto con la firma de la cuenta de fondos, lo que da como resultado la creación de la cuenta de una PDA.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Uno puede enviar las cuentas requeridas a través del cliente de la siguiente manera

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo leer cuentas

Casi todas las instrucciones en Solana requerirían al menos 2 o 3 cuentas, y se mencionarían sobre los controladores de instrucciones en qué orden espera ese conjunto de cuentas. Es bastante simple si aprovechamos el método `iter()` en Rust, en lugar de indicar manualmente las cuentas. El método `next_account_info` básicamente obtiene el primer índice del iterable y devuelve la cuenta presente dentro de la matriz de cuentas. Veamos una instrucción simple que espera varias cuentas y requiere analizar cada una de ellas.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo verificar cuentas

Dado que los programas en Solana no tienen estado, nosotros, como creadores de programas, debemos asegurarnos de que las cuentas pasadas se validen tanto como sea posible para evitar cualquier entrada de cuentas maliciosas. Las comprobaciones básicas que se pueden hacer son

1. Validar si el el firmante esperado ha firmado
2. Validar si el estado de la cuenta está como escribible
3. Validar si el dueño del estado de la cuenta es el id del programa
4. Validar si la cuenta ya fue inicializada
5. Validar si los ids de programas que se envían (cuando se necesite) son los esperados

A continuación se define una instrucción básica que inicializa una cuenta de estado de héroe, pero con las comprobaciones mencionadas anteriormente.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Cómo leer múltiples instrucciones de una transacción

Solana nos permite echar un vistazo a todas las instrucciones en la transacción actual. Podemos almacenarlas en una variable e iterar sobre ellas. Podemos hacer muchas cosas con esto, como verificar transacciones sospechosas.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
