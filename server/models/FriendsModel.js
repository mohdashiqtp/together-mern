const mongoose = require('mongoose')

const FriendsSchema = new mongoose.Schema({

    id : {
        type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            username: String,
    }
})


module.exports = mongoose.model( 'Friends' , FriendsSchema)
