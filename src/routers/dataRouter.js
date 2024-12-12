import { Router } from "express";
import { dataController } from "../controllers/dataController.js";

const dataRouter = Router();

dataRouter.get('/', dataController.getData);
dataRouter.get('/:id', dataController.getDataById);
dataRouter.get('/name/:name', dataController.getDataByName);
dataRouter.post('/', dataController.createData);
dataRouter.patch('/:id', dataController.updateData);
dataRouter.delete('/:id', dataController.deleteData);

export default dataRouter;