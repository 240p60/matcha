import { fetchInfoFailed } from '../actions';
export const INIT_FOLLOWERS_LIST = 'INIT_FOLLOWERS_LIST';

const initFollowers = (dialogs) => {
  return {
    type: INIT_FOLLOWERS_LIST,
    payload: dialogs
  }
}

export const fetchInitFollowers = () => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/user/get/likedMe/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    });

    if (res.status === 200) {
      let data = await res.json();
      dispatch(initFollowers(data));
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}