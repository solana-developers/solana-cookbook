---
title: Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Transactions
  - - meta
    - name: description
      content: Les transactions sont un ensemble d'instructions au sein de Solana. Découvrez les Transaction et d'autres concepts fondamentaux dans le Solana Cookbook.
  - - meta
    - name: og:description
      content: Plusieurs instructions au sein de Solana peuvent être regroupées en une seule unité appelée Transaction. Découvrez les Transaction et d'autres concepts fondamentaux dans le Solana Cookbook.
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

# Transactions

Les clients peuvent invoquer des [programmes](./programs.md) en soumettant une transaction à un cluster. Une seule transaction peut comprendre plusieurs instructions, chacune ciblant son propre programme. Lorsqu'une transaction est soumise, Le [Runtime](https://docs.solana.com/developing/programming-model/runtime) de Solana va traiter ses instructions dans l'ordre et de manière atomique. Si le traitement d'au moins une instruction échoue, c'est l'ensemble de la transaction qui échouera.

## Faits

::: tip Fiche d'Information
- Les instructions sont l'unité de base du fonctionnement de Solana
- Chaque instruction contient :
    - Le `program_id` du programme visé
    - Un tableau de tous les `accounts` (comptes) dans lesquels il a l'intention de lire ou d'écrire
    - Un tableau d'octets `instruction_data` qui est spécifique au programme visé
- Plusieurs instructions peuvent être regroupées en une seule transaction
- Chaque transaction contient :
    - Un tableau de tous les `accounts` (comptes) dans lesquels il a l'intention de lire ou d'écrire
    - Une ou plusieurs `instructions`
    - Un `blockhash` (hash de blocs) récent
    - Une ou plusieurs `signatures`
- Les instructions sont traitées dans l'ordre et de manière atomique
- Si le traitement d'au moins une instruction échoue, c'est l'ensemble de la transaction qui échouera.
- Les transactions sont limitées à 1232 octets
:::

## Examen plus approfondi

Le Runtime de Solana nécessite que les instructions et les transactions spécifient une liste de tous les comptes dans lesquels elles ont l'intention de lire ou d'écrire. En exigeant ces comptes à l'avance, le runtime est capable de paralléliser l'exécution de toutes les transactions.

Lorsqu'une transaction est soumise à un cluster, le runtime traite ses instructions dans l'ordre et de manière atomique. Pour chaque instruction, le programme utilisé interprète le tableau de données et opère sur les comptes spécifiés. Le programme retournera soit un message de succès, soit un code d'erreur. Si une erreur est retournée, l'ensemble de la transaction échoue instantanément.

Toute transaction visant à débiter un compte ou à modifier ses données nécessite la signature de son propriétaire. Tout compte qui sera modifié sera marqué comme `writable`. Un compte peut être crédité sans l'autorisation de son propriétaire à condition que le payeur des frais de transaction couvre les frais de rente et les frais de transaction nécessaires.

Avant d'être soumises, toutes les transactions doivent faire référence à un [hash de blocs récent](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash). Le hash de blocs récent est utilisé pour éviter les doublons et éliminer les transactions obsolètes. L'âge maximal que peut avoir le hash de blocs d'une transaction est de 150 blocs ou environ 1 minute et 19 secondes au moment où nous écrivons ces lignes.

### Frais

Le réseau Solana perçoit deux types de frais :
- [Les frais de transaction](https://docs.solana.com/transaction_fees) pour propager les transactions sur la blockchain (aka “frais de gas” ou “gas fees”)
- [Les frais de rente](https://docs.solana.com/developing/programming-model/accounts#rent) pour le stockage des données sur la blockchain 

Dans Solana, les frais de transaction sont déterministes : il n'existe pas de concept de marché des frais dans lequel les utilisateurs peuvent payer des frais plus élevés pour augmenter leurs chances d'être inclus dans le bloc suivant. Au moment où nous écrivons ces lignes, les frais de transaction sont déterminés uniquement par le nombre de signatures requises (i.e. `lamports_per_signature`), et non par la quantité de ressources utilisées. Cela est dû au fait qu'il existe actuellement une limite maximale de 1232 bytes pour toutes les transactions.

Toutes les transactions nécessitent qu'il y ait au moins un compte `writable` (accessible en écriture) pour signer la transaction. Une fois soumise, le compte signataire accessible en écriture qui est sérialisé en premier sera le payeur des frais. Ce compte paiera le coût de la transaction, que celle-ci réussisse ou échoue. Si le payeur des frais ne dispose pas d'un solde suffisant pour payer les frais de transaction, la transaction sera abandonnée.

Au moment où nous écrivons ces lignes, 50 % de tous les frais de transaction sont perçus par le validateur qui produit le bloc, tandis que les 50 % restants sont brûlés. Ce mécanisme a pour but d'inciter les validateurs à traiter le plus grand nombre possible de transactions pendant les créneaux qui leur sont attribués dans le calendrier des leaders.

## Autres Ressources

- [Documentation officielle](https://docs.solana.com/developing/programming-model/transactions)
- [Structure des Transactions](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Frais de transactions par Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [Une Introduction à la Blockchain Solana par Hana](https://2501babe.github.io/posts/solana101.html)
- [Traitement des Transactions par Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Les Transactions sur Solana en profondeur par Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
