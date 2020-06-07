import React, { useState } from 'react'
import { Context } from '../../Context';

import InputFile from '../InputFile'
import InputBlock from '../InputBlock'
import RadioBlock from '../RadioBlock'
import Button from '../Button';

import UserImg from '../../assets/img/user.svg'
import Male from '../../assets/img/male.svg'
import Female from '../../assets/img/female.svg'
import Camera from "../../assets/img/photo-camera.svg"

import "./ProfileInfo.scss"

export default function ProfileInfo() {
  const[radioButtons, setRadioButtons] = useState([
    {
      type: "Gender",
      text: "Мale",
      image: Male,
      checked: true
    },
    {
      type: "Gender",
      text: "Female",
      image: Female,
      checked: false
    },
    {
      type: "Sex Preference",
      text: "Мale",
      image: Male,
      checked: false
    },
    {
      type: "Sex Preference",
      text: "Female",
      image: Female,
      checked: true
    }
  ]);

  return (
    <form action="/profile" className="profileForm">
      <InputFile img={Camera}/>
      <div className="profile_info">
        <InputBlock inputName="Name" img={UserImg} inputType="text"/>
        <InputBlock inputName="Date of Birth" inputType="date" placeholder="DD/MM/YYYY"/>
        <Context.Provider value={{
          radioButtons,
          setRadioButtons
        }}>
          <RadioBlock radioName="Gender"/>
          <RadioBlock radioName="Sex Preference"/>
        </Context.Provider>
        <Button href="/home" text="Continue" type="submit" />
      </div>
    </form>
  )
};
