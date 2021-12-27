> 更新master分支命令
> $         git pull origin master


## 1.0 react-reduxdemo1 基础版本实现

## 1.1 Provider组件与connect方法

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

## 1.2 bindActionsCreators方法


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

## 1.3代码重构

https://github.com/dL-hx/react-redux-guide

feat/1.3.0分支feat/1.3.0分支

App.js

```js
import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Counter from "./components/Counter";

import {store} from "./store";

// import { createStore } from "redux";
import { Provider } from "react-redux";

/* 
react-redux 
  Provider: 将store放到全局中，  组件都能拿到的地方
  connect
*/


ReactDOM.render(
  // 通过Provider 组件， 将store 放到了全局组件可以够得到的地方
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);

```



1.将reducer函数， 创建store代码放到store代码中

store

```js
import { createStore } from "redux";
import reducer from './reducers/counter.reducer'

export const store = createStore(reducer);

```

const

const/counter.const.js

```js
export const INCREMENT= "increment"
export const DECREMENT= "decrement"

```

reducers

reducers/counter.reducer.js


```js
import { INCREMENT ,DECREMENT } from "../const/counter.const";

const initialState = {
    count: 0,
  };

function reducer(state = initialState, actions) {
      switch (actions.type) {
        case INCREMENT: // 数值 + 1 ,返回一个新对象
          return {
            count: state.count + 1,
          };
    
        case DECREMENT:
          return {
            count: state.count - 1,
          };
        default:
          return state;
      }
}

export default reducer
    
```

actions

actions/counter.action.js

``` js
export const INCREMENT= "increment"
export const DECREMENT= "decrement"

```


2. 将action类型代码拆分为常量，防止写错
   INCREMENT, DECREMENT

   ## 1.4 Action传递参数
   #### 1. 传递参数

点击按钮时候数值 + 5

``` jsx
<button onClick={()=>addCount(5)}> + 1</button>
```



#### 2.接收参数, 传递reducer

```jsx
export const addCount = payload =>({type:INCREMENT, payload });
```



#### 3. reducer根据接收到的数据进行处理

``` jsx
export default (state, actions)=>{
    switch(actions.type){
        case INCREMENT:
            return {count: state.count + actions.payload }
    }
}
```



https://github.com/dL-hx/react-redux-guide

feat/1.4.0分支