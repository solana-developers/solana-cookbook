---
title: Programas
head:
  - - meta
    - name: title
      content: Libro de recetas de Solana | Programas
  - - meta
    - name: og:title
      content: Libro de recetas de Solana | Programas
  - - meta
    - name: description
      content: Programas (también conocidos como contratos inteligentes) sirven como la base de toda la actividad dentro de la cadena de bloques. Aprende más sobre Programas y otros conceptos del core de Solana en el libro de recetas de Solana.
  - - meta
    - name: og:description
      content: Programas (también conocidos como contratos inteligentes) sirven como la base de toda la actividad dentro de la cadena de bloques. Aprende más sobre Programas y otros conceptos del core de Solana en el libro de recetas de Solana.
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

# Programas

Cualquier desarrollador puede escribir e implementar programas en la cadena de bloques de Solana. Los programas (conocidos como contratos inteligentes en otros protocolos) sirven como base para la actividad dentro de la cadena de bloques, potenciando desde DeFi y NFTs hasta redes sociales y juegos.

## Hechos

::: tip Hoja de hechos
- Los programas procesan [instrucciones](./transactions) de otros programas y de usuarios finales
- Todos los programas son *stateless* (sin estado): Los datos con los que interactúan son almacenados en [cuentas](./accounts.md) que son enviadas al programa en instrucciones
- Los mismos programas son almacenadas en cuentas marcadas como `executable` (ejecutables)
- El dueño de todos los programas es [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) y es ejectuado por el [Runtime de Solana](https://docs.solana.com/developing/programming-model/runtime)
- Los programadores comunmente utilizan Rust y C++ para escribir programas, pero pueden elegir cualquier lenguaje que compile con el backend de [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) para [LLVM](https://llvm.org/)
- Todos los programas tienen un punto único de entrada donde se procesan las instrucciones (i.e. `process_instruction`); los parámetros siempre incluyen:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`
:::

## Un vistazo más profundo

A diferencia de la mayoría de cadenas de bloques, Solana separa completamente el código de los datos. Todos los datos con los que interactúan los programas se almacenan en cuentas separadas y se envían a través de instrucciones. Este modelo permite que un único programa genérico funcione en varias cuentas sin necesidad de implementaciones adicionales. Se ven ejemplos comunes de este patrón en los programas nativos y SPL.

### Programas nativos & La librería de Programas de Solana (SPL)

Solana viene equipado con programas que sirven como bloques de construcción para interactuar con la cadena de bloques. Estos programas están dividos en [Programas nativos](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) y [Programas de la librería de programas (SPL)](https://spl.solana.com/).

Los programas nativos brindan la funcionalidad base que es requerida para operar validadores. Entre estos programas el más conocido es el [Programa del sistema (System Program)](https://docs.solana.com/developing/runtime-facilities/programs#system-program) que es responsable de administrar las cuentas y transferir SOL.

Los programas de la librería de programas soportan otras actividades dentro de la cadena de bloques como crear tokens, intercambiarlos, prestar tokens, así como generar pools de staking y mantener el servicio de nombres dentro de la cadena de bloques. El [Programa de Token (SPL Token Program)](https://spl.solana.com/token) puede ser invocado directamente desde el CLI (Command Line Interface), mientras que otros como el [Programa de cuentas asociadas a token (Associated Token Account Program)](https://spl.solana.com/associated-token-account) son usados dentro de otros programas.

### Escribiendo programas

Los Programas están escritos comunmente en Rust o C++, pero pueden ser desarrollado con cualquier lenguaje que compile al backend BPF de LLVM. Iniciativas recientes de [Neon Labs](https://neon-labs.org/) y [Solang](https://solang.readthedocs.io/en/latest/) habilitan la compatibilidad con [EVM](https://ethereum.org/en/developers/docs/evm/) para permitir a desarrolladores escribir programas con Solidity.

La mayoría de programas de Rust siguen la siguiente arquitectura:

| Arcguvi        | Descripción                                     |
|----------------|-------------------------------------------------|
| lib.rs         | Registro de módulos                             |
| entrypoint.rs  | Punto de entrada para el programa               |
| instruction.rs | API del programa, deserializa las instrucciones |
| processor.rs   | Lógica del programa                             |
| state.rs       | Objetos del programa, deserializa el estado     |
| error.rs       | Errores específicos del programa                |

Recientemente, [Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html) se ha convertido en el framework más popular para desarrollar programas. Anchor es un framework que reduce el boilerplate y facilita la deserialización para los programas desarrollados en Rust.

Los programas normalmente son desarrollados y testeados en los entornos Localhost y Devnet antes de ser desplegados a Testnet y Mainnet. Solana soporta los siguientes entornos:

| Entorno del cluster  | URL de conexión RPC                                                       |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

Una vez desplegado a un entorno, los clientes pueden interactuar con el programa dentro de la cadena de bloques utilizando [Conexiones RPC](https://docs.solana.com/developing/clients/jsonrpc-api) apuntando al cluster correspondiente.

### Desplegando Programas

Los desarrolladores pueden desplegar sus programas utilizando el [CLI](https://docs.solana.com/cli/deploy-a-program):

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Cuando un programa es desplegado, es compilado a un [ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (conteniendo el bytecode de BPF) y subido al cluster de Solana. Los Programas viven en cuentas (como casi todo en Solana), con la excepción de aquellas marcadas como `executable` y asignadas al BPF Loader. La dirección del programa desplegada se llama `program_id` y es usada para llamar al programa.

Solana soporta múltiples BPF Loaders, siendo el último el [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111). El BPF Loader es responsable de administrar las cuentas del programa y hacerlas accesibles a los clientes a través del `program_id`. Todos los programas tienen un único punto de entrada donde se procesan las instrucciones (i.e. `process_instruction`) y los parámetros siempre incluyen:
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

Una vez llamado, los Programas son ejecutados por el Runtime de Solana.

## Other Resources

- [Documentación oficial](https://docs.solana.com/developing/on-chain-programs/overview)
- [Documentación de SPL](https://spl.solana.com/)
- [Despliegue de Programas por Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Kit de inicio de Solana por Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programando en Solana por Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [Una introducción a la cadena de bloques por Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://project-serum.github.io/anchor/getting-started/introduction.html)
