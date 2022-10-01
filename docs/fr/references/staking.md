---
title: Staking
head:
  - - meta
    - name: title
      content: Solana Cookbook | Staking
  - - meta
    - name: og:title
      content: Solana Cookbook | Staking
  - - meta
    - name: description
      content: Stakez des SOL et gagnez des récompenses en contribuant à sécuriser le réseau.
  - - meta
    - name: og:description
      content: Stakez des SOL et gagnez des récompenses en contribuant à sécuriser le réseau. Découvrez la Création de Comptes de Stake, la Délégation de Stake, le Retrait de Stake, et d'autres références pour construire sur Solana dans le Solana cookbook.
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

# Staking

## Obtenir les Validateurs Actuels

Il est possible de staker des SOL et d'obtenir des récompenses en aidant à sécuriser le réseau. Pour staker, nous déléguons les SOL à des validateurs qui, à leur tour, traitent les transactions.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Créer un Compte de Stake

Toutes les instructions de staking sont traitées par le [Programme de Stake (Stake Program)](https://docs.solana.com/developing/runtime-facilities/programs#stake-program). Pour commencer, nous créons un [Compte de Stake (Stake Account)](https://docs.solana.com/staking/stake-accounts) qui est créé et géré différemment d'un [compte système (system account)](accounts.md#comment-créer-un-compte-de-système) standard. En particulier, nous devons définir la `Stake Authority` (Autorité de Stake) et la `Withdrawal Authority` (Autorité de Retrait) du compte.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/create-stake-account/create-stake-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/create-stake-account/create-stake-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Déléguer un Stake

Une fois qu'un compte de stake est alimenté, la `Stake Authority` peut le déléguer à un validateur. Chaque compte de stake ne peut être délégué qu'à un seul validateur à la fois. De plus, tous les jetons du compte doivent être soit délégués, soit non-délégués. Une fois délégué, il faut plusieurs époques pour qu'un compte de stake devienne actif.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/delegate-stake/delegate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/delegate-stake/delegate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Obtenir les Délégués par Validateurs

Plusieurs comptes peuvent avoir staké sur un compte validateur en particulier. Pour récupérer tous les stakers, nous allons utiliser l'API `getProgramAccounts` ou `getParsedProgramAccounts`. Reportez-vous à la [section des guides](/guides/get-program-accounts.html) pour plus d'informations. Les comptes de stake ont une longueur de 200 bytes et la clé publique de l'électeur commence à 124 octets. [Référence](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Désactiver le Stake

À tout moment après la délégation d'un compte de stake, la  `Stake Authority` peut choisir de désactiver le compte. La désactivation peut prendre plusieurs époques pour s'achever, et elle est nécessaire avant le retrait de tout SOL.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/deactivate-stake/deactivate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/deactivate-stake/deactivate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Retirer le Stake

Une fois désactivé, la `Withdrawal Authority` peut retirer les SOL sur un compte système. Lorsqu'un compte de stake n'est plus délégué et que son solde est de 0 SOL, il est effectivement détruit.

<!-- <CodeGroup>
  <CodeGroupItem title="TS" active> -->
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/withdraw-stake/withdraw-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/withdraw-stake/withdraw-stake.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>
