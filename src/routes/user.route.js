const router = require('express').Router()
const storage = require('../libs/multer')
const multer = require('multer')()
const {ListUser, ViewProfile, ChangePhoto} = require('../controller/user.controller')


router.get('/', ListUser)
router.get('/:username', ViewProfile)
router.post('/change-photo', multer.single('image'), ChangePhoto)


module.exports = router