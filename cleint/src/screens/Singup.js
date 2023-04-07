import React from 'react'
import './singup.css'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Singup() {

    const [ user , setUser ] = useState({

        username : '',
        password : '',
        email: ''

    })

    const handleInputChange = (event) => {

        const { name , value } = event.target


        setUser({ ...user , [name]:value })


    }

    const handleSubmit = (event) => {

        event.preventDefault()
    
        axios.post(`${process.env.REACT_APP_SERVER_URL}/user/singup` , { ...user }
        , {
            withCredentials:true
        }
        )
        .then((res)=>{

            if(res) {

                localStorage.setItem('Singup' , true)

                window.location.assign('/edit_profile/')
            }

        })
        .catch((err)=>{

            alert(err.response.data.msg)

        })




    }
  return (
    <div className='singup'>

            <div className="singup_conatiner">
                <div className="head">
                    <img src="https://i.pinimg.com/originals/1b/37/64/1b37646041a6053fa03a7de3b64d28dc.jpg" alt="" />
                </div>
                <div className="body_singup">
                    <form >

                        <div className="username">
                            <label htmlFor="">username</label>
                            <input name='username' onChange={handleInputChange} type="text" />
                        </div>
                        <div className="password">
                            <label htmlFor="">Password</label>
                            <input name='password' onChange={handleInputChange} type="password" />
                        </div>
                        <div className="email">
                            <label htmlFor="">email</label>
                            <input name='email' onChange={handleInputChange} type="text" />
                        </div>
                        <div className="others">
                            <Link to='/login' >
                            <a href=""> Have an account Login ?</a>
                            </Link>
                        </div>
                        <div className="submit">
                            <button onClick={handleSubmit} className='singup_button'>Create Accout</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
  )
}

export default Singup