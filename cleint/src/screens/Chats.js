import React, { useContext, useState, useEffect, useRef } from 'react'
import ChatHeader from '../components/ChatHeader'
import Chat_left from '../components/Chat_left'
import Chat_right from '../components/Chat_right'
import { GlobalContext } from '../GlobalState';
import Peoples from '../components/Peoples';
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Rings } from 'react-loader-spinner'
import { io } from 'socket.io-client'
import './chats.css'
import Header from '../components/Header';
import Navigation from '../components/Navigation';



function Chats() {


  const data = useContext(GlobalContext)
  const id = data.Data.userApi.Data.id
  const [chats, setChats] = useState([])
  const [clickedChat, setClickedChat] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const socket = useRef()
  const [users, setUsers] = useState([])


  useEffect(() => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getall`, {

      headers: {

        'Authorization': `Bearer ${data.Data.userApi.token}`

      },

      withCredentials: true,

    }).then((result) => {

      setUsers(result.data.user)



    }).catch((err) => {

      // console.log(err)
    })



  }, [data.Data.userApi.token])




  useEffect(() => {

    const getconversation = async () => {

      try {


        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/coversations/${id}`, {

          headers: {

            'Authorization': `Bearer ${data.Data.userApi.token}`
          },

          withCredentials: true

        })

        setChats(res.data.Conversation)

        setIsLoaded(true)


      } catch (err) {

        // console.log(err)

      }
    }



    setTimeout(() => {
      getconversation()
    }, 5000)

  }, [id])


  const peopleClicked = (user) => {

    if (user._id === data.Data.userApi.Data.id) return null


    const members = {
      senderId: id,
      recieverId: user._id
    }

    try {

      axios.post(`${process.env.REACT_APP_SERVER_URL}/user/conversations`, members, {

        headers: {

          'Authorization': `Bearer ${data.Data.userApi.token}`
        },

        withCredentials: true

      })


    } catch (err) {

    }

  }

  useEffect(() => {

    socket.current = io("ws://localhost:9000")


  }, [])

  useEffect(() => {

    socket.current.emit("addUser", id)

    socket.current.on("getUser", users => {

      // console.log(users)

    })

  }, [])



  const isClicked = (chat) => {

    setClickedChat(chat)


  }


  return (
    <div className="chats">

      <div className="chat_container">
        <div className="chat_header">

          <Header />

        </div>
        <div className="chat_body">

          <div className="start_conversation">

            {/* {
              isLoaded ? <div className="">
                {
                  users.map((user) => {
                    return (
                      <div className="people" onClick={() => peopleClicked(user)}>
                        <Peoples User={user} />
                      </div>
                    )
                  })
                }
              </div> : <div className="loader">
                <Rings
                  height="80"
                  width="80"
                  color="grey"
                  radius="6"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="rings-loading"
                />
              </div>
            } */}
          </div>
          <div className="chat_left" >


            {

              chats.map((chat) => {
                return (
                  <div className='chat' onClick={() => isClicked(chat)}  >


                    <Chat_left conversation={chat} />

                  </div>

                )
              })
            }


          </div>
          <div className="chat_right">


            {
              clickedChat &&
              <Chat_right conversation={clickedChat} />
            }


          </div>
        </div>
      </div>

      <div className="navigation_footer">

        <Navigation />

      </div>

    </div>
  )
}

export default Chats