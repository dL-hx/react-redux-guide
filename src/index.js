import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Counter from "./components/Counter";

import { createStore } from "redux";
import { Provider } from "react-redux";

/* 
react-redux 
  Provider: 将store放到全局中，  组件都能拿到的地方
  connect
*/
const initialState = {
  count: 0,
};

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case "increment": // 数值 + 1 ,返回一个新对象
      return {
        count: state.count + 1,
      };

    case "decrement":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export const increment = { type: "increment" };
export const decrement = { type: "decrement" };

const store = createStore(reducer);

// 有了Provider后，  就不需要手动subscribe订阅了
// store.subscribe(() => {
//   // 订阅数据返回新的数值
//   ReactDOM.render(<Counter />, document.getElementById("root"));
// });

// console.log("store", store.getState());

ReactDOM.render(
  // 通过Provider 组件， 将store 放到了全局组件可以够得到的地方
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);
