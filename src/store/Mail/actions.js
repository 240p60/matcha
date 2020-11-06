import { fetchAuthClear, fetchSignUpClear } from '../actions';
import { notification } from 'antd';

export const FETCH_MAIL = 'FETCH_MAIL';
export const FETCH_MAIL_SUCCESS = 'FETCH_MAIL_SUCCESS';
export const FETCH_MAIL_FAILED = 'FETCH_MAIL_FAILED';

export const fetchMailAction = (text, success = false) => {
  return {
    type: FETCH_MAIL,
    payload: { loading: text, success: success },
  };
};

export const fetchMailSuccess = (text = false) => {
  return {
    type: FETCH_MAIL_SUCCESS,
    payload: { status: text },
  };
};

export const fetchMailFailed = (text, status = 400) => {
  return {
    type: FETCH_MAIL_FAILED,
    payload: { error: text, status: status },
  };
};

export const fetchConfirmMail = (text, token) => (dispatch) => {
  dispatch(fetchAuthClear());
  dispatch(fetchSignUpClear());
  dispatch(fetchMailAction(text));
  fetch('http://localhost:3000/user/update/status/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      'x-reg-token': token,
    }),
  }).then((res) => {
    if (res.status !== 200) {
      dispatch(fetchMailFailed(`Something went wrong: ${res.status} - ${res.statusText}`));
      notification.error({
        message: `Something went wrong: ${res.status} - ${res.statusText}`,
      });
    } else {
      dispatch(fetchMailSuccess('Почта подтверждена. Пожалуйста, совершите вход'));
      notification.success({
        message: 'Почта подтверждена. Пожалуйста, совершите вход',
      });
    }
  });
};
