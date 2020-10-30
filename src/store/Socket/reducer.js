import { INIT_SOCKET } from './actions';

const initialState = false;

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SOCKET:
      return action.payload;
    default:
      return state;
  }
}
