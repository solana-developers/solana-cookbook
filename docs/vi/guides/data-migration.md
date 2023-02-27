---
title: Nâng cấp dữ liệu cho Program Account
head:
  - - meta
    - name: title
      content: Toàn tập Solana | Nâng cấp dữ liệu cho Program Account
  - - meta
    - name: og:title
      content: Toàn tập Solana | Nâng cấp dữ liệu cho Program Account
  - - meta
    - name: description
      content: Cơ bản về thông tin phiên bản hỗ trở nâng cấp nghĩa là tạo ra những tham chiếu độc lập cho từng tập dữ liệu. Tham chiếu này có thể là một câu truy vấn, một mã định danh, hay thường hơn là ngày tháng. Chi tiết về Nâng cấp dữ liệu cho Program Account và các khái niệm cơn bản khác trong Toàn tập Solana.
  - - meta
    - name: og:description
      content: Cơ bản về thông tin phiên bản hỗ trở nâng cấp nghĩa là tạo ra những tham chiếu độc lập cho từng tập dữ liệu. Tham chiếu này có thể là một câu truy vấn, một mã định danh, hay thường hơn là ngày tháng. Chi tiết về Nâng cấp dữ liệu cho Program Account và các khái niệm cơn bản khác trong Toàn tập Solana.
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

# Nâng cấp dữ liệu một Program Account

## Làm thế nào để có thể nâng cấp dữ liệu trong Program Account?

Khi bạn tạo một Program, mỗi Account dữ liệu sẽ được gán cho Program đó với cấu trục dữ liệu cụ thể. Nếu bạn từng nâng cấp Program và Program này dùng để suy ra các PDA, bạn chắc hẳn đã phải đau đầu với hàng tá những Account với cấu trúc gắn với Program cũ.

Với việc đánh phiên bản cho Account, bạn có thể dễ dàng nâng cấp cấu trúc mới cho các Account cũ .

:::tip Lưu ý
Đây chỉ là một trong rất nhiều cách khác nhau để nâng cấp dữ liệu trong Program Owned Accounts (POA).
:::

## Ngữ cảnh

Để đánh phiên bản và nâng cấp dữ liệu trong Account, chúng ta sẽ phải cung cấp một **id** cho từng Account. Id này sẽ cho phép chúng ta định rõ phiên bản của Account khi truyền nó cho Program, và như vậy có thể xử lý Account một cách chính xác.

Quan sát trạng thái bên dưới của Account và Program:

<img src="./data-migration/pav1.png" alt="Program Account v1">

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account" active>

  <template v-slot:default>

@[code](@/code/data-migration/account-v0.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v0.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Instruction" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.instruction.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.instruction.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

<SolanaCodeGroupItem title="Processor" active>

  <template v-slot:default>

@[code](@/code/data-migration/rust.processor.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/rust.processor.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Trong phiên bản đầu tiên của Account, chúng ta thực hiện các bước sau:

| # | Mô tả |
| - | - |
|1| Thêm trường `data_version` vào dữ liệu. Nó có thể đơn giản là số thứ tự (`u8`) hoặc có thể phức tạp hơn thế.
|2| Phân phát một vùng nhớ đủ để chứa dữ liệu
|3| Khởi tạo một hằng số biễu diễn phiên bản cho các Program khác nhau
|4| Thêm một hàm cập nhật Account với tên `fn conversion_logic` cho các nâng cấp trong tương lai

Giả sử, chúng ta muốn nâng cấp các Account của Program bằng cách thêm một trường mới với tên `somestring`.

Nếu chúng ta không phân phát đủ vùng nhớ cho trường mới thêm cho các Account trước đó, quá trình nâng cấp Account sẽ bị mắc kẹt.

## Nâng cấp Account

Trong Program mới, chúng ta muốn thêm một thuộc tính mới cho nội dung của Account. Những thay đổi bên dưới trình bày cách chúng ta tận dụng cơ cấu Program ban đầu cho phiên bản hiện tại.

### 1. Thêm luận lý để chuyển đổi Account

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Account">

  <template v-slot:default>

@[code](@/code/data-migration/account-v1.en.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/data-migration/account-v1.preview.en.rs)

  </template>

  </SolanaCodeGroupItem>
</SolanaCodeGroup>

| Dòng | Mô tả |
| ------- | - |
| 6 | Chúng ta đã thêm `solana_program::borsh::try_from_slice_unchecked` của Solana để đơn giản hoá việc đọc các tập dữ liệu con từ khối dữ liệu cha
| 13-26| Ở đây, chúng ta phải giữ lại phiên bản cũ, `AccountContentOld` tại dòng 24, trước khi mở rộng nó thành `AccountContentCurrent` tại dòng 17.
| 60 | Nâng cấp lại hằng số `DATA_VERSION`
| 71 | Chúng ta giờ đã có một phiên bản cũ, đồng thời lưu lại kích thước của nó
| 86 | Cuối cùng là thêm logic cho quá trình nâng cấp phiên bản dữ liệu cũ thành phiên bản hiện hành

Sau đó chúng ta cập nhật hàm mới để thêm vào trường `somestring` và khai báo luận lý của chỉ thị mới trong `processor`. Lưu ý việc nâng cấp cấu trúc dữ liệu đã được đóng gói trong `pack/unpack`.

<CodeGroup>
  <CodeGroupItem title="Instruction">

@[code](@/code/data-migration/rust.instruction1.en.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Processor">

@[code](@/code/data-migration/rust.processor1.en.rs)

  </CodeGroupItem>
</CodeGroup>

Sau khi xây dựng và áp dụng chỉ thị `VersionProgramInstruction::SetString(String)`, chúng ta sẽ thấy dữ liệu Account được cập nhật sẽ được sắp xếp như sau:

<img src="./data-migration/pav2.png" alt="Program Account v2">

## <a name="resources"></a> Các nguồn tài liệu khác

* [Mô tả Borsh](https://borsh.io/)
* [Solana `try_from_slice_unchecked`](https://github.com/solana-labs/solana/blob/master/sdk/program/src/borsh.rs#L67)
* [Reference Implementation](https://github.com/FrankC01/versioning-solana)
