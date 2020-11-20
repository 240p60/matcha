export {
  initUser,
  updateInfo,
  fetchInfo,
  clearInfo,
  fetchInitUser,
  fetchUpdateUser,
  fetchDeleteUser,
  fetchInfoFailed,
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
  fetchInitIgnoreList,
  fetchRemoveFromIgnore,
} from './IgnoreList/actions';

export {
  fetchInitBlackList,
  fetchRemoveFromBlackList,
} from './BlackList/actions';

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
  fetchAddPhoto,
  fetchDeletePhoto
} from './Photos/actions';

export {
  addNotice,
  removeNotice,
  fetchRemoveNotice,
  fetchInitNotices
} from './Notice/actions';
