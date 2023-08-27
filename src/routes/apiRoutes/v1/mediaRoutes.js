const express = require('express');
const router = express.Router();
const MediaController = require('../../../controllers/v1/MediaController');
const {processFileMiddleware} = require('../../../services/imageProcessService');
const { route } = require('./authRoutes');


router.post('/', processFileMiddleware, MediaController.upload);


module.exports = router;