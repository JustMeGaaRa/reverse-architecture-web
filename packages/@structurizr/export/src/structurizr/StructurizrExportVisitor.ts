import {
    Component,
    Container,
    ContainerInstance,
    DeploymentEnvironment,
    DeploymentNode,
    ElementStyle,
    Group,
    InfrastructureNode,
    IVisitor,
    Model,
    Person,
    Relationship,
    RelationshipStyle,
    SoftwareSystem,
    SoftwareSystemInstance,
    Styles,
    Views,
    Workspace
} from "@structurizr/dsl";

function line(line: string) {
    return  line ? `${line}\n` : ""; 
}

function indent(text: string) {
    return text
        .split('\n')
        .map(line => `\t${line}`)
        .join('\n');
}

export class StructurizrExportVisitor implements IVisitor<string> {
    visitWorkspace(workspace: Workspace): string {
        const model = indent(this.visitModel(workspace.model));
        const views = indent(this.visitViews(workspace.views));
        return `workspace "${workspace.name}" "${workspace.description}" {\n${model}\n${views}\n}`;
    }

    visitModel(model: Model): string {
        const people = indent((model.people ?? [])
            .map(x => this.visitPerson(x)).join("\n"));
        const softwareSystems = indent((model.softwareSystems ?? [])
            .map(x => this.visitSoftwareSystem(x)).join("\n"));
        const environments = indent((model.deploymentEnvironments ?? [])
            .map(x => this.visitDeploymentEnvironment(x)).join("\n"));
        const relationships = indent((model.relationships ?? [])
            .map(x => this.visitRelationship(x)).join("\n"));
        return `model {\n${people}\n${softwareSystems}\n${environments}\n${relationships}\n}`;
    }

    visitGroup(group: Group, params?: { parentId?: string; }): string {
        return "";
    }
    
    visitPerson(person: Person, params?: { parentId?: string; }): string {
        const rels = indent((person.relationships ?? [])
            .map(x => this.visitRelationship(x)).join("\n"));
        return `${person.identifier} = person "${person.name}" "${person.description ?? ""}" {\n${rels}\n}`;
    }

    visitSoftwareSystem(softwareSystem: SoftwareSystem, params?: { parentId?: string; }): string {
        const containers = indent((softwareSystem.containers ?? [])
            .map(x => this.visitContainer(x)).join("\n"));
        const rels = indent((softwareSystem.relationships ?? [])
            .map(x => this.visitRelationship(x)).join("\n"));
        return softwareSystem
            ? `${softwareSystem.identifier} = softwareSystem "${softwareSystem.name}" "${softwareSystem.description ?? ""}" {\n${containers}\n${rels}\n}`
            : "";
    }

    visitContainer(container: Container, params?: { parentId?: string; }): string {
        const components = indent((container.components ?? [])
            .map(x => this.visitComponent(x)).join("\n"));
        const rels = indent((container.relationships ?? [])
            .map(x => this.visitRelationship(x)).join("\n"));
        return container
            ? `${container.identifier} = container "${container.name}" "${container.description ?? ""}" {\n${components}\n${rels}\n}`
            : "";
    }

    visitComponent(component: Component, params?: { parentId?: string; }): string {
        return component
            ? `${component.identifier} = component "${component.name}" "${component.description ?? ""}"`
            : "";
    }

    visitDeploymentEnvironment(environment: DeploymentEnvironment): string {
        const deploymentNodes = indent((environment.deploymentNodes ?? [])
            .map(x => this.visitDeploymentNode(x)).join("\n"));
        return environment
            ? `deploymentEnvironment "${environment.name}" {\n${deploymentNodes}\n}`
            : "";
    }

    visitDeploymentNode(deploymentNode: DeploymentNode, params?: { parentId?: string; }): string {
        // TODO: visit infrastructure nodes
        const deploymentNodes = indent((deploymentNode.deploymentNodes ?? [])
            .map(x => this.visitDeploymentNode(x)).join("\n"));
        const systems = indent((deploymentNode.softwareSystemInstances ?? [])
            .map(x => this.visitSoftwareSystemInstance(x)).join("\n"));
        const containers = indent((deploymentNode.containerInstances ?? [])
            .map(x => this.visitContainerInstance(x)).join("\n"));
        return deploymentNode
            ? `deploymentNode "${deploymentNode.name}" {\n${deploymentNodes}\n${systems}\n${containers}\n}`
            : "";
    }

    visitInfrastructureNode(infrastructureNode: InfrastructureNode, params?: { parentId?: string; }): string {
        return "";
    }
    
    visitSoftwareSystemInstance(instance: SoftwareSystemInstance, params?: { parentId?: string; }): string {
        return `${instance.identifier} = softwareSystemInstance "${instance.softwareSystemIdentifier}"`;
    }

    visitContainerInstance(instance: ContainerInstance, params?: { parentId?: string; }): string {
        return `${instance.identifier} = containerInstance "${instance.containerIdentifier}"`;
    }

    visitRelationship(relationship: Relationship): string {
        return `${relationship.sourceIdentifier} -> ${relationship.targetIdentifier} "${relationship.description ?? ""}"`;
    }

    visitViews(views: Views): string {
        const styles = line(indent(this.visitStyles(views.styles)));
        return `views {\n${styles}\n}`;
    }

    visitStyles(styles: Styles): string {
        const elements = indent(this.visitElementStyle(styles?.element));
        const relationships = indent(this.visitRelationshipStyle(styles?.relationship));
        return `styles {\n${elements}\n${relationships}\n}`;
    }

    visitElementStyle(elementStyle: ElementStyle): string {
        return !elementStyle ? "" : Object.keys(elementStyle)
            .map(tag => {
                const style: any = elementStyle[tag];
                const properties = Object.keys(style)
                    .map(property => line(indent(`${property} ${style[property]}`)))
                    .join("");
                return `element "${tag}" {\n${properties}\n}`;
            })
            .join("\n");
    }

    visitRelationshipStyle(relationshipStyle: RelationshipStyle): string {
        return !relationshipStyle ? "" : Object.keys(relationshipStyle)
            .map(tag => {
                const style: any = relationshipStyle[tag];
                const properties = Object.keys(style)
                    .map(property => line(indent(`${property} ${style[property]}`)))
                    .join("");
                return `element "${tag}" {\n${properties}\n}`;
            })
            .join("\n");
    }
}