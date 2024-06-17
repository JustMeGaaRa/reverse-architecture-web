import { IComponent, IContainer, IContainerInstance, IDeploymentNode, IElementVisitor, IGroup, IInfrastructureNode, IPerson, IRelationship, ISoftwareSystem, ISoftwareSystemInstance, IWorkspaceSnapshot } from "@structurizr/dsl";

export type Vertex = {
    id: string;
    parentId?: string;
    x: number;
    y: number;
    height: number;
    width: number;
}

export type Edge = {
    id: string;
    sourceId: string;
    targetId: string;
}

export type Graph = {
    vertices: Array<Vertex>;
    edges: Array<Edge>;
}

export type GraphElement =
    | Vertex
    | Edge;

export class GraphElementVisitor implements IElementVisitor<GraphElement> {
    visitWorkspace(workspace: IWorkspaceSnapshot, params?: { children?: any[]; }): GraphElement {
        return undefined;
    }
    visitGroup(group: IGroup, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return { 
            id: group.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        };
    }
    visitPerson(person: IPerson, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return {
            id: person.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        };
    }
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return {
            id: softwareSystem.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        };
    }
    visitContainer(container: IContainer, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return {
            id: container.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0, height: 200, width: 200 };
    }
    visitComponent(component: IComponent, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return {
            id: component.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        };
    }
    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return {
            id: deploymentNode.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        };
    }
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return {
            id: infrastructureNode.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        };
    }
    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return {
            id: softwareSystemInstance.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        };
    }
    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string; children?: any[]; }): GraphElement {
        return {
            id: containerInstance.identifier,
            parentId: params?.parentId,
            x: 0,
            y: 0,
            height: 200,
            width: 200
        };
    }
    visitRelationship(relationship: IRelationship, params?: { children?: any[]; }): GraphElement {
        return {
            id: `${relationship.sourceIdentifier}_${relationship.targetIdentifier}`,
            sourceId: relationship.sourceIdentifier,
            targetId: relationship.targetIdentifier
        };
    }
}
