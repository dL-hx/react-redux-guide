import { INCREMENT ,DECREMENT } from "../const/counter.const";
//---------------=> action 对象
export const addCount = (payload)=> ({type:INCREMENT, payload })

export const minusCount = (payload)=> ({type: DECREMENT, payload })


export const addCount_async = (payload)=> (dispatch)=>{
    setTimeout(()=>{
        // 两秒后派发dispatch ,到reducer 处理
        dispatch(addCount(payload))
        // 等价于这个
        // dispatch({type:INCREMENT, payload })
    },2000)
}

