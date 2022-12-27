import { Dispatch, useEffect, useReducer } from "react";
import { v4 } from "uuid";
import { Diagram } from "./types";
import { reduceDiagram } from "./reducers";
import { createEmptyDiagram } from "./actions";

export const useDiagramsApi = (): [Diagram, Dispatch<any>] => {
    const [diagram, dispatch] = useReducer(reduceDiagram, null);
    
    useEffect(() => {
        const emptyDiagram: Diagram = {
            diagramId: v4(),
            primaryElements: [],
            supportingElements: [],
            relationships: [],
            positions: {}
        };
        
        dispatch(createEmptyDiagram({ diagram: emptyDiagram }));
        
        const apiUrl = "https://api.reversearchitecture.dev";
        // const diagramService = new DiagramService({ apiUrl });
        // diagramService.getDiagramById(diagramId)
        //     .then(data => dispatch(createEmptyDiagram({ diagram: emptyDiagram })))
        //     .catch(error => console.log(error));
    }, []);

    return [diagram, dispatch];
};
