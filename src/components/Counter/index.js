import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as counterActions  from './../../store/actions/counter.actions'

// function Counter(props) {
// 解构操作
function Counter({ count, addCount, addCount_async, minusCount,minusCount_Action, addCount_async_1, dispatch }) {
  // console.log(count);

  return (
    <div>
      {/* <button onClick={()=>addCount(5)}>+ 5 </button> */}
      {/* <button onClick={()=>addCount_async(5)}>+ 5 </button> */}
      <button onClick={()=>addCount_async_1(20)}>+ 20 </button>
      <span>{count}</span>
      {/* <button onClick={()=>minusCount(5)}>- 5</button> */}
      <button onClick={()=>minusCount_Action(5)}>- 5</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // a:'b',
    count: state.counter.count,
  };
};
/* 
const mapDispatchToProps = (dispatch) => ({
  // 用于生成函数
  ...bindActionCreators(
    {
      addCount() {
        return {type:'increment'};
      },

      minusCount() {
        return {type:'decrement'};
      },
    },
    dispatch
  ),
});

*/

const mapDispatchToProps = (dispatch) => (bindActionCreators(counterActions, dispatch));


export default connect(mapStateToProps, mapDispatchToProps)(Counter);

