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

# React Native at Solana

Ang React Native ay isang open-source na UI software framework na ginagamit upang bumuo ng mga mobile, web at desktop application sa pamamagitan ng pagpapagana sa mga developer na gamitin ang React framework kasama ng mga native na kakayahan ng platform. Pinapatakbo ng Solana SDK, isa itong mahusay na platform para mabilis na makabuo ng mga gumaganap na native na Crypto app.

Ang pinakamabilis na paraan upang magsimula sa React Native at Solana ay sa pamamagitan ng paggamit sa [Solana DApp Scaffold para sa React Native](#solana-dapp-scaffold-for-react-native).

## Paano gamitin ang @solana/web3.js sa isang React Native app

Sa tutorial na ito matututunan mo kung paano gumawa ng bagong React Native app at i-install at i-configure ang `@solana/web3.js` SDK, at ang mga dependency nito.

Kung mayroon ka nang umiiral na app, lumaktaw sa [pag-install ng mga dependencies](#install-dependencies).

### Gumawa ng bagong app

Magsisimula kami ng bagong React Native application na gumagamit ng TypeScript, pagkatapos ay `cd` sa direktoryo ng proyekto, kung saan isasagawa namin ang iba pang mga command.

```shell
npx react-native@0.70.0 init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### Mag-install ng mga dependency

Susunod, i-install namin ang mga dependencies. Ang Solana JavaScript SDK, isang package para i-patch ang React Native build system (Metro), isang secure na random number generator, at isang fix para i-patch ang nawawalang `URL` class ng React Native.

```shell
yarn add \
  @solana/web3.js \
  react-native-get-random-values \
  react-native-url-polyfill
```

### Patch Babel para gamitin ang Hermes transforms

Simula Agosto 2022, ang template kung saan ginawa ang mga bagong React Native na app ay nagbibigay-daan sa Hermes JavaScript engine bilang default ngunit hindi ang Hermes code ay nag-transform. Paganahin ang mga ito sa pamamagitan ng paggawa ng sumusunod na pagbabago sa `babel.config.js`:

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

### I-update ang `index.js`

Upang i-load ang mga polyfill, binubuksan namin ang file na `index.js` sa ugat ng proyekto at idagdag ang sumusunod na dalawang linya sa tuktok ng file:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

### I-update ang `App.tsx`

Magdagdag tayo ng halimbawa ng web3.js sa aming app!

Buksan ang file na `App.tsx` at idagdag ang sumusunod na code sa loob ng function na `App`:

Sa halimbawang ito, nag-set up kami ng koneksyon sa Solana Devnet at kapag nag-load ang mga bahagi, nakukuha namin ang bersyon ng cluster kung saan kami nakakonekta at iniimbak ang bersyon sa estado ng bahagi.

Bukod pa rito, ipinapakita ng halimbawang ito kung paano bumuo at mag-imbak ng keypair.

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

Panghuli, sa template (o `render function`) idagdag ang sumusunod na markup:


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

Upang ang aming mga polyfill ay ma-autolink sa iOS, kailangan nating i-install ang `cocoapods`.

```shell
cd ios && pod install
```

### Simulan ang application

Kapag natapos na namin ang lahat ng nasa itaas, maaari na nating simulan ang aming application sa Android o iOS simulator.

```shell
yarn android
yarn ios
```

Kung naging maayos ang lahat, dapat mong makita ang isang React Native app na sinisimulan sa iyong simulator na kumukuha ng bersyon ng Solana Devnet.

## Solana DApp Scaffold para sa React Native

Kung gusto mong magtagumpay, maaari mong i-download ang [Solana DApp Scaffold para sa React Native](https://github.com/solana-developers/dapp-scaffold-react-native).


## Mga karaniwang isyu kapag gumagamit ng mga crypto library sa isang React Native app

### Error: `Nabigo ang pag-crawl ng watchman`

Ang bahagi ng build system na nagbabantay sa iyong file system para sa mga pagbabago ay tinatawag na Watchman. Ang ilang partikular na bersyon ng Mac OS [refuse](https://github.com/facebook/watchman/issues/751) upang bigyan ng pahintulot ang Watchman na manood ng ilang partikular na direktoryo, gaya ng `~/Documents/` at `~/Desktop/`.

Malalaman mong mayroon kang problemang ito kung ang Metro bundler ay gumawa ng [isang error](https://gist.github.com/steveluscher/d0ae13225b57bc59dc0eac871509dcd7) na naglalaman ng mga salitang &ldquo;Watchman crawl failed.&rdquo;

Upang malutas ito, ilipat ang iyong proyekto sa React Native sa ugat ng iyong direktoryo ng user.

### Error: Hindi ipinatupad ang URL.protocol

```shell
ERROR Error: URL.protocol is not implemented
ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native.
```

Isa itong isyu na maaaring ayusin sa pamamagitan ng paggamit ng polyfill para sa object na `URL` sa React Native.

I-install ang package na `react-native-url-polyfill` at i-import ito sa pangunahing file ng iyong app (hal: `index.js`), tulad ng ipinapakita sa itaas.

### Error: hindi suportado ang crypto.getRandomValues().

```shell
Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
```

Isa itong isyu na maaaring ayusin sa pamamagitan ng paggamit ng polyfill para sa object na `crypto` sa React Native.

I-install ang package na `react-native-get-random-values` at i-import ito sa pangunahing file ng iyong app (hal: `index.js`), tulad ng ipinapakita sa itaas.