import { SHOW_MODAL, HIDE_MODAL } from "../const/modal.const";

const initialState = {
  show: false,
};


export default (state = initialState, actions) => {
    switch (actions.type) {
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
  };
