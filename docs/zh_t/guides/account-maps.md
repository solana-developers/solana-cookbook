---
title: 賬戶映射
---

# 賬戶映射

在編程中，我們經常使用映射（Map）這種數據結構，將一個鍵與某種值關聯起來。鍵和值可以是任意類型的數據，鍵用作標識要保存的特定值的標識符。通過鍵，我們可以高效地插入、檢索和更新這些值。

正如我們所瞭解的，Solana的賬戶模型要求程序數據和相關狀態數據存儲在不同的賬戶中。這些賬戶都有與之關聯的地址，這本身就有映射的作用！在[這裏][AccountCookbook]瞭解更多關於Solana賬戶模型的信息。

因此，將值存儲在單獨的賬戶中，以其地址作爲檢索值所需的鍵是有意義的。但這也帶來了一些問題，比如：

*上述地址很可能不是理想的鍵，你可能難以記住並檢索所需的值。

*上述地址是不同Keypair的公鑰，每個公鑰（或地址）都有與之關聯的私鑰。如果需要，這個私鑰將用於對不同的指令進行簽名，這意味着我們需要在某個地方存儲私鑰，這絕對不是推薦的做法！

這給許多Solana開發者帶來了一個問題，即如何在他們的程序中實現類似`Map`的邏輯。讓我們看看幾種解決這個問題的方法。

## 派生PDA

PDA的全稱是“程序派生地址” - [Program Derived Address][PDA]，簡而言之，它們是從一組種子和程序ID（或地址）派生出來的地址。

PDAs的獨特之處在於，這些地址不與任何私鑰相關聯。這是因爲這些地址不位於ED25519曲線上。因此，只有派生此地址的程序可以使用提供的密鑰和種子對指令進行簽名。在這裏瞭解更多信息。

現在我們對PDAs有了一個概念，讓我們使用它們來映射一些賬戶！我們以一個博客程序作爲示例，演示如何實現這一點。

在這個博客程序中，我們希望每個`User`都擁有一個`Blog`。這個博客可以有任意數量的`Posts`。這意味着我們將每個用戶映射到一個博客，每個帖子映射到某個博客。

簡而言之，用戶和他/她的博客之間是`1:1`的映射，而博客和其帖子之間是`1:N`的映射。

對於`1:1`的映射，我們希望一個博客的地址僅從其用戶派生，這樣我們可以通過其權限（或用戶）來檢索博客。因此，博客的種子將包括其權限的密鑰，可能還有一個前綴博客，作爲類型標識符。

對於`1:N`的映射，我們希望每個帖子的地址不僅從它所關聯的博客派生，還從另一個標識符派生，以區分博客中的多個帖子。在下面的示例中，每個帖子的地址是從博客的密鑰、一個用於標識每個帖子的slug和一個前綴帖子派生出來的，作爲類型標識符。

代碼如下所示：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

在客戶端，你可以使用`PublicKey.findProgramAddress()`來獲取所需的`Blog` 和`Post`賬戶地址，然後將其傳遞給`connection.getAccountInfo()`來獲取賬戶數據。下面是一個示例：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## 單個映射賬戶

另一種實現映射的方法是在單個賬戶中顯式存儲一個`BTreeMap`數據結構。這個賬戶的地址本身可以是一個PDA，或者是生成的Keypair的公鑰。

這種賬戶映射的方法並不理想，原因如下：

*首先，你需要初始化存儲`BTreeMap`的賬戶，然後才能向其中插入必要的鍵值對。然後，你還需要將這個賬戶的地址存儲在某個地方，以便每次更新時進行更新。

*賬戶存在內存限制，每個賬戶的最大大小爲10兆字節，這限制了`BTreeMap`存儲大量鍵值對的能力。

因此，在考慮你的用例後，可以按照以下方式實現這種方法：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

上述程序的客戶端測試代碼可能如下所示：

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address