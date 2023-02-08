export interface Technology {
    name: string;
}

export interface Tag {
    name: string;
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

export type Abstraction = SoftwareSystem | Container | DeploymentNode | InfrastructureNode;

export interface DeploymentNode extends Omit<Element, "description"> {
    identifier: Identifier;
    instances?: number;
    elements: Abstraction[];
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
    stroke: "#D8D8D8",
    strokeWidth: 1,
    fontSize: 14,
    border: LineStyle.Solid,
    opacity: 1.0,
    metadata: false,
    description: true
}

export const defaultRelationshipStyle: RelationshipStyleProperties = {
    thikness: 1,
    color: "##898989",
    style: LineStyle.Solid,
    routing: RoutingStyle.Direct,
    fontSize: 14,
    width: 1,
    position: 1,
    opacity: 1.0
}

export interface Position {
    x: number;
    y: number;
}

export interface Layout {
    [identifier: Identifier]: Position;
}

export interface View {
    title: string;
    description?: string;
    model: Model;
    layout: Layout;
    style: Style;
}