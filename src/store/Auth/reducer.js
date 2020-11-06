import {
  FETCH_AUTH,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILED,
  FETCH_AUTH_CLEAR,
} from './actions';

const initialState = {
  success: false,
  status: false,
  error: false,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTH:
      return {
        ...state,
        success: action.payload.success,
        isLoading: action.payload.loading,
      };
    case FETCH_AUTH_SUCCESS:
      return {
        ...state,
        success: true,
        status: action.payload.status,
        error: false,
        isLoading: false,
      };
    case FETCH_AUTH_FAILED:
      return {
        ...state,
        status: action.payload.status,
        error: action.payload.error,
        isLoading: false,
      };
    case FETCH_AUTH_CLEAR:
      return {
        ...state,
        success: false,
        status: false,
        error: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
