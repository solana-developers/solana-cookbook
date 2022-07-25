---
title: Dịch vụ tên miền
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Dịch vụ tên miền
  - - meta
    - name: og:title
      content: Toàn tập Solana | Dịch vụ tên miền
  - - meta
    - name: description
      content: Dịch vụ đăng ký tên miền lưu trữ thông tin về tên miền. Tìm hiểu thêm về Phân giải tên miền SOL, Tra cứu Tên miền đảo/Tên miền con, và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Dịch vụ đăng ký tên miền lưu trữ thông tin về tên miền. Tìm hiểu thêm về Phân giải tên miền SOL, Tra cứu Tên miền đảo/Tên miền con, và nhiều tài liệu tham khảo khác cho lập trình Solana trong Toàn tập Solana.
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

# Dịch vụ tên miền

## Dịch vụ đăng ký tên miền

Dịch vụ đăng ký tên miền lưu trữ thông tin về tên miền. Nó được cấu tạo bởi 2 phần:

- Phần mào đầu
- Phàn dữ liệu

Dữ liệu cho tên miền lưu được đứng trước bởi một phần mào đầu, bên dưới là cấu trúc của phần mào đầu trong JS:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/schema/schema.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/schema/schema.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Phân giải tên miền SOL

Tên miền .SOL là các tên miền độc nhất, dễ đọc, và có thể chuyển đổi thành khoá công khai. Nhiều ví sử dụng chúng như là một tuỳ chọn khác cho việc gửi nhận token và SOL. Bạn có chuyển đổi tên miền .SOL thành khoá công khai tương ứng với ví dụ bên dưới:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sol-domain/resolve-sol-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Tra cứu ngược

Tra cứu ngược có thể được sử dụng để phân giải tên miền từ khoá công khai của nó.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-domain/reverse-look-up-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Tra cứu tên miền con

Để phân giải một tên miền con bạn cần phải:

1. Truy vấn khoá của tên miền cha
2. Truy vấn khoá của tên miền con
3. Truy vấn thông tin account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-sub-domain/resolve-sub-domain.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Tìm tất cả tên miền được sở hữu bởi một khoá công khai

Bạn có thể truy vấn tất cả tên miền của một ví bằng hàm `getProgramAccounts` với bộ lọc `memcmp`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/find-for-owner/find-for-owner.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/find-for-owner/find-for-owner.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Phân giải một Twitter Handle

Twitter handles có thể được [đăng ký trên dịch tên miền Solana](https://naming.bonfida.org/#/twitter-registration) và được dùng giống như tên miền .SOL

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/resolve-twitter/resolve-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Tra cứu ngược của một Twitter Handle

Để tìm địa chỉ SOL tương ứng với một Twitter handle, bạn có thể thực hiện tra cứu ngược

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/name-service/reverse-look-up-twitter/reverse-look-up-twitter.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
