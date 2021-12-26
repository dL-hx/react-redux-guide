import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore } from "redux";

const initialState = {
  count: 0,
};

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case "increment": // 数值 + 1 ,返回一个新对象
      return {
        count: state.count + 1
      }

    case "decrement":
      return {
        count: state.count - 1
      }
    default:
      return state;
  }


}

const increment = { type: "increment" };
const decrement = { type: "decrement" };

const store = createStore(reducer);

function Counter() {
  return (
    <div>
      <button onClick={() => store.dispatch(increment)}>+</button>
      <span>{store.getState().count}</span>
      <button onClick={() => store.dispatch(decrement)}>-</button>
    </div>
  );
}

// 必须要订阅订阅数据更新,返回一个新的组件
store.subscribe(()=>{// 订阅数据返回新的数值
  ReactDOM.render(<Counter />, document.getElementById("root"));
})



// console.log("store", store.getState());

ReactDOM.render(<Counter />, document.getElementById("root"));
