---
title: Débogage des Programmes Solana
head:
  - - meta
    - name: title
      content: Solana Cookbook | Débogage des Programmes Solana
  - - meta
    - name: og:title
      content: Solana Cookbook | Débogage des Programmes Solana
  - - meta
    - name: description
      content: Il existe un certain nombre d'options et d'outils de support pour tester et déboguer un programme BPF Solana.
  - - meta
    - name: og:description
      content: Il existe un certain nombre d'options et d'outils de support pour tester et déboguer un programme BPF Solana.
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

# Débogage des Programmes Solana

Il existe un certain nombre d'options et d'outils de support pour tester et déboguer un programme Solana.

## Faits

::: tip Fiche d'Informations
- La crate `solana-program-test` permet l'utilisation d'éléments de base de **_local runtime_** où vous pouvez tester et déboguer votre programme de manière interactive (par exemple dans vscode).
- La crate `solana-validator` permet d'utiliser l'implémentation `solana-test-validator` pour des tests plus robustes qui se font sur un **_noeud validateur local_**. Vous pouvez exécuter depuis l'éditeur **_mais les points d'arrêt dans le programme sont ignorés_**.
- L'outil CLI `solana-test-validator` exécute et charge votre programme et traite l'exécution des transactions à partir d'applications Rust en ligne de commande ou d'applications Javascript/Typescript utilisant web3.
- Pour tout ce qui précède, il est recommandé d'utiliser la macro `msg!` dans votre programme au début, puis de la supprimer au fur et à mesure que vous testez et vous assurez d'un comportement sûr. Rappelez-vous que `msg!` consomme des Unités de Calcul qui peuvent éventuellement faire échouer votre programme en atteignant les plafonds du budget des Unités de Calcul.
:::

Les étapes des sections suivantes utilisent [solana-program-bpf-template](#ressources). Clonez-le sur votre machine :
```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Tests d'Exécution et Débogage dans l'éditeur

Ouvrez le fichier `src/lib.rs`

Vous constaterez que le programme est assez simple et se contente d'enregistrer le contenu reçu par la fonction d'entrée du programme : `process_instruction`

1.Allez dans la section `#[cfg(test)]` et cliquez sur `Run Tests`. Cela va compiler le programme et ensuite exécuter le test  `async fn test_transaction()`. Vous verrez les messages de log (simplifiés) dans le terminal vscode sous la source.
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. Fixer un point d'arrêt sur la ligne `msg!` du programme (11)
3. De retour dans le module de test, cliquez sur `Debug` et en quelques secondes, le débogueur s'arrêtera sur le point d'arrêt et vous pourrez maintenant examiner les données, parcourir les fonctions, etc.

Ces tests peuvent également être exécutés en ligne de commande avec : `cargo test` ou `cargo test-bpf`. Bien sûr, les points d'arrêt seront ignorés.

On ne peut pas faire plus groovy !

:::tip Remarque
Gardez à l'esprit que vous n'utilisez pas un nœud de validation et que les programmes par défaut, les hashs de blocs, etc. ne sont pas représentés ou ne se comporteront pas comme ils le feraient s'ils étaient exécutés dans un nœud de validation. C'est pourquoi il est possible d'utiliser un Nœud de Validation Local pour faire des tests.
:::


## Test avec un Nœud de Validation Local dans l'éditeur

Les tests d'intégration utilisant le chargement programmé d'un nœud de validateur local sont définis dans le fichier `tests/integration.rs`.

Par défaut, le template des tests d'intégration du répertoire ne seront exécutables qu'en ligne de commande en utilisant `cargo test-bpf`. Les étapes suivantes vous permettront d'exécuter dans l'éditeur, d'afficher les logs du validateur de programme et les sorties `msg!` de votre programme :

1. Dans le répertoire du repo, exécutez `cargo build-bpf` pour compiler le programme d'exemple
2. Dans l'éditeur, ouvrez `tests/integration.rs`
3. Commentez la ligne 1 -> `// #![cfg(feature = "test-bpf")]`
4. A la ligne 19, modifiez comme suit : `.add_program("target/deploy/bpf_program_template", program_id)`
5. Insérez ce qui suit à la ligne 22 `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. Cliquez sur `Run Test` au-dessus de la fonction `test_validator_transaction()`

Ceci chargera le noeud de validation et vous permettra de construire une transaction (à la manière de Rust) et de la soumettre au noeud en utilisant le `RcpClient`.

La sortie du programme apparaîtra également dans le terminal de l'éditeur. Par exemple (simplifié) :
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```
Le débogage ici vous permettra de déboguer les fonctions et méthodes utilisées dans le **_test body_** mais ne fera pas de point d'arrêt dans votre programme.

## Test avec un Nœud de Validation Local à partir des Applications Clients
Enfin, vous pouvez démarrer un nœud de validation local et charger votre programme et tous les comptes en utilisant le `solana-test-validator` depuis la ligne de commande.

Dans cette approche, vous aurez besoin d'une application client, soit en utilisant Rust [RcpClient](#ressources) ou en utilisant les [clients JavaScript ou Typescript](#ressources)

Voir `solana-test-validator --help` pour plus de détails et d'options. Pour le programme d'exemple, voici la configuration :
1. Ouvrez un terminal dans le dossier repo
2. Exécutez `solana config set -ul` pour définir la configuration pour pointer vers le local
3. Exécutez `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. Ouvrez un autre terminal et lancez `solana logs` pour démarrer le flux des logs
5. Vous pouvez alors exécuter votre programme client et observer la sortie du programme dans le terminal où vous avez démarré le flux de logs

## Ressources
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[Bibliothèque JavaScript/Typescript](https://solana-labs.github.io/solana-web3.js/)
