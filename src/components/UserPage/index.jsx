import React from 'react';
import { useDispatch } from "react-redux";
import { Context } from '../../Context';
import { fetchDeleteUser } from "../../store/actions";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, PictureSlider, Input, Modal } from '../index';

import './UserPage.scss';
import { mapApiKey } from '../../apikeys.js';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export default function UserPage() {
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [passValue, setPassValue] = React.useState('');
  const { user } = React.useContext(Context);
  const dispatch = useDispatch();

  const changePassValue = (name, value) => {
    setPassValue(value);
  };

  const handlerDeleteUser = React.useCallback(() => {
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
            type="button"
            subClass="delete-action"
            text="Delete Profile"
            onClick={handlerDeleteUser}
          />

        </Modal>
      )}
      <div className="user-page__photo">
        <PictureSlider volatile={false} uid={user.uid} />
      </div>
      <div className="user-page__info">
        <div className="user-page__main-info user-page__block">
          <span className="user-page__main-info_name">{`${user.fname} ${user.lname}, `}</span>
          <span className="user-page__main-info_years">{`${user.age}`}</span>
        </div>
        <div className="user-page__gender user-page__flex">
          <div className="user-page__title">Gender</div>
          <div className="user-page__description user-page__sex">
            {user.gender}
          </div>
        </div>
        <div className="user-page__orientation user-page__flex">
          <div className="user-page__title">Sex Preference</div>
          <div className="user-page__description user-page__sex">
            {user.orientation}
          </div>
        </div>
        <div className="user-page__interests user-page__block">
          <div className="user-page__title">Interests</div>
          <div className="user-page__description">
            {user.interests.join(', ')}
          </div>
        </div>
        <div className="user-page__bio user-page__block">
          <div className="user-page__title">About me</div>
          <div className="user-page__description">{user.bio}</div>
        </div>
        <div className="user-page__location user-page__block">
          <div className="user-page__title">Location</div>
          <div className="user-page__map">
            <LoadScript googleMapsApiKey={mapApiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{
                  lat: +user.latitude,
                  lng: +user.longitude,
                }}
                zoom={11}
              >
                <Marker
                  position={{
                    lat: +user.latitude,
                    lng: +user.longitude,
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
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
      </div>
    </div>
  );
}
