import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { notification } from 'antd';
import classNames from 'classnames';
import { Context } from '../../Context';
import { fetchDeleteUser, fetchUpdateUser, fetchInfoFailed, fetchLogOut } from "../../store/actions";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, PictureSlider, Input, Modal } from '../index';
import { default as Menu } from './Menu';
import { mapApiKey } from '../../apikeys.js';
import Close from '../../assets/img/close.svg';
import Heart from '../../assets/img/heart.svg';
import './UserPage.scss';
import styles from './UserPage.module.scss';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export default function UserPage() {
  const url = useParams();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [changeMailModal, setChangeMailModal] = React.useState(false);
  const [changePassModal, setChangePassModal] = React.useState(false);
  const [passValue, setPassValue] = React.useState('');
  const [newPassValue, setNewPassValue] =React.useState('');
  const [curMail, setCurMail] = React.useState('');
  const [newMail, setNewMail] = React.useState('');
  const { user, photos } = React.useContext(Context);
  const [otherUser, setOtherUser] = React.useState(false);

  const getOtherUser = React.useCallback(async (uid) => {
    let getDataRes = await fetch('http://localhost:3000/user/get/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
        'otherUid': parseInt(uid),
      }),
    });

    if (getDataRes.status === 200) {
      const data = await getDataRes.json();
      setOtherUser(data);
    } else if (getDataRes.status === 202) {
      dispatch(fetchInfoFailed({error: 'Unauthorized'}));
      dispatch(fetchLogOut());
    } else {
      notification.error({
        message: 'Error',
        description: getDataRes.statusText,
      });
      setOtherUser(false);
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (user.uid) {
      if (+url.id !== +user.uid) {
        getOtherUser(url.id);
      } else setOtherUser(false);
    }
  }, [url, user, getOtherUser]);

  const setLike = (uid) => {
    fetch('http://localhost:3000/like/set/', {
      method: 'PUT',
      body: JSON.stringify({
        otherUid: uid,
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      })
    }).then(res => {
      if (res.status === 200) {
        getOtherUser(url.id);
        notification.success({
          message: 'Succes Updated',
          description: `${otherUser.fname} ${otherUser.lname} has been successfully liked`,
        });
      }
    });
  }

  const unsetLike = (uid) => {
    fetch('http://localhost:3000/like/unset/', {
      method: 'DELETE',
      body: JSON.stringify({
        otherUid: uid,
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      })
    }).then(res => {
      if (res.status === 200) {
        getOtherUser(url.id);
        notification.success({
          message: 'Succes Updated',
          description: `${otherUser.fname} ${otherUser.lname} has been successfully unliked`,
        });
      }
    });
  }

  const changePassValue = (name, value) => {
    setPassValue(value);
  };

  const changeNewPassValue = (name, value) => {
    setNewPassValue(value);
  };

  const changeCurMail = (name, value) => {
    setCurMail(value);
  };

  const changeNewMail = (name, value) => {
    setNewMail(value);
  };

  const handlerDeleteUser = React.useCallback((event) => {
    event.preventDefault();
    dispatch(fetchDeleteUser(sessionStorage.getItem('x-auth-token'), passValue));
  }, [dispatch, passValue]);

  const handlerChangeData = React.useCallback((event, name) => {
    event.preventDefault();
    const breakAction = (error) => {
      notification.error({
        message: error,
      });
    }
    if (name === 'new_mail') {
      !(/^(\w.+)@(\w+)\.(\w+)$/.test(newMail)) && breakAction('Mail has unexpected symbols');
      curMail !== user.mail && breakAction('Wrong current mail');
      /^(\w.+)@(\w+)\.(\w+)$/.test(newMail) && curMail === user.mail && dispatch(fetchUpdateUser({ uid: user.uid, mail: newMail }));
    } else if (name === 'new_pass') {
      !(/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])[a-z0-9A-Z$&+,:;=?@#|'<>.-^*()%!-]{6,14}$/.test(newPassValue)) && breakAction('Password has unexpected symbols');
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])[a-z0-9A-Z$&+,:;=?@#|'<>.-^*()%!-]{6,14}$/.test(newPassValue) && dispatch(fetchUpdateUser({ uid: user.uid, pass: newPassValue }));
    }
    closeModal();
  }, [dispatch, curMail, newMail, newPassValue, user.mail, user.uid]);

  const closeModal = () => {
    setDeleteModal(false);
    setChangeMailModal(false);
    setChangePassModal(false);
    setCurMail('');
    setNewMail('');
    setPassValue('');
    setNewPassValue('');
  }

  const handlerMenu = (option) => {
    switch (option) {
      case 'Change mail':
        setChangeMailModal(true);
        break;
      case 'Change password':
        setChangePassModal(true);
        break;
      default:
        return null;
    }
  }

  const setInIgnoreList = async () => {
    let getDataRes = await fetch('http://localhost:3000/ignore/set/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
        'otherUid': parseInt(otherUser.uid),
      }),
    });

    if (getDataRes.status === 200) {
      getOtherUser(url.id);
      notification.success({
        message: `${otherUser.fname} ${otherUser.lname} added to ignore list`,
      });
    } else if (getDataRes.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }

  const removeFromIgnoreList = async () => {
    let getDataRes = await fetch('http://localhost:3000/ignore/unset/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
        'otherUid': parseInt(otherUser.uid),
      }),
    });

    if (getDataRes.status === 200) {
      getOtherUser(url.id);
      notification.success({
        message: `${otherUser.fname} ${otherUser.lname} removed from ignore list`,
      });
    } else if (getDataRes.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }

  const setInBlackList = async () => {
    let getDataRes = await fetch('http://localhost:3000/claim/set/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
        'otherUid': parseInt(otherUser.uid),
      }),
    });

    if (getDataRes.status === 200) {
      getOtherUser(url.id);
      notification.success({
        message: `${otherUser.fname} ${otherUser.lname} added to black list`,
      });
    } else if (getDataRes.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }

  const removeFromBlackList = async () => {
    let getDataRes = await fetch('http://localhost:3000/claim/unset/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
        'otherUid': parseInt(otherUser.uid),
      }),
    });

    if (getDataRes.status === 200) {
      getOtherUser(url.id);
      notification.success({
        message: `${otherUser.fname} ${otherUser.lname} removed from black list`,
      });
    } else if (getDataRes.status === 202) {
      dispatch(fetchInfoFailed({ error: 'Unauthorized' }));
    }
  }

  return (
    <div className="user-page">
      {deleteModal && (
        <Modal title="Confirm your password" onClose={closeModal}>
          <Input
            name='Password'
            input={{ name: 'Password', value: passValue, type: 'password' }}
            onChange={changePassValue}
          />
          <Button
            type="submit"
            subClass="delete-action"
            text="Delete Profile"
            onClick={handlerDeleteUser}
          />
        </Modal>
      )}
      {changeMailModal && (
        <Modal title="Change your mail" onClose={closeModal}>
          <Input
            name='Current mail'
            input={{ name: 'Current mail', value: curMail, type: 'mail' }}
            onChange={changeCurMail}
          />
          <Input
            name='New mail'
            input={{ name: 'New mail', value: newMail, type: 'mail' }}
            onChange={changeNewMail}
          />
          <Button
            type="submit"
            name="changeMail-action"
            subClass="submit"
            text="Change Mail"
            onClick={(event) => handlerChangeData(event, 'new_mail')}
          />
        </Modal>
      )}
      {changePassModal && (
        <Modal title="Change your password" onClose={closeModal}>
          <Input
            name='New password'
            input={{ name: 'New password', value: newPassValue, type: 'password' }}
            onChange={changeNewPassValue}
          />
          <Button
            type="submit"
            name="changePass-action"
            subClass="submit"
            text="Change Password"
            onClick={(event) => handlerChangeData(event, 'new_pass')}
          />
        </Modal>
      )}
      {!otherUser && <Menu onClick={handlerMenu} />}
      <div className="user-page__photo">
        <PictureSlider volatile={false} uid={otherUser.uid || user.uid} />
      </div>
      <div className="user-page__info">
        <div className="user-page__main-info user-page__block">
          <span className="user-page__main-info_name">{`${otherUser.fname || user.fname} ${otherUser.lname || user.lname}, `}</span>
          <span className="user-page__main-info_years">{`${otherUser.age || user.age}`}</span>
        </div>
        <div className="user-page__gender user-page__flex">
          <div className="user-page__title">Gender</div>
          <div className="user-page__description user-page__sex">
            {otherUser.gender || user.gender}
          </div>
        </div>
        <div className="user-page__orientation user-page__flex">
          <div className="user-page__title">Sex Preference</div>
          <div className="user-page__description user-page__sex">
            {otherUser.orientation || user.orientation}
          </div>
        </div>
        <div className="user-page__interests user-page__block">
          <div className="user-page__title">Interests</div>
          <div className="user-page__description">
            {otherUser.interests ? otherUser.interests.join(', ') : user.interests.join(', ')}
          </div>
        </div>
        <div className="user-page__bio user-page__block">
          <div className="user-page__title">About me</div>
          <div className="user-page__description">{otherUser.bio || user.bio}</div>
        </div>
        <div className="user-page__location user-page__block">
          <div className="user-page__title">Location</div>
          <div className="user-page__map">
            <LoadScript googleMapsApiKey={mapApiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{
                  lat: +otherUser.latitude || +user.latitude,
                  lng: +otherUser.longitude || +user.longitude,
                }}
                zoom={11}
              >
                <Marker
                  position={{
                    lat: +otherUser.latitude || +user.latitude,
                    lng: +otherUser.longitude || +user.longitude,
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <div className="user-page__block">
          {!otherUser && (
            <>
              <Button
                type="button"
                subClass="delete-action"
                text="Delete Profile"
                onClick={() => setDeleteModal(true)}
              />
              <Button
                type="button"
                subClass="change-action"
                href="/profile"
                text="Change Information"
              />
              {(user.fname !== '' && (Array.isArray(photos[user.uid]) && !!photos[user.uid].length)) && (
                <Button
                  type="button"
                  subClass="submit"
                  href="/matchs"
                  text="Go to Matchs"
                />
              )}
            </>
          )}
          {otherUser && (
            <>
              {otherUser.isIgnored ? (
                <Button
                  type="button"
                  subClass="ignore-action"
                  text="Remove from Ignore List"
                  onClick={() => removeFromIgnoreList()}
                />
              ) : (
                <Button
                  type="button"
                  subClass="ignore-action"
                  text="Add to Ignore List"
                  onClick={() => setInIgnoreList()}
                />
              )}
              {otherUser.isClaimed ? (
                <Button
                  type="button"
                  subClass="delete-action"
                  text="Remove from Black List"
                  onClick={() => removeFromBlackList()}
                />
              ) : (
                <Button
                  type="button"
                  subClass="delete-action"
                  text="Add to Black List"
                  onClick={() => setInBlackList()}
                />
              )}
              <div className={styles.itemActions}>
                {otherUser.isLiked ? <div className={classNames(styles.itemDislike, 'dislike')} onClick={() => unsetLike(otherUser.uid)}>
                  <img src={Close} alt="dislike" />
                </div> : <div className={classNames(styles.itemLike, 'like')} onClick={() => setLike(otherUser.uid)}>
                  <img src={Heart} alt="like" />
                </div>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
