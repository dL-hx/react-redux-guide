import { createAction } from 'redux-actions';

import { INCREMENT ,DECREMENT , INCREMENT_ASYNC } from "../const/counter.const";
//---------------=> action 对象
/* export const addCount = (payload)=> ({type:INCREMENT, payload })

export const minusCount = (payload)=> ({type: DECREMENT, payload }) */

//---------------=>使用redux-actions简化,简化type文件定义
// export const addCount_Action = createAction(INCREMENT);
export const addCount_Action = createAction("increment");

// export const minusCount_Action = createAction(DECREMENT);
export const minusCount_Action = createAction("decrement");

export const addCount_async_1_Action = createAction("increment_async");


export const addCount_async_1 = (payload)=> ({type: INCREMENT_ASYNC, payload })



export const addCount_async = (payload)=> (dispatch)=>{
    setTimeout(()=>{
        // 两秒后派发dispatch ,到reducer 处理
        dispatch(addCount_Action(payload))
        // 等价于这个
        // dispatch({type:INCREMENT, payload })
    },2000)
}

