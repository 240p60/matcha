import { INIT_SOCKET, CLOSE_SOCKET } from './actions';

const initialState = false;

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_SOCKET:
      return action.payload;
    case CLOSE_SOCKET:
      return false;
    default:
      return state;
  }
}
