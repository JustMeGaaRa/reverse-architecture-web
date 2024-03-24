import { Node } from "@reactflow/core";
import { ElementType, ISystemLandscapeView, Position, SystemLandscapeViewStrategy } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useSystemLandscapeView, useViewRenderer } from "../hooks";
import { ElementOptionsToolbar, ElementDiagramFlowControls, ElementZoomControlsBackground } from "./Nodes";
import { ViewMetadataProvider } from "./Views";

export const SystemLandscapeView: FC<PropsWithChildren<{ view: ISystemLandscapeView }>> = ({ children, view }) => {
    const { workspace } = useWorkspace();
    const { addSoftwareSystem, addPerson, addRelationship } = useSystemLandscapeView();
    const { renderView } = useViewRenderer();

    // NOTE: we need to re-render the view ONLY when the selected view changes
    useEffect(() => {
        const strategy = new SystemLandscapeViewStrategy(workspace.model, view);
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
            default:
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