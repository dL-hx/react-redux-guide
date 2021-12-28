import { INCREMENT, DECREMENT } from "../const/counter.const";
import { SHOW_MODAL, HIDE_MODAL } from "../const/modal.const";

const initialState = {
  count: 0,
  show: false,
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

    case SHOW_MODAL:
      return {
        ...state,
        show: true,
      };

    case HIDE_MODAL:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
}

export default reducer;
