---
title: Gửi Transactions Ngoại tuyến
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Gửi Transactions Ngoại tuyến
  - - meta
    - name: og:title
      content: Toàn tập Solana | Gửi Transactions Ngoại tuyến
  - - meta
    - name: description
      content: Sau khi ký một Transaction ngoại tuyến, bất kỳ ai cũng có thể gửi nó lên trên mạng lưới. Tìm hiểu Gửi Transactions Ngoại tuyến và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Sau khi ký một Transaction ngoại tuyến, bất kỳ ai cũng có thể gửi nó lên trên mạng lưới. Tìm hiểu Gửi Transactions Ngoại tuyến và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
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

# Transaction Ngoại tuyến

## Ký Transaction

Để tạo một transaction ngoại tuyến, bạn phải ký lên transaction và sau đó bất kỳ ai đều có thể gửi transaction đó lên trên mạng lưới.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/sign-transaction/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/sign-transaction/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Ký một phần Transaction

Khi một transaction yêu cầu nhiều chữ ký, bạn có thể ký một phần của nó. Những chữ ký khác sẽ được ký sau đó và sẽ được gửi đi nếu đủ chữ ký cần thiết.

Một vài ví dụ khi nào bạn nên dùng:

- Gửi một SPL token để thanh toán
- Ký một transaction để bạn có thể kiểm tra tính đúng đắn của nó sau này
- Gọi một program tuỳ chỉnh bằng một transaction yêu cầu chữ ký của bạn

Trong ví dụ này Bob sẽ gửi có Alice một SPL token thể thanh toán cho cô ấy:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/partial-sign/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/partial-sign/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Nonce vĩnh viễn

`RecentBlockhash` là một giá trị quan trọng cho một transaction. Transaction của bạn sẽ bị từ chối nếu bạn sử dụng một blockhash đã quá hạn (sau 150 blocks). Bạ có thể sử dụng `durable nonce` để có được một blockhash không bao giờ hết hạn. Để kích hoạt cơ chế, transaction của bạn phải

1. Sử dụng một `nonce` lưu trong `nonce account` như là blockhash hiện tại
2. Đặt cơ chế `nonce advance` trong chỉ thị đầu tiên

### Tạo Nonce Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/create-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Truy vấn Nonce Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/get-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Sử dụng Nonce Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/offline-transactions/durable-nonce/use-nonce-account/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
