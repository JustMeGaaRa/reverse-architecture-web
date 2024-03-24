import { useReactFlow } from "@reactflow/core";
import { ISupportVisitor, IViewDefinition, IWorkspaceSnapshot } from "@structurizr/dsl";
import { useCallback } from "react";
import { CustomAutoLayoutStrategy, ElkjsAutoLayoutStrategy } from "../types";
import { getReactFlowModelObject, getReactFlowObject } from "../utils";

export const useViewRenderer = () => {
    const { setNodes, setEdges } = useReactFlow();

    const renderModel = useCallback((workspace: IWorkspaceSnapshot, strategy: ISupportVisitor) => {
        const reactFlowObject = getReactFlowModelObject(strategy, workspace);
        const autoLayoutStrategy = new CustomAutoLayoutStrategy();

        autoLayoutStrategy.execute(reactFlowObject)
            .then(reactFlowAuto => {
                setNodes(reactFlowAuto.nodes);
                setEdges(reactFlowAuto.edges);
            });

        return () => {
            setNodes([]);
            setEdges([]);
        }
    }, [setEdges, setNodes]);

    const renderView = useCallback((workspace: IWorkspaceSnapshot, view: IViewDefinition, strategy: ISupportVisitor) => {
        const reactFlowObject = getReactFlowObject(strategy, workspace, view);
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
        
        return () => {
            setNodes([]);
            setEdges([]);
        }
    }, [setEdges, setNodes]);

    return { renderModel, renderView }
}