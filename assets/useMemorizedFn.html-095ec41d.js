import{_ as e,p as n,q as i,a1 as s}from"./framework-5866ffd3.js";const d="/assets/bibao-4b31ae2e.png",t={},l=s(`<h1 id="usememorizedfn" tabindex="-1"><a class="header-anchor" href="#usememorizedfn" aria-hidden="true">#</a> useMemorizedFn</h1><p>作用：持久化 function 的 Hook，理论上，可以使用 useMemoizedFn 完全代替 useCallback。</p><p>在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const [state, setState] = useState(&#39;&#39;);

// 在 state 变化时，func 地址会变化
const func = useCallback(() =&gt; {
  console.log(state);
}, [state]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const [state, setState] = useState(&#39;&#39;);

// func 地址永远不会变化
const func = useMemoizedFn(() =&gt; {
  console.log(state);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>源码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function useMemoizedFn&lt;T extends noop&gt;(fn: T) {
  const fnRef = useRef&lt;T&gt;(fn);

  // why not write \`fnRef.current = fn\`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() =&gt; fn, [fn]);

  const memoizedFn = useRef&lt;PickFunction&lt;T&gt;&gt;();
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个源码非常简单，无非就是利用进行了<code>if (!memoizedFn.current)</code>的判断结合内部对<code>memoizedFn.current</code>的赋值，实现多次调用这个hooks时只会对<code>memoizedFn.current</code>赋值一次，而赋值对象是一个在赋值时才定义的函数，因为只赋值了一次，所以只定义了一次，地址就永远保存在<code>memoizedFn.current</code>了，接着返回这个<code>memoizedFn.current</code>，就实现了不论调用多少次始终只返回唯一地址的效果。</p><p>而当调用这个函数时，因为这个函数定义时候就用闭包的原理维持了对<code>fnRef.current</code>的引用，而每次调用该hooks时<code>fnRef.current</code>又会保存最新传进来的这个函数的引用，所以可以实现每次调用时调用到传入的函数的效果。</p><p>需要注意的是，这个函数能否访问到最新的state其实取决于你传入的函数是否能访问到最新的state，如果传入的函数是被useCallback缓存过的或因为某种原因形成了闭包而无法访问到最新的state，useMemorizedFn并不会改变这一点，useMemorizedFn能保证的，仅仅是返回的函数地址不变。</p><p>具体可以看下以下的代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function App() {
  const [count, setCount] = useState(0)

  const logCount = useCallback(() =&gt; {
    console.log(count);
  }, [])

  const memeizedFn = useMemoizedFn(logCount)

  memeizedFn()

  return (
    &lt;button onClick={() =&gt; setCount((count) =&gt; count + 1)}&gt;
      count is {count}
    &lt;/button&gt;
  )
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，count无论如何增加，该函数被多次调用后log的值仍然是0。 <img src="`+d+'" alt=""></p>',14),c=[l];function a(u,r){return n(),i("div",null,c)}const v=e(t,[["render",a],["__file","useMemorizedFn.html.vue"]]);export{v as default};
