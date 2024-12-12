import { Router } from 'express';
import dataRouter from './dataRouter.js';
import categoryRouter from './categoryRouter.js';

const router = Router();

router.use('/data', dataRouter);
router.use('/category', categoryRouter);

export default router;