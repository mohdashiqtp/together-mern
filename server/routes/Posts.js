const router = require('express').Router()
const auth = require('../middlewares/auth')
const multer = require('multer')
const postController = require('../Controllers/postController')
const uuidv4 = require('uuid/v4')

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, './public/images/postImage')
        
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


// add posts

router.post('/addpost', auth, upload.single('image') , postController.addpost)



// like post 

router.put('/like:id/:user/:like'  , postController.like)


// comment post

router.post('/comment:id/:user/:comment' , postController.comment)


//view specific post




module.exports = router
