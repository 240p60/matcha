import { fetchInfoFailed } from '../actions';
export const INIT_VISIT_HISTORY = 'INIT_VISIT_HISTORY';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';

const initDialogs = (dialogs) => {
  return {
    type: INIT_VISIT_HISTORY,
    payload: dialogs
  }
}

export const fetchInitHistory = () => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/history/myViews/', {
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