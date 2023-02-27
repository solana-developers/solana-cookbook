---
title: Program Derived Addresses (PDAs)
head:
  - - meta
    - name: title
      content: Toàn tập Solana | PDAs
  - - meta
    - name: og:title
      content: Toàn tập Solana | PDAs
  - - meta
    - name: description
      content: PDAs là nguồn gốc của các Account được thiết kế để được kiểm soát bởi một Program cụ thể. Chi tiết về PDAs và các khái niệm cơn bản khác trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: PDAs là nguồn gốc của các Account được thiết kế để được kiểm soát bởi một Program cụ thể. Chi tiết về PDAs và các khái niệm cơn bản khác trong Toàn tập Solana.
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

# Program Derived Addresses (PDAs)

Program Derived Addresses (hay còn gọi vắn tắt là PDA) là những Account được thiết kế cho các Program có thể kiểm soát. Với PDA, Program có thể lập trình được chữ ký cho một số địa chỉ cụ thể mà không cần khoá riêng tư - private key. PDA là cơ sở để hiện thực [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs#cross-program-invocations), trong đó Solana cho phép các Program có thể tương tác cũng như kết hợp với nhau để tạo nên một hệ thống phức tạp hơn.

## Có thể bạn chưa biết

::: tip Những điều có thể bạn chưa biết
- PDA là một chuỗi 32 byte tương tự khoá công khai - public keys, nhưng lại không tồn tại khoá riêng tư tương ứng
- `findProgramAddress` được dùng để suy ra một PDA từ thông tin `program_id` và `seeds` (một tập hợp các bytes)
- Một `bump` (có giá trị 1 byte) được dùng để tạo ra một PDA khả dĩ nằm ngoài đường cong ellipitic ed25519.
- Program có thể tạo ra chữ ký cho PDA bằng cách cung cấp `seeds` và `bump` cho hàm [invoke_signed](https://docs.solana.com/developing/programming-model/calling-between-programs#program-signed-accounts)
- Một PDA chỉ có thể được ký bởi Program mà nó được suy ra.
- Ngoài việc cho phép Program có thể ký lên các instruction, PDA cũng cung cấp một interface giống với hashmap dành cho việc [đánh chỉ số Account](../guides/account-maps.md)
:::

# Chi tiết

PDA là một khối cơ sở cho việc lập trình trên Solana. Với PDA, Program có thể ký cho nhiều Account trong khi đảm bảo rằng không tồn tại người dùng nào có thể giả mạo chữ ký cho cùng Account đó. Ngoài việc tạo ra chữ ký, Program cũng có thể chỉnh sửa Account được sở hữu bởi PDA của nó.

![Accounts matrix](./account-matrix.png)

<small style="text-align:center;display:block;">Hình ảnh được cho phép bời <a href="https://twitter.com/pencilflip">Pencilflip</a></small>

### Cách sinh PDA

Để hiểu được khái niệm đằng sau PDA, là cần thiết để làm rõ rằng PDA không phải được "tạo ra" mà là "tìm ra". PDA được sinh ra từ quá trình kết hợp giữa `seeds` (ví dụ như chuỗi ký tự `“vote_account”`) và `program_id`. Việc kết hợp này được cho qua một hàm băm - sha256 - để thử xem giá trị tạo ra có phải là một khoá công khai nằm ngoài đường cong ellipitic ed25519 hay không.

Quá trình thử này sẽ có xác suất 50/50. Nghĩa là sẽ có 50% cơ hội quá trình sinh ra một khoá công khai nằm trên đường cong ellipitic ed25519. Trong trường hợp đó, chúng ta đơn giản chỉ cần thêm một vài bit vào đầu vào để thử lại. Những bit được thêm vào trong thuật ngữ kỹ thuật được gọi là bump. Trong Solana, chúng ta bắt đầu với bump = 255 và tiếp tục giảm xuống 254, 253 cứ thể cho đến khi tìm được địa chỉ PDA không nằm trên đường cong ellipitic. Việc này có vẻ thô sơ, nhưng thực ra nó lại cho chúng ta một phương pháp bất biến để suy ra PDA cho các lần thử khác nhau, miễn là cùng một giá trị đầu vào.

![PDA on the ellipitic curve](./pda-curve.png)

### Tương tác với PDAs

Khi một PDA được sinh ra, `findProgramAddress` sẽ trả về hai giá trị là địa chỉ của PDA và `bump` dùng để đảm bảo PDA này ngoài đường cong ellipitic. Với giá trị `bump` này, Program có thể [ký lên](../references/accounts.md#sign-with-a-pda) bất kỳ instruction nào có chứa PDA của nó về sau. Để ký, Program phải truyền cho instruction một danh sách các Account, các `seeds` và `bump` dùng để suy ra PDA vào hàm `invoke_signed`. Ngoài việc ký lên instruction, PDA còn ký cho việc tạo ra chính bản thân nó thông qua hàm `invoke_signed`.

Khi phát triển ứng dụng với PDA, thường thì bạn sẽ phải [lưu bump](https://github.com/solana-labs/solana-program-library/blob/78e29e9238e555967b9125799d7d420d7d12b959/token-swap/program/src/state.rs#L100) trong dữ liệu Account. Điều này cho phép lập trình viên có thể kiểm tra PDA mà không cần truyền bump vào dữ liệu đầu vào của instruction.

## <a name="resources"></a> Các nguồn tài liệu khác
- [Tài liệu chính thống](https://docs.solana.com/developing/programming-model/calling-between-programs#program-derived-addresses)
- [Understanding Program Derived Addresses](https://www.brianfriel.xyz/understanding-program-derived-addresses/)
