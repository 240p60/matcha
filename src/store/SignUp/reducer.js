import {
  FETCH_SIGNUP,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FAILED,
  FETCH_SIGNUP_CLEAR,
} from './actions';

const initialState = {
  success: false,
  status: false,
  error: false,
  isLoading: false,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SIGNUP:
      return {
        ...state,
        success: action.payload.success,
        isLoading: action.payload.loading,
      };
    case FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        success: true,
        status: false,
        error: false,
        isLoading: false,
      };
    case FETCH_SIGNUP_FAILED:
      return {
        ...state,
        status: action.payload.status,
        error: action.payload.error,
        isLoading: false,
      };
    case FETCH_SIGNUP_CLEAR:
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

export default signUpReducer;
