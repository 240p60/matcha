import { INIT_BLACK_LIST, REMOVE_FROM_LIST } from './actions';

const initialState = [];

export const blackListReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BLACK_LIST:
      return action.payload;
    case REMOVE_FROM_LIST:
      return state.filter(item => item.uid !== action.payload);
    default:
      return state;
  }
}
