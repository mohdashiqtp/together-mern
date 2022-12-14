import React from 'react'
import './RightBody.css'
import Notification from './Notification'

function RightBody() {
  return (
    <div className="right">
      <div className="header">
        <h4>Notifications</h4>
      </div>  

      <div className="notification_body">

        <Notification />
        
        <Notification />

        <Notification />

        <Notification />


      </div>
    </div>
  )
}

export default RightBody