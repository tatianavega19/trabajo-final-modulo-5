import { Request, Response } from "express";
import { TrapezeModel } from "../model/aerialTrapezeModel";

abstract class TrapezeController {
    static getAllFigures = (req: Request, res: Response) => {
        const figures = TrapezeModel.getAllFigures();
        res.json(figures);
    }
}

export {TrapezeController}