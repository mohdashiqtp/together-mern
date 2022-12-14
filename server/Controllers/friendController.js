const User = require('../models/userModel')
const auth = require('../middlewares/auth')
const Friends = require('../models/FriendsModel')


const friendController = {

    findfriends : (req, res) => {

        try {
    
            User.findById(req.user.id, (err, user) => {

                console.log(user)
    
                const friends = user.friends
    
                res.status(200).json({friends})
    
            })
    
        } catch (err) {
            
            console.log(err)
    
        }
    
    } ,

    addfriend : async (req, res) => {

        try {
    
            const friend = req.params.id
    
    
             User.findById(req.params.user, (err, user) => {
    
                var friendsModel = new Friends()
                friendsModel._id = friend
                user.friends.push(friendsModel)
                user.save()
    
                if (err) return res.status(400).json({ msg: 'invalid request' })
    
    
    
                res.status(200).json({ msg: 'friend added' })
    
    
    
            })
    
    
        } catch (err) {
    
            console.log(err)
    
        }
    
    } ,

    removefriend : async (req, res) => {

        try {
    
    
            const toDelete = req.params.id
    
            const user = await User.findById(req.user.id)
    
            const has = User.findOneAndDelete(user.friends[toDelete])
    
            if(!has) res.status(400).json({ msg : "cant remove" })
    
            res.status(200).json({ msg : "friend removed" })
    
    
        } catch (err) {
    
            res.status(500).json({ msg: err.message })
    
        }
    } ,

    friendinfor :  async (req, res) => {
        try{
    
            const userinfromation = await User.findByid(req.params.id)
    
            if(!userinfromation) return res.status(400).json({ msg : ' user not found' })
    
            res.status(200).json({ userinformation })
    
        } catch(err) {
    
            if(err) return res.status(500).json({ msg : err.message })
    
        }
    }

}

module.exports = friendController