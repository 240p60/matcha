import React, { useContext } from 'react'
import { Context } from '../../Context';

import Radio from './Radio.jsx'
import './RadioBlock.scss'

export default function RadioBlock ({radioName}) {
  let name = radioName.toLowerCase();
  const { radioButtons } = useContext(Context);

  return (
    <div className="radio-block">
      <span className="radio-block_name">{radioName}</span>
      <div className="radio__row">
        {radioButtons.map((item, index) => {
          if (item.type === radioName)
            return <Radio key={index} radioType={radioName} id={index} name={name} type="radio" text={item.text} img={item.image} status={item.checked}></Radio>
          return '';
        })}
      </div>
    </div>
  )
}