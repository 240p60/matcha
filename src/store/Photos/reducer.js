import {
  FETCH_PHOTOS,
  FETCH_PHOTOS_FAILED,
  FETCH_PHOTOS_SUCCESS,
  INIT_PHOTOS,
} from './actions';

const initialState = {};

const fetchState = {
  loading: false,
  status: false,
  success: false,
  error: false,
};

export const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PHOTOS:
      return { ...state, [action.payload.uid]: [...action.payload.photos] };
    default:
      return state;
  }
};

export const fetchPhotosReducer = (state = fetchState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        ...state,
        loading: 'Загружаем информацию',
        status: false,
        success: false,
        error: false,
      };
    case FETCH_PHOTOS_FAILED:
      return {
        ...state,
        loading: false,
        status: action.payload,
        error: true,
      };
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload,
        success: true,
      };
    default:
      return state;
  }
};
