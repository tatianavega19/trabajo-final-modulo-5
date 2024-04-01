import jsonfile from "jsonfile";
import crypto from "node:crypto";

class TrapezeModel {

    static readDatabase() {
        return jsonfile.readFileSync("./src/database/trapeze.json");
    };

    static getAllFigures(query: any) {
        const { difficulty } = query
        const trapecioData = this.readDatabase();

        const mapFigure = (figure: any) => ({
            id: figure.id,
            name: figure.name,
            description: figure.description,
            steps: figure.steps,
            difficulty: figure.difficulty,
            images: figure.images
        });

        if (difficulty) {
            const trapecioDataByDifficulty = trapecioData.trapecio.filter((figure: any) => figure.difficulty.toLowerCase() === difficulty.toLocaleLowerCase())
            return trapecioDataByDifficulty.map(mapFigure);
        };

        return trapecioData.trapecio.map(mapFigure);
    };

    static getHistory() {
        const trapecioData = this.readDatabase();
        return trapecioData.history;
    };

    static readFigureById(FigureId: string) {
        const trapecioData = this.readDatabase();
        const figure = trapecioData.trapecio.find((f: any) => f.id === FigureId);

        if (!figure) return { error: "Figure not found!" };

        return figure;
    };

    static createFigure(figureData: any) {
        const trapecioData = this.readDatabase();
        const { name, description, steps, difficulty, images } = figureData;

        const id = crypto.randomUUID();

        const newFigure = { id, name, description, steps, difficulty, images };

        trapecioData.trapecio.push(newFigure);

        jsonfile.writeFileSync("./src/database/trapeze.json", trapecioData);

        const updatedTrapecioData = this.readDatabase();
        const createdFigure = updatedTrapecioData.trapecio.find((figure: any) => figure.id === id);
    
        if (!createdFigure) return { error: "Error creating figure" };

        return { message: "successfully created figure", id };
    };

    static updateFigure(figureData: any) {
        const { name, description, steps, difficulty, images, figureId } = figureData;
        const trapecioData = this.readDatabase();
        const figureToUpdate = trapecioData.trapecio.find((figure: any) => figure.id === figureId);

        if (!figureToUpdate) return { error: "Figure not found!" };

        if (name) figureToUpdate.name = name;
        if (description) figureToUpdate.description = description;
        if (steps) figureToUpdate.steps = steps;
        if (difficulty) figureToUpdate.difficulty = difficulty;
        if (images) figureToUpdate.images = images;

        jsonfile.writeFileSync("./src/database/trapeze.json", trapecioData);

        return { message: "Figure updated successfully", updatedFigure: figureToUpdate };
    };

    static deleteFigure(figureId: string) {
        const trapecioData = this.readDatabase();

        const updatedFigures = trapecioData.trapecio.filter((figure: any) => figure.id.toLowerCase() !== figureId.toLowerCase());

        if (updatedFigures.length === trapecioData.trapecio.length) return { error: "Figure not found" };

        trapecioData.trapecio = updatedFigures;

        jsonfile.writeFileSync("./src/database/trapeze.json", trapecioData);

        return { message: "Successfully deleted figure" };
    };

    static getUrlImage(id: string) {
        const trapecioData = this.readDatabase();
        const figure = trapecioData.trapecio.find((figure: any) => figure.id.toLowerCase() === id.toLowerCase());

        if (!figure) return { error: `Figure with ID ${id} not found` };

        const { name, images } = figure;
        const imageUrl = images.jpg.image_url;

        if (!imageUrl) return { error: `Image URL not found for the figure with ID ${id}` };

        return { name, imageUrl };
    };

    static getStepsByName(name: string) {
        const trapecioData = this.readDatabase();
        const figure = trapecioData.trapecio.find((figure: any) => figure.name.toLowerCase() === name.toLowerCase());

        if (!figure) return { error: `Figure with name '${name}' not found` };

        const { steps, images } = figure;
        const imageUrl = images.jpg.image_url;

        if (!steps || !imageUrl) return { error: `Steps not found for figure with name:'${name}'` };

        return { message: name, steps, imageUrl };

    };
};

export { TrapezeModel };