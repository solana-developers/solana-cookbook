---
title: Sérialisation des données
head:
  - - meta
    - name: title
      content: Solana Cookbook | Sérialisation des données
  - - meta
    - name: og:title
      content: Solana Cookbook | Sérialisation des données
  - - meta
    - name: description
      content: Apprenez à sérialiser et à désérialiser des données sur Solana
  - - meta
    - name: og:description
      content: Apprenez à sérialiser et à désérialiser des données sur Solana
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

# Sérialisation des données

Lorsque nous parlons de sérialisation, nous parlons aussi bien de la sérialisation des données que de leur désérialisation.

La sérialisation entre en jeu à certains moments du cycle de vie des comptes de programmes et du 
programme de Solana :

1. Sérialisation des données d'instruction côté client
2. Désérialiser des données d'instruction dans le programme
3. Sérialisation des données du compte dans le programme
4. Désérialisation des données du compte côté client

Il est important que les actions ci-dessus soient toutes prises en charge par la même approche de sérialisation. Les snippets inclus montrent la sérialisation en utilisant [Borsh](#ressources).

Les exemples figurant dans la suite de ce document sont des extraits du [modèle de programme CLI de Solana](#ressources)

## Configuration pour la sérialisation avec Borsh

Les bibliothèques pour Borsh doivent être configurées pour le programme Rust, le client Rust, Node et/ou le client Python.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/serialization/setup/Cargo.program.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/serialization/setup/Cargo.cli.en.toml)

  </CodeGroupItem>

  <CodeGroupItem title="Node Client" active>

@[code](@/code/serialization/setup/Node.package.en.json)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/setup/requirements.txt)

  </CodeGroupItem>

</CodeGroup>

## Comment sérialiser les données d'instruction côté client

<img src="./serialization/ser1.png" alt="Serialize Instruction Data">

Si vous sérialisez des données d'instructions sortantes pour les envoyer à un programme, vous devez tenir compte de la manière dont le programme désérialise les données d'instruction entrantes.

Dans ce modèle, un bloc de données d'instruction est un tableau sérialisé qui contient par exemple :

| Instruction (Indice variable) | Clé de sérialisation                    |  Valeur sérialisée                  |
| ----------------------------- | --------------------------------------- | ----------------------------------- |
| Initialize (0)                | non applicable pour l'instruction       | non applicable pour l'instruction   |
| Mint (1)                      | "foo"                                   | "bar"                               |
| Transfer (2)                  | "foo"                                   | non applicable pour l'instruction   |
| Burn (2)                      | "foo"                                   | non applicable pour l'instruction   |

Dans l'exemple suivant, nous supposons que le compte propriétaire du programme a été initialisé

<CodeGroup>
  <CodeGroupItem title="TS Client" active>

@[code](@/code/serialization/instruction/ts.client.mint.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python Client" active>

@[code](@/code/serialization/instruction/python.client.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client">

@[code](@/code/serialization/instruction/rust.client.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Comment désérialiser les données d'instruction dans le programme

<img src="./serialization/ser2.png" alt="Deserialize Instruction Data">
<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/instruction/rust.program.instruction.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Comment sérialiser des données du compte dans le programme

<img src="./serialization/ser3.png" alt="Account Data Serialization">

Le bloc de données du compte du programme (provenant du répertoire d'exemples) est structuré comme suit

| Byte 0                   | Bytes 1-4                          | Bytes restants jusqu'à 1019                       |
| ------------------------ | ---------------------------------- | ------------------------------------------------- |
| Drapeau d'initialisation | longueur de la BTreeMap sérialisée | BTreeMap (où les paires clé-valeur sont stockées) |

### Pack

Un mot sur le trait [Pack][1]

Le trait pack permet de cacher plus facilement les détails de la sérialisation/désérialisation des données de compte dans les instructions de traitement de votre programme principal. Ainsi, au lieu de mettre tout le processus de sérialisation/désérialisation dans le code de traitement du programme, il encapsule les détails derrière (3) fonctions :

1. `unpack_unchecked` - Permet de désérialiser un compte sans vérifier s'il a été initialisé. Ceci est utile lorsque vous traitez la fonction d'initialisation (indice 0).
2. `unpack` - Appelle votre implémentation de `unpack_from_slice` et vérifie si le compte a été initialisé
3. `pack` - Appelle votre implémentation de `pack_into_slice`

Voici l'implémentation du trait Pack pour notre programme d'exemple. Vient ensuite le traitement effectif des données du compte à l'aide de borsh.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.packimpl.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Sérialisation/Désérialisation

Pour compléter la sérialisation et la désérialisation sous-jacentes :

1. `sol_template_shared::pack_into_slice` - Où la sérialisation se produit effectivement
2. `sol_template_shared::unpack_from_slice` - Où la désérialisation se produit effectivement

**Veuillez noter** que dans ce qui suit, nous avons une partition `u32` (4 bytes) dans la configuration des données pour 
`BTREE_LENGTH` qui précède `BTREE_STORAGE`. Cela est dû au fait que borsh, pendant la désérialisation, vérifie que la longueur de la portion que vous désérialisez correspond à la quantité de données qu'il lit avant de recombiner effectivement l'objet de réception. L'approche présentée ci-dessous lit d'abord le `BTREE_LENGTH` pour obtenir la taille à `slice` à partir du pointeur `BTREE_STORAGE`.

<CodeGroup>
  <CodeGroupItem title="Rust Program">

@[code](@/code/serialization/program/rust.program.serdeser.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Utilisation

Ce qui suit regroupe tout cela et montre comment le programme interagit avec le `ProgramAccountState` qui encapsule le drapeau d'initialisation ainsi que le `BTreeMap` correspondant à nos paires clé/valeur.

D'abord quand nous voulons initialiser un tout nouveau compte :

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.initialize.en.rs)

  </CodeGroupItem>
</CodeGroup>

Nous pouvons maintenant opérer sur nos autres instructions comme nous pouvons le voir en créant une nouvelle paire clé/valeur que nous avons précédemment montrée lors de l'envoi d'instructions depuis un client :

<CodeGroup>
  <CodeGroupItem title="Rust">

@[code](@/code/serialization/program/rust.program.mint.en.rs)

  </CodeGroupItem>
</CodeGroup>

[1]: https://github.com/solana-labs/solana/blob/22a18a68e3ee68ae013d647e62e12128433d7230/sdk/program/src/program_pack.rs

## Comment désérialisation des données du compte côté client

Les clients peuvent appeler Solana pour récupérer un compte appartenant à un programme, dans lequel le bloc de données sérialisées fait partie du résultat. La désérialisation nécessite de connaître la structure des blocs de données.

Celle-ci a été décrite [Ici](#account-data-serialization)

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/clientdata/ts.client.data.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/clientdata/python.client.data.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/clientdata/rust.client.data.en.rs)

  </CodeGroupItem>
</CodeGroup>

## Mappages courants de Solana TS/JS

La [Spécification de Borsh](#ressources) contient la plupart des mappages pour les types de données primitifs et composés.

La clé pour TS/JS et Python est la création d'un schéma Borsh avec une définition appropriée afin que les fonctions de sérialisation et de désérialisation puissent générer ou parcourir les entrées respectives.

Nous présentons ici la sérialisation de primitives (nombres, chaînes de caractères) et de types composés (tableau à taille fixe, Map) d'abord en Typescript, puis en Python et enfin la désérialisation équivalente du côté de Rust :

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/primitives/demo_primitives.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Python" active>

@[code](@/code/serialization/primitives/python.demo_primitives.py)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/primitives/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Constructions Avancées

Nous avons montré comment créer des chargements simples dans les exemples précédents. Cette section montrera le mappage approprié entre TS/JS et Rust pour les gérer.

### COption

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/serialization/coption/demo_coption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/serialization/coption/src/main.rs)

  </CodeGroupItem>
</CodeGroup>

## Ressources

- [Spécification de Borsh](https://borsh.io/)
- [Rust Borsh](https://github.com/near/borsh-rs)
- [TS/JS Borsh](https://github.com/near/borsh-js)
- [Python Borsh](https://github.com/near/borsh-construct-py)
- [Documentation de Python Borsh](https://near.github.io/borsh-construct-py/)
- [Modèle de programme CLI de Solana](https://github.com/hashblock/solana-cli-program-template)
