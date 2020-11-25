import { fetchInfoFailed } from '../actions';
import {notification} from "antd";

export const INIT_MESSAGES = 'INIT_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const NEW_MESSAGE = 'NEW_MESSAGE';

const initMessages = (data) => {
  return {
    type: INIT_MESSAGES,
    payload: data,
  }
}

export const addMessage = (data) => {
  return {
    type: ADD_MESSAGE,
    payload: data,
  }
}

const fetchMessages = () => {
  return {
    type: FETCH_MESSAGE,
  }
}

export const newMessage = (receiver) => {
  return {
    type: NEW_MESSAGE,
    payload: receiver,
  }
}

export const fetchInitMessages = (receiver) => async (dispatch) => {
  let token = sessionStorage.getItem('x-auth-token');
  dispatch(fetchMessages());
  if (token) {
    let response = await fetch('http://localhost:3000/message/get/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        'x-auth-token': token,
        'otherUid': receiver,
      }),
    });

    if (response.status === 202) dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    else if (response.ok) dispatch(initMessages(await response.json()));
    else notification.error({
      message: 'Something went wrong',
    });
  }
}