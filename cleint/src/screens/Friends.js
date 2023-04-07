import React from 'react'
import Friend from '../components/Friend'
import { useContext } from 'react'
import { GlobalContext } from '../GlobalState';
import './friends.css'

function Friends() {

  
  const data = useContext(GlobalContext)

  const friends = data.Data.userApi.Data.freinds

  return (
    <div className="friends">
        <div className="friends_conatiner">

            <div className="heading">
                <h1>Matches</h1>
            </div>

            <div className="friendslist">

              

              {
                friends && friends.map((friend)=>{


                  return(
                    
                    < Friend  friends={friend} data={data}/>

                  )

                })
              }


            </div>

        </div>

    </div>
  )
}

export default Friends