import { INIT_DIALOGS } from './actions';

const initialState = [];

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DIALOGS:
      return action.payload;
    default:
      return state;
  }
}
