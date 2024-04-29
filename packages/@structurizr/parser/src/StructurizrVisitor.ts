import {
    Component,
    ComponentViewDefinition,
    Configuration,
    Container,
    ContainerInstance,
    ContainerViewDefinition,
    DeploymentEnvironment,
    DeploymentNode,
    DeploymentViewDefinition,
    ElementType,
    Group,
    InfrastructureNode,
    IRelationship,
    Model,
    Person,
    Relationship,
    RelationshipType,
    SoftwareSystem,
    SoftwareSystemInstance,
    Style,
    IStyles,
    SystemContextViewDefinition,
    SystemLandscapeViewDefinition,
    Tag,
    Technology,
    Views,
    Workspace,
    IElementStyleProperties,
    IRelationshipStyleProperties,
    IWorkspaceSnapshot,
    IModel,
    IComponent,
    IComponentView,
    IContainer,
    IContainerInstance,
    IContainerView,
    IDeploymentEnvironment,
    IDeploymentNode,
    IDeploymentView,
    IGroup,
    IInfrastructureNode,
    IPerson,
    ISoftwareSystem,
    ISoftwareSystemInstance,
    ISystemContextView,
    ISystemLandscapeView,
    IViews,
} from "@structurizr/dsl";
import { StructurizrParser } from "./StructurizrParser";
import { TokenName } from "./TokenName";

const structurizrParser = new StructurizrParser();
const WorkspaceVisitorCtor = structurizrParser.getBaseCstVisitorConstructorWithDefaults();

function trimQuotes(text: string): string {
    return text?.replace(/^"(.*)"$/, '$1');
}

interface PropertyContext {
    Identifier?: Array<{ image?: string }>;
    StringLiteral?: Array<{ image?: string }>;
    NumericLiteral?: Array<{ image?: string }>;
    HexColorLiteral?: Array<{ image?: string }>;
    BooleanLiteral?: Array<{ image?: string }>;
    UrlLiteral?: Array<{ image?: string }>;
}

export class StructurizrVisitor extends WorkspaceVisitorCtor {
    constructor() {
        super();
        this.validateVisitor();
    }

    workspace(ctx: {
        StringLiteral?: any;
        model: any;
        views: any }
    ): IWorkspaceSnapshot {
        return new Workspace({
            version: 1,
            name: trimQuotes(ctx.StringLiteral?.at(0)?.image) ?? "Empty Workspace",
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            model: this.visit(ctx.model),
            views: this.visit(ctx.views)
        }).toSnapshot();
    }

    model(ctx: {
        person?: any;
        group?: any;
        softwareSystem?: any;
        deploymentEnvironment?: any;
        relationship?: any;
    }): IModel {
        return new Model({
            groups: ctx.group?.map(x => this.visit(x)) ?? [],
            people: ctx.person?.map(x => this.visit(x)) ?? [],
            softwareSystems: ctx.softwareSystem?.map(x => this.visit(x)) ?? [],
            deploymentEnvironments: ctx.deploymentEnvironment?.map(x => this.visit(x)) ?? [],
            relationships: ctx.relationship?.map(x => this.visit(x)) ?? []
        }).toSnapshot();
    }

    group(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        personOrSoftwareSystem?: any[];
        container?: any[];
        component?: any[];
    }): IGroup {
        const personOrSoftwareSystems = ctx.personOrSoftwareSystem?.map((x) => this.visit(x));
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);

        return new Group({
            identifier: ctx.Identifier?.at(0)?.image ?? name,
            name: name,
            people: personOrSoftwareSystems?.filter((x) => x.type === ElementType.Person) ?? [],
            softwareSystems: personOrSoftwareSystems?.filter((x) => x.type === ElementType.SoftwareSystem) ?? [],
            containers: ctx.container?.map((x) => this.visit(x)) ?? [],
            components: ctx.component?.map((x) => this.visit(x)) ?? []
        }).toSnapshot();
    }

    personOrSoftwareSystem(ctx: {
        person?: any[];
        softwareSystem?: any[] }
    ): IPerson | ISoftwareSystem {
        if (ctx.person) {
            return this.visit(ctx.person);
        }
        if (ctx.softwareSystem) {
            return this.visit(ctx.softwareSystem);
        }

        return undefined;
    }

    person(ctx: PropertyContext): IPerson {
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        return new Person({
            identifier: ctx.Identifier?.at(0)?.image ?? name,
            name: name,
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(2)?.image))
        }).toSnapshot();
    }

    softwareSystem(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        group?: any[];
        container?: any[];
        relationship?: any[];
        elementProperties?: any
    }): ISoftwareSystem {
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        const identifier = ctx.Identifier?.at(0)?.image ?? name;
        const properties = this.visit(ctx.elementProperties);
        const relationships = ctx.relationship
            ?.map<Relationship>((x) => this.visit(x))
            ?.map<IRelationship>((x) => {
                return {
                    ...x,
                    type: RelationshipType.Relationship,
                    sourceIdentifier: x.sourceIdentifier.toLocaleUpperCase() === TokenName.ThisLiteral.toLocaleUpperCase() ? identifier : x.sourceIdentifier,
                    targetIdentifier: x.targetIdentifier.toLocaleUpperCase() === TokenName.ThisLiteral.toLocaleUpperCase() ? identifier : x.targetIdentifier,
                    tags: x.tags ?? [],
                    technology: x.technology ?? []
                };
            });

        return new SoftwareSystem({
            identifier: identifier,
            name: properties?.name ?? name,
            technology: [],
            description: properties?.description
                ?? trimQuotes(ctx.StringLiteral?.at(1)?.image),
            tags: Tag
                .from(trimQuotes(ctx.StringLiteral?.at(2)?.image))
                .concat(properties?.tags ?? []),
            groups: ctx.group?.map((x) => this.visit(x)),
            containers: ctx.container?.map((x) => this.visit(x)),
            relationships: relationships
        }).toSnapshot();
    }

    container(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        group?: any[];
        component?: any[];
        relationship?: any[];
        elementProperties?: any
    }): IContainer {
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        const identifier = ctx.Identifier?.at(0)?.image ?? name;
        const properties = this.visit(ctx.elementProperties);
        const relationships = ctx.relationship
            ?.map<Relationship>((x) => this.visit(x))
            ?.map<IRelationship>((x) => {
                return {
                    ...x,
                    type: RelationshipType.Relationship,
                    sourceIdentifier: x.sourceIdentifier.toLocaleUpperCase() === TokenName.ThisLiteral.toLocaleUpperCase() ? identifier : x.sourceIdentifier,
                    targetIdentifier: x.targetIdentifier.toLocaleUpperCase() === TokenName.ThisLiteral.toLocaleUpperCase() ? identifier : x.targetIdentifier,
                    tags: x.tags ?? [],
                    technology: x.technology ?? []
                };
            });
        
        return new Container({
            identifier: identifier,
            name: properties?.name ?? name,
            description: properties?.description
                ?? trimQuotes(ctx.StringLiteral?.at(1)?.image),
            technology: Technology
                .from(trimQuotes(ctx.StringLiteral?.at(2)?.image))
                .concat(properties?.technology ?? []),
            tags: Tag
                .from(trimQuotes(ctx.StringLiteral?.at(3)?.image))
                .concat(properties?.tags ?? []),
            groups: ctx.group?.map((x) => this.visit(x)),
            components: ctx.component?.map((x) => this.visit(x)),
            relationships: relationships
        }).toSnapshot();
    }

    component(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        relationship?: any[];
        elementProperties?: any
    }): IComponent {
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        const identifier = ctx.Identifier?.at(0)?.image ?? name;
        const properties = this.visit(ctx.elementProperties);
        const relationships = ctx.relationship
            ?.map<Relationship>((x) => this.visit(x))
            ?.map<IRelationship>((x) => {
                return {
                    ...x,
                    type: RelationshipType.Relationship,
                    sourceIdentifier: x.sourceIdentifier.toLocaleUpperCase() === TokenName.ThisLiteral.toLocaleUpperCase() ? identifier : x.sourceIdentifier,
                    targetIdentifier: x.targetIdentifier.toLocaleUpperCase() === TokenName.ThisLiteral.toLocaleUpperCase() ? identifier : x.targetIdentifier,
                    tags: x.tags ?? [],
                    technology: x.technology ?? []
                };
            });

        return new Component({
            identifier: identifier,
            name: properties?.name ?? name,
            description: properties?.description
                ?? trimQuotes(ctx.StringLiteral?.at(1)?.image),
            technology: Technology
                .from(trimQuotes(ctx.StringLiteral?.at(2)?.image))
                .concat(properties?.technology ?? []),
            tags: Tag
                .from(trimQuotes(ctx.StringLiteral?.at(3)?.image))
                .concat(properties?.tags ?? []),
            relationships: relationships
        }).toSnapshot();
    }

    deploymentEnvironment(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        group?: any[];
        deploymentNode?: any[];
        relationship?: any[];
    }): IDeploymentEnvironment {
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        
        return new DeploymentEnvironment({
            identifier: ctx.Identifier?.at(0)?.image ?? name,
            name: name,
            deploymentGroups: ctx.group?.map((x) => this.visit(x)),
            // groups: ctx.group?.map((x) => this.visit(x)),
            deploymentNodes: ctx.deploymentNode?.map((x) => this.visit(x)),
            relationships: ctx.relationship?.map((x) => this.visit(x))
        }).toSnapshot();
    }

    deploymentNode(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        NumericLiteral?: any;
        deploymentNode?: any[];
        infrastructureNode?: any[];
        softwareSystemInstance?: any[];
        containerInstance?: any[];
        elementProperties?: any
    }): IDeploymentNode {
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        const properties = this.visit(ctx.elementProperties);

        return new DeploymentNode({
            identifier: ctx.Identifier?.at(0)?.image ?? name,
            name: name,
            description: properties?.description
                ?? trimQuotes(ctx.StringLiteral?.at(1)?.image),
            technology: Technology
                .from(trimQuotes(ctx.StringLiteral?.at(2)?.image))
                .concat(properties?.technology ?? []),
            tags: Tag
                .from(trimQuotes(ctx.StringLiteral?.at(3)?.image))
                .concat(properties?.tags ?? []),
            instances: ctx.NumericLiteral?.at(0)?.image,
            deploymentNodes: ctx.deploymentNode?.map((x) => this.visit(x)),
            infrastructureNodes: ctx.infrastructureNode?.map((x) => this.visit(x)),
            softwareSystemInstances: ctx.softwareSystemInstance?.map((x) => this.visit(x)),
            containerInstances: ctx.containerInstance?.map((x) => this.visit(x))
        }).toSnapshot();
    }

    infrastructureNode(ctx: {
        Identifier?: any;
        StringLiteral?: any;
        NumericLiteral?: any;
        relationship?: any[];
        elementProperties?: any
    }): IInfrastructureNode {
        const name = trimQuotes(ctx.StringLiteral?.at(0)?.image);
        const properties = this.visit(ctx.elementProperties);

        return new InfrastructureNode({
            identifier: ctx.Identifier?.at(0)?.image ?? name,
            name: name,
            description: properties?.description
                ?? trimQuotes(ctx.StringLiteral?.at(1)?.image),
            technology: Technology
                .from(trimQuotes(ctx.StringLiteral?.at(2)?.image))
                .concat(properties?.technology ?? []),
            tags: Tag
                .from(trimQuotes(ctx.StringLiteral?.at(3)?.image))
                .concat(properties?.tags ?? []),
            relationships: ctx.relationship?.map((x) => this.visit(x))
        }).toSnapshot();
    }

    softwareSystemInstance(ctx: PropertyContext): ISoftwareSystemInstance {
        const identifier = ctx.Identifier?.at(0)?.image;
        const softwareSystemIdentifier = ctx.Identifier?.at(1)?.image ?? identifier;

        return new SoftwareSystemInstance({
            identifier: identifier ?? softwareSystemIdentifier,
            softwareSystemIdentifier: softwareSystemIdentifier,
            // deploymentGroups: ctx.StringLiteral?.at(0)?.image,
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(1)?.image))
        }).toSnapshot();
    }

    containerInstance(ctx: PropertyContext): IContainerInstance {
        const identifier = ctx.Identifier?.at(0)?.image;
        const containerIdentifier = ctx.Identifier?.at(1)?.image ?? identifier;

        return new ContainerInstance({
            identifier: identifier ?? containerIdentifier,
            containerIdentifier: containerIdentifier,
            // deploymentGroups: ctx.StringLiteral?.at(0)?.image,
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(1)?.image))
        }).toSnapshot();
    }

    relationship(ctx: PropertyContext): IRelationship {
        return new Relationship({
            description: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            technology: Technology.from(trimQuotes(ctx.StringLiteral?.at(1)?.image)),
            tags: Tag.from(trimQuotes(ctx.StringLiteral?.at(2)?.image)),
            sourceIdentifier: ctx.Identifier[0].image,
            targetIdentifier: ctx.Identifier[1].image
        }).toSnapshot();
    }

    elementProperties(ctx: {
        nameProperty: any,
        technologyProperty: any,
        descriptionProperty: any,
        tagsProperty: any
    }) : any {
        return {
            name: this.visit(ctx.nameProperty),
            technology: this.visit(ctx.technologyProperty),
            description: this.visit(ctx.descriptionProperty),
            tags: this.visit(ctx.tagsProperty)
        }
    }

    nameProperty(ctx: PropertyContext) : string {
        return trimQuotes(ctx.StringLiteral?.at(0)?.image)
    }

    technologyProperty(ctx: PropertyContext) : Technology[] {
        return Technology.from(trimQuotes(ctx.StringLiteral?.at(0)?.image))
    }

    descriptionProperty(ctx: PropertyContext) : string {
        return trimQuotes(ctx.StringLiteral?.at(0)?.image)
    }
    
    tagsProperty(ctx: PropertyContext): Tag[] {
        return ctx.StringLiteral?.map((x) => new Tag(trimQuotes(x.image))) ?? [];
    }

    themesProperty(ctx: PropertyContext): string {
        return ctx.UrlLiteral?.at(0)?.image ?? "";
    }

    views(ctx: {
        systemLandscapeView?: any;
        systemContextView?: any;
        containerView?: any;
        componentView?: any;
        deploymentView?: any;
        styles?: any;
        themesProperty?: any;
    }): IViews {
        const themes = this.visit(ctx.themesProperty);
        return new Views({
            systemLandscape: this.visit(ctx.systemLandscapeView),
            systemContexts: ctx.systemContextView?.map((x) => this.visit(x)) ?? [],
            containers: ctx.containerView?.map((x) => this.visit(x)) ?? [],
            components: ctx.componentView?.map((x) => this.visit(x)) ?? [],
            deployments: ctx.deploymentView?.map((x) => this.visit(x)) ?? [],
            // filtered: [],
            // custom: [],
            // dynamics: [],
            configuration: new Configuration({
                styles: this.visit(ctx.styles),
                themes: themes ? [themes] : []
            })
        }).toSnapshot();
    }

    systemLandscapeView(ctx: PropertyContext): ISystemLandscapeView {
        return new SystemLandscapeViewDefinition({
            key: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            include: [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    systemContextView(ctx: PropertyContext): ISystemContextView {
        return new SystemContextViewDefinition({
            softwareSystemIdentifier: ctx.Identifier?.at(0)?.image,
            key: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            include: [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    containerView(ctx: PropertyContext): IContainerView {
        return new ContainerViewDefinition({
            softwareSystemIdentifier: ctx.Identifier?.at(0)?.image,
            key: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            include: [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    componentView(ctx: PropertyContext): IComponentView {
        return new ComponentViewDefinition({
            containerIdentifier: ctx.Identifier?.at(0)?.image,
            key: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            include: [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    deploymentView(ctx: PropertyContext): IDeploymentView {
        return new DeploymentViewDefinition({
            softwareSystemIdentifier: ctx.Identifier?.at(0)?.image,
            environment: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            key: trimQuotes(ctx.StringLiteral?.at(1)?.image),
            description: trimQuotes(ctx.StringLiteral?.at(2)?.image),
            include: [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    styles(ctx: {
        elementStyle?: any[];
        relationshipStyle?: any[];
    }): IStyles {
        return {
            elements: ctx.elementStyle
                ?.reduce((style, value) => ([ ...style, this.visit(value) ]), [])
                ?? [],
            relationships: ctx.relationshipStyle
                ?.reduce((style, value) => ([ ...style, this.visit(value) ]), [])
                ?? []
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
    }): Style<IElementStyleProperties> {
        return {
            tag: trimQuotes(ctx.StringLiteral?.at(0)?.image),
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
    }): Style<IRelationshipStyleProperties> {
        return {
            tag: trimQuotes(ctx.StringLiteral?.at(0)?.image), 
            thickness: this.visit(ctx.thinkness),
            color: this.visit(ctx.color),
            style: this.visit(ctx.style),
            routing: this.visit(ctx.routing),
            fontSize: this.visit(ctx.fontSize),
            width: this.visit(ctx.width),
            position: this.visit(ctx.position),
            opacity: this.visit(ctx.opacity)
        }
    }
  
    background(ctx: PropertyContext) {
        return ctx.HexColorLiteral?.at(0)?.image;
    }
  
    color(ctx: PropertyContext) {
        return ctx.HexColorLiteral?.at(0)?.image;
    }
  
    stroke(ctx: PropertyContext) {
        return ctx.HexColorLiteral?.at(0)?.image;
    }
  
    strokeWidth(ctx: PropertyContext) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    height(ctx: PropertyContext) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    width(ctx: PropertyContext) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    border(ctx: PropertyContext) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    shape(ctx: PropertyContext) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    icon(ctx: PropertyContext) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    fontSize(ctx: PropertyContext) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    opacity(ctx: PropertyContext) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    metadata(ctx: PropertyContext) {
        return Boolean(ctx.BooleanLiteral?.at(0)?.image);
    }
  
    description(ctx: PropertyContext) {
        return Boolean(ctx.BooleanLiteral?.at(0)?.image);
    }
  
    thinkness(ctx: PropertyContext) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    style(ctx: PropertyContext) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    routing(ctx: PropertyContext) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    position(ctx: PropertyContext) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
}
