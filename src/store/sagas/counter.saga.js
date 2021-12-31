import { takeEvery, put, delay } from "redux-saga/effects"; // 引入两个异步方法
import { addCount_Action } from "../actions/counter.actions";
import { INCREMENT_ASYNC } from "../const/counter.const";
// takeEvery 接收action
// put 触发action

function* addCount_async_1_fn(action) {
  // 执行异步操作
  // 注意: 在generater函数中,   延迟不能使用setTimeout

  // 1. 暂停延迟2s
  yield delay(2000);
  // 2. put 触发action
  //    yield put(addCount(10))
  yield put(addCount_Action(action.payload));
}


// saga文件默认要求: 导出一个generater函数
export default function* counterSaga() {
  // 接收action
  // 参数1:接收类型字符串
  yield takeEvery(INCREMENT_ASYNC, addCount_async_1_fn);

}
