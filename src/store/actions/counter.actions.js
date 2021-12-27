import { INCREMENT ,DECREMENT } from "../const/counter.const";

export const addCount = (payload)=> ({type:INCREMENT, payload })
export const minusCount = (payload)=> ({type: DECREMENT, payload })

