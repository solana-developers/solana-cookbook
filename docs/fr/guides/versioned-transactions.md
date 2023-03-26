---
title: Transactions Versionnées
head:
  - - meta
    - name: title
      content: Solana Cookbook | Transactions Versionnées
  - - meta
    - name: og:title
      content: Solana Cookbook | Transactions Versionnées
  - - meta
    - name: description
      content: Nouveau et meilleur format de transaction sur Solana.
  - - meta
    - name: og:description
      content: Nouveau et meilleur format de transaction sur Solana.
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

# Transactions Versionnées

Solana a récemment sorti les Transactions Versionnées. Les changements proposés sont les suivants :

1. Introduction d'un nouveau programme qui gère les tables de consultation d'adresses sur la chaîne
    
2. Ajout d'un nouveau format de transaction qui peut utiliser les tables de consultation d'adresses sur la chaîne

## Faits

::: tip Fiche d'Information
- Les transactions héritées ont un problème majeur : La taille maximale autorisée est de 1232 octets ce qui fait que le nombre de comptes qui peuvent tenir dans une transaction atomique est de maximum 35 adresses.
- Tables de Consultation d'Adresses (Address Lookup Tables, LUTs): Une fois que les comptes sont stockés dans cette table, l'adresse de la table peut être référencée dans un message de transaction utilisant des indices u8 de 1 octet.
- `createLookupTable()` de `solana/web3.js` peut être utilisé pour construire une nouvelle table de consultation, ainsi que pour déterminer son adresse.
- Une fois qu'une Table de Consultation d'Adresses est créée, elle peut être étendue, c'est-à-dire que des comptes peuvent être ajoutés à la table.
- Transactions Versionnées : La structure des transactions héritées doit être modifiée pour intégrer les Tables de Consultation d'Adresses
- Avant l'introduction du versionnage, les transactions avaient un bit supérieur inutilisé dans le premier octet de leur en-tête. Celui-ci peut être utilisé pour déclarer explicitement la version des transactions.
:::

Nous parlerons plus en détail des changements introduits ci-dessus et de ce qu'ils signifient pour les développeurs. Toutefois, pour mieux comprendre les changements, nous devons d'abord comprendre l'anatomie d'une transaction classique (ou héritée).

## Transaction Héritée

Le réseau Solana utilise une taille d'unité transactionnelle maximale (MTU) de 1280 octets, conformément aux contraintes de taille de l'[IPv6 MTU](https://en.wikipedia.org/wiki/IPv6_packet) afin de garantir la vitesse et la fiabilité. Cela laisse **1232 octets** pour les paquets de données comme les transactions sérialisées.

Une transaction est composée de :

1. Un tableau compact de signatures, où chaque signature est un [ed25519](https://ed25519.cr.yp.to/) de 64 octets.
2. Un message (hérité)
    

![Transaction Format](./versioned-transactions/tx_format.png)

::: tip Le format Tableau Compact
 
Un tableau compact est un tableau sérialisé de manière à avoir les composants suivants :
 
1. Une taille de tableau dans un encodage multi-octet appelé [Compact-u16](https://beta.docs.solana.com/developing/programming-model/transactions#compact-u16-format)
2. Suivi de chaque élément du tableau 

![Compact array format](./versioned-transactions/compact_array_format.png)
:::

## Message Hérité

Un message hérité comporte les éléments suivants :

1. Un en-tête
2. Un tableau compact d'adresses de comptes, où chaque adresse de compte occupe 32 octets
3. Un hash de bloc récent
  * un hachage SHA-256 de 32 octets utilisé pour indiquer quand le registre a été observé pour la dernière fois. Si un hash de bloc est trop vieux, les validateurs le rejettent.
4. Un tableau compact d'instructions
    
![Legacy Message](./versioned-transactions/legacy_message.png)

### En-tête

L'en-tête du message a une taille de 3 octets et contient 3 entiers u8 :

1. Le nombre de signatures requises : le runtime de Solana vérifie ce nombre avec la taille du tableau compact des signatures de la transaction.
2. Le nombre d'adresses de comptes en lecture seule qui nécessitent une signature.
3. Le nombre d'adresses de comptes en lecture seule qui ne nécessitent pas de signature.
    
![Message Header](./versioned-transactions/message_header.png)

### Tableau compact d'adresses de comptes

Ce tableau compact commence par un encodage compact-u16 du nombre d'adresses de comptes, suivi par :

1. **Adresses de compte nécessitant une signature**: Les adresses qui demandent un accès en lecture et en écriture sont listées en premier, suivies de celles qui demandent un accès en lecture seule
2. **Adresses de comptes qui ne nécessitent pas de signature**: Comme ci-dessus, les adresses qui demandent un accès en lecture et en écriture sont listées en premier, suivies de celles qui demandent un accès en lecture seule
    
![Compact array of account addresses](./versioned-transactions/compat_array_of_account_addresses.png)

### Tableau compact d'instructions

Tout comme le tableau d'adresses de comptes, ce tableau compact commence par un encodage compact-u16 du nombre d'instructions, suivi d'un tableau d'instructions. Chaque instruction du tableau comporte les éléments suivants :

1. **Identifiant du programme**: identifie un programme on-chain qui traitera l'instruction. Il est représenté par un index u8 vers une adresse dans le tableau compact d'adresses de comptes dans le message.
2. **Tableau compact d'index d'adresses de compte**: index u8 vers un sous-ensemble d'adresses de comptes dans le tableau compact des adresses de comptes qui nécessitent une signature.
3. **Tableau compact de données opaques u8**: un tableau d'octets d'usage général qui est spécifique à l'identifiant du programme mentionné précédemment. Ce tableau de données spécifie toutes les opérations que le programme doit effectuer et toute information supplémentaire que les comptes pourraient ne pas contenir.
    
![Compact array of Instructions](./versioned-transactions/compact_array_of_ixs.png)

## Problèmes liés aux Transactions Héritées

Quel est le problème avec le modèle de transaction ci-dessus ?

**La taille maximale d'une transaction, et donc le nombre de comptes qui peuvent tenir dans une seule transaction atomique.**

Comme nous l'avons vu précédemment, la taille maximale autorisée pour une transaction est de **1232 octets**. La taille d'une adresse de compte est de 32 octets. Ainsi, une transaction peut au mieux stocker **35 comptes**, en tenant compte d'un certain espace pour les en-têtes, les signatures et autres métadonnées.

![Issue with legacy transactions](./versioned-transactions/issues_with_legacy_txs.png)

Cela pose problème car il existe plusieurs cas où les développeurs doivent inclure des centaines de comptes sans signature dans une seule transaction. Cela n'est actuellement pas possible avec le modèle de transaction héritée. La solution actuellement utilisée consiste à stocker temporairement l'état sur la chaîne et à le réutiliser ultérieurement dans des transactions. Cette solution de fortune ne fonctionne pas lorsque plusieurs programmes doivent être composés en une seule transaction. Chaque programme nécessite plusieurs comptes en entrée et nous tombons donc dans le même problème que précédemment.

C'est là que les **Tables de Consultation d'Adresses (LUT)** sont utilisées.

## Tables de Consultation d'Adresses (LUT)

L'idée derrière les Tables de Consultation d'Adresses est de stocker les adresses de comptes dans une structure de données de type table (tableau) sur la chaîne. Une fois que les comptes sont stockés dans cette table, l'adresse de la table peut être référencée dans un message de transaction. Pour pointer vers un compte en particulier dans la table, un index u8 de 1 octet est nécessaire.

![LUTs](./versioned-transactions/luts.png)

Cela permet de gagner de l'espace car les adresses ne doivent plus être stockées dans le message de transaction. Ils doivent seulement être référencés sous la forme d'un index dans le tableau. Cela conduit à la possibilité de référencer 2^8=**256** comptes, car les comptes sont référencés en utilisant un index u8.

Les Tables de Consultation d'Adresses doivent être exemptes de rente lors de leur initialisation ou chaque fois qu'une nouvelle adresse est ajoutée à la table. Les adresses peuvent être ajoutées à cette table soit par un buffer on-chain, soit en les ajoutant directement à la table par l'instruction `Extension`. De plus, les Tables de Consultation d'Adresses peuvent stocker les métadonnées associées suivies d'un tableau compact de comptes. Vous pouvez voir ci-dessous la structure d'une Table de Consultation d'Adresses standard.

![LUT Format](./versioned-transactions/lut_format.png)

L'un des principaux inconvénients des Tables de Consultation d'Adresses est que, comme les recherches d'adresses nécessitent une charge supplémentaire pendant le traitement des transactions, elles entraînent généralement des coûts plus élevés pour une transaction.

## Transactions Versionnées : TransactionV0

La structure des transactions héritées doit être modifiée pour intégrer les consultations de la table d'adresses. Ces changements ne doivent pas perturber le traitement des transactions sur Solana, et ne doivent pas provoquer de changement de format des programmes invoqués.

Pour garantir cela, il est important de mentionner explicitement le type de transaction : `legacy` or `versioned`. Comment inclure ces informations dans une transaction ?

Avant l'introduction du versionnage, les transactions avaient un bit supérieur inutilisé dans le premier octet de leur en-tête : `num_required_signatures`. Nous pouvons maintenant utiliser ce bit pour déclarer explicitement la version de nos transactions.

```rust
pub enum VersionedMessage {
    Legacy(Message),
    V0(v0::Message),
}
```

Si le premier bit est fixé, les autres bits du premier octet codent un numéro de version. Solana commence avec la "Version 0", qui est la version requise pour commencer à utiliser les Tables de Consultation d'Adresses.

Si le premier bit n'est pas fixé, la transaction sera considérée comme une "transaction héritée" et le reste du premier octet sera traité comme le premier octet d'un message hérité codé.

## MessageV0

La structure du nouveau MessageV0 est plus ou moins la même, à l'exception de deux petits mais importants changements :

1. **En-tête du Message**: inchangé par rapport à celui du message hérité 
2. **Tableau compact de clés de compte**: inchangé par rapport à celui du message hérité. Nous désignerons le tableau d'indices pointant vers les éléments de ce tableau par *tableau d'indices A* (vous verrez bientôt pourquoi nous le désignons ainsi)
3. **Hash de bloc récent**: inchangé par rapport à celui du message hérité 
4. **Tableau compact d'instructions**: différent de celui du message hérité
5. **Tableau compact de consultations de tables d'adresses**: introduit dans v0
    
![Message v0](./versioned-transactions/messagev0.png)

Nous allons d'abord discuter de la structure du tableau compact de consultation de la table d'adresses avant de voir ce qui a changé dans le tableau d'instructions.

### Tableau compact de consultations de tables d'adresses

Cette structure introduit les Tables de Consultation d'Adresses (LUTs) dans les transactions versionnées, ce qui permet d'utiliser les LUTs pour intégrer plus de comptes en lecture seule et en écriture dans une seule transaction.

Le tableau compact commence par un encodage compact-u16 du nombre de consultations de la table d'adresses, suivi d'un tableau de consultations de la table d'adresses. Chaque consultation a la structure suivante :

1. **Clé de compte**: clé de compte de la table de consultation d'adresses
2. **Index modifiables en écriture**: tableau compact d'index utilisés pour intégrer les adresses de comptes modifiables en écriture. Nous désignerons ce tableau par *tableau d'indices B*.
3. **Index en lecture seule**: tableau compact d'index utilisés pour intégrer les adresses de comptes en lecture seule. Nous désignerons ce tableau par *tableau d'indices C*
    
![Compact array of LUTs](./versioned-transactions/compact_array_of_luts.png)

Voyons maintenant quels changements ont été apportés dans le tableau compact d'instructions

### Tableau compact d'instructions

Comme indiqué précédemment, le tableau compact d'instructions héritées stocke des instructions héritées individuelles qui, à leur tour, stockent les éléments suivants :

1. Index de l'identifiant du programme   
2. Tableau compact d'index d'adresses de comptes
3. Tableau compact de données opaques de 8 bits
    

Le changement dans la nouvelle instruction n'est pas dans la structure de l'instruction elle-même, mais dans le tableau utilisé pour obtenir les indices de 1 et 2. Dans les transactions héritées, un sous-ensemble du tableau d'indices A est utilisé, tandis que dans les transactions versionnées, un sous-ensemble du tableau combiné des éléments suivants est utilisé :

1. **tableau d'indices A**: Tableau compact des comptes stockés dans le message    
2. **tableau d'indices B**: Index modifiables en écriture dans la consultation de la table d'adresses
3. **tableau d'indices C**: Index en lecture seule dans la consultation de la table d'adresses
    
![New Compact array of Instructions](./versioned-transactions/new_compact_array_of_ixs.png)

## Modifications du RPC

Les réponses des transactions nécessiteront un nouveau champ correspondant à la version : `maxSupportedTransactionVersion` pour indiquer aux clients quelle structure de transaction doit être utilisée pour la désérialisation.

Les méthodes suivantes doivent être mises à jour pour éviter les erreurs :

* `getTransaction`
* `getBlock`
    

Le paramètre suivant doit être ajouté aux requêtes :

`maxSupportedTransactionVersion: 0`

Si `maxSupportedTransactionVersion` n'est pas explicitement ajouté à la requête, la version de la transaction sera fixée à `legacy`. Tout bloc qui contient une transaction versionnée sera retourné avec une erreur par le client dans le cas d'une transaction héritée.

Vous pouvez définir ces paramètres via des requêtes au format JSON adressées au point de terminaison RPC, comme ci-dessous :

```plaintext
curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d \
'{"jsonrpc": "2.0", "id":1, "method": "getBlock", "params": [430, {
  "encoding":"json",
  "maxSupportedTransactionVersion":0,
  "transactionDetails":"full",
  "rewards":false
}]}'
```

Vous pouvez également faire de même en utilisant la bibliothèque [`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/).

```js
// connect to the `devnet` cluster and get the current `slot`
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await connection.getSlot();

// get the latest block (allowing for v0 transactions)
const block = await connection.getBlock(slot, {
  maxSupportedTransactionVersion: 0,
});

// get a specific transaction (allowing for v0 transactions)
const getTx = await connection.getTransaction(
  "3jpoANiFeVGisWRY5UP648xRXs3iQasCHABPWRWnoEjeA93nc79WrnGgpgazjq4K9m8g2NJoyKoWBV1Kx5VmtwHQ",
  {
    maxSupportedTransactionVersion: 0,
  },
);
```

## Autres Ressources
* [Comment construire une Transaction Versionnée](https://beta.docs.solana.com/developing/versioned-transactions#how-create-a-versioned-transaction)
* [Comment construire une Transaction Versionnée avec consultation d'adresse en utilisant les LUTs](https://beta.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table)
* [Limites des Transactions Versionnées](https://beta.docs.solana.com/proposals/transactions-v2#limitations)
* [Problèmes de sécurité des Transactions Versionnées](https://beta.docs.solana.com/proposals/transactions-v2#security-concerns)
* [Autres solutions proposées pour les Transactions Versionnées](https://beta.docs.solana.com/proposals/transactions-v2#other-proposals)
    

## Références
* [Proposition de transactions-V2](https://beta.docs.solana.com/proposals/transactions-v2)
* [Développer avec les Transactions Versionnées](https://beta.docs.solana.com/developing/versioned-transactions)