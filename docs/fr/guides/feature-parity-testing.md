---
title: Test de Conformité des Fonctionnalités
head:
  - - meta
    - name: title
      content: Solana Cookbook | Test de Conformité des Fonctionnalités
  - - meta
    - name: og:title
      content: Solana Cookbook | Test de Conformité des Fonctionnalités
  - - meta
    - name: description
      content: Les fonctionnalités varient selon les clusters de Solana. Les tests de fonctionnalités garantissent des résultats prévisibles.
  - - meta
    - name: og:description
      content: Les fonctionnalités varient selon les clusters de Solana. Les tests de fonctionnalités garantissent des résultats prévisibles.
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

# Test de Conformité des Fonctionnalités

Lorsque vous testez votre programme, il est essentiel de s'assurer qu'il fonctionnera de la même manière dans différents clusters, tant pour la qualité que pour l'obtention des résultats attendus.

## Faits

::: tip Fiche d'Information
- Les fonctionnalités sont des changements qui sont introduits dans le code des validateurs Solana et qui nécessitent une activation pour être utilisés.
- Les fonctionnalités peuvent être activées dans un cluster (par exemple testnet) mais pas dans un autre (par exemple mainnet-beta).
- Cependant, lorsque vous exécutez localement la version par défaut de `solana-test-validator`, toutes les fonctionnalités disponibles dans votre version de Solana sont automatiquement activées. Le résultat est que lorsque vous testez localement, les fonctionnalités et les résultats de vos tests peuvent ne pas être les mêmes lorsque vous déployez et exécutez dans un cluster différent !
:::

## Scénario
Supposons que vous ayez une Transaction qui contient trois (3) instructions et que chaque instruction consomme environ 100_000 Unités de Calcul (UC). Lors de l'exécution sur une version Solana 1.8.x, vous observeriez une consommation de CU d'instruction ressemblant à :

| Instruction | CU de départ | Exécution | CU Restants|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

Dans Solana 1.9.2, une fonctionnalité appelée "plafond de calcul pour l'ensemble des transactions (transaction wide compute cap)" a été introduite. Par défaut, une Transaction a un budget de 200_000 CU et les instructions qui la composent vont **_débiter_** ce budget de Transaction. L'exécution de la même transaction indiquée ci-dessus aurait un comportement très différent :

| Instruction | CU de départ | Exécution | CU Restants|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

Aïe ! Si vous n'en étiez pas conscient, vous seriez probablement frustré car aucun changement dans vos instructions n'aurait pu provoquer ce phénomène. Sur le devnet il fonctionne bien, mais localement il échoue ?!?

Il est possible d'augmenter le budget global de la Transaction, par exemple à 300_000 UC, et de sauver votre santé mentale, mais cela montre pourquoi les tests avec **_Conformité des Fonctionnalités** constituent un bon moyen d'éviter toute confusion.

## Statut de la Fonctionnalité
Il est assez facile de vérifier quelles fonctionnalités sont disponibles pour un cluster donné avec la commande `solana feature status`.
```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

Alternativement, vous pouvez utiliser un outil comme [scfsd](#ressources) pour observer le statut de toutes les fonctionnalités des différents clusters qui afficherait l'écran partiel montré ici et qui ne nécessite pas l'exécution de `solana-test-validator` :

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Test de Conformité
Comme indiqué ci-dessus, `solana-test-validator` active **toutes** les fonctionnalités automatiquement. Donc, pour répondre à la question "Comment puis-je tester localement dans un environnement qui a une conformité avec le devnet, le testnet ou encore le mainnet-beta ?".

Solution: Des PRs ont été ajoutés à Solana 1.9.6 pour permettre la désactivation des fonctionnalités :

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Démonstration Simple
Supposons que vous ayez un programme simple qui enregistre les données qu'il reçoit en entrée et vous testez une transaction qui ajoute deux (2) instructions à votre programme.

### Toutes les fonctionnalités activées
1. Vous lancez le validateur de test dans un terminal :

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program target/deploy/PROGNAME.so --reset`
```

2. Dans un autre terminal, vous démarrez le flux de logs :
```console
solana logs
```

3. Vous exécutez ensuite votre transaction. Vous verriez quelque chose de similaire dans le terminal de log (édité pour plus de clarté) :
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```
Comme notre fonctionnalité "plafond de calcul pour l'ensemble des transactions" est automatiquement activée par défaut, nous observons que chaque instruction prélève des UC sur le budget de transaction de départ de 200_000 UC.

### Fonctionnalités sélectives désactivées
1. Pour cette exécution, nous voulons faire en sorte que le comportement du budget de CU soit en conformité avec ce qui est exécuté sur le devnet. En utilisant le(s) outil(s) décrit(s) dans [Statut de la Fonctionnalité](#statut-de-la-fonctionnalité) nous isolons la clé publique `transaction wide compute cap` et utilisons la fonction `--deactivate-feature` au démarrage du validateur de test

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. Nous voyons maintenant dans nos logs que nos instructions ont maintenant leur propre budget de 200_000 CU (édité pour plus de clarté) qui est actuellement l'état dans tous les clusters :
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Tests de Conformité Complète
Vous pouvez être en conformité complète avec un cluster donné en identifiant chaque fonctionnalité qui n'est pas encore activée et ajouter un `--deactivate-feature <FEATURE_PUBKEY>` pour chacune d'entre elles lors de l'exécution de `solana-test-validator`:
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Alternativement, [scfsd](#ressources) fournit un switch de commande pour retourner l'ensemble complet des fonctionnalités désactivées pour un cluster afin d'alimenter le démarrage de `solana-test-validator` :
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

Si vous ouvrez un autre terminal, alors que le validateur est en cours d'exécution, et que vous tapez `solana feature status`, vous verrez les fonctionnalités désactivées qui ont été trouvées désactivées sur le devnet

## Test de Conformité Complète programmé
Pour ceux qui contrôlent l'exécution du validateur de test dans leur code de test, il est possible de modifier les fonctions d'activation/désactivation du validateur de test en utilisant TestValidatorGenesis. Avec Solana 1.9.6, une fonction a été ajoutée au constructeur de validateurs pour prendre en charge cette fonction.

A la racine du dossier de votre programme, créez un nouveau dossier appelé `tests` et ajoutez un fichier `parity_test.rs`. Voici les fonctions de base utilisées pour chaque test

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Nous pouvons maintenant ajouter des fonctions de test dans le corps de `mod test {...}` pour démontrer la configuration par défaut du validateur (toutes les fonctionnalités activées) et ensuite désactiver `transaction wide compute cap` acomme dans les exemples précédents en exécutant `solana-test-validator` à partir de la ligne de commande.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

Alternativement, le [gadget du moteur scfs (scfs engine gadget)](#resources) peut produire un vecteur complet de fonctionnalités désactivées pour un cluster. L'exemple suivant démontre l'utilisation de ce moteur pour obtenir une liste de toutes les fonctionnalités désactivées sur le devnet.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Bon test !


## Ressources
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)