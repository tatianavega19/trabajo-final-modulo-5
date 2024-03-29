import { TrapezeController } from "../controller/aerialTrapezeController";
import { Router } from "express";

const trapezeRouter = Router();

trapezeRouter.get('/',TrapezeController.getAllFigures);

export { trapezeRouter }