import React, { useEffect } from 'react'
import './login.css'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import UserApi from '../api/userApi'

function Login() {

    const isLoggedIn = UserApi.isLogged


    const Logged = () => {


    }

    useEffect(()=>{

        if(isLoggedIn){

            Logged()
           
        }

    },[isLoggedIn])




    const [user , setUser] = useState({

        username : '',
        password : ''
    })

    const ChangeInput  = (e) => {

        const { name , value } = e.target

        setUser({...user, [name]:value })

    }

    const handleLogin = (e) => {

        console.log(process.env.SERVER_URL)

        e.preventDefault()

        //submit our data to backend 

        axios.post(`${process.env.REACT_APP_SERVER_URL}/user/login` , {...user} , {
            withCredentials:true
        }).
        then((res) => {

            if(res.data.accesstoken){

                localStorage.setItem('login' , true)

                window.location.assign('/')

            }

        }).catch((err) => {

            console.log(err.response.data.msg)

        })


    }
    return (
        <div className='login'>

            <div className="login_container">
                <div className="head">
                    <img src="https://i.pinimg.com/originals/1b/37/64/1b37646041a6053fa03a7de3b64d28dc.jpg" alt="" />
                </div>
                <div className="body_login">
                    <form >

                        <div className="username">
                            <label htmlFor="">username</label>
                            <input name="username" onChange={ChangeInput} type="text" />
                        </div>
                        <div className="password">
                            <label htmlFor="">Password</label>
                            <input name="password" onChange={ChangeInput} type="password" />
                        </div>
                        <div className="others">
                            <Link to='/singup' >
                            <a href=""> New to together </a>
                            </Link>
                            <a href="">Forgot password?</a>
                        </div>
                        <div className="submit">
                            <button onClick={handleLogin} className='login_button'>Login</button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login