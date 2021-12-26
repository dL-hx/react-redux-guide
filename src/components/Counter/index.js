import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as counterActions  from './../../store/actions/counter.actions'

// function Counter(props) {
// 解构操作
function Counter({ count, addCount, minusCount, dispatch }) {
  console.log(count);

  return (
    <div>
      <button onClick={addCount}>+</button>
      <span>{count}</span>
      <button onClick={minusCount}>-</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // a:'b',
    count: state.count,
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

