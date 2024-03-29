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

    static createFigure = (req: Request, res: Response) => {
        const { name, description, steps, difficulty, images } = req.body;

        if (!name || !description || !steps || !difficulty || !images) {
            return res.status(400).json({ error: "All fields are required: name, description, steps, difficulty, images" });
        }

        const result = TrapezeModel.createFigure({ name, description, steps, difficulty, images });

        if (result.success) {
            res.status(201).json({ message: "Figure created successfully", name});
        } else {
            console.error("Error creating figure:", result.error);
            res.status(500).json({ error: "Error creating figure" });
        }
    }
}

export { TrapezeController }