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