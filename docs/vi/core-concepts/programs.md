---
title: Programs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Programs
  - - meta
    - name: og:title
      content: Solana Cookbook | Programs
  - - meta
    - name: description
      content: Programs (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programs and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Programs (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programs and more Core Concepts at The Solana cookbook.
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

# Programs

Bất kỳ lập trình viên nào đều có thể viết và triển khai một chương trình trên Solana. Programs (hay được biết đến với tên gọi là Smart Contract trên các blockchain khác) sẽ là nền tảng cho các hoạt động on-chain; thứ giúp tạo nên đa số các hình thái từ DeFi, NFTs cho đến Mạng xã hội và Trò chơi.

## Có thể bạn chưa biết

::: tip Những điều có thể bạn chưa biết
- Programs sẽ xử lý các [chỉ thị](./transactions) từ cả người dùng và các programs khác
- Tất cả các programs đều là *stateless*: mọi dữ liệu mà program tương tác đều được lưu trên những [accounts](./accounts.md) tách biệt và được truyền thông qua các chỉ thị
- Bản thân programs được lưu bên trong những accounts dược đánh dấu là `executable`
- Tất cả programs đều có owned là [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) và được thực thi bởi [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- Hầu hết các lập trình viên đều phát triển program bằng Rust hoặc C++, nhưng bạn vẫn có thể lựa chọn bất kỳ ngôn ngữ lập trình mà có hỗ trợ [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) của [LLVM](https://llvm.org/)
- Mọi programs chỉ có duy nhất một điểm truy cập nơi mà các chỉ thị được xử lý (cụ thể là `process_instruction`); các tham số đầu vào luôn bao gồm:
    - `program_id`: `pubkey`
    - `accounts`: `array`, 
    - `instruction_data`: `byte array`
:::

## Chi tiết

Không giống như hấu hết các blockchain khác, Solana tách bạch giữ code và dữ liệu. Tất cả dữ liệu mà chương trình cần tương tác sẽ được lưu ở các accounts tách biệt và được truyền thông qua các tham chiếu ở câu chỉ thị. Mô hình này cho phép một chương trình chung có thể hoạt động trên nhiều kiểu accounts khác nhau mà không cần tái cơ cấu lại chương trình. Một ví dụ hay gặp của mô hình này là Native Programs và SPL Programs.

### Native Programs & Solana Program Library (SPL) Programs

Solana trang bị sẵn một số programs nền tảng dùng để xây dựng các tương tác on-chain. Nhưng programs này thường được chia thành [Native Programs](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) và [Solana Program Library (SPL) Programs](https://spl.solana.com/).

Native Programs cung cấp các chức năng cơ sở và cần thiết để vận hành các validators. Trong các programs này, chương trình được biết đến rộng rãi nhất là [System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program). System Program chịu trách nhiệm cho việc cấp phát account mới, cũng như chuyển SOL giữa các accounts khác nhau.

SPL Programs hỗ trợ một số các hoạt động on-chain bao gồm tạo tokens, trao đổi tokens, cho vay tokens, cũng như tạo stake pools, và duy trì name service. [SPL Token Program](https://spl.solana.com/token) có thể được gọi trực tiếp thông qua Solana CLI, hoặc bằng cách khác hơn như là [Associated Token Account Program](https://spl.solana.com/associated-token-account). Associated Token Account Program thường được kết hợp với các chương trình tuỳ chỉnh để gọi đến SPL Token Program hơn là gọi độc lập. 

### Viết một Program

Programs hầu như được phát triển dựa trên Rust hoặc C++. Tuy nhiên bạn vẫn có thể phát triển bằng bất kỳ ngôn ngữ nào miễn là hỗ trợ BPF của LLVM. Hiện tại, lập trình viên cũng có thể chuyển đổi smart contract trên EVM được viết bằng Solidity thông qua dự án được khỏi xướng bởi [Neon Labs](https://neon-labs.org/) và [Solang](https://solang.readthedocs.io/en/latest/).

Đa số các programs dự trên Rust đều bám sát cái kiến trúc sau:

| Tệp            | Mô tả                                                            |
|----------------|------------------------------------------------------------------|
| lib.rs         | Để đăng ký các modules                                           |
| entrypoint.rs  | Điểm truy cập của program                                        |
| instruction.rs | Program API, tuần tự và phi tuần tự hoá dữ liệu đầu vào          |
| processor.rs   | Luận lý của Program                                              |
| state.rs       | Các đối tượng của Program, tuần tự và phi tuần tự hoá trạng thái |
| error.rs       | Định nghĩa lỗi của Program                                       |

Hiện tại, [Anchor](https://github.com/coral-xyz/anchor) đang nổi lên như là một framework phổ biến giúp phát triển programs nhanh chóng hơn. Anchor được lấy cảm hứng nhiều từ Ruby on Rails nhằm giảm thiểu các mẫu code lặp lại, đồng thời chuẩn hoá việc tuần tự và phi tuần tự hoá dữ liệu trong quá trình phát triển bằng Rust.

Programs thường được phát triển và kiểm thử trên môi trường localhost và devnet trước khi được triển khai trên testnet hoặc mainnet. Solana hỗ trợ các môi trường sau:

| Cụm môi trường       | Đường dẫn kết nối RPC                                                      |
|----------------------|----------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                        |
| Testnet              | https://api.testnet.solana.com                                             |
| Devnet               | https://api.devnet.solana.com                                              |
| Localhost            | Port mặc định: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

Sau khi triển khai lên một môi trường cụ thể, người dùng có thể tương tác với chúng on-chain thông qua [kết nối RPC](https://docs.solana.com/developing/clients/jsonrpc-api) tương ứng.

### Triển khai Programs

Lập trình viên có thể triển khai programs của họ thông qua [CLI](https://docs.solana.com/cli/deploy-a-program):

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Khi một program được triển khai, nó sẽ được biên dịch thành một [ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (có chứa BPF bytecode) và được tải lên mạng Solana. Programs được lưu trữ trong account (giống như hấu hết mọi thứ trên Solana), ngoại trừ việc được đánh đấu là `executable` và `owner` được gán cho BPF Loader. Địa chỉ của account này sẽ được gọi là `program_id` và được sử dụng nhưng là tham chiếu cho program trong các giao dịch ở tương lai.

Solana hỗ trợ đa dạng các BPF Loader với phiên bản mới nhất là [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111). BPF Loader chịu trách nhiệm cho việc điều hành các account của programs và cho phép người dùng tương tác bằng `program_id`. Tất cả programs chỉ có một điểm truy cập duy nhất noi mà các chỉ thị sẽ được ghi nhận và xử lý (cụ thể là `process_instruction`) với các tham số bao gồm
- `program_id`: `pubkey`
- `accounts`: `array`, 
- `instruction_data`: `byte array`

Mỗi khi được gọi, program sẽ được thực thi bởi Solana Runtime.

## Các nguồn tài liệu khác

- [Tài liệu chính thống](https://docs.solana.com/developing/on-chain-programs/overview)
- [Tài liệu SPL](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
