import {fetchAuthFailed, fetchLogOut} from '../actions';
import { notification } from 'antd';

export const UPDATE_INFO = 'UPDATE_INFO';
export const FETCH_INFO = 'FETCH_INFO';
export const INIT_USER = 'INIT_USER';
export const INIT_NEW_USER = 'INIT_NEW_USER';
export const FETCH_INFO_FAILED = 'FETCH_INFO_FAILED';
export const FETCH_INFO_SUCCESS = 'FETCH_INFO_SUCCESS';
export const FETCH_INFO_CLEAR = 'FETCH_INFO_CLEAR';

export const updateInfo = (data) => {
  return {
    type: UPDATE_INFO,
    payload: {
      data: data,
    },
  };
};

export const initUser = (data) => {
  return {
    type: INIT_USER,
    payload: {
      data: data,
    },
  };
};

export const initNewUser = (uid) => {
  return {
    type: INIT_NEW_USER,
    payload: uid,
  };
};

export const fetchInfo = () => {
  return {
    type: FETCH_INFO,
  };
};

export const fetchInfoFailed = (data) => {
  return {
    type: FETCH_INFO_FAILED,
    payload: {
      error: data.error,
    },
  };
};

export const fetchInfoSuccess = () => {
  return {
    type: FETCH_INFO_SUCCESS,
  };
};

export const fetchInfoClear = () => {
  return {
    type: FETCH_INFO_CLEAR,
  };
};

export const fetchDeleteUser = (token, password) => async (dispatch) => {
  dispatch(fetchInfo());
  if (token) {
    let res = await fetch('http://localhost:3000/user/delete/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'pass': password,
        'x-auth-token': token,
      }),
    });

    if (res.status === 200) {
      dispatch(fetchInfoFailed({error: 'Unauthorized'}));
      dispatch(fetchLogOut());
    }
  }
};

export const fetchInitUser = (token) => async (dispatch) => {
  dispatch(fetchInfo());
  if (token) {
    let getDataRes = await fetch('http://localhost:3000/user/get/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': token,
      }),
    });

    if (getDataRes.status === 200) {
      const data = await getDataRes.json();
      if (data.fname !== '') dispatch(initUser(data));
      else dispatch(initNewUser(data.uid));
      dispatch(fetchInfoSuccess());
    } else if (getDataRes.status === 401) {
      dispatch(fetchInfoFailed({ error: getDataRes.statusText }));
      dispatch(fetchLogOut());
    }
  }
};

export const fetchUpdateUser = ({
  fname,
  lname,
  birth,
  gender,
  orientation,
  interests,
  bio,
  avaID,
  latitude,
  longitude,
}) => async (dispatch) => {
  dispatch(fetchInfo());
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let response = await fetch('http://localhost:3000/user/update/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        'x-auth-token': token,
        fname: fname,
        lname: lname,
        birth: birth,
        gender: gender,
        orientation: orientation,
        interests: interests,
        bio: bio,
        avaID: avaID,
        latitude: latitude,
        longitude: longitude,
      }),
    });

    if (response.status === 202) {
      dispatch(fetchAuthFailed("User don't confirm mail", 401));
    } else if (response.status === 401) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    } else if (!response.ok) {
      throw Error(response.statusText);
    } else {
      dispatch(fetchInitUser());
      dispatch(fetchInfoSuccess());
      notification.success({
        message: 'Succes Updated',
        description: 'Information has been successfully updated',
      });
    }
  }
};
