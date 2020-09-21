import React from 'react';
import { Context } from '../../Context';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, PictureSlider } from '../index';

import './UserPage.scss';
import { mapApiKey } from '../../apikeys';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export default function UserPage() {
  const { user } = React.useContext(Context);

  // React.useEffect(() => {
  //   fetch('http://localhost:3000/photo/download/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       'x-auth-token': sessionStorage.getItem('x-auth-token'),
  //       uid: user.uid,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // });

  return (
    <div className="user-page">
      <div className="user-page__photo">
        <PictureSlider volatile={false} />
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
                {/* Child components, such as markers, info windows, etc. */}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <div className="user-page__block">
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
