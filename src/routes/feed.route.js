const router = require('express').Router()
const storage = require('../libs/multer')
const multer = require('multer')()
const { AddPost, DeletePost, EditPost, ListPost } = require('../controller/media.controller')

router.post('/post', multer.single('image_url'), AddPost)
router.put('/update-caption/:id', EditPost)
router.delete('/:id', DeletePost)
router.get('/', ListPost)

module.exports = router