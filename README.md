> 更新master分支命令
> $         git pull origin master
> 报错的解决
> https://blog.csdn.net/soindy/article/details/44077831?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.pc_relevant_paycolumn_v2&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1.pc_relevant_paycolumn_v2&utm_relevant_index=1

@[toc]

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

## 1.5 Redux弹出框
https://github.com/dL-hx/react-redux-guide

feat/1.5.0分支



reducers/counter.reducer.js

```js
import { INCREMENT, DECREMENT } from "../const/counter.const";
import { SHOW_MODAL, HIDE_MODAL } from "../const/modal.const";

const initialState = {
  count: 0,
  show: false,
};

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case INCREMENT: // 数值 + 1 ,返回一个新对象
      return {
        ...state,
        // count: state.count + 1,
        count: state.count + actions.payload,
      };

    case DECREMENT:
      return {
        ...state,
        // count: state.count - 1,
        count: state.count - actions.payload,
      };

    // 这里需要保存原有的state,进行拷贝
    case SHOW_MODAL:
      return {
        ...state,
        show: true,
      };

    case HIDE_MODAL:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}

export default reducer;

```

modal.actions.js

```js
import { SHOW_MODAL, HIDE_MODAL } from "../const/modal.const";

export const show = () => ({ type: SHOW_MODAL });
export const hide = () => ({ type: HIDE_MODAL });
```

components/Modal/index.js

```js
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActions from "./../../store/actions/modal.actions";

function Modal(props) {
  
  const styles = {
    width: 200,
    height: 200,
    position: "absolute",
    left: "50%",
    top: "50%",
    // marginLeft 等于,负的 自己盒子W的一半
    // -200/2 = -100
    marginLeft: -100,
    // marginTop 等于,负的 自己盒子H的一半
    // -200/2 = -100
    marginTop: -100,
    backgroundColor: "skyblue",
    display: props.vist ? "block" : "none",
  };

  return (
    <div>
      <button onClick={()=>props.show()}>显示</button>
      <button onClick={()=>props.hide()}>隐藏</button>
      {/*  {
             props.show&&<div style={styles}></div>
        } */}
      <div style={styles}></div>
    </div>
  );
}

// export default Modal;
const mapStateToProps = (state) => {
  return {
    vist: state.show,
  };
};

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators(modalActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

```
## 1.6 拆分Reducer
https://github.com/dL-hx/react-redux-guide

feat/1.6.0分支

既匹配了counter的reducer,又匹配了modal的reducer,看如何拆分reducer,又能将其进行组合
### 1. 拆分reducer

counter.reducer.js

modal.reducer.js

### 2. 合并reducer

combineReducers

``` js
 import { combineReducers } from 'redux'
```



``` js
// root reducer 用来reducer的合并
 import { combineReducers } from 'redux'

//  1. 拆分reducer
 import CounterReducer from './counter.reducer'
 import ModalReducer from './modal.reducer'

 // 2. 合并reducer
 // {counter:{count:0}, model:{show:false}}
export default combineReducers({
    counter: CounterReducer,
    modal: ModalReducer,
})
```



\src\store\index.js

``` js
import { createStore } from "redux";
// import reducer from './reducers/counter.reducer'
// 改为合并后的reducers
import RootReducer from './reducers/root.reducer'

export const store = createStore(RootReducer);
```



调用时候修改如下

``` js
const mapStateToProps = (state) => {
  return {
    vist: state.modal.show,
  };
};
```



``` js
const mapStateToProps = (state) => {
  return {
    // a:'b',
    count: state.counter.count,
  };
};
```

## 1.7 开发Redux中间件

https://github.com/dL-hx/react-redux-guide

feat/1.7.0分支
### 3.3 开发Redux中间件

开发中间件的模板代码

```js
export default store => next =>action=> {}
```

### 3.4 注册中间件

将开发好的中间件需要 为store注册,  这个中间件才会生效

> 中间件在开发完成以后只有被注册才能在Redux的工作流程中生效

./store/index.js

```js
import {createStore, applyMiddleware } from 'redux';
import logger from './middlewares/logger';

createStore(reducer, applyMiddleware( 
    logger
));
```



```
//项目目录
|____react-redux-guide
|____src
| |____...
| |____store
| 	|____actions
| 	|____const
+ 	|____middleware
+ 		|____logger.js
| 	|____reducers
| 	|____index.js



```

./middleware/logger.js

``` js
// 导出中间件的模板代码
export default function (store) {
    return function (next) {
        return function (action) {
            // 在这里执行自己的逻辑
        }
    }
}
```

===> 简化为

箭头函数的写法简化

``` js
export default (store) => (next) => (action) => {
    // 在这里执行自己的逻辑
};
```

1. 定义中间件

``` js
export default (store) => (next) => (action) => {
    // 在这里执行自己的逻辑

    // 输出store
    console.log(store);

    // 输出这个action
    console.log(action);

    // <调用>next 方法
    // 目的: 将这个action 传递给 reducer,
    // 并将action 传递给reducer
    next(action);
    
};
```

2. 注册中间件

./store/index.js

``` js
import { createStore, applyMiddleware } from "redux";
// import reducer from './reducers/counter.reducer'
// 改为合并后的reducers
import RootReducer from "./reducers/root.reducer";

// 引入中间件
import logger from "./middleware/logger";

// 注册中间件
export const store = createStore(RootReducer, applyMiddleware(logger));

```

发现中间件组件已经被注册.





多个中间件的注册,   多中间件的执行顺序

./middleware/test

``` js
export default (store) => (next) => (action) => {
    console.log('test 中间件被执行了');
    next(action) // 需要传递给下一个中间件,让reducer接收,否则代码卡到这里不会向下执行
};
```



``` js
import { createStore, applyMiddleware } from "redux";
// import reducer from './reducers/counter.reducer'
// 改为合并后的reducers
import RootReducer from "./reducers/root.reducer";

// 引入中间件
import logger from "./middleware/logger";
import test from "./middleware/test";

// 注册中间件-------------(执行顺序取决于这里的注册顺序)
export const store = createStore(RootReducer, applyMiddleware(
    logger,
    test
));

```



## 1.8 开发Redux中间件实例

https://github.com/dL-hx/react-redux-guide

feat/1.8.0分支

延迟相加/延迟相减

通过中间件完成
延迟相加/延迟弹窗展示

通过中间件完成

**在redux工作流中加入异步操作**

在修改时候,不会修改中间件代码,这样设计比较灵活.

.\store\middleware\thunk.js

```js
export default store =>next => action =>{
    // 1.当前这个中间件函数不关心你想执行什么样的异步操作,  只关心你是不是异步操作

    // 2. 如果是异步操作,  触发action, 传递为一个函数

    // 3. 如果是同步操作,传递action 对象

    // 4. 异步操作写在你传递进来的函数

    // 5. 当前这个中间件函数在调用你传递的函数时候,  将dispatch 传递过去

    // 6. 在函数中,通过dispatch 派发action --->reducer保存数据

    // 让action自己决定什么时候,进行dispatch 数据
    if(typeof action === 'function'){
        return action(store.dispatch)
    }

    next(action)



    // if(action.type==='increment'||action.type==='decrement'){
    //     setTimeout(()=>{
    //         next(action)// 延迟两秒后生效
    //     },2000)
    // }
}
```





```js
import { createStore, applyMiddleware } from "redux";
// import reducer from './reducers/counter.reducer'
// 改为合并后的reducers
import RootReducer from "./reducers/root.reducer";

// 引入中间件
import logger from "./middleware/logger";
import test from "./middleware/test";
import thunk from "./middleware/thunk";

// 注册中间件
export const store = createStore(RootReducer, applyMiddleware(
    logger,
    test,
    thunk
));

```

.\store\actions\modal.actions.js

``` js
// 让弹出框延迟显示

export const show_async = ()=> (dispatch)=>{
    setTimeout(()=>{
        dispatch(show())
    },2000)
}
```

.\store\actions\counter.actions.js

```js
import { INCREMENT ,DECREMENT } from "../const/counter.const";
//---------------=> action 对象
export const addCount = (payload)=> ({type:INCREMENT, payload })

export const addCount_async = (payload)=> (dispatch)=>{
    setTimeout(()=>{
        // 两秒后派发dispatch ,到reducer 处理
        dispatch(addCount(payload))
        // 等价于这个
        // dispatch({type:INCREMENT, payload })
    },2000)
}
```

组件代码调用

```js
  <button onClick={()=>addCount_async(5)}>+ 5 </button>
```

```js
  <button onClick={()=>props.show_async()}>显示</button>
```


## 1.9 Redux常用中间件

https://github.com/dL-hx/react-redux-guide

feat/1.9.0分支
### 4.1 redux-thunk

> 允许在redux操作过程中加入异步操作

#### 4.1.1 redux-thunk 下载

``` shell
$	npm install redux-thunk --save
```

使用插件就不需要我们去手写中间件了

#### 4.1.2 引入redux-thunk

``` js
import thunk from 'redux-thunk';
```

#### 4.1.3 注册redux-thunk

```js
import thunk from 'redux-thunk';

// 注册中间件
export const store = createStore(RootReducer, applyMiddleware(thunk));

```

#### 4.1.4 使用redux-thunk中间件

```js
const loadPosts = () => async dispatch =>{
    const posts = await axios.get('/api/posts').then(response=>response.data)
    dispatch({type:LOAD_POST_SUCCESS, payload:posts })
}

```

action中调用如下

.\store\actions\counter.actions.js

``` js
export const addCount_async = (payload)=> (dispatch)=>{
    setTimeout(()=>{
        // 两秒后派发dispatch ,到reducer 处理
        dispatch(addCount(payload))
        // 等价于这个
        // dispatch({type:INCREMENT, payload })
    },2000)
}


```

## 2.0 Redux常用中间件
redux-saga

https://github.com/dL-hx/react-redux-guide

feat/2.0.0分支

文档学习:

https://redux-saga-in-chinese.js.org/docs/introduction/BeginnerTutorial.html

API_DOC:

https://redux-saga-in-chinese.js.org/docs/api/

#### 4.2.1 redux-saga解决的问题

>  redux-saga可以**将异步操作从Action Creater文件中抽离出来**, 放在一个单独的文件中.

比redux-thunk 更好用,功能类似

#### 4.2.2 redux-saga 下载

``` shell
$	npm install redux-saga --save
```

#### 4.2.3 创建redux-saga 中间件

``` js
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
```

sagaMiddleware注册给store

#### 4.2.4 注册redux-saga

```  js
createStore(RootReducer, applyMiddleware(sagaMiddleware));
```

#### 4.2.5 使用saga接收action执行异步操作

https://github.com/dL-hx/react-redux-guide

feat/2.0.0分支

```js
import {takeEvery, put} from 'redux-saga/effects';// 引入两个异步方法

function* load_post(){
    const {data} = yield axios.get('/api/posts.json');
    // put: 用来触发另外一个action,当异步操作时候,  触发action reducer,保存状态
    yield put(load_posts_success(data))
}

// saga:文件中,  要求默认导出一个generater 函数
export default function* postSaga(){
    // takeEvery:用来接收action,通过takeEvery方法接收组件触发的action
    
    // 接收到的action类型string,    接收这个action 需要执行的方法
    yield takeEvery(LOAD_POSTS, load_posts)
}
```



#### 4.2.6 启动saga

> 目的:这样做,所写的saga文件才会被加入到redux的工作流中.

```js
import postSaga from './store/sagas/post.saga';

sagaMiddleware.run(postSaga)
```

.\store\index.js

```js
import { createStore, applyMiddleware } from "redux";
// import reducer from './reducers/counter.reducer'
// 改为合并后的reducers
import RootReducer from "./reducers/root.reducer";

import createSagaMiddleware from 'redux-saga'

import counterSaga from './sagas/counter.saga';


// 创建sagaMiddleware,创建中间件
const sagaMiddleware = createSagaMiddleware()

// 注册redux-saga
export const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

// 启动counterSaga, 这样才会加入redux工作流中
sagaMiddleware.run(counterSaga)

```



.\store\actions\counter.actions.js

``` js
import { INCREMENT ,DECREMENT , INCREMENT_ASYNC } from "../const/counter.const";
//---------------=> action 对象
export const addCount = (payload)=> ({type:INCREMENT, payload })

...

+ export const addCount_async = ()=> ({type: INCREMENT_ASYNC })

```



.\store\sagas\counter.saga.js

``` js
import { takeEvery, put , delay } from "redux-saga/effects"; // 引入两个异步方法
import { addCount } from "../actions/counter.actions";
import { INCREMENT_ASYNC } from "../const/counter.const";
// takeEvery 接收action
// put 触发action


function* addCount_async_fn(){
   // 执行异步操作
   // 注意: 在generater函数中,   延迟不能使用setTimeout

   // 1. 暂停延迟2s
   yield delay(2000)
   // 2. put 触发action,更新了reducer
   yield put(addCount(10))
}



// saga文件默认要求: 导出一个generater函数
export default function* counterSaga() {
  // 接收action
  // 参数1:接收类型字符串
  // 参数2:异步方法执行的函数.
  yield takeEvery(INCREMENT_ASYNC, addCount_async_fn);
}
```

页面调用

```js
   <button onClick={addCount_async}>+ 5 </button>
```

## 2.1 redux-saga传参


https://github.com/dL-hx/react-redux-guide

feat/2.1.0分支



页面调用

```js
 <button onClick={()=>addCount_async_1(20)}>+ 5 </button>
```

.\store\sagas\counter.saga.js

```js
export const addCount_async_1 = (payload)=> ({type: INCREMENT_ASYNC, payload })
```

.\store\sagas\counter.saga.js

```js
...

function* addCount_async_1_fn(action){
   yield delay(2000)

    // 从形参中, 获取页面层组件,   传递来的参数
//    yield put(addCount(10))
     // 再次触发action, 修改state状态
   yield put(addCount(action.payload))
}



// saga文件默认要求: 导出一个generater函数
export default function* counterSaga() {
  // 接收action
  // 参数1:接收类型字符串
  yield takeEvery(INCREMENT_ASYNC, addCount_async_1_fn);
}
```

## 2.2 redux-saga拆分
https://github.com/dL-hx/react-redux-guide

feat/2.2.0分支

## 2.3 redux-actions
https://github.com/dL-hx/react-redux-guide

feat/2.3.0分支

redux-actions解决的问题

redux流程中大量的样版代码读写很痛苦
,如action, reducer, const,等
,使用**redux-actions**可以简化Action和Reducer的处理


