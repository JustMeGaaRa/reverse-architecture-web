import { createToken, Lexer } from "chevrotain";
import { TokenMap } from "./TokenMap";

// global tokens
const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]+[a-zA-Z0-9]+/ });
const Equals = createToken({ name: "Equals", pattern: /=/ });
const StringLiteral = createToken({ name: "StringLiteral", pattern: /"[^"]*"/ });
const NumericLiteral = createToken({ name: "NumericLiteral", pattern: /[0-9]+/ });
const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /[ \t\n\r]+/, group: Lexer.SKIPPED });
const MultiLineComment = createToken({ name: "MultiLineComment", pattern: /\/\*[^]*?\*\//, group: "comments" });
const SingleLineComment = createToken({ name: "SingleLineComment", pattern: /#[^\n\r]*/, group: "comments" });
const LCurly = createToken({ name: "LCurly", pattern: /{/ });
const RCurly = createToken({ name: "RCurly", pattern: /}/ });
const Workspace = createToken({ name: "Workspace", pattern: /workspace/ });

// model tokens
const Model = createToken({ name: "Model", pattern: /model/ });
const Group = createToken({ name: "Group", pattern: /group/ });
const Person = createToken({ name: "Person", pattern: /person/ });
const SoftwareSystem = createToken({ name: "SoftwareSystem", pattern: /softwareSystem/i });
const Container = createToken({ name: "Container", pattern: /container/ });
const Component = createToken({ name: "Component", pattern: /component/ });
const DeploymentEnvironment = createToken({ name: "DeploymentEnvironment", pattern: /deploymentEnvironment/i });
const DeploymentNode = createToken({ name: "DeploymentNode", pattern: /deploymentNode/i });
const InfrastructureNode = createToken({ name: "InfrastructureNode", pattern: /infrastructureNode/i });
const RelationshipArrow = createToken({ name: "RelationshipArrow", pattern: /->/ });

// element property tokens
const Name = createToken({ name: "Name", pattern: /name/ });
const Technology = createToken({ name: "Technology", pattern: /technology/ });
const Description = createToken({ name: "Description", pattern: /description/ });
const Properties = createToken({ name: "Properties", pattern: /properties/ });
const Perspectives = createToken({ name: "Perspectives", pattern: /perspectives/ });
const Configuration = createToken({ name: "Configuration", pattern: /configuration/ });
const Tags = createToken({ name: "Tags", pattern: /tags/ });
const Url = createToken({ name: "Url", pattern: /url/ });

// views tokens
const Views = createToken({ name: "Views", pattern: /views/ });
const SystemLandscape = createToken({ name: "SystemLandscape", pattern: /systemLandscape/i });
const SystemContext = createToken({ name: "SystemContext", pattern: /systemContext/i });
const Deployment = createToken({ name: "Deployment", pattern: /deployment/ });
const SoftwareSystemInstance = createToken({ name: "SoftwareSystemInstance", pattern: /softwareSystemInstance/i });
const ContainerInstance = createToken({ name: "ContainerInstance", pattern: /containerInstance/i });

// view property tokens
const Include = createToken({ name: "Include", pattern: /include/ });
const Exclude = createToken({ name: "Exclude", pattern: /exclude/ });
const AutoLayout = createToken({ name: "AutoLayout", pattern: /autoLayout/i });
const Default = createToken({ name: "Default", pattern: /default/ });
const Animation = createToken({ name: "Animation", pattern: /animation/ });
const Title = createToken({ name: "Title", pattern: /title/ });

// view style properties
const Styles = createToken({ name: "Styles", pattern: /styles/ });
const Element = createToken({ name: "Element", pattern: /element/ });
const Relationship = createToken({ name: "Relationship", pattern: /relationship/ });
const Shape = createToken({ name: "Shape", pattern: /shape/ });
const Icon = createToken({ name: "Icon", pattern: /icon/ });
const Width = createToken({ name: "Width", pattern: /width/ });
const Height = createToken({ name: "Height", pattern: /height/ });
const Background = createToken({ name: "Background", pattern: /background/ });
const Color = createToken({ name: "Color", pattern: /colo[u]?r/ });
const StrokeWidth = createToken({  name: "StrokeWidth", pattern: /strokeWidth/i });
const Stroke = createToken({ name: "Stroke", pattern: /stroke/ });
const FontSize = createToken({ name: "FontSize", pattern: /fontSize/i });
const Border = createToken({ name: "Border", pattern: /border/ });
const Opacity = createToken({ name: "Opacity", pattern: /opacity/ });
const Metadata = createToken({ name: "Metadata", pattern: /metadata/ });
const Thinkness = createToken({ name: "Thinkness", pattern: /thickness/ });
const Style = createToken({ name: "Style", pattern: /style/ });
const Routing = createToken({ name: "Routing", pattern: /routing/ });
const Position = createToken({ name: "Position", pattern: /position/ });

// view style property values
const HexColor = createToken({ name: "HexColor", pattern: /#[0-9a-fA-F]{8}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{4}|#[0-9a-fA-F]{3}/ });
const Boolean = createToken({ name: "Boolean", pattern: /\btrue\b|\bfalse\b/i });

export const allTokens = [
    WhiteSpace,
    Workspace,

    // model
    Model,
    Group,
    Person,
    SoftwareSystemInstance,
    SoftwareSystem,
    ContainerInstance,
    Container,
    Component,
    DeploymentEnvironment,
    DeploymentNode,
    InfrastructureNode,
    RelationshipArrow,

    // element properties
    Name,
    Technology,
    Description,
    Configuration,
    Properties,
    Perspectives,
    Tags,
    Url,

    // views
    Views,
    SystemLandscape,
    SystemContext,
    Deployment,

    // view properties
    Include,
    Exclude,
    AutoLayout,
    Default,
    Animation,
    Title,

    // view style properties
    Styles,
    Element,
    Relationship,
    Shape,
    Icon,
    Width,
    Height,
    Background,
    Color,
    StrokeWidth,
    Stroke,
    FontSize,
    Border,
    Opacity,
    Metadata,
    Thinkness,
    Style,
    Routing,
    Position,

    // view style property values
    HexColor,
    Boolean,

    // global
    Identifier,
    Equals,
    StringLiteral,
    NumericLiteral,
    MultiLineComment,
    SingleLineComment,
    LCurly,
    RCurly
];


export const Tokens = allTokens.reduce((acc, tokenType) => {
    acc[tokenType.name] = tokenType;
    return acc;
}, {} as TokenMap);