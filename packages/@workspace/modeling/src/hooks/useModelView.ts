import { useReactFlow } from "@reactflow/core";
import { Identifier, Person } from "@structurizr/dsl";
import { useWorkspaceStore } from "@workspace/core";
import { useCallback } from "react";
import { v4 } from "uuid";

export const useModelView = () => {
    const { workspace } = useWorkspaceStore();
    const { setNodes, setEdges } = useReactFlow();

    const addPerson = useCallback(() => {
        const person = new Person({
            identifier: `person_${v4()}`,
            name: "Person",
        })

        const placeholder = {
            id: "placeholder-1",
            type: "placeholder",
            data: { },
            position: { x: 200, y: 100 },
            connectable: false,
            draggable: false,
        };
    }, []);

    const addSoftwareSystem = useCallback(() => {

    }, []);

    const addContainer = useCallback((softwareSystemId: Identifier) => {

    }, []);

    const addComponent = useCallback((containerId: Identifier) => {

    }, []);

    const addDeploymentNode = useCallback((deploymentNodeId?: Identifier) => {

    }, []);

    const addInfrastructureNode = useCallback((deploymentNodeId?: Identifier) => {

    }, []);

    return {
        addSoftwareSystem,
        addPerson,
        addContainer,
        addComponent,
        addDeploymentNode,
        addInfrastructureNode
    }
}