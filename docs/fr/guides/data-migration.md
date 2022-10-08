---
title: Migration des Comptes de Données de Programmes
head:
  - - meta
    - name: title
      content: Solana Cookbook | Migration des Comptes de Données de Programmes
  - - meta
    - name: og:title
      content: Solana Cookbook | Migration des Comptes de Données de Programmes
  - - meta
    - name: description
      content: Versionner des données en vue d'une migration signifie créer une référence unique pour un ensemble de données. Cette référence peut prendre la forme d'une requête, d'un ID ou, plus couramment une date. Découvrez la Sérialisation et plus d'Ingrédients pour votre plat dans le Solana cookbook.
  - - meta
    - name: og:description
      content: Versionner des données en vue d'une migration signifie créer une référence unique pour un ensemble de données. Cette référence peut prendre la forme d'une requête, d'un ID ou, plus couramment une date. Découvrez la Sérialisation et plus d'Ingrédients pour votre plat dans le Solana cookbook.
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

# Migration des Comptes de Données d'un Programme

## Comment migrer les comptes de données d'un programme ?

Lorsque vous créez un programme, chaque compte de données associé à celui-ci aura une structure de données spécifique. Si vous devez un jour mettre à jour un compte dérivé de programme, vous vous retrouverez avec plusieurs comptes dérivés de programme restants avec l'ancienne structure.

Grâce à la gestion des versions de comptes, vous pouvez mettre vos anciens comptes à jour vers la nouvelle structure.

:::tip Remarque
Ce n'est qu'une des nombreuses façons de migrer des données de comptes.
:::

## Scénario

Pour versionner et migrer les données de nos comptes, nous allons fournir un **id** pour chaque compte. Cet id nous permettra d'identifier la version du compte lorsque nous le transmettrons au programme, et ainsi de le traiter correctement.

Prenez l'état du compte et le programme suivants :

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Dans notre première version de compte, nous faisons ce qui suit :

| ID | Action |
| - | - |
|1| Inclure un champ "version des données (data version)" dans les données. Il peut s'agir d'un simple nombre que l'on incrémente (par exemple, u8) ou de quelque chose de plus sophistiqué
|2| Allocation d'un espace suffisant pour la croissance des données
|3| Initialisation d'un certain nombre de constantes à utiliser entre les différentes versions du programme
|4| Ajout d'une fonction de mise à jour du compte sous `fn conversion_logic` pour les futures mises à jour

Supposons que nous voulions mettre à jour les comptes de notre programme afin d'inclure un nouveau champ obligatoire, le champ `somestring`.

Si nous n'avons pas alloué d'espace supplémentaire sur l'ancien compte, nous ne pourrions pas mettre à jour le compte et nous serions bloqués.

## Mise à jour du Compte

Dans notre nouveau programme, nous voulons ajouter une nouvelle propriété pour l'état du contenu. Les modifications ci-dessous montrent comment nous avons profité de la structure initiale du programme pour ajouter le nouveau champ.

### 1. Ajouter une logique de conversion de compte

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Ligne(s) | Note |
| ------- | - |
| 6 | Nous avons ajouté la fonction `solana_program::borsh::try_from_slice_unchecked` de Solana pour simplifier la lecture de sous-ensembles de données d'un bloc de données plus grand
| 13-26| Ici, nous avons conservé l'ancienne structure de contenu, `AccountContentOld` ligne 24, avant d'étendre le `AccountContentCurrent` à partir de la ligne 17.
| 60 | Nous actualisons la constante `DATA_VERSION`
| 71 | Nous avons maintenant une version "précédente" et nous voulons connaître sa taille
| 86 | Le coup de grâce consiste à ajouter la tuyauterie pour mettre à jour le contenu de l'état précédent vers le nouveau contenu de l'état (actuel).

Nous mettons alors à jour nos instructions, pour en ajouter une nouvelle pour mettre à jour `somestring`, et un processeur pour gérer la nouvelle instruction. Notez que la "mise à jour" de la structure de données est encapsulée derrière `pack/unpack`.

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

Après avoir construit et soumis une instruction : `VersionProgramInstruction::SetString(String)` nous avons maintenant la structure de données de compte "mise à jour" suivante

<img src="./data-migration/pav2.png" alt="Program Account v2">

## Ressources

* [Spécification de Borsh](https://borsh.io/)
* [`try_from_slice_unchecked` de Solana](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Implémentation de Référence](https://github.com/FrankC01/versioning-solana)