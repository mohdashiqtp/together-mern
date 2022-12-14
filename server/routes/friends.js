const router = require('express').Router()
const auth = require('../middlewares/auth')
const friendController = require('../Controllers/friendController')


// for fetching all friends

router.get('/friends', auth, friendController.findfriends )


//add friend

router.post('/addfriend:id/:user',friendController.addfriend )

// remove friend 

router.delete('/delete:id', auth, friendController.removefriend)

// friends infromation 

router.get('/infor:id' , friendController.friendinfor)


module.exports = router
