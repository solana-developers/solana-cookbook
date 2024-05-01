---
title: Tương tác với Tokens
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Tương tác với Tokens
  - - meta
    - name: og:title
      content: Toàn tập Solana | Tương tác với Tokens
  - - meta
    - name: description
      content: Tìm hiểu các sử dụng, chuyển và hơn thế nữa với tokens trên Solana
  - - meta
    - name: og:description
      content: Tìm hiểu các sử dụng, chuyển và hơn thế nữa với tokens trên Solana
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

# Token

## Tôi nên cần gì để bắt đầu với SPL-Tokens?

Mỗi khi bạn tương tác với token trên Solana, bạn thực chất đang tương tác với Solana Program Library Token, gọi tắt là SPL-Token Standard. Chuẩn SPL-Token yêu cầu một thư viện đặc thù để sử dụng và bạn có thể tìm thấy bên dưới tuỳ vào ngôn ngữ lập trình của bạn.

<CodeGroup>
  <CodeGroupItem title="TS" active>

```
"@solana/spl-token": "^0.2.0"
```

  </CodeGroupItem>
</CodeGroup>

## Làm thế nào để tạo một token mới

Tạo mới token có thể thực hiện bằng cách tạo một "mint account". Account này sẽ được sử dụng lưu đúc token cho token account và ghi nhớ tổng cung cung khởi tạo.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-mint-account/create-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-mint-account/create-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để đọc truy vấn token mint

Để có thể đọc tổng cung hiện tại, chủ sở hữu, hoặc số chữ số phần thập phân (decimals) mà token định nghĩa, bạn sẽ cần lấy dữ liệu dữ liệu mint account.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-mint-account/get-mint-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-mint-account/get-mint-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## <a name="create-token-account"></a> Làm thế nào để tạo một token account

Một token account là bắt buộc cần có để chứa tokens. Mỗi token mint có một token account khác nhau tương ứng với nó.

Associated Token Accounts (ATA) được tạo một cách "bất biến" cho các cặp khoá. ATA là phương pháp khuyên dùng để quản lý token account.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/create-token-account/ata.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/create-token-account/ata.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để truy vấn token acount

Mỗi token account chứa thông tin về chủ sỡ hữu token, loại mint, só dư, và số chữ số phần thập phân.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account/get-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account/get-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để truy vấn số dư của token account

Thông tin số dư token của một token account có thể được truy vấn bằng một hàm gọi duy nhất.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/token/get-token-balance/get-token-balance.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-balance/get-token-balance.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

::: tip
Một token account chỉ có thể chứa một loại mint duy nhất. Khi bạn khai báo token account, bạn cũng phải chỉ rõ lại mint.
:::

## Làm thế nào để đúc token

Khi bạn đúc token, bạn tăng số lượng tổng cung và chuyển số lược token mới cho token account mong muốn.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/mint-token/mint-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/mint-token/mint-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để chuyển token

Bạn có thể chuyển token từ một token account đến một token account khác.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/transfer-token/transfer-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/transfer-token/transfer-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để đốt token

Bạn có thể đốt (huỷ) token nếu bạn là chủ sỡ hữu của token đó.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/burn-token/burn-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/burn-token/burn-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để đóng một token account

Bạn có thể đóng một token account nếu bạn không muốn dùng nó nữa. Sẽ có 2 trường hợp:

1. Wrapped SOL - Đóng và chuyển Wrapped SOL thành SOL
2. Các Token khác - Bạn có thể đóng chỉ khi số dư của token account là 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/close-token-account/close-token-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/close-token-account/close-token-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để thiết lập chủ sở hữu cho token account và mint

Bạn có thể thiết lập hoặc cập nhật chủ sỡ hữu. Có 4 loại:

1. MintTokens (mint account)
2. FreezeAccount (mint account)
3. AccountOwner (token account)
4. CloseAccount (token account)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/set-authority/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/set-authority/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để uỷ quyền cho một token đại diện (delegate)

Bạn có thể thiết lập một đại diện với một số lượng cho phép. Sau khi thiết lập xong, người đại diện sẽ giống như một chủ sỡ hữu khác của token account của bạn. `Một token account chỉ có thể uỷ quyền cho một account tại một thời điểm`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/approve/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/approve/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để thu hồi một token đại diện

Thu hồi sẽ thiết lập biến `delegate` về `null` và số dư uỷ quyền về 0.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/revoke/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/revoke/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để quản lý wrapped SOL

Wrapped SOL cũng chỉ giống như các lại token mint khác. Điểm khác là bạn có thể sử dụng `syncNative` và tạo token account dựa trên địa chỉ `NATIVE_MINT`.

### Tạo token account

Tương tự [Làm thế nào để tạo một token account](#create-token-account) nhưng thay địa chỉ mint với `NATIVE_MINT`

```js
import { NATIVE_MINT } from "@solana/spl-token";
```

### Thêm số dư

Có hai cách để thêm số dư cho Wrapped SOL

#### 1. Bằng cách chuyển SOL

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### 2. Bằng cách chuyển Token

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/wrapped-sol/add-balance-by-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/wrapped-sol/add-balance-by-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để truy vấn tất cả token account của một Chủ

Bạn có thể truy vấn tất cả token account của cùng một chủ. Có 2 cách để thực hiện.

1. Lấy tất cả token account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/all.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/all.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

2. Lọc bằng mint

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/token/get-token-account-by-owner/by-mint.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/token/get-token-account-by-owner/by-mint.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>