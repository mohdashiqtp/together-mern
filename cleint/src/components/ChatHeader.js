import React , { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import './ChatHeader.css'

import { GlobalContext } from '../GlobalState';

function ChatHeader() {
  
  const data = useContext(GlobalContext)

  return (
    <div className="chat_Header">
        <div className="head">
            <h2>Chats</h2>
        </div>
        <div className="new_chat">
          <h2>New chat</h2>
        </div>
        <div className="profile_chat">
               <Avatar alt="Remy Sharp" src={data.Data.userApi.Data.profile} />
        </div>
    </div>
  )
}

export default ChatHeader