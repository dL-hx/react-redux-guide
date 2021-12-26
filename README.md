> 更新master分支命令
> $         git pull origin master


1.0 react-reduxdemo1 基础版本实现

1.1 Provider组件与connect方法

为了使react 和 redux进行结合 ，需要通过 react-redux 模块实现连接

npm install react-redux --save

--

```
connect 作用
1. 帮助订阅store
2. 当store中状态发生变化，  会重新渲染组件

3. 获取store中的状态， 将状态映射到props属性中映射给组件
4. 获取dispatch方法， 触发action 
```


connect方法两个参数意义
mapStateToProps，
mapDispatchToProps，

``` jsx
const mapStateToProps = (state)=>({
    // a:'b',
    count:state.count
})



const mapDispatchToProps = (dispatch)=>{
  
  return {
    // 简化后如下
    addCount(data) {
      dispatch(increment)
    },

    minusCount(data) {
      dispatch(decrement)
    },


    dispatch
  }
}


export default connect(mapStateToProps,mapDispatchToProps )(Counter);


```

1.2 bindActionsCreators方法


https://github.com/dL-hx/react-redux-guide

feat/1.2.0分支



 目的： 调用方法生成函数， 优化如下代码

```js
const mapDispatchToProps = (dispatch)=>{
  
  return {
    // addCount:function (data) {
    //   dispatch(increment)
    // },

    // 简化后如下
    addCount(data) {
      dispatch(increment)
    },

    minusCount(data) {
      dispatch(decrement)
    },


    dispatch
  }
}
```

优化后

```js
import { bindActionCreators } from "redux";


const mapDispatchToProps = (dispatch) => ({
  // 用于生成函数
  ...bindActionCreators(
    {
      addCount() {
        return increment;
      },

      minusCount() {
        return decrement;
      },
    },
    dispatch
  ),
  
});
```

等价于

```js
const mapDispatchToProps = (dispatch) => ({
  // 用于生成函数
  ...bindActionCreators(
    {
      addCount() {
        return {type:'increment'};
      },

      minusCount() {
        return {type:'decrement'};
      },
    },
    dispatch
  ),
});
```





``` js
import * as counterActions  from './../../store/actions/counter.actions'


const mapDispatchToProps = (dispatch) => ({
  // 用于生成函数
  ...bindActionCreators(counterActions, dispatch),
});
```



一个action简化如下

``` js
const mapDispatchToProps = (dispatch) =>
(bindActionCreators(counterActions, dispatch));

```

