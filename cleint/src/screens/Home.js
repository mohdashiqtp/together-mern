import React from 'react'
import { useEffect, useState } from 'react'
import UserApi from '../api/userApi'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import Header from '../components/Header';
import SearchIcon from '@mui/icons-material/Search';
import Navigation from '../components/Navigation';
import './Home.css'
import RightBody from '../components/RightBody';
import axios from 'axios'
import LeftBody from '../components/LeftBody';
import AddPost from '../components/AddPost'
import IconButton from '@mui/material/IconButton';
import Peoples from '../components/Peoples';
import { useContext } from 'react'
import { GlobalContext } from '../GlobalState';
import { RotatingLines } from 'react-loader-spinner'


function Home() {

    const [users, setUsers] = useState([])

    const [isUser, setIsUser] = useState(false)

    const [search, setSearch] = useState('')


    const data = useContext(GlobalContext)

    const id = data.Data.userApi.Data.id



    // useEffect(() => {

    //     axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getall`, {

    //         headers: {

    //             "Authorization": `Bearer ${data.Data.userApi.Data.token}`

    //         },

    //         withCredentials: true,

    //     }).then((result) => {

    //         setUsers(result.data.user)

    //         setIsUser(true)



    //     }).catch((err) => {

    //         console.log(err)
    //     })



    // }, [data.Data.userApi.token])


    const peopleClicked = async (user) => {

        axios.post(`${process.env.REACT_APP_SERVER_URL}/friends/addfriend${user._id}/${id}`, {

            headers: {

                'Authorization': `Bearer ${data.Data.userApi.token}`

            },

            withCredentials: true,

        }).then((res) => {

            console.log(res)

            alert('added to friends')

        }).catch((err) => {

            console.log(err)

        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {


            const result = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/search`, search)

            console.log(result)


        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="home">

            <div className="header">

                <Header />

            </div>

            <div className="search">

                <input type="text" onChange={(e) => setSearch(e.target.value)
                } placeholder='search you fav' />

                <div className="search-i">

                    <IconButton>
                        <SearchIcon onClick={handleSubmit} />
                    </IconButton>

                </div>

            </div>





            <div className="body">

                <div className="left_section">

                    <LeftBody />

                </div>
                <div className="right_section">
                    <div className="add_posts">

                        <h4>Add post</h4>

                        <AddPost />

                    </div>

                    {/* <div className="Peoples">


                        {
                            isUser ? <>
                                {
                                    users.map((user) => {
                                        return (
                                            <div className="people" onClick={() => peopleClicked(user)}>


                                                <Peoples User={user} />
                                            </div>
                                        )
                                    })
                                }

                            </> :

                                <div className="loader">
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="60"
                                        visible={true}
                                    />
                                </div>
                        }






                    </div> */}
                </div>
            </div>
            <div className="navigation">

                <Navigation />

            </div>

            <div className="footer">

            </div>
        </div>
    )
}

export default Home