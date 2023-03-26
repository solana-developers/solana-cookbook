---
title: Comptes
head:
  - - meta
    - name: title
      content: Solana Cookbook | Références sur les comptes
  - - meta
    - name: og:title
      content: Solana Cookbook | Références sur les comptes
  - - meta
    - name: description
      content: Découvrez les comptes sur Solana et comment les utiliser dans vos programmes.
  - - meta
    - name: og:description
      content: Découvrez les comptes sur Solana et comment les utiliser dans vos programmes.
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

# Comptes

## Comment créer un compte de système

Créez un compte que le [Programme du Système][1] possède. Le runtime de Solana donnera au propriétaire du compte l'accès à l'écriture des données et au transfert des lamports. Lors de la création d'un compte, nous devons pré-allouer un espace de stockage fixe en bytes (`space`) et suffisamment de lamports pour couvrir la rente. La [Rente][2] est un coût encouru pour maintenir les comptes en vie sur Solana.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment calculer les frais de compte

Garder les comptes en vie sur Solana engendre un coût de stockage appelé [rente][2]. Il est possible de rendre un compte entièrement exempt
du paiement de la rente en déposant au moins deux ans de rente. Pour le calcul, vous devez prendre en compte
la quantité de données que vous avez l'intention de stocker dans le compte.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Comment créer des comptes avec des seeds

Il est possible d'utiliser `createAccountWithSeed` pour gérer vos comptes au lieu de créer un tas de paires de clés (Keypair) différentes.

### Générer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Créer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Transférer

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Seul un compte appartenant au programme du système peut transférer via le programme du système.
:::

## Comment créer des PDAs

[Les Adresse Dérivées du Programme (PDAs)][3] sont comme des adresses normales mais avec les différences suivantes :

1. Elles sont en dehors de la courbe ed25519
2. Il faut utiliser un programme pour signer au lieu d'une clé privée

**Remarque**: Les comptes PDAs ne peuvent être créés que dans les programmes. L'adresse peut être créée côté client.

::: tip
Bien que le PDA soit dérivé par l'identifiant d'un programme, cela ne signifie pas que le PDA est la propriété de ce programme. (Par exemple, vous pouvez initialiser votre PDA en tant que compte de jetons, qui est un compte appartenant au programme de jetons).
:::

### Générer un PDA

`findProgramAddress` ajoutera un byte supplémentaire à la fin de votre seed.
Celui-ci part de 255 jusqu'à 0 et renvoie la première clé publique hors-courbe.
Vous obtiendrez toujours le même résultat si vous passez le même identifiant de programme et la même seed.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Créer un PDA

Vous trouverez ci-dessous un exemple de programme pour créer un compte PDA appartenant au programme et un exemple pour appeler le programme avec le client.

#### Programme

L'exemple ci-dessous montre une instruction unique `system_instruction::create_account` qui crée un compte avec une taille de données allouées `space`, un montant de lamports `rent_lamports` pour le PDA dérivé. Ceci est signé avec le PDA en utilisant `invoke_signed` de façon similaire à ce qui a été dit plus haut.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment signer avec un PDA

Les PDAs ne peuvent être signés que dans un programme. Vous trouverez ci-dessous un exemple de programme permettant de signer avec un PDA et d'appeler le programme avec le client.

### Programme

L'exemple ci-dessous montre une instruction unique qui transfère les SOL d'un PDA qui a été dérivé par la graine `escrow` à un compte. `invoke_signed` est utilisé pour signer avec le PDA.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment obtenir les comptes du programme

Retourne tous les comptes appartenant à un programme. Reportez-vous à la [section guides](../guides/get-program-accounts.md) pour plus d'informations sur `getProgramAccounts` et sa configuration.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Comment fermer des comptes

Vous pouvez fermer un compte (effacer toutes les données stockées) en retirant tous les SOL détenus par ce compte. (vous pouvez vous référer à [rente][2] pour plus d'informations)

#### Programme


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Client

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment obtenir le solde d'un compte

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Si vous voulez obtenir un solde de jetons, vous devez connaître l'adresse du compte de jetons. Pour plus d'informations, voir [Références des Jetons](token.md)
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
