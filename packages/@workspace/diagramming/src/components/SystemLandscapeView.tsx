import { Node } from "@reactflow/core";
import { ElementType, ISystemLandscapeView, Position, SystemLandscapeViewStrategy } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback } from "react";
import { useSystemLandscapeView } from "../hooks";
import { ElementOptionsToolbar, ElementDiagramFlowControls, ElementZoomControlsBackground } from "./Nodes";
import { ViewMetadataProvider, ViewRenderingEffect } from "./Views";
import { ViewStrategyProvider } from "./ViewStrategyProvider";

export const SystemLandscapeView: FC<PropsWithChildren<{ view: ISystemLandscapeView }>> = ({ children, view }) => {
    const { workspace } = useWorkspace();
    const { addSoftwareSystem, addPerson, addRelationship } = useSystemLandscapeView();
    
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
        <ViewStrategyProvider strategy={new SystemLandscapeViewStrategy(workspace.model, view)}>
            <ViewMetadataProvider metadata={view}>
                <ElementOptionsToolbar />
                <ElementDiagramFlowControls
                    workspace={workspace}
                    onHandleClick={handleOnFlowClick}
                />
                <ElementZoomControlsBackground />
                <ViewRenderingEffect view={view} />
                {children}
            </ViewMetadataProvider>
        </ViewStrategyProvider>
    )
}