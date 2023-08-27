const express = require('express');
const router = express.Router();
const BusinessServiceController = require('../../../controllers/v1/BusinessServiceController');

router.get('/', BusinessServiceController.getBusinessServiceCollection);
router.get('/:uuid', BusinessServiceController.getBusinessServiceItem);
router.post('/', BusinessServiceController.createBusinessServiceItem);
router.patch('/:uuid', BusinessServiceController.patchBusinessServiceItem);

module.exports = router;