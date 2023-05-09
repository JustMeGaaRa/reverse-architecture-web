import {
    Component,
    ComponentView,
    Container,
    ContainerInstance,
    ContainerView,
    DeploymentEnvironment,
    DeploymentNode,
    DeploymentView,
    ElementType,
    Group,
    Model,
    Person,
    Relationship,
    RelationshipType,
    SoftwareSystem,
    SoftwareSystemInstance,
    SystemContextView,
    SystemLandscapeView,
    Tag,
    Views,
    ViewType,
    Workspace
} from "@structurizr/dsl";
import { StructurizrParser } from "./StructurizrParser";

const parser = new StructurizrParser();
const VisitorCtor = parser.getBaseCstVisitorConstructorWithDefaults();

function trimQuotes(text: string): string {
    return text?.replace(/^"(.*)"$/, '$1') ?? "";
}

export class StructurizrVisitor extends VisitorCtor {
    constructor() {
        super();
        this.validateVisitor();
    }

    workspace(ctx: {
        StringLiteral?: any;
        model: any;
        views: any }
    ): Workspace {
        return {
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            model: this.visit(ctx.model),
            views: this.visit(ctx.views)
        };
    }

    model(ctx: {
        person?: any;
        group?: any;
        softwareSystem?: any;
        deploymentEnvironment?: any;
        relationship?: any;
    }): Model {
        return {
            groups: ctx.group?.map(x => this.visit(x)) ?? [],
            people: ctx.person?.map(x => this.visit(x)) ?? [],
            softwareSystems: ctx.softwareSystem?.map(x => this.visit(x)) ?? [],
            deploymentEnvironments: ctx.deploymentEnvironment?.map(x => this.visit(x)) ?? [],
            relationships: ctx.relationship?.map(x => this.visit(x)) ?? []
        };
    }

    group(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        personOrSoftwareSystem?: any[];
        container?: any[];
        component?: any[];
    }): Group {
        const personOrSoftwareSystems = ctx.personOrSoftwareSystem?.map((x) => this.visit(x));

        return {
            identifier: ctx.Identifier?.at(0)?.image,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            people: personOrSoftwareSystems?.filter((x) => x.type === ElementType.Person) ?? [],
            softwareSystems: personOrSoftwareSystems?.filter((x) => x.type === ElementType.SoftwareSystem) ?? [],
            containers: ctx.container?.map((x) => this.visit(x)) ?? [],
            components: ctx.component?.map((x) => this.visit(x)) ?? []
        };
    }

    personOrSoftwareSystem(ctx: {
        person?: any[];
        softwareSystem?: any[] }
    ): Person | SoftwareSystem {
        if (ctx.person) {
            return this.visit(ctx.person);
        }
        if (ctx.softwareSystem) {
            return this.visit(ctx.softwareSystem);
        }

        return undefined;
    }

    person(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): Person {
        return new Person({
            identifier: ctx.Identifier?.at(0)?.image,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(2)?.image))
        });
    }

    softwareSystem(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        group?: any[];
        container?: any[];
        relationship?: any[];
    }): SoftwareSystem {
        return new SoftwareSystem({
            identifier: ctx.Identifier?.at(0)?.image,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            technology: [],
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(2)?.image)),
            groups: ctx.group?.map((x) => this.visit(x)),
            containers: ctx.container?.map((x) => this.visit(x)),
            relationships: ctx.relationship?.map((x) => this.visit(x))
        });
    }

    container(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        group?: any[];
        component?: any[];
        relationship?: any[];
    }): Container {
        return new Container({
            identifier: ctx.Identifier?.at(0)?.image,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            technology: [ { name: trimQuotes(ctx.StringLiteral?.at(2)?.image) }],
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(3)?.image)),
            groups: ctx.group?.map((x) => this.visit(x)),
            components: ctx.component?.map((x) => this.visit(x)),
            relationships: ctx.relationship?.map((x) => this.visit(x))
        });
    }

    component(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        relationship?: any[];
    }): Component {
        return new Component({
            identifier: ctx.Identifier?.at(0)?.image,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            technology: [ { name: trimQuotes(ctx.StringLiteral?.at(2)?.image) } ],
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(3)?.image)),
            relationships: ctx.relationship?.map((x) => this.visit(x))
        });
    }

    deploymentEnvironment(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        group?: any[];
        deploymentNode?: any[];
        relationship?: any[];
    }): DeploymentEnvironment {
        return new DeploymentEnvironment({
            identifier: ctx.Identifier?.at(0)?.image,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            deploymentGroups: ctx.group?.map((x) => this.visit(x)),
            // groups: ctx.group?.map((x) => this.visit(x)),
            deploymentNodes: ctx.deploymentNode?.map((x) => this.visit(x)),
            relationships: ctx.relationship?.map((x) => this.visit(x))
        });
    }

    deploymentNode(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        NumericalLiteral?: any;
        deploymentNode?: any[];
        softwareSystemInstance?: any[];
        containerInstance?: any[];
    }): DeploymentNode {
        return new DeploymentNode({
            identifier: ctx.Identifier?.at(0)?.image,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            technology: [ { name: trimQuotes(ctx.StringLiteral?.at(2)?.image) } ],
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(3)?.image)),
            instances: ctx.NumericalLiteral?.at(0)?.image,
            deploymentNodes: ctx.deploymentNode?.map((x) => this.visit(x)),
            softwareSystemInstances: ctx.softwareSystemInstance?.map((x) => this.visit(x)),
            containerInstances: ctx.containerInstance?.map((x) => this.visit(x))
        });
    }

    softwareSystemInstance(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): SoftwareSystemInstance {
        return new SoftwareSystemInstance({
            identifier: ctx.Identifier?.at(0)?.image,
            softwareSystemIdentifier: ctx.Identifier?.at(1)?.image,
            deploymentGroups: ctx.StringLiteral?.at(0)?.image,
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(1)?.image))
        });
    }

    containerInstance(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): ContainerInstance {
        return new ContainerInstance({
            identifier: ctx.Identifier?.at(0)?.image,
            containerIdentifier: ctx.Identifier?.at(1)?.image,
            deploymentGroups: ctx.StringLiteral?.at(0)?.image,
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(1)?.image))
        });
    }

    relationship(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): Relationship {
        return new Relationship({
            description: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            technology: [ { name: trimQuotes(ctx.StringLiteral?.at(1)?.image) } ],
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(2)?.image)),
            sourceIdentifier: ctx.Identifier[0].image,
            targetIdentifier: ctx.Identifier[1].image
        });
    }

    views(ctx: {
        systemLandscapeView?: any;
        systemContextView?: any;
        containerView?: any;
        componentView?: any;
        deploymentView?: any;
    }): Views {
        return {
            systemLandscape: this.visit(ctx.systemLandscapeView),
            systemContexts: ctx.systemContextView?.map((x) => this.visit(x)) ?? [],
            containers: ctx.containerView?.map((x) => this.visit(x)) ?? [],
            components: ctx.componentView?.map((x) => this.visit(x)) ?? [],
            deployments: ctx.deploymentView?.map((x) => this.visit(x)) ?? [],
            custom: [],
            dynamics: [],
            filtered: [],
            styles: {
                element: {},
                relationship: {}
            },
            themes: []
        };
    }

    systemLandscapeView(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): SystemLandscapeView {
        return {
            type: ViewType.SystemLandscape,
            identifier: ctx.Identifier?.at(0)?.image,
            key: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            elements: []
        };
    }

    systemContextView(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): SystemContextView {
        return {
            type: ViewType.SystemContext,
            identifier: ctx.Identifier?.at(0)?.image,
            key: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            elements: []
        };
    }

    containerView(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): ContainerView {
        return {
            type: ViewType.Container,
            identifier: ctx.Identifier?.at(0)?.image,
            key: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            elements: []
        };
    }

    componentView(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): ComponentView {
        return {
            type: ViewType.Component,
            identifier: ctx.Identifier?.at(0)?.image,
            key: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            elements: []
        };
    }

    deploymentView(ctx: {
        Identifier?: any;
        StringLiteral?: any
    }): DeploymentView {
        return {
            type: ViewType.Deployment,
            identifier: ctx.Identifier?.at(0)?.image,
            title: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            key: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(2)?.image),
            elements: []
        };
    }
}
