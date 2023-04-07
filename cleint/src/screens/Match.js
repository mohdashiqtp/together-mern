import React , { useState , useEffect } from 'react'
import Header from '../components/Header'
import MatchCards from '../components/MatchCards'
import Navigation from '../components/Navigation'
import SwipeButtons from '../components/SwipeButtons'
import './Match.css'

export default function Match() {

    
    return (
        <div className="Match">

            <div className="header">

                <Header />

            </div>
            <div className="heading_match">
                <h1>Meet Your Partner...</h1>
            </div>
            <div className="matchBody">

                <MatchCards  />


            </div>
            <div className="navigation">

                <Navigation />

            </div>

        </div>
    )
}
