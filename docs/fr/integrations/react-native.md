---
title: React Native
head:
  - - meta
    - name: title
      content: Solana Cookbook | Utilisation de React Native avec Solana
  - - meta
    - name: og:title
      content: Solana Cookbook | Utilisation de React Native avec Solana
  - - meta
    - name: description
      content: Dans ce tutoriel, vous apprendrez à utiliser Solana dans vos applications React Native.
  - - meta
    - name: og:description
      content: Dans ce tutoriel, vous apprendrez à utiliser Solana dans vos applications React Native.
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

# React Native et Solana

React Native est un framework UI open-source utilisé pour développer des applications mobiles, web et de bureau permettant aux développeurs d'utiliser le framework React avec les fonctionnalités natives de ces plateformes. Grâce à Solana SDK, il s'agit d'une excellente plateforme pour créer rapidement des applications Crypto natives performantes.

La façon la plus rapide de commencer avec React Native et Solana est d'utiliser le [Solana DApp Scaffold for React Native](#solana-dapp-scaffold-for-react-native). 

## Comment utiliser @solana/web3.js dans une application React Native

Dans ce tutoriel, vous apprendrez à créer une nouvelle application React Native et à installer et configurer le SDK `@solana/web3.js`, ainsi que ses dépendances. 

Si vous avez déjà une application existante, passez directement à l'[installation des dépendances](#install-dependencies).

### Créer une nouvelle application

Nous démarrons une nouvelle application React Native qui utilise TypeScript, puis exécutons la commande `cd` vers le répertoire du projet où nous allons exécuter le reste des commandes.

```shell
npx react-native@0.70.0 init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### Installer les dépendances

Ensuite, nous installons les dépendances. À savoir, le SDK JavaScript de Solana, un paquet pour corriger le système de compilation de React Native (Metro), un générateur de nombres aléatoires sécurisé, et un correctif pour corriger la classe `URL` manquante de React Native.

```shell
yarn add \
  @solana/web3.js \
  react-native-get-random-values \
  react-native-url-polyfill
```

### Corriger Babel pour utiliser les transformations Hermes

Depuis août 2022, le template à partir duquel les nouvelles applications React Native sont réalisées active par défaut le moteur JavaScript Hermes mais pas les transformations de code Hermes. Activez-les en apportant la modification suivante à `babel.config.js` :

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

### Mettre à jour `index.js`

Pour charger les polyfills, nous ouvrons le fichier `index.js` à la racine du projet et ajoutons les deux lignes suivantes au début de celui-ci :

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

### Mettre à jour `App.tsx`

Ajoutons un exemple de web3.js dans notre application !

Ouvrez le fichier `App.tsx` et ajoutez le code suivant à l'intérieur de la fonction `App` :

Dans cet exemple, nous établissons une connexion au Devnet de Solana. Lorsque les composants se chargent, nous récupérons la version du cluster auquel nous nous sommes connectés et la stockons dans l'état du composant.

De plus, cet exemple montre comment générer et stocker une paire de clés.

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

Enfin, dans le modèle (ou `render function`), ajoutez le balisage suivant :


```tsx
{version ? (
  <Section title="Version">{JSON.stringify(version, null, 2)}</Section>
) : null}
{keypair ? (
  <Section title="Keypair">{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Section>
) : null}
<Button title="New Keypair" onPress={randomKeypair} />
```

### [iOS uniquement] Installer cocoapods

Pour que nos polyfills soient autolinkés sur iOS, nous devons installer `cocoapods`.

```shell
cd ios && pod install
```

### Démarrer l'application

Une fois que nous avons terminé tout ce qui précède, nous pouvons démarrer notre application dans le simulateur Android ou iOS.

```shell
yarn android
yarn ios
```

Si tout s'est bien passé, vous devriez voir démarrer dans votre simulateur une application React Native qui récupère la version du Devnet de Solana.

## Solana DApp Scaffold for React Native

Si vous souhaitez vous lancer dans l'aventure, vous pouvez télécharger l'application [Solana DApp Scaffold for React Native](https://github.com/solana-developers/dapp-scaffold-react-native).


## Problèmes courants lors de l'utilisation de bibliothèques crypto dans une application React Native

### Erreur: `Watchman crawl failed`

La partie du système de compilation qui surveille les changements dans votre système de fichiers s'appelle Watchman. Certaines versions de Mac OS [refusent](https://github.com/facebook/watchman/issues/751) d'accorder au Watchman la permission de surveiller certains répertoires, comme `~/Documents/` et `~/Desktop/`.

Vous saurez que vous avez ce problème si le bundler Metro produit [une erreur](https://gist.github.com/steveluscher/d0ae13225b57bc59dc0eac871509dcd7) contenant les mots &ldquo;Watchman crawl failed.&rdquo;

Pour résoudre ce problème, déplacez votre projet React Native à la racine de votre répertoire utilisateur.

### Erreur: URL.protocol is not implemented

```shell
ERROR Error: URL.protocol is not implemented
ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native.
```

Ce problème peut être résolu en utilisant un polyfill pour l'objet `URL` dans React Native.

Installez le paquet `react-native-url-polyfill` et importez-le dans le fichier principal de votre application (ex : `index.js`), comme indiqué ci-dessus.

### Erreur: crypto.getRandomValues() not supported

```shell
Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
```

Ce problème peut être résolu en utilisant un polyfill pour l'objet `crypto` dans React Native.

Installez le paquet `react-native-get-random-values` et importez-le dans le fichier principal de votre application (ex : `index.js`), comme indiqué ci-dessus.
