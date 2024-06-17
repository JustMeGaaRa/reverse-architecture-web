import {
    IComponent,
    IContainer,
    IContainerInstance,
    IDeploymentNode,
    IElementVisitor,
    IGroup,
    IInfrastructureNode,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    ISoftwareSystemInstance,
    IWorkspaceSnapshot
} from "@structurizr/dsl";
import { ModelElement } from "../ModelElement";
import { Relationship } from "../Relationship";

export class ModelElementJsxVisitor implements IElementVisitor<JSX.Element> {
    visitWorkspace(workspace: IWorkspaceSnapshot, params?: { children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={workspace.name}
                value={{
                    type: "Model",
                    identifier: workspace.name,
                    name: workspace.name
                }}
            />
        )
    }
    visitGroup(group: IGroup, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={group.name}
                value={{
                    type: "Group",
                    identifier: group.name,
                    name: group.name
                }}
            />
        )
    }
    visitPerson(person: IPerson, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={person.identifier}
                value={{
                    type: "Person",
                    identifier: person.identifier,
                    name: person.name
                }}
            />
        )
    }
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={softwareSystem.identifier}
                value={{
                    type: "Software System",
                    identifier: softwareSystem.identifier,
                    name: softwareSystem.name,
                }}
            />
        );
    }
    visitContainer(container: IContainer, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={container.identifier}
                value={{
                    type: "Container",
                    identifier: container.identifier,
                    name: container.name
                }}
            />
        );
    }
    visitComponent(component: IComponent, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={component.identifier}
                value={{
                    type: "Component",
                    identifier: component.identifier,
                    name: component.name
                }}
            />
        );
    }
    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={deploymentNode.identifier}
                value={{
                    type: "Deployment Node",
                    identifier: deploymentNode.identifier,
                    name: deploymentNode.name
                }}
            />
        );
    }
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={infrastructureNode.identifier}
                value={{
                    type: "Infrastructure Node",
                    identifier: infrastructureNode.identifier,
                    name: infrastructureNode.name
                }}
            />
        )
    }
    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={softwareSystemInstance.identifier}
                value={{
                    type: "Software System Instance",
                    identifier: softwareSystemInstance.identifier,
                    name: ""
                }}
            />
        )
    }
    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ModelElement
                key={containerInstance.identifier}
                value={{
                    type: "Container Instance",
                    identifier: containerInstance.identifier,
                    name: ""
                }}
            />
        )
    }
    visitRelationship(relationship: IRelationship, params?: { children?: JSX.Element[]; }): JSX.Element {
        return (
            <Relationship
                key={`${relationship.sourceIdentifier}_${relationship.targetIdentifier}`}
                value={{
                    identifier: `${relationship.sourceIdentifier}_${relationship.targetIdentifier}`,
                    sourceIdentifier: relationship.sourceIdentifier,
                    targetIdentifier: relationship.targetIdentifier,
                    description: relationship.description,
                }}
            />
        )
    }
}