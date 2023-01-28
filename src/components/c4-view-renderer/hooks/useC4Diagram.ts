import { useCallback, useState } from "react";
import { FitViewOptions, ReactFlowJsonObject, useReactFlow } from "@reactflow/core";
import { C4Diagram } from "../../structurizr-dsl/Diagram";
import { getDiagramEdges, getDiagramNodes } from "../utils/Graph";

const useC4Diagram = () => {
    const reactFlow = useReactFlow();
    const [title, setTitle] = useState("Diagram");

    const fromDiagram = useCallback((
        diagram: C4Diagram,
        fitViewOptions?: FitViewOptions
    ) => {
        setTitle(diagram.title);
        reactFlow.setNodes(getDiagramNodes(diagram));
        reactFlow.setEdges(getDiagramEdges(diagram));
        reactFlow.fitView(fitViewOptions);
    }, [reactFlow, setTitle]);

    const fromObject = useCallback((
        flow: ReactFlowJsonObject,
        fitViewOptions?: FitViewOptions
    ) => {
        reactFlow.setNodes(flow.nodes || []);
        reactFlow.setEdges(flow.edges || []);
        reactFlow.fitView(fitViewOptions);
    }, [reactFlow]);

    return {
        title,
        setTitle,
        fromDiagram,
        fromObject,
        toObject: reactFlow.toObject
    };
}

export { useC4Diagram };