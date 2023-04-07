import React, { useState, useEffect } from 'react'
import './MatchCards.css'
import MatchCard from 'react-tinder-card'
import axios from 'axios'
import { useContext } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { GlobalContext } from '../GlobalState';
import SwipeButtons from './SwipeButtons'

function MatchCards() {

    const [user, setUsers] = useState([])

    const [isUser, setIsUser] = useState(false)

    const data = useContext(GlobalContext)

    const userId = data.Data.userApi.Data.id

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getall`, {

            headers: {

                "Authorization": `Bearer ${data.Data.userApi.Data.token}`

            },

            withCredentials: true,

        }).then((result) => {

            console.log(result.data.genderwisedUser)

            


            setUsers(result.data.genderwisedUser)

            setIsUser(true)



        }).catch((err) => {

            console.log(err)
        })



    }, [data.Data.userApi.token])



    const swiped = (direction, personName) => {
        console.log("removing" + personName)

    }

    const outOfFrame = (personName) => {
        console.log(personName + "left the screen");
    }

    const Matched = (id) => {

        axios.post(`${process.env.REACT_APP_SERVER_URL}/friends/addfriend${id}/${userId}` ,  {

            headers: {

                "Authorization": `Bearer ${data.Data.userApi.Data.token}`

            },

            withCredentials: true,

        }).then((res) => {

            if(res.status == 200) {
                
                alert('whow... Matched....!')
            }
            
        }).catch((err) => {
            console.log(err)
        })


    }

    console.log(user)

    return (
        <div className="matchcards">

            {
                isUser ? <div className="matchcards__container">



                    {
                       user && user.map(match => {

                            console.log(match)
                            return (
                                <MatchCard
                                    className="swipe"
                                    key={"person.name"}
                                    preventSwipe={['up', 'down']}
                                    onSwipe={(dir) => swiped(dir, "person.name")}
                                    onCardLeftScreen={() => outOfFrame("person.name")}
                                >
                                    <div className="card" style={{ backgroundImage: `url(${match.profile})` }}>
                                        <h3 className='match_name'>{match.username}</h3>


                                    </div>

                                    <button onClick={() => Matched(match._id)}>Like</button>


                                </MatchCard>


                            )
                        })
                    }



                </div> : <div className="loader">
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            }



        </div>
    )
}

export default MatchCards
