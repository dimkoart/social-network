export {}
const Router = require('express');
const router = new Router();

const userRouter = require('./userRoutes');
const postRouter = require('./postRoutes');

router.use('/profiles', userRouter)
router.use('/posts', postRouter);

module.exports = router