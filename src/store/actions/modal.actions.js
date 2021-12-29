import { SHOW_MODAL, HIDE_MODAL } from "../const/modal.const";

export const show = () => ({ type: SHOW_MODAL });
export const hide = () => ({ type: HIDE_MODAL });

// 让弹出框延迟显示

export const show_async = ()=> (dispatch)=>{
    setTimeout(()=>{
        dispatch(show())
    },2000)
}

