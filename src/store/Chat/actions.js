import { wsConnect } from "../../wsConnect";

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';

const addMessage = (uidRecevier, message) => {
  return {
    type: ADD_MESSAGE,
    payload: {
      uidRecevier: uidRecevier,
      message: message,
    }
  }
}

const getMessages = (uidRecevier) => {
  return {
    type: GET_MESSAGES,
    payload: uidRecevier,
  }
}

export const sendMessage = (uidRecevier, message) => async (dispatch) => {
  const token = sessionStorage.getItem('ws-auth-token');
  token && wsConnect(uidRecevier, token);
}