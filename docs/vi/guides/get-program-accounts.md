---
title: Đọc dữ liệu Program Account
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Đọc dữ liệu Program Account
  - - meta
    - name: og:title
      content: Toàn tập Solana | Đọc dữ liệu Program Account
  - - meta
    - name: description
      content: Tìm hiểu các truy vấn dữ liệu trên Solana bằng getProgramAccounts và accountsDB.
  - - meta
    - name: og:description
      content: Tìm hiểu các truy vấn dữ liệu trên Solana bằng getProgramAccounts và accountsDB.
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

# Đọc Program Account

`getProgramAccounts` là một phương thức RPC giúp lấy dữ liệu của tất cả các Account được sở hữu bởi Program. Lưu ý, phân trang vẫn chưa được hỗ trợ tại thời điểm hiện tại. Việc gọi `getProgramAccounts` nên có thêm các tham số `dataSlice` và/hoặc `filters` để cải thiện thời gian trả về với kết quả mong muốn.

## Có thể bạn chưa biết

::: tip Tham số

- `programId`: `string` - Khoá công khai của Program cần truy vấn và biểu diễn dưới dạng base58
- (Tuỳ chọn) `configOrCommitment`: `object` - Tham số cài đặt có chứa các trường tuỳ chọn sau:
    - (Tuỳ chọn) `commitment`: `string` - [State commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment)
    - (Tuỳ chọn) `encoding`: `string` - Kiểu mã hoá dữ liệu, một trong các kiểu sau: `base58`, `base64`, `jsonParsed`. Lưu ý, người dùng web3js nên sử dụng [getParsedProgramAccounts](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
    - (Tuỳ chọn) `dataSlice`: `object` - Giới hạn các Account trả về dựa trên:
        - `offset`: `number` - Vị trí bắt đầu cho dữ liệu được trả về của Account
        - `length`: `number` - Độ dài dữ liệu của Account cần trả về và được tính từ vị trí bắt đầu
    - (Tuỳ chọn) `filters`: `array` - Lọc các kết quả bằng cách sử dụng các bộ lọc sau:
        - `memcmp`: `object` - Lọc bằng cách so sánh một chuỗi dữ liệu dưới dạng các bytes với dữ liệu Account
            - `offset`: `number` - Vị trí bắt đầu trong dữ liệu Account dùng để so sánh 
            - `bytes`: `string` - Dữ liệu cần so sánh, được truyền vào dưới dạng base58 và không quá 129 bytes
        - `dataSize`: `number` - Lọc theo độ lớn của dữ liệu Account
    - (Tuỳ chọn) `withContext`: `boolean` - Đóng gói kết quả vào một đối tượng [RpcResponse JSON](https://docs.solana.com/developing/clients/jsonrpc-api#rpcresponse-structure)

##### Trả về

Mặc định `getProgramAccounts` sẽ trả về một mảng các đối tượng JSON với cấu trúc như sau:

- `pubkey`: `string` - Địa chỉ của Account và được mã hoá base58
- `account`: `object` - Là một đối tượng JSON với các trường con như sau:
    - `lamports`: `number`, số dư lamports của Account
    - `owner`: `string`, Địa chỉ của Program sở hữu Account và được mã hoá base58
    - `data`: `string` | `object` - Dữ liệu của Account và được biểu diễn dưới dạng, hoặc là binary, hoặc là JSON, tuỳ vào tham số `encoding` lúc truyền vào
    - `executable`: `boolean`, Nhãn đánh dấu nếu Account này chứa một Program và có thể thực thi
    - `rentEpoch`: `number`, Kỳ hạn thuê tiếp theo của Account
:::

## Chi tiết

`getProgramAccounts` là một phương thức RPC rất linh hoạt và có khả năng trả về tất cả các Account được sở hữu bởi một Program. Chúng ta có thể sử dụng `getProgramAccounts` cho nhiều loại truy vấn khác nhau, ví dụ như:

- Tất cả các Account của một ví cụ thể
- Tất cả các Account cho một mint (hoặc thường được gọi là token đối với các blockchain khác) (i.e. Tất cả người giữ token [SRM](https://www.projectserum.com/))
- Tất cả các Account theo ý muốn của một Program cụ thể (i.e. Tất cả Account người dùng của ứng dụng [Mango](https://mango.markets/))

Mặc dù hữu dụng là vậy, `getProgramAccounts` thường bị dùng sai vì các hạn chế hiện tại. Nhiều câu truy vấn được hỗ trợ bởi `getProgramAccounts` yêu cầu các nốt RPC phải quét một khối lượng rất lớn các dữ liệu. Những câu truy vấn như vậy không chỉ lớn về dung lượng dữ liệu và còn lớn về khối lượng tính toán. Tất yếu, việc gọi quá nhiều về cả tần suất và khối lượng dẫn đến kết nối sẽ bị ngắt. Ngoài ra, tại thời điểm cuốn sách được viết, `getProgramAccounts` vẫn chưa hỗ trợ phân trang. Nếu kết quả truy vấn quá lớn, nó sẽ được cắt bỏ đi.

Để tránh các hạn chế này, `getProgramAccounts` giới thiệu các tham số dùng cho việc lọc và sơ chế kết quả, ví dụ như: `dataSlice`, `filters` với tuỳ chọn `memcmp` và `dataSize`. Bằng cách kết hợp các tham số trên, chúng ta có thể giảm thiểu phạm vi truy vấn với kích thước dữ liệu được kiểm soát và dễ đoán hơn.

Một ví dụ thường thấy của `getProgramAccounts` là tương tác với [SPL-Token Program](https://spl.solana.com/token). Truy vấn tất cả các Account được sở hữu bởi Token Program với một câu [truy vấn thuần tuý](../references/accounts.md#get-program-accounts) không có lọc sẽ dẫn đến một số lượng dữ liệu trả về khổng lồ. Thay vào đó, bằng cách bổ sung các tham số, chúng ta có thể truy vấn một cách hiệu quả chỉ những dữ liệu mình cần.
### `filters`

Tham số phổ biến nhất được dùng kèm với `getProgramAccounts` chính là mảng các `filters`. Mảng này chấp nhận 2 kiểu lọc là `dataSize` và `memcmp`. Trước khi sử dụng một trong hai, chúng ta nên hiểu được dữ liệu cần truy vấn sẽ có chứa dữ liệu gì? hình thái ra sao? tuần tự hoá như thế nào?
#### `dataSize`

Trong trường hợp Token Program, chúng ta có thể thấy rằng [độ dài của Token Account là 165 bytes](https://github.com/solana-labs/solana-program-library/blob/08d9999f997a8bf38719679be9d572f119d0d960/token/program/src/state.rs#L86-L106). Đặc biệt, một Token Account có 8 trường con, với mỗi trường có độ dài vùng nhớ biết trước. Chúng ta có thể mường tượng cách dữ liệu được sắp xếp bằng minh hoạ sau.

![Account Size](./get-program-accounts/account-size.png)

Nếu chúng ta muốn tìm tất cả Token Account sở hữu bởi chỉ riêng ví của mình, chúng ta có thể thêm `{ dataSize: 165 }` và `filters` để thu hẹp pham vi câu truy vấn và chỉ lấy những Account có độ dài chính xác 165 bytes. Tuy vậy, nó vẫn là chưa đủ. Chúng ta cần thêm một điều kiện để chỉ lọc các Account được sở hữu bởi ví của mình. Để là được điều đó, chúng ta phải sử dụng `memcmp`.

#### `memcmp`

Điều kiện lọc `memcmp`, hoặc "memory comparison" (phép so sánh vùng nhớ), cho phép chúng ta so sánh dữ liệu truyền vào với bất kỳ vùng nhớ nào được lưu trong Account. Đặc biệt, chúng ta có thể truy vấn chỉ những Account mà khớp với một đoạn dữ liệu tại một vị trí cụ thể. `memcmp` yêu cầu 2 tham số:

- `offset`: Vị trí bắt đầu để so sánh dữ liệu. Vị trí này thường được tính theo bytes và biểu diễn dưới dạng số nguyên.
- `bytes`: Dữ liệu dùng để đối chiếu với dữ liệu trong Account. Dữ liệu này nên được biểu diễn dưới dạng base58 và không quá 129 bytes.

Một điều quan trọng cần lưu ý là `memcmp` chỉ trả về các kết quả khớp chính xác trên từng `bytes`. Và hiện tại không hỗ trợ các phép so sánh lớn hơn hoặc nhỏ hơn cho `bytes`.

Sử dụng lại ví dụ Token Program bên trên, chúng ta điều chỉnh câu truy vấn chỉ trả về những Token Account mà được sở hữu bởi chính mình. Khi nhìn vào một Token Account, chúng ta biết được 2 trường đầu tiên lưu trong Token Account là 2 khoá công khai với độ dài là 32 bytes. Biết rằng `owner` là trường thứ 2, chúng ta nên khởi tạo `memcmp` với `offset` là 32. Từ đó, chúng ta sẽ lọc được những Account của mình bằng cách truyền địa chỉ ví vào `bytes`.

![Account Size](./get-program-accounts/memcmp.png)

Chúng ta có thể gọi câu truy vấn này thông qua ví dụ sau:

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/memcmp/memcmp.en.sh)

  </CodeGroupItem>
</CodeGroup>

### `dataSlice`

Ngoài 2 tham số bộ lọc được nhắc đến ở trên, một tham số thứ 3 cho `getProgramAccounts` cũng phổ biến không kém đó là `dataSlice`. Không giống như `filters`, `dataSlice` sẽ không giảm số lượng Account trả về. Thay vào đó, `dataSlice` sẽ giúp giới hạn số lượng dữ liệu trả về trên mỗi Account.

Cũng giống với `memcmp`, `dataSlice` có 2 tham số con:

- `offset`: Vị trí bắt đầu của dữ liệu mong muốn trả về
- `length`: Số lượng bytes trả về tính từ vị trí bắt đầu

`dataSlice` rất hữu ích trong thực tế khi mà chúng ta có thể truy vấn một khối lượng lớn dữ liệu đồng thời bỏ qua các trường không cần thiết trong dữ liệu Account. Một ví dụ cho trường hợp này là khi chúng ta muốn tính số lượng Token Account (cụ thể là số người nắm giữ token) cho một mint cụ thể.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.ts)

  </CodeGroupItem>

  <CodeGroupItem title="Rust Client" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="cURL" active>

@[code](@/code/get-program-accounts/dataSlice/dataSlice.en.sh)

  </CodeGroupItem>
</CodeGroup>

Với việc kết hợp giữ 3 tham số (`dataSlice`, `dataSize`, và `memcmp`), chúng ta có thể giới hạn phạm vi truy vấn một cách hiệu quả với chỉ các kết quả trả về mà chúng ta quan tâm.

## <a name="resources"></a> Các nguồn tài liệu khác

- [RPC API Documentation](https://docs.solana.com/developing/clients/jsonrpc-api#getprogramaccounts)
- [Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getProgramAccounts)
- [JSON-parsed Web3js Documentation](https://solana-labs.github.io/solana-web3.js/classes/Connection.html#getParsedProgramAccounts)
