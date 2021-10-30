import React from 'react'

const RadioButton = ({ onChange, checked, label, name }) => {
  return (
    <div style={{ padding: '.8rem .4rem', fontSize: '1.2rem' }}>
      <input onChange={onChange} checked={checked} type='radio' name={name} id={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default RadioButton
