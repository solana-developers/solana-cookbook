---
title: Soát lỗi chương trình trên Solana
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Soát lỗi chương trình trên Solana
  - - meta
    - name: og:title
      content: Toàn tập Solana | Soát lỗi chương trình trên Solana
  - - meta
    - name: description
      content: Có một số phương pháp và công cụ hỗ trợ cho kiểm thử và soát lỗi một chương trình BPF trên Solana.
  - - meta
    - name: og:description
      content: Có một số phương pháp và công cụ hỗ trợ cho kiểm thử và soát lỗi một chương trình BPF trên Solana.
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

# Soát lỗi chương trình trên Solana

Có một vài lựa chọn và công cụ hỗ trợ cho việc kiểm thử và soát lỗi một chương trình trên Solana.

## Có thể bạn chưa biết

::: tip Những điều có thể bạn chưa biết
- Crate `solana-program-test` cho phép tạo nên một môi trường tiêu chuẩn **_local runtime_** để bạn có thể kiểm thử và soát lỗi chương trình một cách trực quan (ví dụ như trong vscode).
- Crate `solana-validator` cho phép sử dụng `solana-test-validator` để chạy các bước kiểm thử một cách tin cậy trên **_local validator node_**. Bạn có thể chạy từ trình biên tập **_tuy nhiên các điểm dừng trong chương trình sẽ bị bỏ qua_**.
- Công cụ CLI `solana-test-validator` giúp khởi chạy và tải Program cũng như thực thi các Transaction từ Rust CLI hoặc từ web3js.
- Trong tất cả các trường hợp trên, việc sử dụng macro `msg!` được khuyến khích tại thời điểm phát triển ban đầu, tuy nhiên cần xoá chúng một khi đã hoàn tất kiểm thử. Nên nhớ rằng `msg!` cũng tiêu tốn tài nguyên tính toán hay còn gọi là Compute Units. Program của bạn có thể bị lỗi một khi đạt đến giới hạn trần của Compute Unit.
:::

Những ví dụ ở các phần tiếp theo sẽ sử dụng  [solana-program-bpf-template](#resources). Vui lòng tải về máy bằng câu lệnh:

```bash
git clone git@github.com:mvines/solana-bpf-program-template.git
cd solana-bpf-program-template
code .
```
## Môi trường kiểm thử và soát lỗi trong trình biên tập

Mở tệp `src/lib.rs`

Bạn sẽ thấy ngay một Program khá đơn giản và chỉ in ra nội dụng nhận được từ điểm tiếp nhận chỉ thị: `process_instruction`

1. Vào mục `#[cfg(test)]` và chọn `Run Tests`. Nó sẽ chạy trình biên dịch sau dó thực thi bài kiểm thử `async fn test_transaction()` ngay sau đó. Bạn sẽ thấy một thông báo đơn gian in ra ở cửa sổ lệnh (Terminal) của vscode như dưới:
```bash
running 1 test
"bpf_program_template" program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
test test::test_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 33.41s
```
2. Thiết lập các điểm dừng tại `msg!` trong (11) trong chương trình 
3. Quay lại mô-đun kiểm thử, chọn `Debug` và trong khoảng vài giây trình soát lỗi sẽ dừng tại điểm đánh dấu. Bây giờ bạn có thể kiểm tra dữ liệu dần các hàm, các biến, vân vân.

Các bước kiểm thử cũng có thể được khởi chạy bằng câu lệnh: `cargo test` hoặc `cargo test-bpf`. Tất nhiên các điểm đánh dấu dừng sẽ bị bỏ qua.

Chúc mừng bạn đã hoàn thành quá trình kiểm thử và sát lỗi.

:::tip Lưu ý
Nhớ rằng bạn đang dùng một nốt local (địa phương) validator cho nên các System Program, blockhash, vân vân, sẽ không phản ánh hoặc xử lý đúng như trên các validator thuộc mạnh chính. Đó là lý do tại sao Solana gọi chúng là kiểm thử bằng nốt Local Validator!
:::


## Kiểm thử bằng nốt Local Validator trong trình biên tập

Các tập tin khai báo trong `tests/integration.rs` sẽ được quá trình kiểm thử đọc và tải vào nốt local validator.

Mặc định, các mẫu có sẵn cho việc tích hợp các bài kiểm thử sẽ chỉ có thể chạy từ câu lệnh `cargo test-bpf`. Các bước sau đây sẽ tìm hiểu cách chạy chúng trong trình biên tập cũng như in kết quả nhật ký của validator và lệnh in `msg!` từ Program của bạn. 

1. Trong thư mục gốc của dự án, chạy `cargo build-bpf` để biên dịch chương trình mẫu
2. Trong trình biên tập, mở tập tin `tests/integration.rs`
3. Chuyển dòng 1 thành câu nhận xét -> `// #![cfg(feature = "test-bpf")]`
4. Để tải chương trình đã biên dịch, ở dòng 19 thay bằng: `.add_program("target/deploy/bpf_program_template", program_id)`
5. Thêm câu lệnh sau vào dòng 22 `solana_logger::setup_with_default("solana_runtime::message=debug");`
6. Chọn `Run Test` phí trên hàm `test_validator_transaction()`

Quá trình này sẽ khởi chạy nốt validator sau đó cho phép bạn tạo một Transaction (bằng Rust) và gửi nó đến nốt bằng `RcpClient`.

Kết quả đầu ra của chương trình sẽ in ra cửa sổ lệnh của trình biên tập. Ví dụ:
```bash
running 1 test
Waiting for fees to stabilize 1...
Waiting for fees to stabilize 2...
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke [1]
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: 1 accounts, data=[1, 2, 3]
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed 13027 of 200000 compute units
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

test test_validator_transaction ... ok
test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 6.40s
```

Soát lỗi ở đây sẽ cho phép bạn dò được các hàm, phương thức đã sử dụng trong **_nội dung bài kiểm thử_** ngoại trừ các điểm dừng được đánh dấu trong chương trình.

Điều này có vẻ lời hơi phiền nhỉ!

## Kiểm thử bằng nốt Local Validator trên ứng dụng người dùng

Cuối cùng, bạn có thể khởi chạy một nốt local validator và tải lên Program của bạn cũng như bất kỳ Account bằng câu của `solana-test-validator`.

Bằng cách này, bạn sẽ cần một ứng dụng người dùng, hoặc là bằng Rust với [RcpClient](#resources), hoặc là bằng [ứng dụng JavaScript/Typescript](#resources)

Chạy `solana-test-validator --help` để hiểu thêm về các chi tiết cũng như tham số truyền vào. Ví dụ bên dưới là một cài đặt đơn giản nhất:
1. Mở cửa sổ lệnh tại vị trí thử mục gốc của dự án
2. Chạy `solana config set -ul` để trỏ cài đặt về môi trường địa phương
3. Chạy `solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so`
4. Mở một cửa sổ lệnh khác và chạy`solana logs` để bắt đầu theo dõi kết quả trả ra.
5. Bạn có thể chạy ứng dụng người sau đó và quan sát kết quả đầu ra chửa chương trình bằng cửa sổ lệnh được khởi chạy ở bước 4

Giờ đây bạn đã thành thạo mọi thứ rồi đấy!

## <a name="resources"></a> Các nguồn tài liệu khác
[solana-program-bpf-template](https://github.com/mvines/solana-bpf-program-template)

[RcpClient](https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html)

[JavaScript/Typescript Library](https://solana-labs.github.io/solana-web3.js/)
