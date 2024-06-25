import { useReactFlow } from "@reactflow/core";
import { DagreAutoLayoutStrategy } from "@structurizr/dagre-layout";
import { ISupportVisitor, IWorkspaceSnapshot, ViewDefinition } from "@structurizr/dsl";
import { ElkjsAutoLayoutStrategy } from "@structurizr/elk-layout";
import { useCallback } from "react";
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

    const renderView = useCallback((workspace: IWorkspaceSnapshot, view: ViewDefinition, strategy: ISupportVisitor) => {
        const reactFlowObject = getReactFlowViewObject(workspace, strategy, view);
        const autoLayoutStrategy = new ElkjsAutoLayoutStrategy();

        if (view.autoLayout) {
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