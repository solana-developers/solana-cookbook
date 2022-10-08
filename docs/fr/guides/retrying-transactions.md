---
title: Réessayer des Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Réessayer des Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Réessayer des Transactions
  - - meta
    - name: description
      content: Il arrive parfois qu'une transaction apparemment valide soit rejetée avant d'être incluse dans un bloc. Pour remédier à ce problème, les développeurs d'applications peuvent mettre au point leur propre logique de retransmission personnalisée. Découvrez comment réessayer des transactions et bien d'autres choses encore dans le Solana cookbook.
  - - meta
    - name: og:description
      content: Il arrive parfois qu'une transaction apparemment valide soit rejetée avant d'être incluse dans un bloc. Pour remédier à ce problème, les développeurs d'applications peuvent mettre au point leur propre logique de retransmission personnalisée. Découvrez comment réessayer des transactions et bien d'autres choses encore dans le Solana cookbook.
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

# Réessayer Des Transactions

Il arrive parfois qu'une transaction apparemment valide soit rejetée avant d'être incluse dans un bloc. Cela se produit le plus souvent pendant les périodes de congestion du réseau, lorsqu'un nœud RPC ne parvient pas à retransmettre la transaction au [leader](https://docs.solana.com/terminology#leader). Pour l'utilisateur final, il peut avoir l'impression que sa transaction disparaît complètement. Si les nœuds RPC sont équipés d'un algorithme de retransmission générique, les développeurs d'applications sont également capables de développer leur propre logique de retransmission personnalisée.

## Faits

::: tip Fiche d'Information
- Les nœuds RPC tenteront de retransmettre les transactions en utilisant un algorithme générique
- ALes développeurs d'applications peuvent mettre en œuvre leur propre logique de retransmission personnalisée
- Les développeurs devraient tirer parti du paramètre `maxRetries` de la méthode JSON-RPC `sendTransaction`
- Les développeurs devraient activer des contrôles en amont afin de détecter les erreurs avant que les transactions ne soient soumises
- Avant de re-signer une transaction, il est **très important** de s'assurer que le blockhash de la transaction initiale a expiré
:::

## Le Voyage d'une Transaction

### Comment Les Clients Soumettent Les Transactions

Chez Solana, il n'y a pas de concept de mempool.Toutes les transactions, qu'elles soient initiées par un programme ou par un utilisateur final, sont acheminées efficacement vers les leaders afin d'être traitées dans un bloc. Il existe deux manières principales d'envoyer une transaction aux leaders :
1. Par proxy via un serveur RPC et la méthode JSON-RPC [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction)
2. Directement aux leaders via un [Client TPU](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)

La grande majorité des utilisateurs finaux soumettront des transactions via un serveur RPC. Lorsqu'un client soumet une transaction, le nœud RPC récepteur tente à son tour de transmettre la transaction aux leaders actuels et suivants. Tant que la transaction n'est pas traitée par un leader, il n'y a pas d'enregistrement de la transaction en dehors de ce dont le client et les nœuds RPC relais ont connaissance. Dans le cas d'un client TPU, la retransmission et le transfert des leaders sont entièrement gérés par le logiciel client.

![Transaction Journey](./retrying-transactions/tx-journey.png)

### Comment Les Nœuds RPC Transmettent Les Transactions

Lorsqu'un nœud RPC reçoit une transaction via `sendTransaction`, il la convertit en un paquet [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) avant de la transmettre aux leaders concernés. UDP permet aux validateurs de communiquer rapidement entre eux, mais ne fournit aucune garantie quant à la livraison des transactions.

Comme le calendrier des leaders de Solana est connu à l'avance pour chaque [epoque](https://docs.solana.com/terminology#epoch) (~2 jours), un noeud RPC diffusera sa transaction directement aux leaders actuels et suivants. Cela contraste avec d'autres protocoles de bavardage, comme Ethereum, qui propagent les transactions de manière aléatoire et à grande échelle sur l'ensemble du réseau. Par défaut, les nœuds RPC essaient de transmettre les transactions aux leaders toutes les deux secondes jusqu'à ce que la transaction soit finalisée ou que le hash de blocs de la transaction expire (150 blocs ou ~1 minute 19 secondes au moment de la rédaction de ce document). Si la taille de la file d'attente de retransmissions en attente est supérieure à [10,000 transactions](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20) les nouvelles transactions soumises sont rejetées. Il existe des [arguments](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) de ligne de commande que les opérateurs RPC peuvent ajuster pour modifier le comportement par défaut de cette logique de réessai.

Lorsqu'un nœud RPC transmet une transaction, il tente de la transmettre à l'[Unité de Traitement des Transactions (Transaction Processing Unit ou TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867) d'un leader. Le TPU traite les transactions en cinq phases distinctes :
- [Étape de Récupération (Fetch Stage)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [Étape de SigVerify (SigVerify Stage)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Étape de Banking (Banking Stage)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Service Proof of History](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Étape de Transmission (Broadcast Stage)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Avec l'Autorisation de Jito Labs</small>

Parmi ces cinq phases, l'étape Fetch est responsable de la réception des transactions. Dans celle-ci, les validateurs classeront les transactions entrantes en fonction de trois ports :
- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) gère les transactions régulières telles que les transferts de jetons, les mints de NFT et les instructions de programme
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) se concentre exclusivement sur les transactions de vote
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) transmet les paquets non traités au leader suivant si le leader actuel est incapable de traiter toutes les transactions.

Pour plus d'informations sur le TPU, veuillez consulter [cet excellent article de Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## Comment Les Transactions Sont Rejetées

Tout au long du voyage d'une transaction, il existe quelques scénarios dans lesquels la transaction peut être involontairement rejetée du réseau.

### Avant le traitement d'une transaction

Si le réseau rejette une transaction, il le fera très probablement avant que la transaction ne soit traitée par un leader. La [perte de paquets](https://en.wikipedia.org/wiki/Packet_loss) UDP est la raison la plus simple pour laquelle cela peut se produire. En période de charge intense du réseau, il est également possible que les validateurs soient submergés par le nombre de transactions à traiter. Bien que les validateurs soient équipés pour transmettre les transactions excédentaires via `tpu_forwards`, il y a une limite à la quantité de données qui peuvent être [transmises](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389). De plus, chaque transfert est limité à un seul saut entre les validateurs. En d'autres termes, les transactions reçues sur le port `tpu_forwards` ne sont pas transmises à d'autres validateurs.

Il existe également deux raisons moins connues pour lesquelles une transaction peut être rejetée avant d'être traitée. Le premier scénario implique des transactions qui sont soumises via un pool RPC. Il arrive qu'une partie de la pool RPC soit suffisamment en avance sur le reste de la pool. Cela peut poser des problèmes lorsque les nœuds de la pool doivent travailler ensemble. Dans cet exemple, le [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) de la transaction est interrogé à partir de la partie avancée de la pool (Backend A). Lorsque la transaction est soumise à la partie en retard de la pool (Backend B), les nœuds ne reconnaîtront pas le blockhash avancé et rejetteront la transaction. Cela peut être détecté lors de la soumission de la transaction si les développeurs activent les [contrôles préalables (preflight checks)](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) de `sendTransaction`.

![Dropped via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

Les forks temporaires du réseau peuvent également entraîner le rejet de transactions. Si un validateur est lent à rejouer ses blocs pendant l'Étape de Banking, il peut finir par créer un fork minoritaire. Quand un client crée une transaction, il est possible que la transaction fasse référence à un `recentBlockhash` qui n'existe que sur le fork minoritaire. Après la soumission de la transaction, le cluster peut alors se détacher de son fork minoritaire avant que la transaction ne soit traitée. Dans ce scénario, la transaction est rejetée parce que le blockhash n'a pas été trouvé.

![Dropped due to Minority Fork (Before Processed)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### Après le traitement d'une transaction et avant sa finalisation

Dans le cas où une transaction fait référence à un `recentBlockhash` d'un fork minoritaire, il est toujours possible que la transaction soit traitée. Dans ce cas, cependant, il serait traité par le leader du fork minoritaire. Lorsque ce leader tente de partager ses transactions traitées avec le reste du réseau, il ne parvient pas à obtenir un consensus avec la majorité des validateurs qui ne reconnaissent pas le fork minoritaire. A ce stade, la transaction serait rejetée avant d'être finalisée.

![Dropped due to Minority Fork (After Processed)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Traitement Des Transactions Rejetées

Bien que les nœuds RPC tentent de retransmettre les transactions, l'algorithme qu'ils utilisent est générique et souvent mal adapté aux besoins des applications spécifiques. Pour se préparer aux périodes de congestion du réseau, les développeurs d'applications doivent personnaliser leur propre logique de retransmission.

### Un Examen Approfondi De sendTransaction

Lorsqu'il s'agit de soumettre des transactions, la méthode RPC `sendTransaction` est le principal outil à la disposition des développeurs. `sendTransaction` est seulement chargé de relayer une transaction d'un client vers un noeud RPC. Si le noeud reçoit la transaction, `sendTransaction` retournera l'identifiant de la transaction qui peut être utilisé pour suivre la transaction. Une réponse positive n'indique pas si la transaction sera traitée ou finalisée par le cluster.

:::tip
#### Paramètres De La Requête
- `transaction`: `string` - Transaction entièrement signée, sous forme de chaîne de caractères codée
- (facultatif) `configuration object`: `object` 
    - `skipPreflight`: `boolean` - si *true*, ignore les contrôles préalables de la transaction (par défaut : *false*)
    - (facultatif) `preflightCommitment`: `string` - [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) Niveau à utiliser pour les simulations préalables par rapport au slot bank (par défaut : *"finalized"*).
    - (facultatif) `encoding`: `string` - Encodage utilisé pour les données de la transaction. Soit "base58" (lent), soit "base64". (par défaut : "base58").
    - (facultatif) `maxRetries`: `usize` - Nombre maximal de fois où le nœud RPC doit réessayer d'envoyer la transaction au leader. Si ce paramètre n'est pas fourni, le nœud RPC réessayera la transaction jusqu'à ce qu'elle soit finalisée ou jusqu'à ce que le blockhash expire.

#### Réponse
- `transaction id`: `string` - Première signature de transaction incorporée dans la transaction, sous forme de chaîne de caractères codée en base-58. Cet identifiant de transaction peut être utilisé avec [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) pour demander des mises à jour de statut.
:::

## Personnalisation De La logique De Retransmission

Afin de développer leur propre logique de retransmission, les développeurs doivent tirer parti du paramètre `maxRetries` de `sendTransaction`. S'il est fourni, `maxRetries` remplacera la logique de ré-essai par défaut d'un nœud RPC, permettant aux développeurs de contrôler manuellement le processus de ré-essai [dans des limites raisonnables](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274).

Un schéma courant pour réessayer manuellement les transactions implique le stockage temporaire de `lastValidBlockHeight` qui provient de [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash). Une fois stockée, une application peut alors [interroger la hauteur de bloc du cluster (cluster’s blockheight)](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) et réessayer manuellement la transaction à un moment approprié. En cas de congestion du réseau, il est avantageux de mettre `maxRetries` à 0 et de retransmettre manuellement via un algorithme personnalisé. Alors que certaines applications peuvent utiliser un algorithme de [backoff exponentiel](https://en.wikipedia.org/wiki/Exponential_backoff), d'autres, comme [Mango],(https://www.mango.markets/) choisissent de [resoumettre continuellement](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) les transactions à un intervalle constant jusqu'à ce qu'un certain délai se soit écoulé.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/retrying-transactions/retry.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/retrying-transactions/retry.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>


Lors de l'interrogation via `getLatestBlockhash`, les applications doivent spécifier leur niveau d'[engagement (commitment)](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) prévu. En définissant son engagement sur `confirmed` (voté) ou `finalized` (~30 blocs après `confirmed`), une application peut éviter d'interroger un blockhash d'un fork minoritaire.

Si une application a accès aux nœuds RPC derrière un équilibreur de charge, elle peut également choisir de répartir sa charge de travail entre des nœuds spécifiques. Les nœuds RPC qui servent des requêtes à forte intensité de données telles que [getProgramAccounts](./get-program-accounts.md) peuvent être enclins à prendre du retard et ne sont pas adaptés à la transmission des transactions. Pour les applications qui gèrent des transactions sensibles au temps, il peut être prudent d'avoir des noeuds dédiés qui ne gèrent que `sendTransaction`.

### Le Coût de l'Omission Du Contrôle Préalable

Par défaut, `sendTransaction` effectue trois contrôles préalables avant de soumettre une transaction. Plus précisément, `sendTransaction` va :
- Vérifier que toutes les signatures sont valides
- Vérifier que le blockhash référencé se situe dans les 150 derniers blocs.
- Simuler la transaction sur le slot bank spécifié par le `preflightCommitment`

Si l'un de ces trois contrôles préalables échoue, `sendTransaction` déclenchera une erreur avant de soumettre la transaction. Les contrôles préalables peuvent souvent faire la différence entre le rejet d'une transaction et la possibilité pour un client de gérer gracieusement une erreur. Pour s'assurer que ces erreurs courantes sont prises en compte, il est recommandé aux développeurs de laisser la valeur `skipPreflight` sur `false`.

### Quand Re-Signer Des Transactions

Malgré toutes les tentatives de retransmission, il peut arriver qu'un client soit obligé de re-signer une transaction. Avant de resigner une transaction, il est **très important** de s'assurer que le blockhash de la transaction initiale a expiré. Si le blockhash initial est toujours valide, il est possible que les deux transactions soient acceptées par le réseau. Pour un utilisateur final, cela donnerait l'impression qu'il a involontairement envoyé deux fois la même transaction.

Sur Solana, une transaction rejetée peut être éliminée en toute sécurité lorsque le blockhash qu'elle référence est plus ancien que le `lastValidBlockHeight` reçu de `getLatestBlockhash`. Les développeurs doivent garder la trace de ce `lastValidBlockHeight` en interrogeant [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo) et en le comparant avec `blockHeight` de la réponse. Une fois qu'un blockhash est invalidé, les clients peuvent resigner avec un nouveau blockhash.

## Remerciements

Un grand merci à Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__), and [Jito Labs](https://twitter.com/jito_labs) pour leur examen et leurs commentaires.
