import { CstNode, IToken } from "@chevrotain/types";
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
    IAutoLayout,
    AutoLayout,
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

interface WorkspaceContext {
    workspaceLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    modelNode?: Array<CstNode>;
    viewsNode?: Array<CstNode>;
}

interface ModelContext {
    modelLiteral?: Array<IToken>;
    groupNodes?: Array<CstNode>;
    peopleNodes?: Array<CstNode>;
    softwareSystemNodes?: Array<CstNode>;
    deploymentEnvironmentNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
}

interface PersonContext {
    elementIdentifier?: Array<IToken>;
    personLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    elementProperties?: Array<CstNode>;
}

interface GroupContext {
    elementIdentifier?: Array<IToken>;
    groupLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    personNodes?: Array<CstNode>;
    softwareSystemNodes?: Array<CstNode>;
    containerNodes?: Array<CstNode>;
    componentNodes?: Array<CstNode>;
}

interface SoftwareSystemContext {
    elementIdentifier?: Array<IToken>;
    softwareSystemLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    groupNodes?: Array<CstNode>;
    containerNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

interface ContainerContext {
    elementIdentifier?: Array<IToken>;
    containerLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    groupNodes?: Array<CstNode>;
    componentNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

interface ComponentContext {
    elementIdentifier?: Array<IToken>;
    componentLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

interface DeploymentEnvironmentContext {
    elementIdentifier?: Array<IToken>;
    deploymentEnvironmentLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    groupNodes?: Array<CstNode>;
    deploymentNodeNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
}

interface DeploymentNodeContext {
    elementIdentifier?: Array<IToken>;
    deploymentNodeLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    instancesParameter?: Array<IToken>;
    deploymentNodeNodes?: Array<CstNode>;
    infrastructureNodeNodes?: Array<CstNode>;
    softwareSystemInstanceNodes?: Array<CstNode>;
    containerInstanceNodes?: Array<CstNode>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

interface InfrastructureNodeContext {
    elementIdentifier?: Array<IToken>;
    infrastructureNodeLiteral?: Array<IToken>;
    nameParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

interface SoftwareSystemInstanceContext {
    elementIdentifier?: Array<IToken>;
    softwareSystemIdentifier?: Array<IToken>;
    softwareSystemInstanceLiteral?: Array<IToken>;
    deploymentGroupsParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

interface ContainerInstanceContext {
    elementIdentifier?: Array<IToken>;
    containerIdentifier?: Array<IToken>;
    containerInstanceLiteral?: Array<IToken>;
    deploymentGroupsParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
    relationshipNodes?: Array<CstNode>;
    elementProperties?: Array<CstNode>;
}

interface RelationshipContext {
    sourceIdentifier?: Array<IToken>;
    targetIdentifier?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    technologyParameter?: Array<IToken>;
    tagsParameter?: Array<IToken>;
}

interface ViewsContext {
    viewsLiteral?: Array<IToken>;
    systemLandscapeViewNodes?: Array<CstNode>;
    systemContextViewNodes?: Array<CstNode>;
    containerViewNodes?: Array<CstNode>;
    componentViewNodes?: Array<CstNode>;
    deploymentViewNodes?: Array<CstNode>;
    stylesNodes?: Array<CstNode>;
    themesNodes?: Array<CstNode>;
}

interface SystemLandscapeViewContext {
    systemLandscapeLiteral?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

interface SystemContextViewContext {
    systemContextLiteral?: Array<IToken>;
    softwareSystemIdentifier?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

interface ContainerViewContext {
    containerLiteral?: Array<IToken>;
    softwareSystemIdentifier?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

interface ComponentViewContext {
    componentLiteral?: Array<IToken>;
    containerIdentifier?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

interface DeploymentViewContext {
    deploymentLiteral?: Array<IToken>;
    softwareSystemIdentifier?: Array<IToken>;
    environmentParameter?: Array<IToken>;
    keyParameter?: Array<IToken>;
    descriptionParameter?: Array<IToken>;
    viewProperties?: Array<CstNode>;
}

interface ViewPropertiesContext {
    includeProperty?: Array<CstNode>;
    excludeProperty?: Array<CstNode>;
    autoLayoutProperty?: Array<CstNode>;
}

interface AutoLayoutPropertyContext {
    
}

export class StructurizrVisitor extends WorkspaceVisitorCtor {
    constructor() {
        super();
        this.validateVisitor();
    }

    workspace(ctx: WorkspaceContext): IWorkspaceSnapshot {
        return new Workspace({
            version: 1,
            name: trimQuotes(ctx.nameParameter?.at(0)?.image) ?? "Workspace",
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            model: this.visit(ctx.modelNode),
            views: this.visit(ctx.viewsNode)
        }).toSnapshot();
    }

    model(ctx: ModelContext): IModel {
        return new Model({
            groups: ctx.groupNodes?.map(x => this.visit(x)) ?? [],
            people: ctx.peopleNodes?.map(x => this.visit(x)) ?? [],
            softwareSystems: ctx.softwareSystemNodes?.map(x => this.visit(x)) ?? [],
            deploymentEnvironments: ctx.deploymentEnvironmentNodes?.map(x => this.visit(x)) ?? [],
            relationships: ctx.relationshipNodes?.map(x => this.visit(x)) ?? []
        }).toSnapshot();
    }

    group(ctx: GroupContext): IGroup {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);

        return new Group({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? name,
            name: name,
            people: ctx.personNodes?.map((x) => this.visit(x)) ?? [],
            softwareSystems: ctx.softwareSystemNodes?.map((x) => this.visit(x)) ?? [],
            containers: ctx.containerNodes?.map((x) => this.visit(x)) ?? [],
            components: ctx.componentNodes?.map((x) => this.visit(x)) ?? []
        }).toSnapshot();
    }

    person(ctx: PersonContext): IPerson {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        return new Person({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? name,
            name: name,
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            tags: Tag.from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
        }).toSnapshot();
    }

    softwareSystem(ctx: SoftwareSystemContext): ISoftwareSystem {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const identifier = ctx.elementIdentifier?.at(0)?.image ?? name;
        const properties = this.visit(ctx.elementProperties);
        const relationships = ctx.relationshipNodes
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
                ?? trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            tags: Tag
                .from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
                .concat(properties?.tags ?? []),
            groups: ctx.groupNodes?.map((x) => this.visit(x)),
            containers: ctx.containerNodes?.map((x) => this.visit(x)),
            relationships: relationships
        }).toSnapshot();
    }

    container(ctx: ContainerContext): IContainer {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const identifier = ctx.elementIdentifier?.at(0)?.image ?? name;
        const properties = this.visit(ctx.elementProperties);
        const relationships = ctx.relationshipNodes
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
                ?? trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            technology: Technology
                .from(trimQuotes(ctx.technologyParameter?.at(0)?.image))
                .concat(properties?.technology ?? []),
            tags: Tag
                .from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
                .concat(properties?.tags ?? []),
            groups: ctx.groupNodes?.map((x) => this.visit(x)),
            components: ctx.componentNodes?.map((x) => this.visit(x)),
            relationships: relationships
        }).toSnapshot();
    }

    component(ctx: ComponentContext): IComponent {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const identifier = ctx.elementIdentifier?.at(0)?.image ?? name;
        const properties = this.visit(ctx.elementProperties);

        return new Component({
            identifier: identifier,
            name: properties?.name ?? name,
            description: properties?.description
                ?? trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            technology: Technology
                .from(trimQuotes(ctx.technologyParameter?.at(0)?.image))
                .concat(properties?.technology ?? []),
            tags: Tag
                .from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
                .concat(properties?.tags ?? [])
        }).toSnapshot();
    }

    deploymentEnvironment(ctx: DeploymentEnvironmentContext): IDeploymentEnvironment {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        
        return new DeploymentEnvironment({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? name,
            name: name,
            deploymentGroups: ctx.groupNodes?.map((x) => this.visit(x)),
            // groups: ctx.group?.map((x) => this.visit(x)),
            deploymentNodes: ctx.deploymentNodeNodes?.map((x) => this.visit(x)),
            relationships: ctx.relationshipNodes?.map((x) => this.visit(x))
        }).toSnapshot();
    }

    deploymentNode(ctx: DeploymentNodeContext): IDeploymentNode {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const properties = this.visit(ctx.elementProperties);

        return new DeploymentNode({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? name,
            name: name,
            description: properties?.description
                ?? trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            technology: Technology
                .from(trimQuotes(ctx.technologyParameter?.at(0)?.image))
                .concat(properties?.technology ?? []),
            tags: Tag
                .from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
                .concat(properties?.tags ?? []),
            instances: ctx.instancesParameter?.at(0)?.image
                ? Number.parseInt(ctx.instancesParameter?.at(0)?.image)
                : undefined,
            deploymentNodes: ctx.deploymentNodeNodes?.map((x) => this.visit(x)),
            infrastructureNodes: ctx.infrastructureNodeNodes?.map((x) => this.visit(x)),
            softwareSystemInstances: ctx.softwareSystemInstanceNodes?.map((x) => this.visit(x)),
            containerInstances: ctx.containerInstanceNodes?.map((x) => this.visit(x)),
            relationships: ctx.relationshipNodes?.map((x) => this.visit(x))
        }).toSnapshot();
    }

    infrastructureNode(ctx: InfrastructureNodeContext): IInfrastructureNode {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const properties = this.visit(ctx.elementProperties);

        return new InfrastructureNode({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? name,
            name: name,
            description: properties?.description
                ?? trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            technology: Technology
                .from(trimQuotes(ctx.technologyParameter?.at(0)?.image))
                .concat(properties?.technology ?? []),
            tags: Tag
                .from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
                .concat(properties?.tags ?? []),
            relationships: ctx.relationshipNodes?.map((x) => this.visit(x))
        }).toSnapshot();
    }

    softwareSystemInstance(ctx: SoftwareSystemInstanceContext): ISoftwareSystemInstance {
        const identifier = ctx.elementIdentifier?.at(0)?.image;
        const softwareSystemIdentifier = ctx.softwareSystemIdentifier?.at(1)?.image ?? identifier;

        return new SoftwareSystemInstance({
            identifier: identifier ?? `${softwareSystemIdentifier}_instance`,
            softwareSystemIdentifier: softwareSystemIdentifier,
            // deploymentGroups: ctx.StringLiteral?.at(0)?.image,
            tags: Tag.from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
        }).toSnapshot();
    }

    containerInstance(ctx: ContainerInstanceContext): IContainerInstance {
        const identifier = ctx.elementIdentifier?.at(0)?.image;
        const containerIdentifier = ctx.containerIdentifier?.at(1)?.image ?? identifier;

        return new ContainerInstance({
            identifier: identifier ?? `${containerIdentifier}_instance`,
            containerIdentifier: containerIdentifier,
            // deploymentGroups: ctx.StringLiteral?.at(0)?.image,
            tags: Tag.from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
        }).toSnapshot();
    }

    relationship(ctx: RelationshipContext): IRelationship {
        return new Relationship({
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            technology: Technology.from(trimQuotes(ctx.technologyParameter?.at(0)?.image)),
            tags: Tag.from(trimQuotes(ctx.tagsParameter?.at(0)?.image)),
            sourceIdentifier: ctx.sourceIdentifier?.at(0)?.image,
            targetIdentifier: ctx.targetIdentifier?.at(0)?.image
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

    views(ctx: ViewsContext): IViews {
        return new Views({
            systemLandscape: this.visit(ctx.systemLandscapeViewNodes?.at(0)),
            systemContexts: ctx.systemContextViewNodes?.map((x) => this.visit(x)) ?? [],
            containers: ctx.containerViewNodes?.map((x) => this.visit(x)) ?? [],
            components: ctx.componentViewNodes?.map((x) => this.visit(x)) ?? [],
            deployments: ctx.deploymentViewNodes?.map((x) => this.visit(x)) ?? [],
            configuration: new Configuration({
                styles: this.visit(ctx.stylesNodes?.at(0)),
                themes: this.visit(ctx.themesNodes) ?? []
            })
        }).toSnapshot();
    }

    systemLandscapeView(ctx: SystemLandscapeViewContext): ISystemLandscapeView {
        const viewProperties = this.visit(ctx.viewProperties?.at(0));

        return new SystemLandscapeViewDefinition({
            key: trimQuotes(ctx.keyParameter?.at(0)?.image),
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            autoLayout: viewProperties.autoLayout,
            include: viewProperties.include ?? [],
            exclude: viewProperties.exclude ?? [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    systemContextView(ctx: SystemContextViewContext): ISystemContextView {
        const viewProperties = this.visit(ctx.viewProperties?.at(0));

        return new SystemContextViewDefinition({
            softwareSystemIdentifier: ctx.softwareSystemIdentifier?.at(0)?.image,
            key: trimQuotes(ctx.keyParameter?.at(0)?.image),
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            autoLayout: viewProperties.autoLayout,
            include: viewProperties.include ?? [],
            exclude: viewProperties.exclude ?? [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    containerView(ctx: ContainerViewContext): IContainerView {
        const viewProperties = this.visit(ctx.viewProperties?.at(0));
        
        return new ContainerViewDefinition({
            softwareSystemIdentifier: ctx.softwareSystemIdentifier?.at(0)?.image,
            key: trimQuotes(ctx.keyParameter?.at(0)?.image),
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            autoLayout: viewProperties.autoLayout,
            include: viewProperties.include ?? [],
            exclude: viewProperties.exclude ?? [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    componentView(ctx: ComponentViewContext): IComponentView {
        const viewProperties = this.visit(ctx.viewProperties?.at(0));
        
        return new ComponentViewDefinition({
            containerIdentifier: ctx.containerIdentifier?.at(0)?.image,
            key: trimQuotes(ctx.keyParameter?.at(0)?.image),
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            autoLayout: viewProperties.autoLayout,
            include: viewProperties.include ?? [],
            exclude: viewProperties.exclude ?? [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    deploymentView(ctx: DeploymentViewContext): IDeploymentView {
        const viewProperties = this.visit(ctx.viewProperties?.at(0));
        
        return new DeploymentViewDefinition({
            softwareSystemIdentifier: ctx.softwareSystemIdentifier?.at(0)?.image,
            environment: trimQuotes(ctx.environmentParameter?.at(0)?.image),
            key: trimQuotes(ctx.keyParameter?.at(0)?.image),
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            autoLayout: viewProperties.autoLayout,
            include: viewProperties.include ?? [],
            exclude: viewProperties.exclude ?? [],
            elements: [],
            relationships: []
        }).toSnapshot();
    }

    viewProperties(ctx: ViewPropertiesContext): any {
        return {
            autoLayout: ctx.autoLayoutProperty ? this.visit(ctx.autoLayoutProperty?.at(0)) : undefined,
            include: ctx.includeProperty?.map((x) => this.visit(x)) ?? [],
            exclude: ctx.excludeProperty?.map((x) => this.visit(x)) ?? []
        }
    }

    autoLayoutProperty(ctx: AutoLayoutPropertyContext): IAutoLayout {
        return new AutoLayout().toSnapshot();
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
