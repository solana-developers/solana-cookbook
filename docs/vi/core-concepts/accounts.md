---
title: Accounts
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Accounts
  - - meta
    - name: og:title
      content: Toàn tập Cookbook | Accounts
  - - meta
    - name: description
      content: Account là khối cơ sở cở bản nhất trong lập trình Solana. Chi tiết về Account và các khái niệm cơn bản khác trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Account là khối cơ sở cở bản nhất trong lập trình Solana. Chi tiết về Account và các khái niệm cơn bản khác trong Toàn tập Solana.
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

# Account

Account trong lập trình Solana được hiểu như một vùng nhớ để lưu dữ liệu. Chúng là một khối cơ sở trong quá trình phát triển ứng dụng trên Solana.

## Có thể bạn chưa biết

::: tip Những điều có thể bạn chưa biết

- Account đươc dùng để lưu trữ dữ liệu
- Mỗi Account sẽ có một địa chỉ duy nhất
- Account có kích thước tối đa là 10MB (10 Mega Bytes)
- PDA Account có kích thước tối đa là 10KB (10 Kilo Bytes)
- PDA Account có thể dùng để ký đại diện cho một program
- Kích thước Account được cố định tại thời điểm khởi tạo, nhưng vẫn có thể điều chỉnh bằng [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- Vùng nhớ dữ liệu được cấp phát cho Account phải được thuê bằng cách trả phí
- Account owner trong trường hợp mặc định sẽ là System Program
  :::

## Chi tiết

### Cấu trúc Account

Có 3 kiểu Account trên Solana:

- Data Accounts dùng để lưu trữ dữ liệu
- Program Accounts dùng để lưu chương trình thực thi
- Native Accounts ám chỉ native programs trên Solana như là System, Stake, và Vote

Kiểu Data Account lại có 2 kiểu con:

- Account được sở hữu bởi System
- PDA (Program Derived Address) Accounts

Mỗi Account lại có một địa chỉ (thường là public key - khoá công khai) và một owner (địa chỉ của một Program Account). Đầy đủ các trường của một Account được trình bày ở bảng dưới.

| Trường     | Mô tả                                                      |
| ---------- | ---------------------------------------------------------- |
| lamports   | Số lượng lamports thuộc sở hữu bởi Account đó                         |
| owner      | Địa chỉ Program Account đang kiếm soát Account đó          |
| executable | Account này có thể thực thi các instructions hay không?         |
| data       | Dữ liệu thô dưới dạng các bytes được lưu trữ trong Account |
| rent_epoch | Kỳ hạn thuê vùng nhớ tiếp theo cho Account                 |

Có một vài quy tắc quan trọng về quyền sở hữu:

- Chỉ owner mới được chỉnh sửa cũng như rút số lamports từ một Data Account
- Bất kỳ ai cũng được phép nạp lamports vào một Data Account
- Owner của một Account có thể được gán cho một owner mới khi và chỉ khi vùng nhớ của Account đó được hoàn trả

Program Accounts không được lưu state.

Ví dụ, nếu bạn có một chương trình đếm trên một Program Account và cho phép tăng bộ đếm lên sau mỗi lần tương tác, bạn phải tạo tối thiểu 2 Account. Trong đó, một cho Program Account để lưu code thực thi, và một cho Data Account để lưu dữ liệu bộ đếm.

![](./account_example.jpeg)

Để tránh việc một Account bị xoá, bạn phải trả chi phí để thuê vùng nhớ cho Account đó.

### Thuê

Lưu trữ dữ liệu vào Account và duy trì Account đó sẽ phát sinh chi phí SOL. Chi phí này được gọi là chi phí thuê. Nếu chi phí thuê được duy trì ở mức tối thiểu là 2 năm cho Account đó, thì bạn sẽ được miễn phí lưu trữ. Bạn cũng có thể thu hồi lại phí cọc bằng cách đóng Account. Số lamports cọc sẽ được hoàn trả về địa chỉ ví của bạn.

Chi phí thuê được tính toán và chi trả ở 2 thời điểm khác nhau:

1. Khi có bất kỳ giao dịch nào có tham chiếu đến Account đó.
2. Định kỳ mỗi epoch.

Một phần của chi phí thuê thu được sẽ được tiêu huỷ, trong khi phần còn lại sẽ được phân chia cho các Vote Account sau mỗi slot.

Nếu một Account không đủ cọc để chi trả phí thuê, Account đó sẽ bị thu hồi và toàn bộ dữ liệu sẽ bị xoá.

## <a name="resources"></a> Các nguồn tài liệu khác

- [Solana Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Tài liệu chính thống](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Lời cảm ơn

Khái niệm căn bản này được đóng góp của Pencilflip. [Theo dõi anh ấy trên Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
