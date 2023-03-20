import React , { useEffect , useState } from 'react'
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import './friend.css'

function Friend(props) {

  const [username , setUsename] = useState()
  const [profile , setProfile] = useState()

  useEffect(() => {

            axios.get(`${process.env.REACT_APP_SERVER_URL}/user/infor${props.friends._id}`, {

                headers: {

                    'Authorization': `Bearer ${props.data.Data.userApi.token}`

                },

                withCredentials: true,

            }).then((res) => {

              console.log(res)
              setUsename(res.data.user.username)
              setProfile(res.data.user.profile)

            }).catch((err) => {

                console.log(err)

            })

      
    

}, [] )
  return (
    <div className="Friend">

        <div className="friend_left">

             <Avatar alt="Remy Sharp" src={profile} />

        </div>
        <div className="friend_right">

            <div className="name">
                <h4>{username}</h4>

            </div>
            <div className="buttons">
                <p> Remove </p>
            </div>

        </div>

    </div>
  )
}

export default Friend