import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { notification } from 'antd';
import { Context } from '../../Context';
import { fetchDeleteUser, fetchInitUser } from "../../store/actions";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, PictureSlider, Input, Modal } from '../index';
import { mapApiKey } from '../../apikeys.js';
import './UserPage.scss';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export default function UserPage() {
  const url = useParams();
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [passValue, setPassValue] = React.useState('');
  const { user } = React.useContext(Context);
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
    } else {
      notification.error({
        message: 'Error',
        description: getDataRes.statusText,
      });
      setOtherUser(false);
    }
  }, []);

  React.useEffect(() => {
    if (+url.id !== +user.uid) {
      getOtherUser(url.id);
    } else setOtherUser(false)
  }, [url, user, getOtherUser])

  const changePassValue = (name, value) => {
    setPassValue(value);
  };

  const handlerInitUser = React.useCallback(() => {
    dispatch(fetchInitUser(user.uid, sessionStorage.getItem('x-auth-token')));
  }, [dispatch, user.uid]);

  React.useEffect(() => {
    handlerInitUser();
  }, [handlerInitUser]);

  const handlerDeleteUser = React.useCallback((event) => {
    event.preventDefault();
    dispatch(fetchDeleteUser(sessionStorage.getItem('x-auth-token'), passValue));
  }, [dispatch, passValue]);

  return (
    <div className="user-page">
      {deleteModal && (
        <Modal title="Confirm your password">
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
        {!otherUser && (
          <div className="user-page__block">
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
          <Button
            type="button"
            subClass="submit"
            href="/matchs"
            text="Go to Matchs"
          />
        </div>
        )}
      </div>
    </div>
  );
}
