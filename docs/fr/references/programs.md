---
title: Écrire des Programmes
head:
  - - meta
    - name: title
      content: Solana Cookbook | Références du programme Solana
  - - meta
    - name: og:title
      content: Solana Cookbook | Références du programme Solana
  - - meta
    - name: description
      content: Apprenez à écrire des programmes sur Solana, avec des références sur l'invocation croisée de programmes, la lecture des comptes, etc.
  - - meta
    - name: og:description
      content: Apprenez à écrire des programmes sur Solana, avec des références sur l'invocation croisée de programmes, la lecture des comptes, etc.
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
---

# Écrire des Programmes

## Comment transférer SOL dans un programme

Votre Programme Solana peut transférer des lamports d'un compte à un autre sans "invoquer" le programme du Système (System program). La règle fondamentale est que votre programme peut transférer des lamports de n'importe quel compte **appartenant** à votre programme vers n'importe quel compte.

Le compte destinataire *ne doit pas nécessairement être* un compte appartenant à votre programme.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## Comment obtenir une référence à l'horloge dans un programme

L'obtention d'une horloge peut se faire de deux manières

1. Passer `SYSVAR_CLOCK_PUBKEY` dans une instruction
2. Accéder à l'Horloge directement à l'intérieur d'une instruction.

Il est bon de connaître les deux méthodes, car certains programmes hérités attendent toujours la `SYSVAR_CLOCK_PUBKEY` comme compte.

### Passer l'Horloge comme un compte dans une instruction

Créons une instruction qui reçoit un compte pour l'initialisation et la clé publique de sysvar

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Maintenant nous passons l'adresse publique sysvar de l'horloge via le client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Accéder à l'horloge directement dans une instruction

Créons la même instruction, mais sans exiger la `SYSVAR_CLOCK_PUBKEY` du côté client.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

L'instruction côté client ne doit plus transmettre que les comptes de l'état et du payeur.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment modifier la taille d'un compte

Vous pouvez modifier la taille d'un compte propriétaire d'un programme en utilisant `realloc`. `realloc` peut redimensionner un compte jusqu'à 10KB.
Lorsque vous utilisez `realloc` pour augmenter la taille d'un compte,
vous devez transférer des lamports afin de garder ce compte
exempt de rente.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment faire l'Invocation de Programme Croisé

Une invocation de programme croisé est tout simplement l'appel d'une instruction d'un autre programme dans notre programme. Le meilleur exemple à mettre en avant est la fonctionnalité `swap` d'Uniswap. Le contrat `UniswapV2Router` appelle la logique nécessaire pour faire le swap et appelle la fonction de transfert du contrat `ERC20` pour effectuer l'échange d'une personne à une autre. De la même manière, on peut appeler l'instruction d'un programme pour avoir une multitude de buts.

Examinons notre premier exemple qui est l'instruction de `transfert du Programme de Jetons SPL`. Les comptes requis pour qu'un transfert ait lieu sont les suivants

1. Le Compte de Jetons Source (Le compte sur lequel nous détenons nos jetons)
2. Le Compte de Jetons de Destination (Le compte vers lequel nous souhaitons transférer nos jetons)
3. Le Propriétaire du Compte de Jetons Source (L'adresse de notre portefeuille avec lequel nous signerons)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
<br />
L'instruction client correspondante serait la suivante. Pour connaître les instructions de création de mint et de jetons, veuillez vous référer au code complet.
<br />
<br />
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Maintenant, regardons un autre exemple qui est l'instruction `create_account du Programme du Système`. Il y a une légère différence entre l'instruction mentionnée ci-dessus et celle-ci. Ici, nous n'avons pas à passer le `token_program` comme l'un des comptes dans la fonction `invoke`. Cependant, il y a des exceptions où vous devez transmettre le `program_id` de l'instruction invoquante. Dans notre cas, il s'agit du program_id du `Programme du Système`. ("11111111111111111111111111111111"). Ainsi, les comptes requis seraient les suivants

1. Le compte payeur qui paie la rente
2. Le compte qui va être créé
3. Le compte du Programme du Système

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Le code côté client correspondant sera le suivant

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment créer un PDA

Une Adresse Dérivée d'un Programme est simplement un compte appartenant au programme, mais qui n'a pas de clé privée. Au lieu de cela, sa signature est obtenue par un ensemble de seeds et un bump (un nonce qui permet de s'assurer qu'elle est en dehors de la courbe). "**Générer**" une Adresse de Programme est différent de la "**Créer**". On peut générer un PDA en utilisant `Pubkey::find_program_address`. Créer un PDA signifie essentiellement initialiser l'adresse avec de l'espace et définir l'état. Un compte Keypair normal peut être créé en dehors de notre programme et ensuite alimenté pour initialiser son état. Malheureusement, pour les PDAs, elle doit être créée sur la blockchain, car elle ne peut pas signer en son nom. Nous utilisons donc `invoke_signed` pour passer les seeds du PDA, ainsi que la signature du compte de financement, ce qui entraîne la création d'un compte PDA.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

On peut envoyer les comptes requis via le client comme suit

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment lire des comptes

Presque toutes les instructions dans Solana nécessitent au moins 2 ou 3 comptes, et ils sont mentionnés dans les gestionnaires d'instructions dans quel ordre ils attendent ces comptes. C'est assez simple si on profite de la méthode `iter()` de Rust, au lieu d'indiquer manuellement les comptes. La méthode `next_account_info` récupère le premier index de l'itérable et retourne le compte présent dans le tableau des comptes. Voyons une instruction simple qui attend un ensemble de comptes et qui demande d'analyser chacun d'entre eux.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment vérifier des comptes

Puisque les programmes dans Solana sont sans état, nous, en tant que créateur de programme, devons nous assurer que les comptes passés sont valides autant que possible pour éviter toute entrée de compte malveillant. Ainsi, les contrôles de base que l'on peut effectuer sont

1. Vérifier si le compte du signataire attendu a effectivement signé
2. Vérifier si les comptes d'état attendus ont été vérifiés comme accessibles en écriture
3. Vérifiez si le propriétaire du compte d'état attendu est l'identifiant du programme appelé
4. Si vous initialisez l'état pour la première fois, vérifiez si le compte a déjà été initialisé ou non.
5. Vérifier si tous les identifiants de programmes croisés passés (si nécessaire) sont conformes aux attentes.

Une instruction de base qui initialise un compte d'état héroïque, mais avec les contrôles mentionnés ci-dessus, est définie ci-dessous

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment lire plusieurs instructions à partir d'une transaction

Solana nous permet de consulter l'ensemble des instructions de la transaction en cours. Nous pouvons les stocker dans une variable et itérer sur eux. Nous pouvons faire beaucoup de choses avec ça, comme, par exemple, vérifier les transactions suspectes. 

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
