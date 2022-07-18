---
title: Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Accounts
  - - meta
    - name: og:title
      content: Solana Cookbook | Accounts
  - - meta
    - name: description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
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

Accounts trong lập trình Solana được hiểu như một vùng nhớ để lưu dữ liệu. Chúng là một khối cơ sở trong quá trình phát triển ứng dụng trên Solana.

## Có thể bạn chưa biết

::: tip Những điều có thể bạn chưa biết

- Accounts đươc dùng để lưu trữ dữ liệu
- Mỗi account sẽ có một địa chỉ duy nhất
- Accounts có kích thước tối đa là 10MB (10 Mega Bytes)
- PDA accounts có kích thước tối đa là 10KB (10 Kilo Bytes)
- PDA accounts có thể dùng để ký đại diện cho một program
- Kích thước accounts được cố định tại thời điểm khởi tạo, nhưng vẫn có thể điều chỉnh bằng [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- Vùng nhớ dữ liệu được cấp phát cho account phải được thuê bằng cách trả phí
- Account owner trong trường hợp mặc định sẽ là System Program
  :::

## Chi tiết

### Cấu trúc Account

Có 3 kiểu account trên Solana:

- Data accounts dùng để lưu trữ dữ liệu
- Program accounts dùng để lưu chương trình thực thi
- Native accounts ám chỉ native programs trên Solana như là System, Stake, và Vote

Kiểu data accounts lại có 2 kiểu con:

- Accounts được sở hữu bởi System
- PDA (Program Derived Address) accounts

Mỗi account lại có một địa chỉ (thường là public key - khoá công khai) và một owner (địa chỉ của một program account). Đầy đủ các trường của một account được trình bày ở bảng dưới.

| Trường     | Mô tả                                                      |
| ---------- | ---------------------------------------------------------- |
| lamports   | Số ượng lamports trong account đóng                        |
| owner      | Địa chỉ program account đang kiếm soát account đó          |
| executable | Account này có thể thực thi các chỉ thị hay không?         |
| data       | Dữ liệu thô dưới dạng các bytes được lưu trữ trong account |
| rent_epoch | Kỳ hạn thuê vùng nhớ tiếp theo cho account                 |

Có một vài quy tắc quan trọng về quyền sở hữu:

- Chỉ owner mới được chỉnh sửa cũng như rút số lamports từ một data account
- Bất kỳ ai cũng được phép nạp lamports vào một data account
- Owner của một account có thể được gán cho một owner mới khi và chỉ khi vùng nhớ của account đó được hoàn trả

Program accounts không được lưu bất kỳ trạng thái.

Ví dụ, nếu bạn có một chương trình đếm trên một program account và cho phép tăng bộ đếm lên sau mỗi lần tương tác, bạn phải tạo tối thiểu 2 accounts. Trong đó, một cho program account để lưu code thực thi, và một cho data account để lưu dữ liệu bộ đếm.

![](./account_example.jpeg)

Để tránh việc một account bị xoá, bạn phải trả chi phí để thuê vùng nhớ cho account đó.

### Thuê

Lưu trữ dữ liệu vào accounts và duy trì account đó sẽ phát sinh chi phí SOL. Chi phí này được gọi là chi phí thuê. Nếu chi phí thuê được duy trì ở mức tối thiểu là 2 năm cho account đó, thì bạn sẽ được miễn phí lưu trữ. Bạn cũng có thể thu hồi lại phí cọc bằng cách đóng account. Số lamports cọc sẽ được hoàn trả về địa chỉ ví của bạn.

Chi phí thuê được tính toán và chi trả ở 2 thời điểm khác nhau:

1. Khi có bất kỳ giao dịch nào có tham khảo đến account đó.
2. Định kỳ mỗi epoch.

Một phần của chi phí thuê thu được sẽ được tiêu huỷ, trong khi phần còn lại sẽ được phân chia cho các vote account sau mỗi slot.

Nếu một account không đủ cọc để chi trả phí thuê, account đó sẽ bị thu hồi và toàn bộ dữ liệu sẽ bị xoá.

## Các nguồn tài liệu khác

- [Solana Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Tài liệu chính thống](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Cám ơn

Khái niệm căn bản này được đóng góp của Pencilflip. [Theo dõi anh ấy trên Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
