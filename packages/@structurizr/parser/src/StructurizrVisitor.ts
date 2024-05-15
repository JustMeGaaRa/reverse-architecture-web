import {
    AutoLayout,
    Component,
    ComponentViewDefinition,
    Configuration,
    Container,
    ContainerInstance,
    ContainerViewDefinition,
    DeploymentEnvironment,
    DeploymentNode,
    DeploymentViewDefinition,
    Group,
    IAutoLayout,
    IComponent,
    IComponentView,
    IContainer,
    IContainerInstance,
    IContainerView,
    IDeploymentEnvironment,
    IDeploymentNode,
    IDeploymentView,
    IElementStyleProperties,
    IGroup,
    IInfrastructureNode,
    IModel,
    InfrastructureNode,
    IPerson,
    IRelationship,
    IRelationshipStyleProperties,
    ISoftwareSystem,
    ISoftwareSystemInstance,
    IStyles,
    ISystemContextView,
    ISystemLandscapeView,
    IViews,
    IWorkspaceSnapshot,
    Model,
    Person,
    Relationship,
    RelationshipType,
    SoftwareSystem,
    SoftwareSystemInstance,
    Style,
    SystemContextViewDefinition,
    SystemLandscapeViewDefinition,
    Tag,
    Technology,
    Views,
    Workspace
} from "@structurizr/dsl";
import { StructurizrParser } from "./StructurizrParser";
import {
    AnimationPropertyCstChildren,
    AutoLayoutPropertyCstChildren,
    BackgroundCstChildren,
    BorderCstChildren,
    ColorCstChildren,
    ComponentCstChildren,
    ComponentViewCstChildren,
    ContainerCstChildren,
    ContainerGroupCstChildren,
    ContainerInstanceCstChildren,
    ContainerViewCstChildren,
    DashedCstChildren,
    DefaultPropertyCstChildren,
    DeploymentEnvironmentCstChildren,
    DeploymentNodeCstChildren,
    DeploymentViewCstChildren,
    DescriptionPropertyCstChildren,
    ElementPropertiesCstChildren,
    ElementStyleCstChildren,
    ExcludePropertyCstChildren,
    FonSizeCstChildren,
    HeightCstChildren,
    IconCstChildren,
    ICstNodeVisitor,
    IncludePropertyCstChildren,
    InfrastructureNodeCstChildren,
    MetadataCstChildren,
    ModelCstChildren,
    ModelGroupCstChildren,
    NamePropertyCstChildren,
    OpacityCstChildren,
    PersonCstChildren,
    PerspectivesPropertyCstChildren,
    PositionCstChildren,
    PropertiesPropertyCstChildren,
    RelationshipCstChildren,
    RelationshipStyleCstChildren,
    RoutingCstChildren,
    ShapeCstChildren,
    SoftwareSystemCstChildren,
    SoftwareSystemGroupCstChildren,
    SoftwareSystemInstanceCstChildren,
    StrokeCstChildren,
    StrokeWidthCstChildren,
    StyleCstChildren,
    StylesCstChildren,
    SystemContextViewCstChildren,
    SystemLandscapeViewCstChildren,
    TagsPropertyCstChildren,
    TechnologyPropertyCstChildren,
    ThemesPropertyCstChildren,
    ThicknessCstChildren,
    TitlePropertyCstChildren,
    UrlPropertyCstChildren,
    ViewPropertiesCstChildren,
    ViewsCstChildren,
    WidthCstChildren,
    WorkspaceCstChildren
} from "./WorkspaceCstNode";

const WorkspaceVisitorCtor = StructurizrParser.instance.getBaseCstVisitorConstructorWithDefaults();

function trimQuotes(text: string): string {
    return text?.replace(/^"(.*)"$/, '$1');
}

function formatIdentifier(identifier: string): string {
    return identifier.replace(/[^a-zA-Z0-9_$]/g, '');
}

export class StructurizrVisitor extends WorkspaceVisitorCtor implements ICstNodeVisitor {
    constructor() {
        super();
        this.validateVisitor();
    }

    workspace(ctx: WorkspaceCstChildren): IWorkspaceSnapshot {
        return new Workspace({
            version: 1,
            name: trimQuotes(ctx.nameParameter?.at(0)?.image) ?? "Workspace",
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            model: this.visit(ctx.modelNode),
            views: this.visit(ctx.viewsNode)
        }).toSnapshot();
    }

    model(ctx: ModelCstChildren): IModel {
        return new Model({
            groups: ctx.groupNodes?.map(x => this.visit(x)) ?? [],
            people: ctx.peopleNodes?.map(x => this.visit(x)) ?? [],
            softwareSystems: ctx.softwareSystemNodes?.map(x => this.visit(x)) ?? [],
            deploymentEnvironments: ctx.deploymentEnvironmentNodes?.map(x => this.visit(x)) ?? [],
            relationships: ctx.relationshipNodes?.map(x => this.visit(x)) ?? []
        }).toSnapshot();
    }

    modelGroup(ctx: ModelGroupCstChildren): IGroup {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);

        return new Group({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? formatIdentifier(name),
            name: name,
            people: ctx.personNodes?.map((x) => this.visit(x)) ?? [],
            softwareSystems: ctx.softwareSystemNodes?.map((x) => this.visit(x)) ?? [],
        }).toSnapshot();
    }

    person(ctx: PersonCstChildren): IPerson {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        return new Person({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? formatIdentifier(name),
            name: name,
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            tags: Tag.from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
        }).toSnapshot();
    }

    softwareSystem(ctx: SoftwareSystemCstChildren): ISoftwareSystem {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const identifier = ctx.elementIdentifier?.at(0)?.image ?? formatIdentifier(name);
        const properties = this.visit(ctx.elementProperties);
        const relationships = ctx.relationshipNodes
            ?.map<Relationship>((x) => this.visit(x))
            ?.map<IRelationship>((x) => {
                return {
                    ...x,
                    type: RelationshipType.Relationship,
                    sourceIdentifier: x.sourceIdentifier.toUpperCase() === "THIS" ? identifier : x.sourceIdentifier,
                    targetIdentifier: x.targetIdentifier.toUpperCase() === "THIS" ? identifier : x.targetIdentifier,
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

    softwareSystemGroup(ctx: SoftwareSystemGroupCstChildren): IGroup {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);

        return new Group({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? name,
            name: name,
            containers: ctx.containerNodes?.map((x) => this.visit(x)) ?? [],
        }).toSnapshot();
    }

    container(ctx: ContainerCstChildren): IContainer {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const identifier = ctx.elementIdentifier?.at(0)?.image ?? formatIdentifier(name);
        const properties = this.visit(ctx.elementProperties);
        const relationships = ctx.relationshipNodes
            ?.map<Relationship>((x) => this.visit(x))
            ?.map<IRelationship>((x) => {
                return {
                    ...x,
                    type: RelationshipType.Relationship,
                    sourceIdentifier: x.sourceIdentifier.toUpperCase() === "THIS" ? identifier : x.sourceIdentifier,
                    targetIdentifier: x.targetIdentifier.toUpperCase() === "THIS" ? identifier : x.targetIdentifier,
                    tags: x.tags ?? [],
                    technology: x.technology ?? []
                };
            });
        
        return new Container({
            identifier: identifier,
            name: properties?.name ?? formatIdentifier(name),
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

    containerGroup(ctx: ContainerGroupCstChildren): IGroup {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);

        return new Group({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? name,
            name: name,
            components: ctx.componentNodes?.map((x) => this.visit(x)) ?? []
        }).toSnapshot();
    }

    component(ctx: ComponentCstChildren): IComponent {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const identifier = ctx.elementIdentifier?.at(0)?.image ?? formatIdentifier(name);
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

    deploymentEnvironment(ctx: DeploymentEnvironmentCstChildren): IDeploymentEnvironment {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        
        return new DeploymentEnvironment({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? formatIdentifier(name),
            name: name,
            // deploymentGroups: ctx.groupNodes?.map((x) => this.visit(x)),
            // groups: ctx.group?.map((x) => this.visit(x)),
            deploymentNodes: ctx.deploymentNodeNodes?.map((x) => this.visit(x)),
            relationships: ctx.relationshipNodes?.map((x) => this.visit(x))
        }).toSnapshot();
    }

    deploymentNode(ctx: DeploymentNodeCstChildren): IDeploymentNode {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const properties = this.visit(ctx.elementProperties);

        return new DeploymentNode({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? formatIdentifier(name),
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

    infrastructureNode(ctx: InfrastructureNodeCstChildren): IInfrastructureNode {
        const name = trimQuotes(ctx.nameParameter?.at(0)?.image);
        const properties = this.visit(ctx.elementProperties);

        return new InfrastructureNode({
            identifier: ctx.elementIdentifier?.at(0)?.image ?? formatIdentifier(name),
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

    softwareSystemInstance(ctx: SoftwareSystemInstanceCstChildren): ISoftwareSystemInstance {
        const identifier = ctx.elementIdentifier?.at(0)?.image;
        const softwareSystemIdentifier = ctx.softwareSystemIdentifier?.at(1)?.image ?? identifier;

        return new SoftwareSystemInstance({
            identifier: identifier ?? `${softwareSystemIdentifier}_instance`,
            softwareSystemIdentifier: softwareSystemIdentifier,
            // deploymentGroups: ctx.StringLiteral?.at(0)?.image,
            tags: Tag.from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
        }).toSnapshot();
    }

    containerInstance(ctx: ContainerInstanceCstChildren): IContainerInstance {
        const identifier = ctx.elementIdentifier?.at(0)?.image;
        const containerIdentifier = ctx.containerIdentifier?.at(1)?.image ?? identifier;

        return new ContainerInstance({
            identifier: identifier ?? `${containerIdentifier}_instance`,
            containerIdentifier: containerIdentifier,
            // deploymentGroups: ctx.StringLiteral?.at(0)?.image,
            tags: Tag.from(trimQuotes(ctx.tagsParameter?.at(0)?.image))
        }).toSnapshot();
    }

    relationship(ctx: RelationshipCstChildren): IRelationship {
        return new Relationship({
            description: trimQuotes(ctx.descriptionParameter?.at(0)?.image),
            technology: Technology.from(trimQuotes(ctx.technologyParameter?.at(0)?.image)),
            tags: Tag.from(trimQuotes(ctx.tagsParameter?.at(0)?.image)),
            sourceIdentifier: ctx.sourceIdentifier?.at(0)?.image,
            targetIdentifier: ctx.targetIdentifier?.at(0)?.image
        }).toSnapshot();
    }

    views(ctx: ViewsCstChildren): IViews {
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

    systemLandscapeView(ctx: SystemLandscapeViewCstChildren): ISystemLandscapeView {
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

    systemContextView(ctx: SystemContextViewCstChildren): ISystemContextView {
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

    containerView(ctx: ContainerViewCstChildren): IContainerView {
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

    componentView(ctx: ComponentViewCstChildren): IComponentView {
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

    deploymentView(ctx: DeploymentViewCstChildren): IDeploymentView {
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

    elementProperties(ctx: ElementPropertiesCstChildren) : any {
        return {
            name: this.visit(ctx.nameProperty),
            technology: this.visit(ctx.technologyProperty),
            description: this.visit(ctx.descriptionProperty),
            tags: this.visit(ctx.tagsProperty)
        }
    }

    viewProperties(ctx: ViewPropertiesCstChildren): any {
        return {
            autoLayout: ctx.autoLayoutProperty ? this.visit(ctx.autoLayoutProperty?.at(0)) : undefined,
            include: ctx.includeProperty?.map((x) => this.visit(x)) ?? [],
            exclude: ctx.excludeProperty?.map((x) => this.visit(x)) ?? []
        }
    }

    nameProperty(ctx: NamePropertyCstChildren) : string {
        return trimQuotes(ctx.StringLiteral?.at(0)?.image)
    }

    technologyProperty(ctx: TechnologyPropertyCstChildren) : Technology[] {
        return Technology.from(trimQuotes(ctx.StringLiteral?.at(0)?.image))
    }

    descriptionProperty(ctx: DescriptionPropertyCstChildren) : string {
        return trimQuotes(ctx.StringLiteral?.at(0)?.image)
    }
    
    tagsProperty(ctx: TagsPropertyCstChildren): Tag[] {
        return ctx.StringLiteral?.map((x) => new Tag(trimQuotes(x.image))) ?? [];
    }

    autoLayoutProperty(ctx: AutoLayoutPropertyCstChildren): IAutoLayout {
        return new AutoLayout().toSnapshot();
    }

    styles(ctx: StylesCstChildren): IStyles {
        return {
            elements: ctx.elementStyle
                ?.reduce((style, value) => ([ ...style, this.visit(value) ]), [])
                ?? [],
            relationships: ctx.relationshipStyle
                ?.reduce((style, value) => ([ ...style, this.visit(value) ]), [])
                ?? []
        }
    }
  
    elementStyle(ctx: ElementStyleCstChildren): Style<IElementStyleProperties> {
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
        }
    }
  
    relationshipStyle(ctx: RelationshipStyleCstChildren): Style<IRelationshipStyleProperties> {
        return {
            tag: trimQuotes(ctx.StringLiteral?.at(0)?.image),
            thickness: this.visit(ctx.thickness),
            color: this.visit(ctx.color),
            style: this.visit(ctx.style),
            routing: this.visit(ctx.routing),
            fontSize: this.visit(ctx.fontSize),
            width: this.visit(ctx.width),
            position: this.visit(ctx.position),
            opacity: this.visit(ctx.opacity)
        }
    }
  
    background(ctx: BackgroundCstChildren) {
        return ctx.HexColorLiteral?.at(0)?.image;
    }
  
    color(ctx: ColorCstChildren) {
        return ctx.HexColorLiteral?.at(0)?.image;
    }
  
    stroke(ctx: StrokeCstChildren) {
        return ctx.HexColorLiteral?.at(0)?.image;
    }
  
    strokeWidth(ctx: StrokeWidthCstChildren) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    height(ctx: HeightCstChildren) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    width(ctx: WidthCstChildren) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    border(ctx: BorderCstChildren) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    shape(ctx: ShapeCstChildren) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    icon(ctx: IconCstChildren) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    fontSize(ctx: FonSizeCstChildren) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    opacity(ctx: OpacityCstChildren) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    metadata(ctx: MetadataCstChildren) {
        return Boolean(ctx.BooleanLiteral?.at(0)?.image);
    }
  
    thickness(ctx: ThicknessCstChildren) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }
  
    style(ctx: StyleCstChildren) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    routing(ctx: RoutingCstChildren) {
        return ctx.Identifier?.at(0)?.image;
    }
  
    position(ctx: PositionCstChildren) {
        return Number(ctx.NumericLiteral?.at(0)?.image);
    }

    urlProperty(children: UrlPropertyCstChildren, param?: any) {
        throw new Error("Method not implemented.");
    }

    propertiesProperty(children: PropertiesPropertyCstChildren, param?: any) {
        throw new Error("Method not implemented.");
    }

    perspectivesProperty(children: PerspectivesPropertyCstChildren, param?: any) {
        throw new Error("Method not implemented.");
    }

    includeProperty(children: IncludePropertyCstChildren, param?: any) {
        return children.Wildcard?.at(0)?.image ?? children.Identifier?.map(x => x.image) ?? [];
    }

    excludeProperty(children: ExcludePropertyCstChildren, param?: any) {
        return children.Wildcard?.at(0)?.image ?? children.Identifier?.map(x => x.image) ?? [];
    }

    defaultProperty(children: DefaultPropertyCstChildren, param?: any) {
        throw new Error("Method not implemented.");
    }

    animationProperty(children: AnimationPropertyCstChildren, param?: any) {
        throw new Error("Method not implemented.");
    }

    titleProperty(children: TitlePropertyCstChildren, param?: any) {
        throw new Error("Method not implemented.");
    }

    themesProperty(children: ThemesPropertyCstChildren, param?: any) {
        throw new Error("Method not implemented.");
    }

    dashed(children: DashedCstChildren, param?: any) {
        throw new Error("Method not implemented.");
    }
}
