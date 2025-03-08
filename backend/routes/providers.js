let express = require('express');

const session = require('../middlewares/session');

const controller = require('../controllers/providers');

let router = express.Router();

router.post('/list', session, controller.getListProvidersValidation, controller.getListProviders);
router.post('/add', session, controller.addProviderValidation, controller.addProvider);
router.post('/edit', session, controller.editProviderValidation, controller.editProvider);
router.post('/delete', session, controller.deleteProviderValidation, controller.deleteProvider);

module.exports = router;
