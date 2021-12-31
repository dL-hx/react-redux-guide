// as 起别名
import { handleActions as createReducer } from "redux-actions";

import { addCount_Action, minusCount_Action } from "../actions/counter.actions";

const initialState = { count: 0 };

const handleIncrement = (state, actions) => ({
  ...state,
  // count: state.count + 1,
  count: state.count + actions.payload,
});

const handleDecrement = (state, actions) => ({
  ...state,
  // count: state.count - 1,
  count: state.count - actions.payload,
});

const counterReducer = createReducer(
  {
    [addCount_Action]: handleIncrement,

    [minusCount_Action]: handleDecrement,
  },
  initialState
);

export default counterReducer;

/* import { INCREMENT, DECREMENT } from "../const/counter.const";

const initialState = {
  count: 0,
};

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case INCREMENT: // 数值 + 1 ,返回一个新对象
      return {
        ...state,
        // count: state.count + 1,
        count: state.count + actions.payload,
      };

    case DECREMENT:
      return {
        ...state,
        // count: state.count - 1,
        count: state.count - actions.payload,
      };

    default:
      return state;
  }
}

export default reducer;
 */
