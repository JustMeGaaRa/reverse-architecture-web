import { Node } from "@reactflow/core";
import { ElementType, IContainerView, ContainerViewStrategy, Position } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useContainerView, useViewRenderer } from "../hooks";
import { ElementOptionsToolbar, ElementDiagramFlowControls, ElementZoomControlsBackground } from "./Nodes";
import { ViewMetadataProvider } from "./Views";

export const ContainerView: FC<PropsWithChildren<{ view: IContainerView }>> = ({ children, view }) => {
    const { workspace } = useWorkspace();
    const { addSoftwareSystem, addPerson, addContainer, addRelationship } = useContainerView(view.identifier);
    const { renderView } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new ContainerViewStrategy(workspace.model, view);
        return renderView(workspace, view, strategy);
    }, [workspace, view, renderView]);

    const handleOnFlowClick = useCallback((sourceNode: Node, position: Position) => {
        switch (sourceNode.data?.element?.type) {
            case ElementType.Person:
                const person = addPerson(position);
                const personRelationship = addRelationship(sourceNode.data?.element.identifier, person.identifier);
            case ElementType.SoftwareSystem:
                const softwareSystem = addSoftwareSystem(position);
                const softwareSystemRelationship = addRelationship(sourceNode.data?.element.identifier, softwareSystem.identifier);
                break;
            case ElementType.Container:
                const container = addContainer(position, sourceNode.parentNode);
                const containerRelationship = addRelationship(sourceNode.data?.element.identifier, container.identifier);
                break;
        }
    }, [addPerson, addRelationship, addSoftwareSystem, addContainer]);

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