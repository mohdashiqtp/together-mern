import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import UserApi from './api/userApi'

export const GlobalContext = createContext()


const DataProvider = ({ children }) => {

    const [token, setToken] = useState()

    const login = localStorage.getItem('login')
    

    useEffect(() => {

        const refreshToken = async () => {

            const responce = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/refreshtoken`, {

                withCredentials: true
                
            }).then((res) => {

                console.log(res , "responce")

                setToken(res.data.accesstoken)


            }).catch((err) => {

                console.log(err , 'error')

            })

            console.log(responce)

        }

        setTimeout(() => {
            refreshToken()
        }, 10 * 60 * 1000)


        refreshToken()

    }, [])




    const Data = {

        token: [token, setToken],
        userApi: UserApi(token)

    }


    return (

        <GlobalContext.Provider value={{ Data }} >
    
            {children}
    
        </GlobalContext.Provider>
    
    )

}

export default DataProvider