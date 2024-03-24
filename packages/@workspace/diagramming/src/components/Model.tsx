import { Node } from "@reactflow/core";
import { IModel, ModelViewStrategy, Position } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useModelFlowBuilder, useViewRenderer } from "../hooks";
import { ElementCollapseControlsBackground, ElementModelFlowControls } from "./Nodes";
import { ViewMetadataProvider } from "./Views";

export const Model: FC<PropsWithChildren<{ model: IModel }>> = ({ children, model }) => {
    const { workspace } = useWorkspace();
    const { addDefaultElement } = useModelFlowBuilder();
    const { renderModel } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new ModelViewStrategy(model);
        return renderModel(workspace, strategy);
    }, [workspace, model, renderModel]);

    const handleOnFlowClick = useCallback((sourceNode: Node, position: Position) => {
        // TODO: add element in position on react flow pane, but not in workspace view
        const element = addDefaultElement(
            sourceNode.data.element.type,
            position,
            sourceNode.data.element.identifier
        );
    }, [addDefaultElement]);

    return (
        <ViewMetadataProvider metadata={null}>
            <ElementModelFlowControls
                workspace={workspace}
                onHandleClick={handleOnFlowClick}
            />
            <ElementCollapseControlsBackground />
            {children}
        </ViewMetadataProvider>
    )
}