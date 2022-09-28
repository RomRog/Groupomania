const express = require('express')
const router = express.Router()

const user = require('../controllers/user')
const auth = require('../middleware/auth')

// create / post
router.post('/signup', user.signup)
router.post('/login', user.login)

// read / get
router.get('/', auth, user.all)
router.get('/profile', auth, user.oneUserProfile)
router.get('/likes', auth, user.oneUser)

// delete
router.delete('/:id', auth, user.deleteUser)
router.delete('/', auth, user.deleteOwn)

module.exports = router;
