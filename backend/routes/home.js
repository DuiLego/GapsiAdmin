let express = require('express');

const session = require('../middlewares/session');

const controller = require('../controllers/home');

let router = express.Router();

router.post('/login', controller.loginAccountValidation, controller.loginAccount);
router.post('/signup', controller.signupAccountValidation, controller.signupAccount);
router.get('/session', session, controller.getAccount);

module.exports = router;
