---
title: 账户映射
---

# 账户映射

在编程中，我们经常使用映射（Map）这种数据结构，将一个键与某种值关联起来。键和值可以是任意类型的数据，键用作标识要保存的特定值的标识符。通过键，我们可以高效地插入、检索和更新这些值。

正如我们所了解的，Solana的账户模型要求程序数据和相关状态数据存储在不同的账户中。这些账户都有与之关联的地址，这本身就有映射的作用！在[这里][AccountCookbook]了解更多关于Solana账户模型的信息。

因此，将值存储在单独的账户中，以其地址作为检索值所需的键是有意义的。但这也带来了一些问题，比如：

*上述地址很可能不是理想的键，你可能难以记住并检索所需的值。

*上述地址是不同Keypair的公钥，每个公钥（或地址）都有与之关联的私钥。如果需要，这个私钥将用于对不同的指令进行签名，这意味着我们需要在某个地方存储私钥，这绝对不是推荐的做法！

这给许多Solana开发者带来了一个问题，即如何在他们的程序中实现类似`Map`的逻辑。让我们看看几种解决这个问题的方法。

## 派生PDA

PDA的全称是“程序派生地址” - [Program Derived Address][PDA]，简而言之，它们是从一组种子和程序ID（或地址）派生出来的地址。

PDAs的独特之处在于，这些地址不与任何私钥相关联。这是因为这些地址不位于ED25519曲线上。因此，只有派生此地址的程序可以使用提供的密钥和种子对指令进行签名。在这里了解更多信息。

现在我们对PDAs有了一个概念，让我们使用它们来映射一些账户！我们以一个博客程序作为示例，演示如何实现这一点。

在这个博客程序中，我们希望每个`User`都拥有一个`Blog`。这个博客可以有任意数量的`Posts`。这意味着我们将每个用户映射到一个博客，每个帖子映射到某个博客。

简而言之，用户和他/她的博客之间是`1:1`的映射，而博客和其帖子之间是`1:N`的映射。

对于`1:1`的映射，我们希望一个博客的地址仅从其用户派生，这样我们可以通过其权限（或用户）来检索博客。因此，博客的种子将包括其权限的密钥，可能还有一个前缀博客，作为类型标识符。

对于`1:N`的映射，我们希望每个帖子的地址不仅从它所关联的博客派生，还从另一个标识符派生，以区分博客中的多个帖子。在下面的示例中，每个帖子的地址是从博客的密钥、一个用于标识每个帖子的slug和一个前缀帖子派生出来的，作为类型标识符。

代码如下所示：

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

在客户端，你可以使用`PublicKey.findProgramAddress()`来获取所需的`Blog` 和`Post`账户地址，然后将其传递给`connection.getAccountInfo()`来获取账户数据。下面是一个示例：

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

## 单个映射账户

另一种实现映射的方法是在单个账户中显式存储一个`BTreeMap`数据结构。这个账户的地址本身可以是一个PDA，或者是生成的Keypair的公钥。

这种账户映射的方法并不理想，原因如下：

*首先，你需要初始化存储`BTreeMap`的账户，然后才能向其中插入必要的键值对。然后，你还需要将这个账户的地址存储在某个地方，以便每次更新时进行更新。

*账户存在内存限制，每个账户的最大大小为10兆字节，这限制了`BTreeMap`存储大量键值对的能力。

因此，在考虑你的用例后，可以按照以下方式实现这种方法：

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

上述程序的客户端测试代码可能如下所示：

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