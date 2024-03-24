import { Node } from "@reactflow/core";
import { ElementType,  ISystemContextView, Position, SystemContextViewStrategy } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useSystemContextView, useViewRenderer } from "../hooks";
import { ElementDiagramFlowControls, ElementOptionsToolbar, ElementZoomControlsBackground } from "./Nodes";
import { ViewMetadataProvider } from "./Views";

export const SystemContextView: FC<PropsWithChildren<{ view: ISystemContextView }>> = ({ children, view }) => {
    const { workspace } = useWorkspace();
    const { addSoftwareSystem, addPerson, addRelationship } = useSystemContextView(view.identifier);
    const { renderView } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new SystemContextViewStrategy(workspace.model, view);
        return renderView(workspace, view, strategy);
    }, [workspace, view, renderView]);

    const handleOnFlowClick = useCallback((sourceNode: Node, position: Position) => {
        switch (sourceNode.data?.element?.type) {
            case ElementType.Person:
                const person = addPerson(position, sourceNode.parentNode);
                const personRelationship = addRelationship(sourceNode.data?.element.identifier, person.identifier);
            case ElementType.SoftwareSystem:
                const softwareSystem = addSoftwareSystem(position, sourceNode.parentNode);
                const softwareSystemRelationship = addRelationship(sourceNode.data?.element.identifier, softwareSystem.identifier);
                break;
        }
    }, [addPerson, addSoftwareSystem, addRelationship]);

    return (
        <ViewMetadataProvider metadata={view}>
            <ElementOptionsToolbar />
            <ElementDiagramFlowControls
                workspace={workspace}
                onHandleClick={handleOnFlowClick}
            />
            <ElementZoomControlsBackground />
            {children}
        </ViewMetadataProvider>
    )
}