import jsonfile from "jsonfile";
import crypto from "node:crypto";

class TrapezeModel {
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
}

export { TrapezeModel }