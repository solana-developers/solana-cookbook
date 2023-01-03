# Keypairs and Wallets

## How to generate a new Keypair (Yeni Keypair nasıl oluşturulur)

Çeşitli Solana kitaplıkları ile gerçekleştirebileceğiniz farklı işlemlerin çoğu, bir Keypair veya Cüzdan gerektirir. Bir cüzdana bağlanıyorsanız endişelenmenize gerek yok. Ancak, bir Keypair’e ihtiyacınız varsa, bir tane oluşturmanız gerekecektir.



How to restore a Keypair from a secret(Secret’tan Keypair nasıl geri yüklenir)
Secret’ınız varsa, dApp'inizi test etmek için keypair’i secret’tan alabilirsiniz.

1. Byte’tan

```ts
const keypair = Keypair.fromSecretKey(
  Uint8Array.from([
    174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56,
    222, 53, 138, 189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246,
    15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121,
    121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
  ])
);
```


2.Base58 string’den

```ts
const keypair = Keypair.fromSecretKey(
  bs58.decode(
    "5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG"
  )
);
```

## How to verify a Keypair (Keypair nasıl doğrulanır)

Size bir keypair verilirse, secret verilen public key’in eşleşip eşleşmediğini doğrulayabilirsiniz.

```ts
const publicKey = new PublicKey("24PNhTaNtomHhoy3fTRaMhAFCRj4uHqhZEEoWrKDbR5p");
const keypair = Keypair.fromSecretKey(
  Uint8Array.from([
    174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56,
    222, 53, 138, 189, 224, 216, 117, 173, 10, 149, 53, 45, 73, 251, 237, 246,
    15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121,
    121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135,
  ])
);
console.log(keypair.publicKey.toBase58() === publicKey.toBase58());
// true
```

## How to check if a public key has an associated private key (Bir public key’in ilişkili private key’e sahip olup olmadığı nasıl kontrol edilir)
Bazı özel durumlarda (örneğin, Programdan Türetilen Adres), public key’lerin kendileriyle ilişkili private key’i olmayabilir. Bunu, public key’in ed25519 eğrisinde olup olmadığına bakarak kontrol edebilirsiniz. Yalnızca eğri üzerinde bulunan public key’ler, cüzdan sahibi kullanıcılar tarafından kontrol edilebilir.

```ts
const key = new PublicKey("5oNDL3swdJJF1g9DzJiZ4ynHXgszjAEpUkxVYejchzrY");
console.log(PublicKey.isOnCurve(key.toBytes()));
```

## How to generate a mnemonic phrase (Hatırlatıcı bir ifade nasıl oluşturulur)

Bir cüzdan oluşturuyorsanız, kullanıcının onu yedek olarak kaydedebilmesi için anımsatıcı bir ifade oluşturmanız gerekir.

```ts
const mnemonic = bip39.generateMnemonic();
```

## How to restore a Keypair from a mnemonic phrase (Anımsatıcı bir cümleden Keypair nasıl yüklenir)

Birçok cüzdan uzantısı, private key’i temsil etmek için anımsatıcılar kullanır. Yerel testler için anımsatıcıyı Keypair’e dönüştürebilirsiniz.

1. BIP39 - tek bir cüzdan oluşturma

```ts
const mnemonic =
  "pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter";
const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
const keypair = Keypair.fromSeed(seed.slice(0, 32));
```

2.BIP44 (birden çok cüzdan, HD cüzdan olarak da bilinir)

Tek bir seed’den birden fazla cüzdan yapabilirsiniz - 'Hiyerarşik Deterministik cüzdanlar' veya HD cüzdanlar olarak da bilinir:

```ts
const mnemonic =
  "neither lonely flavor argue grass remind eye tag avocado spot unusual intact";
const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
for (let i = 0; i < 10; i++) {
  const path = `m/44'/501'/${i}'/0'`;
  const keypair = Keypair.fromSeed(derivePath(path, seed.toString("hex")).key);
  console.log(`${path} => ${keypair.publicKey.toBase58()}`);
}
```

## How to generate a vanity address (Özel bir adres nasıl oluşturulur)

Özel public key’ler veya özel adresler, belirli karakterlerle başlayan anahtarlardır. Örneğin, bir kişi bir public key’in "elv1s" ile başlamasını veya hatta "cook" ile başlamasını isteyebilir. Bunlar, diğer kişilerin anahtarın kime ait olduğunu hatırlamalarına yardımcı olarak anahtarın daha kolay tanımlanabilir olmasını sağlar.

Not: Özel adresinizde ne kadar fazla karakter varsa, o kadar uzun sürer.

```ts
let keypair = Keypair.generate();
while (!keypair.publicKey.toBase58().startsWith("elv1s")) {
  keypair = Keypair.generate();
}
```

## How to sign and verify messages with wallets (Cüzdanlarla mesajlar nasıl imzalanır ve doğrulanır)

Bir keypair’ın birincil işlevi, mesajları imzalamak ve imzanın doğrulanmasını sağlamaktır. İmzanın doğrulanması, alıcının verilerin belirli bir private key’in sahibi tarafından imzalandığından emin olmasını sağlar.

Bunu yapmak için [TweetNaCl][1] kripto kitaplığını içe aktaracağız.

```ts
const message = "The quick brown fox jumps over the lazy dog";
const messageBytes = decodeUTF8(message);

const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
const result = nacl.sign.detached.verify(
  messageBytes,
  signature,
  keypair.publicKey.toBytes()
);

console.log(result);
```

[1]: https://www.npmjs.com/package/tweetnacl

## How to connect to a wallet (Cüzdana nasıl bağlanılır)

Solana'nın[wallet-adapter](https://github.com/solana-labs/wallet-adapter)(cüzdan bağdaştırıcı) kitaplıkları, client tarafında cüzdan bağlantılarını yönetmeyi kolaylaştırır.

### React

Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```
yarn add @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets
```

React cüzdan bağdaştırıcı kitaplıkları, `useWallet`, `WalletProvider`,  `useConnection` ve `ConnectionProvider` gibi kancalar ve ConnectionProvider aracılığıyla cüzdan bağlantı durumlarını sürdürmemize ve bunlara erişmemize olanak tanır. React App, `WalletProvider` ve `ConnectionProvider` ile paketlenmelidir.

Ek olarak, bağlantı modunun görünürlüğünü değiştirmek için `useWalletModal`'ı kullanarak ve ayrıca `@solana/wallet-adapter-react-ui`'den Uygulamayı `WalletModalProvider` ile sarmalayarak kullanıcılardan bağlanmalarını isteyebiliriz. Bağlantı modu bizim için bu bağlantı akışını yönetecek, böylece bir cüzdanın ne zaman bağlandığını dinleyebiliriz. `useWallet` yanıtı boş olmayan bir `wallet` özelliğine sahip olduğunda bir cüzdanın bağlı olduğunu biliyoruz. Tam tersi, bu özellik boşsa, cüzdanın bağlantısının kesildiğini biliyoruz.

```ts
const { wallet } = useWallet();
const { setVisible } = useWalletModal();

const onRequestConnectWallet = () => {
  setVisible(true);
};

// Prompt the user to connect their wallet
if (!wallet) {
  return <button onClick={onRequestConnectWallet}>Connect Wallet</button>;
}

// Displays the connected wallet address
return (
  <main>
    <p>Wallet successfully connected!</p>
    <p>{wallet.publicKey.toBase58()}</p>
  </main>
);
```

### Vue

Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```/bin/bash
npm install solana-wallets-vue @solana/wallet-adapter-wallets
```

[Solana Wallets Vue](https://github.com/lorisleiva/solana-wallets-vue) eklentisi, bir cüzdan mağazasını başlatmamıza ve herhangi bir bileşen içinde erişilebilen yeni bir `$wallet` global özelliği oluşturmamıza olanak tanır. `useWallet()`'ten alabileceğiniz tüm özellikler ve yöntemler [burada](https://github.com/lorisleiva/solana-wallets-vue#usewallet-references) görüntülenir. Ayrıca, kullanıcıların bir cüzdan seçmesine ve ona bağlanmasına izin vermek için WalletMultiButton bileşenini içe aktarır ve oluştururuz.

```vue
<script setup>
import { WalletMultiButton } from "solana-wallets-vue";
</script>

<template>
  <wallet-multi-button></wallet-multi-button>
</template>
```

### Svelte

Gerekli bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

```
npm install @svelte-on-solana/wallet-adapter-core @svelte-on-solana/wallet-adapter-ui @solana/wallet-adapter-base @solana/wallet-adapter-wallets @solana/web3.js
```

[Svelte Wallet Adapter](https://github.com/svelte-on-solana/wallet-adapter) paketi, Svelte Template veya SvelteKit ile yapılan bir proje içindeki tüm JS, TS ve/veya Svelte dosyaları arasında erişilebilir bir Svelte Mağazası (`$walletStore`) eklemeye olanak tanır. [Burada](https://github.com/svelte-on-solana/wallet-adapter/blob/master/packages/core/README.md/)ki repo referansını kullanarak adaptörü SSR veya SPA için kullanabilirsiniz. Kullanıcı arabirimi paketi, kullanıcıların kendisine bağlanacak bir cüzdan seçmesine olanak tanıyan bir `<WalletMultiButton />` bileşeni içerir.

```html
<script>
  import { walletStore } from "@svelte-on-solana/wallet-adapter-core";
  import { WalletMultiButton } from "@svelte-on-solana/wallet-adapter-ui";
</script>

{#if $walletStore?.connected} Wallet with public key {$walletStore.publicKey}
successfully connected! {:else}
<WalletMultiButton />
{/if}
```
