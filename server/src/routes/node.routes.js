import { Router } from 'express';
import { getNodeGuidanceHandler } from '../controllers/node.controller.js';

const router = Router();

router.post('/', getNodeGuidanceHandler);

export default router;
