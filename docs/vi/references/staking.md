---
title: Staking
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Staking
  - - meta
    - name: og:title
      content: Toàn tập Solana | Staking
  - - meta
    - name: description
      content: Stake SOL và kiếm phần thưởng có thể giúp tăng độ an toàn cho mạng lưới. Tìm hiểu thêm về Tạo Stake Accounts, Uỷ quyền Stake, Rút Stake, và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Stake SOL và kiếm phần thưởng có thể giúp tăng độ an toàn cho mạng lưới. Tìm hiểu thêm về Tạo Stake Accounts, Uỷ quyền Stake, Rút Stake, và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
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

# Staking

## Truy vấn danh sách Validators hiện tại

Chúng ta có thể stake SOL và kiếm phần thưởng cho việc nâng cao an toàn mạng lưới. Để stake, bạn phải uỷ quyền SOL có các validators người sẽ thực hiện việc xử lý các giao dịch.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

  </CodeGroupItem>
  <CodeGroupItem title="CLI">

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

  </CodeGroupItem>
</CodeGroup>

## Tạo một Stake Account

Tất cả các chỉ thị staking sẽ được đảm nhiệm bởi [Stake Program](https://docs.solana.com/developing/runtime-facilities/programs#stake-program). Để bắt đầu, chúng ta tạo ra một [Stake Account](https://docs.solana.com/staking/stake-accounts). Stake Account được tạo ra và quản lý rất khác so với một [System Account](accounts.md#create-a-system-account) chuẩn. Thực tế, chúng ta phải đặt `Stake Authority` và `Withdrawal Authority` của account đó.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/create-stake-account/create-stake-account.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/create-stake-account/create-stake-account.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Uỷ quyền Stake

Một khi stake account đã được cọc, `Stake Authority` có thể uỷ quyền của nó cho một validator. Mỗi stake account có thể chỉ uỷ quyền cho một validator tại một thời điểm. Thêm nữa, tất cả token trong account hoặc là phải để được uỷ quyền, hoặc là phải không uỷ quyền cho bất kỳ ai. Khi đã uỷ quyền, sẽ phải tốn một và epoch để stake account có thể hoạt động.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/delegate-stake/delegate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/delegate-stake/delegate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Truy vấn các nhà uỷ quyền bằng validator

Nhiều account có thể stake và một validator cụ thể. Để truy vấn tất cả các staker, bạn sẽ sử dụng `getProgramAccounts` hoặc `getParsedProgramAccounts` API. Tham khảo [Phần hướng dẫn](/guides/get-program-accounts.html) cho nhiều thông tin hơn. Stake account có độ dài là 200 bytes với `Voter Public Key` bắt đầu ở bytes thứ 124. [Tham khảo](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs).

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Dừng stake

Bất kỳ lúc nào sau khi một stake account được uỷ quyền, `Stake Authority` có thể được chọn để dừng account.  Dừng stake có thể mất một khoảng thời gian để hoàn thành, và phải được hoàn thành trước có thể rút SOL.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/deactivate-stake/deactivate-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/deactivate-stake/deactivate-stake.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Rút Stake

Một khi đã dừng stake, `Withdrawal Authority` có thể rút SOL về lại một system account. Và khi một stake account không còn được uỷ quyền cũng như có số dư là 0 SOL, nó sẽ bị huỷ ngay lập tức.

<!-- <CodeGroup>
  <CodeGroupItem title="TS" active> -->
<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/staking/withdraw-stake/withdraw-stake.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/staking/withdraw-stake/withdraw-stake.preview.en.ts)

  </template>
  </SolanaCodeGroupItem>
</SolanaCodeGroup>
