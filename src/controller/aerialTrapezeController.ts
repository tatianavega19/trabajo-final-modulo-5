import { Request, Response } from "express";
import { TrapezeModel } from "../model/aerialTrapezeModel";

abstract class TrapezeController {
    static getAllFigures = (req: Request, res: Response) => {
        const figures = TrapezeModel.getAllFigures();
        res.json(figures);
    };

    static getHistory = (req: Request, res: Response) => {
        const history = TrapezeModel.getHistory();
        res.json(history);
    };

    static getFigureById = (req: Request, res: Response) => {
        const FigureId = req.params.id;

        try {
            const user = TrapezeModel.readFigureById(FigureId);

            if ("error" in user) {
                return res.status(404).json(user);
            } else {
                return res.json(user);
            }
        } catch (error) {
            console.error("Error reading user by ID");
            return res.status(500).json({ error: "Server error" });
        };
    }
}

export { TrapezeController }