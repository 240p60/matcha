import { INIT_VISIT_HISTORY, REMOVE_FROM_LIST } from './actions';

const initialState = [];

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_VISIT_HISTORY:
      return action.payload;
    case REMOVE_FROM_LIST:
      return state.filter(item => item.uid !== action.payload);
    default:
      return state;
  }
}
