import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ProfileList from './ProfileList'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import UserApi from '../api/userApi'
import axios from 'axios'
import './header.css'
import { GlobalContext } from '../GlobalState';

function Header(props) {



    const data = useContext(GlobalContext)



    const logoutClicked = () => {

        try {

            axios.get(`${process.env.REACT_APP_SERVER_URL}/user/logout`).then((res) => {

                window.location.assign('/login')



            })



        } catch (err) {
            console.log(err)
        }

    }



    return (

        <div className="header">

            <div className="left_side">



                <Link to='/'>
                    <div className='image'>
                        <img src="https://i.pinimg.com/originals/1b/37/64/1b37646041a6053fa03a7de3b64d28dc.jpg" alt="" />

                    </div>
                </Link>

            </div>


            <div className="right_side">

                <h4>{data.Data.userApi.Data.username}</h4>

                <div className="avatar">
                    <Link to='/edit_profile'>
                        <Avatar alt="Remy Sharp" src={data.Data.userApi.Data.profile} />
                    </Link>

                </div>
                <div className="chat">
                    <Link onClick={() => logoutClicked()}>
                        <LogoutIcon />
                    </Link>
                    <Link to='/chats:id'>
                        <IconButton >
                            < ChatIcon />
                        </IconButton >
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Header