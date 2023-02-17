---
title: Lập trình ở Local
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Lập trình ở Local
  - - meta
    - name: og:title
      content: Toàn tập Solana | Lập trình ở Local
  - - meta
    - name: description
      content: Cài đặt một local validator cho môi trường lập trình dưới local và nhận SOL để kiểm thử. Chi tiết về Lập trình ở Local và các tài liệu tham khảo khác trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Cài đặt một local validator cho môi trường lập trình dưới local và nhận SOL để kiểm thử. Chi tiết về Lập trình ở Local và các tài liệu tham khảo khác trong Toàn tập Solana.
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

# Lập trình ở Local

## Khởi chạy Local Validator

Kiểm thử program của bạn trên máy cá nhân sẽ nhanh và đáng tin cậy hơn nhiều so với devnet. Quá trình này giúp bạn có thể kiểm tra chương trình trước khi triển khai và kiểm thứ chúng trên devnet.

Bạn có thể thiết lập `local-test-validator` bằng cách cài đặt [bộ công cụ solana](/vi/getting-started/installation.md#cai-đat-cli) và chạy lệnh sau:

```console
solana-test-validator
```

Lợi ích của việc chạy `local-test-validator` gồm:

- Không giới hạn truy vấn RPC
- Không giới hạn số lượng SOL nhận được để kiểm thử
- Triển khai trực tiếp program lên on-chain (`--bpf-program ...`)
- Sao chép account từ các mạng công cộng, bao gồm cả các program (`--clone ...`)
- Có thể điều chỉnh số lượng lịch sử transaction (`--limit-ledger-size ...`)
- Có thể điều chỉnh độ dài epoch (`--slots-per-epoch ...`)
- Nhảy đến bấy kỳ chỗ trống nào (`--warp-slot ...`)

## Kết nối đến môi trường

Một khi bắt đầu làm việc với môi trường phát triển ứng dụng trên Solana, bạn sẽ cần phải kết nối ứng dụng của bạn đến một điểm RPC API cụ thể. Solana có 3 môi trường công cộng cho quá trình phát triển ứng dụng:

- mainnet-beta: https://api.mainnet-beta.solana.com
- devnet: https://api.devnet.solana.com
- testnet: https://api.testnet.solana.com

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-cluster/connecting-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Cuối cùng bạn cũng có thể kết nối đến các mạng riêng, hoặc từ một điểm truy cập cá nhân, hoặc từ một dịch vụ từ xa ví dụ như:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-private-cluster/connecting-private-cluster.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Lắng nghe các sự kiện

Websockets cung cấp một giao diện pub/sub để bạn có thể lắng nghe các sự kiện cụ thể. Thay vì liên tục gọi vào các điểm thông tin thông qua HTTP để thường xuyên cập nhật dữ liệu, bạn có thể nhận được dữ liệu cập nhật mỗi khi có thay đổi xảy ra.

[`Connection`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html) trong web3 của Solana sẽ chủ động tạo ra một kết nối websocket mỗi khi bạn tạo mới `Connection` (chi tiết mã nguồn [tại đây](https://github.com/solana-labs/solana-web3.js/blob/45923ca00e4cc1ed079d8e55ecbee83e5b4dc174/src/connection.ts#L2100)).

Lớp `Connection` sẽ cung cấp các phương thức pub/sub - tất cả chúng đều bắt đầu với tiền tố `on`, giống như các `emitter`. Khi bạn gọi vào một phương thức nghe, nó sẽ đăng ký một sự kiện mới vào websocket người dùng của `Connection` vừa tạo. Ví dụ cho phương thức pub/sub bên dưới sẽ sử dụng [`onAccountChange`](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#onAccountChange). Hàm gọi lại (callback) sẽ nhận các tham số và cập nhật lại trạng thái mới (tham khảo ví dụ [`AccountChangeCallback`](https://solana-labs.github.io/solana-web3.js/modules.html#AccountChangeCallback)).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/connecting-websocket/connecting-websocket.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Nhận SOL để kiểm thử

Khi bạn làm việc trên môi trường địa phương, bạn sẽ phải cần một ít SOL để gửi transaction. Trong các môi trường không phải mainnet, bạn có thể nhận được SOL miễn phí.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/airdropping-sol/airdropping-sol.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Sử dụng Accounts và Programs trên Mainnet

Thường xuyên, các bài kiểm thử trên môi trường địa phương sẽ dùng đến các account và program chỉ sẵn có trên mainnet. Solana CLI cho phép:
* Tải xuống Programs và Accounts
* Cài đặt Programs và Accounts vào local validator

### Làm thế nào để cài đặt accounts từ mainnet

Bạn có thể tải xuống mint account của SRM vào một tập tin:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-accounts.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Sau đó, cài đặt nó vào môi trường localnet của bạn bằng cách truyền tập tin ở trên và địa chỉ đích (trên môi trường địa phương) khi bắt đầu khởi chạy validator:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-accounts.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

### Làm thế nào để cải đặt programs từ mainnet

Tương tự, bạn phải tải xuống program của Serum Dex v3:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/dump-programs.preview.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Cài đặt nó vào localnet được thực hiện bằng cách truyền tập tin program và địa chỉ đích (trên môi trường đại phương) khi bắt đầu khởi chạy validator:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:preview>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.preview.en.sh)

  </template>

  <template v-slot:default>

@[code](@/code/local-development/using-mainnet-accounts/load-programs.en.sh)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>
