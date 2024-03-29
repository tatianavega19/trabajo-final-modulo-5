import jsonfile from "jsonfile";
import { dirname } from "../database/dirname";

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

    static getHistory (){
        const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");
        return trapecioData.History;
    }

    static readFigureById(FigureId: string){
        const trapecioData = jsonfile.readFileSync("./src/database/trapeze.json");
        const figure = trapecioData.Trapecio.find((f: any) => f.Id === FigureId);

        if (!figure) {
            return { error: "Figure not found!" };
        }

        return figure;
    }

}

export { TrapezeModel }