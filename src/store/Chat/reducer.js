import { ADD_MESSAGE, GET_MESSAGES } from './actions';

const initialState = [];

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload.data];
    case GET_MESSAGES:
      return [...action.payload.data];
    default:
      return state;
  }
}
