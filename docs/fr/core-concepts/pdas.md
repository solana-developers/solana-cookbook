---
title: Adresses dérivées de programmes (PDAs)
head:
  - - meta
    - name: title
      content: Solana Cookbook | PDAs
  - - meta
    - name: og:title
      content: Solana Cookbook | PDAs
  - - meta
    - name: description
      content: Les PDAs sont des comptes qui sont conçus pour être contrôlés par un programme spécifique. Découvrez les PDAs et d'autres concepts fondamentaux dans le Solana Cookbook.
  - - meta
    - name: og:description
      content: Les PDAs sont des comptes qui sont conçus pour être contrôlés par un programme spécifique. Découvrez les PDAs et d'autres concepts fondamentaux dans le Solana Cookbook.
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

# Adresses dérivées de programmes (PDAs)

Les adresses dérivées de programmes (PDA) sont des comptes qui sont conçus pour être contrôlés par un programme spécifique. Avec les PDAs, les programmes peuvent signer, de manière programmée, pour certaines adresses sans avoir besoin d'une clé privée. Les PDAs servent de base à [l'invocation inter-programmes](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations), qui permet aux applications de Solana d'être composables les unes avec les autres.

## Faits

::: tip Fiche d'Information
- Les PDAs sont des chaînes de caractères de 32 bytes qui ressemblent à des clés publiques, mais qui n'ont pas de clés privées correspondantes
- `findProgramAddress` dérivera de manière déterministe un PDA à partir d'un programId et de seeds (collection de bytes)
- Un bump (un byte) est utilisé pour déplacer un PDA potentiel hors de la courbe elliptique ed25519
- Les programmes peuvent signer pour leurs PDAs en fournissant les seeds et le bump à l'[invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)
- Un PDA ne peut être signé que par le programme dont il est dérivé
- En plus de permettre aux programmes de signer pour différentes instructions, les PDAs fournissent aussi une interface de type hashmap pour les [indexing accounts](../guides/account-maps.md)
:::

## Examen plus approfondi

Les PDAs sont un élément essentiel pour le développement de programmes sur Solana. Avec les PDAs, les programmes peuvent signer pour des comptes tout en garantissant qu'aucun utilisateur externe ne pourrait également générer une signature valide pour le même compte. En plus de la signature des comptes, certains programmes peuvent également modifier les comptes détenus par leurs PDAs.

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Image courtesy of <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### Génération des PDAs

Pour comprendre le concept des PDAs, il peut être utile de considérer que les PDAs ne sont pas techniquement créés, mais plutôt trouvés. Les PDAs sont générés à partir d'une combinaison de seeds (telles que la chaîne `“vote_account”`) et d'un identifiant de programme. Cette combinaison de seeds et d'identifiant de programme est ensuite exécutée par une fonction de hachage sha256 pour voir si elle génère ou non une clé publique qui se trouve sur la courbe elliptique ed25519.

En faisant passer notre identifiant de programme et nos seeds à travers une fonction de hachage, il y a environ 50 % de chances que nous obtenions une clé publique valide qui se trouve sur la courbe elliptique. Dans ce cas, nous ajoutons simplement quelque chose pour modifier un peu notre entrée et nous réessayons. Le terme technique pour le quelque chose que nous rajoutons est un "bump". Dans Solana, nous commençons par bump = 255 et itérons simplement en soustrayant 1 à chaque fois, nous utilisons ainsi bump = 254, bump = 253, etc. jusqu'à ce que nous obtenions une adresse qui n'est pas sur la courbe elliptique. Cela peut sembler rudimentaire, mais une fois trouvé, cela nous donne un moyen déterministe de dériver le même PDA encore et encore.

![Le PDA sur la courbe elliptique](./pda-curve.png)

### Interaction avec les PDAs

Quand un PDA est généré, `findProgramAddress` retournera à la fois l'adresse et le bump utilisé pour déplacer celle-ci hors de la courbe elliptique. Avec ce bump, un programme peut alors [signer](../references/accounts.md#sign-with-a-pda) pour toute instruction qui requiert son PDA. Afin de signer, les programmes doivent passer l'instruction, la liste des comptes, ainsi que les seeds et le bump utilisés pour dériver le PDA à `invoke_signed`. En plus de signer pour les instructions, les PDAs doivent également signer leur propre création avec `invoke_signed`.

Lors de la création de PDAs, il est courant de [stocker le bump et les seeds](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100) dans les données du compte lui-même. Cela permet ainsi aux développeurs de valider facilement un PDA sans avoir à transmettre en argument de l'instruction le bump.

## Autres Ressources
- [Documentation officielle](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Comprendre les Adresses Dérivées de Programmes](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
