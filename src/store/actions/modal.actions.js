import { SHOW_MODAL, HIDE_MODAL, SHOW_MODAL_ASYNC } from "../const/modal.const";

export const show = () => ({ type: SHOW_MODAL });
export const hide = () => ({ type: HIDE_MODAL });

// 让弹出框延迟显示

// export const show_async = ()=> (dispatch)=>{
//     setTimeout(()=>{
//         dispatch(show())
//     },2000)
// }

// 改写为saga函数
export const show_async = ()=> ({type: SHOW_MODAL_ASYNC})