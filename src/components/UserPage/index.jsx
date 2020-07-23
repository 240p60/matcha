import React, { useState, useContext } from 'react';
import { Context } from '../../Context'

export default function UserPage({}) {
  const { userInfo } = useContext(Context);
  return (
    <div className="user-page">
        <div className="user-page__photo"></div>
        <div className="user-page__first-name">{userInfo.fname}</div>
        <div className="user-page__last-name">{userInfo.lname}</div>
        <div className="user-page__years">{userInfo.age}</div>
        <div className="user-page__gender">{userInfo.gender}</div>
        <div className="user-page__orientation">{userInfo.orientation}</div>
        <div className="user-page__interests"></div>
        <div className="user-page__bio"></div>
    </div>
  )
}