import React , { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'
import ChatIcon from '@mui/icons-material/Chat';
import './ViewUser.css'
import {
    useParams
  } from "react-router-dom";
  
import { useContext } from 'react'
import { GlobalContext } from '../GlobalState';
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import PostGrid from '../components/PostGrid';

function ViewUser() {

    const location = useLocation()

    const { user } = location.state

    const data = useContext(GlobalContext)

    const id = data.Data.userApi.Data.id


    const [posts , setPosts] = useState(user.posts)

    const members = {
        senderId: id,
        recieverId: user._id
      }
  

    const StartConverstaion = () => {

        try {

            axios.post(`${process.env.REACT_APP_SERVER_URL}/user/coversations` , members  , {

                headers: {
        
                  'Authorization': `Bearer ${data.Data.userApi.token}`
                },
        
                withCredentials: true
        
              }).then(( res ) => {

                console.log(res)
                
            }).catch(( err ) => {
                console.log(err)
            })

        } catch (err) {

            console.log(err)

        }

    }
  return (
     <div className='view_user'>

        <div className="view_user_container">

            <div className="view_header">

                <Header/>

            </div>

            <div className="view_body">

                <div className="view_body_header">

                    <div className="image">

                        <img className='profile_image' src={user.profile} alt="" />

                    </div>

                    <div className="other">

                        <div className="name">

                            <h3>{user.username}</h3>

                        </div>
                        <div className="matches_count">
                            <h3>{user.friends.length}</h3>
                        </div>
                        
                        <div className="chat"  ><Link to='/chats:id'>
                        <IconButton >
                            < ChatIcon onClick={StartConverstaion} />
                        </IconButton >
                       </Link> </div>
                        
                    </div>

                </div>

                <div className="view_body_center">

                <div className="images">
                {
                    posts && posts.map((post) => {


                      return  (

                            <PostGrid className='column' post={post}/>
                        )
                    })
                }

                </div>
                </div>

            </div>

            <div className="view_navigation">

                <Navigation />

            </div>
        </div>

     </div>
  )
}

export default ViewUser