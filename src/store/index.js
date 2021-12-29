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
