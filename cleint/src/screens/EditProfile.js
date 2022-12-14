import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import './editprofile.css'
import GlobalContext from '../GlobalState'
import Avatar from '@mui/material/Avatar';

function EditProfile() {

  const [profile, setProfile] = useState({ data: '' })

  const [preview, setPreview] = useState()

  const data = useContext(GlobalContext)

  console.log(data)
  

  const [user, setUser] = useState({

    name: '',
    email: '',
    number: ''

  })


  const handleSubmit = async (e) => {

    e.preventDefault()
    
    let formData = new FormData()

    formData.append('profile', profile.data)

    formData.append('profileData', preview)

    formData.append('name', user.name)

    formData.append('number', user.number)

    formData.append('email', user.email)

    
    try {

      const res = axios.post(`http://localhost:5000/user/edit_profile `, formData, {

        withCredentials: true
  
      })

      alert("updated")

    } catch(err) {

      alert("failed please try again")

    }


  }

  const handleFileChange = (e) => {

    setProfile({

      data: e.target.files[0]

    })

    previewFile(e.target.files[0])
  }

  const previewFile = (file) => {

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {

      setPreview(reader.result)

    }

  }

  const handleChange = (e) => {

    const { name, value } = e.target


    setUser({ ...user, [name]: value })


  }
  return (
    <div className="edit_profile">
      <h2>Edit profile</h2>
      <div className="image">
        {
          preview && (
            
            <img alt="Remy Sharp" src={preview}  />

          )
        }
        <input type="file" name='image' onChange={handleFileChange} />
      </div>

      <div className="name">
        <span>Name</span>
        <input type="text" name='name' onChange={handleChange} />
      </div>

      <div className="number">
        <span>Number</span>
        <input type="text" name="number" onChange={handleChange} />
      </div>

      <div className="name">
        <span>Email</span>
        <input type="email" name="email" onChange={handleChange} />
      </div>

      <div className="button">
        <button onClick={handleSubmit} >Submit</button>
      </div>

    </div>
  )
}

export default EditProfile