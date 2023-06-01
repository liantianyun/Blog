# 从useRequest看一个库如何实现插件机制

前文我们解读了useRequest的核心文件的源码，梳理了核心功能相关的逻辑，其中有提到，其是通过插件机制支持更多功能的拓展的，本文我们重点解读一下插件机制相关的代码：
1. 在`useRequestImplement`文件中，将所有的插件保存在fetchInstance的pluginImpls属性上
```js
fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, fetchOptions));
```
2. 在Fetch类中，定义了`runPluginHandler`方法
```js
runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

```
这个方法的作用是接受一个事件名（对应前文提到的几个生命周期钩子），接着调用所有的插件中的对应名称的方法，将结果汇总在一个对象的属性上返回。

3. 接着，在真正的发起请求的方法`runAsync`中，存在调用插件的代码,我们先看下`onBefore`相关的:

```js
 const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params);

    // stop request
    if (stopNow) {
      return new Promise(() => {});
    }

    this.setState({
      loading: true,
      params,
      ...state,
    });

    // return now
    if (returnNow) {
      return Promise.resolve(state.data);
    }
```
请求开始前，传入`onBefore`作为参数调用了刚刚第2点提到的`runPluginHandler`方法，由此我们可以看到，插件的返回结果`stopNow`、`returnNow`、`state`是可以干预请求接下来的流程的
* 如果某个插件返回了`stopNow`，请求就会被拦截
* 如果某个插件返回了`returnNow`，则只会调用请求开始前的插件hooks，并将结果进行`setState`传递到外界
* 插件返回的`state`也会被`setState`，根据上文提到的`setState`的机制，每次`setState`外层组件都会拿到数据并重新渲染组件，所以我们据此就可以判断，如果我们希望实现某种类似于缓存的机制，就可以从这里着手。

4. 另外几个生命周期事件也是大致同理的、只要到了对应的时机调用传入对应的事件名调用`runPluginHandler`即可：
```js
// line 96
this.runPluginHandler('onSuccess', res, params);
// line 100、121 不论请求是否成功，只要请求未被取消（count的判断），try...catch都加上这一句
if (currentCount === this.count) {
    this.runPluginHandler('onFinally', params, res, undefined);
}
// line 117 在try...catch的catch语句块中
this.runPluginHandler('onError', error, params);
```

### 总结

这就是插件机制所有相关的代码，由于插件内部持有`fetchInstance`，所以它内部可以调用各种`fetchInstance`的接口，如进行`setState`操作等，这样可以在保持`useRequest`核心流程代码很清晰情况下，在请求的各个时机由插件进行对请求流程、结果的干预，从而实现更加丰富的各个功能。

以小见大，通过`useRequest`这个库，我们可以总结出一个库的插件机制的设计往往有这样的特点：
* 核心库只实现它核心功能的流程
* 在这个流程执行中，在对应的时机开放对应的接口，并将核心对象传入插件，使其在此时能干预流程，做一些主流程未实现的事情，相当于拓展了库的功能
* 稍微想了下，你会发现`Vue`、`Webpack`也都是利用这样的机制实现插件系统的

下文开始具体看各个插件的实现。

