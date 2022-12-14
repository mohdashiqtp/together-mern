const  cloudinary  = require('../utils/cloudinary')
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4')
const url = 'http://localhost:5000'
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const User = require('../models/userModel')

const userController = {

    login :  async (req, res, next) => {

        try {
    
            const { username, password } = req.body
    
            const user = await User.findOne({ username })
    
            // user checking
    
            if (!user) res.status(400).json({ msg: 'user not found' })
    
    
            // hashing the passwords
    
    
            await bcrypt.compare(password, user.password, (err, result) => {
    
                if (err) res.status(400).json({ msg: 'incorrect pssword' })
    
    
                // If login success, create accesstoken and refreshtoken
    
                const accesstoken = createAccessToken({ id: user._id })
                const refreshtoken = createRefreshToken({ id: user._id })
    
                res.cookie('refreshtoken', refreshtoken, {
    
                    path: '/',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: false // serving on http only
    
                })
    
                res.cookie('accesstoken', accesstoken, {
    
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: false // serving on http only
    
                })
    
    
                res.json({ accesstoken })
    
            })
    
    
        } catch (err) {
    
            const error = new Error(err)
    
            err.httpStatusCode = 500
    
            return next(error)
    
        }
    
    } ,

    singup : async (req, res, next) => {

        try {
    
            const { email, username, password } = req.body
    
            const Email = await User.findOne({ email })
    
            const Username = await User.findOne({ username })
    
            // checking email
    
            if (Email) res.status(400).json({ msg: ' email already exists ' })
    
            // checking username
    
            // if (Username) res.status(400).json({ msg: 'username already exists' })
    
    
    
    
            // hashing the passwords
    
            const saltrounds = 10
    
    
    
            await bcrypt.genSalt(saltrounds, async (err, salt) => {
    
                await bcrypt.hash(password, salt, async (err, result) => {
    
                    const newUser = await User({
    
                        _id: new mongoose.Types.ObjectId(),
                        username: username,
                        password: result,
                        email: email,
    
                    })
    
                    newUser.save()
    
    
    
                    // create jsonwebtoken to authentication
    
                    var accesstoken = createAccessToken({ id: newUser._id })
                    var refreshtoken = createRefreshToken({ id: newUser._id })
    
    
                    res.cookie('refreshtoken', refreshtoken, {
                        httpOnly: true,
                        secure: false,
                        path: '/user/refreshtoken',
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    })
    
    
                    res.status(200).json({ msg: 'user created succefully', accesstoken })
    
    
                })
    
            })
    
    
    
        } catch (err) {
    
            const error = new Error(err)
    
            err.httpStatusCode = 500
    
            return next(error)
    
    
        }
    
    },

    getall : async (req, res) => {

        try {
    
            const user = await User.find()
    
    
            res.status(200).json({ user });
    
    
    
        } catch (err) {
    
            if (err) return res.status(400).json({ msg: 'not user found please try again later' })
    
        }
    
    
    
    } ,
    editprofile :  async (req, res) => {

        try {
    
            const { profileData , username, email, mobile } = req.body

            cloudinary.uploader.upload( profileData ,  { folder : 'profile' }).then( async (result)=>{

                const updated = await User.findOneAndUpdate({ _id: req.user.id },
                    {
        
                        $set: {
        
                            username: username,
                            email: email,
                            mobile: mobile,
                            profile : result.secure_url,
                            profile_id : result.public_id
                        }
                    },
        
                    {
                        upsert: true,
                        returnDocument: 'after', // this is new !
                    }
        
                )
    
                console.log(updated)
        
                if (!updated) return res.status(400).json({ msg: 'updation failed' })
        
        
                res.status(200).json({ msg: 'user updated' })



            }).catch((err)=>{

                console.log(err)

            })


        } catch (err) {
    
            return res.status(500).json({err })
    
        }
    
    } ,

    logout: (req , res) => {

        try{

            res.clearCookie()

            res.status(200).json({ err : "logout succefully"})

        } catch(err){
            res.status(500).json(err)
        }

    } ,

    searchUser : async (req , res) => {

        try{

            const  { search }  = req.body

            console.log(req.body)

            const result = await User.find({ username : search })

            res.status(200).json({ result })

        } catch(err) {

            res.status(400).json({ err : err.message })

        }

    } ,

    refreshtoken :  (req, res) => {


        try {
    
            const rf_token = req.cookies.refreshtoken
    
    
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    
    
                const accesstoken = createAccessToken({ id: user.id })
    
    
                res.json({ user, accesstoken })
    
    
            })
    
        } catch (err) {
    
    
            return res.status(500).send( err )
    
        }
    
    } ,

    idtouser :  async (req, res) => {
        try {
    
            const users = req.body
    
            User.find(users, (err, result) => {
    
                if (err) return res.status(400).json({ msg: 'Not found' })
    
                res.status(200).json({ result })
    
    
            })
    
    
    
        } catch (err) {
    
            res.status(500).json({ msg: err.message })
    
        }
    },

    infor : async (req, res) => {

        try {
    
    
            const user = await User.findById(req.user.id)
    
            if (!user) return res.status(400).json({ msg: "User does not exist." })
    
    
            res.json({ user })
    
        } catch (err) {
    
            return res.status(500).json({ msg: err.message })
    
        }
    
    },

    specificuser :  async (req, res) => {

        try {
    
            const param = req.params.id
    
            const user = await User.findById(param)
    
            res.status(200).json({user})
    
    
        } catch (err) {
    
            return res.status(500).json({ msg: err.message })
    
        }
    
    }
    

}

// create accesss toke and refresh token

const createAccessToken = (user) => {

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })

}

const createRefreshToken = (user) => {

    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

}

module.exports = userController