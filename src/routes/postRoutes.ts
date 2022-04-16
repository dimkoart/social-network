export {}
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const Router = require("express");
const router = new Router();

router.post('/create', authMiddleware, postController.createPost);
router.post('/delete', authMiddleware, postController.deletePost);
router.post('/updatepost', authMiddleware, postController.updatePost);
router.get('/getallposts', authMiddleware, postController.getAllPosts);
router.get('/getuserposts', authMiddleware, postController.getUserPosts);
router.get('/getlikes', authMiddleware, postController.getLikes);
router.post('/likepost', authMiddleware, postController.likePost);
router.post('/changephotofilter', authMiddleware, postController.changePhotoFilter);

module.exports = router;