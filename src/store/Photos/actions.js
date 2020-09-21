import { userReducer } from '../User/reducer';
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

export const fetchAddPhoto = (image) => async (dispatch) => {
  dispatch(fetchPhotos());
  const token = sessionStorage.getItem('x-auth-token');
  if (token) {
    console.log(image);
    let response = await fetch('http://localhost:3000/photo/upload/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
        src: image,
      }),
    });

    if (response.status !== 200) {
      alert('Что-то пошло не так');
    } else alert('Фото успешно загружено');
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
      dispatch(fetchPhotosSuccess('Фотографии успешно загружены'));
      dispatch(initPhotos(photos.map((item) => item.src)));
    } else {
      dispatch(fetchPhotosFailed('Что-то пошло не так'));
    }
  }
};
