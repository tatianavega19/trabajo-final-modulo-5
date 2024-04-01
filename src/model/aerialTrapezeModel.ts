import jsonfile from "jsonfile";
import crypto from "node:crypto";

class TrapezeModel {

    static readDatabase() {
        return jsonfile.readFileSync("./src/database/trapeze.json");
    };

    static getAllFigures(query: any) {
        const { difficulty } = query
        const trapezeData = this.readDatabase();

        const mapFigure = (figure: any) => ({
            id: figure.id,
            name: figure.name,
            description: figure.description,
            steps: figure.steps,
            difficulty: figure.difficulty,
            images: figure.images
        });

        if (difficulty) {
            const trapezeDataByDifficulty = trapezeData.trapeze.filter((figure: any) => figure.difficulty.toLowerCase() === difficulty.toLocaleLowerCase())
            return trapezeDataByDifficulty.map(mapFigure);
        };

        return trapezeData.trapeze.map(mapFigure);
    };

    static getHistory() {
        const trapezeData = this.readDatabase();
        return trapezeData.history;
    };

    static readFigureById(FigureId: string) {
        const trapezeData = this.readDatabase();
        const figure = trapezeData.trapeze.find((f: any) => f.id === FigureId);

        if (!figure) return { error: "Figure not found!" };

        return figure;
    };

    static createFigure(figureData: any) {
        const trapezeData = this.readDatabase();
        const { name, description, steps, difficulty, images } = figureData;

        const id = crypto.randomUUID();

        const newFigure = { id, name, description, steps, difficulty, images };

        trapezeData.trapeze.push(newFigure);

        jsonfile.writeFileSync("./src/database/trapeze.json", trapezeData);

        const updatedTrapezeData = this.readDatabase();
        const createdFigure = updatedTrapezeData.trapeze.find((figure: any) => figure.id === id);

        if (!createdFigure) return { error: "Error creating figure" };

        return { message: "successfully created figure", id };
    };

    static updateFigure(figureData: any) {
        const { name, description, steps, difficulty, images, figureId } = figureData;
        const trapezeData = this.readDatabase();
        const figureToUpdate = trapezeData.trapeze.find((figure: any) => figure.id === figureId);

        if (!figureToUpdate) return { error: "Figure not found!" };

        if (name) figureToUpdate.name = name;
        if (description) figureToUpdate.description = description;
        if (steps) figureToUpdate.steps = steps;
        if (difficulty) figureToUpdate.difficulty = difficulty;
        if (images) figureToUpdate.images = images;

        jsonfile.writeFileSync("./src/database/trapeze.json", trapezeData);

        const updatedFigure = {
            name: figureToUpdate.name,
            description: figureToUpdate.description,
            steps: figureToUpdate.steps,
            difficulty: figureToUpdate.difficulty,
            images: figureToUpdate.images
        };

        return { message: "Figure updated successfully", updatedFigure};
    };

    static deleteFigure(figureId: string) {
        const trapezeData = this.readDatabase();

        const updatedFigures = trapezeData.trapeze.filter((figure: any) => figure.id.toLowerCase() !== figureId.toLowerCase());

        if (updatedFigures.length === trapezeData.trapeze.length) return { error: "Figure not found" };

        trapezeData.trapeze = updatedFigures;

        jsonfile.writeFileSync("./src/database/trapeze.json", trapezeData);

        return { message: "Successfully deleted figure" };
    };

    static getUrlImage(id: string) {
        const trapezeData = this.readDatabase();
        const figure = trapezeData.trapeze.find((figure: any) => figure.id.toLowerCase() === id.toLowerCase());

        if (!figure) return { error: `Figure with ID ${id} not found` };

        const { name, images } = figure;
        const imageUrl = images.jpg.image_url;

        if (!imageUrl) return { error: `Image URL not found for the figure with ID ${id}` };

        return { name, imageUrl };
    };

    static getStepsByName(name: string) {
        const trapezeData = this.readDatabase();
        const figure = trapezeData.trapeze.find((figure: any) => figure.name.toLowerCase() === name.toLowerCase());

        if (!figure) return { error: `Figure with name '${name}' not found` };

        const { steps, images } = figure;
        const imageUrl = images.jpg.image_url;

        if (!steps || !imageUrl) return { error: `Steps not found for figure with name:'${name}'` };

        return { message: name, steps, imageUrl };

    };
};

export { TrapezeModel };