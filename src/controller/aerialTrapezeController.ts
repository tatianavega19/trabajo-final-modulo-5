import { Request, Response } from "express";
import { TrapezeModel } from "../model/aerialTrapezeModel";
import { validatePartialUser } from "../validation/validationSchema";

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
            res.status(201).json({ message: "Figure created successfully", name });
        } else {
            console.error("Error creating figure:", result.error);
            res.status(500).json({ error: "Error creating figure" });
        }
    }

    static updateFigure = (req: Request, res: Response) => {

        const validate = validatePartialUser(req.body);

        if (!validate.success)
            return res.status(400).json({ error: validate.error });

        const figureId = req.params.id;


        const figureData = { figureId, ...req.body };

        const response = TrapezeModel.updateFigure(figureData);

        if (response.error)
            return res.status(400).json(response);

        res.status(200).json(response);
    };

    static deleteFigure = (req: Request, res: Response) => {
        const { id } = req.params;
        const response = TrapezeModel.deleteFigure(id);

        if (!response.message) {
            return res.status(400).json({ error: "Error to delete user" });
        }

        return res.json(response);
    }

    static getImageById = (req: Request, res: Response) => {
        const { id } = req.params;
        const imageUrl = TrapezeModel.getUrlImage(id);

        if (typeof imageUrl === "string") {
            res.status(200).json({ imageUrl });
        } else {
            res.status(404).json({ error: imageUrl });
        }
    }

    static getStepsByName = (req: Request, res: Response) => {
        const { name } = req.params;
        const steps = TrapezeModel.getStepsByName(name);

        if (steps) {
            res.status(200).json(steps)
        } else {
            res.status(404).json({ error: `Steps not found for figure with name '${name}'` });
        }
    }
}

export { TrapezeController }