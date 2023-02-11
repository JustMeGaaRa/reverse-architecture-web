export interface Technology {
    name: string;
}

export class Tag {
    constructor(name: string) {
        this.name = name;
    }

    name!: string;

    static Element = new Tag("Element");
    static Person = new Tag("Person");
    static SoftwareSystem = new Tag("Software System");
    static Container = new Tag("Container");
    static Component = new Tag("Component");
    static DeploymentNode = new Tag("Deployment Node");
    static InfrastructureNode = new Tag("Infrastructure Node");
    static SoftwareSystemInstance = new Tag("Software System Instance");
    static ContainerInstance = new Tag("Container Instance");
    static Relationship = new Tag("Relationship");
}

export type Identifier = string;

export interface Element {
    identifier: Identifier;
    name: string;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
}

export interface Component extends Element {
    identifier: Identifier;
}

export interface Container extends Element {
    identifier: Identifier;
    components?: Component[];
}

export interface SoftwareSystem extends Element {
    identifier: Identifier;
    containers?: Container[];
}

export interface Person extends Omit<Element, "technology"> {
    identifier: Identifier;
}

export interface InfrastructureNode extends Element {
    identifier: Identifier;
}

export interface SoftwareSystemInstance {
    softwareSystemIdentifier: Identifier;
}

export interface ContainerInstance {
    containerIdentifier: Identifier;
}

export interface DeploymentNode extends Omit<Element, "description"> {
    identifier: Identifier;
    instances?: number;
    softwareSystemInstances?: SoftwareSystemInstance[];
    containerInstances?: ContainerInstance[];
    infrastructureNodes?: InfrastructureNode[];
    deploymentNodes?: DeploymentNode[];
}

export interface DeploymentEnvironment {
    identifier: Identifier;
    name: string;
    deploymentNodes: DeploymentNode[];
}

export interface Relationship {
    sourceIdentifier: Identifier;
    targetIdentifier: Identifier;
    description?: string;
    technology?: Technology[];
    tags: Tag[];
}

export interface Model {
    people: Person[];
    softwareSystems: SoftwareSystem[];
    deploymentEnvironments: DeploymentEnvironment[];
    relationships: Relationship[];
}

export enum ElementShape {
    Box = "Box",
    RoundedBox = "Rounded Box",
    Circle = "Circle",
    Ellipse = "Ellipse",
    Hexagon = "Hexagon",
    Cylinder = "Cylinder",
    Pipe = "Pipe",
    Person = "Person",
    Robot = "Robot",
    Folder = "Folder",
    WebBrowser = "Web Browser",
    MobileDevicePortrait = "Mobile Device Portrait",
    MobileDeviceLandscape = "Mobile Device Landscape",
    Component = "Component"
}

export enum LineStyle {
    Solid = "solid",
    Dashed = "dashed",
    Dotted = "dotted"
}

export enum RoutingStyle {
    Direct = "Direct",
    orthogonal = "Orthogonal",
    Curved = "Curved"
}

export type Url = string;
export type ColorName = string;
export type RGB = string;
export type Color = RGB | ColorName;

export interface ElementStyleProperties {
    shape: ElementShape | string;
    icon: Url | string;
    width: number;
    height: number;
    background: Color;
    color: Color;
    stroke: Color;
    strokeWidth: number;
    fontSize: number;
    border: LineStyle;
    opacity: number;
    metadata: boolean;
    description: boolean;
}

export interface RelationshipStyleProperties {
    thikness: number;
    color: Color;
    style: LineStyle;
    routing: RoutingStyle;
    fontSize: number;
    width: number;
    position: number;
    opacity: number;
}

export interface ElementStyle {
    [tag: string]: Partial<ElementStyleProperties>;
}

export interface RelationshipStyle {
    [tag: string]: Partial<RelationshipStyleProperties>;
}

export interface Style {
    element: ElementStyle,
    relationship: RelationshipStyle;
}

export const defaultElementStyle: ElementStyleProperties = {
    shape: ElementShape.RoundedBox,
    icon: "",
    width: 240,
    height: 150,
    background: "#DDDDDD",
    color: "#000000",
    stroke: "#C3C3C3",
    strokeWidth: 0,
    fontSize: 14,
    border: LineStyle.Solid,
    opacity: 100,
    metadata: false,
    description: true
}

export const defaultRelationshipStyle: RelationshipStyleProperties = {
    thikness: 1,
    color: "#898989",
    style: LineStyle.Solid,
    routing: RoutingStyle.Direct,
    fontSize: 14,
    width: 1,
    position: 1,
    opacity: 100
}

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export type Dimension = Position & Partial<Size>;

export interface Layout {
    [identifier: Identifier]: Dimension;
}

export interface View {
    title: string;
    description?: string;
    model: Model;
    layout: Layout;
    style: Style;
}

export interface GenericView {
    key?: string;
    title?: string;
    description?: string;
    layout: Layout;
    style: Style;
}

export interface SystemContextView extends GenericView {
    softwareSystemIdentifier: Identifier;
    people: Person[];
    softwareSystems: SoftwareSystem[];
}

export interface ContainerView extends GenericView {
    containers: Container[];
    people: Person[];
    softwareSystems: SoftwareSystem[];
}

export interface ComponentView extends GenericView {
    softwareSystemIdentifier: Identifier;
    containerIdentifier: Identifier;
    components: Component[];
    people: Person[];
    softwareSystems: SoftwareSystem[];
    containers: Container[];
}

export interface DeploymentView extends GenericView {
    deploymentNodes: DeploymentNode[];
}
