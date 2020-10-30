import { combineReducers } from 'redux';
import authReducer from './Auth/reducer';
import signUpReducer from './SignUp/reducer';
import mailReducer from './Mail/reducer';
import { userReducer, fetchUserReducer } from './User/reducer';
import { photosReducer, fetchPhotosReducer } from './Photos/reducer';
import { dialogsReducer } from './Dialogs/reducer';
import { socketReducer } from './Socket/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  fetchUser: fetchUserReducer,
  auth: authReducer,
  signUp: signUpReducer,
  mail: mailReducer,
  photos: photosReducer,
  dialogs: dialogsReducer,
  socket: socketReducer,
  fetchPhotos: fetchPhotosReducer,
});

export default rootReducer;
