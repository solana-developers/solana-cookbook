---
title: Cuentas
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Cuentas
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Cuentas
  - - meta
    - name: description
      content: Las cuentas son una pieza fundamental en el desarrollo de Solana. Aprende más sobre las cuentas de Solana y otros conceptos en el libro de recetas de Solana.
  - - meta
    - name: og:description
      content: Las cuentas son una pieza fundamental en el desarrollo de Solana. Aprende más sobre las cuentas de Solana y otros conceptos en el libro de recetas de Solana.
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

# Cuentas

Las Cuentas en Solana son usadas para almacenar el estado. Son una pieza
fundamental en el desarrollo de programas en Solana.

## Hechos

::: tip Lista de hechos

- Las cuentas son usadas para almacenar estado
- Cada cuenta tiene una dirección única
- Las cuentas tienen un tamaño máximo de 10MB (10 Mega Bytes)
- Las cuentas de direcciones derivadas de programa (PDA) tienen un tamaño máximo
de 10KB (10 Kilo Bytes)
- Las cuentas de direcciones derivadas de programa (PDA) pueden ser usadas para
firmar a nombre de un programa
- Los tamaños de las cuentas son definidos al momento de la creación, pero 
pueden ser ajustados usando [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- El almacenamiento de datos en una cuenta es pagado con la renta
- El dueño por defecto de una cuenta es el programa del sistema (System Program)
  :::

## Un vistazo más profundo

### El modelo de una cuenta

Hay 3 tipos de cuentas en Solana:

- Cuentas de datos para almacenar datos
- Cuentas de programas para almacenar programas ejecutables
- Cuentas nativas para los programas nativos de Solana como System, Stake, 
y Vote

En las cuentas de datos hay 2 tipos:

- Cuentas de propiedad del sistema (System owned accounts)
- Cuentas de direcciones derivadas de programa o PDA (Program Derived Address)

Cada cuenta tiene una dirección (usualmente una llave pública) y un dueño
(dirección de la cuenta del programa). La lista completa de los campos que 
tiene una cuenta se encuentra a continuación.

| Field      | Description                                    |
| ---------- | ---------------------------------------------- |
| lamports   | El número de lamports que tiene la cuenta      |
| owner      | El programa dueño de esa cuenta                |
| executable | Indica si la cuenta procesa transacciones      |
| data       | El array de bytes de datos que tiene la cuenta |
| rent_epoch | La siguiente época que esta cuenta deberá renta|

Hay algunos reglas importantes de propiedad de la cuenta:

- Solo el dueño de la cuenta de datos puede modificar sus datos y debitar 
lamports
- Cualquier puede enviar lamports a una cuenta de datos
- El duseño de la cuenta puede asignar un nuevo dueño si la cuenta no tiene 
datos

Las cuentas de programa no almacenan datos.

Por ejemplo, si existiera un programa que cuenta que permite incrementar el 
contador, debes crear 2 cuentas, una para almacenar el código del programa 
(ejecutable) y otra para almacenar el contador (no ejecutable).

![](./account_example.jpeg)

Para evitar que las cuentas sean elmininadas se debe pagar renta.

### Renta

Almacenar datos en las cuentas cuesta SOL para mantenerlas y es pagado a través
de las rentas. Si mantienes un balance mínimo equivalente a 2 años de renta en 
la cuenta, la cuenta no tendrá que pagar renta, como un depósito de garantía. 
Luego puedes obtener de vuelta el valor de la renta al cerrar la cuenta y 
enviar los lamports hacia tu wallet. 

La renta es pagada en dos momentos:

1. Cuando es iniciado por una transacción
2. Una vez por época (cantidad de slots)

Un porcentaje de las rentas es eliminado y el resto es distribuido para votar
al final de cada slot.

Si la cuenta no tiene suficiente renta para pagar, la cuenta será eliminada 
junto con sus datos.

## Otros recursos

- [Modelo de cuentas de Solana](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Documentación oficial](https://docs.solana.com/developing/programming-model/accounts)
- [Hilo de la cuenta de Twitter de pencilflip](https://twitter.com/pencilflip/status/1452402100470644739)

### Creditos

El concepto de cuentas es gracias a Pencilflip. [Pueden seguir a Penciflip en Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
