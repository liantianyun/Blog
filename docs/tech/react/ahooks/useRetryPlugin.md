# useRetryPlugin

今天来讲讲错误重试插件。

插件作用：通过设置 options.retryCount，指定错误重试次数，则 useRequest 在失败后会进行重试。

用法：
```
const { data, run } = useRequest(getUsername, {
  retryCount: 3,
});
```
其中，retryCount代表重试的次数。

源码：
```js
const useRetryPlugin: Plugin<any, any[]> = (fetchInstance, { retryInterval, retryCount }) => {
  const timerRef = useRef<Timeout>();
  const countRef = useRef(0);

  const triggerByRetry = useRef(false);

  if (!retryCount) {
    return {};
  }

  return {
    onBefore: () => {
      if (!triggerByRetry.current) {
        countRef.current = 0;
      }
      triggerByRetry.current = false;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    onSuccess: () => {
      countRef.current = 0;
    },
    onError: () => {
      countRef.current += 1;
      if (retryCount === -1 || countRef.current <= retryCount) {
        // Exponential backoff
        const timeout = retryInterval ?? Math.min(1000 * 2 ** countRef.current, 30000);
        timerRef.current = setTimeout(() => {
          triggerByRetry.current = true;
          fetchInstance.refresh();
        }, timeout);
      } else {
        countRef.current = 0;
      }
    },
    onCancel: () => {
      countRef.current = 0;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
  };
};
```

首先，在定义了三个ref，分别用来记录定时器、重试的次数、此时请求是否又重试机制触发的标志。

接着判断是否传递了retryCount，如果未传递，直接返回，相当于未启动这个插件。

我们直接讲讲onError里的核心逻辑：
```js
countRef.current += 1;
    if (retryCount === -1 || countRef.current <= retryCount) {
    // Exponential backoff
    const timeout = retryInterval ?? Math.min(1000 * 2 ** countRef.current, 30000);
    timerRef.current = setTimeout(() => {
        triggerByRetry.current = true;
        fetchInstance.refresh();
    }, timeout);
    } else {
    countRef.current = 0;
}
```
如果retryCount为-1，我们规定为无限次重试，直接进入代码块，否则则需要根据已重试次数是否小于用户指定重试次数来判断。

`const timeout = retryInterval ?? Math.min(1000 * 2 ** countRef.current, 30000);`

这一句规定了每次重试时的时间间隔，这里采用了指数退避法确定，每次间隔时长是成2的n次方增长的，即以`2、4、8、16、32`这样的顺序去增长，增长的很快，不过，我们规定超过30s时取两者较小值，即最长间隔30s。

接着利用定时器，在回调函数内通过fetchInstance.refresh()进行重试即可。

核心原理就是这样，而那些在其它生命周期中对于triggerByRetry、countRef.current等变量的维护，则是为了保证整个流程的正确，比如说在各种情况下重置次数、请求被取消时清除定时器等，就不逐行解读了，读者自行梳理一下即可。

