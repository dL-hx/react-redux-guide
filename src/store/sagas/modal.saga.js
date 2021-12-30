import { takeEvery, put, delay } from "redux-saga/effects"; // 引入两个异步方法
import { show } from "../actions/modal.actions";
import { SHOW_MODAL_ASYNC } from "../const/modal.const";
// takeEvery 接收action
// put 触发action

function* show_async_fn(action) {
  // 1. 暂停延迟2s
  yield delay(2000);

  yield put(show());
}

// saga文件默认要求: 导出一个generater函数
export default function* modalSaga() {
  // 接收action
  // 参数1:接收类型字符串

  yield takeEvery(SHOW_MODAL_ASYNC, show_async_fn);
}
