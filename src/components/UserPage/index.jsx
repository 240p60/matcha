import React, { useState, useContext } from 'react';
import { Context } from '../../Context';

import './UserPage.scss';

export default function UserPage({}) {
  const { userInfo } = useContext(Context);

  return (
    <div className="user-page">
        <div className="user-page__photo"></div>
        <div className="user-page__info">
          <div className="user-page__main-info user-page__block">
            <span className="user-page__main-info_name">{userInfo.fname ? `${userInfo.fname} ${userInfo.lname}` : 'Rashid Alkhoev, '}</span>
            <span className='user-page__main-info_years'>23</span>
          </div>
          <div className="user-page__gender user-page__flex">
            <div className="user-page__title">
              Gender
            </div>
            <div className="user-page__description user-page__sex">
              {userInfo.gender  || 'male'}
            </div>
          </div>
          <div className="user-page__orientation user-page__flex">
            <div className="user-page__title">
              Sex Preference
            </div>
            <div className="user-page__description user-page__sex">
              {userInfo.orientation || 'heterosexual'}
            </div>
          </div>
          <div className="user-page__interests user-page__block">
            <div className="user-page__title">
              Interests
            </div>
            <div className="user-page__description">
              {userInfo.interests || 'Sport, Web'}
            </div>
          </div>
          <div className="user-page__bio user-page__block">
            <div className="user-page__title">
              About me
            </div>
            <div className="user-page__description">
              {userInfo.bio || 'Rest on stallin on'}
            </div>
          </div>
        </div>
    </div>
  )
}