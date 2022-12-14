const router = require('express').Router()
const auth = require('../middlewares/auth')
const multer = require('multer')
const userController = require('../Controllers/userController')
uuidv4 = require('uuid/v4')
const url = 'http://localhost:5000'

// multer configurations

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/profile')
    },
    filename: (req, file, cb) => {

        const fileName = file.originalname.toLowerCase().split(' ').join('-');

        cb(null, uuidv4() + '-' + fileName)
    },
})

var upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 },
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// Login route

router.post('/login', userController.login)


// singup route

router.post('/singup', userController.singup)

// logout 

router.get('/logout' , userController.logout)

// searchUser 


router.get('/search' , userController.searchUser)


// fetching all users

router.get('/getall', auth, userController.getall )

// edit profile

router.post('/edit_profile', auth, upload.single('profile'), userController.editprofile)

// Refresh token Route

router.get('/refreshtoken', userController.refreshtoken )

// transform id to a user

router.get('/idtouser', auth, userController.idtouser )

// getting user information

router.get('/infor', auth, userController.infor )

// find specific user details

router.get('/infor:id', auth, userController.specificuser)


module.exports = router


