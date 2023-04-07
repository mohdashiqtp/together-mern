import React, { useState, useContext, useRef, useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { io } from 'socket.io-client'
import Messages from './Messages';
import axios from 'axios'
import './Chat_bbody.css'

function Chat_body(props) {

  const id = props.user.Data.userApi.Data.id
  const message = props.message
  const socket = useRef()
  const [chat, setChat] = useState()
  const [arrivalMessages, setArrivalMessages] = useState(null)
  const [messages, setMessages] = useState({

    conversationId: '',

    sender: '',

    text: '',

    createdAt: ''


  })

  const data = {

    conversationId: props.id,

    sender: id,

    text: chat,

  }


  let recieverId


  if (props.conversation.members[1] === id) {

    recieverId = props.conversation.members[0]

  } else {

    recieverId = props.conversation.members[1]

  }


  useEffect(() => {

    socket.current = io("ws://localhost:9000")

    socket.current.on("getUser", users => {

      console.log(users)

    })

  }, [])

  useEffect(() => {

    setMessages(arrivalMessages)

  }, [arrivalMessages])


  useEffect(() => {

    socket.current.on("getMessage", data => {

      setArrivalMessages({
        conversationId: props.id,

        sender: data.senderId,

        text: data.text,

        createdAt: Date.now()
      })

    })

  }, [])


  const submit = async () => {

    socket.current.emit("sendMesssage", {
      senderId: id,
      recieverId: props.members[1],
      text: chat
    })

    try {

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/user/conversations/messages/`, data)


    } catch (err) {
      console.log(err)
    }

  }



  return (
    <div className="chat_body">
      <div className="messaging_area">
        <div className="messeage_body message_own">



          {
            message && message.map((message) => {
              return (
                <div >
                  <Messages message={message} />
                </div>

              )
            })
          }


        </div>
        <div className="message_area">
          <div className="input">
            <input type="text" onChange={(e) => setChat(e.target.value)} />
          </div>
          <div className="send">
            <IconButton>
              <SendIcon onClick={submit} />
            </IconButton>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat_body