import React from 'react'

import Button from '../Button'
import InputBlock from '../InputBlock'
import './LoginPhone.scss'
import Phone from '../../assets/img/smartphone.svg'

export default function LoginPhone ({ type }) {
  return (
    <div className="authorization">
      <form action="" method="POST" name="phone_authorization">
        <InputBlock inputName="Phone" img={Phone} inputType="tel"></InputBlock>
        <InputBlock inputName="Password" inputType="password"></InputBlock>
        <div className="description">
          We need your mobile number to get you signed in
        </div>
        <Button href="/profile" type="submit" text="Continue" />
      </form>
    </div>
  )
}
