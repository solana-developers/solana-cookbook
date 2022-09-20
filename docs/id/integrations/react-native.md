---
title: React Native
head:
  - - meta
    - name: title
      content: Buku Panduan Solana | Menggunakan React Native di Solana
  - - meta
    - name: og:title
      content: Buku Panduan Solana | Menggunakan React Native di Solana
  - - meta
    - name: description
      content: Dalam tutorial ini, anda akan mempelajari cara menggunakan Solana di aplikasi berbasis React Native.
  - - meta
    - name: og:description
      content: Dalam tutorial ini, anda akan mempelajari cara menggunakan Solana di aplikasi berbasis React Native.
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
---

# React Native dan Solana

React Native adalah kerangka kerja perangkat lunak UI sumber terbuka yang digunakan untuk mengembangkan aplikasi mobile, web, dan desktop dengan memungkinkan pengembang menggunakan kerangka kerja React bersama dengan kemampuan platform native. Didukung dengan Solana SDK, ini adalah platform hebat untuk dengan cepat membangun aplikasi Crypto native yang berkinerja baik.

Cara tercepat untuk memulai dengan React Native dan Solana adalah dengan menggunakan  [Solana DApp Scaffold untuk React Native](#solana-dapp-scaffold-for-react-native). 

## Cara Pakai @solana/web3.js di React Native app

Dalam tutorial ini Anda akan belajar cara membuat aplikasi React Native baru dan menginstal dan mengonfigurasi SDK `@solana/web3.js`, dan dependensinya.

Jika Anda sudah memiliki aplikasi, lewati ke [instalasi dependensi](#install-dependencies).

### Buat aplikasi baru

Kita memulai aplikasi React Native baru yang menggunakan TypeScript, lalu `cd` ke direktori proyek, di mana kita akan mengeksekusi sisa perintah.

```shell
npx react-native init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### Install dependensi

Selanjutnya, kita menginstal dependensi. kita menginstal Solana SDK, dan sebagai tambahan kita menginstal sebuah paket untuk menambal konfigurasi `metro`, dan dua polyfill yang menambal lingkungan React Native.

```shell
yarn add @solana/web3.js metro-config react-native-get-random-values react-native-url-polyfill
```

### Update `index.js`

Untuk load polyfills, kita buka file  `index.js` di root proyek dan tambahkan 2 baris berikut di bagian paling atas file:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

### Update `metro.config.js`

Di step ini, kita akan konfigurasi `metro`, jadi ini akan load files dengan ekstensi `cjs`.

Buka file `metro.config.js`   root proyek dan replace isinya dengan snippet berikut:

```javascript
const {getDefaultConfig} = require('metro-config');

module.exports = async () => {
  const {
    resolver: {sourceExts},
  } = await getDefaultConfig();

  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      sourceExts: [...sourceExts, 'cjs', 'svg'],
    },
  };
};
```

### Update `App.tsx`

Mari tambahkan web3.js ke contoh aplikasi kita!

Buka file `App.tsx` dan tambahkan code berikut di dalam fungsi `App`:

Dalam contoh ini, kita menyiapkan koneksi ke Solana Devnet dan ketika komponen dimuat, kita mendapatkan versi cluster yang kita hubungkan dan menyimpan versi dalam status komponen.

Selain itu, contoh ini menunjukkan cara membuat dan menyimpan keypair.

```typescript
const conn = new Connection(clusterApiUrl('devnet'));
const [version, setVersion] = useState<any>('');
const [keypair, setKeypair] = useState<Keypair>(() => Keypair.generate());

const randomKeypair = () => {
  setKeypair(() => Keypair.generate());
};

useEffect(() => {
  if (version) {
    return;
  }
  conn.getVersion().then(r => setVersion(r));
}, [version, setVersion]);
```

Terakhir, di dalam template  (atau `render function`) tambahkan markup berikut:


```tsx
{version ? (
  <Section title="Version">{JSON.stringify(version, null, 2)}</Section>
) : null}
{keypair ? (
  <Section title="Keypair">{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Section>
) : null}
<Button title="New Keypair" onPress={randomKeypair} />
```

### Install cocoapods

Agar polyfills bisa berfungsi, kita harus install `cocoapods`.

```shell
cd ios && pod install
```

### Start aplikasi 

Setelah semua selesai, kita bisa start aplikasi kita:

```shell
npx react-native run-ios
```

Jika semuanya berjalan dengan baik, Anda akan melihat aplikasi React Native sedang dimulai di simulator iOS Anda yang mengambil versi Solana Devnet.

## Solana DApp Scaffold untuk React Native

Jika Anda ingin memulai, Anda dapat mengunduh [Solana DApp Scaffold untuk React Native](https://github.com/solana-developers/dapp-scaffold-react-native).


## Isu Umum ketika menggunakan  @solana/web3.js di aplikasi React Native

### Error: While trying to resolve module superstruct from file

> error: Error: While trying to resolve module superstruct from file .../SolanaReactNative/node_modules/@solana/web3.js/lib/index.browser.cjs.js, the package .../SolanaReactNative/node_modules/superstruct/package.json was successfully found. However, this package itself specifies a main module field that could not be resolved (.../SolanaReactNative/node_modules/superstruct/lib/index.cjs.

Ini adalah masalah karena `metro`, bundler React Native, tidak mendukung ekstensi `cjs` secara default. ada [issue disini](https://github.com/facebook/metro/issues/535).

Anda dapat memperbaikinya dengan memperbarui `metro.config.js` dan menambahkan `cjs` ke array `resolver.sourceExts`, seperti yang ditunjukkan di atas.

### Error: URL.protocol is not implemented

    ERROR Error: URL.protocol is not implemented 
    ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native. 

Ini adalah masalah yang dapat diperbaiki dengan menggunakan polyfill untuk objek `URL` di React Native.

Instal paket `react-native-url-polyfill` dan impor dalam file utama aplikasi Anda (misalnya: `index.js`), seperti yang ditunjukkan di atas.
### Error: crypto.getRandomValues() not supported

    Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported


Ini adalah masalah yang dapat diperbaiki dengan menggunakan polyfill untuk objek `crypto` di React Native.

Instal paket `react-native-get-random-values` dan impor dalam file utama aplikasi Anda (misalnya: `index.js`), seperti yang ditunjukkan.