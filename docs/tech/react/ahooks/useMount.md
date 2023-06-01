# useLatest、useMount、useUnmount、useUnmountedRef

### useLatest
返回当前最新值的 Hook，可以避免闭包问题。

源码：
```
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}
```
原理也非常简单，传入一个值，使用`useRef`包一下，并且赋值该`ref`的`current`属性，如果该值在未来改变了，由于存在`ref.current = value`的操作，所以可以保证`ref.current`始终指向该值的最新值。
### useMount
只在组件初始化时执行的 Hook。

源码：
```
const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};
```

原理也非常简单，利用useEffect会在渲染完成后执行回调函数的特性，同时，第二个参数依赖项传入空数组，所以只会在组件首次渲染完成后执行。

### useUnmount

在组件卸载（unmount）时执行的 Hook。

源码：
```
const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};
```

利用`useLatest`保存传入函数的最新的引用，接着利用`useEffect`第一个参数返回的函数会在卸载时执行的特性在返回的函数里通过`fnRef.current`执行该函数即可。

### useUnmountedRef

获取当前组件是否已经卸载的 Hook。

通过判断有没有执行 useEffect 中的返回值判断当前组件是否已经卸载。

源码：
```
const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

```
原理也非常简单，跟useUnmount利用的是useEffect的相同的原理，如果组件未卸载，`unmountedRef.current = true;`未执行，得到的就是false，如果组件已卸载，得到的则是false。

不过这个hooks的使用场景不是很容易看出来，有人可能会想组件肯定是组件未卸载才会调用这个hooks，那未卸载得到的肯定是false。

其实不是，还是因为js的异步和闭包的特性，如果你在一个异步函数中进行setState等操作，那么等这个异步函数执行的时候，有可能组件已经卸载了，这时候React会给你提供一个警告信息,表明造成了内存泄漏。

> Can’t perform a React state update on an unmounted component. This is
a no-op, but it indicates a memory leak in your application. To fix,
cancel all subscriptions and asynchronous tasks in a useEffect cleanup
function.

使用这个hooks即可解决该问题。

如：
```
const unmountRef = useUnmountedRef()
const [data, setData] = useState(null)
useEffect(() => {
  fetchUser().then(({data}) => {
    if(!unmountRef.current) {
      setData(data)
    }
  })
}, [])
```