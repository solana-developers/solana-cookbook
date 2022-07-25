---
title: Đề xuất Kiểm thử Parity
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Đề xuất Kiểm thử Parity
  - - meta
    - name: og:title
      content: Toàn tập Solana | Đề xuất Kiểm thử Parity
  - - meta
    - name: description
      content: Đề xuất rất đa dạng trên các môi trường Solana khác nhau. Để xuất Kiểm thử Parity đảm bảo kiểm soát các kết quả đầu ra.
  - - meta
    - name: og:description
      content: Đề xuất rất đa dạng trên các môi trường Solana khác nhau. Để xuất Kiểm thử Parity đảm bảo kiểm soát các kết quả đầu ra.
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

# Đề xuất Kiểm thử Parity

Khi kiểm thử chương trình, chúng ta muốn chắc rằng chương trình sẽ chạy như nhau trên mọi môi trường nhằm đảm bảo về cả chất lượng sản phẩm cũng như ta tạo giá trị kỳ vọng.

## Có thể bạn chưa biết

::: tip Những điều có thể bạn chưa biết
- Đề xuất là không bắt buộc cho các validator trên Solana và cần được validator kích hoạt để có thể được sử dụng.
- Đề xuất có thể được kích hoạt bởi một mạng (ví dụ như testnet) trong khi vẫn vô hiệu trên mạng khác (ví dụ như mainnet-beta).
- Tuy nhiên, khi chạy chế độ mặc định `solana-test-validator` dưới máy, tất cả các đề xuất sẽ được tự động kích hoặt và sẵn sàng thực thi. Kết quả là khi kiểm thử trên máy có thể sẽ sai khác với khi triển khai chương trình và kiểm thử trên các mạng Solana khác!
:::

## Tình huống giả định

Giả sử bạn có một Transaction chưa 3 chỉ thị và mỗi chỉ thị sẽ tiêu tốn xấp xỉ khoảng 100,000 đơn vị tính toán (CU). Khi chạy trên phiên bản Solana 1.8.x, bạn sẽ thấy mức tiêu thụ CU của các chỉ thị như sau:

| Chỉ thị | CU lúc bắt đầu | Thực thi | CU còn lại |
| - | - | - | - |
| 1 | 200,000 | -100,000| 100,000
| 2 | 200,000 | -100,000| 100,000
| 3 | 200,000 | -100,000| 100,000

Trong phiên bản Solana 1.9.2, có một đề xuất được gọi là 'transaction wide compute cap'. Để xuất này nói rằng một Transaction bắt đầu với 200,000 CU mặc định và tất cả các chỉ thị trong Transaction sẽ tiêu thu cộng dồn ngân sách CU đó. Thử chạy lại cùng Transaction nhưng với phiên bản mới sẽ cho ra kết quả rất khác:

| Chỉ thị | CU lúc bắt đầu | Thực thi | CU còn lại |
| - | - | - | - |
| 1 | 200,000 | -100,000| 100,000
| 2 | 100,000 | -100,000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

Vãi! Nếu bạn không biết cái này thì có khả năng cao là bạn sẽ cảm thấy cực dị khi mà bạn chả thay đổi gì trong Transction nhưng devnet thì hoạt động ngon lành còn trên máy thì toàn là lỗi?!?

Thực ra vẫn có các để tăng ngân sách CU cho một Transaction, giả dụ như là 300,000 CU, để làm giải pháp tình thế. Nhưng điều đó cho thấy đề xuất Kiểm thử Parity sẽ cho phép bạn chủ động tránh những phiền hà trên.

There is the ability to increase the overall Transaction budget, to lets say 300_000 CU, and salvage your sanity
but this demonstrates why testing with **_Feature Parity_** provides a proactive way to avoid any confusion.

## <a name="feature-status"></a> Đề xuất Trạng thái

Rất dễ để kiểm tra những đề xuất nào đang được kích hoạt cho từng môi trường với câu lệnh `solana feature status`.

```console
solana feature status -ud   // Displays by feature status for devnet
solana feature status -ut   // Displays for testnet
solana feature status -um   // Displays for mainnet-beta
solana feature status -ul   // Displays for local, requires running solana-test-validator
```

Khác hơn, bạn cũng có thể sử dụng công cụ [scfsd](#resources) để quan sát cùng lúc trạng thái của tất cả các môi trường. Bên dưới là một phần kết quả trả ra, bạn cũng không cần `solana-test-validator` để chạy công cụ trên:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Kiểm thử Parity

Như đã lưu ý bên trên, `solana-test-validator` sẽ tự động kích hoạt tất cả các để xuất. Để trả lời cho câu hỏi "Làm thế nào tôi có thể kiểm thử chương trình dưới máy với môi trường địa phương như là môi trường devnet, testnet, hay kể cả mainnet-beta?".

Lời đáp: Một cài đặt trong phiên bản Solana 1.9.6 cho phép bạn vô hiệu hoá các đề xuất:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Ví dụ đơn giản

Giả sử bạn có một chương trình đơn giản chỉ in ra những gì nó nhận. Bạn đa kiểm thử một Transaction với 2 chỉ thị cho chường trình đó.

### Khi tất cả các đề xuất đều kích hoạt
1. Bạn khởi chạy một validator trên của sổ lệnh:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program target/deploy/PROGNAME.so --reset`
```

2. Ở một cửa sổ lệnh khác, bạn in kết quả đầu ra:

```console
solana logs
```

3. Sau đó bạn thử gửi một Transaction. Bạn sẽ thấy kết quả in ra ở cửa sổ lệnh tương tự như sau (đã được điều chỉnh để dễ đọc hơn):

```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```

Bởi vì đề xuất 'transaction wide compute cap' được mặc định tự động bật, bạn sẽ thấy rằng mỗi chỉ thị sẽ trừ tiếp vào CU từ ngân sách 200,000 CU cho một Transaction từ đầu.

### Vô hiệu một vài đề xuất

1. Trong lần này, chúng ta muốn chạy với cơ chế quản lý CU giống y với chạy trên devnet. Sử dụng công cụ được mô tả trong [Feature Status](#feature-status) để vô hiệu hoá `transaction wide compute cap` và gán cờ `--deactivate-feature` trong lúc khởi chạy validator.

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```

2. Giờ chúng ta sẽ thấy kết quả trả ra cho từng chỉ thị sẽ có ngân sách CU riêng và bằng 200,000 CU (đã được điều chỉnh để dễ dọc) và cũng chính là cài đặt hiện hành trên các môi trường khác.
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Kiểm thử Parity Đầy đủ

Bạn có thể cài đặt Parity Đầy đủ với một môi trường cụ thể bằng cách chỉ rõ đề xuất nào sẽ bị vô hiệu với cờ `--deactivate-feature <FEATURE_PUBKEY>` cho mỗi lần chạy `solana-test-validator`:

```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Cách khác, [scfsd](#resources) có cung cấp các câu lệnh để chuyển đổi để giúp nhanh chóng vô hiệu hoá một tập các đề xuất cho một môi trường và truyền vào trực tiếp lúc `solana-test-validator` khởi chạy:

```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

Nếu bạn mở một cửa sổ lệnh khác và chạy `solana feature status` trong khi validator đang chạy thì bạn sẽ thấy các đề xuất bị tắt sẽ giống với cài đặt đè xuất trên môi trường devnet.

## Cài đặt tự động cho Kiểm thử Parity Đầy đủ

Với những lập trình viên hay kiểm soát quá trình khởi chạy validator để kiểm thử bằng code, việc chỉnh sửa các cài đặt đề xuất cho validator là khả thi với TestValidatorGenesis. Với phiên bản Solana 1.9.6, một chức năng đã được thêm vào trong validator để hỗ trợ điều đó.

Tại thư mục gố của chương trình, tạo một thư mục với tên `tests` và thêm tập tin `parity_test.rs`. Bên dưới là một vài hàm mẫu bạn có thể sử dụng chúng cho mỗi bài kiểm thử.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Chúng ta có thể thêm các bài kiểm thử bên trong `mod test {...}` để chạy với cài đặt mặc định của validator (với tất cả các đề xuất được kích hoạt) và sau đó có thể vô hiệu hoá đề xuất `transaction wide compute cap` với mỗi ví dụ chạy `solana-test-validator` bằng lệnh.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

Ngoài ra, [scfs engine gadget](#resources) có thể tạo ra một vec-tơ hoàn chỉnh để vô hiệu hoá các đề xuất cho một môi trường cụ thể. Ví dụ bên dưới cho thấy cơ chế để liệt kê toàn bộ các để xuất đã bị vô hiệu trên devnet.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Chúc bạn có thời gian kiểm thử vui vẻ!


## <a name="resources"></a> Các nguồn tài liệu khác
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)