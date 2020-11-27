import { fetchInfoFailed } from '../actions';
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
    let res = await fetch('http://localhost:3000/user/get/friends/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    });

    if (res.status === 200) {
      let data = await res.json();
      dispatch(initDialogs(data));
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}