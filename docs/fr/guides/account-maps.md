---
title: Maps de Comptes
head:
  - - meta
    - name: title
      content: Solana Cookbook | Comment utiliser les Maps de comptes
  - - meta
    - name: og:title
      content: Solana Cookbook | Comment utiliser les Maps de comptes
  - - meta
    - name: description
      content: Les structures Map (clé/valeur) sont couramment utilisées pour stocker des données. Apprenez à utiliser la structure Map dans le Solana cookbook.
  - - meta
    - name: og:description
      content: Les structures Map (clé/valeur) sont couramment utilisées pour stocker des données. Apprenez à utiliser la structure Map dans le Solana cookbook.
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

# Maps de Comptes

Les Maps sont des structures de données qui sont fréquemment utilisées en programmation pour associer une **clé** à une **valeur** quelconque. La clé et la valeur peuvent être de n'importe quel type. De plus, la clé sert d'identifiant pour une valeur donnée qui est sauvegardée. Ensuite, selon la clé donnée, elle nous permet d'insérer, de récupérer et de mettre à jour efficacement sa valeur.

Le modèle de compte Solana, comme nous le savons, exige que les données du programme et ses données d'état correspondantes soient stockées dans des comptes différents. Ces comptes ont une adresse associée. Ce qui, en soi, fait office de map ! Découvrez le modèle de compte de Solana [ici][AccountCookbook].

Il serait donc logique de stocker vos **valeurs** dans des comptes distincts, dont l'adresse serait la **clé** nécessaire pour récupérer la valeur. Mais cela soulève quelques problèmes, tels que :

* Les adresses mentionnées ci-dessus ne seront très probablement pas des **clés** idéales, dont vous pourriez vous souvenir et récupérer la valeur requise.

* Les adresses mentionnées ci-dessus font référence à des clés publiques de différentes **Paires de Clés**, où chaque clé publique (ou *adresse*) est associée à une **clé privée**. Cette clé privée serait nécessaire pour signer différentes instructions si et quand cela est nécessaire, ce qui nous obligerait à stocker la clé privée quelque part, ce qui n'est absolument **pas** recommandé !

Cela présente un problème auquel de nombreux développeurs Solana sont confrontés, à savoir l'implémentation d'une logique de type `Map` dans leurs programmes. Voyons comment nous pourrions aborder ce problème.

## Dérivation des PDAs

PDA signifie [Program Derived Address (Adresse Dérivée du Programme)][PDA] et sont, en bref, des adresses **dérivées** d'un ensemble de seeds et d'un identifiant de programme (ou _adresse_).

La particularité des PDAs est que ces adresses ne sont **pas** associées à une clé privée. Cela est dû au fait que ces adresses ne se trouvent pas sur la courbe ED25519. Par conséquent, **seul** le programme, dont cette _adresse_ a été dérivée, peut signer une instruction avec la clé, pourvu que les seeds soient également fournies. Plus d'informations à ce sujet [ici][CPI].

Maintenant que nous avons une idée de ce que sont les PDAs, utilisons-les pour mapper quelques comptes ! Nous allons prendre l'exemple d'un programme de **Blog** pour montrer comment cela pourrait être mis en œuvre.

Dans ce programme de Blog, nous souhaitons que chaque `Utilisateur` ait un seul `Blog`. Ce blog peut avoir un nombre quelconque de "Posts". Cela signifie que nous **mappons** chaque utilisateur à un blog, et que chaque post est **mappé** à un certain blog.

En bref, il existe une correspondance "1:1" entre un utilisateur et son blog, et une correspondance "1:N" entre un blog et ses articles.

Pour la correspondance `1:1`, nous voudrions que l'adresse d'un blog soit dérivée **uniquement** de son utilisateur, ce qui nous permettrait de retrouver un blog, étant donné son autorité (ou _utilisateur_). Ainsi, les seeds d'un blog seraient constituées de sa **clé d'autorité**, et éventuellement d'un préfixe **"blog"** pour servir d'identifiant de type.

Pour la correspondance `1:N`, nous voudrions que l'adresse de chaque post soit dérivée **non seulement** du blog auquel il est associé, mais aussi d'un autre **identifiant** qui nous permet de faire la différence entre un nombre `N` de posts de blog. Dans l'exemple ci-dessous, l'adresse de chaque post est dérivée de la **clé du blog**, d'un **slug** pour identifier chaque post, et d'un préfixe **"post"** qui sert d'identifiant de type. 

Le code est le suivant : 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Côté client, vous pouvez utiliser `PublicKey.findProgramAddress()` pour obtenir les adresses de compte `Blog` et `Post` nécessaires, que vous pouvez ensuite passer dans `connection.getAccountInfo()` pour récupérer les données du compte. Un exemple est présenté ci-dessous :

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Compte de Map Unique 

Une autre façon d'implémenter le mappage serait d'avoir une structure de données `BTreeMap` explicitement stockée dans un compte unique. L'adresse de ce compte peut être un PDA ou la clé publique d'une Paire de Clés générée.

Cette méthode de mappage des comptes n'est pas idéale pour les raisons suivantes :

* Vous devrez d'abord initialiser le compte stockant le `BTreeMap`, avant de pouvoir y insérer les paires clé-valeur nécessaires. Ensuite, vous devrez également stocker l'adresse de ce compte quelque part, afin de la mettre à jour à chaque fois.

* Il y a des limites de mémoire pour un compte. En effet, un compte peut avoir une taille maximale de **10 megabytes** ce qui empêche le `BTreeMap` de stocker un grand nombre de paires clé-valeur.

Ainsi, après avoir étudié votre cas d'utilisation, vous pouvez mettre en œuvre cette méthode comme indiqué ci-dessous :

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Le code côté client pour tester le programme ci-dessus ressemblerait à quelque chose comme indiqué ci-dessous :

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address