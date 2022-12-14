import axios from 'axios'
import { useState , useEffect } from 'react'


const UserApi = (token) => {

    const [isLogged , setIsLogged] = useState(false)
    
    const [profile , setProfile] = useState()

    const [freinds , setFriends] = useState([])

    const [posts , setPosts] = useState([])

    const [email , setEmail] = useState('')

    const [mobile , setMobile] = useState('')

    const [username,setUsername] = useState('')


    const [id , setId] = useState()

   
        
    useEffect(() => {



        axios.get('http://localhost:5000/user/infor' , {

            headers: {

                'Authorization':`Bearer ${token}`

            },

            withCredentials: true , 

        }).then( (res) => {


            setIsLogged(true)

            setFriends(res.data.user.friends)

            setEmail(res.data.user.email)

            setMobile(res.data.user.mobile)

            setProfile(res.data.user.profile)

            setUsername(res.data.user.username)

            setPosts(res.data.user.posts)

            setId(res.data.user._id)


        } ).catch((err) => {

            console.log(err)

        })
      
    
      
    }, [ token ])

    


    const Data = {

        isLogged,
        token,
        email,
        mobile,
        profile,
        id,
        freinds,
        posts
    }

   return(

    {
        Data
    }
     
   )
    

}


export default UserApi
