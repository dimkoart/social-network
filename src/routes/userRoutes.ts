export {}
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const Router = require("express");
const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/getbyid',  userController.getUserInfo);
router.get('/getbyemail', authMiddleware, userController.getUserByEmail);
router.post('/updateuser', authMiddleware, userController.updateUserInfo);
router.post('/subscribeemail', authMiddleware, userController.subscribeEmailNotify);
router.post('/unsubscribeemail', authMiddleware, userController.unSubEmailNotify);

module.exports = router;