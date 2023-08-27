const express = require('express');
const router = express.Router();
const UserController = require('../../../controllers/v1/UserController');
const customerSelfAuthMiddleware = require("../../../middlewares/v1/auth/customerSelfAuthMiddleware")

router.post('/', UserController.createUserItem);
router.get('/:uuid', customerSelfAuthMiddleware, UserController.getUserItem);
router.get('/:uuid/address', UserController.getUserAddressCollection);
router.patch('/:uuid', UserController.patchUserItem);

module.exports = router;