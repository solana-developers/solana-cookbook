---
title: Programmes
head:
  - - meta
    - name: title
      content: Solana Cookbook | Programmes
  - - meta
    - name: og:title
      content: Solana Cookbook | Programmes
  - - meta
    - name: description
      content: Les programmes (également appelés contrats intelligents) servent de base à toute activité au sein de la blockchain. Découvrez les programmes et d'autres concepts fondamentaux dans le Solana Cookbook.
  - - meta
    - name: og:description
      content: Les programmes (également appelés contrats intelligents) servent de base à toute activité au sein de la blockchain. Découvrez les programmes et d'autres concepts fondamentaux dans le Solana Cookbook.
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

# Programmes

N'importe quel développeur peut écrire et déployer des programmes sur la blockchain Solana. Les programmes (connus sous le nom de contrats intelligents sur d'autres protocoles) servent de base à l'activité sur la blockchain, permettant tout, partant de la DeFi et des NFTs jusqu'aux médias sociaux tout en passant par les jeux.

## Faits

::: tip Fiche d'Information
- Les programmes traitent les [instructions](./transactions) des utilisateurs finaux mais aussi d'autres programmes
- Tous les programmes sont *stateless* (sans état): toutes les données avec lesquelles ils interagissent sont stockées dans des [comptes](./accounts.md) séparés qui sont transmis par des instructions.
- Les programmes eux-mêmes sont stockés dans des comptes marqués comme `executable`
- Tous les programmes appartiennent au [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) et sont exécutés par le [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- Les développeurs écrivent le plus souvent des programmes en Rust ou en C++, mais ils peuvent choisir n'importe quel langage qui cible le backend [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) de [LLVM](https://llvm.org/)
- Tous les programmes ont un point d'entrée unique où le traitement des instructions a lieu (i.e. `process_instruction`); et dont les paramètres incluent toujours:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`
:::

## Examen plus approfondi

Contrairement à la plupart des autres blockchains, Solana sépare complètement le code des données. Toutes les données avec lesquelles les programmes interagissent sont stockées dans des comptes séparés et sont transmises, en tant que références, via des instructions. Ce modèle permet à un seul programme générique de fonctionner sur plusieurs comptes sans nécessiter de déploiements supplémentaires. Des exemples communs de ce modèle sont observés dans les programmes natifs et les programmes SPL.

### Programmes Natifs & La Bibliothèque des Programmes de Solana (SPL)

Solana est équipé d'un certain nombre de programmes qui servent d'éléments de base pour les interactions sur la blockchain. Ces programmes sont divisés en [Programmes Natifs](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) et en [Programmes de la Bibliothèque des Programmes de Solana (SPL)](https://spl.solana.com/).

Les Programmes Natifs fournissent les fonctions de base nécessaires au fonctionnement des validateurs. Parmi ces programmes, le plus connu est le [Programme Système (System Program)](https://docs.solana.com/developing/runtime-facilities/programs#system-program) qui est responsable de l'administration des nouveaux comptes et de transférer des SOL entre deux parties.

Les programmes de la Bibliothèque des Programmes de Solana (SPL) prennent en charge d'autres activités au sein de la blockchain, telles que, par exemple, la création de jetons, l'échange de jetons ainsi ou encore le prêt de jetons, ainsi que la création de pools de staking et le maintien on-chain du service de noms de domaine. Le [Programme de Jeton SPL (SPL Token Program)](https://spl.solana.com/token) peut être invoqué directement via l'interface CLI, tandis que d'autres, comme le [Programme de Compte de Jeton Associé (Associated Token Account Program)](https://spl.solana.com/associated-token-account) sont généralement utilisés par d'autres programmes.

### Ecrire des programmes

Les programmes sont le plus souvent développés avec Rust ou C++, mais peuvent être développés avec n'importe quel langage qui cible le backend BPF de LLVM. Les initiatives récentes de [Neon Labs](https://neon-labs.org/) et [Solang](https://solang.readthedocs.io/en/latest/) permettent la compatibilité [EVM](https://ethereum.org/en/developers/docs/evm/) et permettent donc aux développeurs d'écrire des programmes en Solidity.

La plupart des programmes Rust suivent l'architecture suivante :

| Fichier           | Description                                          |
|-------------------|------------------------------------------------------|
| lib.rs            | Registre des modules                                 |
| entrypoint.rs     | Point d'entrée du programme                          |
| instruction.rs    | API du programme, (dé)sérialisation des instructions |
| processor.rs      | Logique du programme                                 |
| state.rs          | Objets du programme, (dé)sérialisation des états     |
| error.rs          | Erreurs spécifiques au programme                     |

Récemment, [Anchor](https://github.com/coral-xyz/anchor) est devenu le framework le plus populaire pour le développement de programmes. Anchor est un framework, semblable à Ruby on Rails, qui réduit le boilerplate (code passe-partout) et facilite la (dé)sérialisation pour les programmes développés en Rust.

Les programmes sont généralement développés et testés dans les environnements appelés *Localhost* et *Devnet* avant d'être déployés sur le *Testnet* ou le *Mainnet*. Solana supporte les environnements suivants :

| Environnement du cluster  | URL de Connexion RPC                                                     |
|---------------------------|---------------------------------------------------------------------------|
| Mainnet-beta              | https://api.mainnet-beta.solana.com                                       |
| Testnet                   | https://api.testnet.solana.com                                            |
| Devnet                    | https://api.devnet.solana.com                                             |
| Localhost                 | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

Une fois déployés dans un environnement, les clients peuvent interagir avec les programmes de la blockchain via les [Connexions RPC](https://docs.solana.com/developing/clients/jsonrpc-api) du cluster correspondant.

### Déployer des programmes

Les développeurs peuvent déployer leurs programmes via le [CLI](https://docs.solana.com/cli/deploy-a-program):

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Lorsqu'un programme est déployé, il est compilé en un [objet partagé ELF (ELF shared object)](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (contenant le bytecode du BPF) et téléchargé sur le cluster Solana. Les programmes vivent dans des comptes (comme à peu près tout ce qui se trouve sur Solana), sauf que ceux-ci sont marqués comme `executable` et assigné au BPF Loader. L'adresse de ce compte est appelée `program_id` et est utilisée pour référencer le programme dans toutes les transactions futures.

Solana supporte plusieurs BPF Loaders, dont le dernier en date est le [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111). Le BPF Loader est chargé de gérer les comptes du programme et de les rendre accessibles aux clients via le `program_id`. Tous les programmes ont un point d'entrée unique où le traitement des instructions a lieu (i.e. `process_instruction`) et dont les paramètres incluent toujours:
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

Une fois invoqués, les programmes sont exécutés par le Runtime de Solana.

## Autres Ressources

- [Documentation officielle](https://docs.solana.com/developing/on-chain-programs/overview)
- [Documentation sur le SPL](https://spl.solana.com/)
- [Déploiements de programmes par Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Kit de démarrage pour Solana par Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programmation sur Solana par Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [Une Introduction à la Blockchain Solana par Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
