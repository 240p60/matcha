import { fetchInfoFailed } from '../actions';
export const INIT_BLACK_LIST = 'INIT_BLACK_LIST';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';

const initDialogs = (dialogs) => {
  return {
    type: INIT_BLACK_LIST,
    payload: dialogs
  }
}

const removeUser = (uid) => {
  return {
    type: REMOVE_FROM_LIST,
    payload: uid,
  }
}

export const fetchInitBlackList = () => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/user/get/claimed/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    })

    if (res.status === 200) {
      let data = await res.json();
      dispatch(initDialogs(data))
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}

export const fetchRemoveFromBlackList = (uid) => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/claim/unset/', {
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