import { Router } from 'express';
const router = Router();
import { list, getById, create, update, remove } from '../controllers/collectibleController.js';
import { importar } from "../controllers/collectibleImportController.js";
import { authenticateJWT, authorizeOwnerOrAdmin } from '../middleware/auth.js';

router.get('/', list);
router.get('/:id', getById);
router.post('/', authenticateJWT, create);
router.put('/:id', authenticateJWT, authorizeOwnerOrAdmin, update);
router.delete('/:id', authenticateJWT, authorizeOwnerOrAdmin, remove);
router.post("/importar/:cardId", authenticateJWT, importar);
    
export default router;
