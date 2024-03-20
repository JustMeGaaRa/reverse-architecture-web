import { Node } from "@reactflow/core";
import { IModel, ModelViewStrategy, Position } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback } from "react";
import { useModelFlowBuilder, useModelRenderingEffect } from "../hooks";
import { ElementCollapseControlsBackground, ElementModelFlowControls } from "./Nodes";
import { ViewMetadataProvider } from "./Views";
import { ViewStrategyProvider } from "./ViewStrategyProvider";

export const Model: FC<PropsWithChildren<{ model: IModel }>> = ({ children, model }) => {
    const { workspace } = useWorkspace();
    const { addDefaultElement } = useModelFlowBuilder();

    const handleOnFlowClick = useCallback((sourceNode: Node, position: Position) => {
        // TODO: add element in position on react flow pane, but not in workspace view
        const element = addDefaultElement(
            sourceNode.data.element.type,
            position,
            sourceNode.data.element.identifier
        );
    }, [addDefaultElement]);

    return (
        <ViewStrategyProvider strategy={new ModelViewStrategy(model)}>
            <ViewMetadataProvider metadata={null}>
                <ElementModelFlowControls
                    workspace={workspace}
                    onHandleClick={handleOnFlowClick}
                />
                <ElementCollapseControlsBackground />
                <ModelRenderingEffect />
                {children}
            </ViewMetadataProvider>
        </ViewStrategyProvider>
    )
}

export const ModelRenderingEffect: FC = () => {
    useModelRenderingEffect();
    return null;
}