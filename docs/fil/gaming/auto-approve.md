---
title: How to auto approve transactions
head:
  - - meta
    - name: title
      content: Solana Cookbook | How to auto approve transactions
  - - meta
    - name: og:title
      content: Solana Cookbook | How to auto approve transactions
  - - meta
    - name: description
      content: To have a fluent game play you may want to be able to auto approve transactions
  - - meta
    - name: og:description
      content: To have a fluent game play you may want to be able to auto approve transactions
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

WIP - This is a work in progress

# Paano awtomatikong aprubahan ang transaksyon para sa mabilis na paglalaro at mahusay na ux

Upang magkaroon ng tuluy-tuloy na paglalaro para sa mga on-chain na laro, kapaki-pakinabang na magkaroon ng wallet na awtomatikong aprubahan.

1. Nag-aalok ang Solflare wallet ng auto-approve functionality na may burner wallet, ngunit nililimitahan nito ang iyong mga manlalaro sa isang wallet lang.

[Burner Auto Approve Wallets](https://twitter.com/solflare_wallet/status/1625950688709644324)<br />

2. Ang isa pang paraan para gawin ito ay ang gumawa ng key pair sa iyong laro at hayaan ang manlalaro na maglipat ng ilang sol sa wallet na iyon at pagkatapos ay gamitin ito upang magbayad para sa mga bayarin sa transaksyon. Ang problema lang dito ay kailangan mong pangasiwaan ang seguridad para sa wallet na ito at ang mga manlalaro ay kailangang magkaroon ng access sa kanilang seed phrase.

[Halimbawa ng Source Code](https://github.com/Woody4618/SolPlay_Unity_SDK/blob/main/Assets/SolPlay/Scripts/Services/WalletHolderService.cs)<br />
[Halimbawa ng Laro](https://solplay.de/SolHunter/index.html)<br />

3. Maaari mong bayaran ang mga bayarin sa iyong sarili, sa pamamagitan ng paggawa at pagpirma sa mga transaksyon sa backend at makipag-ugnayan dito sa pamamagitan ng isang API. Para doon magpadala ka ng mga parameter sa iyong backend at lagdaan ang transaksyon doon at magpadala ng kumpirmasyon sa kliyente sa sandaling tapos na ito.

4. May protocol na tinatawag na @gumisfunn at naglabas sila ng feature na tinatawag na session keys. Ang Session Keys ay mga ephemeral key na may pinong saklaw ng programa/pagtuturo para sa tiered na pag-access sa iyong mga programang @solana.
Nagbibigay-daan ang mga ito sa mga user na makipag-ugnayan sa mga app sa ilalim ng mga partikular na parameter tulad ng tagal, max na mga token, dami ng mga post o anumang iba pang function na partikular sa isang app.
[Link](https://twitter.com/gumisfunn/status/1642898237395972097?s=20)