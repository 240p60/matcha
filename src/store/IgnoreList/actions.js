import { fetchInfoFailed } from '../actions';
export const INIT_IGNORE_LIST = 'INIT_IGNORE_LIST';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';

const initDialogs = (dialogs) => {
  return {
    type: INIT_IGNORE_LIST,
    payload: dialogs
  }
}

const removeUser = (uid) => {
  return {
    type: REMOVE_FROM_LIST,
    payload: uid,
  }
}

export const fetchInitIgnoreList = () => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/user/get/ignored/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    });

    if (res.status === 200) {
      let data = res.json();
      dispatch(initDialogs(data));
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}

export const fetchRemoveFromIgnore = (uid) => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/ignore/unset/', {
      method: 'DELETE',
      body: JSON.stringify({
        'x-auth-token': token,
        otherUid: uid,
      }),
    });

    if (res.status === 200) {
      dispatch(removeUser(uid));
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}