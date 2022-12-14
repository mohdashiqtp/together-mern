const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({

    image_id:{
        type:String,
    } ,

    image:{
        type : String ,
        required : true
    },
    captions:{

        type:String,
    } ,



    
})


module.exports = mongoose.model( 'Posts' , PostSchema)