const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({

   members : {
     type:Array
   } , 
    
 } , 
 { timeseries : true }
 )


module.exports = mongoose.model( 'conversation' , conversationSchema)