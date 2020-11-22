import { INIT_GUESTS_LIST, REMOVE_FROM_LIST } from './actions';

const initialState = [];

export const guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_GUESTS_LIST:
      return action.payload;
    case REMOVE_FROM_LIST:
      return state.filter(item => item.uid !== action.payload);
    default:
      return state;
  }
}
