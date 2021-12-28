import { createStore } from "redux";
// import reducer from './reducers/counter.reducer'
// 改为合并后的reducers
import RootReducer from './reducers/root.reducer'

export const store = createStore(RootReducer);
