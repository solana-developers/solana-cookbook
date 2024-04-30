---
title: Transactions
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Transactions
  - - meta
    - name: og:title
      content: Toàn tập Solana | Transactions
  - - meta
    - name: description
      content: Transaction là tập hợp nhiều đơn vị thực thi trên Solana. Chi tiết về Transaction và các khái niệm cơn bản khác trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Transaction là tập hợp nhiều đơn vị thực thi trên Solana. Chi tiết về Transaction và các khái niệm cơn bản khác trong Toàn tập Solana.
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

# Transactions

Người dùng có thể gọi [Program](./programs.md) bằng cách tạo và gửi một Transaction đến mạng lưới Solana. Một Transaction có thể chứa nhiều instruction bên trong, và mỗi instruction có thể tương tác với các Program khác nhau. Khi một Transaction được gửi đi, [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime) sẽ xử lý các instruction bên trong Transaction theo thứ tự và tuần tự. Nếu có bất kỳ instruction nào xảy ra lỗi, toàn bộ Transaction sẽ được xem là lỗi.

## Có thể bạn chưa biết

::: tip Những điều có thể bạn chưa biết
- Các instruction là những đơn vị thực thi nhỏ nhất trên Solana
- Mỗi instruction sẽ chứa:
    - `program_id` của Program mục tiêu
    - Một mảng tất cả `accounts` mà instruction muốn đọc hoặc ghi
    - Một mảng byte `instruction_data` cung cấp dữ liệu đầu vào cụ thể cho Program
- Nhiều instruction có thể được đóng gói trong một Transaction duy nhất
- Mỗi Transaction có thể chứa:
    - Một mảng tất cả `accounts` mà Transaction muốn đọc hoặc ghi
    - Một hoặc nhiều `instructions`
    - `blockhash` hiện tại
    - Một hoặc nhiều `signatures`
- Các instruction sẽ được thực thi tuần tự và theo thứ tự trong Transaction
- Nếu có bất kỳ instruction nào xảy ra lỗi, toàn bộ giao dịch sẽ được xem là lỗi
- Transaction có giới hạn dung lượng là 1232 bytes
:::

## Chi tiết

Solana Runtime yêu cầu instruction và Transaction phải khai báo một danh sách tất cả các Account mà chúng cần đọc hoặc ghi dữ liệu. Bằng cách yêu cầu những Account này trước, Solana Runtime có thể song song hoá quá trình thực thi xuyên suốt tất cả các Transaction.

Khi một Transaction được gửi vào mạng lưới, Solana Runtime sẽ xử lý các instructions của nó tuần tự từng instruction một theo thứ tự khai báo bên trong Transaction. Với mỗi instruction, Program được truy vấn sẽ lấy dữ liệu từ instruction và thực thi trên các Account tương ứng trong instruction đó. Program hoặc là trả về kết quả thành công, hoặc là với kết quả lỗi với mã lỗi tương ứng. Với bất kỳ lỗi nào được trả ra, toàn bộ Transaction sẽ kết thúc với lỗi ngay lập tức.

Bất kỳ Transaction nào mà thay đổi dữ liệu của Account hay rút lamports ra từ Account thì đều cần yêu cầu chữ ký của `owner` trong Account. Bất kỳ Account nào khi cần được sửa đổi đều phải đánh dấu là `writable` trong instruction tương ứng. Một Account có thể được nạp thêm lamports mà không cần xin phép, chỉ cần người trả phí cho Transaction đủ khả năng chi trả phí thuê và phí giao dịch.

Trước khi gửi đi, tất cả các Transaction phải tham chiếu [Blockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) mới nhất. Blockhash được dùng để chống trùng lặp và loại bỏ các giao dịch quá hạn. Thời hạn tối đa cho một Transaction là không quá 150 blocks so với Blockhash được ghi, và khoảng chừng 1 phút 19 giây theo ước tính tại thời điểm cuốn sách được viết.

### Phí

Mạng Solana sẽ thu 2 loại phí:
- [Phí giao dịch](https://docs.solana.com/transaction_fees) cho việc lan truyền Transaction (Hay thường được gọi là phí gas ở các blockchain khác)
- [Phí thuê](https://docs.solana.com/developing/programming-model/accounts#rent) vùng nhớ dữ liệu cho Account

Trên Solana, phí giao dịch thường bất biến, nghĩa là không có khái niệm về đánh phí theo thị trường nơi mà người dùng có thể trả phí cao hơn mặt bằng để tăng cơ hội được ưu tiên thực thi Transaction trước. Tại thời điểm tác giả viết, phí giao dịch được xác định bằng số lượng chữ ký bên trong Transaction (cụ thể là `lamports_per_signature`), và không phải bằng số bước tính toán cho Transaction đó. Điều đó được lý giải bởi vì luôn có một giới hạn trần là 1232 bytes cho mọi Transaction.

Tất cả Transaction yêu cầu ít nhất một Account là `writable` để ký Transaction đó. Một khi được gửi, Account trả phí với nhãn `writable` và `signer` sẽ được tuần tự hoá trước tiên. Account này sẽ chi trả các chi phí phát sinh của Transaction cho dù Transaction thành công hay thất bại. Nếu Account trả phí không đủ số dư để trả phí giao dịch, Transaction sẽ bị bỏ qua.

Tại thời điểm được viết, 50% phí giao dịch sẽ được thưởng cho Validator để sinh ra block, trong khi 50% còn lại sẽ được đốt. Bằng cơ cấu như vậy, Validator được khuyến khích phải xử lý càng nhiều Transaction càng tốt trong thời hạn được đề cử.

## <a name="resources"></a> Các nguồn tài liệu khác

- [Tài liệu chính thống](https://docs.solana.com/developing/programming-model/transactions)
- [Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
