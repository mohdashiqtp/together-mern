import React , { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { GlobalContext } from '../GlobalState';
import IconButton from '@mui/material/IconButton';
import PostGrid from './PostGrid'
import { Link } from 'react-router-dom'
import './viewMyPost.css'

function ViewMyPost(props) {

    
  const data = useContext(GlobalContext)

    const profile = props.user.Data.userApi.Data.profile

    const friends = data.Data.userApi.Data.freinds

    const posts = props.user.Data.userApi.Data.posts

    console.log(props.user.Data.userApi.Data)



    return (
        <div className="viewMyPost">
            <div className="container">
                <div className="image">

                    <IconButton>
                        <Avatar alt="Remy Sharp" src={profile} />
                    </IconButton>

                </div>
                <div className="username">
                    <h4>{props.user.Data.userApi.Data.username}</h4>
                </div>
                <div className="following_ets">
                    

                    <Link to='/friends:id'>
                        <div className="following">

                            <h3>{friends.length}</h3>
                            <p>Mtches</p>

                        </div>
                    </Link>

                </div>
            </div>

            <div className="row">
                {
                    posts && posts.map((post) => {


                      return  (

                            <PostGrid className='column' post={post}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ViewMyPost