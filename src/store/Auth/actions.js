import { fetchMailFailed, fetchSignUpClear, fetchInitUser, clearInfo, openSocket, fetchInitDialogs } from '../actions';
import { notification } from 'antd';

export const FETCH_AUTH = 'FETCH_AUTH';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILED = 'FETCH_AUTH_FAILED';
export const FETCH_AUTH_CLEAR = 'FETCH_AUTH_CLEAR';

export const fetchAuthAction = (text, success = false) => {
  return {
    type: FETCH_AUTH,
    payload: { loading: text, success: success },
  };
};

export const fetchAuthSuccess = (text = false) => {
  return {
    type: FETCH_AUTH_SUCCESS,
    payload: { status: text },
  };
};

export const fetchAuthFailed = (text, status = 400) => {
  return {
    type: FETCH_AUTH_FAILED,
    payload: { error: text, status: status },
  };
};

export const fetchAuthClear = () => {
  return {
    type: FETCH_AUTH_CLEAR,
  };
};

export const fetchAuth = (mail, password, loadingText) => async (dispatch) => {
  dispatch(fetchAuthClear());
  dispatch(fetchSignUpClear());
  dispatch(fetchAuthAction(loadingText));
  let response = await fetch('http://localhost:3000/user/auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mail: mail,
      pass: password,
    }),
  });

  if (response.status === 401) {
    dispatch(fetchAuthFailed("User don't confirm mail", 401));
    dispatch(fetchMailFailed("User don't confirm mail", 401));
    notification.error({
      message: "User don't confirm mail",
    });
  } else if (response.status === 422) {
    dispatch(fetchAuthFailed('Wrong mail or password', 422));
    notification.error({
      message: 'Wrong mail or password',
    });
  } else if (!response.ok) {
    throw Error(response.statusText);
  } else {
    let data = await response.json();
    sessionStorage.setItem('x-auth-token', data['x-auth-token']);
    dispatch(fetchInitUser(data.uid, data['x-auth-token']));
    dispatch(openSocket(data.uid, data['x-auth-token']));
    dispatch(fetchInitDialogs());
    setTimeout(() => {
      dispatch(fetchAuthSuccess());
    }, 2000);
  }
};

export const fetchLogOut = () => async (dispatch) => {
  dispatch(fetchAuthClear());
  dispatch(fetchSignUpClear());
  dispatch(clearInfo());
  sessionStorage.removeItem('x-auth-token');
  sessionStorage.removeItem('ws-auth-token');
  localStorage.removeItem('user');
}