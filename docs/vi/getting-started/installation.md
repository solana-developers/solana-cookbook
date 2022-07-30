---
title: Cài đặt
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Cài đặt
  - - meta
    - name: og:title
      content: Toàn tập Solana | Cài đặt
  - - meta
    - name: description
      content: Tìm hiểu làm thế nào để bắt đầu với Solana thông qua các hướng dẫn, bài giảng, và ví dụ mẫu.
  - - meta
    - name: og:description
      content: Tìm hiểu làm thế nào để bắt đầu với Solana thông qua các hướng dẫn, bài giảng, và ví dụ mẫu.
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

## Cài đặt Web3.js

Có rất nhiều thư viện Javascript hoặc Typescript bạn có thể dùng để tương tác với Solana.<br/>

### Web3.js

[`@solana/web3.js`](https://solana-labs.github.io/solana-web3.js/) là một thư viện phổ biến và hỗ trợ nhiều công cụ thiết yếu cho việc lập trình trên Solana. Ví dụ như đọc dữ liệu từ blockchain, kí giao dịch, gửi giao dịch.

Bạn có thể cài đặt thông qua các bước sau:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/web3.js
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/web3.js
```

  </CodeGroupItem>

  <CodeGroupItem title="BROWSER">

```html
<!-- Development (un-minified) -->
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js"></script>

<!-- Production (minified) -->
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

---

### SPL-Token

`@solana/spl-token` là một thư viện chứa rất nhiều hàm con (Javascript/Typescript) để tương tác với SPL tokens (Chuẩn token trên Solana). Bạn có thể dùng nó để tạo SPL token mới, chuyển/nhận token, vân vân.

Bạn có thể cài đặt thông qua các bước sau:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/spl-token
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/spl-token
```

  </CodeGroupItem>

  <CodeGroupItem title="BROWSER">

```html
<!-- Development (un-minified) -->
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.js"></script>

<!-- Production (minified) -->
<script src="https://unpkg.com/@solana/spl-token@latest/lib/index.iife.min.js"></script>
```

  </CodeGroupItem>
</CodeGroup>

---

### Wallet-Adapter

Đây là một tập hợp các thư viện viết sẵn giúp bạn nhanh chóng tạo kết nối giữa ứng dụng và ví người người dùng trên Solana. Hiện tại, thư viện đang hỗ trợ Svelte, Angular, Vue.js và React. Wallet-adaper có thể tạo kết nối với các ví diện tử như [Phantom](https://phantom.app/), [Solflare](https://solflare.com/), và nhiều ví khác.

Để cài đặt thư viện, bạn cần thông qua các bước sau dây:

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add @solana/wallet-adapter-wallets \
    @solana/wallet-adapter-base
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install --save @solana/wallet-adapter-wallets \
    @solana/wallet-adapter-base
```

  </CodeGroupItem>
</CodeGroup>

## Cài đặt Rust

<CodeGroup>
  <CodeGroupItem title="MACOS" active>

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

  </CodeGroupItem>
  <CodeGroupItem title="LINUX">

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

  </CodeGroupItem>
</CodeGroup>

Trên Windows, vui lòng tham khảo [Trang chủ cài đặt Rust](https://www.rust-lang.org/tools/install).

## Cài đặt CLI

### macOS & Linux

Mở ứng dụng Terminal ưa thích của bạn.

Thay `LATEST_RELEASE` với phiên bản mong muốn và tiến hành cài [phiên bản của Solana](https://github.com/solana-labs/solana/releases) trên máy tính của bạn bằng câu lệnh:

```bash
sh -c "$(curl -sSfL https://release.solana.com/LATEST_RELEASE/install)"
```

Bạn có thể thay `LATEST_RELEASE` với các nhãn phiên bản ứng với phiên bản mong muốn, hoặc có thể sử dụng 3 nhãn đại diện là `stable`, `beta`, hoặc `edge`. Để tìm phiên bản mới nhất, bạn có thể tham khảo danh sách phiên bản có sẵn [tại đây](https://github.com/solana-labs/solana/releases).

Nếu màn hình Terminal của bạn hiển thị những dòng bên dưới, điều đó có nghĩa là bạn đã cài đặt thành công.

```text
downloading LATEST_RELEASE installer
Configuration: /home/solana/.config/solana/install/config.yml
Active release directory: /home/solana/.local/share/solana/install/active_release
* Release version: LATEST_RELEASE
* Release URL: https://github.com/solana-labs/solana/releases/download/LATEST_RELEASE/solana-release-x86_64-unknown-linux-gnu.tar.bz2
Update successful
```

Tuỳ vào hệ thống của bạn, dòng cuối của thông báo cài đặt có thể hiển thị là:

```bash
Please update your PATH environment variable to include the solana programs:
```

Nếu nhận được thông báo trên, bạn cần sao chép câu lệnh ngay dưới thông báo và cập nhật vào `PATH`.

Để xác nhận cài đặt thành công và phiên bản đã cài, bạn có thể chạy câu lệnh sau:

```bash
solana --version
```

Sau khi đã cài đặt hoàn tất, câu lệnh `solana-install update` có thể được sử dụng để cập nhật các phiên bản Solana về sau.

#### Tải Binaries (Linux)

Khác hơn, bạn cũng có thể cài đặt bằng bản binaries.

Tải bản binaries bằng cách truy cập
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
sau đó tải **solana-release-x86_64-unknown-linux-msvc.tar.bz2** và giải nén tệp:

```bash
tar jxf solana-release-x86_64-unknown-linux-gnu.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

#### Tải Binaries (macOS)

Khác hơn, bạn cũng có thể cài đặt bằng bản binaries.

Tải bản binaries bằng cách truy cập
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
sau đó tải **solana-release-x86_64-apple-darwin.tar.bz2** và giải nén tệp:

```bash
tar jxf solana-release-x86_64-apple-darwin.tar.bz2
cd solana-release/
export PATH=$PWD/bin:$PATH
```

---

### Windows

Mở Command Prompt (`cmd.exe`) với quyền Administrator.

Bạn có thể tìm Command Prompt bằng thanh tìm kiếm trên Windows. Một khi tìm thấy Command Prompt, nhấp chuột phải và chọn “Open as Administrator”. Nếu xuất hiện thông báo “Do you want to allow this app to make changes to your device?”, vui lòng chọn 'Yes'.

Chép và dán câu lệnh bên dưới. Sau đó, nhấn Enter để tải bộ cài đặt Solana và thư mục tạm:

```bash
curl https://release.solana.com/v1.9.16/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs
```

Nếu `v1.9.16` không phải là phiên bản bạn muốn cài đặt, vui lòng tìm phiên bản thích hợp [tại đây](https://github.com/solana-labs/solana/releases).

Chép và dán câu lệnh sau, cũng như nhấn Enter để cài đặt. Nếu có bất kỳ thông báo an toàn nào từ hệ thống, vui lòng cho phép chương trình tiếp tục quá trình cài đặt.

```bash
C:\solana-install-tmp\solana-install-init.exe v1.9.16
```

Để tìm các phiên bản, vui lòng truy cập danh sách [tại đây](https://github.com/solana-labs/solana/releases).

Khi nào cài đọc hoàn thành, nhấn Enter để kết thúc.

Đóng của sổ Command Prompt hiện hành, đồng thời mở một cửa sổ Command Prompt mới với quyền truy cập là User.

Tìm "Command Prompt" trong thanh tìm kiếm, sau đó nhấp chuột trái và biểu tượng Command Prompt (không cần thiết phải chạy dưới quyền Administrator).

Xác nhận phiên bản `solana` đã cài bằng cách:

```bash
solana --version
```

Một khi đã hoàn tất, câu lệnh `solana-install update` có thể được sử dụng để cập nhật các phiên bản Solana về sau.

#### Tải Binaries

Khác hơn, bạn cũng có thể cài đặt bằng bản binaries.

Tải bản binaries bằng cách truy cập vào
[https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest),
sau đó tải **solana-release-x86_64-pc-windows-msvc.tar.bz2** và giải nén tệp bằng WinZip hoặc phần mềm tương tự.

Mở một cửa sổ Command Prompt và điều hướng vào thư mục đã giải nén đồng thời chạy câu lệnh:

```bash
cd solana-release/
set PATH=%cd%/bin;%PATH%
```

### Biên dịch từ mã nguồn

Nếu bạn không thể sử dụng bản biên dịch sẵn binaries, hoặc muốn biên dịch thủ công từ mã nguồn, vui lòng truy cập [https://github.com/solana-labs/solana/releases/latest](https://github.com/solana-labs/solana/releases/latest), và tải tệp nến của **Source Code**. Giải nén và biên dịch binaries bằng câu lệnh:

```bash
./scripts/cargo-install-all.sh .
export PATH=$PWD/bin:$PATH
```

Sau đó, bạn phải chạy lệnh bên dưới để đặt được kết quả giống với bản binaries biên dịch sẵn:

```bash
solana-install init
```
