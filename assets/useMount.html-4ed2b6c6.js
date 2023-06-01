import{_ as e,p as n,q as s,a1 as i}from"./framework-5866ffd3.js";const d={},t=i(`<h1 id="uselatest、usemount、useunmount、useunmountedref" tabindex="-1"><a class="header-anchor" href="#uselatest、usemount、useunmount、useunmountedref" aria-hidden="true">#</a> useLatest、useMount、useUnmount、useUnmountedRef</h1><h3 id="uselatest" tabindex="-1"><a class="header-anchor" href="#uselatest" aria-hidden="true">#</a> useLatest</h3><p>返回当前最新值的 Hook，可以避免闭包问题。</p><p>源码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function useLatest&lt;T&gt;(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原理也非常简单，传入一个值，使用<code>useRef</code>包一下，并且赋值该<code>ref</code>的<code>current</code>属性，如果该值在未来改变了，由于存在<code>ref.current = value</code>的操作，所以可以保证<code>ref.current</code>始终指向该值的最新值。</p><h3 id="usemount" tabindex="-1"><a class="header-anchor" href="#usemount" aria-hidden="true">#</a> useMount</h3><p>只在组件初始化时执行的 Hook。</p><p>源码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const useMount = (fn: () =&gt; void) =&gt; {
  useEffect(() =&gt; {
    fn?.();
  }, []);
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原理也非常简单，利用useEffect会在渲染完成后执行回调函数的特性，同时，第二个参数依赖项传入空数组，所以只会在组件首次渲染完成后执行。</p><h3 id="useunmount" tabindex="-1"><a class="header-anchor" href="#useunmount" aria-hidden="true">#</a> useUnmount</h3><p>在组件卸载（unmount）时执行的 Hook。</p><p>源码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const useUnmount = (fn: () =&gt; void) =&gt; {
  const fnRef = useLatest(fn);

  useEffect(
    () =&gt; () =&gt; {
      fnRef.current();
    },
    [],
  );
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用<code>useLatest</code>保存传入函数的最新的引用，接着利用<code>useEffect</code>第一个参数返回的函数会在卸载时执行的特性在返回的函数里通过<code>fnRef.current</code>执行该函数即可。</p><h3 id="useunmountedref" tabindex="-1"><a class="header-anchor" href="#useunmountedref" aria-hidden="true">#</a> useUnmountedRef</h3><p>获取当前组件是否已经卸载的 Hook。</p><p>通过判断有没有执行 useEffect 中的返回值判断当前组件是否已经卸载。</p><p>源码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const useUnmountedRef = () =&gt; {
  const unmountedRef = useRef(false);
  useEffect(() =&gt; {
    unmountedRef.current = false;
    return () =&gt; {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原理也非常简单，跟useUnmount利用的是useEffect的相同的原理，如果组件未卸载，<code>unmountedRef.current = true;</code>未执行，得到的就是false，如果组件已卸载，得到的则是false。</p><p>不过这个hooks的使用场景不是很容易看出来，有人可能会想组件肯定是组件未卸载才会调用这个hooks，那未卸载得到的肯定是false。</p><p>其实不是，还是因为js的异步和闭包的特性，如果你在一个异步函数中进行setState等操作，那么等这个异步函数执行的时候，有可能组件已经卸载了，这时候React会给你提供一个警告信息,表明造成了内存泄漏。</p><blockquote><p>Can’t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.</p></blockquote><p>使用这个hooks即可解决该问题。</p><p>如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const unmountRef = useUnmountedRef()
const [data, setData] = useState(null)
useEffect(() =&gt; {
  fetchUser().then(({data}) =&gt; {
    if(!unmountRef.current) {
      setData(data)
    }
  })
}, [])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),u=[t];function a(l,r){return n(),s("div",null,u)}const o=e(d,[["render",a],["__file","useMount.html.vue"]]);export{o as default};
