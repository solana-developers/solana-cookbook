---
title: React Native
head:
  - - meta
    - name: title
      content: Livro de Receitas da Solana - Solana Cookbook | Usando a biblioteca React Native com a Solana
  - - meta
    - name: og:title
      content: Livro de Receitas da Solana - Solana Cookbook | Usando a biblioteca React Native com a Solana
  - - meta
    - name: description
      content: Neste tutorial, você aprenderá como usar a Solana em seus aplicativos React Native.
  - - meta
    - name: og:description
      content: Neste tutorial, você aprenderá como usar a Solana em seus aplicativos React Native.
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

# React Native e Solana

O React Native é um framework de software de interface do usuário (IU) de código aberto usado para desenvolver aplicativos móveis, web e desktop, permitindo que os desenvolvedores usem o framework React juntamente com as capacidades nativas da plataforma. Com o SDK da Solana, esta é uma ótima plataforma para construir rapidamente aplicativos nativos performáticos de criptografia.

A maneira mais rápida de começar com o React Native e a Solana é usando o [Scaffold para DApps da Solana](#solana-dapp-scaffold-for-react-native) para React Native.

## Como usar @solana/web3.js em um aplicativo React Native

Neste tutorial, você aprenderá como criar um novo aplicativo React Native, instalar e configurar o SDK `@solana/web3.js` e suas dependências.

Se você já tem um aplicativo existente, pule para a [instalação das dependências](#install-dependencies).

### Criando um novo aplicativo

Começamos com um novo aplicativo React Native que usa TypeScript e, em seguida, damos `cd` no diretório do projeto, onde executaremos o restante dos comandos.

```shell
npx react-native@0.70.0 init SolanaReactNative --template react-native-template-typescript
cd SolanaReactNative
```

### Instale as dependências

Em seguida, instalamos as dependências. O SDK JavaScript da Solana, um pacote para ajustar o sistema de compilação do React Native (Metro), um gerador de números aleatórios seguros e uma correção para ajustar a classe `URL` ausente do React Native.

```shell
yarn add \
  @solana/web3.js \
  react-native-get-random-values \
  react-native-url-polyfill
```

### Ajustar o Babel para usar as transformações do Hermes.

A partir de agosto de 2022, o modelo a partir do qual novos aplicativos React Native são feitos habilita o mecanismo JavaScript do Hermes por padrão, mas não habilita as transformações de código do Hermes. Habilite-as fazendo a seguinte alteração no arquivo `babel.config.js`:

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

### Atualizando o `index.js`

Para carregar os polyfills, abrimos o arquivo `index.js` na raiz do projeto e adicionamos as seguintes duas linhas no topo do arquivo:

```javascript
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
```

### Atualizando o `App.tsx`

Vamos adicionar um exemplo com `web3.js` em nosso aplicativo!

Abra o arquivo `App.tsx` e adicione o seguinte código dentro da função `App`:

Neste exemplo, configuramos uma conexão com a Devnet da Solana e, quando os componentes são carregados, obtemos a versão do cluster ao qual nos conectamos e armazenamos a versão no estado do componente.

Além disso, este exemplo mostra como gerar e armazenar um par de chaves (keypair).

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

Por fim, no modelo (ou na função de renderização), adicione a seguinte marcação:

```tsx
{version ? (
  <Section title="Version">{JSON.stringify(version, null, 2)}</Section>
) : null}
{keypair ? (
  <Section title="Keypair">{JSON.stringify(keypair?.publicKey?.toBase58(), null, 2)}</Section>
) : null}
<Button title="New Keypair" onPress={randomKeypair} />
```

### [iOS apenas] Instale o cocoapods

Para que nossos polyfills sejam autovinculados no iOS, precisamos instalar o `cocoapods`.

```shell
cd ios && pod install
```

### Inicie o aplicativo 

Assim que concluirmos todos os passos acima, podemos iniciar nosso aplicativo no simulador Android ou iOS.

```shell
yarn android
yarn ios
```

Se tudo correu bem, você deverá ver um aplicativo React Native sendo iniciado em seu simulador que recupera a versão da Devnet da Solana.

## Scaffold de DApp da Solana para React Native

Se você quiser começar rapidamente, pode baixar o [Scaffold de DApp da Solana para React Native](https://github.com/solana-developers/dapp-scaffold-react-native).

## Problemas comuns ao usar bibliotecas de criptografia em um aplicativo React Native

### Erro: `Watchman crawl failed`

A parte do sistema de compilação que monitora seu sistema de arquivos em busca de alterações é chamada de Watchman. Certas versões do Mac OS se [recusam](https://github.com/facebook/watchman/issues/751) a conceder permissão ao Watchman para monitorar determinados diretórios, como `~/Documents/` e `~/Desktop/`.

Você saberá que tem esse problema se o bundler Metro produzir [um erro](https://gist.github.com/steveluscher/d0ae13225b57bc59dc0eac871509dcd7) contendo as palavras `Watchman crawl failed`.

Para resolver isso, mova seu projeto React Native para a raiz do diretório do usuário.

### Erro: URL.protocol não está implementado

```shell
ERROR Error: URL.protocol is not implemented
ERROR Invariant Violation: Module AppRegistry is not a registered callable module (calling runApplication). A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native.
```

Este é um problema que pode ser resolvido usando um polyfill para o objeto `URL` no React Native.

Para corrigir, você pode instalar o pacote `react-native-url-polyfill` e importá-lo no arquivo principal do seu aplicativo (por exemplo, `index.js`), conforme mostrado acima.

### Erro: crypto.getRandomValues() não é suportado

```shell
Error: crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
```

Esse é um problema que pode ser resolvido usando um polyfill para o objeto `crypto` no React Native.

Instale o pacote `react-native-get-random-values` e importe-o no arquivo principal do seu aplicativo (por exemplo, `index.js`), conforme mostrado acima.
