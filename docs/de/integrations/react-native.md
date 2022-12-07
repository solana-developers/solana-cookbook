---
title: React Native
head:
  - - meta
    - name: title
      content: Solana Kochbuch | Verwendung von React Native mit Solana
  - - meta
    - name: og:title
      content: Solana Kochbuch | Verwendung von React Native mit Solana
  - - meta
    - name: description
      content: In diesem Tutorial erfahren Sie, wie Sie Solana in Ihren React Native-Apps verwenden.
  - - meta
    - name: og:description
      content: In diesem Tutorial erfahren Sie, wie Sie Solana in Ihren React Native-Apps verwenden.

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

# React Native und Solana

React Native ist ein Open-Source-UI-Software-Framework, das zur Entwicklung von Mobil-, Web- und Desktop-Anwendungen verwendet wird, indem es Entwicklern ermöglicht, das React-Framework zusammen mit nativen Plattformfunktionen zu verwenden. Mit dem Solana SDK ausgestattet, ist dies eine großartige Plattform, um schnell leistungsstarke native Crypto-Apps zu erstellen.

Der schnellste Weg, um mit React Native und Solana zu beginnen, ist die Verwendung des [Solana DApp Scaffold for React Native](#solana-dapp-scaffold-for-react-native).

## How to use @solana/web3.js in a React Native app

In diesem Tutorial erfahren Sie, wie Sie eine neue React Native-App erstellen und das SDK „@solana/web3.js“ und seine Abhängigkeiten installieren und konfigurieren.

Wenn Sie bereits über eine vorhandene App verfügen, fahren Sie mit [Installation der Abhängigkeiten](#install-dependencies) fort.

### Erstellen Sie eine neue Anwendung

Wir starten eine neue React Native-Anwendung, die TypeScript verwendet, dann `cd` in das Projektverzeichnis, wo wir den Rest der Befehle ausführen werden.

```shell
npx react-native@0.70.0 init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### Abhängigkeiten installieren

Als nächstes installieren wir die Abhängigkeiten. Das Solana JavaScript SDK, ein Paket zum Patchen des React Native Build-Systems (Metro), ein sicherer Zufallszahlengenerator und ein Fix zum Patchen der fehlenden „URL“-Klasse von React Native.

```shell
yarn add \
  @solana/web3.js \
  react-native-get-random-values \
  react-native-url-polyfill
```

### Patchen Sie Babel, um die Hermes-Transformationen zu verwenden

Ab August 2022 aktiviert die Vorlage, aus der neue React Native-Apps erstellt werden, standardmäßig die Hermes-JavaScript-Engine, aber nicht die Hermes-Codetransformationen. Aktivieren Sie sie, indem Sie die folgende Änderung an `babel.config.js` vornehmen:

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

### Aktualisieren Sie „index.js“

Um die Polyfills zu laden, öffnen wir die Datei „index.js“ im Stammverzeichnis des Projekts und fügen am Anfang der Datei die folgenden zwei Zeilen hinzu:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

### Aktualisieren Sie „App.tsx“

Fügen wir unserer App ein web3.js-Beispiel hinzu!

Öffnen Sie die Datei „App.tsx“ und fügen Sie den folgenden Code in die „App“-Funktion ein:

In diesem Beispiel richten wir eine Verbindung zu Solana Devnet ein und wenn die Komponenten geladen werden, erhalten wir die Version des Clusters, mit dem wir verbunden sind, und speichern die Version im Komponentenstatus.

Außerdem zeigt dieses Beispiel, wie ein Schlüsselpaar generiert und gespeichert wird.

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

Zuletzt fügen Sie in der Vorlage (oder "Render-Funktion") das folgende Markup hinzu:


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

Damit unsere Polyfills unter iOS automatisch verknüpft werden können, müssen wir die „Cocoapods“ installieren.

```shell
cd ios && pod install
```

### Anwendung starten

Sobald wir alle oben genannten Schritte abgeschlossen haben, können wir unsere Anwendung im Android- oder iOS-Simulator starten.

```shell
yarn android
yarn ios
```

Wenn alles gut gelaufen ist, sollte in Ihrem Simulator eine React Native-App gestartet werden, die die Version von Solana Devnet abruft.

## Solana DApp Scaffold für React Native

Wenn Sie sofort durchstarten möchten, können Sie das  [Solana DApp Scaffold for React Native](https://github.com/solana-developers/dapp-scaffold-react-native) herunterladen.


## Häufige Probleme bei der Verwendung von Kryptobibliotheken in einer React Native-App

### Fehler: „Watchman-Crawling fehlgeschlagen“.

Der Teil des Build-Systems, der Ihr Dateisystem auf Änderungen überwacht, heißt Watchman. Bestimmte Versionen von Mac OS [verweigern](https://github.com/facebook/watchman/issues/751) Watchman die Erlaubnis, bestimmte Verzeichnisse wie „~/Documents/“ und „~/Desktop/“ zu beobachten.

Sie wissen, dass Sie dieses Problem haben, wenn der Metro-Bundler [einen Fehler](https://gist.github.com/steveluscher/d0ae13225b57bc59dc0eac871509dcd7) ausgibt, der die Worte &bdquo;Watchman-Crawling fehlgeschlagen.&rdquo;

Um dies zu lösen, verschieben Sie Ihr React Native-Projekt in das Stammverzeichnis Ihres Benutzerverzeichnisses.

### Fehler: URL.protocol ist nicht implementiert

```shell
ERROR Error: URL.protocol is not implemented
ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native.
```

Dies ist ein Problem, das durch die Verwendung eines Polyfill für das „URL“-Objekt in React Native behoben werden kann.

Installieren Sie das Paket `react-native-url-polyfill` und importieren Sie es in die Hauptdatei Ihrer App (zB: `index.js`), wie oben gezeigt.

### Fehler: crypto.getRandomValues() wird nicht unterstützt


```shell
Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
```

Dies ist ein Problem, das durch die Verwendung eines Polyfill für das „Krypto“-Objekt in React Native behoben werden kann.

Installieren Sie das Paket `react-native-get-random-values` und importieren Sie es in die Hauptdatei Ihrer App (zB: `index.js`), wie oben gezeigt.
