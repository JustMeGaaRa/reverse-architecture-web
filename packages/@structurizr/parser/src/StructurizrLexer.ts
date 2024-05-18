import { createToken, Lexer } from "chevrotain";

// global tokens
export const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]+[a-zA-Z0-9_]+/ });
export const Equals = createToken({ name: "Equals", pattern: /=/ });
export const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /[ \s\t\n\r]+/, group: Lexer.SKIPPED });
export const LCurly = createToken({ name: "LCurly", pattern: /{/ });
export const RCurly = createToken({ name: "RCurly", pattern: /}/ });

export const StringLiteral = createToken({ name: "StringLiteral", pattern: /"[^"]*"/,  });
export const Number = createToken({ name: "NumericLiteral", pattern: /[0-9]+/ });
export const HexColor = createToken({ name: "HexColorLiteral", pattern: /#[0-9a-fA-F]{8}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{4}|#[0-9a-fA-F]{3}/ });
export const Boolean = createToken({ name: "BooleanLiteral", pattern: /\true|false/i });
export const UrlLiteral = createToken({ name: "UrlLiteral", pattern: /http(s)?:\/\/[^\s]+/i });
export const Wildcard = createToken({ name: "Wildcard", pattern: /(\*)/ });
export const ShapeEnum = createToken({name: "ShapeEnum", pattern: /Box|RoundedBox|Circle|Ellipse|Hexagon|Cylinder|Pipe|Person|Robot|Folder|WebBrowser|MobileDevicePortrait|MobileDeviceLandscape|Component/i, longer_alt:Identifier});

// comments
export const BlockComment = createToken({name: "blockComment", pattern: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//, group: "comments" });
export const LineComment = createToken({name: "lineComment", pattern: /\/\/(.*?)\r?\n/, group: "comments" });
export const HashComment = createToken({name: "hashComment", pattern: /\#(.*?)\r?\n/, group: "comments" });

// reserved keywords
export const BangInclude = createToken({name: "bangInclude", pattern: /!include/i });
export const BangConstant = createToken({name: "bangConstant", pattern: /!constant/i });
export const BangDocs = createToken({name: "bangDocs", pattern: /!docs/i });
export const BangAdrs = createToken({name: "bangAdrs", pattern: /!adrs/i });
export const BangIndentifiers = createToken({name: "bangIdentifiers", pattern: /!identifiers/i });
export const BangImpliedRelationships = createToken({name: "bangImpliedRelationships", pattern: /!impliedrelationships/i });

export const Workspace = createToken({ name: "Workspace", pattern: /workspace/, longer_alt: Identifier });
export const Model = createToken({ name: "Model", pattern: /model/, longer_alt: Identifier  });
export const Group = createToken({ name: "Group", pattern: /group/, longer_alt: Identifier  });
export const Person = createToken({ name: "Person", pattern: /person/, longer_alt: Identifier  });
export const SoftwareSystem = createToken({ name: "SoftwareSystem", pattern: /softwareSystem/i, longer_alt: Identifier  });
export const Container = createToken({ name: "Container", pattern: /container/, longer_alt: Identifier  });
export const Component = createToken({ name: "Component", pattern: /component/, longer_alt: Identifier  });
export const DeploymentEnvironment = createToken({ name: "DeploymentEnvironment", pattern: /deploymentEnvironment/i, longer_alt: Identifier  });
export const DeploymentGroup = createToken({name: "deploymentGroup", pattern: /deploymentgroup/i, longer_alt: Identifier });
export const DeploymentNode = createToken({ name: "DeploymentNode", pattern: /deploymentNode/i, longer_alt: Identifier  });
export const InfrastructureNode = createToken({ name: "InfrastructureNode", pattern: /infrastructureNode/i, longer_alt: Identifier  });
export const SoftwareSystemInstance = createToken({ name: "SoftwareSystemInstance", pattern: /softwareSystemInstance/i });
export const ContainerInstance = createToken({ name: "ContainerInstance", pattern: /containerInstance/i });
export const Element = createToken({ name: "Element", pattern: /element/i, longer_alt: Identifier });

export const RelationshipArrow = createToken({ name: "RelationshipArrow", pattern: /->/ });

export const Views = createToken({ name: "Views", pattern: /views/ });
export const SystemLandscape = createToken({ name: "SystemLandscape", pattern: /systemLandscape/i });
export const SystemContext = createToken({ name: "SystemContext", pattern: /systemContext/i });
export const Deployment = createToken({ name: "Deployment", pattern: /deployment/i, longer_alt: Identifier });
export const Filtered = createToken({name: "filtered", pattern: /filtered/i, longer_alt: Identifier });
export const Dynamic = createToken({name: "dynamic", pattern: /dynamic/i, longer_alt: Identifier  });
export const Custom = createToken({name: "custom", pattern: /custom/i, longer_alt: Identifier });
export const Image = createToken({name: "image", pattern: /image/i, longer_alt: Identifier });

// properties
export const Name = createToken({ name: "Name", pattern: /name/ });
export const Description = createToken({ name: "Description", pattern: /description/ });
export const Technology = createToken({ name: "Technology", pattern: /technology/ });
export const Properties = createToken({ name: "Properties", pattern: /properties/ });
export const Perspectives = createToken({ name: "Perspectives", pattern: /perspectives/ });
export const Configuration = createToken({ name: "Configuration", pattern: /configuration/, longer_alt: Identifier });
export const Tags = createToken({ name: "Tags", pattern: /tags/ });
export const Url = createToken({ name: "Url", pattern: /url/ });
export const Title = createToken({ name: "Title", pattern: /title/i, longer_alt: Identifier  });
export const Animation = createToken({ name: "Animation", pattern: /animation/i, longer_alt: Identifier  });
export const Include = createToken({ name: "Include", pattern: /include/i, longer_alt: Identifier  });
export const Exclude = createToken({ name: "Exclude", pattern: /exclude/i, longer_alt: Identifier  });
export const AutoLayout = createToken({ name: "AutoLayout", pattern: /autoLayout/i });
export const Default = createToken({ name: "Default", pattern: /default/ });
export const Themes = createToken({ name: "Themes", pattern: /themes/i, longer_alt: Identifier });
export const Theme = createToken({ name: "Themes", pattern: /theme/i, longer_alt: Themes });
export const Branding = createToken({name: "branding", pattern: /branding/i, longer_alt: Identifier });
export const Terminology = createToken({name: "terminology", pattern: /terminology/i, longer_alt: Identifier });
export const Users = createToken({name: "users", pattern: /users/i, longer_alt: Identifier  });

// view style properties
export const Styles = createToken({ name: "Styles", pattern: /styles/i, longer_alt: Identifier });
export const Relationship = createToken({ name: "Relationship", pattern: /relationship/i, longer_alt: Identifier });
export const Shape = createToken({ name: "Shape", pattern: /shape/ });
export const Icon = createToken({ name: "Icon", pattern: /icon/ });
export const Width = createToken({ name: "Width", pattern: /width/ });
export const Height = createToken({ name: "Height", pattern: /height/ });
export const Background = createToken({ name: "Background", pattern: /background/ });
export const Color = createToken({ name: "Color", pattern: /colo[u]?r/ });
export const StrokeWidth = createToken({  name: "StrokeWidth", pattern: /strokeWidth/i });
export const Stroke = createToken({ name: "Stroke", pattern: /stroke/ });
export const Dashed = createToken({ name: "Dashed", pattern: /dashed/ });
export const FontSize = createToken({ name: "FontSize", pattern: /fontSize/i });
export const Border = createToken({ name: "Border", pattern: /border/ });
export const Opacity = createToken({ name: "Opacity", pattern: /opacity/ });
export const Metadata = createToken({ name: "Metadata", pattern: /metadata/ });
export const Thickness = createToken({ name: "Thickness", pattern: /thickness/ });
export const Style = createToken({ name: "Style", pattern: /style/ });
export const Routing = createToken({ name: "Routing", pattern: /routing/ });
export const Position = createToken({ name: "Position", pattern: /position/ });

export const TokenTypes = [
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
    DeploymentGroup,
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
    Filtered,
    Dynamic,
    Custom,
    Image,

    StringLiteral,

    BangInclude,
    BangConstant,
    BangAdrs,
    BangImpliedRelationships,
    BangDocs,
    BangIndentifiers,

    // view properties
    Include,
    Exclude,
    AutoLayout,
    Default,
    Animation,
    Title,
    Themes,
    Theme,
    Branding,
    Terminology,
    Users,

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
    Dashed,
    FontSize,
    Border,
    Opacity,
    Metadata,
    Thickness,
    Style,
    Routing,
    Position,

    // view style property values
    HexColor,
    Boolean,
    UrlLiteral,

    // global
    Identifier,
    Equals,
    Number,
    BlockComment,
    LineComment,
    HashComment,
    Wildcard,
    ShapeEnum,
    LCurly,
    RCurly
];

export const StructurizrLexer = new Lexer(TokenTypes);