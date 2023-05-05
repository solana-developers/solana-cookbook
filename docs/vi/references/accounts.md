---
title: Accounts
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Tài liệu tham khảo cho Account
  - - meta
    - name: og:title
      content: Toàn tập Solana | Tài liệu tham khảo cho Account
  - - meta
    - name: description
      content: Tìm hiểu chi tiết về Account trên Solana và cách sử dụng trong lập trình Program.
  - - meta
    - name: og:description
      content: Tìm hiểu chi tiết về Account trên Solana và cách sử dụng trong lập trình Program.
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

# Accounts

## Làm thế nào để tạo một System Account

Tạo một System Account nghĩa là tạo một Account với chủ sở hữu là [System Program][1]. Khi thực thi, Solana sẽ được gán vào một Account, truy cân để ghi dữ liệu, hoặc chuyển lamports. Khi khởi tạo Account, chúng ta phải phân phát một vùng nhớ với đọ dài cố định trước tiên (`space`) và số lamports đủ để thuê vùng nhớ đó. [Phí thuê][2] là chi phí trả cho việc giữ vùng nhớ của Account tồn tại trên Solana.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-system-account/create-system-account.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-system-account/create-system-account.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Tính chi phí cho một account

Để giữ account tồn tại trên Solana, bạn sẽ phải bỏ ra một khoảng [phí thuê][2]. Một account có thể được miễn phí hoàn toàn nếu cọc đủ số phí thuê tối thiểu 2 năm. Để tính toán được, bạn cần phải biết chính xác độ lớn dữ liệu sẽ được lưu vào account đó.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/rent-exemption/rent-exemption.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="CLI">

@[code](@/code/accounts/rent-exemption/rent-exemption.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Làm thế ào để tạo account với seeds

Bạn có thể sử dụng `createAccountWithSeed` để tiện quản lý thay vì phải tạo hàng tá những cặp khoá ngẫu nhiên.

### Tìm Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/generate/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/generate/main.preview.en.rs)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Tạo Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/creation/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/creation/main.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Chuyển lamports

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/create-account-with-seed/transfer/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/create-account-with-seed/transfer/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Chỉ khi account được sở hữu bởi System Program mới có thể chuyển lamports thông qua System Program.
:::

## Cách tạo PDAs

[Program derived address(PDA)][3] giống như một địa chỉ bình thường với vài điểm khác biệt như sau:

1. Nằm ngoài đường cong ed25519
2. Sử dụng program để ký thay vì khoá riêng tư

**Lưu ý**: PDA có thể được tạo bởi Program. Địa chỉ của PDA có thể được tạo ở phí người dùng.

::: tip
Mặc dù PDA có thể được suy ra bằng `program_id`, nó không có nghĩa là PDA phải được sở hữu bởi cùng một Program. (Ví dụ, bạn có thể khởi tạo một PDA như là một Token Account và được kiểm soát bởi Token Program)
:::

### Sinh ra một PDA

`findProgramAddress` sẽ nhận một byte phụ ở cuối `seed` và được gọi là `bump`. Bump bắt đầu từ 255 và kết thúc ở 0. Giá trị bump đầu tiên khiến cho địa chỉ PDA nằm ngoài đường cong ed25519 sẽ được chấp nhận. Như vậy, bạn sẽ luôn thu được kết qua giống nhau nếu truyền vào cùng một `program_id` và `seed`.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/accounts/program-derived-address/derived-a-pda/find-program-address.en.rs)

  </CodeGroupItem>
</CodeGroup>

### Tạo một PDA

Bên dưới là một ví dụ Program tạo ra và sở hữu một PDA Account và một ví dụ truy vấn Program từ người dùng.

#### Program

Ví dụ bên dưới thể hiện một chỉ thị đơn `system_instruction::create_account` dùng để tạo một PDA Account với dung sai là `space` và phí thuê là `rent_lamports`. Chi thị được ký bằng PDA thông qua hàm `invoke_signed` tương tự như đã trình bày bên trên.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Người dùng

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/create-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để ký bằng PDA

PDA duy nhất chỉ có thể dược ký bằng Program. Bên dưới là một Program ví dụ của việc ký bằng PDA và truy vấn program đó từ người dùng.

### Program

Ví dụ bên dưới trình bày một chỉ thị đơn dùng để chuyển SOL từ PDA với seed là `escrow` đến một account được truyền vào. `invoke_signed` được dùng để PDA ký.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Người dùng

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/program-derived-address/sign-a-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để truy vấn các account của một program

Để truy vấn tất cả các account được sở hữu bởi một program, tham khảo [phần hướng dẫn](../guides/get-program-accounts.md) để hiểu về hàm `getProgramAccounts` và tham số của nó.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/basic/basic.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust">

@[code](@/code/get-program-accounts/basic/basic.en.rs)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/get-program-accounts/basic/basic.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Làm thế nào để đóng account

Bạn có thể đóng một account (xoá hết dữ liệu bên trong) bằng cách rút toàn bộ SOL bên trong account đó. (Tham khảo [phí thuê][2] để hiểu rõ)

#### Program


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="rust" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

#### Người dùng

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/close-account/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/close-account/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để truy vấn số dư của một account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.rs)

  </template>
  
  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Python">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.py)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="C++">

  <template v-slot:default>

@[code](@/code/accounts/get-balance/main.en.cpp)

  </template>

  <template v-slot:preview>

@[code](@/code/accounts/get-balance/main.preview.en.cpp)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

::: tip
Nếu bạn muốn đọc số dư token, bạn sẽ cần biết địa chỉ của token account. Tham khảo [Token References](token.md) để hiểu rõ.
:::

[1]: https://docs.solana.com/developing/clients/javascript-reference#systemprogram
[2]: https://docs.solana.com/developing/programming-model/accounts#rent
[3]: https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses
