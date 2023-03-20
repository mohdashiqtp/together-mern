import React,{useState,useEffect} from 'react'
import './MatchCards.css'
import MatchCard from 'react-tinder-card'
import axios from 'axios'

function MatchCards() {
    const [people,setPeople]=useState([])

    useEffect(() => {

        

        async function fetchData(){
            const req=await axios.get('/tinder')

            setPeople(req.data)

        }

        fetchData()
        
    }, [])

    

    const swiped=(direction,personName)=>{
        console.log("removing"+personName)

    }

    const outOfFrame=(personName)=>{
        console.log(personName+"left the screen");
    }


    return (
        <div className="matchcards">

            
            <div className="matchcards__container">


            {/* {people.map(person => {
                return ( */}
                    <MatchCard
                     className="swipe"
                     key={"person.name"}
                     preventSwipe={['up','down']}
                     onSwipe={(dir)=>swiped(dir,"person.name")}
                     onCardLeftScreen={()=>outOfFrame("person.name")}
                    >
                    <div className="card" style={{backgroundImage:`url(${"data:image/jpeg;base64,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"})`}}>
                        <h3>{"person.name"}</h3>


                    </div>


                    </MatchCard>
                    

{/* 
                    )
            })}
    */}

            </div>
        </div>
    )
}

export default MatchCards
