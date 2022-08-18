---
title: React Native
head:
  - - meta
    - name: title
      content: คู่มือ Solana | การใช้ React Native กับ Solana
  - - meta
    - name: og:title
      content: คู่มือ Solana | การใช้ React Native กับ Solana
  - - meta
    - name: description
      content: ใน tutorial นี้เราจะได้เรียนรู้วิธีใช้ Solana บน React Native apps.
  - - meta
    - name: og:description
      content: ใน tutorial นี้เราจะได้เรียนรู้วิธีใช้ Solana บน React Native apps.
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

# React Native และ Solana

React Native เป็น open-source UI software framework ใช้สำหรับ dev mobile, web และ desktop applications โดยนักพัฒนาจะสามารถใช้ React framework กับ native platform capabilities ได้ และการใช้กับ Solana SDK จะเป็น platform ที่ดีในการสร้าง native Crypto apps.

ทางที่เร็วที่สุดในการที่จะเริ่มต้นกับ React Native และ Solana คือการใช้ [Solana DApp Scaffold สำหรับ React Native](#solana-dapp-scaffold-for-react-native). 

## วิธีใช้ @solana/web3.js ใน React Native app

ในตัวอย่างนี้เราจะได้เรียนรู้วิธีการสร้าง React Native app, การติดตั้ง และ configure  `@solana/web3.js` SDK, และ dependencies ต่างๆ

ถ้าเรามี app แล้วให้ข้ามไปที่ [การติดตั้ง dependencies](#install-dependencies).

### สร้าง app ใหม่

เราจะเริ่มจากการสร้าง React Native app โดยใช้ TypeScript, แล้ว `cd` เข้าไปใน project directory, ที่ที่เราจะ execute commands ต่างๆ.

```shell
npx react-native init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### ติดตั้ง dependencies

ต่อไปเราจะติดตั้ง dependencies. เมื่อเราติดตั้ง Solana SDK, และนอกจากน้ีเรายังจะติดตั้ง package เพื่อ patch `metro` configuration, และ polyfills 2 ตัวที่เอาไว้ patch ในส่วนของ React Native environment. 

```shell
yarn add @solana/web3.js metro-config react-native-get-random-values react-native-url-polyfill
```

### Update `index.js`

เพื่อ load polyfills, เราจะเปิด file `index.js` ที่ root ของ project และเพิ่ม 2 บรรทัดนี้เข้าไปที่ 2 บรรทัดแรกของ file:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

### Update `metro.config.js`

ในขั้นตอนนี้, เราจะเปลี่ยน `metro` configuration, มันจะได้ load files ที่มีนามสกุล `cjs`.

เปิด file `metro.config.js` ที่ root ของ project ของเราและแทนที่ด้วย snippet ด้านล่างนี้:

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

มาเพิ่มตัวอย่าง web3.js ใส่ใน app ของเรากันดีกว่า!

เปิด file `App.tsx` และเพิ่ม code นี้เข้าไปใน function`App`:

ในตัวอย่างนี้, เราจะติดตั้ง connection ไปที่ Solana Devnet และเมื่อ components load แล้วเราจะลองหา version ของ cluster ที่เราต่อด้วยและ เก็บ version นั้นไว้ใน component state.

นอกจากนี้, ในตัวอย่างนี้เราจะแสดงวิธี generate และเก็บ keypair.

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

Lastly, in the template (or `render function`) add the following markup:


```tsx
{version ? (
  <Section title="Version">{JSON.stringify(version, null, 2)}</Section>
) : null}
{keypair ? (
  <Section title="Keypair">{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Section>
) : null}
<Button title="New Keypair" onPress={randomKeypair} />
```

### ติดตั้ง cocoapods

ในการทำให้ polyfills ทำงานเราต้องติดตั้ง `cocoapods` ด้วย

```shell
cd ios && pod install
```

### Start application 

เมื่อเราติดตั้งแล้วเราจะสามารถ start app เราได้แล้ว

```shell
npx react-native run-ios
```

ถ้าไม่ติดอะไรเราจะเห็น React Native app เริ่มทำงานบน iOS simulator และได้รับเลข version ของ Solana Devnet.

## Solana DApp Scaffold สำหรับ React Native

ถ้าเราต้องการเริ่มจาก Scaffold เราสามารถ download ได้ที่ [Solana DApp Scaffold for React Native](https://github.com/solana-developers/dapp-scaffold-react-native).


## ปัญหาที่เจอบ่อยเมื่อใช้ @solana/web3.js กับ React Native app

### Error: While trying to resolve module superstruct from file

> error: Error: While trying to resolve module superstruct from file .../SolanaReactNative/node_modules/@solana/web3.js/lib/index.browser.cjs.js, the package .../SolanaReactNative/node_modules/superstruct/package.json was successfully found. However, this package itself specifies a main module field that could not be resolved (.../SolanaReactNative/node_modules/superstruct/lib/index.cjs.

ปัญหานี้เกิดจาก `metro`, React Native bundler ไม่รู้จักนามสกุล `cjs` อ้างถึง [open issue นี้](https://github.com/facebook/metro/issues/535).

เราสามารถแก้ปัญหานี้ได้โดบการแก้ `metro.config.js` โดยเพิ่ม `cjs` ใน`resolver.sourceExts` array ตามนี่บอกไปแล้ว

### Error: URL.protocol is not implemented

    ERROR Error: URL.protocol is not implemented 
    ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This สามารถ also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native. 

ปัญหานี้สามารถแก้ได้โดยใช้ polyfill สำหรับ `URL` object ใน React Native.

ติดตั้ง package `react-native-url-polyfill` และ import มันใน file ของ app (เช่น: `index.js`), เหมือนที่เคยแสดงไว้ก่อนหน้านี้

### Error: crypto.getRandomValues() not supported

    Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported


ปัญหานี้สามารถแก้ได้โดยใช้ polyfill สำหรับ `crypto` object ใน React Native.

ติดตั้ง package `react-native-get-random-values` และ import มันใน file ของ app (เช่น: `index.js`), เหมือนที่เคยแสดงไว้ก่อนหน้านี้
