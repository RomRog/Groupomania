const express = require('express')
const router = express.Router()

const profile = require('../controllers/profile')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

// read / get
router.get('/:id', auth, profile.getProfile)

// update / put
router.put('/:id', auth, multer, profile.editProfile)


module.exports = router;