const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');


//post routes
router.route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);
router.route('/:id')
    .get(postController.getSinglePost)
    .put(postController.updatePost)
    .delete(postController.deletePost);


module.exports=router;