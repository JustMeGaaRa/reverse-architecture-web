import { useReactFlow } from "@reactflow/core";
import { ISupportVisitor, IViewDefinition, IWorkspaceSnapshot } from "@structurizr/dsl";
import { useCallback } from "react";
import { CustomAutoLayoutStrategy, DagreAutoLayoutStrategy, ElkjsAutoLayoutStrategy } from "../types";
import { getReactFlowModelObject, getReactFlowViewObject } from "../utils";

export const useViewRenderer = () => {
    const { setNodes, setEdges } = useReactFlow();

    const renderModel = useCallback((workspace: IWorkspaceSnapshot, strategy: ISupportVisitor) => {
        const reactFlowObject = getReactFlowModelObject(workspace, strategy);
        const autoLayoutStrategy = new DagreAutoLayoutStrategy();

        autoLayoutStrategy.execute(reactFlowObject)
            .then(reactFlowAuto => {
                setNodes(reactFlowAuto.nodes);
                setEdges(reactFlowAuto.edges);
            });
    }, [setEdges, setNodes]);

    const renderView = useCallback((workspace: IWorkspaceSnapshot, view: IViewDefinition, strategy: ISupportVisitor) => {
        const reactFlowObject = getReactFlowViewObject(workspace, strategy, view);
        const autoLayoutStrategy = new ElkjsAutoLayoutStrategy();
        
        if (!!view?.autoLayout) {
            autoLayoutStrategy.execute(reactFlowObject)
                .then(reactFlowAuto => {
                    setNodes(reactFlowAuto.nodes);
                    setEdges(reactFlowAuto.edges);
                });
        }
        else {
            setNodes(reactFlowObject.nodes);
            setEdges(reactFlowObject.edges);
        }
    }, [setEdges, setNodes]);

    return { renderModel, renderView }
}