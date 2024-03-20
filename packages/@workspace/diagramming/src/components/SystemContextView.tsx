import { Node } from "@reactflow/core";
import { ElementType,  ISystemContextView, Position, SystemContextViewStrategy } from "@structurizr/dsl";
import { useWorkspace } from "@structurizr/react";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { ElementDiagramFlowControls, ElementOptionsToolbar, ElementZoomControlsBackground } from "../components";
import { useViewRenderingEffect, useSystemContextView, useViewStrategy } from "../hooks";

export const SystemContextView: FC<PropsWithChildren<{ view: ISystemContextView }>> = ({ children, view }) => {
    const { workspace } = useWorkspace();
    const { setStrategy } = useViewStrategy();
    const { addSoftwareSystem, addPerson, addRelationship } = useSystemContextView(view.identifier);

    useEffect(() => setStrategy(new SystemContextViewStrategy(workspace.model, view)), [setStrategy, view, workspace.model]);
    useViewRenderingEffect(view);

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
        <>
            <ElementOptionsToolbar />
            <ElementDiagramFlowControls
                workspace={workspace}
                onHandleClick={handleOnFlowClick}
            />
            <ElementZoomControlsBackground />
            {children}
        </>
    )
}