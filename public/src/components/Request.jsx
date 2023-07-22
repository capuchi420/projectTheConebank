import React from 'react'

export default function Request(props) {
  return (
    <div className='request'>
        <p>username</p>
        <p className='money'>100$</p>
        <div className='options'>
            <button className='accept'>Accept</button>
            <button className='decline'>Decline</button>
        </div>
    </div>
  )
}
