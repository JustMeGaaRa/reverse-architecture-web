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
import { Component } from "../Component";
import { Container } from "../Container";
import { ContainerInstance } from "../ContainerInstance";
import { DeploymentNode } from "../DeploymentNode";
import { Group } from "../Group";
import { InfrastructureNode } from "../InfrastructureNode";
import { Person } from "../Person";
import { Relationship } from "../Relationship";
import { SoftwareSystem } from "../SoftwareSystem";
import { SoftwareSystemInstance } from "../SoftwareSystemInstance";

export class JsxElementVisitor implements IElementVisitor<JSX.Element> {
    visitWorkspace(workspace: IWorkspaceSnapshot, params?: { children?: JSX.Element[]; }): JSX.Element {
        return (<>{params?.children}</>);
    }
    visitGroup(group: IGroup, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <Group
                key={group.name}
                value={{
                    type: "Group",
                    identifier: group.name,
                    name: group.name,
                }}
            >
                {params?.children}
            </Group>
        )
    }
    visitPerson(person: IPerson, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <Person
                key={person.identifier}
                value={{
                    type: "Person",
                    identifier: person.identifier,
                    name: person.name,
                    description: person.description,
                }}
            />
        )
    }
    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <SoftwareSystem
                key={softwareSystem.identifier}
                value={{
                    type: "Software System",
                    identifier: softwareSystem.identifier,
                    name: softwareSystem.name,
                    description: softwareSystem.description,
                    technology: softwareSystem.technology.map(x => x.name).join(", ")
                }}
            >
                {params?.children}
            </SoftwareSystem>
        );
    }
    visitContainer(container: IContainer, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <Container
                key={container.identifier}
                value={{
                    type: "Container",
                    identifier: container.identifier,
                    name: container.name,
                    description: container.description,
                    technology: container.technology.map(x => x.name).join(", ")
                }}
            >
                {params?.children}
            </Container>
        );
    }
    visitComponent(component: IComponent, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <Component
                key={component.identifier}
                value={{
                    type: "Component",
                    identifier: component.identifier,
                    name: component.name,
                    description: component.description,
                    technology: component.technology.map(x => x.name).join(", ")
                }}
            />
        );
    }
    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <DeploymentNode
                key={deploymentNode.identifier}
                value={{
                    type: "Deployment Node",
                    identifier: deploymentNode.identifier,
                    name: deploymentNode.name,
                    description: deploymentNode.description,
                    instances: deploymentNode.instances ? `x${deploymentNode.instances}` : undefined
                }}
            >
                {params?.children}
            </DeploymentNode>
        );
    }
    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <InfrastructureNode
                key={infrastructureNode.identifier}
                value={{
                    type: "Infrastructure Node",
                    identifier: infrastructureNode.identifier,
                    name: infrastructureNode.name,
                    description: infrastructureNode.description,
                }}
            />
        )
    }
    visitSoftwareSystemInstance(softwareSystemInstance: ISoftwareSystemInstance, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <SoftwareSystemInstance
                key={softwareSystemInstance.identifier}
                value={{
                    type: "Software System Instance",
                    identifier: softwareSystemInstance.identifier,
                    softwareSystemIdentifier: softwareSystemInstance.softwareSystemIdentifier,
                }}
            >
                {params?.children}
            </SoftwareSystemInstance>
        )
    }
    visitContainerInstance(containerInstance: IContainerInstance, params?: { parentId?: string; children?: JSX.Element[]; }): JSX.Element {
        return (
            <ContainerInstance
                key={containerInstance.identifier}
                value={{
                    type: "Container Instance",
                    identifier: containerInstance.identifier,
                    containerIdentifier: containerInstance.containerIdentifier,
                }}
            >
                {params?.children}
            </ContainerInstance>
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