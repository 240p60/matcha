import { fetchInfoFailed } from '../actions';
import { notification } from 'antd';
export const FETCH_PHOTOS = 'FETCH_PHOTOS';
export const FETCH_PHOTOS_FAILED = 'FETCH_PHOTOS_FAILED';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const INIT_PHOTOS = 'INIT_PHOTOS';

export const fetchPhotos = () => {
  return {
    type: FETCH_PHOTOS,
  };
};

export const fetchPhotosFailed = (status) => {
  return {
    type: FETCH_PHOTOS_FAILED,
    payload: status,
  };
};

export const fetchPhotosSuccess = (status) => {
  return {
    type: FETCH_PHOTOS_SUCCESS,
    payload: status,
  };
};

export const initPhotos = (data) => {
  return {
    type: INIT_PHOTOS,
    payload: data,
  };
};

export const fetchAddPhoto = (uid, image) => async (dispatch) => {
  dispatch(fetchPhotos());
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let response = await fetch('http://localhost:3000/photo/upload/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
        src: image,
      }),
    });

    if (response.status !== 200) {
      notification.error({
        message: 'Failed to upload photo',
      });
    } else {
      notification.success({
        message: 'Photo uploaded successfully',
      });
      dispatch(fetchGetPhotos(uid));
    }
  }
};

export const fetchGetPhotos = (uid) => async (dispatch) => {
  dispatch(fetchPhotos());
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    let response = await fetch('http://localhost:3000/photo/download/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        'x-auth-token': token,
        uid: uid,
      }),
    });

    if (response.status === 200) {
      const photos = await response.json();
      dispatch(initPhotos({ uid: uid, photos: photos.map((item) => item) }));
    } else if (response.status === 401) if (response.status === 401) dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
     else notification.error({
        message: 'Failed to upload photo',
      });
  }
};
//Посмотри pid, который присваивается при добавлении фото