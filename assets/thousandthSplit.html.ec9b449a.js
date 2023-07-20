import{e as n}from"./app.a4625c66.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<ol><li>\u6B63\u5219</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">format1</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\B(?=(\\d{3})+\\b)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// return str.replace(/(?=\\B((\\d{3})+)$)/g,&#39;,&#39;)</span>
<span class="token punctuation">}</span>

<span class="token comment">// function format1(str) {</span>
<span class="token comment">//   const reg = /\\d{1,3}(?=(\\d{3})+$)/g;</span>
<span class="token comment">//   // match \u4E3A\u5339\u914D\u4E4B\u540E\u7684\u5185\u5BB9</span>
<span class="token comment">//   return str.replace(reg, function (match) {</span>
<span class="token comment">//     return match + &#39;,&#39;;</span>
<span class="token comment">//   });</span>
<span class="token comment">// }</span>

<span class="token comment">// \u6D4B\u8BD5</span>
<span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">&#39;100000000000&#39;</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">format1</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><ol start="2"><li>api</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">format2</span> <span class="token operator">=</span> <span class="token parameter">num</span> <span class="token operator">=&gt;</span> num<span class="token punctuation">.</span><span class="token function">toLocaleString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u6D4B\u8BD5</span>
<span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token number">100000000000</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">format2</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,4);function e(t,c){return p}var r=s(a,[["render",e]]);export{r as default};
