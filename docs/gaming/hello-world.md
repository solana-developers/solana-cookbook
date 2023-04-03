---
title: Hello World example
head:
  - - meta
    - name: title
      content: Solana Cookbook | Hello World example
  - - meta
    - name: og:title
      content: Solana Cookbook | Hello World example 
  - - meta
    - name: description
      content: A tiny adventure on chain game written in anchor with clients in js and c#  
  - - meta
    - name: og:description
      content: A tiny adventure on chain game written in anchor with clients in js and c#
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

# On chain game

## Interact with an Anchor Program from Unity

Video Walkthrough:
<div class="video-block">
<iframe width="320" height="200" src="https://www.youtube.com/embed/_vQ3bSs3svs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

Live Version. (use devnet in the embedded version)
<iframe height='400' scrolling='no' title='OZXQWp' src='https://solplay.de/TinyAdventure/index.html' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 80%;'>
</iframe>

The hello world for an on chain game will be a little adventure game moving a character from left to right. 
You can find the full source code that can also be deployed from the browser in Solana play ground here:
[Open In Playground](https://beta.solpg.io/tutorials/tiny-adventure)

We create a Solana account that is owned by our program. This GameDataAccount saves the player position. Then the program has some instructions that can be called by the player to move the player left and right. The instruction move_right for example will increase the player position by one.  

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="C#" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Ts">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>


```js
    #[account]
    pub struct GameDataAccount {
        player_position: u8,
    }

    #[derive(Accounts)]
    pub struct Initialize<'info> {
        // We must specify the space in order to initialize an account.
        // First 8 bytes are default account discriminator,
        // next 1 byte come from NewAccount.data being type u8.
        // (u8 = 8 bits unsigned integer = 8 bytes)
        // You can also use the signer as seed [signer.key().as_ref()],
        #[account(
            init_if_needed,
            seeds = [b"level1"],
            bump,
            payer = signer,
            space = 8 + 1
        )]
        pub new_game_data_account: Account<'info, GameDataAccount>,
        #[account(mut)]
        pub signer: Signer<'info>,
        pub system_program: Program<'info, System>,
    }

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        ctx.accounts.new_game_data_account.player_position = 0;
        msg!("A Journey Begins!");
        msg!("o.......");
        Ok(())
    }

    pub fn move_right(ctx: Context<MoveRight>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 3 {
            msg!("You have reached the end! Super!");
            msg!(".......\\o/");
        } else {
            game_data_account.player_position = game_data_account.player_position + 1;
        msg!("...o....");
        }
        Ok(())
    }

```

### Generating the Client

When using Anchor you will be able to generate an IDL file which is a JSON representation of your program.
With this IDL you can then generate different clients. For example JS or C# to Unity.  <br />
[IDL to C# Converter](https://github.com/magicblock-labs/Solana.Unity.Anchor)<br />

These two lines will generate a C# client for the game. 

```js
dotnet tool install Solana.Unity.Anchor.Tool
dotnet anchorgen -i idl/file.json -o src/ProgramCode.cs
```

### Building the Transaction in Unity C#

Within Unity game engine we can then use the [Solana Unity SDK](https://assetstore.unity.com/packages/decentralization/infrastructure/solana-sdk-for-unity-246931) to interact with the program. 
1. First we find the on chain adress of the game data account with TryFindProgramAddress. 
We need to pass in this account to the transaction so that the Solana runtime knows that we want to change this account. 
2. Next we use the generated client to create a MoveRight instruction. 
3. Then we request a block hash from an RPC node. This is needed so that Solana knows how long the transaction will be valid. 
4. Next we set the fee payer to be the players wallet. 
5. Then we add the move right instruction to the Transaction. We can also add multiple instructions to a singe transaction if needed. 
6. Afterwards the transaction gets signed and then send to the RPC node for processing. 
Solana has different Commitment levels. If we set the commitment level to Confirmed we will be able to get the new state already within the next 500ms. 

7. [Full C# Source Code](https://github.com/Woody4618/SolPlay_Unity_SDK/tree/main/Assets/SolPlay/Examples/TinyAdventure)

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