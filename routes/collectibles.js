const express = require('express');
const router = express.Router();
const collectibleController = require('../controllers/collectibleController');
const { authenticateJWT, authorizeOwnerOrAdmin } = require('../middleware/auth');

router.get('/', collectibleController.list);
router.get('/:id', collectibleController.getById);
router.post('/', authenticateJWT, collectibleController.create);
router.put('/:id', authenticateJWT, authorizeOwnerOrAdmin, collectibleController.update);
router.delete('/:id', authenticateJWT, authorizeOwnerOrAdmin, collectibleController.remove);

module.exports = router;
