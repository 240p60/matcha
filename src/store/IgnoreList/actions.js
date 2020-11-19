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
    fetch('http://localhost:3000/user/get/ignored/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    })
    .then((res) => res.json())
    .then((data) => dispatch(initDialogs(data)));
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

    res.status === 200 && dispatch(removeUser(uid));
  }
}