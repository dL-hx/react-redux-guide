import { createStore } from "redux";
import reducer from './reducers/counter.reducer'

export const store = createStore(reducer);
