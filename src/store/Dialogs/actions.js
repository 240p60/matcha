export const INIT_DIALOGS = 'INIT_DIALOGS';

const initDialogs = (dialogs) => {
  return {
    type: INIT_DIALOGS,
    payload: dialogs
  }
}

export const fetchInitDialogs = () => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    fetch('http://localhost:3000/user/get/friends/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(initDialogs(data)));
  }
}