---
title: React Native
head:
- - meta
- name: title
  content: Solana Cookbook | Using React Native with Solana
- - meta
- name: og:title
  content: Solana Cookbook | Using React Native with Solana
- - meta
- name: description
  content: In this tutorial, you learn how to use Solana in your React Native apps.
- - meta
- name: og:description
  content: In this tutorial, you learn how to use Solana in your React Native apps.
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

# React Native and Solana

React Native is an open-source UI software framework used to develop mobile, web and desktop applications by enabling developers to use the React framework along with native platform capabilities. Powered with the Solana SDK, this is a great platform to quickly build performant native Crypto apps.

The fastest way to start with React Native and Solana is by using the [Solana DApp Scaffold for React Native](#solana-dapp-scaffold-for-react-native). 

## How to use @solana/web3.js in a React Native app

In this tutorial you will learn how to create a new React Native app and install and configure the `@solana/web3.js` SDK, and its dependencies. 

If you already have an existing app, skip to [installing the dependencies](#install-dependencies).

### Create a new app

We start a new React Native application that uses TypeScript, then `cd` into the project directory, where we will execute the rest of the commands.

```shell
npx react-native@0.70.0 init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### Install dependencies

Next, we install the dependencies. The Solana JavaScript SDK, a package to patch the React Native build system (Metro), a secure random number generator, and a fix to patch React Native's missing `URL` class.

```shell
yarn add \
  @solana/web3.js \
  metro-config \
  react-native-get-random-values \
  react-native-url-polyfill
```

### Patch Babel to use the Hermes transforms

As of August 2022 the template from which new React Native apps are made enables the Hermes JavaScript engine by default but not the Hermes code transforms. Enable them by making the following change to `babel.config.js`:

```diff
  module.exports = {
-   presets: ['module:metro-react-native-babel-preset'],
+   presets: [
+     [
+       'module:metro-react-native-babel-preset',
+       {unstable_transformProfile: 'hermes-stable'},
+     ],
+   ],
};
```

### Update `index.js`

To load the polyfills, we open the file `index.js` in the root of the project and add the following two lines to the top of the file:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

### Update `App.tsx`

Let's add a web3.js example into our app!

Open the file `App.tsx` and add the following code inside the `App` function:

In this example, we set up a connection to Solana Devnet and when the components load, we get the version of the cluster we connected to and store the version in the component state.

Additionally, this example shows how to generate and store a keypair.

```typescript
const [keypair, setKeypair] = useState<Keypair>(() => Keypair.generate());
const randomKeypair = () => {
  setKeypair(() => Keypair.generate());
};

const [version, setVersion] = useState<any>('');
useEffect(() => {
  const conn = new Connection(clusterApiUrl('devnet'));
  conn.getVersion().then(r => {
    setVersion(r);
  });
}, []);
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

### [iOS only] Install cocoapods

In order for our polyfills to be autolinked on iOS, we need to install the `cocoapods`.

```shell
cd ios && pod install
```

### Start application 

Once we finished all the above, we can start our application in the Android or iOS simulator.

```shell
yarn android
yarn ios
```

If all went well, you should see a React Native app being started in your simulator that retrieves the version of the Solana Devnet.

## Solana DApp Scaffold for React Native

If you want to hit the ground running, you can download the [Solana DApp Scaffold for React Native](https://github.com/solana-developers/dapp-scaffold-react-native).


## Common issues when using crypto libraries in a React Native app

### Error: `Watchman crawl failed`

The part of the build system that watches your file system for changes is called Watchman. Certain versions of Mac OS [refuse](https://github.com/facebook/watchman/issues/751) to grant Watchman  permission to watch certain directories, such as `~/Documents/` and `~/Desktop/`.

You'll know you have this problem if the Metro bundler produces [an error](https://gist.github.com/steveluscher/d0ae13225b57bc59dc0eac871509dcd7) containing the words &ldquo;Watchman crawl failed.&rdquo;

To solve this, move your React Native project to the root of your user directory.

### Error: URL.protocol is not implemented

```shell
ERROR Error: URL.protocol is not implemented
ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native.
```

This is an issue that can be fixed by using a polyfill for the `URL` object in React Native.

Install the package `react-native-url-polyfill` and import it in the main file of your app (eg: `index.js`), as shown above.

### Error: crypto.getRandomValues() not supported

```shell
Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
```

This is an issue that can be fixed by using a polyfill for the `crypto` object in React Native.

Install the package `react-native-get-random-values` and import it in the main file of your app (eg: `index.js`), as shown above.
