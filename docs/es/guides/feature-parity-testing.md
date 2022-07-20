---
title: Prueba de paridad de características
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Prueba de paridad de características
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Prueba de paridad de características
  - - meta
    - name: description
      content: Las características varían por cluster. Las pruebas de paridad de características aseguran resultados predecibles.
  - - meta
    - name: og:description
      content: Las características varían por cluster. Las pruebas de paridad de características aseguran resultados predecibles.
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

# Prueba de paridad de características

Al probar su programa, la garantía de que se ejecutará de la misma manera en varios clusters es esencial tanto para la 
calidad como para producir los resultados esperados.

## Hechos

::: tip Hoja de hechos
- Las características son capacidades que se introducen en los validadores de Solana y requieren activación para ser 
utilizadas.
- Las características pueden activarse en un clúster (p. ej., testnet) pero no en otro (p. ej., mainnet-beta).
- Sin embargo; al ejecutar `solana-test-validator` localmente, todas las características disponibles se activan 
automáticamente. El resultado es que cuando se prueba localmente, las capacidades y los resultados puede que no sean 
las mismas que al ejecutar en un clúster diferente!
:::

## Escenario
Suponga que tiene una Transacción que contenía tres (3) instrucciones y cada instrucción consume aproximadamente
100_000 Unidades de cómputo (CU). Cuando se ejecuta en una versión de Solana 1.8.x, observaría un consumo de CU de instrucción similar a:

| Instruction | Inicio de CU | Ejecución | CU Restante |
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

En Solana 1.9.2, se introdujo una función llamada 'límite de cómputo amplio de transacción' donde una transacción, de forma predeterminada,
tiene un presupuesto de 200_000 CU y las instrucciones encapsuladas **_draw down_** de ese presupuesto de transacción. Corriendo la misma
transacción como se señaló anteriormente tendría un comportamiento muy diferente:

| Instruction | Inicio de CU | Ejecución | CU Restante |
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FALLA!!! | FALLA!!!

¡Ay! Si no estuviera al tanto de esto, probablemente se sentiría frustrado ya que no hubo cambios en su comportamiento de instrucción que
causaría esto. En devnet funcionó bien, pero localmente estaba fallando?!?

Existe la posibilidad de aumentar el presupuesto general de transacciones, digamos 300_000 CU, y que no falle
pero esto demuestra por qué probar con **_Feature Parity_** proporciona una forma proactiva de evitar confusiones.

## Estado de la función
Es bastante fácil verificar qué funciones están habilitadas para un clúster en particular con el comando `solana feature status`.
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

Alternativamente, puede usar una herramienta como [scfsd](#resources) para observar el estado de todas las funciones en los clústeres,
que mostraría la pantalla parcial que se muestra aquí, y no requiere que `solana-test-validator` se esté ejecutando:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Pruebas de paridad
Como se señaló anteriormente, `solana-test-validator` activa **todas** las características automáticamente.
Entonces, para responder a la pregunta "¿Cómo puedo probar localmente en un entorno que tiene paridad con devnet,
testnet o incluso mainnet-beta?".

Solución: PRs fueron agregados a Solana 1.9.6 para permitir la desactivación de funciones:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Demostración sencilla
Suponga que tiene un programa simple que registra los datos. Y usted esta probando una transacción que agrega dos (2) 
instrucciones para su programa.

### Todas las funciones activadas
1. Inicie el validador de prueba en una terminal:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program target/deploy/PROGNAME.so --reset`
```

2. En otra terminal, inicia el transmisor de registros:
```console
solana logs
```

3. Luego ejecuta su transacción. Vería algo similar en el terminal de registro (editado para mayor claridad):
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```
Debido a que nuestra característica 'límite de cómputo de toda la transacción' se activa automáticamente de forma predeterminada, observamos cada
instrucción que reduce CU del presupuesto de transacción inicial de 200_000 CU.

### Funciones selectivas desactivadas
1. Para esta ejecución, queremos que el comportamiento del presupuesto de CU esté a la par con lo que se ejecuta en devnet. Usando
la(s) herramienta(s) descrita(s) en [Estado de la características](#feature-status) aislamos la clave pública `transaction wide computing cap`
y usamos `--deactivate-feature` en el inicio del validador de prueba

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. Ahora vemos en nuestros registros que nuestras instrucciones ahora tienen su propio presupuesto de 200_000 CU (editado para mayor claridad) que es
actualmente el estado en todos los clusters:
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Pruebas de paridad completa
Puede estar en paridad total con un clúster específico identificando cada función que no está
aún activada y agregue `--deactivate-feature <FEATURE_PUBKEY>` para cada uno al invocar `solana-test-validator`:
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Alternativamente, [scfsd](#resources) proporciona un interruptor que genera una salida para la función desactivada
para un clúster para que se use directamente al inicio de `solana-test-validator`:
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

Si abre otra terminal, mientras el validador se está ejecutando, y ejecuta `solana feature status` verá
características desactivadas que se encontraron desactivadas en devnet

## Pruebas de paridad completa programáticamente
Para aquellos que controlan la ejecución del validador de prueba dentro de su código de prueba, modificando
las características activadas/desactivadas del validador de prueba es posible usando TestValidatorGenesis. Con
Solana 1.9.6 se ha agregado una función al generador de validadores para admitir esto.

En la raíz de la carpeta de su programa, cree una nueva carpeta llamada `tests` y agregue un archivo llamado 
`parity_test.rs`. Aquí estarán las funciones utilizadas por cada prueba.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Ahora podemos agregar funciones de prueba en el cuerpo de `mod test {...}` para demostrar el valor predeterminado
de configuración del validador (todas las funciones habilitadas) y luego deshabilitando el "límite de cómputo de toda la transacción" como 
los ejemplos anteriores ejecutando `solana-test-validator` desde la línea de comando.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

Alternativamente, el [gadget del motor scfs](#resources) puede producir un vector completo de desactivado de
características de un clúster. Lo siguiente demuestra el uso de ese motor para obtener una lista
de todas las funciones desactivadas para devnet.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Happy Testing!


## Recursos
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)