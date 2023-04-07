import React, { useEffect, useState, useContext } from 'react'
import './Chat_right.css'
import Chat_header from './chat_components/Chat_header'
import Chat_body from './chat_components/Chat_body'
import { GlobalContext } from '../GlobalState';
import axios from 'axios'

function Chat_right(props) {

  const user = useContext(GlobalContext)


  const [username, setUsername] = useState()
  const [profile, setProfile] = useState()
  const [chat, setChat] = useState()

  const id = user.Data.userApi.Data.id

  var recieverId

  if (props.conversation.members[1] === id) {

    recieverId = props.conversation.members[0]

  } else {

    recieverId = props.conversation.members[1]

  }

  useEffect(() => {

    const getChats = async () => {

      try {

        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/conversations/messages/${props.conversation._id}`)

        console.log(res)

        setChat(res.data.message)


      } catch (err) {

        console.log(err)

      }


    }

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

    getChats()


  }, [chat])


  return (
    <div className="chat_rightt">

      <div className="chat_conatiner">

        <div className="chat_header">

          <Chat_header username={username} profile={profile} />

        </div>
        <div className="chat_body">

          <Chat_body user={user} id={props.conversation._id} conversation={props.conversation} profile={profile} message={chat} members={props.conversation.members} />

        </div>
      </div>

    </div>
  )
}

export default Chat_right