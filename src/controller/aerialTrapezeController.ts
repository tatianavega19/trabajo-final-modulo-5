import { Request, Response } from "express";
import { TrapezeModel } from "../model/aerialTrapezeModel";
import { validatePartiaTrapeze, } from "../validation/validationSchemaTrapeze";

abstract class TrapezeController {
    static getAllFigures = (req: Request, res: Response) => {
        const figures = TrapezeModel.getAllFigures(req.query);
        res.json(figures);
    };

    static getHistory = (req: Request, res: Response) => {
        const history = TrapezeModel.getHistory();
        res.json(history);
    };

    static getFigureById = (req: Request, res: Response) => {
        const FigureId = req.params.id;
        const result = TrapezeModel.readFigureById(FigureId);
        if (result.error) return res.status(404).json(result);

        return res.json(result);
    };

    static createFigure = (req: Request, res: Response) => {
        const { name, description, steps, difficulty, images } = req.body;

        if (!name || !description || !steps || !difficulty || !images) {
            return res.status(400).json({ error: "All fields are required: name, description, steps, difficulty, images" });
        };

        const result = TrapezeModel.createFigure({ name, description, steps, difficulty, images });

        if (result.error)  res.status(500).json({ error: "Error creating figure" })

        res.status(201).json({ message: "Figure created successfully", name })
    };

    static updateFigure = (req: Request, res: Response) => {

        const validate = validatePartiaTrapeze(req.body);

        if (!validate.success) return res.status(400).json({ error: validate.error });

        const figureId = req.params.id;

        const figureData = { figureId, ...req.body };

        const result = TrapezeModel.updateFigure(figureData);

        if (result.error) return res.status(400).json(result);

        res.status(200).json(result);
    };

    static deleteFigure = (req: Request, res: Response) => {
        const { id } = req.params;
        const result = TrapezeModel.deleteFigure(id);

        if (!result.message) return res.status(400).json({ error: "error request" });

        return res.json(result);
    };

    static getImageById = (req: Request, res: Response) => {
        const { id } = req.params;
        const result = TrapezeModel.getUrlImage(id);

        if (result.error) res.status(200).json({ error: result });

        return res.status(200).json({ message: result });
    };

    static getStepsByName = (req: Request, res: Response) => {
        const { name } = req.params;
        const result = TrapezeModel.getStepsByName(name);
        if (result.error) res.status(404).json(result);
        res.status(200).json(result);
    };
};

export { TrapezeController };