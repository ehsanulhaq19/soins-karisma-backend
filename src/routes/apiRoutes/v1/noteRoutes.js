const express = require('express');
const router = express.Router();
const NoteController = require('../../../controllers/v1/noteController');

router.get('/:uuid', NoteController.getNote);
router.patch('/:uuid', NoteController.updateNote);
router.delete('/:uuid', NoteController.deleteNote);

module.exports = router;