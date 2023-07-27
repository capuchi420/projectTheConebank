import React from 'react'

export default function Review(props) {
  return (
    <div className='review'>
        <p>{props.date}</p>
        <p>{props.msg}</p>
    </div>
  )
}
