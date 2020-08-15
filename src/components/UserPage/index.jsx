import React from 'react';
import { Context } from '../../Context';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from '../index';

import './UserPage.scss';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export default function UserPage() {
  const { userInfo } = React.useContext(Context);
  
  return (
    <div className="user-page">
        <div className="user-page__photo"></div>
        <div className="user-page__info">
          <div className="user-page__main-info user-page__block">
            <span className="user-page__main-info_name">{`${userInfo.fname} ${userInfo.lname}, `}</span>
            <span className='user-page__main-info_years'>23</span>
          </div>
          <div className="user-page__gender user-page__flex">
            <div className="user-page__title">
              Gender
            </div>
            <div className="user-page__description user-page__sex">
              {userInfo.gender}
            </div>
          </div>
          <div className="user-page__orientation user-page__flex">
            <div className="user-page__title">
              Sex Preference
            </div>
            <div className="user-page__description user-page__sex">
              {userInfo.orientation}
            </div>
          </div>
          <div className="user-page__interests user-page__block">
            <div className="user-page__title">
              Interests
            </div>
            <div className="user-page__description">
              {userInfo.interests.join(', ')}
            </div>
          </div>
          <div className="user-page__bio user-page__block">
            <div className="user-page__title">
              About me
            </div>
            <div className="user-page__description">
              {userInfo.bio}
            </div>
          </div>
          <div className="user-page__location user-page__block">
            <div className="user-page__map">
              <LoadScript
                googleMapsApiKey="AIzaSyDXt1xnUyKre_2okWHA_tBAI9LeJdrKTjw"
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={
                    {
                      lat: +userInfo.latitude,
                      lng: +userInfo.longitude
                    }
                  }
                  zoom={11}
                >
                  <Marker
                    position={
                      {
                        lat: +userInfo.latitude,
                        lng: +userInfo.longitude
                      }
                    }
                  />
                  { /* Child components, such as markers, info windows, etc. */ }
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <div className="user-page__block">
            <Button type="mail" type="button" subClass="change-action" href="/profile" text="Change Information"/>
          </div>
        </div>
    </div>
  )
}