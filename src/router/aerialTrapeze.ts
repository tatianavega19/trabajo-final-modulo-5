import { TrapezeController } from "../controller/aerialTrapezeController";
import { Router } from "express";
import {validatorAuth} from "../middleware/validator";

const trapezeRouter = Router();

trapezeRouter.get('/',validatorAuth,TrapezeController.getAllFigures);
trapezeRouter.get('/history',validatorAuth,TrapezeController.getHistory);
trapezeRouter.get('/:id',validatorAuth,TrapezeController.getFigureById);
trapezeRouter.get('/image/:id',validatorAuth,TrapezeController.getImageById);
trapezeRouter.get('/steps/:name',validatorAuth,TrapezeController.getStepsByName);
trapezeRouter.post('/create',validatorAuth,TrapezeController.createFigure);
trapezeRouter.patch('/:id',validatorAuth,TrapezeController.updateFigure);
trapezeRouter.delete('/:id',validatorAuth,TrapezeController.deleteFigure);

export { trapezeRouter };