import React from 'react'
import './ViewMyPostRight.css'
import Notification from './Notification'

function ViewMyPostRinght() {
  return (
    <div className="ViewMyPostRinght">

      <div className="right_container">
        <div className="heading">
          <h3>Activity</h3>
        </div>
        <div className="activity">
          <Notification />
          
          <Notification />
          
        </div>
      </div>
        
    </div>
   )
}

export default ViewMyPostRinght