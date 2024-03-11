import {
    ElementStyleCollection,
    IElementVisitor,
    RelationshipStyleCollection,
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
    IWorkspaceSnapshot,
    IViews,
    Technology,
    Tag,
    ISystemContextView,
    IContainerView,
    IDeploymentView
} from "@structurizr/dsl";

function indentLines(lines: string[]): string[] {
    return lines.map(line => `\t${line}`);
}

function formatBody(lines: string[]): string[] {
    return lines?.length > 0 ? indentLines(lines) : [];
}

function formatStatement(header: string, body?: string[]) {
    return body?.length > 0 ? [`${header} {`, ...formatBody(body), "}"] : [header];
}

type StructurizrFormattingOptions = {
    openBracesOnNewLine?: boolean;
    elementPropertiesInBody?: boolean;
}

export class StructurizrExportVisitor implements IElementVisitor {
    constructor(
        private readonly options?: StructurizrFormattingOptions
    ) {}

    visitWorkspace(workspace: IWorkspaceSnapshot): string[] {
        const model = this.visitModel(workspace.model);
        const views = this.visitViews(workspace.views);
        return formatStatement(
            `workspace "${workspace.name}" "${workspace.description}"`,
            [...model, ...views]
        );
    }

    visitModel(model: IModel): string[] {
        const people = (model.people ?? []).flatMap(x => this.visitPerson(x));
        const groups = (model.groups ?? []).flatMap(x => this.visitGroup(x));
        const softwareSystems = (model.softwareSystems ?? []).flatMap(x => this.visitSoftwareSystem(x));
        const environments = (model.deploymentEnvironments ?? []).flatMap(x => this.visitDeploymentEnvironment(x));
        const relationships = (model.relationships ?? []).flatMap(x => this.visitRelationship(x));
        return formatStatement(
            "model",
            [...people, ...groups, ...softwareSystems, ...environments, ...relationships]
        );
    }

    visitGroup(group: IGroup, params?: { parentId?: string; }): string[] {
        const people = (group.people ?? []).flatMap(x => this.visitPerson(x));
        const softwareSystems = (group.softwareSystems ?? []).flatMap(x => this.visitSoftwareSystem(x));
        const containers = (group.containers ?? []).flatMap(x => this.visitContainer(x));
        const components = (group.components ?? []).flatMap(x => this.visitComponent(x));
        return formatStatement(
            `group "${group.name}"`,
            [...people, ...softwareSystems, ...containers, ...components]
        );
    }
    
    visitPerson(person: IPerson, params?: { parentId?: string; }): string[] {
        const rels = (person.relationships ?? []).flatMap(x => this.visitRelationship(x));
        return formatStatement(`${person.identifier} = person "${person.name}" "${person.description ?? ""}"`, rels);
    }

    visitSoftwareSystem(softwareSystem: ISoftwareSystem, params?: { parentId?: string; }): string[] {
        const groups = (softwareSystem.groups ?? []).flatMap(x => this.visitGroup(x));
        const containers = (softwareSystem.containers ?? []).flatMap(x => this.visitContainer(x));
        const rels = (softwareSystem.relationships ?? []).flatMap(x => this.visitRelationship(x));
        return formatStatement(
            `${softwareSystem.identifier} = softwareSystem "${softwareSystem.name}" "${softwareSystem.description ?? ""}"`,
            [...groups, ...containers, ...rels]
        );
    }

    visitContainer(container: IContainer, params?: { parentId?: string; }): string[] {
        const groups = (container.groups ?? []).flatMap(x => this.visitGroup(x));
        const components = (container.components ?? []).flatMap(x => this.visitComponent(x));
        const rels = (container.relationships ?? []).flatMap(x => this.visitRelationship(x));
        return formatStatement(
            `${container.identifier} = container "${container.name}" "${container.description ?? ""}"`,
            [...groups, ...components, ...rels]
        );
    }

    visitComponent(component: IComponent, params?: { parentId?: string; }): string[] {
        return formatStatement(
            `${component.identifier} = component "${component.name}" "${component.description ?? ""}"`
        );
    }

    visitDeploymentEnvironment(environment: IDeploymentEnvironment): string[] {
        const deploymentNodes = (environment.deploymentNodes ?? []).flatMap(x => this.visitDeploymentNode(x));
        return formatStatement(
            `deploymentEnvironment "${environment.name}"`,
            [...deploymentNodes]
        );
    }

    visitDeploymentNode(deploymentNode: IDeploymentNode, params?: { parentId?: string; }): string[] {
        // TODO: visit infrastructure nodes
        const deploymentNodes = (deploymentNode.deploymentNodes ?? []).flatMap(x => this.visitDeploymentNode(x));
        const infrastructureNodes = (deploymentNode.infrastructureNodes ?? []).flatMap(x => this.visitInfrastructureNode(x));
        const systems = (deploymentNode.softwareSystemInstances ?? []).flatMap(x => this.visitSoftwareSystemInstance(x));
        const containers = (deploymentNode.containerInstances ?? []).flatMap(x => this.visitContainerInstance(x));
        return formatStatement(
            `deploymentNode "${deploymentNode.name}" "${deploymentNode.description}"`,
            [...deploymentNodes, ...infrastructureNodes, ...systems, ...containers]
        );
    }

    visitInfrastructureNode(infrastructureNode: IInfrastructureNode, params?: { parentId?: string; }): string[] {
        return [];
    }
    
    visitSoftwareSystemInstance(instance: ISoftwareSystemInstance, params?: { parentId?: string; }): string[] {
        return formatStatement(
            `${instance.identifier} = softwareSystemInstance "${instance.softwareSystemIdentifier}"`
        );
    }

    visitContainerInstance(instance: IContainerInstance, params?: { parentId?: string; }): string[] {
        return formatStatement(
            `${instance.identifier} = containerInstance "${instance.containerIdentifier}"`
        );
    }

    visitRelationship(relationship: IRelationship): string[] {
        return formatStatement(
            `${relationship.sourceIdentifier} -> ${relationship.targetIdentifier} "${relationship.description ?? ""}"`
        );
    }

    visitViews(views: IViews): string[] {
        const systemLandscape = (views.systemLandscape ?? []).flatMap(x => this.visitSystemLandscapeView(x));
        const systemContext = (views.systemContexts ?? []).flatMap(x => this.visitSystemContextView(x));
        const containers = (views.containers ?? []).flatMap(x => this.visitContainerView(x));
        const components = (views.components ?? []).flatMap(x => this.visitComponentView(x));
        const deployments = (views.deployments ?? []).flatMap(x => this.visitDeploymentView(x));
        // TODO: format styles if not empty
        const styles = (this.visitStyles(views.configuration.styles));
        return formatStatement(
            "views",
            [...systemLandscape, ...systemContext, ...containers, ...components, ...deployments]);
    }

    visitSystemLandscapeView(view: ISystemContextView): string[] {
        return formatStatement(
            `systemLandscape "${view.title}"`,
            ["include *", "autoLayout"]
        );
    }

    visitSystemContextView(view: ISystemContextView): string[] {
        return formatStatement(
            `systemContext ${view.identifier} "${view.key}"`,
            ["include *", "autoLayout"]
        );
    }

    visitContainerView(view: IContainerView): string[] {
        return formatStatement(
            `container ${view.identifier} "${view.key}"`,
            ["include *", "autoLayout"]
        );
    }

    visitComponentView(view: IContainerView): string[] {
        return formatStatement(
            `component ${view.identifier} "${view.key}"`,
            ["include *", "autoLayout"]
        );
    }

    visitDeploymentView(view: IDeploymentView): string[] {
        return formatStatement(
            `deployment ${view.identifier} "${view.environment}" "${view.key}"`,
            ["include *", "autoLayout"]
        );
    }

    visitStyles(styles: Styles): string[] {
        const elements = this.visitElementStyle(styles?.elements);
        const relationships = this.visitRelationshipStyle(styles?.relationships);
        return formatStatement(
            "styles",
            [...elements, ...relationships]
        );
    }

    visitElementStyle(elementStyle: ElementStyleCollection): string[] {
        return !elementStyle ? [] : elementStyle
            .flatMap(style => {
                const properties = Object.keys(style)
                    .filter(property => property !== "tag" && property !== "properties")
                    .map(property => `${property} ${style[property]}`);
                return formatStatement(`element "${style.tag}"`, properties);
            });
    }

    visitRelationshipStyle(relationshipStyle: RelationshipStyleCollection): string[] {
        return !relationshipStyle ? [] : relationshipStyle
            .flatMap(style => {
                const properties = Object.keys(style)
                    .filter(property => property !== "tag" && property !== "properties")
                    .map(property => `${property} ${style[property]}`);
                return formatStatement(`relationship "${style.tag}"`, properties);
            });
    }

    visitTechnology(technology: Technology[]): string[] {
        return !technology ? [] : [technology.map(x => x.name).join(", ")];
    }

    visitTags(tags: Tag[]): string[] {
        return !tags ? [] : [tags.map(x => x.name).join(", ")];
    }
}