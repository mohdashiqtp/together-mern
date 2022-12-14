const mongoose = require('mongoose')

const PostReaction = new mongoose.Schema({

    postId : {
      type :  String
    } ,

    userId : {

        type : String

    }


})


module.exports = mongoose.model( 'PostReaction' , PostReaction)