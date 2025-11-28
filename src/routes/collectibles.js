const express = require('express');
const router = express.Router();
const collectibleController = require('../controllers/collectibleController');
const importController = require("../controllers/collectibleImportController");
const { authenticateJWT, authorizeOwnerOrAdmin } = require('../middleware/auth');

router.get('/', collectibleController.list);
router.get('/:id', collectibleController.getById);
router.post('/', authenticateJWT, collectibleController.create);
router.put('/:id', authenticateJWT, authorizeOwnerOrAdmin, collectibleController.update);
router.delete('/:id', authenticateJWT, authorizeOwnerOrAdmin, collectibleController.remove);
router.post("/importar/:cardId", authenticateJWT, importController.importar);

module.exports = router;
