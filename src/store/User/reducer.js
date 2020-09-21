import {
  INIT_USER,
  UPDATE_INFO,
  FETCH_INFO,
  FETCH_INFO_FAILED,
  FETCH_INFO_SUCCESS,
  FETCH_INFO_CLEAR,
} from './actions';

const initialState = {
  file: [],
  fname: '',
  lname: '',
  birth: '2000-01-01',
  gender: 'male',
  orientation: 'hetero',
  interests: [],
  bio: '',
  longitude: 0,
  latitude: 0,
};

const fetchInitialState = {
  error: false,
  success: false,
  isLoading: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_USER:
      return {
        ...action.payload.data,
      };
    case UPDATE_INFO:
      return {
        ...action.payload.data,
      };
    default:
      return state;
  }
};

export const fetchUserReducer = (state = fetchInitialState, action) => {
  switch (action.type) {
    case FETCH_INFO:
      return {
        ...state,
        error: false,
        success: false,
        isLoading: 'Загружаем информацию',
      };
    case FETCH_INFO_FAILED:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case FETCH_INFO_SUCCESS:
      return {
        ...state,
        error: false,
        success: true,
        isLoading: false,
      };
    case FETCH_INFO_CLEAR:
      return {
        ...state,
        error: false,
        success: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
