---
title: Cặp khoá và Ví
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Cặp khoá và Ví
  - - meta
    - name: og:title
      content: Toàn tập Solana | Cặp khoá và Ví
  - - meta
    - name: description
      content: Tìm hiểu về Cặp khoá và Ví, ký và xác nhận tin nhắn, cũng như các tài liệu tham khảo khác cho lập trình trên Solana trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Tìm hiểu về Cặp khoá và Ví, ký và xác nhận tin nhắn, cũng như các tài liệu tham khảo khác cho lập trình trên Solana trong Toàn tập Solana.
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

# Cặp khoá và Ví

## Làm thế nào để sinh Cặp khoá

Có rất nhiều chức năng trong các thư viện Solana để tương tác được bạn sẽ phải cần có Cặp khoá hoặc Ví. Nếu bạn đang kết nối với một ví, bạn sẽ không phải lo lắng chuyện đó nữa. Tuy nhiên, nếu bạn đang cần một Cặp khoá, bạn sẽ phải sinh ra chúng.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python" >

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" >

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-keypair/generate-keypair.preview.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Làm thế nào để phục hồi một Cặp khoá từ khoá riêng tư

Nếu bạn đã có khoá riêng tư, bạn có thể phục hồi lại cặp khoá từ khoá riêng tư đó và dùng nố để kết nối với dApp của bạn.

1. Từ Bytes

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/keypair-from-secret.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

2. Từ chuỗi Base58

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/keypair-from-secret/from-bs58.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Làm thế nào để kiểm tra một cặp khoá

Nếu bạn được cho một cặp khoá, bạn có thể xác nhận rằng cặp khoá đó có khớp giữa khoá riêng tư và khoá công khai hay không.

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/verify-keypair/verify-keypair.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Làm thế nào để kiểm tra nếu một khoá công khai không tồn tại khoá riêng tư tương Ứng

Trong một vài trường hợp đặc biệt (ví dụ như PDA), khoá công khai sẽ không hề tồn tại khoá riêng tư tương ứng với nó. Bạn có thể kiểm tra được điều này bằng cách thử xem khoá công khai có nằm trên đường cong ed25519 hay không. Chỉ những khoá công khai nằm trên đường cong mới có khoá riêng tư, hay nói cách khác là được kiểm soát bởi một ví người dùng.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/check-valid-publickey/check-valid-publickey.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>


## Làm thế nào để sinh ra cụm mnemonic

Nếu bạn đang tạo ví, bạn sẽ cần sinh ra một cụm mnemonic để người dùng có thể lưu và phục hồi lại ví trong trường hợp cần.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/generate-mnemonic/from-bip39.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Làm thế nào để phục hồi lại cặp khoá từ cụm mnemonic

Có rất nhiều ví sử dụng cụm mnemonics để biểu diễn khoá riêng tư. Bạn có thể chuyển đổi giữa mnemonic và cặp khoá để kiểm thử dưới môi trường địa phương.

1. BIP39 - tạo một ví đơn

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.preview.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip39.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

2. BIP44 - nhiều ví, thường được biết đến với tên gọi ví HD (Hierarchical Deterministic - Phân quyền Tất định)

Bạn có thể tạo nhiều ví từ một seed đơn và được gọi là ví HD:

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.preview.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/mnemonic-to-keypair/from-bip44.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Làm thế nào để sinh một địa chỉ danh nghĩa

Địa chỉ danh nghĩa, hay địa chỉ tuỳ chỉnh là những địa chỉ với các tiền tố là những ký tự cụ thể. Ví dụ, một người muốn một khoá công khai sao cho nó bắt đầu với cụm từ "elv1s", hoặc "cook". Những đại chỉ nào giúp người khác có thể biết được chủ sở hữu của khoá và thuận tiện cho việc nhận dạng hơn.

Lưu ý: Càng nhiều ký tự tiền tố trong đại chỉ danh nghĩa, sẽ càng yêu cầu nhiều thời gian tính toán hơn.

::: warning
Bạn nên sử dụng CLI cho nhiệm vụ này. Ví dụ trên Python và TypeScript chỉ nhằm mục đích minh hoạ và có hiệu suất chậm hơn rất nhiều so với CLI.
:::

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/vanity-publickeys/vanity-publickeys.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Làm thế nào ký và kiểm tra tinh nhắn bằng ví

Một chức năng cơ bản của một cặp khoá là ký một tin nhắn và cho phép kiểm tra chữ ký cùng tin nhắn đó. Wuas trình xác nhận một chữ ký cho phép người nhận chắc chắn rằng dữ liệu được ký là do chủ sở hữu thực sự của cặp khoá ký lên.

Để làm được điều đó chúng ta cần sử dụng thư viện mật mã học [TweetNaCl][1].

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/sign-verify-message/sign-verify-message.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://www.npmjs.com/package/tweetnacl

## Làm thế nào để kết nối ví

Thư viện [wallet-adapter](https://github.com/solana-labs/wallet-adapter) của Solana sẽ giúp cho việc quản lý và kết nối ví trở nên hết sức đơn giản.

### React

Chạy đoạn mã bên dưới để cài đặt các thư viện cần thiết:

```/bin/bash
yarn add @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

Thư viện React wallet-adapter cho phép lập trình viên duy trì kết nối cũng như truy cập vào các trạng thái của ví thông qua `Hook` và `Context Provider` như `useWallet`, `WalletProvider`, `useConnection`, và `ConnectionProvider`. Ứng dụng React phải được bọc bởi `WalletProvider` và `ConnectionProvider`.

Ngoài ra, lập trình viên cũng có thể hiển thị kết nối đến người dùng bằng cách sử dụng `useWalletModal` để mở một cửa sổ thông báo. Lưu ý, bạn cần phải bọc toàn bộ ứng dụng bằng `WalletModalProvider` từ thư viện `@solana/wallet-adapter-react-ui`. Cửa sổ kết nối sẽ xử lý tất cả các bước kết nối nên chúng ta chỉ cần lắng nghe sự kiện kết nối ví thành công. `useWallet` sẽ trả về giá trị khác rỗng là `wallet` nếu kết nối thành công. Ngược lại, nó sẽ trả về rỗng nếu kết nối chưa thành công hoặc người dùng đã ngắt kết nối.

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-react.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-react.preview.en.tsx)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Vue

Chạy đoạn mã sau đây để cài các thư viện cần thiết:

```/bin/bash
npm install solana-wallets-vue @solana/wallet-adapter-wallets
```

Plugin [Solana Wallets Vue](https://github.com/lorisleiva/solana-wallets-vue) cho phép chúng ta khởi tạo một vùng nhớ cho ví và tạo một thuộc tính `$wallet` mới với phạm vi toàn cục. Thuộc tính này có thể được truy cập ở bất kỳ một thành phần nào. Tất cả các thuộc tính và phương thức bạn có thể lấy từ `useWallet()` đều được trình bày [ở đây](https://github.com/lorisleiva/solana-wallets-vue#usewallet-references). Chúng ta cũng cần cài và hiển thị thành phần `WalletMultiButton` để cho phép người dùng có thể chọn ví cũng như kết nối ví.

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="Vue" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-vue.en.vue)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-vue.preview.en.vue)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Svelte

Chạy đoạn mã sau đây để cài các thư viện cần thiết:

```/bin/bash
npm install @svelte-on-solana/wallet-adapter-core @svelte-on-solana/wallet-adapter-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets @solana/web3.js
```

Gói [Svelte Wallet Adapter](https://github.com/svelte-on-solana/wallet-adapter) cho phép thêm một Svelte Store (`$walletStore`) có khả năng truy xuất từ các tập tin JS, TS or/and Svelte bên trong dự án được tạo từ Svelte Template hoặc SvelteKit. Sử dụng mã nguồn tham khảo [tại đây](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/) bạn có thể sử dụng bộ tiếp hợp cho SSR và cả SPA. Gói giao diện người dùng có chứa một thành phần là `<WalletMultiButton />`, nó cho phép người dùng có thể chọn và tạo kết nối đến ví.

<SolanaCodeGroup>
   <SolanaCodeGroupItem title="Svelte" active>

  <template v-slot:default>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-svelte.en.html)

  </template>

  <template v-slot:preview>

@[code](@/code/keypairs-and-wallets/connect-to-wallet/connect-to-wallet-svelte.preview.en.html)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
