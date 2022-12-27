import { v4 as uuidv4 } from "uuid";
import { Diagram } from "./types";

import SystemContextDiagram from "../../contracts/SystemContextDiagramClassic.json";
import ContainerDiagram from "../../contracts/ContainerDiagramClassic.json";
import ComponentDiagram from "../../contracts/ComponentDiagramClassic.json";

export class DiagramService {
    private diagrams = {};

    public constructor(options: { apiUrl: string }) {
        console.log(options.apiUrl);
        this.diagrams[SystemContextDiagram.diagramId] = SystemContextDiagram;
        this.diagrams[ContainerDiagram.diagramId] = ContainerDiagram;
        this.diagrams[ComponentDiagram.diagramId] = ComponentDiagram;
    }

    getDiagramById(diagramId: string): Promise<Diagram> {
        return this.diagrams[diagramId] !== undefined
            ? Promise.resolve(this.diagrams[diagramId])
            : Promise.resolve(null);
    }
    
    createDiagram(type: string): Promise<Diagram> {
        const diagram: Diagram = {
            diagramId: uuidv4(),
            primaryElements: [],
            supportingElements: [],
            relationships: [],
            positions: {}
        };
        this.diagrams[diagram.diagramId] = diagram;
        return Promise.resolve(diagram);
    }
}
