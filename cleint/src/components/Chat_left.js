import React, { useEffect, useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import './Chat_left.css'
import axios from 'axios'
import { GlobalContext } from '../GlobalState';

function Chat_left(props) {


  const user = useContext(GlobalContext)


  const [username, setUsername] = useState()
  const [profile , setProfile] = useState()

  const id = user.Data.userApi.Data.id

  var recieverId 

  if(props.conversation.members[1] === id) {

    recieverId = props.conversation.members[0]

  } else {

    recieverId  = props.conversation.members[1]

  }



  useEffect(() => {

    const getUser = async () => {

      try {

        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/infor${recieverId}`, {

          headers: {

            'Authorization': `Bearer ${user.Data.userApi.token}`
          },

          withCredentials: true

        })


        setUsername(res.data.user.username)
        setProfile(res.data.user.profile)


      } catch (err) {

      }

    }

    getUser()




  }, [])







  return (
    <div className="chat_leftt">
      <div className="chat_image">

        <Avatar alt="Remy Sharp" src={profile} />

      </div>
      <div className="chat_name">

            <p>{ username }</p>

      </div>
    </div>
  )
}

export default Chat_left