import { Reducer } from "react";
import { v4 } from "uuid";
import { Abstraction, Diagram, Position, Relationship } from "./types";

const emptyDiagram: Diagram = {
    diagramId: v4(),
    title: "Diagram 1",
    primaryElements: [],
    supportingElements: [],
    relationships: [],
    positions: {}
};

export const reduceDiagram: Reducer<Diagram, any> = (
    diagram: Diagram,
    action: any
) => {
    if (!action)
        return diagram;

    // return {
    //     ...diagram,
    //     primaryElements: reduceAbstractions(action, diagram.primaryElements),
    //     supportingElements: reduceAbstractions(action, diagram.supportingElements),
    //     relationships: 
    // }

    switch (action.type) {
        case "CREATE_EMPTY_DIAGRAM":
            return { ...action.diagram };
        case "ADD_PRIMARY_ABSTRACTION":
            return addPrimaryAbstraction(diagram, action.abstraction, action.position);
        case "DELETE_PRIMARY_ABSTRACTION":
            return deletePrimaryAbstraction(diagram, action.abstraction);
        case "ADD_SUPPORTING_ABSTRACTION":
            return addSupportingAbstraction(diagram, action.abstraction, action.position);
        case "DELETE_SUPPORTING_ABSTRACTION":
            return deleteSupportingAbstraction(diagram, action.abstraction);
        case "ADD_RELATIONSHIP":
            return addRelationship(diagram, action.relationhip);
        case "DELETE_RELATIONSHIP":
            return deleteRelationship(diagram, action.relationhip);
        default:
            return diagram;
    }
};

const addPrimaryAbstraction = (
    diagram: Diagram,
    abstraction: Abstraction,
    position: Position
) => {
    return {
        ...diagram,
        primaryElements: [...diagram.primaryElements, abstraction],
        positions: {
            ...diagram.positions,
            [abstraction.abstractionId]: position
        }
    };
};

const deletePrimaryAbstraction = (
    diagram: Diagram,
    abstraction: Abstraction
) => {
    return {
        ...diagram,
        primaryElements: [...diagram.primaryElements.filter(a => a.abstractionId === abstraction.abstractionId)],
        positions: {
            ...diagram.positions,
            [abstraction.abstractionId]: null
        }
    };
};

const addSupportingAbstraction = (
    diagram: Diagram,
    abstraction: Abstraction,
    position: Position
) => {
    return {
        ...diagram,
        supportingElements: [...diagram.supportingElements, abstraction],
        positions: {
            ...diagram.positions,
            [abstraction.abstractionId]: position
        }
    };
};

const deleteSupportingAbstraction = (
    diagram: Diagram,
    abstraction: Abstraction
) => {
    return {
        ...diagram,
        supportingElements: [...diagram.supportingElements.filter(a => a.abstractionId === abstraction.abstractionId)],
        positions: {
            ...diagram.positions,
            [abstraction.abstractionId]: null
        }
    };
};

const addRelationship = (
    diagram: Diagram,
    relationhip: Relationship
) => {
    return {
        ...diagram,
        relationships: [...diagram.relationships, relationhip]
    };
};

const deleteRelationship = (
    diagram: Diagram,
    relationhip: Relationship
) => {
    return {
        ...diagram,
        relationships: [...diagram.relationships.filter(r => 
            r.sourceElementId === relationhip.sourceElementId
            && r.targetElementId === relationhip.targetElementId)]
    };
};
