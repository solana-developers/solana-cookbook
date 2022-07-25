---
title: Transacciones
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Transacciones
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Transacciones
  - - meta
    - name: description
      content: Las transacciones son un grupo de instrucciones dentro de Solana. Aprende más sobre Transacciones y otros conceptos del core de Solana en el libro de recetas de Solana.
  - - meta
    - name: og:description
      content: Las transacciones son un grupo de instrucciones dentro de Solana. Aprende más sobre Transacciones y otros conceptos del core de Solana en el libro de recetas de Solana.
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

# Transacciones

Los clientes pueden invocar [programas](./programs.md) enviando una transacción a un cluster. Una transacción puede incluir múltiples instrucciones, cada una de ellas apuntando a un programa diferente. Cuando una transacción es enviada, el [Runtime](https://docs.solana.com/developing/programming-model/runtime) de Solana procesará sus instrucciones en orden y de forma atómica. Si una parte de la transacción falla, toda la transacción fallará.

## Hechos

::: tip Hoja de hechos
- Las instrucciones son la unidad de operación más básica en Solana
- Cada instrucción contiene:
    - El `program_id` (id del programa) del programa al que apunta
    - Un arreglo de todas `accounts` (cuentas) donde va a leer o escribir
    - Un `instruction_data` (datos de la instrucción) que es un byte array para el programa específico
- Varias instrucciones pueden estar contenidas en una Transacción
- Cada transacción consiste de:
    - Un arreglo de todas `accounts` (cuentas) donde va a leer o escribir
    - Una o más `instructions` (instrucciones)
    - Un `blockhash` (hash de bloque) reciente 
    - Una o más `signatures` (firmas)
- Las instrucciones son procesadas en orden y de forma atómica
- Si una parte de la transacción falla, toda la transacción fallará
- Las transacciones están limitadas a un máximo de 1232 bytes
:::

## Un vistazo más profundo

El Runtime de Solana requiere tanto de instrucciones como de transacciones para especificar una lista de todas las cuentas de las que va a leer o escribir. Al requerir estas cuentas por adelantado, el Runtime de Solana es capaz de paralelizar la ejecución en todas las transacciones.

Cuando se envía una transacción a un clúster, el Runtime de Solana procesará sus instrucciones en orden y de forma atómica. Para cada instrucción, el programa al que se invoca interpretará el arreglo de datos y operará en las cuentas especificadas. El programa retornará con éxito o un código de error. Si se devuelve un error, toda la transacción fallará inmediatamente.

Toda transacción que debite de una cuenta o modique sus datos requiere la firma del titular de la cuenta. Cualquier cuenta que se modificará será marcada como `writable`. Una cuenta puede recibir fondos sin el permiso del titular siempre que el pagador del cargo (fee) cubra la renta y las tarifas de transacción.

Antes de enviar una transacción se debe enviar un [hash de bloque reciente](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash). El hash de bloque reciente es usado para prevenir duplicados y eliminar transacciones obsoletas. El tiempo máximo del hash de bloque reciente de una transacción es de 150 bloques, o aproximadamente ~1 minuto 19 segundos al momento de escribir este artículo.

### Cargos (fees)

La red de Solana colecta 2 tipos de cargos:
- [Cargo por transacción](https://docs.solana.com/transaction_fees) para propagar las transacciones (aka “gas fees”)
- [Cargo por renta](https://docs.solana.com/developing/programming-model/accounts#rent) por almacenar datos en la blockchain

En Solana, los cargos son deterministas: no existe el concepto de un mercado de cargos en el que los usuarios puedan pagar tarifas más altas para aumentar sus posibilidades de ser incluidos en el siguiente bloque. Al momento de redactar este documento, las tarifas de transacción están determinadas únicamente por la cantidad de firmas requeridas (es decir, `lamports_per_signature`), no por la cantidad de recursos utilizados. Esto se debe a que actualmente existe un límite máximo de 1232 bytes en todas las transacciones.

Todas las transacciones requieren al menos una cuenta sea `writable` (escribible) para firmar la transacción. Una vez enviada, la cuenta del firmante que se serializa primero será el pagador del cargo (fee). Esta cuenta pagará el costo de la transacción sin importar si la transacción tiene éxito o falla. Si el pagador del cargo no tiene saldo suficiente para pagar la tarifa de transacción, la transacción se cancelará.

Al momento de escribir este artículo, el validador que produce el bloque cobra el 50% de todas las tarifas de transacción, mientras que el 50% restante se quema. Esta estructura funciona para incentivar a los validadores a procesar tantas transacciones como sea posible durante sus espacios en el programa líder.

## Other Resources

- [Documentación oficial](https://docs.solana.com/developing/programming-model/transactions)
- [Estructura de una transacción](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Cargos de una transacción por Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [Introducción a Solana por Hana](https://2501babe.github.io/posts/solana101.html)
- [Procesamiento de una transacción por Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Transacción en Solana en detalle por Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
