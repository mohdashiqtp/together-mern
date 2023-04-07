import React from 'react'
import Post from './Post'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner'
import './LeftBody.css'
import { useContext } from 'react'
import { GlobalContext } from '../GlobalState';

function LeftBody() {

    const data = useContext(GlobalContext)

    const [friends, setFriends] = useState()

    const [isUser, setIsUser] = useState(false)

    const [posts, setPosts] = useState([])

    const [user, setUser] = useState([])


    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_URL}/friends/friends`, {

            headers: {

                'Authorization': `Bearer ${data.Data.userApi.token}`

            },

            withCredentials: true,

        }).
            then((res) => {

                setFriends(res.data.friends)

                console.log(res)


            }).catch((err) => {
                console.log(err)
            })




    }, [])

    useEffect(() => {
        
        console.log(friends)

        if (friends) {

            friends.forEach((fr) => {

                axios.get(`${process.env.REACT_APP_SERVER_URL}/user/infor${fr._id}`, {

                    headers: {

                        'Authorization': `Bearer ${data.Data.userApi.token}`

                    },

                    withCredentials: true,

                }).then((res) => {

                    setPosts(res.data.user.posts)

                    setUser(res.data.user)

                    setIsUser(true)

                    console.log(res)



                }).catch((err) => {

                    console.log(err)

                })

            })
        }

    }, [friends])




    return (
        <div className="left">
            <div className="heading">
                <h3>Feed</h3>
            </div>
            <div className="feed">
                {
                    isUser ? <>
                        {
                            posts && posts.map((post) => {

                                return (

                                    <Post post={post} user={user} />
                                )
                            })
                        }

                    </> :

                        <div className="loader">
                            <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="96"
                                visible={true}
                            />
                        </div>
                }



            </div>
        </div>
    )
}

export default LeftBody

