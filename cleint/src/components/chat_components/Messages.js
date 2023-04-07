import React , {  useState , useEffect } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import './Messages.css'

function Messages(props) {

  const [profile , setProfile] = useState()
  const [username , setUsername] = useState()

  useEffect(()=>{

    const getProfile =  async () => {

      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/infor${props.message.sender}`, {
  
        withCredentials: true
  
      })
  
      setProfile(res.data.user.profile)
      setUsername(res.data.user.username)
  
    }

    
  getProfile()

  },[])

  return (
    <div className="Messages">

      <div className="image">
        <Avatar alt="Remy Sharp" src={profile} />
      </div>

      <div className="message">

      <h3>{props.message.text}</h3>

      </div>

    </div>
  )
}

export default Messages