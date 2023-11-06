import {
    ElementStyle,
    IElementVisitor,
    RelationshipStyle,
    Styles,
    IComponent,
    IContainer,
    IContainerInstance,
    IDeploymentEnvironment,
    IDeploymentNode,
    IGroup,
    IInfrastructureNode,
    IModel,
    IPerson,
    IRelationship,
    ISoftwareSystem,
    ISoftwareSystemInstance,
    IWorkspace,
    IViews,
    Technology,
    Tag,
    ISystemContextView,
    IContainerView,
    IDeploymentView
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

export class StructurizrExportVisitor implements IElementVisitor {
    visitWorkspace(workspace: IWorkspace): string {
        const model = indent(this.visitModel(workspace.model));
        const views = indent(this.visitViews(workspace.views));
        return `workspace "${workspace.name}" "${workspace.description}" {\n${model}\n${views}\n}`;
    }

    visitModel(model: IModel): string {
        const people = indent((model.people ?? [])
            .map(x => this.visitPerson(x)).join("\n"));
        const groups = indent((model.groups ?? [])
            .map(x => this.visitGroup(x)).join("\n"));
        const softwareSystems = indent((model.softwareSystems ?? [])
            .map(x => this.visitSoftwareSystem(x)).join("\n"));
        const environments = indent((model.deploymentEnvironments ?? [])
            .map(x => this.visitDeploymentEnvironment(x)).join("\n"));
        const relationships = indent((model.relationships ?? [])
            .map(x => this.visitRelationship(x)).join("\n"));
        return `model {\n${people}\n${groups}\n${softwareSystems}\n${environments}\n${relationships}\n}`;
    }

    visitGroup(group: IGroup, params?: { parentId?: string; }): string {
        const people = indent((group.people ?? [])
            .map(x => this.visitPerson(x)).join("\n"));
        const softwareSystems = indent((group.softwareSystems ?? [])
            .map(x => this.visitSoftwareSystem(x)).join("\n"));
        const containers = indent((group.containers ?? [])
            .map(x => this.visitContainer(x)).join("\n"));
        const components = indent((group.components ?? [])
            .map(x => this.visitComponent(x)).join("\n"));
        return `group "${group.name}" {\n${people}\n${softwareSystems}\n${containers}\n${components}\n}`;
    }
    
    visitPerson(person: IPerson, params?: { parentId?: string; }): string {
        const rels = indent((person.relationships ?? [])
            .map(x => this.visitRelationship(x)).join("\n"));
        return `${person.identifier} = person "${person.name}" "${person.description ?? ""}" {\n${rels}\n}`;
    }

    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; }): string {
        const containers = indent((softwareSystem.containers ?? [])
            .map(x => this.visitContainer(x)).join("\n"));
        const rels = indent((softwareSystem.relationships ?? [])
            .map(x => this.visitRelationship(x)).join("\n"));
        return softwareSystem
            ? `${softwareSystem.identifier} = softwareSystem "${softwareSystem.name}" "${softwareSystem.description ?? ""}" {\n${containers}\n${rels}\n}`
            : "";
    }

    visitContainer(container: IContainer, params?: { parentId?: string; }): string {
        const components = indent((container.components ?? [])
            .map(x => this.visitComponent(x)).join("\n"));
        const rels = indent((container.relationships ?? [])
            .map(x => this.visitRelationship(x)).join("\n"));
        return container
            ? `${container.identifier} = container "${container.name}" "${container.description ?? ""}" {\n${components}\n${rels}\n}`
            : "";
    }

    visitComponent(component: IComponent, params?: { parentId?: string; }): string {
        return component
            ? `${component.identifier} = component "${component.name}" "${component.description ?? ""}"`
            : "";
    }

    visitDeploymentEnvironment(environment: IDeploymentEnvironment): string {
        const deploymentNodes = indent((environment.deploymentNodes ?? [])
            .map(x => this.visitDeploymentNode(x)).join("\n"));
        return environment
            ? `deploymentEnvironment "${environment.name}" {\n${deploymentNodes}\n}`
            : "";
    }

    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string; }): string {
        // TODO: visit infrastructure nodes
        const deploymentNodes = indent((deploymentNode.deploymentNodes ?? [])
            .map(x => this.visitDeploymentNode(x)).join("\n"));
        const infrastructureNodes = indent((deploymentNode.infrastructureNodes ?? [])
            .map(x => this.visitInfrastructureNode(x)).join("\n"));
        const systems = indent((deploymentNode.softwareSystemInstances ?? [])
            .map(x => this.visitSoftwareSystemInstance(x)).join("\n"));
        const containers = indent((deploymentNode.containerInstances ?? [])
            .map(x => this.visitContainerInstance(x)).join("\n"));
        return deploymentNode
            ? `deploymentNode "${deploymentNode.name}" "${deploymentNode.description}" {\n${deploymentNodes}\n${infrastructureNodes}\n${systems}\n${containers}\n}`
            : "";
    }

    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; }): string {
        return "";
    }
    
    visitSoftwareSystemInstance(instance: ISoftwareSystemInstance, params?: { parentId?: string; }): string {
        return `${instance.identifier} = softwareSystemInstance "${instance.softwareSystemIdentifier}"`;
    }

    visitContainerInstance(instance: IContainerInstance, params?: { parentId?: string; }): string {
        return `${instance.identifier} = containerInstance "${instance.containerIdentifier}"`;
    }

    visitRelationship(relationship: IRelationship): string {
        return `${relationship.sourceIdentifier} -> ${relationship.targetIdentifier} "${relationship.description ?? ""}"`;
    }

    visitViews(views: IViews): string {
        const systemLandscape = indent((views.systemLandscape ? [views.systemLandscape] : [])
            .map(x => this.visitSystemLandscapeView(x)).join("\n"));
        const systemContext = indent((views.systemContexts ?? [])
            .map(x => this.visitSystemContextView(x)).join("\n"));
        const containers = indent((views.containers ?? [])
            .map(x => this.visitContainerView(x)).join("\n"));
        const components = indent((views.components ?? [])
            .map(x => this.visitComponentView(x)).join("\n"));
        const deployments = indent((views.deployments ?? [])
            .map(x => this.visitDeploymentView(x)).join("\n"));
        const styles = line(indent(this.visitStyles(views.configuration.styles)));
        return `views {\n${systemLandscape}\n${systemContext}\n${containers}\n${components}\n${deployments}\n${styles}\n}`;
    }

    visitSystemLandscapeView(view: ISystemContextView): string {
        return `systemLandscape "${view.title}" {\n${indent("include *")}\n${indent("autoLayout")}\n}`;
    }

    visitSystemContextView(view: ISystemContextView): string {
        return `systemContext ${view.identifier} "${view.key}" {\n${indent("include *")}\n${indent("autoLayout")}\n}`;
    }

    visitContainerView(view: IContainerView): string {
        return `container ${view.identifier} "${view.key}" {\n${indent("include *")}\n${indent("autoLayout")}\n}`;
    }

    visitComponentView(view: IContainerView): string {
        return `component ${view.identifier} "${view.key}" {\n${indent("include *")}\n${indent("autoLayout")}\n}`;
    }

    visitDeploymentView(view: IDeploymentView): string {
        return `deployment ${view.identifier} "${view.environment}" "${view.key}" {\n${indent("include *")}\n${indent("autoLayout")}\n}`;
    }

    visitStyles(styles: Styles): string {
        const elements = indent(this.visitElementStyle(styles?.elements));
        const relationships = indent(this.visitRelationshipStyle(styles?.relationships));
        return `styles {\n${elements}\n${relationships}\n}`;
    }

    visitElementStyle(elementStyle: ElementStyle): string {
        return !elementStyle ? "" : elementStyle
            .map(style => {
                const properties = Object.keys(style)
                    .filter(property => property !== "tag" && property !== "properties")
                    .map(property => line(indent(`${property} ${style[property]}`)))
                    .join("");
                return `element "${style.tag}" {\n${properties}\n}`;
            })
            .join("\n");
    }

    visitRelationshipStyle(relationshipStyle: RelationshipStyle): string {
        return !relationshipStyle ? "" : relationshipStyle
            .map(style => {
                const properties = Object.keys(style)
                    .filter(property => property !== "tag" && property !== "properties")
                    .map(property => line(indent(`${property} ${style[property]}`)))
                    .join("");
                return `relationship "${style.tag}" {\n${properties}\n}`;
            })
            .join("\n");
    }

    visitTechnology(technology: Technology[]): string {
        return !technology ? "" : technology.map(x => x.name).join(", ");
    }

    visitTags(tags: Tag[]): string {
        return !tags ? "" : tags.map(x => x.name).join(", ");
    }
}