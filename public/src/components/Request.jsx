import React from 'react'

export default function Request(props) {
  let cookies = document.cookie;
  const _id = cookies.slice(cookies.indexOf('=')+1, cookies.length);
  const info = {
    userId: _id,
    reqId: props.id,
    toId: props.toId,
    amount: props.amount
  };

  const handleDecline = async (e) => {
    fetch('http://localhost:1234/user/delReq', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    }).then(response => response.json()).then(data => console.log(data))
  };

  const handleAccept = async (e) => {
    fetch('http://localhost:1234/user/acceptReq', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    }).then(response => response.json()).then(data => console.log(data))
  }

  return (
    <div className='request'>
        <p>{props.username}</p>
        <p className='money'>{props.amount}$</p>
        <div className='options'>
            <button className='accept' onClick={handleAccept}>Accept</button>
            <button className='decline' onClick={handleDecline}>Decline</button>
        </div>
    </div>
  )
}
