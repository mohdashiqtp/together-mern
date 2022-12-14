import React from 'react'
import Avatar from '@mui/material/Avatar';
import './Peoples.css'

function Peoples(props) {


  return (
    <div className="peoples">

        <div className="peoples_image">

               <Avatar alt="Remy Sharp" src={props.User.profile} />


        </div>
        <div className="name">
            <h3>{props.User.username}</h3>
        </div>
        <div className="buttons">
            <p>Follow</p>
        </div>

    </div>
  )
}

export default Peoples