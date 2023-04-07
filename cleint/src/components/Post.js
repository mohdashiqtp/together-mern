import React, { useState, useContext , useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import { GlobalContext } from '../GlobalState';
import axios from 'axios'
import './Post.css'
import { Link } from 'react-router-dom';

function Post(props) {

    const data = useContext(GlobalContext)


    const [likes, setLikes] = useState()
    const [liked, setLiked] = useState(false)
    const [iscomment, setisComment] = useState(false)
    const [likeCount, setLikeCount] = useState()
    const [comment, setComment] = useState('')

    const id = data.Data.userApi.Data.id



    const likeClicked = () => {

        axios.put(`${process.env.REACT_APP_SERVER_URL}/posts/like${props.post._id}/${id}/${props.user._id}`, {

            headers: {

                'Authorization': `Bearer ${data.Data.userApi.token}`

            },

            withCredentials: true,

        }).then((res) => {

            console.log(res)

            setLikes()
            setLiked(true)

        }).catch((err) => {

            console.log(err)


        })

    }

    const commentClicked = () => {

        setisComment(true)

        axios.post(`${process.env.REACT_APP_SERVER_URL}/posts/comment${props.post._id}/${id}/${props.user._id}`, {

            headers: {

                'Authorization': `Bearer ${data.Data.userApi.token}`

            },

            withCredentials: true,

        }, comment).then((res) => {

            console.log(res)

        }).catch((err) => {

            console.log(err)


        })



    }


    useEffect(()=>{

        const LikeCount = () => {



            setLikes(props.user.like)
    
            {
                likes && likes.forEach((like) => {

    
                    if (like.postId === props.post._id) {
    
                        setLikeCount([like])
    
                    }
                })
            }
    
    
        }
    
        LikeCount()

    } , [ likes ])

    
   

    return (
        <div className="post">
        <Link to='/view_profile:id' state={{ user : props.user }}>
            <div className="post_header">

                <div className="profile">
                    
                    <Avatar alt="Remy Sharp" src={props.user.profile} />

                </div>
                <div className="username">
                    <a>{props.user.username}</a>
                </div>

            </div></Link>
            <div className="post_body">

                <div className="post_image">
                    <img src={props.post.image} />
                </div>

            </div>
            <div className="post_bottom">

                <div className="like_post" onClick={likeClicked}>
                    {
                        liked ? <IconButton>
                            <FavoriteBorderIcon className='liked' />
                        </IconButton> :
                            <IconButton>
                                <p>{ likeCount && likeCount.length}</p>
                                <FavoriteBorderIcon />
                            </IconButton>
                    }

                </div>
                <div className="comment_post" >
                    <IconButton>
                        <ChatBubbleOutlineIcon onClick={commentClicked}/>
                        {
                            iscomment && (
                                <>
                                    <input type="text" onChange={(e) => setComment(e.target.value)} />
                                    <button onClick={()=> setisComment(false)}>send</button>
                                </>
                            )
                        }
                    </IconButton>

                </div>
                <div className="share">

                    <IconButton>
                        < ShareIcon />
                    </IconButton>

                </div>

            </div>
        </div>
    )
}

export default Post