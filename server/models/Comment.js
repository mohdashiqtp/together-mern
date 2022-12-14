const mongoose = require('mongoose')

const Comment = new mongoose.Schema({

    postId : {
      type :  String
    } ,

    userId : {

        type : String

    } , 
    comment : {

        type: String

    }


})


module.exports = mongoose.model( 'Comment' , Comment)