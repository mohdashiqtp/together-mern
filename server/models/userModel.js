const mongoose = require('mongoose')
const Friends = require('./FriendsModel')
const Posts = require('./PostsModel')
const PostReaction = require('./PostReaction')
const Comment = require('./Comment')
const Like = require('./PostReaction')

const UserSchema = new mongoose.Schema({

  username: {

    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true

  },
  email: {
    type: String,
    unique: true,
    lowercase: true,

  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String,
  },
  mobile: {
    type: String,
    default: ''
  },
  profile_id: {
    type: String
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      username: String,
      email: { type: String, required: true, index: true }
    }],

  posts: [

    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      captions: String,
      image: String,
      like: [


            {
          type: mongoose.Schema.Types.ObjectId,
          ref: "posts",
          userId: String,
          postId: String,
          
  
        },

      ], comment: [

        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "posts",
          userId: String,
          postId: String,
        }
      ]
    }],

  posts: [  Posts.schema ],
  friends: [Friends.schema],
  like : [ PostReaction.schema ] ,

    comment :   [ Comment.schema ] 


}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)