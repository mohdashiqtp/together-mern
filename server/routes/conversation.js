const router = require('express').Router()
const conversation = require('../models/conversationModel')
const auth = require('../middlewares/auth')


router.post('/', async (req, res) => {


    try {

        const newConversation = new conversation({

            members: [req.body.senderId, req.body.recieverId]
    
        })

        const savedConversation = await newConversation.save()

        res.status(200).json({ savedConversation })



    } catch (err) {
        res.status(500).json({ err })
    }
})


router.get('/:userId' , auth ,async (req , res) => {

    try{


        const Conversation = await conversation.find({

            members : { $in :[req.params.userId] }

        })

        res.status(200).json({ Conversation })



    } catch(err) {

        res.status(500).send(err)

    }
    
})



module.exports = router