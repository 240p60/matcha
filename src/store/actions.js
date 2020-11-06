export {
  initUser,
  updateInfo,
  fetchInfo,
  fetchInitUser,
  fetchUpdateUser,
  fetchDeleteUser,
} from './User/actions';

export {
  fetchAuth,
  fetchAuthAction,
  fetchAuthFailed,
  fetchAuthSuccess,
  fetchAuthClear,
  fetchLogOut,
} from './Auth/actions';

export {
  fetchSignUp,
  fetchSignUpAction,
  fetchSignUpFailed,
  fetchSignUpSuccess,
  fetchSignUpClear,
} from './SignUp/actions';

export {
  fetchMailAction,
  fetchMailSuccess,
  fetchMailFailed,
  fetchConfirmMail,
} from './Mail/actions';

export {
  fetchInitDialogs
} from './Dialogs/actions';

export {
  openSocket
} from './Socket/actions';

export {
  fetchInitMessages,
  newMessage,
  addMessage,
} from './Messages/actions';

export {
  fetchGetPhotos,
  fetchAddPhoto
} from './Photos/actions';
