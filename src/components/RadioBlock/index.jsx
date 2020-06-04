import React from 'react'

import Radio from './Radio.jsx'
import './RadioBlock.scss'

export default function RadioBlock ({radioName, items}) {
  let name = radioName.toLowerCase();

  return (
    <div className={`radio-block radio-block_${name}`}>
      <span className="radio-block_name">{radioName}</span>
      <div className="radio__row">
        {items.map((item, index) => {
          return <Radio key={index} name={name} type="radio" text={item.text} img={item.image} status={item.checked}></Radio>
        })}
      </div>
    </div>
  )
}