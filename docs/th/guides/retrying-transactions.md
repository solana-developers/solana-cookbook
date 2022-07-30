---
title: Retrying Transactions
head:
  - - meta
    - name: title
      content: คู่มือ Solana | Retrying Transactions
  - - meta
    - name: og:title
      content: คู่มือ Solana | Retrying Transactions
  - - meta
    - name: description
      content: ในบางที transaction อาจจะถูกทิ้งไปก่อนที่จะเข้าไปใน block เพื่อแก้ปัญหานี้นักพัฒนา app สามารถสร้างเงื่อนไขเพื่อส่งไปอีกครั้งได้ เรียนรู้เกี่ยวกับ retrying transactions และเรื่องอื่นๆ ได้ที่คู่มือ Solana.
  - - meta
    - name: og:description
      content: ในบางที transaction อาจจะถูกทิ้งไปก่อนที่จะเข้าไปใน block เพื่อแก้ปัญหานี้นักพัฒนา app สามารถสร้างเงื่อนไขเพื่อส่งไปอีกครั้งได้ เรียนรู้เกี่ยวกับ retrying transactions และเรื่องอื่นๆ ได้ที่คู่มือ Solana.
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

# Retrying Transactions

ในบางที transaction อาจจะถูกทิ้งไปก่อนที่จะเข้าไปใน block สิ่งนี้เกิดขึ้นบ่อยในช่วงที่มีการใช้งานเยอะจนการทำงานติดขัด (network congestion) ในตอนที่ RPC node ไม่สามารถส่ง transaction ไปที่ [ผู้นำ (leader)](https://docs.solana.com/terminology#leader) ได้ ฝั่ง end-user จะเห็นว่า transaction ได้หายไปเลย ถึง RPC nodes จะมี rebroadcasting algorithm เพื่อส่งซ้ำทั่วไปอยู่แล้ว แต่นักพัฒนา app ก็สามารทำ custom rebroadcasting logic เองได้.

## เรื่องน่ารู้

::: tip Fact Sheet
- RPC nodes จะพยายาม rebroadcast transactions โดยใช้ algorithm ทั่วไป
- นักพัฒนา app สามารถทำ custom rebroadcasting logic เองได้
- นักพัฒนา ควรใช้ `maxRetries` parameter ตอน `sendTransaction` JSON-RPC method
- นักพัฒนา ควรใช้ preflight เพื่อให้เห็นปัญหาก่อนที่จะ submit transactions
- ก่อนจะ re-signing transaction ใดๆ  **มันสำคัญมาก** ที่จะแน่ใจว่า blockhash ตัวก่อนหน้าได้ expired ไปแล้ว
:::

## การเดินทางของ Transaction

### Clients Submit Transactions ยังไง

บน Solana จะไม่มี mempool ทุกๆ transactions ไม่ว่าจะมาจาก program หรือ end-user ก็จะถูกส่งไปที่ leaders เพื่อจะได้ไปลง block โดนจะมีอยู่ 2 ทางที่ transaction จะส่งไปถึง leaders:
1. ผ่าน RPC server ด้วย method [sendTransaction](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) JSON-RPC
2. ส่งไปตรงๆ ผ่าน [TPU Client](https://docs.rs/solana-client/1.7.3/solana_client/tpu_client/index.html)

end-users ส่วนใหญ่จะ submit transactions ผ่าน RPC server เมื่อ client ได้ submits transaction ไปแล้วตัว RPC node จะพยายาม broadcast transaction ไปหาทั้ง leaders ปัจจุบัน และ leaders ถัดไป จนกระทั่ง transaction ได้รับการประมวลผลจาก leader และมันจะไม่มีบันทึกของ transaction อื่นใดนอกเหนือไปจากที่ client และ RPC nodes รับรู้. ในกรณีของ TPU client, การ rebroadcast และส่งต่อไปที่ leader จะขึ้นอยู่กับ client ทั้งหมด.

![การเดินทางของ Transaction](./retrying-transactions/tx-journey.png)

### RPC Nodes Broadcast Transactions ยังไง

หลังจาก RPC node รับ transaction ผ่าน `sendTransaction` ตัว transaction ก็จะถูกเปลี่ยนไปเป็น [UDP](https://en.wikipedia.org/wiki/User_Datagram_Protocol) packet ก่อนจะส่งต่อไปที่ leaders ที่เกี่ยวข้อง การใช้ UDP จะทำให้ validators สามารถติดต่อกันได้อย่างรวดเร็ว แต่จะไม่รับประกันว่า transaction จะส่งถึงแน่นอน.

เนื่องจากการทำงานของ Solana leader จะรู้ก่อนอยู่แล้วในทุกๆ [epoch](https://docs.solana.com/terminology#epoch) (~2 วัน) ตัว RPC node จะกระจาย transaction ไปหาทั้ง leaders ตัวปัจจุบัน และตัวถัดไป ตรงจุดนี้จะไม่เหมือน gossip protocols อื่นเช่น Ethereum ที่เผยแพร่ transactions แบบสุ่ม และส่งไปทั้ง network ตามปกติแล้ว RPC nodes จะพยายามส่ง transactions ไปหา leaders ทุกๆ 2 วินาที จนกระทั่ง transaction ถูก finalized หรือ blockhash หมดอายุ (150 blocks หรือ ~1 นาที 19 วินาที ณ. ตอนที่เขียนนี้). ถ้ามีคิวในการ rebroadcast ตกค้างอยู่เกิน [10,000 transactions](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/send-transaction-service/src/send_transaction_service.rs#L20) จะทำให้ transactions ใหม่ถูกทิ้งไป ซึ่งจะมีคำสั่ง command-line [arguments](https://github.com/solana-labs/solana/blob/bfbbc53dac93b3a5c6be9b4b65f679fdb13e41d9/validator/src/main.rs#L1172) ที่คนดูแล RPC สามารถปรับเพื่อเปลี่ยนค่าเริ่มต้นของการ retry นี้ได้

เวลาที่ RPC node จะทำการเผยแพร่ transaction มันจะพยายามส่งต่ไปที่ transaction leader’s [Transaction Processing Unit (TPU)](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/validator.rs#L867) การประมวลผล transactions ของ TPU จะแบ่งเป็น 5 ขั้นตอน: 
- [Fetch Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/fetch_stage.rs#L21)
- [SigVerify Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L91)
- [Banking Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/banking_stage.rs#L249)
- [Proof of History Service](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/poh/src/poh_service.rs)
- [Broadcast Stage](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/core/src/tpu.rs#L136)

![TPU Overview](./retrying-transactions/tpu-jito-labs.png)
<small style="display:block;text-align:center;">Image Courtesy of Jito Labs</small>

จาก 5 ขั้นตอนนี้ช่วง Fetch Stage จะรับผิดชอบการรับ transactions ตอน Fetch Stage, validators จะจัดหมวดหมู่ transactions ออกเป็น 3 ช่องทางดังนี้:
- [tpu](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L27) จัดการ transactions พวก token transfers, NFT mints, และ program instructions
- [tpu_vote](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L31) จัดการเฉพาะ transactions ที่เกี่ยวกับการ vote 
- [tpu_forwards](https://github.com/solana-labs/solana/blob/cd6f931223181d5a1d47cba64e857785a175a760/gossip/src/contact_info.rs#L29) ส่งต่อ packets ที่ยังไม่ได้ดำเนินการไปยัง leader ถัดไปถ้า leader ปัจจุบัน ไม่สามารถ process ทุก transactions ได้แล้ว

สำหรับเรื่อง TPU, หาอ่านเพิ่มเติมได้ที่ [this excellent writeup by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143).

## Transactions ถูกทิ้งไปได้ยังไง

ตลอดการเดินทางของ transaction, อาจจะมีเหตุการณ์บางอย่างที่ทำให้ transaction ถูกทิ้งไปจาก network ได้แบบไม่ตั้งใจ.

### ก่อน transaction จะประมวลผลเสร็จ

ถ้า transaction ถูกทิ้ง ส่วนใหญ่จะเกิดก่อนที่ transaction จะถูกประมวลผลโดย leader เรื่อง UDP [packet loss](https://en.wikipedia.org/wiki/Packet_loss) เหตุผลว่าทำไมเรื่องนี้อาจจะเกิดขึ้นได้ในช่วงที่การใช้งาน network สูง, และมันยังเป็นไปได้ว่า validators กำลังประมวลผล transactions ที่มากเกินกว่าที่จะดำเนินการได้. ในขณะที่ validators พร้อมที่จะส่ง transactions ส่วนเกินผ่าน `tpu_forwards`, มันจะมีข้อจำกัดในการ [ส่งต่อ](https://github.com/solana-labs/solana/blob/master/core/src/banking_stage.rs#L389) อยู่ด้วย โดยในการส่งต่อจะถูกจำกัดให้ข้ามระหว่าง validators ได้ครั้งเดียว ดังนั้น transactions ที่ได้รับผ่าน `tpu_forwards` มาแล้ว จะไม่ถูกส่งต่อไปยัง validators อื่นอีก.

ยังมีอีก 2 เหตุผลว่าทำไม transaction อาจจะถูกทิ้งก่อนที่มันจะถูกประมวลผล. กรณีแรกมีความเกี่ยวข้องกับ transactions ที่ส่งผ่าน RPC pool ในบางครั้งบางส่วนของ RPC pool จะนำ pool อื่นๆ อยู่. เหตุการณ์นี้จะทำให้เกิดปัญหาได้ถ้า nodes ใน pool ต้องทำงานไปพร้อมๆ กัน ในตัวอย่างนี้ transaction’s [recentBlockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash) มีการดึงข้อมูลลำดับถัดไปจาก pool (Backend A) แต่เมื่อ transaction ส่งไปในส่วนที่ pool ตามหลังอยู่ (Backend B) nodes นั้นก็จะไม่รู้จัก blockhash ถัดไป และจะทิ้ง transaction นั้นไป กรณีแบบนี้สามารถตรวจจับได้ในระหว่างการส่ง transaction ถ้านักพัฒนาเปิดใช้ [preflight checks](https://docs.solana.com/developing/clients/jsonrpc-api#sendtransaction) เวลาที่เรียกใช้ `sendTransaction`.

![Dropped via RPC Pool](./retrying-transactions/dropped-via-rpc-pool.png)

การ fork network ชั่วคราวก็เป็นอีกสาเหตุที่ทำให้ transactions ถูกทิ้งถ้า validator replay blocks ไม่ทัน Banking Stage, มันอาจจะจบลงตรงที่เกิดการสร้าง minority fork ขึ้นมา เมื่อ client สร้าง transaction มันก็เป็นไปได้ว่า transaction จะถูกอ้างไปที่ `recentBlockhash` ที่มีอยู่เฉพาะใน minority fork ดังกล่าว หลังจากส่ง transaction แล้ว cluster สามารถเปลี่ยนจาก minority fork ก่อนที่ transaction จะถูกประมวลผล ในกรณีนี้ transaction จะถูกทิ้งเนื่องจาก blockhash หาไม่เจอ

![Dropped due to Minority Fork (Before Processed)](./retrying-transactions/dropped-minority-fork-pre-process.png)

### หลังจาก transaction ประมวลผลเสร็จ และก่อนจะ finalized

ในกรณีที่ transaction อ้างอิง `recentBlockhash` ไปที่ minority fork, มันก็ยังเป็นไปได้ที่ transaction จะถูกประมวลผล แต่อย่าสงไรก็ตามมันจะต้องถูกประมวลผลโดย leader บน minority fork. เมื่อ leader พยายามเผยแพร่ transactions นี้ไปทั้ง network มันก็จะล้มเหลว fail ที่จะไปถึงการ consensus ด้วย validators อื่นๆ ที่ไม่รู้จัก minority fork นั้นอยู่ดี ถึงจุดนี้ transaction ก็จะถูกทิ้งก่อนที่มันจะไปถึงขั้น finalized

![Dropped due to Minority Fork (After Processed)](./retrying-transactions/dropped-minority-fork-post-process.png)

## จัดการ Transactions ที่ถูกทิ้ง

ตอนที่ RPC nodes พยายาม rebroadcast transactions จะใช้ algorithm ทั่วไปและ มักจะไม่ตรงกับความต้องการของ app แต่ละตัว เพื่อเตรียมตัวรับมือในช่วง network congestion นักพัฒนา app ควรออกแบบการทำงาน rebroadcasting เอง

### sendTransaction เชิงลึก

เมื่อพูดถึงการส่ง transactions เราจะใช้ RPC method `sendTransaction` โดย `sendTransaction` จะรับผิดชอบในการส่ง transaction จาก client ไป RPC node ถ้า node ได้รับ transaction แล้ว, `sendTransaction` จะคืน transaction id ที่สามารถใช้ติดตาม transaction ซึ่งการที่เราได้รับ response ไม่ได้หมายความว่า transaction นั้นจะถูกประมวลผลหรือถูก finalized ด้วย cluster.

:::tip
#### Request Parameters
- `transaction`: `string` - Transaction ที่ sign เรียบร้อยแล้วในรูปแบบ encoded string
- (optional) `configuration object`: `object` 
    - `skipPreflight`: `boolean` - ถ้าเป็น true, จะข้ามการทำ preflight ไป (ค่าปกติคือ: false)
    - (optional) `preflightCommitment`: `string` - [Commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) ระดับในการจำลอง preflight กับ bank slot (ค่าปกติคือ: "finalized").
    - (optional) `encoding`: `string` - Encoding ที่ใช้สำหรับ transaction data. อาจจะเป็น "base58" (ช้า) หรือ "base64" (ค่าปกติคือ: "base58").
    - (optional) `maxRetries`: `usize` - เลขมากที่สุดของของเวลาที่ RPC node จะพยายามส่ง transaction ไปถึง leader. ถ้าไม่กำหนด RPC node จะ retry transaction จนกระทั่งถูก finalized หรือจนกระทั่ง blockhash หมดอายุ

#### Response
- `transaction id`: `string` - transaction signature แรกจะถูกเก็บอยู่ใน transaction ในรูปแบบ base-58 encoded string ซึ่ง transaction id นี้สามารถใช้กับ [getSignatureStatuses](https://docs.solana.com/developing/clients/jsonrpc-api#getsignaturestatuses) เพื่อดึงสถานะมาดูได้.
:::

## ทำ Rebroadcast Logic เอง

ในการที่จะพัฒนา rebroadcasting logic ด้วยตัวเอง นักพัฒนาควรใช้ `sendTransaction`, `maxRetries` parameter. ถ้ากำหนดค่า `maxRetries` มันก็จะกำหนดทับค่าปกติของ RPC node retry logic, ทำให้นักพัฒนาสามารถกำหนดช่วงการ retry [ได้ตามความเหมาะสม](https://github.com/solana-labs/solana/blob/98707baec2385a4f7114d2167ef6dfb1406f954f/validator/src/main.rs#L1258-L1274).

pattern ปกติสำหรับการ retrying transactions จะเกี่ยวข้องกับการเก็บ `lastValidBlockHeight` ที่มาจาก [getLatestBlockhash](https://docs.solana.com/developing/clients/jsonrpc-api#getlatestblockhash) เมื่อเก็บไว้แล้ว app ก็สามารถ [ดึง cluster’s blockheight](https://docs.solana.com/developing/clients/jsonrpc-api#getblockheight) และ retry transaction ในช่วงเวลาที่แหมาะสม. หากเกิด network congestion ก็ให้ปรับ `maxRetries` เป็น 0 ก็จะดีกว่า และ  rebroadcast เองอีกที บาง app อาจจะใช้ [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) algorithm หรือวิธีแบบ [Mango](https://www.mango.markets/) เพื่อ [ส่ง transactions เรื่อยๆ](https://github.com/blockworks-foundation/mango-ui/blob/b6abfc6c13b71fc17ebbe766f50b8215fa1ec54f/src/utils/send.tsx#L713) ในเวลาที่เหมาะสมจนเกิด timeout

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


เมื่อดึงข้อมูลผ่าน `getLatestBlockhash` ตัว app ควรจะระบุ [commitment](https://docs.solana.com/developing/clients/jsonrpc-api#configuring-state-commitment) level ที่ต้องการไว้ด้วย เช่นถ้าเรากำหนดไว้เป็น `confirmed` (รอจบการโหวต) หรือ `finalized` (~30 blocks หลังจาก `confirmed`) app จะสามารถเลี่ยงกรณีได้ blockhash จาก minority fork ไปได้

ถ้า app เข้าถึง RPC nodes หลัง load balancer มันจะสามารถเลือกที่จะกระจาย workload ไปที่ nodes ที่ต้องการได้ด้วย ซึ่ง RPC nodes ที่ให้รองรับการร้องขอ data ที่ต้องประมวลผลหนักๆ เช่น [getProgramAccounts](./get-program-accounts.md) อาจจะทำให้ node นี้ทำงานช้ากว่า node อื่นๆ และ จะไม่สามารถส่ง transactions ต่อได้. สำหรับ applications ที่จัดการ transactions ที่ต้องการความเร็วสูง อาจจะเป็นการดีกว่าถ้าใช้ node ที่รองรับ `sendTransaction` อย่างเดียว

### จะเกิดอะไรขึ้นถ้า Skip Preflight

โดยค่าเริ่มต้น `sendTransaction` จะทำการตรวจสอบล่วงหน้าสามครั้งก่อนที่จะส่ง transaction.
โดยเฉพาะ `sendTransaction` จะ:
- ตรวจสอบว่าทุกๆ signatures ถูกต้องหรือไม่
- ตรวจสอบว่า blockhash ที่ใส่มาอยุ่ในช่วงไม่เกิน 150 blocks
- จำลอง transaction กับ bank slot ตามที่ระบุไว้ที่ `preflightCommitment`

ในกรณีที่การตรวจสอบล่วงหน้าสามครั้งล้มเหลว `sendTransaction` จะแสดง error ก่อนจะส่ง transaction. Preflight checks สามารถบอกได้ว่า transaction จะถูกทิ้งหรือไม่ และทำให้ client สามารถจัดการกับ error นั้นๆ ได้ เพื่อให้ error ที่อาจจะเกิดขึ้นได้ ได้รับการจัดการเราแนะนำว่านักพัฒนาควร ตั้งค่า `skipPreflight` เป็น `false`

### Re-Sign Transactions เมื่อไหร่ดี

ถึงเราจะพยายาม rebroadcast แล้วก็ตามแต่ก็จะมีบางเวลาที่ client จะต้อง sign transaction อีกครั้ง ซึ่งก่อนที่จะ sign transaction ใหม่นั้น **มันสำคัญมาก** ทีี่เราจะต้องมั่นใจว่า transaction’s blockhash ได้หมดอายุไปแล้ว ถ้า blockhash ยังไม่หมดอายุมันก็เป็นไปได้ที่ transactions ทั้งคู่จะผ่านเข้า network ไปได้ และในส่วนของ end-user จะเห็นว่าส่ง transaction เดิมไป 2 รอบ.

บน Solana นั้นการทิ้ง transaction สามารถทำได้อย่างปลอดภัยถ้า blockhash เก่ากว่า  `lastValidBlockHeight` ที่ได้จากการ `getLatestBlockhash` นักพัฒนาต้องคอยดู `lastValidBlockHeight` ด้วยการ [`getEpochInfo`](https://docs.solana.com/developing/clients/jsonrpc-api#getepochinfo) และเทียบกับ `blockHeight` ที่ได้คืนมา เมื่อ blockhash หมดอายุแล้ว clients ก็สามารถ sign อีกครั้งได้ด้วย blockhash ที่ไปดึงมาใหม่.

## Acknowledgements

ขอขอบคุณ Trent Nelson, [Jacob Creech](https://twitter.com/jacobvcreech), White Tiger, Le Yafo, [Buffalu](https://twitter.com/buffalu__), และ [Jito Labs](https://twitter.com/jito_labs) ที่ช่วย review และแนะนำ
