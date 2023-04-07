import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './editprofile.css'
import GlobalContext from '../GlobalState'
import Avatar from '@mui/material/Avatar';

function EditProfile() {

  const [profile, setProfile] = useState({ data: '' })

  const [preview, setPreview] = useState()

  const data = useContext(GlobalContext)

  const [updated, isUpdated] = useState(false)



  const [user, setUser] = useState({

    name: '',
    email: '',
    number: '',
    gender: '',
    lookingfor: '',
    place: '',
    interest: ''


  })


  const handleSubmit = async (e) => {



    console.log(user)



    console.log('Button clicked')

    e.preventDefault()

    let formData = new FormData()

    formData.append('profile', profile.data)

    formData.append('profileData', preview)

    formData.append('name', user.name)

    formData.append('number', user.number)

    formData.append('email', user.email)

    formData.append('place', user.place)

    formData.append('interest', user.interest)

    formData.append('gender', user.gender)

    formData.append('lookingfor', user.lookingfor)



    try {

     axios.post(`${process.env.REACT_APP_SERVER_URL}/user/edit_profile`, formData, {

        withCredentials: true

      }).then((res) => {

        console.log(res)

      } ).catch(( err ) => {
        console.log(err)
      })

    } catch (err) {

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

            <img className='image_profile' alt="Remy Sharp" src={preview} />

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
      <div className="email">
        <span>Email</span>
        <input type="text" name="email" onChange={handleChange} />
      </div>

      <div className="gender" onChange={handleChange}>
        <label for="gender">Gender:</label>
        <input type="radio" value='Male' name="gender" /> Male
        <input type="radio" value='Female' name="gender" /> Female
        <input type="radio" value='Other' name="gender" /> Other

      </div>


      <div className="place">
        <span>Place</span>
        <input type="text" name="place" onChange={handleChange} />
      </div>
      <div className="lookingfor" onChange={handleChange}>
        <label for="lookingfor">Looking For:</label>
        <input type="radio" value='Male' name="lookingfor" /> Male
        <input type="radio" value='Female' name="lookingfor" /> Female
        <input type="radio" value='Other' name="loongfor" /> Other
      </div>

      <div className="interest">
        <span>Interests</span>
        <input type="text" name="interest" onChange={handleChange} />
      </div>



      <div onClick={handleSubmit} className="continue">
      <Link to='/'>

          <h4 >Continue</h4>
          </Link>
      </div>

    </div>
  )
}

export default EditProfile