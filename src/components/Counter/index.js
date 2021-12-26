import React from "react";
import { connect } from "react-redux";
import {increment, decrement} from './../../index'

// function Counter(props) {
// 解构操作
function Counter({count, addCount, minusCount, dispatch}) {
  console.log(count);
  
  return (
    <div>
      {/* <button onClick={() => store.dispatch(increment)}>+</button> */}
      {/* <button onClick={() => dispatch(increment)}>+</button> */}
      {/* <button onClick={() => addCount()}>+</button> */}
      <button onClick={addCount}>+</button>
      {/* <span>{store.getState().count}</span> */}
      <span>{count}</span>
      {/* <button onClick={() => store.dispatch(decrement)}>-</button> */}
      {/* <button onClick={() => minusCount()}>-</button> */}
      <button onClick={minusCount}>-</button>
    </div>
  );
}


const mapStateToProps = (state)=>{
  return {
    // a:'b',
    count:state.count
  }
}



const mapDispatchToProps = (dispatch)=>{
  
  return {
    // addCount:function (data) {
    //   dispatch(increment)
    // },

    // 简化后如下
    addCount(data) {
      dispatch(increment)
    },

    minusCount(data) {
      dispatch(decrement)
    },


    dispatch
  }
}


export default connect(mapStateToProps,mapDispatchToProps )(Counter);
/* 
  
connect 作用
1. 帮助订阅store
2. 当store中状态发生变化，  会重新渲染组件

3. 获取store中的状态， 将状态映射到props属性中映射给组件
4. 获取dispatch方法， 触发action 


  */
