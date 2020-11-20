export const ADD_NOTICE = 'ADD_NOTICE';
export const REMOVE_NOTICE = 'REMOVE_NOTICE';
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

export const initNotices = (data) => {
  return {
    type: INIT_NOTICES,
    payload: data,
  }
}


export const fetchInitNotices = () => (dispatch) => {
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    fetch('http://localhost:3000/notification/get/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(initNotices(data)));
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
    }
  }
}