import { INIT_FOLLOWERS_LIST } from './actions';

const initialState = [];

export const followersReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_FOLLOWERS_LIST:
      return action.payload;
    default:
      return state;
  }
}
