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

# React NativeとSolana

React Nativeは、開発者がネイティブプラットフォーム機能と共にReactフレームワークを使用できるようにすることで、モバイル、Web、およびデスクトップアプリケーションの開発に使用されるオープンソースのUIソフトウェア フレームワークです。Solana SDKを搭載したこれは、パフォーマンスの高いネイティブCryptoアプリをすばやく構築するための優れたプラットフォームです。

React NativeとSolanaを開始する最も速い方法は、[Solana DApp Scaffold for React Native](#solana-dapp-scaffold-for-react-native)を使用することです。

## React Nativeアプリで@solana/web3.jsを使用する方法

このチュートリアルでは、新しいReact Nativeアプリを作成し、`@solana/web3.js`SDKとその依存関係をインストールして構成する方法を学習します。

既存のアプリが既にある場合は、[依存関係のインストール](#install-dependencies)に進みます。

### 新しいアプリを作成する

TypeScriptを使用する新しいReact Nativeアプリケーションを開始し、プロジェクト ディレクトリに`cd`して、残りのコマンドを実行します。

```shell
npx react-native@0.70.0 init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### 依存関係をインストールする

次に、依存関係をインストールします。Solana JavaScript SDK、React Nativeのビルドシステム（Metro）にパッチを当てるパッケージ、安全な乱数生成器、React Nativeの`URL`クラスの欠落にパッチを当てる修正プログラムです。

```shell
yarn add \
  @solana/web3.js \
  react-native-get-random-values \
  react-native-url-polyfill
```

### Hermes変換を使用するようにBabelにパッチを適用する

2022 年 8 月の時点で、新しい React Native アプリが作成されるテンプレートは、デフォルトで Hermes JavaScript エンジンを有効にしますが、Hermes コード変換は有効にしません。`babel.config.js`に次の変更を加えて有効にします:

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

ポリフィルをロードするには、プロジェクトのルートにある`index.js`ファイルを開き、ファイルの先頭に次の2行を追加します:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

### Update `App.tsx`

アプリに web3.js の例を追加しましょう！

ファイル`App.tsx`を開き、`App`関数内に次のコードを追加します:

この例では、Solana Devnetへの接続をセットアップし、コンポーネントがロードされると、接続先のクラスターのバージョンを取得し、そのバージョンをコンポーネントのStateに保存します。

さらにこの例は、キーペアを生成して保存する方法を示しています。

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

最後に、テンプレート(または`レンダリング関数`)に次のマークアップを追加します:


```tsx
{version ? (
  <Section title="Version">{JSON.stringify(version, null, 2)}</Section>
) : null}
{keypair ? (
  <Section title="Keypair">{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Section>
) : null}
<Button title="New Keypair" onPress={randomKeypair} />
```

### [iOS のみ]cocoapodsをインストールする

ポリフィルをiOSで自動リンクするには、`cocoapods`をインストールする必要があります。

```shell
cd ios && pod install
```

### アプリケーションを開始

上記のすべてが完了したら、AndroidまたはiOSシミュレーターでアプリケーションを開始できます。

```shell
yarn android
yarn ios
```

上記のすべてが完了したら、AndroidまたはiOSシミュレーターでアプリケーションを開始できます。

## React Native用Solana DAppスキャフォールド

すぐに実行したい場合は、[Solana DApp Scaffold for React Native](https://github.com/solana-developers/dapp-scaffold-react-native)をダウンロードできます。


## React Nativeアプリで暗号化ライブラリを使用する際の一般的な問題

### Error: `Watchman crawl failed`

ファイルシステムの変更を監視するビルドシステムの部分は、Watchmanと呼ばれます。特定のバージョンのMac OSは、`~/Documents/`や`~/Desktop/`などの特定のディレクトリを監視するWatchmanの許可を与えることを[拒否](https://github.com/facebook/watchman/issues/751)しています。
Metro バンドラーが&ldquo;Watchman crawl failed&rdquo;という単語を含む[エラー](https://gist.github.com/steveluscher/d0ae13225b57bc59dc0eac871509dcd7)を生成した場合、この問題があることがわかります。

これを解決するには、React Nativeプロジェクトをユーザーディレクトリのルートに移動します。

### Error: URL.protocol is not implemented

```shell
ERROR Error: URL.protocol is not implemented
ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native.
```

これは、React Nativeの`URL`オブジェクトにポリフィルを使用することで解決できる問題です。

上記のように、パッケージ`react-native-url-polyfill`をインストールし、アプリのメインファイル(例: `index.js`)にインポートします。

### Error: crypto.getRandomValues() not supported

```shell
Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
```

これは、React Nativeの`crypto`オブジェクトにポリフィルを使用することで修正できる問題です。
上記のように、パッケージ`react-native-get-random-values`をインストールし、アプリのメインファイル(例: `index.js`)にインポートします。
