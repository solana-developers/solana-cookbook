---
title: Staking  
head:
  - - meta
    - name: title  
      content: Buku Panduan Solana | Staking
  - - meta
    - name: og:title  
      content: Buku Panduan Solana | Staking
  - - meta
    - name: description  
      content: stake SOL dan raih reward dengan membantu mengamankan jaringan.
  - - meta
    - name: og:description  
      content: stake SOL dan raih reward dengan membantu mengamankan jaringan. Belajar tentang cara membuat Akun Stake, Delegate State dan Withdraw Stake di Buku Panduan Solana.
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
      content: “@solanacookbook”
  - - meta
    - name: twitter:image  
      content: “https://solanacookbook.com/cookbook-sharing-card.png”
  - - meta
    - name: robots  
      content: index,follow,noodp
  - - meta
    - name: googlebot  
      content: index,follow  
footer: MIT Licensed
---

# Staking

## Mendapatkan Validators

Kita bisa stake SOL dan mendapatkan rewards dari membantu menjaga keamanan network. Untuk melakukan staking, kita mendelegasi SOL kepada para validator yang selanjutnya memproses transaksi.

@[code](@/code/staking/get-current-validators/get-current-validators.en.ts)

@[code](@/code/staking/get-current-validators/get-current-validators.en.sh)

## Membuat Stake Account

Semua instruksi staking ditangani oleh [Stake Program](https://docs.solana.com/developing/runtime-facilities/programs#stake-program). Untuk memulai, kita membuat sebuah [Stake Account](https://docs.solana.com/staking/stake-accounts) yang dibuat dan dikelola secara berbeda daripada [system account](accounts.md#create-a-system-account). Khususnya, kita harus menyetel `Stake Authority` dan `Withdrawal Authority`.

@[code](@/code/staking/create-stake-account/create-stake-account.en.ts)

@[code](@/code/staking/create-stake-account/create-stake-account.preview.en.ts)

## Mendelegasi Stake

Ketika sebuah stake account sudah didanai, `Stake Authority` dapat mendelegasinya kepada validator. Setiap stake account hanya bisa didelegasikan kepada 1 validator di suatu waktu. Selain itu, semua token di dalam account harus antara didelegasikan atau tidak didelegasikan. Ketika sudah didelegasi, dibutuhkan beberapa epoch untuk stake account menjadi aktif.

@[code](@/code/staking/delegate-stake/delegate-stake.en.ts)

@[code](@/code/staking/delegate-stake/delegate-stake.preview.en.ts)

## Mendapatkan Delegator dengan Validator

Beberapa account mungkin telah stake ke validator account tertentu. Untuk mengambil para staker, kita akan menggunakan `getProgramAccounts` atau `getParsedProgramAccounts` API. Untuk informasi lebih, cek [guides section](/guides/get-program-accounts.html). Stake account berukuran 200 bytes dan Voter Public Key dimulai dari 124 bytes. [Reference](https://github.com/solana-labs/solana/blob/e960634909a9617fb98d5d836c9c4c5e0d9d59cc/sdk/program/src/stake/state.rs)

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.en.ts)

@[code](@/code/staking/get-delegators-by-validators/get-delegators-by-validators.preview.en.ts)

## Deactivate Stake

Kapan pun setelah suatu stake account didelegasi, `Stake Authority` bisa memilih untuk deactivate account. Deactivation bisa memakan waktu yang cukup lama, dan dibutuhkan sebelum SOL bisa di-withdraw.

@[code](@/code/staking/deactivate-stake/deactivate-stake.en.ts)

@[code](@/code/staking/deactivate-stake/deactivate-stake.preview.en.ts)

## Withdraw Stake

Ketika account sudah di-deactivate, `Withdrawal Authority` bisa withdraw SOL kembali ke system account. Saat sebuah stake account sudah tidak didelegasi dan memiliki saldo 0 SOL, account tersebut akan dihancurkan.

@[code](@/code/staking/withdraw-stake/withdraw-stake.en.ts)

@[code](@/code/staking/withdraw-stake/withdraw-stake.preview.en.ts)
