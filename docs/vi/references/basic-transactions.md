---
title: Gửi Transaction
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Gửi Transaction
  - - meta
    - name: og:title
      content: Toàn tập Solana | Gửi Transaction
  - - meta
    - name: description
      content: Tìm hiểu nền tảng về Transaction như là gửi SOL, SPL-Tokens, tính toán chi phí gửi transaction, và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Tìm hiểu nền tảng về Transaction như là gửi SOL, SPL-Tokens, tính toán chi phí gửi transaction, và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
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
---

# Gửi Transaction

## Làm thế nào để gửi SOL

Để gửi SOL, bạn sẽ cần tương tác với [SystemProgram][1].

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Python">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.py)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.en.py)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
   <SolanaCodeGroupItem title="Rust" active>
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.preview.rs)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-sol/sending-sol.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://docs.solana.com/developing/runtime-facilities/programs#system-program

## Làm thế nào để gửi SPL-Tokens

Sử dụng [Token Program][1] để gửi SPL Tokens. Để gửi SPL token, bạn cần biết địa chỉ token account tương ứng SPL Token được gửi. Bạ có thể biết được địa chỉ gửi và nhận bằng cí dụ dưới đây.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/sending-spl-token/sending-spl-token.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

[1]: https://spl.solana.com/token

## Làm thế nào để tính chi phí gửi transaction

Số lượng chữ ký bên trong một transaction sẽ phản ánh chi phí cho transaction đó. CHỉ cần bạn không tạo mới account, đó cũng chính là chi phí phải trả cho transaction đó. Trong trường hợp phát sinh chi phí thuê, tham khảo [tính toán phí thuê](accounts.md#calculating-rent-exemption).

Hai ví dụ sau đây sẽ trình bày 2 cách hiện hành để ước tính chi phí của một transaction.

Ví dụ đầu tiên sử dụng `getEstimatedFee`, là một phương thức mới được thêm vào lớp `Transaction`, trong khi ví dụ 2 sử dụng `getFeeForMessage`, là phương thức thay thế cho `getFeeCalculatorForBlockhash` trong lớp `Connection`.

### getEstimatedFee
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### getFeeForMessage
<SolanaCodeGroup>
    <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/calc-tx-cost/calc-tx-est-fees-for-message.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để thêm ghi chú và một transaction

Bất kỳ transaction nào cũng có thể được thêm một ghi chú thông qua [memo program][2]. Hiện tại, `programID` của **Memo Program** có thể thêm thủ công bằng địa chỉ `MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Wallet-Adapter">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.adapter.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.adapter.preview.en.tsx)

  </template>
  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="CLI">
  <template v-slot:default>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/memo/memo.en.sh)

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Làm thế nào để thay đổi ngân sách tính toán cho một transaction

Ngân sách tính toán cho một transaction có thể thay đổi được bằng cách thêm vào một chỉ thị gọi đến Compute Budget Program. Mặc định, ngân sách tính toán được thiết lập ở mức 200k đơn vị tính toán nhân với số lượng chỉ thị và không vượt quá 1.4M đơn vị tính toán. Càng ít bước tính toán, chi phí bỏ ra sẽ càng ít.

**Lưu ý**: Để thay đổi ngân sách tính toán, bạn phải chắc rằng chỉ thị đầu tiên trong 3 chỉ thị của transaction là thiết lập ngân sách.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.tsx)

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.tsx))

  </template>

  </SolanaCodeGroupItem>
  <SolanaCodeGroupItem title="Rust">
  <template v-slot:default>

@[code](@/code/basic-transactions/compute-budget/computeBudget.en.rs))

  </template>

  <template v-slot:preview>

@[code](@/code/basic-transactions/compute-budget/computeBudget.preview.en.rs))

  </template>
  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Ví dụ kết quả in ra của Program:

<CodeGroup>
  <CodeGroupItem title="Log Output">

  @[code](@/code/basic-transactions/compute-budget/log_output.txt)

  </CodeGroupItem>
</CodeGroup>


[2]: https://spl.solana.com/memo
