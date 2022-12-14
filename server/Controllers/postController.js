const cloudinary = require('../utils/cloudinary')
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')
const Posts = require('../models/PostsModel')
const User = require('../models/userModel')
const PostReaction = require('../models/PostReaction')
const Comment = require('../models/Comment')





const postController = {

    addpost: async (req, res) => {

        try {


            const { captions, imageData } = req.body

            await cloudinary.uploader.upload(imageData, { folder: "posts" }).then((result) => {
                console.log(res)

                User.findById(req.user.id, (err, user) => {

                    var PostModel = new Posts()
                    PostModel.id = req.user.id
                    PostModel.captions = captions
                    PostModel.image = result.secure_url
                    PostModel.image_id = result.public_id
                    PostModel.like = {}
                    PostModel.comment = {}
                    user.posts.push(PostModel)
                    user.save()

                    console.log(user)


                    if (err) return res.status(400).json({ err })


                    res.status(200).json({ msg: 'profile updated', user })

                })


            }).catch((err) => {
                console.log(err)
            })


        } catch (err) {

            return res.status(400).json({ err })

        }
    },

    like: async (req, res) => {


        try {

            User.findById(req.params.like, async (err, user) => {

                

                var CommentModel = new Comment()

                CommentModel.postId = req.params.id,

                CommentModel.userId = req.params.user

                user.like.push(CommentModel)

                user.save()

                console.log(user)

                if (err) return res.status(400).json({ err })


                res.status(200).json({ msg: 'profile updated', user }) 

            })



        } catch (err) {



            res.status(500).json({ err })

        }



    },

    comment: async (req, res) => {

        try {

            const { comment } = req.body


             User.findById(req.params.user, async (err, user) => {

                var CommentModel = new PostReaction()

                CommentModel.postId = req.params.id,

                CommentModel.userId = req.params.user

                CommentModel.comment = comment

                user.like.push(CommentModel)

                user.save()

                console.log(user)

                if (err) return res.status(400).json({ err })


                res.status(200).json({ msg: 'profile updated', user })

            })


        } catch (err) {
            res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = postController