---
title: Account Maps
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Account Maps
  - - meta
    - name: og:title
      content: Toàn tập Solana | Account Maps
  - - meta
    - name: description
      content: Account Map là một kiểu cấu trúc dữ liệu hữu ích và thường dùng trong lập trình Solana. Chi tiết về Nâng cấp dữ liệu cho Account Map và các khái niệm cơn bản khác trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Account Map là một kiểu cấu trúc dữ liệu hữu ích và thường dùng trong lập trình Solana. Chi tiết về Nâng cấp dữ liệu cho Account Map và các khái niệm cơn bản khác trong Toàn tập Solana.
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
---

# Account Maps

Map là một kiểu cấu trúc thường dùng trong lập trình và bao gồm một **key** tương ứng với một **value**. Cặp key-value có thể là bất kỳ kiểu dữ liệu nào trong đó key như là chìa khoá định danh dữ liệu được lưu trong value. Do đó, với mỗi key, chũng ta có thể thêm, xoá, cập nhật dữ liệu vào value một cách hiệu quả.

Mô hình Account trong Solana, như đã biết, yêu cầu dữ liệu của Program và các trạng thái của nó phải được lưu ở những Account riêng biệt. Những Account này có một địa chỉ định danh tương ứng và mô hình đó rất giống với map! Tìm hiểu thêm về mô hình Account trong Solana [tại đây][AccountCookbook].

Như vậy, dễ hiểu khi mà ta lưu **values** vào những Account tách biệt và dùng **key** để truy vấn dữ liệu trong **values**. Tuy nhiên, điều này lại gây ra một số vấn đề như là:

* Những địa chỉ đề cập hầu hết không phải là một **keys** lý tưởng, khi mà bạn cần phải ghi nhớ tất cả chúng để truy vấn các dữ liệu tương ứng.

* Những địa chỉ đề cập bên trên được tham chiếu bằng khoá công khai của những **Keypairs** (cặp khoá) khác nhau, trong đó khoá công khai bắt buộc phải có khoá riêng tư tương ứng. Khoá riêng tư lại cần thiết để ký các chỉ thị và lại bắt buộc chúng ta phải lưu ở một nơi nào đó, điều mà thật sự **không** được khuyến khích trong thực tiễn.

Điều đó dẫn đến rất nhiều vấn đề cho lập trình viên muốn hiện thực `Map` trực tiếp vào Program trên Solana. Giờ hãy quan sát một vài cách để giải quyết vấn đề trên.

## Tìm PDA

PDA là viết tắt [Program Derived Address][PDA]. Chúng là những địa chỉ được **tìm thấy** thông qua tập hợp gồm `seeds` và `program_id`.

Điểm đặc biệt của PDA là chúng **không** tồn tại khoá riêng tư tương ứng. Điều này bởi vì những địa chỉ này không nằm trên đường cong ED25519. Vì vậy, **duy nhất** Program sinh ra PDA mới có thể ký lên các chỉ thị cho các PDA đó bằng `seeds`. Tìm hiểu thêm [tại đây][CPI].

Sau khi đã nắm được khái niệm PDA, chúng ta có thể sử dụng để tạo kiểu Map! Hãy lấy ví dụ một **Blog** Program để hiểu rõ hơn cách sử dụng.

Trong Blog Program, chúng ta muốn mỗi `User` sẽ có một trang `Blog`. Bài blog có thể có nhiều `Posts`. Cụ thể hơn, mỗi `User` sẽ **map** đến một trang `Blog`. Nhiều bài `Posts` sẽ **được map** về một trang `Blog`.

`User` sẽ có kết nối `1:1` với `Blog` trong khi `Blog` sẽ có kết nối `1:N` với `Posts`.

Với `1:1`, chúng ta mong mốn địa chỉ của trang blog có thể được suy ra **độc nhất** từ địa chỉ người dùng. Cơ chế này sẽ giúp chúng ta lấy được dữ liệu của blog khi biết được địa chỉ chử sở hữu blog đó. Hiển nhiên, `seeds` cho `Blog` phải chứa **địa chỉ chủ sở hữu**, và có thể thêm một tiền tố như **"blog"** để giúp chú thích.

Với `1:N`, chúng ta mong muốn địa chỉ mỗi bài post sẽ được suy ra từ **không chỉ** địa chỉ trang blog mà còn từ cách thành tố khác giúp tạo ra `N` địa chỉ bài post trong một trang blog. Trong ví dụ bên dưới, mỗi địa chỉ bài post được suy ra bằng địa chỉ trang blog, một thành tố phụ - **slug** - để định danh cho mỗi bài post, và tiền tố **"post"** để chú thích.

Code mẫu được viết như sau:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Anchor" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/anchor-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/vanilla-pda-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Ở phía người dùng, họ có thể sử dụng `PublicKey.findProgramAddress()` để tìm ra địa chỉ của `Blog` và `Post` mong muốn thông qua địa chỉ ví đầu vào. Các địa chỉ vừa tìm thấy có thể được truyền vào `connection.getAccountInfo()` để truy vấn dữ liệu trong Account tương ứng. Ví dụ bên dưới sẽ minh hoạ điều đó:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/deriving-pda/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/deriving-pda/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

## Map bằng Account đơn

Một cách khác hơn đển hiện thực map là dùng cấu trúc `BTreeMap` để lưu dữ liệu lên một Account duy nhất. Địa chỉ của Account này có thể là PDA, hoặc có thể là khoá công khai của một cặp khoá được sinh ra thủ công.

Phương pháp này thường có một vài hạn chế:

* Bước đầu tiên phải khởi tạo Account để lưu `BTreeMap` trước khi có thể thêm bất kỳ key-value nào vào bên trong nó. Sau đó, bạn sẽ phải lưu địa chỉ này một nơi nào đó để dùng cho việc cập nhật dữ liệu về sau.

* Có nhiều giới hạn lưu trữ cho một Account như là dung lượng tối đa của một Account là **10 megabytes** và không thể cho phép `BTreeMap` có thể lưu trữ một số lượng lớn các cặp key-value.

Tuy vào tính huống của riêng ứng dụng, bạn có thể cân nhắc sử dụng nó như sau:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Rust" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/vanilla-trivial-map.preview.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

Về phía người dùng có thể kiểm tra Program trên bằng đoạn code mẫu bên dưới:

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="TS" active>

  <template v-slot:default>

@[code](@/code/account-maps/trivial/client.ts)

  </template>

  <template v-slot:preview>

@[code](@/code/account-maps/trivial/client.preview.ts)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>



[AccountCookbook]: https://solanacookbook.com/vi/core-concepts/accounts.html
[PDA]: https://solanacookbook.com/references/accounts.html#program-derived-address
[CPI]: https://solanacookbook.com/references/programs.html#create-a-program-derived-address
