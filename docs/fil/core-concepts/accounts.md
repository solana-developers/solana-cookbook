---
title: Accounts
head:
  - - meta
    - name: title
      content: Solana Cookbook | Accounts
  - - meta
    - name: og:title
      content: Solana Cookbook | Accounts
  - - meta
    - name: description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Accounts are an essential building block for developing on Solana. Learn about Accounts and more Core Concepts at The Solana cookbook.
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

# Accounts

Ang mga account sa loob ng Solana ay ginagamit upang mag-imbak ng estado. Mahalaga sila
building block para sa pagbuo sa Solana.

## Facts

::: tip Fact Sheet

- Ang mga account ay ginagamit upang mag-imbak ng data
- Ang bawat account ay may natatanging address
- Ang mga account ay may maximum na laki na 10MB (10 Mega Bytes)
- Ang mga PDA account ay may max na laki na 10KB (10 Kilo Bytes)
- Maaaring gamitin ang mga PDA account para mag-sign sa ngalan ng isang programa
- Ang laki ng mga account ay naayos sa oras ng paggawa, ngunit maaaring isaayos gamit ang [realloc](https://solanacookbook.com/references/programs.html#how-to-change-account-size)
- Ang imbakan ng data ng account ay binabayaran ng upa
- Default na may-ari ng account ay ang System Program
  :::

## Deep Dive

### Account Model

Mayroong 3 uri ng mga account sa Solana:

- Nag-iimbak ng data ang mga data account
- Nag-iimbak ang mga program account ng mga executable na programa
- Mga katutubong account na nagsasaad ng mga katutubong programa sa Solana gaya ng System, Stake, at Vote

Sa loob ng mga data account, mayroong 2 uri:

- Mga account na pagmamay-ari ng system
- Mga PDA (Program Derived Address) account

Ang bawat account ay may address (karaniwang pampublikong susi) at may-ari
(address ng isang program account). Ang buong field ay naglilista ng isang account store
ay matatagpuan sa ibaba.

| Field      | Description                                    |
| ---------- | ---------------------------------------------- |
| lamports   | The number of lamports owned by this account   |
| owner      | The program owner of this account              |
| executable | Whether this account can process instructions  |
| data       | The raw data byte array stored by this account |
| rent_epoch | The next epoch that this account will owe rent |

Mayroong ilang mahahalagang tuntunin sa pagmamay-ari:

- Tanging ang may-ari ng data account ang makakapagbago ng data at mga debit na lampor nito
- Sinuman ay pinahihintulutan na i-credit ang mga lampor sa isang data account
- Ang may-ari ng isang account ay maaaring magtalaga ng bagong may-ari kung ang data ng account ay na-zero out

Ang mga account ng programa ay hindi nag-iimbak ng estado.

Halimbawa, kung mayroon kang counter program na hinahayaan kang dagdagan ang isang counter, ikaw
dapat gumawa ng dalawang account, isang account para mag-imbak ng code ng program, at isa para mag-imbak
ang counter.

![](./account_example.jpeg)

Upang maiwasang matanggal ang isang account, dapat kang magbayad ng upa.

### Rent

Ang pag-iimbak ng data sa mga account ay nagkakahalaga ng SOL upang mapanatili, at ito ay pinondohan ng tinatawag na
upa. Kung nagpapanatili ka ng isang minimum na balanse na katumbas ng 2 taon ng mga pagbabayad sa upa sa isang
account, ang iyong account ay magiging exempt sa pagbabayad ng upa. Maaari mong kunin ang upa sa pamamagitan ng pagsasara
ang account at ibabalik ang mga lamport sa iyong wallet.

Binabayaran ang upa sa dalawang magkaibang timing:

1. Kapag tinukoy ng isang transaksyon
2. Sa sandaling panahon

Ang isang porsyento ng upa na nakolekta ng mga account ay nawasak, habang ang iba ay ipinamamahagi
para bumoto ng mga account sa dulo ng bawat slot.

Kung ang account ay walang sapat na pambayad ng renta, ang account ay ipagkakaloob at ang data
inalis.

Mahalaga ring tandaan na ang mga bagong account ay dapat na walang bayad sa pagrenta.

## Other Resources

- [Solana Account Model](https://solana.wiki/zh-cn/docs/account-model/#account-storage)
- [Official Documentation](https://docs.solana.com/developing/programming-model/accounts)
- [pencilflip account thread](https://twitter.com/pencilflip/status/1452402100470644739)

### Credit

Ang pangunahing konsepto na ito ay kredito sa Pencilflip. [Follow him on Twitter](https://twitter.com/intent/user?screen_name=pencilflip).
