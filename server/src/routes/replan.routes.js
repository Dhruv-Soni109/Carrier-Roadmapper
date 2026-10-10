import { Router } from 'express';
import { replanRoadmapHandler } from '../controllers/replan.controller.js';

const router = Router();

router.post('/', replanRoadmapHandler);

export default router;
