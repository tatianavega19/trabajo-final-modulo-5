import { TrapezeController } from "../controller/aerialTrapezeController";
import { Router } from "express";

const trapezeRouter = Router();

trapezeRouter.get('/',TrapezeController.getAllFigures);
trapezeRouter.get('/history', TrapezeController.getHistory);
trapezeRouter.get('/:id',TrapezeController.getFigureById);

export { trapezeRouter }