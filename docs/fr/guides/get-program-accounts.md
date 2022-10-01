---
title: Obtenir les comptes d'un programme
head:
  - - meta
    - name: title
      content: Solana Cookbook | Obtenir les comptes d'un programme
  - - meta
    - name: og:title
      content: Solana Cookbook | Obtenir les comptes d'un programme
  - - meta
    - name: description
      content: Apprenez à obtenir des données sur Solana à l'aide de getProgramAccounts et accountsDB
  - - meta
    - name: og:description
      content: Apprenez à obtenir des données sur Solana à l'aide de getProgramAccounts et accountsDB
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

# Obtenir les comptes d'un programme

Il existe une méthode RPC qui renvoie tous les comptes appartenant à un programme. Actuellement, la pagination n'est pas prise en charge. Les requêtes à `getProgramAccounts` devraient inclure les paramètres `dataSlice` et/ou `filters` afin d'améliorer le temps de réponse et retourner uniquement les résultats voulus. 

## Faits

::: tip Paramètres

- `programId`: `string` - Clé publique du programme à interroger, fournie sous forme de chaîne de caractères codée en base58
- (optionnel) `configOrCommitment`: `object` - Paramètres de configuration contenant les champs facultatifs suivants :
    - (optionnel) `commitment`: `string` - [Engagement de l'État (State commitment)](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (optionnel) `encoding`: `string` - L'encodage des données du compte, peut être: `base58`, `base64`, ou `jsonParsed`. Remarque : les utilisateurs de web3js doivent plutôt utiliser [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
    - (optionnel) `dataSlice`: `object` - Paramètres permettant de limiter les données à renvoyer :
        - `offset`: `number` - Nombre de bytes dans les données du compte à partir desquels il faut commencer à retourner
        - `length`: `number` - Nombre de bytes de données du compte à retourner
    - (optionnel) `filters`: `array` - Paramètres pour filtrer les résultats :
        - `memcmp`: `object` - Correspondance d'une série de bytes avec les données du compte :
            - `offset`: `number` - Nombre de bytes dans les données du compte à partir desquels il faut commencer à comparer
            - `bytes`: `string` - Données à comparer, sous la forme d'une chaîne de caractères codée en base58 limitée à 129 bytes
        - `dataSize`: `number` - Compare la longueur des données du compte avec la taille des données fournies
    - (optionnel) `withContext`: `boolean` - Enveloppe le résultat dans un [objet JSON RpcResponse](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

##### Réponse

Par défaut, `getProgramAccounts` retournera un tableau d'objets JSON avec la structure suivante :

- `pubkey`: `string` - La clé publique du compte sous la forme d'une chaîne de caractères encodée en base58
- `account`: `object` - un objet JSON, avec les sous-champs suivants :
    - `lamports`: `number`, nombre de lamports alloués au compte
    - `owner`: `string`, La clé publique du programme auquel le compte a été attribué, encodée en base58
    - `data`: `string` | `object` - les données associées au compte, soit sous forme de données binaires, soit au format JSON, conformément au paramètre d'encodage fourni
    - `executable`: `boolean`, Indique si le compte contient un programme
    - `rentEpoch`: `number`, L'époque à laquelle ce compte devra payer sa prochaine rente
:::

## Examen plus approfondi

`getProgramAccounts` est une méthode RPC polyvalente qui renvoie tous les comptes appartenant à un programme. Nous pouvons utiliser `getProgramAccounts` pour un certain nombre de requêtes utiles, telles que la recherche de :

- Tous les comptes de jetons pour un portefeuille en particulier
- Tous les comptes de jetons pour un mint en particulier (par exemple, tous les propriétaires (holders) de [SRM](https://www.projectserum.com/))
- Tous les comptes pour un programme en particulier (par exemple, tous les utilisateurs de [Mango](https://mango.markets/))

Malgré son utilité, `getProgramAccounts` est souvent mal compris en raison de ses limites actuelles. La plupart des requêtes supportées par `getProgramAccounts` nécessitent des nœuds RPC pour analyser de grands ensembles de données. Ces analyses sont à la fois gourmandes en mémoire et en ressources. Par conséquent, les appels trop fréquents ou de trop grande envergure peuvent entraîner des interruptions de connexion. De plus, au moment où nous écrivons ces lignes, le point de terminaison `getProgramAccounts` ne prend pas en charge la pagination. Si les résultats d'une requête sont trop volumineux, la réponse sera tronquée.

Pour contourner ces contraintes actuelles, `getProgramAccounts` offre un certain nombre de paramètres utiles : à savoir, `dataSlice` et les options de `filters` `memcmp` et `dataSize`. En fournissant des combinaisons de ces paramètres, nous pouvons réduire la portée de nos requêtes à des tailles gérables et prévisibles.

Un exemple courant de `getProgramAccounts` consiste à interagir avec le [Programme de Jetons SPL](https://spl.solana.com/token). Demander tous les comptes détenus par le programme de Jetons avec un [appel de base](../references/accounts.md#comment-obtenir-les-comptes-du-programme) impliquerait une énorme quantité de données. Cependant, en fournissant des paramètres, nous pouvons efficacement demander uniquement les données que nous avons l'intention d'utiliser.

### `filters`
Le paramètre le plus commun à utiliser avec `getProgramAccounts` est le tableau `filters`. Ce tableau accepte deux types de filtres, `dataSize` et `memcmp`. Avant d'utiliser l'un de ces filtres, nous devons nous familiariser avec la manière dont les données que nous demandons sont organisées et sérialisées.

#### `dataSize`
Dans le cas du Programme de Jetons, nous pouvons constater que [les comptes de jetons ont une taille de 165 bytes](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106). Plus précisément, un compte de jeton comporte huit champs différents, chaque champ ayant un nombre prédéfini de bytes. Nous pouvons visualiser comment ces données sont organisées à l'aide de l'illustration ci-dessous.

![Taille des comptes](./get-program-accounts/account-size.png)

Si nous voulions trouver tous les comptes de jetons appartenant à notre adresse de portefeuille, nous pourrions ajouter `{ dataSize: 165 }` à notre tableau `filters` pour limiter notre requête aux seuls comptes qui font exactement 165 bytes de long. Toutefois, cela ne suffirait pas. Nous devrions également ajouter un filtre qui recherche les comptes appartenant à notre adresse. Nous pouvons réaliser cela avec le filtre `memcmp`.

#### `memcmp`
Le filtre `memcmp`, ou filtre "comparaison de mémoire", nous permet de comparer des données à n'importe quel champ stocké sur notre compte. Plus précisément, nous pouvons rechercher uniquement les comptes qui possèdent un certain ensemble de bytes à une position précise. `memcmp` nécessite deux arguments :

- `offset`: La position à partir de laquelle il faut commencer à comparer les données. Cette position est mesurée en bytes et est exprimée sous la forme d'un nombre entier.
- `bytes`: Les données qui doivent correspondre aux données du compte. Elles sont représentées sous la forme d'une chaîne de caractères codées en base 58 qui doit être limitée à moins de 129 bytes.

Il est important de noter que `memcmp` ne retournera que les résultats qui correspondent exactement aux `bytes`. Actuellement, il ne supporte pas les comparaisons pour les valeurs inférieures ou supérieures aux `bytes` que nous fournissons.

Pour rester dans notre exemple du Programme de Jetons, nous pouvons modifier notre requête pour ne renvoyer que les comptes de jetons qui appartiennent à notre adresse de portefeuille. En examinant un compte de jetons, on constate que les deux premiers champs stockés sur un compte de jetons sont tous deux des clés publiques, et que chaque clé publique a une longueur de 32 octets. Étant donné que `owner` est le deuxième champ, nous devrions commencer notre `memcmp` à un `offset` de 32 bytes. A partir de là, nous allons rechercher les comptes dont le champ propriétaire (owner) correspond à l'adresse de notre portefeuille.

![Taille des comptes](./get-program-accounts/memcmp.png)

Nous pouvons faire appel à cette requête via l'exemple suivant :

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.sh)

  </CodeGroupItem>
</CodeGroup>

### `dataSlice`

En plus des deux paramètres de filtre, le troisième paramètre le plus courant pour `getProgramAccounts` est `dataSlice`. Contrairement au paramètre `filters`, `dataSlice` ne réduira pas le nombre de comptes retournés par une requête. Au lieu de cela, `dataSlice` limitera la quantité de données pour chaque compte.

Tout comme `memcmp`, `dataSlice` accepte deux arguments :

- `offset`: La position (en nombre de bytes) à partir de laquelle il faut commencer à renvoyer les données du compte
- `length`: Le nombre d'octets qui doivent être retournés

`dataSlice` est particulièrement utile lorsque nous exécutons des requêtes sur un grand ensemble de données mais que nous ne nous soucions pas vraiment des données du compte lui-même. Par exemple, si nous voulons trouver le nombre de comptes de jetons (c'est-à-dire le nombre de détenteurs de jetons) pour un jeton en particulier.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.sh)

  </CodeGroupItem>
</CodeGroup>

En combinant ces trois paramètres (`dataSlice`, `dataSize`, et `memcmp`), nous pouvons limiter la portée de notre requête et ne renvoyer efficacement que les données qui nous intéressent.

## Autres Ressources

- [Documentation de l'API RPC](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Documentation de Web3js](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [Documentation Web3js interprétée en JSON](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
