import {
    Component,
    ComponentView,
    Container,
    ContainerInstance,
    ContainerView,
    DeploymentEnvironment,
    DeploymentNode,
    DeploymentView,
    ElementStyle,
    ElementType,
    Group,
    Model,
    Person,
    Relationship,
    RelationshipStyle,
    SoftwareSystem,
    SoftwareSystemInstance,
    Styles,
    SystemContextView,
    SystemLandscapeView,
    Tag,
    Technology,
    Views,
    ViewType,
    Workspace
} from "@structurizr/dsl";
import { StructurizrParser } from "./StructurizrParser";

const parser = new StructurizrParser();
const VisitorCtor = parser.getBaseCstVisitorConstructorWithDefaults();

function trimQuotes(text: string): string {
    return text?.replace(/^"(.*)"$/, '$1');
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
        return new Model({
            groups: ctx.group?.map(x => this.visit(x)) ?? [],
            people: ctx.person?.map(x => this.visit(x)) ?? [],
            softwareSystems: ctx.softwareSystem?.map(x => this.visit(x)) ?? [],
            deploymentEnvironments: ctx.deploymentEnvironment?.map(x => this.visit(x)) ?? [],
            relationships: ctx.relationship?.map(x => this.visit(x)) ?? []
        });
    }

    group(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        personOrSoftwareSystem?: any[];
        container?: any[];
        component?: any[];
    }): Group {
        const personOrSoftwareSystems = ctx.personOrSoftwareSystem?.map((x) => this.visit(x));
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);

        return new Group({
            identifier: ctx.Identifier?.at(0)?.image ?? name,
            name: name,
            people: personOrSoftwareSystems?.filter((x) => x.type === ElementType.Person) ?? [],
            softwareSystems: personOrSoftwareSystems?.filter((x) => x.type === ElementType.SoftwareSystem) ?? [],
            containers: ctx.container?.map((x) => this.visit(x)) ?? [],
            components: ctx.component?.map((x) => this.visit(x)) ?? []
        });
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
            technology: Technology.from(trimQuotes(ctx.StringLiteral?.at(2)?.image)),
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
            technology: Technology.from(trimQuotes(ctx.StringLiteral?.at(2)?.image)),
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
        NumericLiteral?: any;
        deploymentNode?: any[];
        softwareSystemInstance?: any[];
        containerInstance?: any[];
    }): DeploymentNode {
        return new DeploymentNode({
            identifier: ctx.Identifier?.at(0)?.image,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            technology: Technology.from(trimQuotes(ctx.StringLiteral?.at(2)?.image)),
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(3)?.image)),
            instances: ctx.NumericLiteral?.at(0)?.image,
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
            technology: Technology.from(trimQuotes(ctx.StringLiteral?.at(1)?.image)),
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
        styles?: any;
    }): Views {
        return new Views({
            systemLandscape: this.visit(ctx.systemLandscapeView),
            systemContexts: ctx.systemContextView?.map((x) => this.visit(x)) ?? [],
            containers: ctx.containerView?.map((x) => this.visit(x)) ?? [],
            components: ctx.componentView?.map((x) => this.visit(x)) ?? [],
            deployments: ctx.deploymentView?.map((x) => this.visit(x)) ?? [],
            styles: this.visit(ctx.styles)
        });
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

    styles(ctx: {
        elementStyle?: any[];
        relationshipStyle?: any[];
    }): Styles {
        return {
            element: ctx.elementStyle
                ?.reduce((style, value) => ({ ...style, ...this.visit(value) }), {}) ?? {},
            relationship: ctx.relationshipStyle
                ?.reduce((style, value) => ({ ...style, ...this.visit(value) }), {}) ?? {}
        }
    }
  
    elementStyle(ctx: {
        StringLiteral?: any;
        shape?: any;
        icon?: any;
        width?: any;
        height?: any;
        background?: any;
        color?: any;
        stroke?: any;
        strokeWidth?: any;
        fontSize?: any;
        border?: any;
        opacity?: any;
        metadata?: any;
        description?: any;
    }): ElementStyle {
        const tag = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        return {
            [tag]: {
                shape: this.visit(ctx.shape),
                icon: this.visit(ctx.icon),
                width: this.visit(ctx.width),
                height: this.visit(ctx.height),
                background: this.visit(ctx.background),
                color: this.visit(ctx.color),
                stroke: this.visit(ctx.stroke),
                strokeWidth: this.visit(ctx.strokeWidth),
                fontSize: this.visit(ctx.fontSize),
                border: this.visit(ctx.border),
                opacity: this.visit(ctx.opacity),
                metadata: this.visit(ctx.metadata),
                description: this.visit(ctx.description),
            },
        }
    }
  
    relationshipStyle(ctx: {
        StringLiteral?: any;
        thinkness?: any;
        color?: any;
        style?: any;
        routing?: any;
        fontSize?: any;
        width?: any;
        position?: any;
        opacity?: any;
    }): RelationshipStyle {
        const tag = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        return {
            [tag]: {
                thikness: this.visit(ctx.thinkness),
                color: this.visit(ctx.color),
                style: this.visit(ctx.style),
                routing: this.visit(ctx.routing),
                fontSize: this.visit(ctx.fontSize),
                width: this.visit(ctx.width),
                position: this.visit(ctx.position),
                opacity: this.visit(ctx.opacity)
            }
        }
    }
  
    background(ctx: { HexColor?: any[] }) {
        return ctx.HexColor?.at(0)?.image;
    }
  
    color(ctx: { HexColor?: any[] }) {
        return ctx.HexColor?.at(0)?.image;
    }
  
    stroke(ctx: { HexColor?: any[] }) {
        return ctx.HexColor?.at(0)?.image;
    }
  
    strokeWidth(ctx: { NumericLiteral?: any[] }) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    height(ctx: { NumericLiteral?: any[] }) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    width(ctx: { NumericLiteral?: any[] }) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    border(ctx: { Identifier?: any[] }) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    shape(ctx: { Identifier?: any[] }) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    icon(ctx: { Identifier?: any[] }) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    fontSize(ctx: { NumericLiteral?: any[] }) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    opacity(ctx: { NumericLiteral?: any[] }) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    metadata(ctx: { Boolean?: any[] }) {
        return Boolean(ctx.Boolean?.at(0)?.image);
    }
  
    description(ctx: { Boolean?: any[] }) {
        return Boolean(ctx.Boolean?.at(0)?.image);
    }
  
    thinkness(ctx: { NumericLiteral?: any[] }) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    style(ctx: { Identifier?: any[] }) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    routing(ctx: { Identifier?: any[] }) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    position(ctx: { NumericLiteral?: any[] }) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
}
