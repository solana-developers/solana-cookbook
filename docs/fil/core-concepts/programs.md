---
title: Programs
head:
  - - meta
    - name: title
      content: Solana Cookbook | Programs
  - - meta
    - name: og:title
      content: Solana Cookbook | Programs
  - - meta
    - name: description
      content: Programs (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programs and more Core Concepts at The Solana cookbook.
  - - meta
    - name: og:description
      content: Programs (also known as smart contracts) serve as the foundation for on-chain activity. Learn about Programs and more Core Concepts at The Solana cookbook.
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

# Programs

Ang sinumang developer ay maaaring magsulat at mag-deploy ng mga programa sa Solana blockchain. Ang mga programa (kilala bilang mga matalinong kontrata sa iba pang mga protocol) ay nagsisilbing pundasyon para sa on-chain na aktibidad, na nagpapagana ng anuman mula sa DeFi at NFT hanggang sa Social Media at Gaming.

## Facts

::: tip Fact Sheet
- Pinoproseso ng mga program ang [mga transaksyon](./transactions) mula sa parehong mga end user at iba pang mga program
- Ang lahat ng mga programa ay *stateless*: anumang data na nakipag-ugnayan sa kanila ay nakaimbak sa magkahiwalay na [accounts](./accounts.md) na ipinapasa sa pamamagitan ng mga instructions
- Ang mga program mismo ay nakaimbak sa mga account na minarkahan bilang `mapapatupad`
- Lahat ng mga programa ay pagmamay-ari ng [BPF Loader](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) at isinasagawa ng [Solana Runtime](https://docs.solana.com/developing/programming-model/runtime)
- Ang mga developer ay karaniwang nagsusulat ng mga programa sa Rust o C++, ngunit maaaring pumili ng anumang wika na nagta-target ng [LLVM](https://llvm.org/) ng [BPF](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) backend
- Lahat ng mga programa ay may iisang entry point kung saan nagaganap ang pagpoproseso ng pagtuturo (i.e. `process_instruction`); palaging kasama sa mga parameter ang:
     - `program_id`: `pubkey`
     - `account`: `array`,
     - `instruction_data`: `byte array`
:::

## Deep Dive

Hindi tulad ng karamihan sa iba pang mga blockchain, ganap na pinaghihiwalay ng Solana ang code mula sa data. Ang lahat ng data kung saan nakikipag-ugnayan ang mga programa ay iniimbak sa magkahiwalay na mga account at ipinapasa bilang mga sanggunian sa pamamagitan ng mga instruction. Ang modelong ito ay nagbibigay-daan para sa isang generic na programa na gumana sa iba't ibang mga account nang hindi nangangailangan ng mga karagdagang deployment. Ang mga karaniwang halimbawa ng pattern na ito ay makikita sa buong Native at SPL Programs.

### Native Programs & The Solana Program Library (SPL)

Ang Solana ay nilagyan ng ilang mga programa na nagsisilbing pangunahing mga bloke para sa mga on-chain na pakikipag-ugnayan. Ang mga programang ito ay nahahati sa [Mga Native na Program](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader) at [Mga Programa ng Solana Program Library (SPL)](https://spl.solana.com/).

Ibinibigay ng Native Programs ang base functionality na kinakailangan para magpatakbo ng mga validator. Sa mga programang ito, ang pinakakilala ay ang [System Program](https://docs.solana.com/developing/runtime-facilities/programs#system-program) na responsable sa pangangasiwa ng mga bagong account at paglilipat ng SOL sa pagitan ng dalawang partido .

Sinusuportahan ng SPL Programs ang ilang mga on-chain na aktibidad, kabilang ang paggawa, pagpapalit, at pagpapahiram ng mga token, pati na rin ang pagbuo ng mga stake pool at pagpapanatili ng on-chain name service. Ang [SPL Token Program](https://spl.solana.com/token) ay maaaring direktang gamitin sa pamamagitan ng CLI, habang ang iba ay tulad ng [Associated Token Account Program](https://spl.solana.com/associated-token-account) ay karaniwang binubuo ng mga pasadyang programa.

### Writing Programs

Ang mga programa ay pinakakaraniwang binuo gamit ang Rust o C++, ngunit maaaring mabuo sa anumang wika na nagta-target sa backend ng BPF ng LLVM. Pinapagana ng mga kamakailang inisyatiba ng [Neon Labs](https://neon-labs.org/) at [Solang](https://solang.readthedocs.io/en/latest/) ang [EVM](https://ethereum.org/en/developers/docs/evm/) compatibility at payagan ang mga developer na magsulat ng mga program sa Solidity.

Karamihan sa mga programang nakabatay sa kalawang ay sumusunod sa sumusunod na arkitektura:

| File           | Description                                   |
|----------------|-----------------------------------------------|
| lib.rs         | Registering modules                           |
| entrypoint.rs  | Entrypoint to the program                     |
| instruction.rs | Program API, (de)serializing instruction data |
| processor.rs   | Program logic                                 |
| state.rs       | Program objects, (de)serializing state        |
| error.rs       | Program-specific errors                       |

Kamakailan, ang [Anchor](https://github.com/coral-xyz/anchor) ay lumitaw bilang isang sikat na framework para sa pagbuo ng mga programa. Ang Anchor ay isang opinionated framework, na katulad ng Ruby on Rails, na binabawasan ang boilerplate at pinapa-streamline ang (de)serialization na proseso para sa Rust-based na development.

Karaniwang binuo at sinusubok ang mga programa laban sa mga environment ng Localhost at Devnet bago i-deploy sa Testnet o Mainnet. Sinusuportahan ng Solana ang mga sumusunod na environment:

| Cluster Environment  | RPC Connection URL                                                        |
|----------------------|---------------------------------------------------------------------------|
| Mainnet-beta         | https://api.mainnet-beta.solana.com                                       |
| Testnet              | https://api.testnet.solana.com                                            |
| Devnet               | https://api.devnet.solana.com                                             |
| Localhost            | Default port: 8899 (e.g. http://localhost:8899, http://192.168.1.88:8899) |

Kapag na-deploy na sa isang environment, maaaring makipag-ugnayan ang mga kliyente sa mga on-chain na program sa pamamagitan ng [RPC connections](https://docs.solana.com/developing/clients/jsonrpc-api) sa kaukulang cluster.

### Deploying Programs

Maaaring i-deploy ng mga developer ang kanilang mga programa sa pamamagitan ng [CLI](https://docs.solana.com/cli/deploy-a-program):

```bash
solana program deploy <PROGRAM_FILEPATH>
```

Kapag na-deploy ang isang program, iko-compile ito sa isang [ELF shared object](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format) (containing BPF bytecode) at ia-upload sa Solana cluster. Ang mga programa ay nakatira sa mga account (katulad ng lahat ng iba pa sa Solana), maliban sa mga account na ito ay minarkahan bilang `executable` at itinalaga sa BPF Loader. Ang address ng account na ito ay tinutukoy bilang `program_id` at ginagamit upang i-reference ang program sa lahat ng mga transaksyon sa hinaharap.

Sinusuportahan ng Solana ang maraming BPF Loader, na ang pinakabago ay ang [Upgradable BPF Loader](https://explorer.solana.com/address/BPFLoaderUpgradeab1e11111111111111111111111). Ang BPF Loader ay may pananagutan sa pangangasiwa sa account ng programa at gawin itong available sa mga kliyente sa pamamagitan ng `program_id`. Ang lahat ng mga programa ay may iisang entry point kung saan nagaganap ang pagpoproseso ng pagtuturo (ibig sabihin, `process_instruction`) at palaging kasama sa mga parameter ang:
- `program_id`: `pubkey`
- `account`: `array`,
- `instruction_data`: `byte array`

Kapag na-invoke, ang mga programa ay isinasagawa ng Solana Runtime.

## Other Resources

- [Official Documentation](https://docs.solana.com/developing/on-chain-programs/overview)
- [SPL Documentation](https://spl.solana.com/)
- [Program Deploys by Justin Starry](https://jstarry.notion.site/Program-deploys-29780c48794c47308d5f138074dd9838)
- [Solana Starter Kit by Iron Addicted Dog](https://book.solmeet.dev/notes/solana-starter-kit)
- [Programming on Solana by Paulx](https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/)
- [An Introduction to the Solana Blockchain by Hana](https://2501babe.github.io/posts/solana101.html)
- [Anchor](https://github.com/coral-xyz/anchor)
