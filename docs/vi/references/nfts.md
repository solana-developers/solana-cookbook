---
title: NFTs
head:
  - - meta
    - name: title
      content: Toàn tập Solana | NFTs
  - - meta
    - name: og:title
      content: Toàn tập Solana | NFTs
  - - meta
    - name: description
      content: Tìm hiểu làm thế nào để truy vấn NFT metadata, chủ sỡ hữu NFT, đúc NFT, và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Tìm hiểu làm thế nào để truy vấn NFT metadata, chủ sỡ hữu NFT, đúc NFT, và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
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

# Non Fungible Tokens (NFTs)

## Làm thế nào để tạo một NFT

Để tạo một NFT bạn phải:

1. Đăng tải ảnh lên IPFS ví như Arweave
2. Đăng tải json metadata lên IPFS ví như Arweave
3. Gọi metaplex để tạo một account cho NFT

### Đăng tải lên Arweave

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

### Đúc NFT

Nếu bạn đã đăng tải ảnh và metadata, bạn có thể đúc NFT với đoạn mã bên dưới.

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

::: tip Lưu ý
Bạn không thể đúc một NFT với một địa chỉ khác ngoài ví của bạn. Nếu bạn gặp phải vấn đề địa chỉ người tạo, bạn nên đảm bảo rằng metadata liệt kê bạn là người tạo hợp lệ. 
:::

## Làm thế nào để truy vấn NFT Metadata

Các Metaplex NFT có metadata được lưu trên Arweave. Để có thể truy vấn được Arweave metadata, bạn phải thông qua Metaplex PDA và giải mã dữ liệu trong account đó.

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

## Làm thế nào để truy vấn chủ sở hữu của một NFTs

Nếu bạn có địa chỉ mint của một NFT, bạn có thể tìm được chủ sở hữu hiện tại của nó bằng truy vấn token account lớn nhất của địa chỉ mint đó.

Nhớ rằng vì tổng cung của NFT là 1, và chúng không thể chia nhỏ hơn, nên chỉ có duy nhất một token account sẽ chứa token đó ở mọi lúc. Tất cả các token account khác sẽ có số dư là 0.

Một khi token account lớn nhất được xác định, chúng ta có thể truy vấn chủ sỡ hữu của nó.

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

## Làm thế nào để truy vấn địa chỉ mint của NFT

Nếu bạn biết khoá công khai của Candy Machine, bạn có thể truy vấn được tất cả địa chỉ NFT mint được sinh ra từ Candy Machine đó bằng cách sử dụng đoạn mã bên dưới. Chú ý rằng chúng ta có thể sử dụng bộ lọc `memcmp` bên dưới bởi vì, trong v1, người tạo đầu tiên luôn là địa chỉ của Candy Machine.

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

Nếu bạn đang sử dụng Candy Machine v2, bạn sẽ cần truy cập vào địa chỉ "Candy Machine Creator" của nó. Địa chỉ này đơn giản là một PDA với seeds là `candy_machine` và địa chỉ Candy Machine v2. Một khi bạn có địa chỉ người tạo, bạn có thể sử dụng nó tương tự như cách mà chúng ta đã làm ở v1.

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

## Làm thế nào để truy vấn tất cả NFT từ một ví?

Khi truy vấn tất cả NFT từ một ví, bạn sẽ cần đọc tất cả token account và sau đó suy ra từng NFT một. Tất cả có thể thực hiện chỉ bằng hàm [`findDataByOwner`](https://github.com/metaplex-foundation/js/blob/248b61baf89a69b88f9a461e32b1cbd54a9b0a18/src/programs/metadata/accounts/Metadata.ts#L220-L236) từ thư viện Metaplex JS.
 
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