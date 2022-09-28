const express = require('express')
const router = express.Router()

const post = require('../controllers/post')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const likesRoutes = require('./likes')
const commentsRoutes = require('./comment')

// create / post
router.post('/', auth, multer, post.createPost)

// read / get 
router.get('/', auth, post.allPost)
router.get('/:id', auth, post.onePost)

// delete 
router.delete('/:id', auth, post.deletePost)

router.use('/:postId/likes', likesRoutes)
router.use('/:postId/comments', commentsRoutes)

module.exports = router;