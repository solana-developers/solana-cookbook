---
title: React Native
head:
- - meta
- name: title
  content: Solana Cookbook | Using React Native with @solana/web3.js
- - meta
- name: og:title
  content: Solana Cookbook | Using React Native with @solana/web23.js
- - meta
- name: description
  content: React Native is an open-source UI software framework used to develop mobile, web and desktop applications by enabling developers to use the React framework along with native platform capabilities
- - meta
- name: og:description
  content: React Native is an open-source UI software framework used to develop mobile, web and desktop applications by enabling developers to use the React framework along with native platform capabilities
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

# React Native

React Native is an open-source UI software framework used to develop mobile, web and desktop applications by enabling developers to use the React framework along with native platform capabilities.

## How to use @solana/web3.js in a React Native app

In this tutorial you will learn how to create a new React Native app and install and configure the `@solana/web3.js` SDK, and its dependencies. 

If you want to add the `@solana/web3.js` SDK to an existing app, you can skip the first step and start by installing the dependencies.

### Create a new app

We start a new React Native application that uses TypeScript, then `cd` into the project directory, where we will execute the rest of the commands.

```shell
npx react-native init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### Install dependencies

Next, we install the dependencies. We install the Solana SDK, and in addition we install a package to patch the `metro` configuration, and two polyfills that patch the React Native environment. 

```shell
yarn add @solana/web3.js metro-config react-native-get-random-values react-native-url-polyfill
```

### Update `index.js`

To load the polyfills, we open the file `index.js` in the root of the project and add the following two lines to the top of the file:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto'
```

### Update `metro.config.js`

In this step, we will configure the `metro` configuration so it will load files with the `cjs` extension.

Open the file `metro.config.js` in the root of your project and replace the content with the snippet below:

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

In this step, we can use the Solana SDK.

Open the file `App.tsx` and add the following code inside the `App` function:

```typescript
const conn = new Connection(clusterApiUrl('devnet'));
const [res, setRes] = useState<any>('');
const [keypair, setKeypair] = useState<Keypair>(() => Keypair.generate());

const randomKeypair = () => {
  setKeypair(() => Keypair.generate());
};

useEffect(() => {
  if (res) {
    return;
  }
  conn.getVersion().then(r => setRes(r));
}, [res, setRes]);
```

Lastly, in the template (or `render function`) add the following markup:


```tsx
{res ? (
  <Section title="Version">{JSON.stringify(res, null, 2)}</Section>
) : null}
{keypair ? (
  <Section title="Keypair">{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Section>
) : null}
<Button title="New Keypair" onPress={randomKeypair} />
```

### Install cocoapods

In order for our polyfills to work, we need to install the `cocoapods`.

```shell
cd ios && pod install
```

### Start application 

Once we finished all the above, we can start our application

```shell
npx react-native run-ios
```

If all went well, you should see a React Native app being started in your iOS simulator that retrieves the version of the Solana Devnet.

## Common issues when using @solana/web3.js in a React Native app

### Error: While trying to resolve module superstruct from file

> error: Error: While trying to resolve module superstruct from file .../SolanaReactNative/node_modules/@solana/web3.js/lib/index.browser.cjs.js, the package .../SolanaReactNative/node_modules/superstruct/package.json was successfully found. However, this package itself specifies a main module field that could not be resolved (.../SolanaReactNative/node_modules/superstruct/lib/index.cjs.

This is an issue because `metro`, the React Native bundler, does not support the `cjs` extension by default. There is an [open issue here](https://github.com/facebook/metro/issues/535).

You can fix this by updating `metro.config.js` and add `cjs` to the `resolver.sourceExts` array, as shown above.

### Error: URL.protocol is not implemented

    ERROR Error: URL.protocol is not implemented 
    ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native. 

This is an issue that can be fixed by using a polyfill for the `URL` object in React Native.

Install the package `react-native-url-polyfill` and import it in the main file of your app (eg: `index.js`), as shown above.

### Error: crypto.getRandomValues() not supported

    Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported


This is an issue that can be fixed by using a polyfill for the `crypto` object in React Native.

Install the package `react-native-get-random-values` and import it in the main file of your app (eg: `index.js`), as shown above.
