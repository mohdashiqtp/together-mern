import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useContext } from 'react'
import { GlobalContext } from '../GlobalState';
import './Profile.css'
import ViewMyPost from '../components/ViewMyPost'
import ViewMyPostRinght from '../components/ViewMyPostRinght'

function Profile() {

    
const user = useContext(GlobalContext)

  return (
    <div className="profile_">

        <div className="header">
            <Header isprofile={true} />
        </div>
        <div className="heading_profile">
            <h1>Profile...</h1>
        </div>

        <div className="view_profile">

            <div className="left_profile">

                <ViewMyPost user={user} />

            </div>
            <div className="right_profile">

                <ViewMyPostRinght user={user} />

            </div>

        </div>

        <div className="navigation_footer">

            <Navigation />

        </div>

    </div>
  )
}

export default Profile