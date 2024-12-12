import { Router } from 'express';
import { categoryController } from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.get('/name/:name', categoryController.getCategoryByName);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.patch('/:id', categoryController.updateCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);

export default categoryRouter;