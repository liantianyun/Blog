# Loading Delay

今天来具体看看编写插件的代码，阅读本文前请阅读前文。

插件的作用：通过设置 `options.loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止闪烁。

```
const { loading, data } = useRequest(getUsername, {
  loadingDelay: 300
});

return <div>{ loading ? 'Loading...' : data }</div>
```

主要应用场景就是有些loading效果非常短暂的话，就不需要出现了。

看看源码：
```js
const useLoadingDelayPlugin: Plugin<any, any[]> = (fetchInstance, { loadingDelay }) => {
  const timerRef = useRef<Timeout>();

  if (!loadingDelay) {
    return {};
  }

  const cancelTimeout = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    onBefore: () => {
      cancelTimeout();

      timerRef.current = setTimeout(() => {
        fetchInstance.setState({
          loading: true,
        });
      }, loadingDelay);

      return {
        loading: false,
      };
    },
    onFinally: () => {
      cancelTimeout();
    },
    onCancel: () => {
      cancelTimeout();
    },
  };
};
```

其实逻辑也一目了然，在`onBefore`阶段，设置一个定时器，在用户传入的指定时间`loadingDelay`后设置`state.loading`为true，立即返回`{ loading: false }`，前文有提过，`onBefore`阶段plugin返回的state会被setState，就覆盖掉了默认的loading为true的逻辑。

接着，在`onFinally`和`onCancel`中都加入清楚定时器的逻辑，这样无论请求是在结果返回前完成了，还是被取消了，都会清除掉定时器，loading就不会有机会变为true了。

这个插件就是这么简单。

最后提个别的话题，我写了这几篇文章，说了很多遍类似于“其实很简单”之类的话，一方面，跟我选的内容本身是比较简单的有关，因为我希望这个系列的解读是由易到难的，另一方面，我想说的是，虽然这些源码简单，却依然不妨碍它们是好的、实用的hooks，我们依然可以从这个角度去学习——好的封装可以是这样的，跟代码的复杂度不一定成正相关。

而这种体验，也比较有利于消除我或者部分读者对于源码的恐惧感，其实它们，也没这么复杂嘛~


