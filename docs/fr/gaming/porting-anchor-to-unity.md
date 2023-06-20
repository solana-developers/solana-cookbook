---
title: Portage d'Anchor vers Unity
head:
  - - meta
    - name: title
      content: Solana Cookbook | Portage vers Unity
  - - meta
    - name: og:title
      content: Solana Cookbook | Portage vers Unity
  - - meta
    - name: description
      content: En utilisant l'IDL Anchor, vous pouvez interagir avec votre programme directement depuis Unity
  - - meta
    - name: og:description
      content: En utilisant l'IDL Anchor, vous pouvez interagir avec votre programme directement depuis Unity
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

# Portage d'un programme vers Unity

Lorsque vous avez écrit un programme Solana, vous souhaitez peut-être l'utiliser dans le moteur de jeu Unity. Heureusement, il existe un générateur de code qui vous permet de porter un IDL anchor (une représentation json d'un programme solana) en C#.

## Création du client

En utilisant Anchor, vous pourrez générer un fichier IDL qui est une représentation JSON de votre programme.
Cet IDL permet de générer différents clients. Par exemple, JS ou C# pour Unity.  <br />
[Convertisseur IDL vers C#](https://github.com/magicblock-labs/Solana.Unity.Anchor)<br />

Ces deux lignes génèrent un client C# pour le jeu.

```js
dotnet tool install Solana.Unity.Anchor.Tool
dotnet anchorgen -i idl/file.json -o src/ProgramCode.cs
```

Vous obtiendrez ainsi une représentation C# de votre programme, qui vous permettra de désérialiser les données et de créer facilement des instructions du programme.

## Création de la transaction dans Unity C#

Dans le moteur de jeu Unity, nous pouvons utiliser le [SDK Solana Unity](https://assetstore.unity.com/packages/decentralization/infrastructure/solana-sdk-for-unity-246931) pour interagir avec le programme.
1. Tout d'abord, nous trouvons l'adresse du compte de données de jeu stocké sur la chaîne avec TryFindProgramAddress.
Nous devons transmettre ce compte à la transaction pour que le runtime de Solana sache que nous voulons changer ce compte.
2. Nous utilisons ensuite le client généré pour créer une instruction MoveRight.
3. Nous récupérons ensuite un hash de bloc en le demandant à un nœud RPC. Cela est nécessaire pour que Solana sache combien de temps la transaction sera valable.
4. Ensuite, nous définissons le payeur des frais comme étant le portefeuille du joueur.
5. Nous ajoutons ensuite l'instruction MoveRight à la transaction. Nous pouvons également ajouter plusieurs instructions à une seule transaction si nécessaire.
6. La transaction est ensuite signée et envoyée au nœud RPC pour traitement.
Solana propose différents niveaux d'engagement (Commitment). Si nous fixons le niveau d'engagement à *Confirmed* nous pourrons obtenir le nouvel état dans les 500ms prochaines.

7. [Code source en C# complet](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventure)

```c#
public async void MoveRight()
{
    PublicKey.TryFindProgramAddress(new[]
    {
        Encoding.UTF8.GetBytes("level1")
    },
    ProgramId, out gameDataAccount, out var bump);

    MoveRightAccounts account = new MoveRightAccounts();
    account.GameDataAccount = gameDataAccount;
    TransactionInstruction moveRightInstruction = TinyAdventureProgram.MoveRight(account, ProgramId);

    var walletHolderService = ServiceFactory.Resolve<WalletHolderService>();
    var result = await walletHolderService.BaseWallet.ActiveRpcClient.GetRecentBlockHashAsync(Commitment.Confirmed);

    Transaction transaction = new Transaction();
    transaction.FeePayer = walletHolderService.BaseWallet.Account.PublicKey;
    transaction.RecentBlockHash = result.Result.Value.Blockhash;
    transaction.Signatures = new List<SignaturePubKeyPair>();
    transaction.Instructions = new List<TransactionInstruction>();
    transaction.Instructions.Add(moveRightInstruction);

    Transaction signedTransaction = await walletHolderService.BaseWallet.SignTransaction(transaction);

    RequestResult<string> signature = await walletHolderService.BaseWallet.ActiveRpcClient.SendTransactionAsync(
        Convert.ToBase64String(signedTransaction.Serialize()),
        true, Commitment.Confirmed);
}
```