---
title: Thử lại Transaction
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Thử lại Transaction
  - - meta
    - name: og:title
      content: Toàn tập Solana | Thử lại Transaction
  - - meta
    - name: description
      content: Thi thoảng, một Transaction hợp lệ vẫn có thể bị hỏng trước khi được ghi nhận vào block. Để giải quyết vấn đề đó, lập trình viên phải phát triển các cơ chế lan truyền tuỳ chỉnh. Chi tiết về Thử lại Transaction và các khái niệm cơn bản khác trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Thi thoảng, một Transaction hợp lệ vẫn có thể bị hỏng trước khi được ghi nhận vào block. Để giải quyết vấn đề đó, lập trình viên phải phát triển các cơ chế lan truyền tuỳ chỉnh. Chi tiết về Thử lại Transaction và các khái niệm cơn bản khác trong Toàn tập Solana.
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

# Thử lại Transaction

Trong một vài tính huống, một Transaction trông có vể hợp lệ có thể bị hết hạn ngay trước khi được chấp nhận (thêm vào block). Điều đó thường diễn ra nhất là khi mạng lưới bị nghẽn và một nốt RPC không thể truyền Transaction đến [leader](https://docs.solana.com/terminology#leader). Dưới góc độ người dùng, bạn có thể nhận ra trường hợp này khi Transaction biến mất hoàn toàn. Trong khi các nốt RPC được trang bị một thuật toán lan truyền chung, ứng dụng của các lập trình viên vẫn có khả năng phát triển các luận lý lan truyền tuý chỉnh.

## Có thể bạn chưa biết

::: tip Những điều có thể bạn chưa biết
- Các nốt RPC sẽ thử lan truyền lại Transaction khi sử dụng một thuật toán chung
- Ứng dụng riêng có thể hiện thực các luận lý lan truyền tuỳ chỉnh
- Lập trình viên nên hiểu rõ tham số `maxRetries` của phương thức `sendTransaction` trong JSON-RPC.
- Lập trình viên nên kích hoạt preflight để kiểm tra các tình huống lỗi trước khi gửi Transaction đi
- Trước khi ký lại bất kỳ một Transaction nào, là **rất quan trọng** khi đảm bảo rằng blockhash của Transaction đã hết hạn
:::

## Hành trình của một Transaction

### Làm thế nào để người dùng gửi Transactions

Trong Solana, không tồn tại khái niệm mempool. Tất cả các Transaction, dù là được tạo nên từ các Program hay là từ người dùng, đều được điều hướng hiệu quả đến các leader để họ có thể xử lý và ghi nhận chúng vào block. Có 2 cách mà một Transaction có thể dược gửi đến các leader:

1. Uỷ quyền cho các máy chủ RPC bằng phương thức [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) trong JSON-RPC.
2. Gửi trực tiếp đến các leader thông qua [TPU Client](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)

Phần lớn người dùng sẽ gửi Transaction thông qua máy chủ RPC. KHi một người dùng gửi Transaction đi, nốt RPC sẽ tiếp nhận và cố gắng truyền lần lượt các Transaction đến leader hiện tại cũng như leader tiếp theo. Cho đến khi Transaction được xử lý bởi một leader, sẽ không tồn tại bất kỳ bản sao nào của Transaction được lưu trữ ngoại trừ người dùng và các nốt RPC trung chuyển. Trong trường hợp TPU Client, quá trình lan truyền và điều hướng đến leader sẽ được xử lý toàn bộ bởi người dùng.

![Transaction Journey](./retrying-transactions/tx-journey.png)

### Làm thế nào để các nốt RPC lan truyền Transaction

Ngay sau khi một nốt RPC tiếp nhận Transaction thông quá `sendTransaction`, nó sẽ chuyển Transaction đó thành một gói tin [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) trước khi truyền đến các leader thích hợp. UDP cho phép validator có thể giao tiếp nhanh chóng với nhau, nhưng không đảm bảo gói tin có thể chắc chắn được chuyển đi đúng hướng.

Bởi vì lịch trình của các leader trong Solana là biết trước cho mỗi [epoch](https://docs.solana.com/terminology#epoch) (~2 ngày), một nốt RPC will lan truyền Transaction của nó trực tiếp đến leader hiện tại cũng như tiếp sau. Điều này trái ngược với các giao thức gossip khác, ví dụ như Ethereum truyền Transaction một cách ngẫu nhiên và phủ khắp trên toàn mạng. Mặc định, các nốt RPC sẽ thử chuyển Transaction đến các leader cứ mỗi 2 giây cho để khi, hoặc Transaction thành công, hoặc blockhash của Transaction bị quá hạn (150 blocks hoặc ~1 phút 19 giây tại thời điểm viết bài). Nếu hàng đợi các Transaction cần được truyền đi lớn hơn [10,000 transactions](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20), các Transaction đến sau sẽ bị từ chối. Để điều chỉnh cài đặt mặc định, tham khảo các tham số cho câu lệnh [tại đây](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172).

Khi một nốt RPC lan truyền một Transaction, nó sẽ cố gắng chuyển Transaction đó để [Transaction Processing Unit (TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867) của một leader.

TPU xử lý các Transaction trong 5 pha riêng biệt:
- [Fetch Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [SigVerify Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Banking Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Broadcast Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Hình ảnh được cho phép bởi Jito Labs</small>

Trong 5 pha này, Fetch Stage chịu trách nhiệm cho việc tiếp nhận Transaction. Trong phạm vi Fetch Stage, validator sẽ phân oại các Transaction mới đến dựa theo 3 cổng:

- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) xử lý các Transaction bình thường như là chuyển token, tạo NFT, và các chỉ thị cho các Program
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) tập trung hoàn toàn vào Transaction bỏ phiếu
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) điều hướng các gói tin chưa xử lý đến các leader tiếp theo nếu leader hiện tại không đủ khả năng xử lý hết tất cả các Transaction

Chi tiết hơn về TPU, vui lòng tham khảo [bài viết rất xuất sắc của Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## Khi nào các Transaction bị huỷ

Xuyên suốt hành trình của một Transaction, luôn có một vài tình huống Transaction đó có thể bị làm mất một cách tình cờ do mạng.

### Trước khi Transaction được xử lý

Nếu mạng làm mất một Transaction, khả năng gần như nó sẽ bị huỹ trước khi được xử lý bởi một leader. [Mất gói tin](https://en.wikipedia.org/wiki/Packet_loss) trong UDP là một nguyên nhân đơn giản nhất dẫn đến tình trạng trên. Trong thời gian mạng nghẽn, các validator có thể đã bị quá tải với số lượng khổng lồ các Transaction cần xử lý. Trong khi các validator được trang bị `tpu_forwards` để điều hướng các Transaction đến sau, thì vẫn luôn có một giới hạn số lượng các gói tin [được điều hướng](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389). Hơn nữa, mỗi lần điều hướng sẽ bị giới hạn trong phạm vị một đơn vị kết nối (hop) giữa các validator. Bởi vậy mà các Transaction được nhận thông qua cổng `tpu_forwards` sẽ không bao giờ được điều hướng thêm cho các validator khác.

Ngoài ra, cũng có 2 lý do được ghi nhận khác dẫn đến một Transaction bị đánh mất trước khi nó được xử lý. Trường hợp đầu tiên là những Transaction được gửi từ một RPC pool. Thi thoảng, một phần của RPC pool có thể đi nhanh hơn đáng kể phần còn lại của pool. Vấn đề này thường gặp khi các nốt trong pool cần làm việc kết hợp cùng nhau. Trong ví dụ này, [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) của Transaction được truy vấn từ phần đi nhanh hơn của pool (Máy chủ A). Khi Transaction được gửi đến phần đi chậm của pool (Máy chủ B), các nốt này sẽ không nhận ra blockhash và sẽ vô hiệu hoá Transaction đó. Chúng ta có thể phát hiện lỗi này, nếu lập trình viên kích hoạt [việc kiểm tra preflight](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) lúc gọi `sendTransaction`.

![Dropped via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

Một mạng bị rẽ nhánh tạm thời cũng có thể dẫn đến Transaction không hợp lệ. Nếu một validator bị chậm trong quá trình trung chuyển các block tại pha Banking Stage, rất có thể nó sẽ rẽ sang một nhánh thiểu số. Khi một Transaction được tạo, có khả năng Transaction tham chiếu đến `recentBlockhash` mà chỉ hợp lên trên nhánh thiểu số. Sau khi Transaction này được gửi đi, mạng lưới có thể nhảy về nhánh chính từ nhánh thiểu số trước khi Transaction được xử lý. Trong tình huống đó, Transaction sẽ không hợp lệ vì mạng không thể tìm thấy blockhash.

![Dropped due to Minority Fork (Before Processed)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### Sau khi Transaction được xử lý nhưnh trước khi được ghi vào block

Trong trường hợp một Transaction tham chiếu `recentBlockhash` từ một nhánh thiểu số, nó vẫn có thể được xử lý bính thường. Tuy nhiên trong trường hợp đó, nó chỉ được tiếp nhận bởi leader trên nhánh thiểu số. Khi leader này cố gắng chia sẻ những Transaction mà nó đã xử lý với phần còn lại của mạng, lỗi đồng thuận sẽ xảy ra với phần cồng các validator khác đang duy trì trên nhánh chính và không hề nhận ra nhánh thiểu số. Lúc đó, Transaction sẽ bị xem là không hợp lên trước khi được đóng vào block.

![Dropped due to Minority Fork (After Processed)](./retrying-transactions/dropped-minority-fork-post-process.png)

## Xử trí với Transaction bị huỷ

Trong khi các nốt RPC sẽ cố gắng lan truyền các Transaction, thuật toán được dùng thường chỉ đáp ứng các nhu cầu phổ biến và không tương thích với các nhu cầu đặt biệt. Để dự phòng trong tình huống mạng nghẽn, các lập trình viên sẽ phải tuỳ chỉnh thuật toán lan truyền trong ứng dụng của họ.

### Nghiên cứu sendTransaction

Khi cần gửi Transaction, phương thức `sendTransaction` trong RPC là công cụ cơ bản nhất sẵn có cho lập trình viên. `sendTransaction` chỉ chịu trách nhiệm cho việc trung chuyển từ người dùng đến một nốt RPC. Nêys nốt đó nhận được Transaction, `sendTransaction` sẽ trả về id của Transaction và có thể dùng nó để theo dõi tiến độ của Transaction. Một phản hồi thành công từ RPC không đồng nghĩa với việc Transaction đó đã được tiếp nhận, xử lý và đóng vào một block trên mạng lưới Solana.

:::tip
#### Tham số của Request
- `transaction`: `string` - Transaction đã được ký dầy đủ và được mã hoá lại thành chuỗi ký tự
- (optional) `configuration object`: `object` 
    - `skipPreflight`: `boolean` - Nếu `true`, bỏ qua quá trình kiểm tra Transaction bằng preflight (Mặc định: `false`)
    - (optional) `preflightCommitment`: `string` - Cấp độ [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) được dùng cho mô phỏng preflight trong ngân hàng chỗ trống (Mặc định: "finalized").
    - (optional) `encoding`: `string` - Mã hoá được dùng cho dữ liệu trong Transaction. Hoặc "base58" (chậm), hoặc "base64". (Mặc định: "base58").
    - (optional) `maxRetries`: `usize` - Số lượng tối đa lần thử lại cho nốt RPC gửi Transaction đến các leader. Nếu tham số này không được đề cập, nốt RPC sẽ thử lại cho đến khi Transaction thành công hoặc blockhash bị hết hạn.

#### Response
- `transaction id`: `string` - Chữ ký đầu tiên được nhúng vào trong Transaction. Id của transaction có thể dược dùng với [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) để cập nhật trạng thái mới nhất của Transaction.
:::

## Tuỳ chỉnh thuật toán lan truyền

Để phát triển thuật toán lan truyền của riêng mình, lập trình viên cần hiểu rõ tham số `maxRetries` trong  `sendTransaction`. Nếu được khai báo, `maxRetries` sẽ ghi đè lên giá trị mặc định của nốt RPC và cho phép lập trình viên điều khiển thử công quá trình thử lại trong [phạm vi giới hạn hợp lý](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274).

Một cài đặt phổ biến cho việc thử lại thủ công là tạm lưu `lastValidBlockHeight` được truy vấn từ [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash). Sau khi lưu lại, một ứng dụng có thể [theo dõi blockheight của mạng lưới](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) và lan truyền Transaction thủ công thông qua thuật toán tuỳ chỉnh. Có một vài ứng dụng sử dụng giải thuật [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff), thì một vài ứng dụng khác ví như [Mango](https://www.mango.markets/) chọn [liên tục tái gửi](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) Transaction với một khoảng thời gian lặp định trước cho đến khi quá hạn.

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/retrying-transactions/retry.en.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/retrying-transactions/retry.preview.en.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Khi gọi `getLatestBlockhash`, ứng dụng nên chỉ rõ mức [commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) mong muốn. Bằng cách đặt commitment là `confirmed` (đã được bỏ phiếu chọn) hoặc `finalized` (~30 block sau khi `confirmed`), ứng dụng có thể tránh được trường hợp đọc blockhash từ một nhánh rẽ thiểu số.

Nếu một ứng dụng truy cập vào những nốt RPC thông qua một máy chủ cân bằng tải, nó có lựa chọn các nốt cụ thể để chia nhỏ tải lượng. Các nốt RPC đáp ứng các yêu cầu thiên về dữ liệu như là [getProgramAccounts](./get-program-accounts.md) có thể dễ bị quá tải và bị đồng bộ chậm, cũng như là không thích hợp cho việc điều hướng Transaction. Với những ứng dụng đòi hỏi thời gian đáp ứng Transaction nhanh, nên có một máy chủ chuyên để xử lý duy nhất cho `sendTransaction`.

### Cân nhắc khi bỏ qua Preflight

Mặc định, `sendTransaction` sẽ thực hiện preflight kiểm tra 3 bước trước khi gửi Transaction đó đi. Cụ thể, `sendTransaction` sẽ:

- Xác nhận tất cả các chữ ký là hợp lệ
- Kiểm tra blockhash được tham chiếu có nằm trong phạm vi 150 block không
- Chạy giải lập transaction trong ngân hàng chỗ trống được định nghĩa bởi `preflightCommitment`.

Nếu một trong 3 bước trên bị lỗi, `sendTransaction` sẽ đẩy ra lỗi trước khi gửi transaction đi. Kiểm tra preflight sẽ không đảm bảo các trường hợp mất transaction hoặc là cho phép người dùng xử lý lỗi. Thay vào đó nó đảm bảo các lỗi cơ bản sẽ được kiểm tra trước và khuyến khích các lập trình viên nên giữ nó lại bằng cách gán `false` cho `skipPreflight`.

### Khi nào nên tái ký transaction

Dù cho tất cả nỗ lực gửi lại, thì vẫn có một xác suất mà người dùng bị yêu cầu ký lại transaction đó. Trước khi tái ký bất kỳ một transaction nào, bạn cần **đảm bảo rằng** transaction trước đó đã hết hạn đối với blockhash. Nếu transaction vẫn còn hiệu lực, cả hai transaction có thể sẽ được xử lý bởi mạng lưới. Điều tương tự cũng có thể xảy ra trong trường hợp người dùng không may gửi 2 lần với 2 transaction giống nhau.

Trong Solana, một transaction được xem là đã vô hiệu hoá và an toàn khi giá trị blockhash được tham chiếu đã quá hạn so với `lastValidBlock` trả về từ hàm `getRecentBlockhash`. Lập trình viên có thể kiểm tra nhanh chóng giá trị blockhash thông qua hàm [isBlockhashValid](https://docs.solana.com/developing/clients/jsonrpc-api#isblockhashvalid). Một khi blockhash đã quá hạn, người dùng có thể tái ký trên giá trị blockhash mới và hợp lệ.

## Lời cảm ơn

Rất cảm ơn Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__), và [Jito Labs](https://twitter.com/jito_labs) vì đã đọc và góp ý cho bài viết.
