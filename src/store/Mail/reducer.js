import { FETCH_MAIL, FETCH_MAIL_SUCCESS, FETCH_MAIL_FAILED } from './actions';

const initialState = {
  success: false,
  status: false,
  error: false,
  isLoading: false,
};

const mailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAIL:
      return {
        ...state,
        success: action.payload.success,
        isLoading: action.payload.loading,
      };
    case FETCH_MAIL_SUCCESS:
      return {
        ...state,
        success: true,
        status: action.payload.status,
        error: false,
        isLoading: false,
      };
    case FETCH_MAIL_FAILED:
      return {
        ...state,
        status: action.payload.status,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default mailReducer;
