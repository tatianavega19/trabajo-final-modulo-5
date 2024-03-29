import jsonfile from "jsonfile";

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
}

export { TrapezeModel }