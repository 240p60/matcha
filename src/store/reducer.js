import { combineReducers } from 'redux';
import authReducer from './Auth/reducer';
import signUpReducer from './SignUp/reducer';
import mailReducer from './Mail/reducer';
import { userReducer, fetchUserReducer } from './User/reducer';
import { photosReducer, fetchPhotosReducer } from './Photos/reducer';
import { dialogsReducer } from './Dialogs/reducer';
import { ignorsReducer } from './IgnoreList/reducer';
import { blackListReducer } from './BlackList/reducer';
import { messageReducer, fetchMessagesReducer } from './Messages/reducer';
import { socketReducer } from './Socket/reducer';
import { noticeReducer } from './Notice/reducer';
import { historyReducer } from './History/reducer';
import { guestsReducer } from './Guests/reducer';
import { followersReducer } from './Followers/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  fetchUser: fetchUserReducer,
  auth: authReducer,
  signUp: signUpReducer,
  mail: mailReducer,
  photos: photosReducer,
  dialogs: dialogsReducer,
  ignoreList: ignorsReducer,
  blackList: blackListReducer,
  messages: messageReducer,
  fetchMessages: fetchMessagesReducer,
  socket: socketReducer,
  notice: noticeReducer,
  fetchPhotos: fetchPhotosReducer,
  history: historyReducer,
  guests: guestsReducer,
  followers: followersReducer,
});

export default rootReducer;
