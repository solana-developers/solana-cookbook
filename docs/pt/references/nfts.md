---
title: NFTs
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | NFTs
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | NFTs
  - - meta
    - name: description
      content: Aprenda a obter metadados de NFT, encontrar proprietários de NFT, cunhar NFTs na rede Solana e muito mais.
  - - meta
    - name: og:description
      content: Aprenda a obter metadados de NFT, encontrar proprietários de NFT, cunhar NFTs na rede Solana e muito mais.
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

# Tokens Não Fungíveis (NFTs)

## Como criar um NFT

Para criar um NFT, você deve:

1. Carregar a imagem para o IPFS, especificamente na plataforma Arweave;
2. Carregar os metadados JSON para o IPFS, especificamente na plataforma Arweave;
3. Chamar o Metaplex para criar uma conta para o NFT.

### Carregar para o Arweave

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/upload-arweave/upload-arweave.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/upload-arweave/upload-arweave.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Python">
  <template v-slot:default>

@[code](@/code/nfts/upload-arweave/upload-arweave.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/upload-arweave/upload-arweave.preview.en.py)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Cunhar o NFT

Se você já carregou a imagem e os metadados, pode cunhar o NFT com o seguinte código:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/mint-nft/mint-nft.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/mint-nft/mint-nft.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip Observação
Não é possível cunhar um NFT com um criador diferente do seu endereço de carteira. Se encontrar problemas de criador, verifique se seus metadados o listam como o criador.
:::

## Como obter os metadados do NFT

Os NFTs do Metaplex têm metadados armazenados no Arweave. Para obter os metadados do Arweave, você deve obter o PDA do Metaplex e decodificar os dados da conta.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/get-metadata/get-metadata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/get-metadata/get-metadata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como obter o proprietário de um NFT

Se você tiver a chave de cunhagem de um NFT, poderá encontrar seu proprietário atual olhando a maior conta de token para essa chave de cunhagem.

Lembre-se de que os NFTs têm um suprimento de 1 e são indivisíveis, o que significa que apenas uma conta de token manterá aquele token em qualquer ponto no tempo, enquanto todas as outras contas de token para essa chave de cunhagem terão saldo de 0.

Depois de identificar a maior conta de token, podemos recuperar seu proprietário.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/get-owner/get-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/get-owner/get-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como obter endereços de cunhagem de NFT

Se você souber a chave pública da Candy Machine, poderá obter a lista de todos os endereços de cunhagem de NFT gerados a partir daquela Candy Machine usando o seguinte código. Observe que podemos usar o seguinte filtro `memcmp` porque, na v1, o primeiro criador é sempre o endereço da Candy Machine.

### Candy Machine V1

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/nfts-mint-addresses/mint-addresses.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/nfts-mint-addresses/mint-addresses-preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Candy Machine V2

Se você estiver usando a Candy Machine v2, primeiro precisará acessar seu endereço de "Criador da Candy Machine" (Candy Machine Creator), que é um PDA simples usando `candy_machine` e o endereço da Candy Machine v2 como sementes. Depois de ter o endereço de criador, você pode usá-lo da mesma forma que fizemos para a v1.

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/nfts-mint-addresses/mint-addresses-v2.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/nfts-mint-addresses/mint-addresses-preview-v2.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Como obter todos os NFTs de uma carteira?

Ao obter todos os NFTs de uma carteira, você precisará obter todas as contas de token e, em seguida, analisar quais são NFTs. Isso pode ser feito usando [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236), da biblioteca Metaplex JS.

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/get-all-nfts/get-all-nfts.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/get-all-nfts/get-all-nfts.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Candy Machine v2

O SDK Metaplex JS agora suporta a criação e atualização da Candy Machine v2 por meio de código. Ele permite que os desenvolvedores interajam com o programa Candy Machine v2 e criem, atualizem e excluam Candy Machines, além de cunhar NFTs a partir delas.

### Como criar uma Candy Machine

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/create-candy-machine.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/create-candy-machine.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Como excluir uma Candy Machine

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/delete-candy-machine.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/delete-candy-machine.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Como encontrar a Candy Machine por meio de autoridade

Para encontrar todas as Candy Machines cuja autoridade é uma chave pública específica, precisamos usar a função [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) juntamente com o parâmetro `type` definido como `authority`.

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/find-via-authority.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/find-via-authority.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Como encontrar a Candy Machine usando o endereço da carteira

Para buscar o objeto Candy Machine por meio de seu endereço de carteira, usamos a função [`findAllBy`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findAllBy) com o parâmetro `type` definido como `wallet`. Você pode obter o endereço de carteira da Candy Machine na aba "Anchor data" no explorador.

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/find-via-wallet.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/find-via-wallet.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Como encontrar a Candy Machine usando seu endereço

Para encontrar uma Candy Machine usando seu endereço, devemos usar a função [`findByAddress`](https://metaplex-foundation.github.io/js/classes/js.CandyMachinesV2Client.html#findByAddress).

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/find-via-address.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/find-via-address.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Como encontrar NFTs cunhados pela Candy Machine

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/find-minted-nfts.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/find-minted-nfts.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Como inserir itens em uma Candy Machine

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/insert-items.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/insert-items.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Como cunhar um NFT a partir de uma Candy Machine

Por padrão, o proprietário do NFT cunhado seria `metaplex.identity().publicKey`. Se você quiser criar o NFT para outra carteira, passe essa chave pública juntamente com o parâmetro `newOwner`.

<SolanaCodeGroup>
<SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/nfts/candy-machine/mint-nft.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/nfts/candy-machine/mint-nft.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
