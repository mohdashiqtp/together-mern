import React from 'react'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import Notification from '../components/Notification'
import './Activity.css'

function Activity() {
  return (
    <div className='activity'>

        <div className="activity_conatiner">
            <div className="activity_header">
                <Header />
            </div>
            <div className="activity_heading">
                <h3>Notifications</h3>
            </div>
            <div className="activity_body">
                <Notification className='notification' activity={true}/>
            </div>
            <div className="activity_footer">
                <Navigation />
            </div>
        </div>

    </div>
  )
}

export default Activity