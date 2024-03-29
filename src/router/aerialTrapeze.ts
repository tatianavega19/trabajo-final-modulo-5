import { TrapezeController } from "../controller/aerialTrapezeController";
import { Router } from "express";

const trapezeRouter = Router();

trapezeRouter.get('/',TrapezeController.getAllFigures);
trapezeRouter.get('/history',TrapezeController.getHistory);
trapezeRouter.get('/:id',TrapezeController.getFigureById);
trapezeRouter.get('/image/:id',TrapezeController.getImageById);
trapezeRouter.get('/steps/:name', TrapezeController.getStepsByName)
trapezeRouter.post('/create',TrapezeController.createFigure);
trapezeRouter.patch('/:id',TrapezeController.updateFigure);
trapezeRouter.delete('/:id',TrapezeController.deleteFigure);

export { trapezeRouter }