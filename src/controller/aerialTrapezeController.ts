import { Request, Response } from "express";
import { TrapezeModel } from "../model/aerialTrapezeModel";

abstract class TrapezeController {
    static getAllFigures = (req: Request, res: Response) => {
        const figures = TrapezeModel.getAllFigures();
        res.json(figures);
    };

    static getHistory = (req: Request, res: Response) => {
        try {
            const history = TrapezeModel.getHistory();
            res.json(history);
        } catch (error) {
            console.error("Error getting history:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export {TrapezeController}