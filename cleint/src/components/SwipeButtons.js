import React from 'react'
import './SwipeButtons.css'
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import FlashOnIcon from '@mui/icons-material/FlashOn';

function SwipeButtons() {


    return (
        <div className="swipeButtons">
            <Button   className="swipeButtons__repeat">
                <ReplayIcon fontSize="large" />
            </Button>
            <Button   className="swipeButtons__left">
                <CloseIcon fontSize="large" />
            </Button>
            <Button   className="swipeButtons__star">
                <StarBorderIcon fontSize="large" />
            </Button>
            <Button   className="swipeButtons__right">
                <FavoriteIcon fontSize="large" />
            </Button>
            <Button   className="swipeButtons__lightning">
                <FlashOnIcon fontSize="large" />
            </Button>
            
        </div>
    )
}

export default SwipeButtons
