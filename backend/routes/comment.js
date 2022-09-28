const express = require('express')
const router = express.Router({ mergeParams: true })

const comment = require('../controllers/comment')
const auth = require('../middleware/auth')

// create / post 
router.post('/', auth, comment.createComment)

// get
router.get('/', auth, comment.allComm)

// delete 
router.delete('/:id', auth, comment.deleteComment)

module.exports = router;