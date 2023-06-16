---
title: Feature Parity Testing
head:
  - - meta
    - name: title
      content: Solana Cookbook | Feature Parity Testing
  - - meta
    - name: og:title
      content: Solana Cookbook | Feature Parity Testing
  - - meta
    - name: description
      content: Features vary by Solana cluster. Feature testing ensures predictable results.
  - - meta
    - name: og:description
      content: Features vary by Solana cluster. Feature testing ensures predictable results.
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

# Pagsubok sa Pagkakapareho ng Tampok

Kapag sinusubukan ang iyong programa, ang mga katiyakan na pareho itong tatakbo sa iba't ibang mga kumpol ay mahalaga sa parehong kalidad at
paggawa ng inaasahang resulta.

## Mga Katotohanan

::: tip Fact Sheet
- Ang mga tampok ay mga kakayahan na ipinakilala sa mga validator ng Solana at nangangailangan ng pag-activate upang magamit.
- Maaaring i-activate ang mga feature sa isang cluster (hal. testnet) ngunit hindi sa isa pa (hal. mainnet-beta).
- Gayunpaman; kapag lokal na pinapatakbo ang default na `solana-test-validator`, lahat ng available na feature sa iyong
Ang bersyon ng Solana ay awtomatikong naisaaktibo. Ang resulta ay kapag lokal na pagsubok, ang mga kakayahan at resulta ng
maaaring hindi pareho ang iyong pagsubok kapag nagde-deploy at tumatakbo sa ibang cluster!
:::

## Sitwasyon
Ipagpalagay na mayroon kang Transaksyon na naglalaman ng tatlong (3) mga instruction at ang bawat instruction ay kumukonsumo ng humigit-kumulang
100_000 Compute Units (CU). Kapag tumatakbo sa bersyon ng Solana 1.8.x, mapapansin mo ang iyong pagtuturo sa pagkonsumo ng CU katulad ng:

| Instruction | Simula sa CU | Pagpapatupad | Natitirang CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 200_000 | -100_000| 100_000
| 3 | 200_000 | -100_000| 100_000

Sa Solana 1.9.2 isang tampok na tinatawag na 'transaction wide compute cap' ay ipinakilala kung saan ang isang Transaksyon, bilang default,
ay may 200_000 CU na badyet at ang mga naka-encapsulate na instruction na **_ay kumukuha_** mula sa badyet ng Transaksyon na iyon. Parehong tumatakbo
ang transaksyon tulad ng nabanggit sa itaas ay magkakaroon ng ibang pag-uugali:

| Instruction | Simula sa CU | Pagpapatupad | Natitirang CU|
| - | - | - | - |
| 1 | 200_000 | -100_000| 100_000
| 2 | 100_000 | -100_000| 0
| 3 | 0 | FAIL!!! | FAIL!!!

Hays! Kung hindi mo alam ito, malamang na mabigo ka dahil walang pagbabago sa iyong pag-uugali sa pagtuturo
magiging sanhi nito. Sa devnet ito ay gumana nang maayos, ngunit sa lokal na ito ay nabigo?!?

May kakayahang taasan ang kabuuang badyet sa Transaksyon, para sabihing 300_000 CU, at iligtas ang iyong katinuan
ngunit ito ay nagpapakita kung bakit ang pagsubok sa **_Feature Parity_** ay nagbibigay ng isang maagap na paraan upang maiwasan ang anumang pagkalito.

## Katayuan ng Tampok
Medyo madaling suriin kung anong mga feature ang pinagana para sa isang partikular na cluster gamit ang command na `solana feature status`.
```console
solana feature status -ud // Ipinapakita ayon sa feature status para sa devnet
solana feature status -ut // Ipinapakita para sa testnet
solana feature status -um // Ipinapakita para sa mainnet-beta
status ng tampok na solana -ul // Ipinapakita para sa lokal, nangangailangan ng pagpapatakbo ng solana-test-validator
```

Bilang kahalili, maaari kang gumamit ng tool tulad ng [scfsd](#resources) upang obserbahan ang lahat ng katayuan ng tampok sa mga cluster
na magpapakita, bahagyang screen na ipinapakita dito, at hindi nangangailangan ng `solana-test-validator` na tumakbo:

<img src="./feature-parity-testing/scfsd.png" alt="Feature Status Heatmap">

## Pagsubok sa Pagkakapantay-pantay
Gaya ng nabanggit sa itaas, awtomatikong ina-activate ng `solana-test-validator` ang **lahat** ng mga feature.
Kaya't upang masagot ang tanong na "Paano ko masusubok nang lokal sa isang environment na may pagkakapareho sa devnet,
testnet o kahit mainnet-beta?".

Solusyon: Ang mga PR ay idinagdag sa Solana 1.9.6 upang payagan ang pag-deactivate ng mga feature:

```console
solana-test-validator --deactivate-feature <FEATURE_PUBKEY> ...
```

## Simpleng Pagpapakita
Ipagpalagay na mayroon kang isang simpleng programa na nag-log sa data na natatanggap nito sa entry-point nito. At ikaw ay
pagsubok ng isang transaksyon na nagdaragdag ng dalawang (2) mga instruction para sa iyong programa.

### Na-activate ang lahat ng feature
1. Sisimulan mo ang test validator sa isang terminal:

```console
solana config set -ul
solana-test-validator -l ./ledger --bpf-program ADDRESS target/deploy/PROGNAME.so --reset`
```

2. Sa ibang terminal sisimulan mo ang log streamer:
```console
solana logs
```

3. Pagkatapos ay patakbuhin mo ang iyong transaksyon. Makakakita ka ng katulad sa log terminal (na-edit para sa kalinawan):
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[1]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 187157 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success[
```
Dahil ang aming feature na 'transaction wide compute cap' ay awtomatikong naisaaktibo bilang default, sinusunod namin ang bawat isa
pagtuturo na kumukuha ng CU mula sa panimulang Transaksyon na badyet na 200_000 CU.

### Na-deactivate ang mga piling feature
1. Para sa run na ito, gusto nating tumakbo upang ang pag-uugali ng badyet ng CU ay naaayon sa kung ano ang tumatakbo sa devnet. Gamit
ang (mga) tool na inilalarawan sa [Status ng Tampok](#feature-status) ibinubukod namin ang pampublikong key na `transaction wide compute cap`
at gamitin ang `--deactivate-feature` sa test validator startup

```console
solana-test-validator -l ./ledger --deactivate-feature 5ekBxc8itEnPv4NzGJtr8BVVQLNMQuLMNQQj7pHoLNZ9 --bpf-program target/deploy/PROGNAME.so --reset`
```
2. Nakita namin ngayon sa aming mga log na ang aming mga instruction ay mayroon na ngayong sariling 200_000 CU na badyet (na-edit para sa kalinawan) na
kasalukuyang estado sa lahat ng upstream cluster:
```console
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc invoke [1]
Program log: process_instruction: PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc: 0 accounts, data=[0]
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc consumed 12843 of 200000 compute units
Program PWDnx8LkjJUn9bAVzG6Fp6BuvB41x7DkBZdo9YLMGcc success
```

## Buong Parity Testing
Maaari kang maging ganap na pare-pareho sa isang partikular na cluster sa pamamagitan ng pagtukoy sa bawat feature na hindi
na-activate pa at magdagdag ng `--deactivate-feature <FEATURE_PUBKEY>` para sa bawat isa kapag gumagamit ng `solana-test-validator`:
```console
solana-test-validator --deactivate-feature PUBKEY_1 --deactivate-feature PUBKEY_2 ...
```

Bilang kahalili, ang [scfsd](#resources) ay nagbibigay ng command switch upang i-output ang kumpletong na-deactivate na feature
itinakda para sa isang cluster na direktang i-feed sa startup ng `solana-test-validator`:
```console
solana-test-validator -l ./.ledger $(scfsd -c devnet -k -t)
```

Kung magbubukas ka ng isa pang terminal, habang tumatakbo ang validator, at `solana feature status` ang makikita mo
mga feature na na-deactivate na nakitang naka-deactivate sa devnet

## Buong Parity Testing sa pamamagitan ng pag-program
Para sa mga kumokontrol sa pagpapatakbo ng test validator sa loob ng kanilang test code, nagbabago
ang test validator activated/deactivated features ay posible gamit ang TestValidatorGenesis. Sa
Solana 1.9.6 isang function ang idinagdag sa tagabuo ng validator upang suportahan ito.

Sa ugat ng folder ng iyong program, lumikha ng bagong folder na tinatawag na `tests` at magdagdag ng `parity_test.rs`
file. Narito ang mga function ng boiler place (boiler-plate kung gugustuhin mo) na ginagamit ng bawat pagsubok

<SolanaCodeGroup>
  <SolanaCodeGroupItem title="Test Boiler Plate" active>

  <template v-slot:default>

@[code](@/code/feature-parity-testing/preamble.rs)

  </template>

  <template v-slot:preview>

@[code](@/code/feature-parity-testing/preamble_short.rs)

  </template>

  </SolanaCodeGroupItem>

</SolanaCodeGroup>

Maaari na kaming magdagdag ng mga function ng pagsubok sa katawan ng `mod test {...}` upang ipakita ang default
setup ng validator (naka-enable ang lahat ng feature) at pagkatapos ay i-disable ang `transaction wide compute cap` bilang
bawat nakaraang mga halimbawa na nagpapatakbo ng `solana-test-validator` mula sa command line.

<CodeGroup>
  <CodeGroupItem title="All Features Test">

  @[code](@/code/feature-parity-testing/deactivate_one.rs)

  </CodeGroupItem>

  <CodeGroupItem title="Disable Tx CU Test" active>

  @[code](@/code/feature-parity-testing/deactivate_two.rs)

  </CodeGroupItem>

</CodeGroup>

Bilang kahalili, ang [scfs engine gadget](#resources) ay maaaring makagawa ng isang buong vector ng na-deactivate
mga tampok para sa isang kumpol. Ipinapakita ng sumusunod ang paggamit ng makinang iyon upang makakuha ng listahan
ng lahat ng na-deactivate na feature para sa devnet.

<CodeGroup>
  <CodeGroupItem title="Devnet Parity">

  @[code](@/code/feature-parity-testing/deactivate_scfs.rs)

  </CodeGroupItem>

</CodeGroup>


Happy Testing!


## Resources
[scfsd](https://github.com/FrankC01/solana-gadgets/tree/main/rust/scfsd)

[gadget-scfs](https://github.com/FrankC01/solana-gadgets/tree/main/rust/gadgets-scfs)