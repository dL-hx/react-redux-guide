import { createStore, applyMiddleware } from "redux";
// import reducer from './reducers/counter.reducer'
// 改为合并后的reducers
import RootReducer from "./reducers/root.reducer";

// 引入中间件
// import logger from "./middleware/logger";
// import test from "./middleware/test";
// import thunk from "./middleware/thunk";

// 注册redux-thunk;
// import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga'

// import counterSaga from './sagas/counter.saga';

import rootSaga from './sagas/root.saga';

// 注册中间件
// export const store = createStore(RootReducer, applyMiddleware(
//     logger,
//     test,
//     thunk
// ));

// export const store = createStore(RootReducer, applyMiddleware(thunk));

// 创建sagaMiddleware,创建中间件
const sagaMiddleware = createSagaMiddleware()

// 注册redux-saga
export const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

// 启动counterSaga, 这样才会加入redux工作流中
// sagaMiddleware.run(counterSaga)
sagaMiddleware.run(rootSaga)
