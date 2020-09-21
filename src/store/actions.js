export {
  initUser,
  updateInfo,
  fetchInfo,
  fetchInitUser,
  fetchUpdateUser,
} from './User/actions';

export {
  fetchAuth,
  fetchAuthAction,
  fetchAuthFailed,
  fetchAuthSuccess,
  fetchAuthClear,
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

export { fetchGetPhotos, fetchAddPhoto } from './Photos/actions';
