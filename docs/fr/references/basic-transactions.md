---
title: Envoyer des Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Envoyer des Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Envoyer des Transactions
  - - meta
    - name: description
      content: Apprenez les transactions de base comme l'envoi de SOL, l'envoi de jetons SPL, le calcul du coût de la transaction, et d'autres références pour construire sur Solana dans le Solana cookbook.
  - - meta
    - name: og:description
      content: Apprenez les transactions de base comme l'envoi de SOL, l'envoi de jetons SPL, le calcul du coût de la transaction, et d'autres références pour construire sur Solana dans le Solana cookbook.
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

# Envoyer des Transactions

## Comment envoyer des SOL

Pour envoyer des SOL, vous devez interagir avec le [SystemProgram][1].

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Python">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.py)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.rs)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program

## Comment envoyer des jetons SPL

Utilisez le [Programme de Jetons (Token Program)][1] pour transférer des jetons SPL. Pour envoyer un jeton SPL, vous devez connaître son adresse de compte de jeton SPL. Vous pouvez à la fois obtenir l'adresse et envoyer des jetons avec l'exemple suivant.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://spl.solana.com/token

## Comment calculer les coûts de transaction

Le nombre de signatures requises pour une transaction est utilisé pour calculer le le coût de la transaction. Tant que vous ne créez pas de compte, ce sera le coût final de la transaction. Pour en savoir plus sur les coûts de création d'un compte, consultez [calcul de l'exemption de la rente](accounts.md#calculating-rent-exemption)

Les deux exemples ci-dessous montrent les deux manières actuellement disponibles pour calculer le coût estimé de la transaction.

Le premier exemple utilise `getEstimatedFee`, qui est une nouvelle méthode de la classe `Transaction`, tandis que le second exemple utilise `getFeeForMessage` qui remplace `getFeeCalculatorForBlockhash` de la classe `Connection`.

### getEstimatedFee
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### getFeeForMessage
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Comment ajouter un mémo à une transaction

Toute transaction peut ajouter un message en utilisant le [programme mémo][2].
Actuellement le `programID` du **Programme Mémo** doit être ajouté manuellement `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Comment changer le budget de calcul, les frais, &amp; la priorisation d'une transaction
La priorisation d'une transaction (TX) est obtenue en payant des Frais de Priorisation en plus des Frais de Base. Par défaut, le budget de calcul est le produit de 200 000 unités de calcul (UC) * le nombre d'instructions, avec un maximum de 1,4 million d'UC. Les Frais de Base sont de 5 000 Lamports. Un microLamport est 0.000001 Lamports.

Le budget total de calcul ou les Frais de Priorisation pour une seule TX peuvent être modifiés en ajoutant des instructions du programme ComputeBudgetProgram.

`ComputeBudgetProgram.setComputeUnitPrice({ microLamports: number })` 
ajoutera des Frais de Priorisation en plus des Frais de Base (5 000 Lamports). La valeur fournie en microLamports sera multipliée par le budget de l'UC pour déterminer les Frais de Priorisation en Lamports. Par exemple, si votre budget de l'UC est de 1M d'UC, et que vous 
ajoutez 1 microLamport/UC, les Frais de Priorisation seront de 1 Lamport (1M * 0,000001). 
Les frais totaux seront alors de 5001 Lamports.

Utilisez `ComputeBudgetProgram.setComputeUnitLimit({ units: number })` pour définir le nouveau budget de calcul. La valeur fournie remplacera la valeur par défaut. 
Les transactions doivent demander la quantité minimale d'UC nécessaire à l'exécution afin de maximiser le débit ou de minimiser les frais.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.tsx))

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.rs))

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.rs))

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Exemple de journal de programme ([Explorer](https://explorer.solana.com/tx/2mNPXeoy3kFxo12L8avsEoep65S4Ehvw2sheduDrAXbmmNJwTtXNmUrb5MM3s15eki2MWSQrwyKGAUQFZ9wAGo9K/) ):

<CodeGroup>
  <CodeGroupItem title="Log Output">

  @[code](@/code/basic-transactions/compute-budget/log_output.txt)

  </CodeGroupItem>
</CodeGroup>


[2]: https://spl.solana.com/memo
