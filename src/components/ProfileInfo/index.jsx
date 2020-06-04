import React from 'react'

import InputBlock from '../InputBlock'
import RadioBlock from '../RadioBlock'
import UserImg from '../../assets/img/user.svg'
import Male from '../../assets/img/male.svg'
import Female from '../../assets/img/female.svg'

import "./ProfileInfo.scss"

export default function ProfileInfo() {
  return (
    <div className="profile_info">
      <form action="/profile" className="profileForm">
        <InputBlock inputName="Name" img={UserImg} inputType="text"></InputBlock>
        <InputBlock inputName="Date of Birth" inputType="date" placeholder="DD/MM/YYYY"></InputBlock>
        <RadioBlock
          radioName="Gender"
          items={[
            {
              text: "Мale",
              image: Male,
              checked: true
            },
            {
              text: "Female",
              image: Female,
              checked: false
            }
          ]}></RadioBlock>
      </form>
    </div>
  )
};
