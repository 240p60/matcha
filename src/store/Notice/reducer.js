import { 
  ADD_NOTICE, 
  REMOVE_NOTICE, 
  INIT_NOTICES,
  REMOVE_ALL_NOTICES,
} from './actions';

const initialState = [];

export const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_NOTICES:
      return action.payload;
    case ADD_NOTICE:
      return [...state, action.payload];
    case REMOVE_NOTICE:
      return [...state.filter((item) => item.nid !== action.payload)];
    case REMOVE_ALL_NOTICES:
      return [];
    default:
      return state;
  }
}