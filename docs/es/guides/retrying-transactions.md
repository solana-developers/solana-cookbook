---
title: Reintentando Transacciones
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Reintentando Transacciones
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Reintentando Transacciones
  - - meta
    - name: description
      content: En algunas ocasiones, una transacción aparentemente válida puede descartarse antes de que se incluya en un bloque. Para combatir esto, los desarrolladores de aplicaciones pueden desarrollar su propia lógica de retransmisión personalizada. Obtenga información sobre cómo reintentar transacciones y más en el libro de recetas de Solana.
  - - meta
    - name: og:description
      content: En algunas ocasiones, una transacción aparentemente válida puede descartarse antes de que se incluya en un bloque. Para combatir esto, los desarrolladores de aplicaciones pueden desarrollar su propia lógica de retransmisión personalizada. Obtenga información sobre cómo reintentar transacciones y más en el libro de recetas de Solana.
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

# Reintentando Transacciones

En algunas ocasiones, una transacción aparentemente válida puede descartarse antes de que se incluya en un bloque. Esto ocurre con mayor frecuencia durante los períodos de congestión de la red, cuando un nodo RPC no puede retransmitir la transacción al [líder](https://docs.solana.com/terminology#leader). Para un usuario final, puede parecer que su transacción desaparece por completo. Si bien los nodos RPC están equipados con un algoritmo de retransmisión genérico, los desarrolladores de aplicaciones también pueden desarrollar su propia lógica de retransmisión personalizada.

## Hechos

::: tip Hoja de hechos
- Los nodos RPC intentarán retransmitir transacciones usando un algoritmo genérico
- Los desarrolladores de aplicaciones pueden implementar su propia lógica de retransmisión personalizada
- Los desarrolladores deben aprovechar el parámetro `maxRetries` en el método JSON-RPC `sendTransaction`
- Los desarrolladores deben habilitar las comprobaciones previas para generar errores antes de que se envíen las transacciones.
- Antes de volver a firmar cualquier transacción, es **muy importante** asegurarse de que el blockhash de la transacción inicial haya expirado
:::

## El viaje de una transacción

### Cómo los clientes envían transacciones

En Solana no existe el concepto de mempool. Todas las transacciones, ya sea que se inicien mediante programación o por un usuario final, se enrutan de manera eficiente a los líderes para que puedan procesarse en un bloque. Hay dos formas principales en las que se puede enviar una transacción a los líderes:
1. Por proxy a través de un servidor RPC y el método JSON-RPC [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction)
2. Directamente a los líderes a través de un [Cliente TPU](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)

La gran mayoría de los usuarios finales enviarán transacciones a través de un servidor RPC. Cuando un cliente envía una transacción, el nodo RPC receptor intentará, a su vez, transmitir la transacción a los líderes actuales y siguientes. Hasta que la transacción sea procesada por un líder, no hay registro de la transacción fuera de lo que conocen el cliente y los nodos RPC de retransmisión. En el caso de un cliente de TPU, la retransmisión y el reenvío de líder son manejados completamente por el software del cliente.

![Viaje de una transacción](./retrying-transactions/tx-journey.png)

### Cómo transmiten las transacciones los nodos RPC

Después de que un nodo RPC recibe una transacción a través de `sendTransaction`, convertirá la transacción en un paquete [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) antes de reenviarlo a los líderes relevantes. UDP permite que los validadores se comuniquen rápidamente entre sí, pero no ofrece ninguna garantía con respecto a la entrega de transacciones.

Debido a que el cronograma de líderes de Solana se conoce antes de cada [época](https://docs.solana.com/terminology#epoch) (~2 días), un nodo RPC transmitirá su transacción directamente a los líderes actuales y siguientes. Esto contrasta con otros protocolos gossip como Ethereum que propagan transacciones de forma aleatoria y amplia en toda la red. De forma predeterminada, los nodos RPC intentarán reenviar transacciones a los líderes cada dos segundos hasta que finalice la transacción o expire el blockhash de la transacción (150 bloques o ~1 minuto 19 segundos al momento de escribir este artículo). Si el tamaño de la cola de retransmisión pendiente es superior a [10 000 transacciones](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20), las transacciones enviadas recientemente se descartarán. Hay [argumentos](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) de línea de comandos que los operadores de RPC pueden ajustar para cambiar el comportamiento predeterminado de este reintento lógica.

Cuando un nodo RPC transmite una transacción, intentará reenviar la transacción a la [Unidad de procesamiento de transacciones (TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867). The TPU processes transactions in five distinct phases: 
- [Etapa de Fetch](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [Etapa de SigVerify](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Etapa de Banking](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Servicios Proof of History](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Etapa de Broadcast](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Image Courtesy of Jito Labs</small>

De estas cinco fases, la etapa Fetch es responsable de recibir transacciones. Dentro de la etapa de búsqueda, los validadores clasificarán las transacciones entrantes según tres puertos:
- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) maneja transacciones regulares como transferencias de tokens, mint de NFT e instrucciones de programas
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) se enfoca exclusivamente en transacciones de votación
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) reenvía paquetes sin procesar al siguiente líder si el líder actual no puede procesar todas las transacciones

Para obtener más información sobre la TPU, consulte [este excelente artículo de Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## Cómo se caen las transacciones

A lo largo del viaje de una transacción, hay algunos escenarios en los que la transacción puede eliminarse involuntariamente de la red.

### Antes de que se procese una transacción

Si la red descarta una transacción, lo más probable es que lo haga antes de que un líder procese la transacción. La [pérdida de paquetes](https://en.wikipedia.org/wiki/Packet_loss) UDP es la razón más simple por la que esto puede ocurrir. En momentos de intensa carga de la red, también es posible que los validadores se vean abrumados por la gran cantidad de transacciones necesarias para el procesamiento. Si bien los validadores están equipados para reenviar transacciones excedentes a través de `tpu_forwards`, existe un límite en la cantidad de datos que se pueden [reenviar](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389). Además, cada reenvío está limitado a un solo salto entre validadores. Es decir, las transacciones recibidas en el puerto `tpu_forwards` no se reenvían a otros validadores.

También hay dos razones menos conocidas por las que una transacción puede descartarse antes de que se procese. El primer escenario implica transacciones que se envían a través de un grupo de RPC. Ocasionalmente, parte del grupo de RPC puede estar lo suficientemente por delante del resto del grupo. Esto puede causar problemas cuando se requiere que los nodos dentro del grupo trabajen juntos. En este ejemplo, el [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) de la transacción se consulta desde la parte avanzada del grupo (Backend A). Cuando la transacción se envía a la parte rezagada del grupo (Backend B), los nodos no reconocerán el blockhash avanzado y descartarán la transacción. Esto se puede detectar al enviar la transacción si los desarrolladores habilitan las [comprobaciones previas](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) en `sendTransaction`.

![Caidas via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

Las bifurcaciones de red temporales también pueden resultar en transacciones descartadas. Si un validador tarda en reproducir sus bloques dentro de la etapa bancaria, puede terminar creando una bifurcación minoritaria. Cuando un cliente crea una transacción, es posible que la transacción haga referencia a un `recentBlockhash` que solo existe en la bifurcación minoritaria. Una vez que se envía la transacción, el clúster puede cambiar su bifurcación minoritaria antes de que se procese la transacción. En este escenario, la transacción se descarta debido a que no se encuentra el blockhash.

![Caídas debido a una Bifurcación Minoritaria (Antes de procesar)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### Después de que se procese una transacción y antes de que finalice

En el caso de que una transacción haga referencia a un `recentBlockhash` de una bifurcación minoritaria, todavía es posible que se procese la transacción. En este caso, sin embargo, sería procesado por el líder en la bifurcación minoritaria. Cuando este líder intente compartir sus transacciones procesadas con el resto de la red, no logrará llegar a un consenso con la mayoría de los validadores que no reconocen la bifurcación minoritaria. En este momento, la transacción se cancelaría antes de que pudiera finalizarse.

![Caídas debido a una Bifurcación Minoritaria (Antes de procesar)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Manejo de transacciones descartadas

Si bien los nodos RPC intentarán retransmitir las transacciones, el algoritmo que emplean es genérico y, a menudo, inadecuado para las necesidades de aplicaciones específicas. Para prepararse para tiempos de congestión de la red, los desarrolladores de aplicaciones deben personalizar su propia lógica de retransmisión.

### Una mirada en profundidad a sendTransaction

Cuando se trata de enviar transacciones, el método RPC `sendTransaction` es la principal herramienta disponible para los desarrolladores. `sendTransaction` solo es responsable de transmitir una transacción de un cliente a un nodo RPC. Si el nodo recibe la transacción, `sendTransaction` devolverá la identificación de la transacción que se puede usar para rastrear la transacción. Una respuesta satisfactoria no indica si el clúster procesará o finalizará la transacción.

:::tip
#### Parámetros de la solicitud
- `transaction`: `string` - transacción totalmente firmada, como cadena codificada
- (opcional) `configuration object`: `object` 
    - `skipPreflight`: `boolean` - si es verdadero, omita las verificaciones de transacciones previas al vuelo (predeterminado: falso)
    - (opcional) `preflightCommitment`: `string` - [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) nivel a usar para simulaciones de verificación previa contra la ranura del banco (predeterminado: "finalizado").
    - (opcional) `encoding`: `string` - Codificación utilizada para los datos de transacción. O "base58" (lento) o "base64". (predeterminado: "base58").
    - (opcional) `maxRetries`: `usize` - Número máximo de veces para que el nodo RPC vuelva a intentar enviar la transacción al líder. Si no se proporciona este parámetro, el nodo RPC volverá a intentar la transacción hasta que finalice o hasta que caduque el blockhash.

#### Respuesta
- `transaction id`: `string` - Primera firma de transacción incrustada en la transacción como cadena codificada en base 58. Este ID de transacción se puede usar con [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) para buscar actualizaciones de estado.
:::

## Personalización de la lógica de retransmisión

Para desarrollar su propia lógica de retransmisión, los desarrolladores deberían aprovechar el parámetro `maxRetries` de `sendTransaction`. Si se proporciona, `maxRetries` anulará la lógica de reintento predeterminada de un nodo RPC, lo que permitirá a los desarrolladores controlar manualmente el proceso de reintento [dentro de límites razonables](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/principal.rs#L1258-L1274).

Un patrón común para volver a intentar transacciones manualmente consiste en almacenar temporalmente `lastValidBlockHeight` que proviene de [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash). Una vez almacenada, una aplicación puede [obtener la altura del bloque del clúster](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) y volver a intentar manualmente la transacción en un intervalo apropiado. En tiempos de congestión de la red, es ventajoso establecer `maxRetries` en 0 y retransmitir manualmente a través de un algoritmo personalizado. Si bien algunas aplicaciones pueden emplear un algoritmo de [retroceso exponencial](https://en.wikipedia.org/wiki/Exponential_backoff), otras como [Mango](https://www.mango.markets/) optan por [reenviar continuamente](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) transacciones a un intervalo constante hasta que se agote el tiempo de espera.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/retrying-transactions/retry.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/retrying-transactions/retry.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>


Al consultar datos a través de `getLatestBlockhash`, las aplicaciones deben especificar su nivel de [commitment (compromiso)](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment). Al establecer su compromiso en `confirmado` (votado) o `finalizado` (~30 bloques después de `confirmado`), una aplicación puede evitar consultar un blockhash de una bifurcación minoritaria.

Si una aplicación tiene acceso a nodos RPC detrás de un balanceador de carga, también puede optar por dividir su carga de trabajo entre nodos específicos. Los nodos RPC que atienden solicitudes de datos intensivos como [getProgramAccounts](./get-program-accounts.md) pueden ser propensos a quedarse atrás y pueden no ser adecuados para reenviar transacciones. Para las aplicaciones que manejan transacciones sensibles al tiempo, puede ser prudente tener nodos dedicados que solo manejen `sendTransaction`.

### El costo de omitir la verificación previa

De forma predeterminada, `sendTransaction` realizará tres comprobaciones previas antes de enviar una transacción. Específicamente, `sendTransaction` hará lo siguiente:
- Verificar que todas las firmas sean válidas
- Verifique que el blockhash referenciado esté dentro de los últimos 150 bloques
- Simular la transacción contra el slot del banco especificado por `preflightCommitment`

En el caso de que cualquiera de estas tres verificaciones previas falle, `sendTransaction` generará un error antes de enviar la transacción. Las comprobaciones previas a menudo pueden ser la diferencia entre perder una transacción y permitir que un cliente maneje correctamente un error. Para garantizar que se tengan en cuenta estos errores comunes, se recomienda que los desarrolladores mantengan `skipPreflight` establecido en `false`.

### Cuándo volver a firmar transacciones

A pesar de todos los intentos de retransmisión, puede haber momentos en los que un cliente deba volver a firmar una transacción. Antes de volver a firmar cualquier transacción, es **muy importante** asegurarse de que el blockhash de la transacción inicial haya expirado. Si el blockhash inicial aún es válido, es posible que la red acepte ambas transacciones. Para un usuario final, esto parecería como si sin querer enviara la misma transacción dos veces.

En Solana, una transacción descartada por la red puede ser descartada de manera segura una vez que el blockhash al que hace referencia es más antiguo que el `lastValidBlock` recibido de `getRecentBlockhash`. Los desarrolladores pueden verificar esto convenientemente para un blockhash dado a través de [isBlockhashValid](https://docs.solana.com/developing/clients/jsonrpc-api#isblockhashvalid). Una vez que se invalida un blockhash, los clientes pueden volver a firmar con un blockhash recién consultado.

## Agradecimientos

Muchas gracias a Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__) y [Jito Labs](https://twitter.com/jito_labs) por su revisión y comentarios.
