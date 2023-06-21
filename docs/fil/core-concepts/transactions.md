---
title: Transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | Transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | Transactions
  - - meta
    - name: description
      content: Transaction are bundles of Multiple operational units on Solana. Learn more about Transaction and Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Multiple operational units on Solana can be bundled into a single unit called Transaction. Learn more about Core Concepts at The Solana cookbook.
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

# Transactions

Maaaring mag-invoke ang mga kliyente ng [programs](./programs.md) sa pamamagitan ng pagsusumite ng transaksyon sa isang cluster. Ang isang transaksyon ay maaaring magsama ng maraming instruction, ang bawat isa ay nagta-target ng sarili nitong programa. Kapag naisumite ang isang transaksyon, ipoproseso ng Solana [Runtime](https://docs.solana.com/developing/programming-model/runtime) ang mga instruction na ito sa pagkakasunud-sunod at atomically. Kung nabigo ang anumang bahagi ng isang pagtuturo, mabibigo ang buong transaksyon.

## Facts

::: tip Fact Sheet
- Ang mga instruction ay ang pinakapangunahing yunit ng pagpapatakbo sa Solana
- Ang bawat instruction ay naglalaman ng:
     - Ang `program_id` ng nilalayon na programa
     - Isang hanay ng lahat ng `account` na nilalayon nitong basahin o sulatan
     - Isang `instruction_data` byte array na partikular sa nilalayon na programa
- Maramihang mga instruction ay maaaring isama sa isang solong transaksyon
- Ang bawat transaksyon ay naglalaman ng:
     - Isang hanay ng lahat ng `account` na nilalayon nitong basahin o sulatan
     - Isa o higit pang 'mga instruction'
     - Isang kamakailang `blockhash`
     - Isa o higit pang `pirma`
- Ang mga instruction ay pinoproseso sa pagkakasunud-sunod at atomically
- Kung nabigo ang anumang bahagi ng isang pagtuturo, mabibigo ang buong transaksyon.
- Limitado ang mga transaksyon sa 1232 bytes
:::

## Deep Dive

Ang Solana Runtime ay nangangailangan ng parehong mga instruction at mga transaksyon upang tukuyin ang isang listahan ng lahat ng mga account na nilayon nilang basahin o sulatan. Sa pamamagitan ng pag-aatas sa mga account na ito nang maaga, ang runtime ay nagagawang iparallelize ang pagpapatupad sa lahat ng mga transaksyon.

Kapag isinumite ang isang transaksyon sa isang cluster, ipoproseso ng runtime ang mga instruction na ito sa pagkakasunud-sunod at atomically. Para sa bawat pagtuturo, bibigyang-kahulugan ng tatanggap na programa ang array ng data nito at gagana sa mga tinukoy nitong account. Matagumpay na babalik ang program o may error code. Kung ang isang error ay ibinalik, ang buong transaksyon ay mabibigo kaagad.

Ang anumang transaksyon na naglalayong i-debit ang isang account o baguhin ang data nito ay nangangailangan ng lagda ng may hawak ng account nito. Ang anumang account na babaguhin ay minarkahan bilang `writable`. Maaaring ma-kredito ang isang account nang walang pahintulot ng may-ari hangga't sinasaklaw ng nagbabayad ng transaction fee ang kinakailangang renta at mga bayarin sa transaksyon.

Bago isumite, ang lahat ng transaksyon ay dapat sumangguni sa isang [recent blockhash](https://docs.solana.com/developing/programming-model/transactions#recent-blockhash). Ginagamit ang blockhash upang maiwasan ang mga duplikasyon at alisin ang mga lipas na transaksyon. Ang maximum na edad ng blockhash ng isang transaksyon ay 150 block, o humigit-kumulang ~1 minuto 19 segundo mula sa oras ng pagsulat na ito.

### Fees

Nangongolekta ang network ng Solana ng dalawang uri ng mga bayarin:
- [Mga bayarin sa transaksyon](https://docs.solana.com/transaction_fees) para sa pagpapalaganap ng mga transaksyon (aka "mga bayarin sa gas")
- [Mga bayarin sa renta](https://docs.solana.com/developing/programming-model/accounts#rent) para sa pag-iimbak ng data on-chain

Sa Solana, ang mga bayarin sa transaksyon ay deterministiko: walang konsepto ng isang market ng bayad kung saan ang mga user ay maaaring magbayad ng mas mataas na mga bayarin upang mapataas ang kanilang mga pagkakataong mapabilang sa susunod na block. Sa oras ng pagsulat na ito, ang mga bayarin sa transaksyon ay tinutukoy lamang sa pamamagitan ng bilang ng mga kinakailangang lagda (ibig sabihin, `lamports_per_signature`), hindi sa dami ng mga mapagkukunang ginamit. Ito ay dahil kasalukuyang may hard cap na 1232 bytes sa lahat ng transaksyon.

Ang lahat ng mga transaksyon ay nangangailangan ng hindi bababa sa isang `writable` na account upang lagdaan ang transaksyon. Kapag naisumite na, ang nasusulat na signer account na unang naka-serialize ang magiging nagbabayad ng bayad. Babayaran ng account na ito ang halaga ng transaksyon hindi alintana kung magtagumpay o mabigo ang transaksyon. Kung ang nagbabayad ng bayad ay walang sapat na balanse upang bayaran ang bayad sa transaksyon, ang transaksyon ay ibababa.

Sa oras ng pagsulat na ito, 50% ng lahat ng bayarin sa transaksyon ay kinokolekta ng validator na gumagawa ng block, habang ang natitirang 50% ay sinusunog. Gumagana ang istrukturang ito upang mahikayat ang mga validator na iproseso ang pinakamaraming transaksyon hangga't maaari sa kanilang mga puwang sa iskedyul ng pinuno.

## Other Resources

- [Official Documentation](https://docs.solana.com/developing/programming-model/transactions)
- [Transaction Structure](https://solana.wiki/docs/solidity-guide/transactions/#solana-transaction-structure)
- [Transaction Fees by Justin Starry](https://jstarry.notion.site/Transaction-Fees-f09387e6a8d84287aa16a34ecb58e239)
- [An Introduction to Solana by Hana](https://2501babe.github.io/posts/solana101.html)
- [Transaction Processing by Jito Labs](https://jito-labs.medium.com/solana-validator-101-transaction-processing-90bcdc271143)
- [Solana Transaction in Depth by Alex Miller](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
