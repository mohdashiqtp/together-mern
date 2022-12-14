import React from 'react'
import './Chat_header.css'
import Avatar from '@mui/material/Avatar';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import IconButton from '@mui/material/IconButton';

function Chat_header(props) {
  return (
    <div className="body_header">
        <div className="left_chat">

            <div className="profile">

                <Avatar alt="Remy Sharp" src={props.profile} />

            </div>
            <div className="name">

                <h3>{props.username}</h3>

            </div>

        </div>
        <div className="right_chat">

            <div className="videocall">
                <IconButton>
                    <VideoCallIcon/>
                </IconButton>
            </div>
            <div className="voicecall">
                <IconButton>
                    <CallIcon/>
                </IconButton>
            </div>

        </div>
    </div>
  )
}

export default Chat_header