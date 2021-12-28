import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import Counter from "./components/Counter";

import {store} from "./store";

// import { createStore } from "redux";
import { Provider } from "react-redux";

/* 
react-redux 
  Provider: 将store放到全局中，  组件都能拿到的地方
  connect
*/
// const initialState = {
//   count: 0,
// };

// function reducer(state = initialState, actions) {
//   switch (actions.type) {
//     case "increment": // 数值 + 1 ,返回一个新对象
//       return {
//         count: state.count + 1,
//       };

//     case "decrement":
//       return {
//         count: state.count - 1,
//       };
//     default:
//       return state;
//   }
// }



// const store = createStore(reducer);


ReactDOM.render(
  // 通过Provider 组件， 将store 放到了全局组件可以够得到的地方
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
