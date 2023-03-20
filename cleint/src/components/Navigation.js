import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import { GlobalContext } from '../GlobalState';
import { useState } from 'react'
import Profile from '../screens/Profile'
import './Navigation.css'

function Navigation() {


    const data = useContext(GlobalContext)

    return (
        <div className="navigation">
            <div className="_icon">
                <Link to='/'>
                    <IconButton>
                        < HomeIcon />
                    </IconButton>

                </Link>

            </div>
            <div className="_icon">
                <Link to='/match'>
                    <IconButton>
                        < SearchIcon />
                    </IconButton>
                </Link>
            </div>
            <div className="_icon">
                <Link to='/user/activity'>
                    <IconButton>
                        < CircleNotificationsIcon />
                    </IconButton>
                </Link>
            </div>
            <div className="_icon">
                <Link to='/profile'>
                    <IconButton>
                        <Avatar alt="Remy Sharp" src={data.Data.userApi.Data.profile} />
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}

export default Navigation