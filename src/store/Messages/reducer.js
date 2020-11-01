import {
  INIT_MESSAGES,
  ADD_MESSAGE,
  FETCH_MESSAGE,
} from "./actions";

const fetchMessages = {
  loading: false,
}

const messages = [];

export const messageReducer = (state = messages, action) => {
  switch (action.type) {
    case INIT_MESSAGES:
      return action.payload;
    case ADD_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
}

export const fetchMessageReducer = (state = fetchMessages, action) => {
  switch (action.type) {
    case FETCH_MESSAGE:
      return { loading: true };
    default:
      return state;
  }
}