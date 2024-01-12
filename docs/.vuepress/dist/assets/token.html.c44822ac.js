import{_ as n,e as s}from"./app.55b1b60c.js";const a={},e=s(`<h1 id="interacting-with-tokens-token-lar-ile-etkilesim" tabindex="-1"><a class="header-anchor" href="#interacting-with-tokens-token-lar-ile-etkilesim" aria-hidden="true">#</a> Interacting with Tokens (Token\u2019lar ile Etkile\u015Fim)</h1><h2 id="what-do-i-need-to-get-started-with-spl-tokens-spl-token-lar\u0131-kullanmaya-baslamak-icin-neye-ihtiyac\u0131m\u0131z-var" tabindex="-1"><a class="header-anchor" href="#what-do-i-need-to-get-started-with-spl-tokens-spl-token-lar\u0131-kullanmaya-baslamak-icin-neye-ihtiyac\u0131m\u0131z-var" aria-hidden="true">#</a> What do I need to get started with SPL-Tokens? (SPL Token\u2019lar\u0131 kullanmaya ba\u015Flamak i\xE7in neye ihtiyac\u0131m\u0131z var?)</h2><p>Solana&#39;da Token\u2019larla her etkile\u015Fimde bulundu\u011Funuzda, asl\u0131nda Solana Program Kitapl\u0131\u011F\u0131 Token\u2019\u0131 veya SPL-Token standard\u0131 ile etkile\u015Fime girersiniz. SPL-Token standard\u0131, programlama dilinize g\xF6re a\u015Fa\u011F\u0131da bulabilece\u011Finiz belirli bir kitapl\u0131\u011F\u0131n kullan\u0131lmas\u0131n\u0131 gerektirir.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;@solana/spl-token&quot;: &quot;^0.2.0&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="how-to-create-a-new-token-yeni-bir-token-olusturma" tabindex="-1"><a class="header-anchor" href="#how-to-create-a-new-token-yeni-bir-token-olusturma" aria-hidden="true">#</a> How to create a new Token (Yeni bir Token olu\u015Fturma)</h2><p>Token olu\u015Fturma, &quot;mint account&quot; ad\u0131 verilen account olu\u015Fturularak yap\u0131l\u0131r. Bu mint account daha sonra bir kullan\u0131c\u0131n\u0131n token account&#39;\u0131na token basmak i\xE7in kullan\u0131l\u0131r.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token keyword">let</span> mintPubkey <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">createMint</span><span class="token punctuation">(</span>
  connection<span class="token punctuation">,</span> <span class="token comment">// conneciton</span>
  feePayer<span class="token punctuation">,</span> <span class="token comment">// fee payer</span>
  alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// mint authority</span>
  alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// freeze authority (you can use \`null\` to disable it. when you disable it, you can&#39;t turn it on again)</span>
  <span class="token number">8</span> <span class="token comment">// decimals</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// or</span>

<span class="token comment">// 2) compose by yourself</span>
<span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
  <span class="token comment">// create mint account</span>
  SystemProgram<span class="token punctuation">.</span><span class="token function">createAccount</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    fromPubkey<span class="token operator">:</span> feePayer<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    newAccountPubkey<span class="token operator">:</span> mint<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    space<span class="token operator">:</span> <span class="token constant">MINT_SIZE</span><span class="token punctuation">,</span>
    lamports<span class="token operator">:</span> <span class="token keyword">await</span> <span class="token function">getMinimumBalanceForRentExemptMint</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">,</span>
    programId<span class="token operator">:</span> <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// init mint account</span>
  <span class="token function">createInitializeMintInstruction</span><span class="token punctuation">(</span>
    mint<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// mint pubkey</span>
    <span class="token number">8</span><span class="token punctuation">,</span> <span class="token comment">// decimals</span>
    alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// mint authority</span>
    alice<span class="token punctuation">.</span>publicKey <span class="token comment">// freeze authority (you can use \`null\` to disable it. when you disable it, you can&#39;t turn it on again)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="how-to-get-a-token-mint-token-mint-etme" tabindex="-1"><a class="header-anchor" href="#how-to-get-a-token-mint-token-mint-etme" aria-hidden="true">#</a> How to get a token mint (Token Mint etme)</h2><p>Bir token\u0131n sahip oldu\u011Fu mevcut arz\u0131, yetkiyi veya ondal\u0131k say\u0131lar\u0131 almak i\xE7in token mint\u2019in account bilgilerini alman\u0131z gerekir.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> mintAccount <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getMint</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> mintAccountPublicKey<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="how-to-create-a-token-account-token-account-olusturma" tabindex="-1"><a class="header-anchor" href="#how-to-create-a-token-account-token-account-olusturma" aria-hidden="true">#</a> How to create a token account (Token account olu\u015Fturma)</h2><p>Bir kullan\u0131c\u0131n\u0131n token tutmas\u0131 i\xE7in bir token account&#39;\u0131 gerekir.</p><p>Bir kullan\u0131c\u0131n\u0131n sahip oldu\u011Fu her t\xFCr token i\xE7in en az bir token account&#39;\u0131 olacakt\u0131r.</p><p>\u0130li\u015Fkili Token Hesaplar\u0131(Associated Token Accounts,ATA), her keypair(anahtar \xE7ifti) i\xE7in deterministik olarak olu\u015Fturulmu\u015F account&#39;lard\u0131r. ATA&#39;lar, belirte\xE7 account&#39;lar\u0131n\u0131 y\xF6netmek i\xE7in \xF6nerilen y\xF6ntemdir.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> ata <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">createAssociatedTokenAccount</span><span class="token punctuation">(</span>
    connection<span class="token punctuation">,</span> <span class="token comment">// connection</span>
    feePayer<span class="token punctuation">,</span> <span class="token comment">// fee payer</span>
    mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
    alice<span class="token punctuation">.</span>publicKey <span class="token comment">// owner,</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// or</span>

<span class="token comment">// 2) composed by yourself</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token function">createAssociatedTokenAccountInstruction</span><span class="token punctuation">(</span>
      feePayer<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// payer</span>
      ata<span class="token punctuation">,</span> <span class="token comment">// ata</span>
      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// owner</span>
      mintPubkey <span class="token comment">// mint</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h2 id="how-to-get-a-token-account-token-account-u-getirme" tabindex="-1"><a class="header-anchor" href="#how-to-get-a-token-account-token-account-u-getirme" aria-hidden="true">#</a> How to get a Token Account (Token account\u2019u getirme)</h2><p>Her token account, owner, mint, miktar (bakiye) ve ondal\u0131k say\u0131lar gibi token hakk\u0131nda bilgilere sahiptir.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> tokenAccount <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getAccount</span><span class="token punctuation">(</span>connection<span class="token punctuation">,</span> tokenAccountPubkey<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="how-to-get-a-token-account-s-balance-token-account-bakiyesi-getirme" tabindex="-1"><a class="header-anchor" href="#how-to-get-a-token-account-s-balance-token-account-bakiyesi-getirme" aria-hidden="true">#</a> How to get a token account&#39;s balance (Token account bakiyesi getirme)</h2><p>Token account, tek bir call ile al\u0131nabilen token bakiyesine sahiptir.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> tokenAmount <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">getTokenAccountBalance</span><span class="token punctuation">(</span>tokenAccount<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>::: \u0130PUCU</p><p>Bir token account yaln\u0131zca bir t\xFCr mint tutabilir. Bir token account belirtti\u011Finizde, bir mint de belirtmi\u015F olursunuz. :::</p><h2 id="how-to-mint-tokens-token-mint-leme" tabindex="-1"><a class="header-anchor" href="#how-to-mint-tokens-token-mint-leme" aria-hidden="true">#</a> How to mint tokens (Token mint\u2019leme)</h2><p>Token mint\u2019ledi\u011Finizde (bast\u0131\u011F\u0131n\u0131zda), arz\u0131 art\u0131r\u0131r ve yeni tokenlar\u0131 belirli bir token account&#39;\u0131na aktar\u0131rs\u0131n\u0131z.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> txhash <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">mintToChecked</span><span class="token punctuation">(</span>
    connection<span class="token punctuation">,</span> <span class="token comment">// connection</span>
    feePayer<span class="token punctuation">,</span> <span class="token comment">// fee payer</span>
    mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
    tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// receiver (should be a token account)</span>
    alice<span class="token punctuation">,</span> <span class="token comment">// mint authority</span>
    <span class="token number">1e8</span><span class="token punctuation">,</span> <span class="token comment">// amount. if your decimals is 8, you mint 10^8 for 1 token.</span>
    <span class="token number">8</span> <span class="token comment">// decimals</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// or</span>

<span class="token comment">// 2) compose by yourself</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token function">createMintToCheckedInstruction</span><span class="token punctuation">(</span>
      mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
      tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// receiver (should be a token account)</span>
      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// mint authority</span>
      <span class="token number">1e8</span><span class="token punctuation">,</span> <span class="token comment">// amount. if your decimals is 8, you mint 10^8 for 1 token.</span>
      <span class="token number">8</span> <span class="token comment">// decimals</span>
      <span class="token comment">// [signer1, signer2 ...], // only multisig account will use</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="how-to-transfer-tokens-token-transfer-etme" tabindex="-1"><a class="header-anchor" href="#how-to-transfer-tokens-token-transfer-etme" aria-hidden="true">#</a> How to transfer tokens (Token transfer etme)</h2><p>Tokenlar\u0131 bir token account&#39;\u0131ndan ba\u015Fka bir token account&#39;\u0131na aktarabilirsiniz.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> txhash <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">transferChecked</span><span class="token punctuation">(</span>
    connection<span class="token punctuation">,</span> <span class="token comment">// connection</span>
    feePayer<span class="token punctuation">,</span> <span class="token comment">// payer</span>
    tokenAccountXPubkey<span class="token punctuation">,</span> <span class="token comment">// from (should be a token account)</span>
    mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
    tokenAccountYPubkey<span class="token punctuation">,</span> <span class="token comment">// to (should be a token account)</span>
    alice<span class="token punctuation">,</span> <span class="token comment">// from&#39;s owner</span>
    <span class="token number">1e8</span><span class="token punctuation">,</span> <span class="token comment">// amount, if your deciamls is 8, send 10^8 for 1 token</span>
    <span class="token number">8</span> <span class="token comment">// decimals</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// or</span>

<span class="token comment">// 2) compose by yourself</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token function">createTransferCheckedInstruction</span><span class="token punctuation">(</span>
      tokenAccountXPubkey<span class="token punctuation">,</span> <span class="token comment">// from (should be a token account)</span>
      mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
      tokenAccountYPubkey<span class="token punctuation">,</span> <span class="token comment">// to (should be a token account)</span>
      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// from&#39;s owner</span>
      <span class="token number">1e8</span><span class="token punctuation">,</span> <span class="token comment">// amount, if your deciamls is 8, send 10^8 for 1 token</span>
      <span class="token number">8</span> <span class="token comment">// decimals</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="how-to-burn-tokens-token-yakma-burn" tabindex="-1"><a class="header-anchor" href="#how-to-burn-tokens-token-yakma-burn" aria-hidden="true">#</a> How to burn tokens (Token yakma(burn))</h2><p>Token sahibiyseniz token\u0131 yakabilirsiniz.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> txhash <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">burnChecked</span><span class="token punctuation">(</span>
    connection<span class="token punctuation">,</span> <span class="token comment">// connection</span>
    feePayer<span class="token punctuation">,</span> <span class="token comment">// payer</span>
    tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// token account</span>
    mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
    alice<span class="token punctuation">,</span> <span class="token comment">// owner</span>
    <span class="token number">1e8</span><span class="token punctuation">,</span> <span class="token comment">// amount, if your deciamls is 8, 10^8 for 1 token</span>
    <span class="token number">8</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// or</span>

<span class="token comment">// 2) compose by yourself</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token function">createBurnCheckedInstruction</span><span class="token punctuation">(</span>
      tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// token account</span>
      mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// owner of token account</span>
      <span class="token number">1e8</span><span class="token punctuation">,</span> <span class="token comment">// amount, if your deciamls is 8, 10^8 for 1 token</span>
      <span class="token number">8</span> <span class="token comment">// decimals</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h2 id="how-to-close-token-accounts-token-account-lar\u0131n\u0131-kapatma" tabindex="-1"><a class="header-anchor" href="#how-to-close-token-accounts-token-account-lar\u0131n\u0131-kapatma" aria-hidden="true">#</a> How to close token accounts (Token account\u2019lar\u0131n\u0131 kapatma)</h2><p>Art\u0131k kullanmak istemiyorsan\u0131z bir token account&#39;\u0131n\u0131 kapatabilirsiniz. \u0130ki durum vard\u0131r:</p><ol><li>Wrapped SOL - Kapan\u0131\u015F, Wrapped SOL&#39;yi SOL&#39;e d\xF6n\xFC\u015Ft\xFCr\xFCr.</li><li>Di\u011Fer Tokenlar - Sadece token account&#39;\u0131n\u0131n bakiyesi 0 ise kapatabilirsiniz.</li></ol><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> txhash <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">closeAccount</span><span class="token punctuation">(</span>
    connection<span class="token punctuation">,</span> <span class="token comment">// connection</span>
    feePayer<span class="token punctuation">,</span> <span class="token comment">// payer</span>
    tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// token account which you want to close</span>
    alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// destination</span>
    alice <span class="token comment">// owner of token account</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// or</span>

<span class="token comment">// 2) compose by yourself</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token function">createCloseAccountInstruction</span><span class="token punctuation">(</span>
      tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// token account which you want to close</span>
      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// destination</span>
      alice<span class="token punctuation">.</span>publicKey <span class="token comment">// owner of token account</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="how-to-set-authority-on-token-accounts-or-mints-token-hesaplar\u0131nda-ve-mint-lerinde-yetki-belirleme" tabindex="-1"><a class="header-anchor" href="#how-to-set-authority-on-token-accounts-or-mints-token-hesaplar\u0131nda-ve-mint-lerinde-yetki-belirleme" aria-hidden="true">#</a> How to set authority on token accounts or mints (Token hesaplar\u0131nda ve mint\u2019lerinde yetki belirleme)</h2><p>Yetki ayarlayabilir/g\xFCncelleyebilirsiniz. 4 tip vard\u0131r:</p><ol><li>MintTokens (mint account)</li><li>FreezeAccount (mint account)</li><li>AccountOwner (token account)</li><li>CloseAccount (token account)</li></ol><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> txhash <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">setAuthority</span><span class="token punctuation">(</span>
    connection<span class="token punctuation">,</span> <span class="token comment">// connection</span>
    feePayer<span class="token punctuation">,</span> <span class="token comment">// payer</span>
    mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint account || token account</span>
    alice<span class="token punctuation">,</span> <span class="token comment">// current authority</span>
    AuthorityType<span class="token punctuation">.</span>MintTokens<span class="token punctuation">,</span> <span class="token comment">// authority type</span>
    <span class="token class-name">randomGuy</span><span class="token punctuation">.</span>publicKey <span class="token comment">// new authority (you can pass \`null\` to close it)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// or</span>

<span class="token comment">// 2) compose by yourself</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token function">createSetAuthorityInstruction</span><span class="token punctuation">(</span>
      mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint acocunt || token account</span>
      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// current auth</span>
      AuthorityType<span class="token punctuation">.</span>MintTokens<span class="token punctuation">,</span> <span class="token comment">// authority type</span>
      <span class="token class-name">randomGuy</span><span class="token punctuation">.</span>publicKey <span class="token comment">// new auth (you can pass \`null\` to close it)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="how-to-approve-a-token-delegate-token-delegate-onaylama" tabindex="-1"><a class="header-anchor" href="#how-to-approve-a-token-delegate-token-delegate-onaylama" aria-hidden="true">#</a> How to approve a token delegate (Token delegate onaylama)</h2><p>\u0130zin verilen bir miktarla bir temsilci (delegate) ayarlayabilirsiniz. Ayarlad\u0131ktan sonra, temsilci, token account&#39;\u0131n\u0131z\u0131n ba\u015Fka bir sahibi gibidir. <code>Bir token account ayn\u0131 anda yaln\u0131zca bir account&#39;a yetki verebilir</code>.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> txhash <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">approveChecked</span><span class="token punctuation">(</span>
    connection<span class="token punctuation">,</span> <span class="token comment">// connection</span>
    feePayer<span class="token punctuation">,</span> <span class="token comment">// fee payer</span>
    mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
    tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// token account</span>
    randomGuy<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// delegate</span>
    alice<span class="token punctuation">,</span> <span class="token comment">// owner of token account</span>
    <span class="token number">1e8</span><span class="token punctuation">,</span> <span class="token comment">// amount, if your deciamls is 8, 10^8 for 1 token</span>
    <span class="token number">8</span> <span class="token comment">// decimals</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// or</span>

<span class="token comment">// 2) compose by yourself</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token function">createApproveCheckedInstruction</span><span class="token punctuation">(</span>
      tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// token account</span>
      mintPubkey<span class="token punctuation">,</span> <span class="token comment">// mint</span>
      randomGuy<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// delegate</span>
      alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> <span class="token comment">// owner of token account</span>
      <span class="token number">1e8</span><span class="token punctuation">,</span> <span class="token comment">// amount, if your deciamls is 8, 10^8 for 1 token</span>
      <span class="token number">8</span> <span class="token comment">// decimals</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="how-to-revoke-a-token-delegate-token-delegate-iptal-etme" tabindex="-1"><a class="header-anchor" href="#how-to-revoke-a-token-delegate-token-delegate-iptal-etme" aria-hidden="true">#</a> How to revoke a token delegate (Token delegate iptal etme)</h2><p>\u0130ptal etme, temsilciyi (delegate) null olarak ayarlar ve devredilen tutar\u0131 0 olarak ayarlar.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token comment">// 1) use build-in function</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> txhash <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">revoke</span><span class="token punctuation">(</span>
    connection<span class="token punctuation">,</span> <span class="token comment">// connection</span>
    feePayer<span class="token punctuation">,</span> <span class="token comment">// payer</span>
    tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// token account</span>
    alice <span class="token comment">// owner of token account</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// or</span>

<span class="token comment">// 2) compose by yourself</span>
<span class="token punctuation">{</span>
  <span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
    <span class="token function">createRevokeInstruction</span><span class="token punctuation">(</span>
      tokenAccountPubkey<span class="token punctuation">,</span> <span class="token comment">// token account</span>
      alice<span class="token punctuation">.</span>publicKey <span class="token comment">// owner of token account</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="how-to-manage-wrapped-sol-wrapped-sol-yonetimi" tabindex="-1"><a class="header-anchor" href="#how-to-manage-wrapped-sol-wrapped-sol-yonetimi" aria-hidden="true">#</a> How to manage wrapped SOL (Wrapped SOL y\xF6netimi)</h2><p>Wrapped SOL di\u011Fer t\xFCm token mint\u2019ler gibidir. Aradaki fark, <code>syncNative kullanmak ve \xF6zellikle </code>NATIVE_MINT\` adresinde belirte\xE7 account&#39;lar\u0131 olu\u015Fturmakt\u0131r.</p><h3 id="create-token-account-token-account-olusturma" tabindex="-1"><a class="header-anchor" href="#create-token-account-token-account-olusturma" aria-hidden="true">#</a> Create Token Account (Token Account Olu\u015Fturma)</h3><p><a href="#create-token-account">Token Hesab\u0131 Olu\u015Ftur</a>\u2019maya \xE7ok benzer \u015Fekilde ilerliyoruz ve mint&#39;i <code>NATIVE_MINT</code> ile de\u011Fi\u015Ftiriyoruz.</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">NATIVE_MINT</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@solana/spl-token&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="add-balance-bakiye-ekleme" tabindex="-1"><a class="header-anchor" href="#add-balance-bakiye-ekleme" aria-hidden="true">#</a> Add Balance (Bakiye Ekleme)</h3><p>Wrapped SOL i\xE7in bakiye eklemenin iki yolu vard\u0131r:</p><h4 id="_1-by-sol-transfer-sol-transferi" tabindex="-1"><a class="header-anchor" href="#_1-by-sol-transfer-sol-transferi" aria-hidden="true">#</a> 1. By SOL Transfer (SOL Transferi)</h4><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
  <span class="token comment">// trasnfer SOL</span>
  SystemProgram<span class="token punctuation">.</span><span class="token function">transfer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    fromPubkey<span class="token operator">:</span> alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    toPubkey<span class="token operator">:</span> ata<span class="token punctuation">,</span>
    lamports<span class="token operator">:</span> amount<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// sync wrapped SOL balance</span>
  <span class="token function">createSyncNativeInstruction</span><span class="token punctuation">(</span>ata<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="_2-by-token-transfer-token-transferi" tabindex="-1"><a class="header-anchor" href="#_2-by-token-transfer-token-transferi" aria-hidden="true">#</a> 2. By Token Transfer (Token Transferi)</h4><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> tx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>
  <span class="token comment">// create token account</span>
  SystemProgram<span class="token punctuation">.</span><span class="token function">createAccount</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    fromPubkey<span class="token operator">:</span> alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    newAccountPubkey<span class="token operator">:</span> auxAccount<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    space<span class="token operator">:</span> <span class="token constant">ACCOUNT_SIZE</span><span class="token punctuation">,</span>
    lamports<span class="token operator">:</span>
      <span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">getMinimumBalanceForRentExemptAccount</span><span class="token punctuation">(</span>connection<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> amount<span class="token punctuation">,</span> <span class="token comment">// rent + amount</span>
    programId<span class="token operator">:</span> <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// init token account</span>
  <span class="token function">createInitializeAccountInstruction</span><span class="token punctuation">(</span>
    auxAccount<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    <span class="token constant">NATIVE_MINT</span><span class="token punctuation">,</span>
    alice<span class="token punctuation">.</span>publicKey
  <span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// transfer WSOL</span>
  <span class="token function">createTransferInstruction</span><span class="token punctuation">(</span>auxAccount<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> ata<span class="token punctuation">,</span> alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span> amount<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// close aux account</span>
  <span class="token function">createCloseAccountInstruction</span><span class="token punctuation">(</span>
    auxAccount<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    alice<span class="token punctuation">.</span>publicKey<span class="token punctuation">,</span>
    alice<span class="token punctuation">.</span>publicKey
  <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="how-to-get-all-token-accounts-by-owner-tum-token-account-lar\u0131-sahibi-taraf\u0131ndan-nas\u0131l-al\u0131n\u0131r" tabindex="-1"><a class="header-anchor" href="#how-to-get-all-token-accounts-by-owner-tum-token-account-lar\u0131-sahibi-taraf\u0131ndan-nas\u0131l-al\u0131n\u0131r" aria-hidden="true">#</a> How to get all token accounts by owner (T\xFCm token account\u2019lar\u0131 sahibi taraf\u0131ndan nas\u0131l al\u0131n\u0131r?)</h2><p>Token account&#39;lar\u0131n\u0131 sahibine g\xF6re getirebilirsiniz. Bunu yapman\u0131n iki yolu vard\u0131r:</p><ol><li>Get All Token Account (T\xFCm Token Account\u2019lar\u0131 Getirme)</li></ol><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> response <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">getParsedTokenAccountsByOwner</span><span class="token punctuation">(</span>owner<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  programId<span class="token operator">:</span> <span class="token constant">TOKEN_PROGRAM_ID</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2"><li>Filter By Mint (Mint\u2019e G\xF6re Filtreleme)</li></ol><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> response <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">getParsedTokenAccountsByOwner</span><span class="token punctuation">(</span>owner<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  mint<span class="token operator">:</span> mint<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,63);function t(p,c){return e}var l=n(a,[["render",t]]);export{l as default};
