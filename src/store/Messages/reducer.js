import {
  INIT_MESSAGES,
  ADD_MESSAGE,
  FETCH_MESSAGE,
  NEW_MESSAGE,
} from "./actions";

const fetchMessages = {
  loading: false,
  newMessage: false
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

export const fetchMessagesReducer = (state = fetchMessages, action) => {
  switch (action.type) {
    case FETCH_MESSAGE:
      return { ...state, loading: true };
      case NEW_MESSAGE:
        return { ...state, newMessage: action.payload };
    default:
      return state;
  }
}