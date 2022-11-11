import React from 'react'

export default function ErrorText({ errors, field, data}) {
    console.log(errors)
    if (data[field] && !errors[field]){
        return null
    }
  return (
    <small className='text-danger'>{errors[field]}</small>
  )
}
