import React, { useContext, useState } from 'react'
import axios from 'axios'
import { GlobalContext } from '../GlobalState';
import './AddPost.css'

function AddPost() {

    const data = useContext(GlobalContext)
    const [image, setImage] = useState({ data: '' })
    const [previewSource, setPreviewSource] = useState()
    const [uploaded, setUploader] = useState(false)

    const [post, setPost] = useState({

        captions: '',


    })



    const ChangeInput = (e) => {

        const { name, value } = e.target

        setPost({ ...post, [name]: value })


    }

    const Submit = (e) => {

        console.log('button clicked')

        console.log(image)

        e.preventDefault()

        const formData = new FormData()

        formData.append('image', image.data)
        formData.append('captions', post.captions)
        formData.append('imageData', previewSource)


        axios.post(`${process.env.REACT_APP_SERVER_URL}/posts/addpost`, formData, {

            headers: {

                'Authorization': `Bearer ${data.Data.userApi.token}`
            },

            withCredentials: true

        }

        ).then((res) => {

            alert("posted")


        }).catch((err) => {

            alert('failed , please try again')

        })


    }

    const handleFileInput = (e) => {

        console.log(e.target.files[0])

        setImage({

            data: e.target.files[0]

        })

        previewFile(e.target.files[0])
    }


    const previewFile = (file) => {

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {

            setPreviewSource(reader.result)

        }

    }



    return (
        <div className="addpost">

            <div className="text_area">

                <input type="text" onChange={ChangeInput} name='captions' placeholder='say something to your friends' />

            </div>

            <div className="input_field">

                {
                    previewSource && (

                        <img clasName='preview' src={previewSource} />

                    )
                }

                <input onChange={handleFileInput} className='addpost_input'  type="file"  name="file" id="file" class="inputfile" />
                <label for="file">Choose a file</label>
            </div>
            <div className="button" onClick={Submit}>

                <p> POST </p>

            </div>


        </div>
    )
}

export default AddPost