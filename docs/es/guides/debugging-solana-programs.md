---
title: Depurando Programas en Solana
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Depurando Programas en Solana
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Depurando Programas en Solana
  - - meta
    - name: description
      content: Hay una serie de opciones y herramientas de apoyo para probar y depurar un programa Solana BPF. Obtenga información cómo depurar un programa y más en el libro de recetas de Solana.
  - - meta
    - name: og:description
      content: Hay una serie de opciones y herramientas de apoyo para probar y depurar un programa Solana BPF. Obtenga información cómo depurar un programa y más en el libro de recetas de Solana.
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

# Depurando Programas en Solana

Hay una serie de opciones y herramientas de apoyo para probar y depurar un programa Solana.

## Hechos

::: tip Hoja de hechos
- El crate `solana-program-test` permite el uso de bare bones **_local runtime_** donde puede probar y depurar
su programa de forma interactiva (por ejemplo, en vscode).
- El crate `solana-validator` permite el uso de la implementación `solana-test-validator` para una mayor robustez
de pruebas en un **_nodo validador local_**. Puede ejecutarlo desde el editor **_pero los puntos de interrupción 
en el programa son ignorados_**.
- La herramienta CLI `solana-test-validator` ejecuta y carga su programa y procesa la ejecución de transacciones desde
línea de comando, Aplicaciones Rust o aplicaciones Javascript/Typescript usando web3.
- Por todo lo anterior, se recomienda el uso liberal de la macro `msg!` en su programa al principio y luego
eliminándolos mientras prueba y asegura un comportamiento estable. Recuerde que `msg!` consume Unidades de Cómputo que
eventualmente podrían hacer fallar su programa al alcanzar los límites de presupuesto de la Unidad de Cómputo.
:::

Los pasos de las siguientes secciones utilizan [solana-program-bpf-template](#resources). Clona eso a tu
máquina:
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Pruebas de tiempo de ejecución y depuración en el editor

Abre el archivo `src/lib.rs`

Verá que el programa es bastante simple y básicamente solo registra el contenido recibido por
la función de entrada del programa: `process_instruction`

1. Vaya a la sección `#[cfg(test)]` y haga clic en `Ejecutar pruebas`. Esto construirá el programa, luego
ejecute la prueba `async fn test_transaction()`. Verá los mensajes de registro (simplificados) en el terminal vscode.
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. Establezca un punto de interrupción en la línea `msg!` del programa (11)
3. De vuelta en el módulo de prueba, haga clic en "Depurar" y, en cuestión de segundos, el depurador se detendrá en el 
punto de interrupción y ahora puede examinar datos, recorrer funciones, etc.

Estas pruebas también se ejecutan desde la línea de comandos con:
`cargo test` o `cargo test-bpf`.  Por supuesto, cualquier punto de interrupción será ignorado.

:::tip Nota
Tenga en cuenta que no está utilizando un nodo de validación, por lo que los programas predeterminados, hashes de 
bloque, etc. no están representados o no se comportará como lo haría cuando se ejecuta en el nodo de validación. Por 
eso la Solana nos dio el nodo Local Validator para hacer pruebas!
:::


## Pruebas de nodo de validación local en el editor (Local Validator)

Las pruebas de integración mediante la carga programática de un nodo validador local se definen en el
archivo `tests/integration.rs`.

De forma predeterminada, las pruebas de integración del repositorio de plantillas solo se podrán ejecutar desde la 
línea de comandos usando `cargo test-bpf`. Los siguientes pasos también le permitirán ejecutar dentro del editor,
como mostrar los registros del validador del programa y las salidas `msg!` de su programa:

1. En el directorio del repositorio, ejecute `cargo build-bpf` para compilar el programa de muestra
2. En el editor, abra `tests/integration.rs`
3. Comente la línea 1 -> `// #![cfg(feature = "test-bpf")]`
4. En la línea 19, cámbielo para que diga: `.add_program("target/deploy/bpf_program_template", program_id)`
5. Inserte lo siguiente en la línea 22 `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. Haga clic en `Ejecutar prueba` encima de la función `test_validator_transaction()`

Esto cargará el nodo de validación y luego le permitirá construir una transacción (al estilo de Rust) y
enviar al nodo usando `RcpClient`.

La salida del programa también se imprimirá en la terminal del editor. Por ejemplo (simplificado):
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```
La depuración aquí le permitirá depurar las funciones y los métodos utilizados en el **_cuerpo de prueba_**, pero
no un punto de interrupción en su programa.

## Pruebas de nodos de validadores locales desde aplicaciones cliente
Por último, puede iniciar un nodo de validación local y cargar su programa y cualquier cuenta usando `solana-test-validator`
desde la línea de comandos.

En este enfoque, necesitará una aplicación cliente usando Rust [RcpClient](#resources) o en
[Clientes JavaScript o Typescript](#resources)

Consulte `solana-test-validator --help` para obtener más detalles y opciones. Para el programa de ejemplo aquí está la configuración:
1. Abra una terminal en la carpeta repo
2. Ejecute `solana config set -ul` para configurar la configuración para que apunte a local
3. Ejecute `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. Abra otra terminal y ejecute `solana logs` para iniciar el transmisor de registros
5. Luego puede ejecutar su programa cliente y observar la salida del programa en la terminal donde inició el transmisor de registros.

## Recursos
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[Librería JavaScript/Typescript](https://solana-labs.github.io/solana-web3.js/)
