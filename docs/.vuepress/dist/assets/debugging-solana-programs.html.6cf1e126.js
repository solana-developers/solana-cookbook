import{_ as t,r as o,o as p,c as l,a,b as n,F as c,e as r,d as e}from"./app.668fae99.js";const i={},d=r(`<h1 id="solana\u30D5\u309A\u30ED\u30AF\u3099\u30E9\u30E0\u306E\u30C6\u3099\u30CF\u3099\u30C3\u30AF\u3099" tabindex="-1"><a class="header-anchor" href="#solana\u30D5\u309A\u30ED\u30AF\u3099\u30E9\u30E0\u306E\u30C6\u3099\u30CF\u3099\u30C3\u30AF\u3099" aria-hidden="true">#</a> Solana\u30D7\u30ED\u30B0\u30E9\u30E0\u306E\u30C7\u30D0\u30C3\u30B0</h1><p>Solana \u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u30C6\u30B9\u30C8\u304A\u3088\u3073\u30C7\u30D0\u30C3\u30B0\u3059\u308B\u305F\u3081\u306E\u30AA\u30D7\u30B7\u30E7\u30F3\u3068\u30B5\u30DD\u30FC\u30C8 \u30C4\u30FC\u30EB\u304C\u591A\u6570\u3042\u308A\u307E\u3059\u3002</p><h2 id="facts" tabindex="-1"><a class="header-anchor" href="#facts" aria-hidden="true">#</a> Facts</h2><div class="custom-container tip"><p class="custom-container-title">Fact Sheet</p><ul><li>\u30AF\u30EC\u30FC\u30C8 <code>solana-program-test</code>\u3092\u4F7F\u7528\u3059\u308B\u3068\u3001\u5FC5\u8981\u6700\u5C0F\u9650\u306E <strong><em>local runtime</em></strong> \u30ED\u30FC\u30AB\u30EB \u30E9\u30F3\u30BF\u30A4\u30E0\u3092\u4F7F\u7528\u3057\u3066\u3001\u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u5BFE\u8A71\u7684\u306B(vscode\u306A\u3069\u3067)\u30C6\u30B9\u30C8\u304A\u3088\u3073\u30C7\u30D0\u30C3\u30B0\u3067\u304D\u307E\u3059\u3002</li><li>\u30AF\u30EC\u30FC\u30C8<code>solana-validator</code> \u3092\u4F7F\u7528\u3059\u308B\u3068\u3001<code>solana-test-validator</code> \u5B9F\u88C5\u3092\u4F7F\u7528\u3057\u3066\u3001**<em>\u30ED\u30FC\u30AB\u30EB\u30D0\u30EA\u30C7\u30FC\u30BF\u30CE\u30FC\u30C9</em>**\u3067\u884C\u308F\u308C\u308B\u3088\u308A\u5805\u7262\u306A\u30C6\u30B9\u30C8\u3092\u5B9F\u884C\u3067\u304D\u307E\u3059\u3002\u30A8\u30C7\u30A3\u30BF\u30FC\u304B\u3089\u5B9F\u884C\u3067\u304D\u307E\u3059\u304C\u3001<strong>\u30D7\u30ED\u30B0\u30E9\u30E0\u5185\u306E\u30D6\u30EC\u30FC\u30AF\u30DD\u30A4\u30F3\u30C8\u306F\u7121\u8996\u3055\u308C\u307E\u3059</strong>\u3002</li><li><code>solana-test-validator</code>CLI \u30C4\u30FC\u30EB\u306F\u3001\u306F\u3001\u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u5B9F\u884C\u304A\u3088\u3073\u30ED\u30FC\u30C9\u3057\u3001\u30B3\u30DE\u30F3\u30C9\u30E9\u30A4\u30F3 Rust \u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u307E\u305F\u306F web3 \u3092\u4F7F\u7528\u3059\u308B Javascript/Typescript \u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u304B\u3089\u306E\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u5B9F\u884C\u3092\u51E6\u7406\u3057\u307E\u3059\u3002</li><li>\u4E0A\u8A18\u306E\u3059\u3079\u3066\u306B\u3064\u3044\u3066\u3001<code>msg!</code> \u3092\u81EA\u7531\u306B\u4F7F\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u30D7\u30ED\u30B0\u30E9\u30E0\u5185\u306E\u30DE\u30AF\u30ED\u306F\u3001\u6700\u521D\u306F\u524A\u9664\u3059\u308B\u3053\u3068\u3092\u304A\u52E7\u3081\u3057\u307E\u3059\u3002\u305D\u306E\u5F8C\u3001\u30C6\u30B9\u30C8\u3092\u884C\u3063\u3066\u5805\u5B9F\u306A\u52D5\u4F5C\u3092\u78BA\u8A8D\u3059\u308B\u3068\u304D\u306B\u524A\u9664\u3057\u307E\u3059\u3002<code>msg!</code>\u3092\u899A\u3048\u3066\u304A\u3044\u3066\u304F\u3060\u3055\u3044\u3002\u8A08\u7B97\u30E6\u30CB\u30C3\u30C8\u3092\u6D88\u8CBB\u3057\u3001\u6700\u7D42\u7684\u306B\u8A08\u7B97\u30E6\u30CB\u30C3\u30C8\u306E\u4E88\u7B97\u4E0A\u9650\u306B\u9054\u3057\u3066\u30D7\u30ED\u30B0\u30E9\u30E0\u304C\u5931\u6557\u3059\u308B\u53EF\u80FD\u6027\u304C\u3042\u308A\u307E\u3059\u3002</li></ul></div><p>\u4EE5\u4E0B\u306E\u30BB\u30AF\u30B7\u30E7\u30F3\u306E\u624B\u9806\u3067\u306F<a href="#resources">solana-program-bpf-template</a>\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002\u305D\u308C\u3092\u81EA\u5206\u306E\u30DE\u30B7\u30F3\u306B\u30AF\u30ED\u30FC\u30F3\u3057\u307E\u3059:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> clone git@github.com:mvines/solana-bpf-program-template.git
<span class="token builtin class-name">cd</span> solana-bpf-program-template
code <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="runtime-testing-and-debugging-in-editor" tabindex="-1"><a class="header-anchor" href="#runtime-testing-and-debugging-in-editor" aria-hidden="true">#</a> Runtime Testing and Debugging in editor</h2><p><code>src/lib.rs</code>\u30D5\u30A1\u30A4\u30EB\u3092\u958B\u304F</p><p>\u30D7\u30ED\u30B0\u30E9\u30E0\u306F\u975E\u5E38\u306B\u5358\u7D14\u3067\u3001\u57FA\u672C\u7684\u306B\u306F\u30D7\u30ED\u30B0\u30E9\u30E0\u306E\u30A8\u30F3\u30C8\u30EA\u30DD\u30A4\u30F3\u30C8\u95A2\u6570\u306B\u3088\u3063\u3066\u53D7\u4FE1\u3055\u308C\u305F\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u30ED\u30B0\u306B\u8A18\u9332\u3059\u308B\u3060\u3051\u3067\u3042\u308B\u3053\u3068\u304C\u308F\u304B\u308A\u307E\u3059: <code>process_instruction</code></p><ol><li><code>#[cfg(test)]</code> \u30BB\u30AF\u30B7\u30E7\u30F3\u306B\u79FB\u52D5\u3057\u3001<code>Run Test</code>\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3059\u3002 \u3053\u308C\u306B\u3088\u308A\u3001\u30D7\u30ED\u30B0\u30E9\u30E0\u304C\u30D3\u30EB\u30C9\u3055\u308C\u3001<code>async fn test_transaction()</code> \u30C6\u30B9\u30C8\u304C\u5B9F\u884C\u3055\u308C\u307E\u3059\u3002\u30BD\u30FC\u30B9\u306E\u4E0B\u306E vscode \u30BF\u30FC\u30DF\u30CA\u30EB\u306B\u30ED\u30B0 \u30E1\u30C3\u30BB\u30FC\u30B8 (simplified)\u304C\u8868\u793A\u3055\u308C\u307E\u3059\u3002</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>running <span class="token number">1</span> <span class="token builtin class-name">test</span>
<span class="token string">&quot;bpf_program_template&quot;</span> program loaded as native code
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: <span class="token number">1</span> accounts, <span class="token assign-left variable">data</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span><span class="token punctuation">]</span>
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success
<span class="token builtin class-name">test</span> test::test_transaction <span class="token punctuation">..</span>. ok
<span class="token builtin class-name">test</span> result: ok. <span class="token number">1</span> passed<span class="token punctuation">;</span> <span class="token number">0</span> failed<span class="token punctuation">;</span> <span class="token number">0</span> ignored<span class="token punctuation">;</span> <span class="token number">0</span> measured<span class="token punctuation">;</span> <span class="token number">0</span> filtered out<span class="token punctuation">;</span> finished <span class="token keyword">in</span> <span class="token number">33</span>.41s
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ol start="2"><li>\u30D6\u30EC\u30A4\u30AF\u30DD\u30A4\u30F3\u30C8\u3092\u30D7\u30ED\u30B0\u30E9\u30E0\u306E<code>msg!</code>\u304C\u3042\u308B(11)\u5217\u76EE\u306B\u8A2D\u5B9A\u3057\u307E\u3059\u3002</li><li>\u30C6\u30B9\u30C8\u30E2\u30B8\u30E5\u30FC\u30EB\u306B\u623B\u308A\u3001<code>Debug</code>\u3092\u30AF\u30EA\u30C3\u30AF\u3059\u308B\u3068\u3001\u6570\u79D2\u4EE5\u5185\u306B\u30C7\u30D0\u30C3\u30AC\u30FC\u304C\u30D6\u30EC\u30FC\u30AF\u30DD\u30A4\u30F3\u30C8\u3067\u505C\u6B62\u3057\u3001\u30C7\u30FC\u30BF\u3092\u8ABF\u3079\u305F\u308A\u3001\u95A2\u6570\u3092\u30B9\u30C6\u30C3\u30D7\u5B9F\u884C\u3057\u305F\u308A\u306A\u3069\u304C\u3067\u304D\u308B\u3088\u3046\u306B\u306A\u308A\u307E\u3059\u3002</li></ol><p>\u3053\u308C\u3089\u306E\u30C6\u30B9\u30C8\u306F\u3001\u30B3\u30DE\u30F3\u30C9 \u30E9\u30A4\u30F3\u304B\u3089\u3082\u5B9F\u884C\u3067\u304D\u307E\u3059: <code>cargo test</code> \u307E\u305F\u306F <code>cargo test-bpf</code>\u3002 \u3082\u3061\u308D\u3093\u3001\u30D6\u30EC\u30FC\u30AF\u30DD\u30A4\u30F3\u30C8\u304C\u3042\u3063\u3066\u3082\u7121\u8996\u3055\u308C\u307E\u3059\u3002</p><p>How groovy can you get!</p><div class="custom-container tip"><p class="custom-container-title">Note</p><p>\u30D0\u30EA\u30C7\u30FC\u30BF\u30CE\u30FC\u30C9\u3092\u4F7F\u7528\u3057\u3066\u3044\u306A\u3044\u305F\u3081\u3001\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u30D7\u30ED\u30B0\u30E9\u30E0\u3001\u30D6\u30ED\u30C3\u30AF\u30CF\u30C3\u30B7\u30E5\u306A\u3069\u306F\u8868\u793A\u3055\u308C\u306A\u3044\u304B\u3001\u30D0\u30EA\u30C7\u30FC\u30BF\u30CE\u30FC\u30C9\u3067\u5B9F\u884C\u3057\u305F\u3068\u304D\u306E\u3088\u3046\u306B\u52D5\u4F5C\u3057\u306A\u3044\u3053\u3068\u306B\u6CE8\u610F\u3057\u3066\u304F\u3060\u3055\u3044\u3002 \u3053\u308C\u304C\u3001Solana \u306E\u30AE\u30E3\u30F3\u30B0\u304C Local Validator Node \u306E\u30C6\u30B9\u30C8\u3092\u63D0\u4F9B\u3057\u3066\u304F\u308C\u305F\u7406\u7531\u3067\u3059!</p></div><h2 id="local-validator-node-testing-in-editor" tabindex="-1"><a class="header-anchor" href="#local-validator-node-testing-in-editor" aria-hidden="true">#</a> Local Validator Node Testing in editor</h2><p>\u30ED\u30FC\u30AB\u30EB \u30D0\u30EA\u30C7\u30FC\u30BF \u30CE\u30FC\u30C9\u306E\u30D7\u30ED\u30B0\u30E9\u30E0\u306B\u3088\u308B\u8AAD\u307F\u8FBC\u307F\u3092\u4F7F\u7528\u3057\u305F\u7D71\u5408\u30C6\u30B9\u30C8\u306F\u3001<code>tests/integration.rs</code>\u30D5\u30A1\u30A4\u30EB\u3067\u5B9A\u7FA9\u3055\u308C\u3066\u3044\u307E\u3059\u3002</p><p>\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u306F\u3001\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u30EA\u30DD\u30B8\u30C8\u30EA\u306E\u7D71\u5408\u30C6\u30B9\u30C8\u306F\u3001<code>cargo test-bpf</code>\u3092\u4F7F\u7528\u3057\u3066\u30B3\u30DE\u30F3\u30C9 \u30E9\u30A4\u30F3\u304B\u3089\u306E\u307F\u5B9F\u884C\u3067\u304D\u307E\u3059\u3002 \u6B21\u306E\u624B\u9806\u3092\u5B9F\u884C\u3059\u308B\u3068\u3001\u30A8\u30C7\u30A3\u30BF\u5185\u3067\u5B9F\u884C\u3067\u304D\u308B\u3060\u3051\u3067\u306A\u304F\u3001\u30D7\u30ED\u30B0\u30E9\u30E0\u30D0\u30EA\u30C7\u30FC\u30BF\u30ED\u30B0\u3068<code>msg!</code>\u3092\u8868\u793A\u3059\u308B\u3053\u3068\u3082\u3067\u304D\u307E\u3059\u3002\u30D7\u30ED\u30B0\u30E9\u30E0\u304B\u3089\u306E\u51FA\u529B:</p><ol><li>repo\u30C7\u30A3\u30EC\u30AF\u30C8\u30EA\u3067<code>cargo build-bpf</code>\u3092\u5B9F\u884C\u3057\u3066\u30B5\u30F3\u30D7\u30EB \u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u30D3\u30EB\u30C9\u3057\u307E\u3059\u3002</li><li>\u30A8\u30C7\u30A3\u30BF\u30FC\u3067<code>tests/integration.rs</code>\u3092\u958B\u304D\u307E\u3059\u3002</li><li>1\u884C\u76EE\u306E<code>// #![cfg(feature = &quot;test-bpf&quot;)]</code>\u3092\u30B3\u30E1\u30F3\u30C8\u30A2\u30A6\u30C8\u3057\u307E\u3059\u3002</li><li>19\u884C\u76EE\u3092\u6B21\u306E\u3088\u3046\u306B\u5909\u66F4\u3057\u307E\u3059<code>.add_program(&quot;target/deploy/bpf_program_template&quot;, program_id)</code></li><li>22\u884C\u76EE\u306B\u4EE5\u4E0B\u3092\u633F\u5165<code>solana_logger::setup_with_default(&quot;solana_runtime::message=debug&quot;);</code></li><li><code>test_validator_transaction()</code>\u306E\u4E0A\u306B\u3042\u308B<code>Run Test</code>\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u307E\u3059\u3002</li></ol><p>\u3053\u308C\u306F\u30D0\u30EA\u30C7\u30FC\u30BF\u30CE\u30FC\u30C9\u3092\u30ED\u30FC\u30C9\u3057\u3001\u30C8\u30E9\u30F3\u30B6\u30AF\u30B7\u30E7\u30F3\u3092\u69CB\u7BC9\u3057\uFF08Rust\u306E\u65B9\u6CD5\uFF09\u3001<code>RcpClient</code>\u3092\u4F7F\u7528\u3057\u3066\u30CE\u30FC\u30C9\u306B\u9001\u4FE1\u3067\u304D\u308B\u3088\u3046\u306B\u3057\u307E\u3059\u3002</p><p>\u30D7\u30ED\u30B0\u30E9\u30E0\u306E\u51FA\u529B\u306F\u3001\u30A8\u30C7\u30A3\u30BF\u30FC \u30BF\u30FC\u30DF\u30CA\u30EB\u306B\u3082\u51FA\u529B\u3055\u308C\u307E\u3059\u3002\u4F8B\u3001(simplified):</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>running <span class="token number">1</span> <span class="token builtin class-name">test</span>
Waiting <span class="token keyword">for</span> fees to stabilize <span class="token number">1</span><span class="token punctuation">..</span>.
Waiting <span class="token keyword">for</span> fees to stabilize <span class="token number">2</span><span class="token punctuation">..</span>.
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM invoke <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
Program log: process_instruction: 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM: <span class="token number">1</span> accounts, <span class="token assign-left variable">data</span><span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span><span class="token punctuation">]</span>
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM consumed <span class="token number">13027</span> of <span class="token number">200000</span> compute <span class="token function">units</span>
Program 4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM success

<span class="token builtin class-name">test</span> test_validator_transaction <span class="token punctuation">..</span>. ok
<span class="token builtin class-name">test</span> result: ok. <span class="token number">1</span> passed<span class="token punctuation">;</span> <span class="token number">0</span> failed<span class="token punctuation">;</span> <span class="token number">0</span> ignored<span class="token punctuation">;</span> <span class="token number">0</span> measured<span class="token punctuation">;</span> <span class="token number">0</span> filtered out<span class="token punctuation">;</span> finished <span class="token keyword">in</span> <span class="token number">6</span>.40s
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u3053\u3053\u3067\u30C7\u30D0\u30C3\u30B0\u3059\u308B\u3068\u3001**<em>\u30C6\u30B9\u30C8\u672C\u4F53</em>**\u3067\u4F7F\u7528\u3055\u308C\u3066\u3044\u308B\u95A2\u6570\u3068\u30E1\u30BD\u30C3\u30C9\u3092\u30C7\u30D0\u30C3\u30B0\u3067\u304D\u307E\u3059\u304C\u3001\u30D7\u30ED\u30B0\u30E9\u30E0\u306E\u30D6\u30EC\u30FC\u30AF\u30DD\u30A4\u30F3\u30C8\u306F\u3067\u304D\u307E\u305B\u3093\u3002</p><p>The bee&#39;s knees eh?</p><h2 id="local-validator-node-testing-from-client-apps" tabindex="-1"><a class="header-anchor" href="#local-validator-node-testing-from-client-apps" aria-hidden="true">#</a> Local Validator Node Testing from Client Apps</h2><p>\u6700\u5F8C\u306B\u3001\u30ED\u30FC\u30AB\u30EB\u306E\u691C\u8A3C\u30CE\u30FC\u30C9\u3092\u958B\u59CB\u3057\u3001\u30B3\u30DE\u30F3\u30C9\u30E9\u30A4\u30F3\u304B\u3089<code>solana-test-validator</code>\u3092\u4F7F\u7528\u3057\u3066\u30D7\u30ED\u30B0\u30E9\u30E0\u3068\u30A2\u30AB\u30A6\u30F3\u30C8\u3092\u30ED\u30FC\u30C9\u3067\u304D\u307E\u3059\u3002</p><p>\u3053\u306E\u30A2\u30D7\u30ED\u30FC\u30C1\u3067\u306F\u3001Rust <a href="#resources">RcpClient</a>\u3092\u4F7F\u7528\u3059\u308B\u304B\u3001 <a href="#resources">JavaScript \u307E\u305F\u306F Typescript clients</a>\u3067\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8 \u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u304C\u5FC5\u8981\u306B\u306A\u308A\u307E\u3059\u3002</p><p>\u8A73\u7D30\u3068\u30AA\u30D7\u30B7\u30E7\u30F3\u306B\u3064\u3044\u3066\u306F\u3001<code>solana-test-validator --help</code> \u3092\u53C2\u7167\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u30B5\u30F3\u30D7\u30EB\u30D7\u30ED\u30B0\u30E9\u30E0\u306E\u5834\u5408\u3001\u3053\u3053\u306B\u30D0\u30CB\u30E9\u306E\u30BB\u30C3\u30C8\u30A2\u30C3\u30D7\u304C\u3042\u308A\u307E\u3059:</p><ol><li>repo\u30D5\u30A9\u30EB\u30C0\u30FC\u3067\u30BF\u30FC\u30DF\u30CA\u30EB\u3092\u958B\u304D\u307E\u3059\u3002</li><li><code>solana config set -ul</code>\u3092\u5B9F\u884C\u3057\u3066\u3001\u69CB\u6210\u304C\u30ED\u30FC\u30AB\u30EB\u3092\u6307\u3059\u3088\u3046\u306B\u8A2D\u5B9A\u3057\u307E\u3059\u3002</li><li><code>solana-test-validator --bpf-program target/deploy/bpf_program_template-keypair.json target/deploy/bpf_program_template.so</code>\u3092\u5B9F\u884C\u3057\u307E\u3059\u3002</li><li>\u5225\u306E\u30BF\u30FC\u30DF\u30CA\u30EB\u3092\u958B\u304D\u3001<code>solana logs</code> \u3092\u5B9F\u884C\u3057\u3066\u30ED\u30B0 \u30B9\u30C8\u30EA\u30FC\u30DE\u30FC\u3092\u958B\u59CB\u3057\u307E\u3059\u3002</li><li>\u305D\u306E\u5F8C\u3001\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8 \u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u5B9F\u884C\u3057\u3001\u30ED\u30B0 \u30B9\u30C8\u30EA\u30FC\u30DE\u30FC\u3092\u958B\u59CB\u3057\u305F\u30BF\u30FC\u30DF\u30CA\u30EB\u3067\u30D7\u30ED\u30B0\u30E9\u30E0\u306E\u51FA\u529B\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002</li></ol><p>Now that is the cat&#39;s pajamas YO!</p><h2 id="\u305D\u306E\u4ED6\u53C2\u8003\u8CC7\u6599" tabindex="-1"><a class="header-anchor" href="#\u305D\u306E\u4ED6\u53C2\u8003\u8CC7\u6599" aria-hidden="true">#</a> \u305D\u306E\u4ED6\u53C2\u8003\u8CC7\u6599</h2>`,31),u={href:"https://github.com/mvines/solana-bpf-program-template",target:"_blank",rel:"noopener noreferrer"},m=e("solana-program-bpf-template"),b={href:"https://docs.rs/solana-client/latest/solana_client/rpc_client/struct.RpcClient.html",target:"_blank",rel:"noopener noreferrer"},g=e("RcpClient"),k={href:"https://solana-labs.github.io/solana-web3.js/",target:"_blank",rel:"noopener noreferrer"},h=e("JavaScript/Typescript Library");function f(_,v){const s=o("ExternalLinkIcon");return p(),l(c,null,[d,a("p",null,[a("a",u,[m,n(s)])]),a("p",null,[a("a",b,[g,n(s)])]),a("p",null,[a("a",k,[h,n(s)])])],64)}var x=t(i,[["render",f]]);export{x as default};
