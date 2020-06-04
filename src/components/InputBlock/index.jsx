import React from 'react'

import Input from './Input.jsx'
import './InputBlock.scss'

export default function InputBlock ({img, inputName, inputType, placeholder}) {
  let name = inputName.toLowerCase();
  
  return (
    <div className={`input-block input-block_${name}`}>
      <span>{inputName}</span>
      <Input name={name} type={inputType} placeholder={placeholder} ></Input>
      {img && <img src={img} className={`image image_${name}`} alt={name}/>}
    </div>
  )
}