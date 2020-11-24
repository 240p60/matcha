import { fetchInfoFailed } from '../actions';
export const ADD_NOTICE = 'ADD_NOTICE';
export const REMOVE_NOTICE = 'REMOVE_NOTICE';
export const REMOVE_ALL_NOTICES = 'REMOVE_ALL_NOTICES';
export const INIT_NOTICES = 'INIT_NOTICES';

export const addNotice = (notice) => {
  return {
    type: ADD_NOTICE,
    payload: notice,
  }
}

export const removeNotice = (index) => {
  return {
    type: REMOVE_NOTICE,
    payload: index,
  }
}

export const removeAllNotices = () => {
  return {
    type: REMOVE_ALL_NOTICES,
  }
}


export const initNotices = (data) => {
  return {
    type: INIT_NOTICES,
    payload: data,
  }
}


export const fetchInitNotices = () => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/notification/get/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    });

    if (res.status === 200) {
      let data = await res.json();
      dispatch(initNotices(data.reverse()));
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}

export const fetchRemoveNotice = (nid) => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/notification/delete/', {
      method: 'DELETE',
      body: JSON.stringify({
        'x-auth-token': token,
        nid: nid,
      }),
    });

    if (res.status === 200) {
      dispatch(removeNotice(nid));
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}

export const fetchRemoveAllNotices = () => async (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let res = await fetch('http://localhost:3000/notification/delete/all/', {
      method: 'DELETE',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    });

    if (res.status === 200) {
      dispatch(removeAllNotices());
    } else if (res.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }
}