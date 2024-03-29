import jsonfile from "jsonfile";
import crypto from "node:crypto";

class TrapezeModel {

    static readDatabase() {
        return jsonfile.readFileSync("./src/database/trapeze.json");
    }

    static getAllFigures() {
        const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");
        return trapecioData.Trapecio.map((figure: any) => ({
            id: figure.Id,
            name: figure.name,
            description: figure.description,
            steps: figure.steps,
            difficulty: figure.difficulty,
            images: figure.images
        }));
    }

    static getHistory() {
        const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");
        return trapecioData.History;
    }

    static readFigureById(FigureId: string) {
        const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");
        const figure = trapecioData.Trapecio.find((f: any) => f.Id === FigureId);

        if (!figure) {
            return { error: "Figure not found!" };
        }

        return figure;
    }

    static createFigure(figureData: any) {
        try {
            const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");
            const { name, description, steps, difficulty, images } = figureData;

            const id = crypto.randomUUID();

            const newFigure = { id, name, description, steps, difficulty, images };

            trapecioData.Trapecio.push(newFigure);

            jsonfile.writeFileSync("./src/database/trapeze.json", trapecioData);

            return { success: true, id };
        } catch (error) {
            console.error("Error creating figure:", error);
            return { success: false, error: "Error creating figure" };
        }
    }

    static updateFigure(figureData: any) {
        const { name, description, steps, difficulty, images, figureId } = figureData;

        const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");

        const figureToUpdate = trapecioData.Trapecio.find((figure: any) => figure.Id === figureId);

        if (!figureToUpdate) {
            return { error: "Figure not found!" };
        }

        if (name) figureToUpdate.name = name;
        if (description) figureToUpdate.description = description;
        if (steps) figureToUpdate.steps = steps;
        if (difficulty) figureToUpdate.difficulty = difficulty;
        if (images) figureToUpdate.images = images;

        jsonfile.writeFileSync("./src/database/trapeze.json", trapecioData);

        return { message: "Figure updated successfully", updatedFigure: figureToUpdate };
    }

    static deleteFigure(figureId: string) {
        try {
            const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");

            const updatedFigures = trapecioData.Trapecio.filter((figure: any) => figure.Id !== figureId);

            if (updatedFigures.length === trapecioData.Trapecio.length) {
                return { error: "Figure not found" };
            }

            trapecioData.Trapecio = updatedFigures;

            jsonfile.writeFileSync("./src/database/trapeze.json", trapecioData);

            return { message: "Successfully deleted figure" };
        } catch (error) {
            console.error("Error deleting figure:", error);
            return { error: "Failed to delete figure" };
        }
    };

    static getUrlImage(id: string) {
        try {
            const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");
            const figure = trapecioData.Trapecio.find((figure: any) => figure.Id === id);

            if (!figure) {
                throw new Error(`Figure with ID ${id} not found`);
            }

            const { name, images } = figure;
            const imageUrl = images.jpg.image_url;

            if (!imageUrl) {
                throw new Error(`Image URL not found for the figure with ID ${id}`);
            }

            return { name, imageUrl };
        } catch (error) {
            return error instanceof Error ? error.message : "Error fetching image info";
        }
    }

    static getStepsByName(name: string) {
        const trapecioData = this.readDatabase();
        const figure = trapecioData.Trapecio.find((figure: any) => figure.name === name);

        if (!figure) {
            throw new Error(`Figure with name '${name}' not found`);
        }

        const { steps, images } = figure;
        const imageUrl = images?.jpg?.image_url;

        if (!steps || !imageUrl) {
            throw new Error(`Steps not found for figure with name '${name}'`);
        }

        return { name, steps, imageUrl };

    }
}

export { TrapezeModel }