---
title: Port Anchor to Unity
head:
  - - meta
    - name: title
      content: Solana Cookbook | Port to Unity
  - - meta
    - name: og:title
      content: Solana Cookbook | Port to Unity
  - - meta
    - name: description
      content: Using anchor idl you can interact with your program directly from unity
  - - meta
    - name: og:description
      content: Using anchor idl you can interact with your program directly from unity
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

# Pag-port ng isang programa sa Unity

Kapag nakapagsulat ka na ng solana program ay baka gusto mo na itong gamitin sa Unity Game engine. Sa kabutihang palad mayroong isang code generator na nagbibigay-daan sa iyo na mag-port ng isang anchor idl (isang representasyon ng json ng isang solana program) sa C#

## Pagbuo ng Kliyente

Kapag gumagamit ng Anchor makakabuo ka ng isang IDL file na isang representasyon ng JSON ng iyong programa.
Gamit ang IDL na ito maaari kang makabuo ng iba't ibang mga kliyente. Halimbawa JS o C# sa Unity. <br />
[IDL to C# Converter](https://github.com/magicblock-labs/Solana.Unity.Anchor)<br />

Ang dalawang linyang ito ay bubuo ng isang C# client para sa laro.

```js
dotnet tool install Solana.Unity.Anchor.Tool
dotnet anchorgen -i idl/file.json -o src/ProgramCode.cs
```

Ito ay bubuo sa iyo ng isang C# na representasyon ng iyong programa, na nagbibigay-daan sa iyong deserialize ang data at madaling gumawa ng mga instruction sa programa.

## Pagbuo ng Transaksyon sa Unity C#

Sa loob ng Unity game engine, magagamit natin ang [Solana Unity SDK](https://assetstore.unity.com/packages/decentralization/infrastructure/solana-sdk-for-unity-246931) upang makipag-ugnayan sa programa.
1. Una nating mahanap ang nasa chain address ng game data account na may TryFindProgramAddress.
Kailangan nating ipasa ang account na ito sa transaksyon para malaman ng Solana runtime na gusto nating baguhin ang account na ito.
2. Susunod na ginagamit namin ang nabuong kliyente upang lumikha ng MoveRight na pagtuturo.
3. Pagkatapos ay humiling kami ng block hash mula sa isang RPC node. Ito ay kinakailangan upang malaman ni Solana kung gaano katagal ang magiging bisa ng transaksyon.
4. Susunod na itinakda namin ang nagbabayad ng bayad upang maging wallet ng mga manlalaro.
5. Pagkatapos ay idinagdag namin ang paglipat ng tamang pagtuturo sa Transaksyon. Maaari din kaming magdagdag ng maraming instruction sa isang solong transaksyon kung kinakailangan.
6. Pagkatapos ang transaksyon ay mapirmahan at pagkatapos ay ipadala sa RPC node para sa pagproseso.
May iba't ibang antas ng Commitment ang Solana. Kung itatakda namin ang antas ng pangako sa Nakumpirma, makukuha na namin ang bagong estado sa loob ng susunod na 500ms.

7. [Buong C# Source Code](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventure)

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