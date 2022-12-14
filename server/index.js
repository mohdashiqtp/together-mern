const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require( './routes/userRouter')
const friendRouter = require('./routes/friends')
const conversation = require('./routes/conversation')
const messages = require('./routes/message')
const Posts = require('./routes/Posts')
require('dotenv').config()

const app = express()

// middlewares

app.use(express.json())
app.use(cookieParser())
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use((error , req, res, next) => {

    res.redirect('/5000')

})

// Support URL-encoded bodies.

app.use(bodyParser.urlencoded({
    extended: true
}));

// enable cors

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))


//user Router

app.use('/user', userRouter)
app.use('/friends', friendRouter)
app.use('/posts' , Posts)
app.use('/user/coversations', conversation )
app.use('/user/conversations/messages' , messages )






//mongo db

const URL = process.env.MONGODB_URL

const connection = async () => {

    try {

        mongoose.connect(URL, {

            useNewUrlParser: true,
            useUnifiedTopology: true

        }, (res) => {
    

            if (res) console.log(res.message)

            console.log('mongo db connection succed')

        })

    } catch (err) {

        if (err) res.status(500).json({ msg: err.message })

    }
}

connection()



//connecting Port
const port = process.env.PORT || 5000

app.listen(port, () => {

    console.log(`connectiong to port ${port}`)

})