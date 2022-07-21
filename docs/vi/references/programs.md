---
title: Xây dựng Programs
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Xây dựng Programs
  - - meta
    - name: og:title
      content: Toàn tập Solana | Xây dựng Programs
  - - meta
    - name: description
      content: Tìm hiểu làm thế nào để xây dựng Program trên Solana, cũng như gọi hàm giữa các program, được dữ liệu account, và nhiều tài liệu tham khảo khác trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Tìm hiểu làm thế nào để xây dựng Program trên Solana, cũng như gọi hàm giữa các program, được dữ liệu account, và nhiều tài liệu tham khảo khác trong Toàn tập Solana.
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

# Xây dựng Program

## Làm thế nào để chuyển SOL trong một program

Program trên Solana có thể chuyển lamports ừ một account đến một account khác mà không cần đến 'truy vấn thuần' System program. Một luật cơ bản đó là program của bạn có thể chuyển lamports từ bất kỳ account nào mà nó sở hữu đến gần như hầu hết các account khác.

Tuy nhiên, account nhận *không được* là account sở hữu bởi chương chình đó.

<CodeGroup>
  <CodeGroupItem title="Program">

@[code](@/code/programs/transferring-lamports/transferring-lamports.rs)

  </CodeGroupItem>
</CodeGroup>

## Làm thế nào để lấy thời gian trong một program

Đọc thời gian có thể được hoàn thành bằng 2 cách:

1. Truyền `SYSVAR_CLOCK_PUBKEY` và trong chỉ thị.
2. Truy cập trực thiếp vào Clock bên trong chi thị.

Cả hai cách đều hoạt động tốt, vì một vài program cũ vẫn còn dùng `SYSVAR_CLOCK_PUBKEY` như một account truyền vào trong chỉ thị.

### Truyền Clock như là một account trong chỉ thị

Giả sử chúng ta khởi tạo một chỉ thị nhận vào một account để khởi tạo và địa chỉ `sysvar`

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Bây giờ, chúng ta truyền địa chỉ `clock` của `sysvar` thông qua đoạn mã ở phía người dùng

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-one/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-one/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

### Truy cập Clock trực tiếp bên trong chỉ thị

Giả sử chúng ta tạo ra một chỉ thị tương tự như trên nhưng sẽ không truyền vào `SYSVAR_CLOCK_PUBKEY` từ phía người dùng.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Chỉ thị ở phía người dùng giờ chỉ cần truyền duy nhất trạng thái và account chịu phí.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/get-clock/method-two/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/get-clock/method-two/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để thay đổi kích thước account

Bạn có thể thay đổi kích thước của một account sở hữu bởi program với hàm `realloc`. `realloc` có thể thay đổi kích cỡ của account lên đến 10KB. Khi sử dụng `realloc` để tăng kích thước của một account, bạn phải chuyển thêm lamports vào cọc để giữ cho account được miễn phí thuê.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/realloc/realloc.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/realloc/realloc.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để gọi giữa các program (Cross Program Invocation - CPI)

Một CPI hiểu đơn giản là gọi chỉ thị của một program từ một program khác. Một ví dụ kinh điển là hàm `swap` trong Uniswap. Chương trình `UniswapV2Router`, là chương trình xử lý luận lý cho quá trình hoán đổi các loại token, sẽ gọi qua chương trình `ERC20` để thực hiện chức năng chuyển token từ đó hoán đổi các token với nhau. Tương tự vậy, chúng ta muốn có thể gọi chỉ thị của một program cho nhiều mục đích khác nhau.

CÙng nhau xem qua ví dụ đầu tiên về chỉ thị `transfer` của SPL Token Program. Những account cần thiết chúng ta cần truyền vào sẽ là:

1. Token Account nguồn (Account mà chúng ta đang giữ token)
2. Token Account đích (Account chúng ta muốn chuyển token tới)
3. Chủ sở hữu Token Account nguồn (Địa chỉ ví của chúng ta và sẽ dùng để ký)

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Chỉ thị ở phía người dùng sẽ trông giống như bên dưới. Để biết cách tạo mint và token account, vui òng tham khảo các đoạn mã bên cạnh.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Bây giờ hãy thử cùng nhau xem qua một ví dụ khác với chỉ thị `create_account` của System Program. Lần này, chúng ta không cần phải truyền `token_program` như là một account trong hàm `invoke`. Ngoài ra, bạn vẫn cần phải truyền `program_id` trong câu chỉ thị dẫn và trong trường hợp này `program_id` sẽ là địa chỉ System Program, ("11111111111111111111111111111111"). Các account truyền vào sẽ là:

1. Account chịu phí để trả phí thuê
2. Account để được tạo
3. Account cho System Program

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/program-system/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Tương tự code ở phía người dùng sẽ giống như sau:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/cpi-transfer/client-system/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/cpi-transfer/client-system/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để tạo PDA

Một PDA đơn giản là một account sở hữu bởi một program, và không có khoá riêng tư tương ứng. Chữ ký cho account này sẽ được ký bằng tập hợp gồm seeds, bump (để đảm bảo account không nằm trên đường cong ed25519). "**Tìm ra**" một PDA là khác với "**tạo ra**" nó. Một người có thể tìm ra PDA bằng `Pubkey::find_program_address`. Tạo ra PDA lại có nghĩa là khởi tạo vùng nhớ cho account đó và thiết lập các trạng thái cho nó. Một account từ cặp khoá có thể được tạo bên ngoài program, sau đó được truyền lên cho program khởi tạo nó. Không may cho PDA, chúng lại cần được khởi tạo on-chain bởi vì điều hiển nhiên là nó không có khoá riêng tư tương ứng để tạo chữ ký cho nó. Do đó, chúng ta phải sử dụng `invoke_signed` kèm với seeds của PDA và chữ ký địa chỉ chịu phí để khỏi tạo PDA đó.


<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Bạn có thể gửi những account cần thiết từ phía người dùng như sau:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/programs/create-pda/client/main.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/create-pda/client/main.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để đọc Account

Hầu hết tất cả chỉ thị trên Solana có thể yêu cầu tối thiểu 2-3 account, và chúng sẽ được tham chiếu thông qua chỉ thị dựa trên thứ tự được thiết lập sẵn. Công việc sẽ khá đơn giản nếu bạn đọc đã nắm rõ phương thức `iter()`trong Rust, thay vì tham chiếu tuwngf account bằng chỉ số. Phương thức `next_account_info` cơ bản sẽ lần lướt rút các account trong mảng các account. Thử quan sát ví dụ bên dưới với một câu chỉ thị đơn giản bao gồm nhiều account và cần được trải ra.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/read-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để kiểm tra account

Bởi vì program trên Solana không lưu giữ trạng thái (stateless), một người tạo program như chúng ta sẽ cần đảm bảo các account truyền lên phải được kiểm tra hợp lệ kỹ càng nhất có thể để tránh các account giả mạo nhằm mục đích khai thác lỗ hổng của program. Những bài kiểm tra cơ bản bạn có thể thực hiện gồm:

1. Kiểm tra xem accouunt cần ký đã ký chưa
2. Kiểm tra xem account cần ghi cho phép ghi hay chưa (cụ thể là `writable`)
3. Kiểm tra xem chủ sở hữu account có phải là program đang được gọi hay không
4. Nếu là lần khởi tạo đầu, kiểm tra xem account đã từng được khởi tạo hay chưa
5. Kiểm tra các địa chỉ program sẽ được gọi cpi có đúng kỳ vọng hay không

Ví dụ một chỉ thị khởi tạo `hello_state_account` và sử dụng cách bài kiểm tra bên trên như sau:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/verify-account/program/src/lib.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/programs/verify-account/program/src/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

## Làm thế nào để đọc nhiều chỉ thị từ một Transaction

Solana cho phép xử lý tất các các chỉ thị trong transaction hiện tại. Bạn có thể lưu chúng vào một biến và tương tác dần với chúng. Bạn có thể làm rất nhiều thứ với chúng, ví như kiểm tra các transaction đáng nghi.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/programs/read-multiple-instructions/program/lib.rs)

  </template>

  <template v-slot:preview>
  
@[code](@/code/programs/read-multiple-instructions/program/lib.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>
