import { CstParser, IToken } from "chevrotain";
import {
    Animation,
    AutoLayout,
    Background,
    Boolean,
    Border,
    Color,
    Component,
    Container,
    ContainerInstance,
    Dashed,
    Default,
    Deployment,
    DeploymentEnvironment,
    DeploymentNode,
    Description,
    Element,
    Equals,
    Exclude,
    FontSize,
    Group,
    Height,
    HexColor,
    Icon,
    Identifier,
    Include,
    InfrastructureNode,
    LCurly,
    Metadata,
    Model,
    Name,
    Number,
    Opacity,
    Person,
    Perspectives,
    Position,
    Properties,
    RCurly,
    Relationship,
    RelationshipArrow,
    Routing,
    Shape,
    SoftwareSystem,
    SoftwareSystemInstance,
    StringLiteral,
    Stroke,
    StrokeWidth,
    Style,
    Styles,
    SystemContext,
    SystemLandscape,
    Tags,
    Technology,
    Themes,
    Thickness,
    Title,
    TokenTypes,
    Url,
    UrlLiteral,
    Views,
    Width,
    Wildcard,
    Workspace
} from "./StructurizrLexer";

export class StructurizrParser extends CstParser {
    private static _instance: StructurizrParser;

    constructor() {
        super(TokenTypes);
        this.performSelfAnalysis();
    }

    public static get instance(): StructurizrParser {
        return this._instance || (this._instance = new StructurizrParser());
    }

    workspace = this.RULE("workspace", () => {
        this.CONSUME(Workspace, { LABEL: "workspaceLiteral" });
        // consume optional name and description
        this.OPTION(() => this.CONSUME(StringLiteral, { LABEL: "nameParameter" }));
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "descriptionParameter" }));
        this.CONSUME(LCurly);
        // optional children
        this.OPTION2(() => this.SUBRULE1(this.name));
        this.OPTION3(() => this.SUBRULE1(this.description));
        this.OPTION4(() => this.SUBRULE1(this.properties));
        // required children
        this.SUBRULE(this.model, { LABEL: "modelNode" });
        this.SUBRULE(this.views, { LABEL: "viewsNode" });
        // TODO: consume optional configuration
        this.CONSUME(RCurly);
    });

    model = this.RULE("model", () => {
        this.CONSUME(Model, { LABEL: "modelLiteral" });
        this.CONSUME(LCurly);
        this.MANY(() => {
            this.OR([
                { ALT: () => this.SUBRULE(this.group, { LABEL: "groupNodes" }) },
                { ALT: () => this.SUBRULE(this.person, { LABEL: "peopleNodes" }) },
                { ALT: () => this.SUBRULE(this.softwareSystem, { LABEL: "softwareSystemNodes" }) },
                { ALT: () => this.SUBRULE(this.deploymentEnvironment, { LABEL: "deploymentEnvironmentNodes" }) },
                { ALT: () => this.SUBRULE(this.relationship, { LABEL: "relationshipNodes" }) }
            ]);
        });
        this.CONSUME(RCurly);
    });

    group = this.RULE("group", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(Group, { LABEL: "groupLiteral" });
        // consume required name
        this.CONSUME(StringLiteral, { LABEL: "nameParameter" });
        this.CONSUME(LCurly);
        this.OR([
            {
                // TODO: check if this order works with case where person and software system are shuffled in order
                // GATE: this.BACKTRACK(this.personOrSoftwareSystem),
                // ALT: () => this.MANY(() => this.SUBRULE(this.personOrSoftwareSystem, { LABEL: "personOrSoftwareSystemNodes" }))
                ALT: () => {
                    this.MANY1(() => this.SUBRULE(this.person, { LABEL: "personNodes" }));
                    this.MANY2(() => this.SUBRULE(this.softwareSystem, { LABEL: "softwareSystemNodes" }));
                }
            },
            {
                GATE: this.BACKTRACK(this.container),
                ALT: () => this.MANY3(() => this.SUBRULE(this.container, { LABEL: "containerNodes" }))
            },
            {
                GATE: this.BACKTRACK(this.component),
                ALT: () => this.MANY4(() => this.SUBRULE(this.component, { LABEL: "componentNodes" }))
            }
        ]);
        this.CONSUME(RCurly);
    });

    person = this.RULE("person", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(Person, { LABEL: "personLiteral" });
        // consume required name
        this.CONSUME(StringLiteral, { LABEL: "nameParameter" });
        // consume optional description and tags
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "descriptionParameter" }));
        this.OPTION3(() => this.CONSUME3(StringLiteral, { LABEL: "tagsParameter" }));
        this.OPTION4(() => {
            this.CONSUME(LCurly);
            this.SUBRULE(this.elementProperties, { LABEL: "elementProperties" });
            this.CONSUME(RCurly);
        });
    });

    softwareSystem = this.RULE("softwareSystem", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(SoftwareSystem, { LABEL: "softwareSystemLiteral" });
        // consume required name
        this.CONSUME(StringLiteral, { LABEL: "nameParameter" });
        // consume optional description and tags
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "descriptionParameter" }));
        this.OPTION3(() => this.CONSUME3(StringLiteral, { LABEL: "tagsParameter" }));
        this.OPTION4(() => {
            this.CONSUME(LCurly);
            this.MANY(() => {
                this.OR([
                    { ALT: () => this.SUBRULE(this.group, { LABEL: "groupNodes" }) },
                    { ALT: () => this.SUBRULE(this.container, { LABEL: "containerNodes" }) },
                    { ALT: () => this.SUBRULE(this.relationship, { LABEL: "relationshipNodes" }) },
                    { ALT: () => this.SUBRULE(this.elementProperties, { LABEL: "elementProperties" }) }
                ]);
            });
            this.CONSUME(RCurly);
        });
    });

    container = this.RULE("container", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(Container, { LABEL: "containerLiteral" });
        // consume required name
        this.CONSUME(StringLiteral, { LABEL: "nameParameter" });
        // consume optional description, technology and tags
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "descriptionParameter" }));
        this.OPTION3(() => this.CONSUME3(StringLiteral, { LABEL: "technologyParameter" }));
        this.OPTION4(() => this.CONSUME4(StringLiteral, { LABEL: "tagsParameter" }));
        this.OPTION5(() => {
            this.CONSUME(LCurly);
            this.MANY(() => {
                this.OR([
                    { ALT: () => this.SUBRULE(this.group, { LABEL: "groupNodes" }) },
                    { ALT: () => this.SUBRULE(this.component, { LABEL: "componentNodes" }) },
                    { ALT: () => this.SUBRULE(this.relationship, { LABEL: "relationshipNodes" }) },
                    { ALT: () => this.SUBRULE(this.elementProperties, { LABEL: "elementProperties" }) }
                ]);
            });
            this.CONSUME(RCurly);
        });
    });

    component = this.RULE("component", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(Component, { LABEL: "componentLiteral" });
        // consume required name
        this.CONSUME(StringLiteral, { LABEL: "nameParameter" });
        // consume optional description, technology and tags
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "descriptionParameter" }));
        this.OPTION3(() => this.CONSUME3(StringLiteral, { LABEL: "technologyParameter" }));
        this.OPTION4(() => this.CONSUME4(StringLiteral, { LABEL: "tagsParameter" }));
        this.OPTION5(() => {
            this.CONSUME(LCurly);
            this.MANY(() => {
                this.OR([
                    { ALT: () => this.SUBRULE(this.relationship, { LABEL: "relationshipNodes" }) },
                    { ALT: () => this.SUBRULE(this.elementProperties, { LABEL: "elementProperties" }) }
                ]);
            });
            this.CONSUME(RCurly);
        });
    });

    deploymentEnvironment = this.RULE("deploymentEnvironment", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(DeploymentEnvironment, { LABEL: "deploymentEnvironmentLiteral" });
        // consume required name
        this.CONSUME(StringLiteral, { LABEL: "nameParameter" });
        this.CONSUME(LCurly);
        this.SUBRULE(this.elementProperties);
        this.MANY(() => {
            this.OR([
                { ALT: () => this.SUBRULE(this.group, { LABEL: "groupNodes" }) },
                { ALT: () => this.SUBRULE(this.deploymentNode, { LABEL: "deploymentNodeNodes" }) },
                { ALT: () => this.SUBRULE(this.relationship, { LABEL: "relationshipNodes" }) }
            ]);
        });
        this.CONSUME(RCurly);
    });

    deploymentNode = this.RULE("deploymentNode", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(DeploymentNode, { LABEL: "deploymentNodeLiteral" });
        // consume required name
        this.CONSUME(StringLiteral, { LABEL: "nameParameter" });
        // consume optional description, technology, tags and instances
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "descriptionParameter" }));
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "technologyParameter" }));
        this.OPTION3(() => this.CONSUME3(StringLiteral, { LABEL: "tagsParameter" }));
        this.OPTION4(() => this.CONSUME4(Number, { LABEL: "instancesParameter" }));
        this.CONSUME(LCurly);
        this.MANY(() => {
            this.OR([
                { ALT: () => this.SUBRULE1(this.deploymentNode, { LABEL: "deploymentNodeNodes" }) },
                { ALT: () => this.SUBRULE1(this.infrastructureNode, { LABEL: "infrastructureNodeNodes" }) },
                { ALT: () => this.SUBRULE1(this.softwareSystemInstance, { LABEL: "softwareSystemInstanceNodes" }) },
                { ALT: () => this.SUBRULE1(this.containerInstance, { LABEL: "containerInstanceNodes" }) },
                { ALT: () => this.SUBRULE1(this.relationship, { LABEL: "relationshipNodes" }) },
                { ALT: () => this.SUBRULE1(this.elementProperties, { LABEL: "elementProperties" }) }
            ]);
        });
        this.CONSUME(RCurly);
    });

    infrastructureNode = this.RULE("infrastructureNode", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(InfrastructureNode, { LABEL: "infrastructureNodeLiteral" });
        // consume required name
        this.CONSUME(StringLiteral, { LABEL: "nameParameter" });
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "descriptionParameter" }));
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "technologyParameter" }));
        this.OPTION3(() => this.CONSUME3(StringLiteral, { LABEL: "tagsParameter" }));
        this.OPTION4(() => {
            this.CONSUME(LCurly);
            this.MANY(() => {
                this.OR([
                    { ALT: () => this.SUBRULE1(this.relationship, { LABEL: "relationshipNodes" }) },
                    { ALT: () => this.SUBRULE1(this.elementProperties, { LABEL: "elementProperties" }) }
                ]);
            });
            this.CONSUME(RCurly);
        });
    });

    softwareSystemInstance = this.RULE("softwareSystemInstance", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(SoftwareSystemInstance, { LABEL: "softwareSystemInstanceLiteral" });
        this.CONSUME1(Identifier, { LABEL: "softwareSystemIdentifier" });
        // consume optional deployment groups and tags
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "deploymentGroupsParameter" }));
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "tagsParameter" }));
        this.OPTION3(() => {
            this.CONSUME(LCurly);
            this.MANY(() => {
                this.OR([
                    { ALT: () => this.SUBRULE1(this.relationship, { LABEL: "relationshipNodes" }) },
                    { ALT: () => this.SUBRULE1(this.elementProperties, { LABEL: "elementProperties" }) }
                ]);
            });
            this.CONSUME(RCurly);
        });
    });

    containerInstance = this.RULE("containerInstance", () => {
        this.OPTION(() => {
            this.CONSUME(Identifier, { LABEL: "elementIdentifier" });
            this.CONSUME(Equals);
        });
        this.CONSUME(ContainerInstance, { LABEL: "containerInstanceLiteral" });
        this.CONSUME1(Identifier, { LABEL: "containerIdentifier" });
        // consume optional deployment groups and tags
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "deploymentGroupsParameter" }));
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "tagsParameter" }));
        this.OPTION3(() => {
            this.CONSUME(LCurly);
            this.MANY(() => {
                this.OR([
                    { ALT: () => this.SUBRULE1(this.relationship, { LABEL: "relationshipNodes" }) },
                    { ALT: () => this.SUBRULE1(this.elementProperties, { LABEL: "elementProperties" }) }
                ]);
            });
            this.CONSUME(RCurly);
        });
    });

    relationship = this.RULE("relationship", () => {
        this.CONSUME(Identifier, { LABEL: "sourceIdentifier" });
        this.CONSUME(RelationshipArrow, { LABEL: "relationshipArrowLiteral" });
        this.CONSUME2(Identifier, { LABEL: "targetIdentifier" });
        // consume optional description, technology and tags
        this.OPTION(() => this.CONSUME(StringLiteral, { LABEL: "descriptionParameter" }));
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "technologyParameter" }));
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "tagsParameter" }));
    });

    elementProperties = this.RULE("elementProperties", () => {
        let hasName = false;
        let hasTechnology = false;
        let hasDescription = false;
        let hasProperties = false;
        let hasPerspectives = false;
        let hasTags = false;
        let hasUrl = false;

        this.MANY(() => {
            this.OR([
            {
                GATE: () => !hasName,
                ALT: () => {
                    this.SUBRULE(this.name);
                    hasName = true;
                }
            },
            {
                GATE: () => !hasTechnology,
                ALT: () => {
                    this.SUBRULE(this.technology);
                    hasTechnology = true;
                }
            },
            {
                GATE: () => !hasDescription,
                ALT: () => {
                    this.SUBRULE(this.description);
                    hasDescription = true;
                }
            },
            {
                GATE: () => !hasProperties,
                ALT: () => {
                    this.SUBRULE(this.properties);
                    hasProperties = true;
                }
            },
            {
                GATE: () => !hasPerspectives,
                ALT: () => {
                    this.SUBRULE(this.perspectives);
                    hasPerspectives = true;
                }
            },
            {
                GATE: () => !hasTags,
                ALT: () => {
                    this.SUBRULE(this.tags);
                    hasTags = true;
                }
            },
            {
                GATE: () => !hasUrl,
                ALT: () => {
                    this.SUBRULE(this.url);
                    hasUrl = true;
                }
            }
            ]);
        });
    });

    views = this.RULE("views", () => {
        let hasStyles = false;
        let hasThemes = false;

        this.CONSUME(Views, { LABEL: "viewsLiteral" });
        this.CONSUME(LCurly);
        this.MANY(() => {
            this.OR([
                { ALT: () => this.SUBRULE1(this.systemLandscapeView, { LABEL: "systemLandscapeViewNodes" }) },
                { ALT: () => this.SUBRULE1(this.systemContextView, { LABEL: "systemContextViewNodes" }) },
                { ALT: () => this.SUBRULE1(this.containerView, { LABEL: "containerViewNodes" }) }, 
                { ALT: () => this.SUBRULE1(this.componentView, { LABEL: "componentViewNodes" }) },
                { ALT: () => this.SUBRULE1(this.deploymentView, { LABEL: "deploymentViewNodes" }) },
                {
                    GATE: () => !hasStyles,
                    ALT: () => {
                        this.SUBRULE(this.styles, { LABEL: "stylesNodes" });
                        hasStyles = true;
                    }
                },
                {
                    GATE: () => !hasThemes,
                    ALT: () => {
                        this.SUBRULE(this.themes, { LABEL: "themesNodes" }),
                        hasThemes = true;
                    }
                }
            ]);
        });
        this.CONSUME(RCurly);
    });

    systemLandscapeView = this.RULE("systemLandscapeView", () => {
        this.CONSUME(SystemLandscape, { LABEL: "systemLandscapeLiteral" });
        // consume optional key and description
        this.OPTION(() => this.CONSUME(StringLiteral, { LABEL: "keyParameter" }));
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "descriptionParameter" }));
        this.CONSUME(LCurly);
        this.SUBRULE(this.viewProperties, { LABEL: "viewProperties" });
        this.CONSUME(RCurly);
    });

    systemContextView = this.RULE("systemContextView", () => {
        this.CONSUME(SystemContext, { LABEL: "systemContextLiteral" });
        this.CONSUME(Identifier, { LABEL: "softwareSystemIdentifier" });
        // consume optional key and description
        this.OPTION(() => this.CONSUME(StringLiteral, { LABEL: "keyParameter" }));
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "descriptionParameter" }));
        this.CONSUME(LCurly);
        this.SUBRULE(this.viewProperties, { LABEL: "viewProperties" });
        this.CONSUME(RCurly);
    });

    containerView = this.RULE("containerView", () => {
        this.CONSUME(Container, { LABEL: "containerLiteral" });
        this.CONSUME(Identifier, { LABEL: "softwareSystemIdentifier" });
        // consume optional key and description
        this.OPTION(() => this.CONSUME(StringLiteral, { LABEL: "keyParameter" }));
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "descriptionParameter" }));
        this.CONSUME(LCurly);
        this.SUBRULE(this.viewProperties, { LABEL: "viewProperties" });
        this.CONSUME(RCurly);
    });

    componentView = this.RULE("componentView", () => {
        this.CONSUME(Component, { LABEL: "componentLiteral" });
        this.CONSUME(Identifier, { LABEL: "containerIdentifier" });
        // consume optional key and description
        this.OPTION(() => this.CONSUME(StringLiteral, { LABEL: "keyParameter" }));
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "descriptionParameter" }));
        this.CONSUME(LCurly);
        this.SUBRULE(this.viewProperties, { LABEL: "viewProperties" });
        this.CONSUME(RCurly);
    });

    deploymentView = this.RULE("deploymentView", () => {
        this.CONSUME(Deployment, { LABEL: "deploymentLiteral" });
        this.CONSUME(Identifier, { LABEL: "softwareSystemIdentifier" });
        // consume required environment
        this.CONSUME(StringLiteral, { LABEL: "environmentParameter" });
        // consume optional key and description
        this.OPTION1(() => this.CONSUME1(StringLiteral, { LABEL: "keyParameter" }));
        this.OPTION2(() => this.CONSUME2(StringLiteral, { LABEL: "descriptionParameter" }));
        this.CONSUME(LCurly);
        this.SUBRULE(this.viewProperties, { LABEL: "viewProperties" });
        this.CONSUME(RCurly);
    });

    viewProperties = this.RULE("viewProperties", () => {
        let hasInclude = false;
        let hasExclude = false;
        let hasAutoLayout = false;
        let hasDefault = false;
        let hasDescription = false;
        let hasProperties = false;
        let hasAnimation = false;
        let hasTitle = false;

        this.MANY(() => {
            this.OR([
            {
                GATE: () => !hasInclude,
                ALT: () => {
                    this.SUBRULE(this.include);
                    hasInclude = true;
                }
            },
            {
                GATE: () => !hasExclude,
                ALT: () => {
                    this.SUBRULE(this.exclude);
                    hasExclude = true;
                }
            },
            {
                GATE: () => !hasAutoLayout,
                ALT: () => {
                    this.SUBRULE(this.autolayout);
                    hasAutoLayout = true;
                }
            },
            {
                GATE: () => !hasDefault,
                ALT: () => {
                    this.SUBRULE(this.default);
                    hasDefault = true;
                }
            },
            {
                GATE: () => !hasDescription,
                ALT: () => {
                    this.SUBRULE(this.description);
                    hasDescription = true;
                }
            },
            {
                GATE: () => !hasProperties,
                ALT: () => {
                    this.SUBRULE(this.properties);
                    hasProperties = true;
                }
            },
            {
                GATE: () => !hasAnimation,
                ALT: () => {
                    this.SUBRULE(this.animation);
                    hasAnimation = true;
                }
            },
            {
                GATE: () => !hasTitle,
                ALT: () => {
                    this.SUBRULE(this.title);
                    hasTitle = true;
                }
            }
            ]);
        });
    });

    name = this.RULE("nameProperty", () => {
        this.CONSUME(Name);
        this.CONSUME(StringLiteral);
    });

    technology = this.RULE("technologyProperty", () => {
        this.CONSUME(Technology);
        this.CONSUME(StringLiteral);
    });

    description = this.RULE("descriptionProperty", () => {
        this.CONSUME(Description);
        this.CONSUME(StringLiteral);
    });

    tags = this.RULE("tagsProperty", () => {
        this.CONSUME(Tags);
        this.MANY(() => this.CONSUME(StringLiteral));
    });

    url = this.RULE("urlProperty", () => {
        this.CONSUME(Url);
        this.CONSUME(StringLiteral);
    });

    properties = this.RULE("propertiesProperty", () => {
        this.CONSUME(Properties);
        this.CONSUME(LCurly);
        this.MANY(() => this.CONSUME(Identifier));
        this.CONSUME(RCurly);
    });

    perspectives = this.RULE("perspectivesProperty", () => {
        this.CONSUME(Perspectives);
        this.CONSUME(LCurly);
        this.MANY(() => this.CONSUME(Identifier));
        this.CONSUME(RCurly);
    });

    include = this.RULE("includeProperty", () => {
        this.CONSUME(Include);
        this.OR([
            { ALT: () => this.CONSUME(Wildcard) },
            { ALT: () => this.MANY(() => this.CONSUME(Identifier)) }
        ]);
    });

    exclude = this.RULE("excludeProperty", () => {
        this.CONSUME(Exclude);
        this.MANY(() => this.CONSUME(Identifier));
    });

    autolayout = this.RULE("autoLayoutProperty", () => {
        this.CONSUME(AutoLayout);
        this.OPTION(() => this.CONSUME(Identifier));
        this.OPTION1(() => this.CONSUME1(Number));
        this.OPTION2(() => this.CONSUME2(Number));
    });

    default = this.RULE("defaultProperty", () => {
        this.CONSUME(Default);
    });

    animation = this.RULE("animationProperty", () => {
        this.CONSUME(Animation);
        this.CONSUME(LCurly);
        this.MANY(() => this.CONSUME(Identifier));
        this.CONSUME(RCurly);
    });

    title = this.RULE("titleProperty", () => {
        this.CONSUME(Title);
        this.CONSUME(StringLiteral);
    });

    themes = this.RULE("themesProperty", () => {
      this.CONSUME(Themes);
      this.CONSUME(UrlLiteral);
    });

    styles = this.RULE("styles", () => {
        this.CONSUME(Styles);
        this.CONSUME(LCurly);
        this.MANY(() =>
            this.OR([
                { ALT: () => this.SUBRULE(this.elementStyle) },
                { ALT: () => this.SUBRULE(this.relationshipStyle) }
            ])
        );
        this.CONSUME(RCurly);
    });

    elementStyle = this.RULE("elementStyle", () => {
        let hasShape = false;
        let hasIcon = false;
        let hasWidth = false;
        let hasHeight = false;
        let hasBackground = false;
        let hasColor = false;
        let hasStroke = false;
        let hasStrokeWidth = false;
        let hasFontSize = false;
        let hasBorder = false;
        let hasOpacity = false;
        let hasMetadata = false;
        let hasDescription = false;
        let hasProperties = false;

        this.CONSUME(Element);
        this.CONSUME(StringLiteral);
        this.CONSUME(LCurly);
        this.MANY(() => {
            this.OR([
                {
                    GATE: () => !hasShape,
                    ALT: () => {
                        this.SUBRULE(this.shape);
                        hasShape = true;
                    }
                },
                {
                    GATE: () => !hasIcon,
                    ALT: () => {
                        this.SUBRULE(this.icon);
                        hasIcon = true;
                    }
                },
                {
                    GATE: () => !hasWidth,
                    ALT: () => {
                        this.SUBRULE(this.width);
                        hasWidth = true;
                    }
                },
                {
                    GATE: () => !hasHeight,
                    ALT: () => {
                        this.SUBRULE(this.height);
                        hasHeight = true;
                    }
                },
                {
                    GATE: () => !hasBackground,
                    ALT: () => {
                        this.SUBRULE(this.background);
                        hasBackground = true;
                    }
                },
                {
                    GATE: () => !hasColor,
                    ALT: () => {
                        this.SUBRULE(this.color);
                        hasColor = true;
                    }
                },
                {
                    GATE: () => !hasStroke,
                    ALT: () => {
                        this.SUBRULE(this.stroke);
                        hasStroke = true;
                    }
                },
                {
                    GATE: () => !hasStrokeWidth,
                    ALT: () => {
                        this.SUBRULE(this.strokeWidth);
                        hasStrokeWidth = true;
                    }
                },
                {
                    GATE: () => !hasFontSize,
                    ALT: () => {
                        this.SUBRULE(this.fontSize);
                        hasFontSize = true;
                    }
                },
                {
                    GATE: () => !hasBorder,
                    ALT: () => {
                        this.SUBRULE(this.border);
                        hasBorder = true;
                    }
                },
                {
                    GATE: () => !hasOpacity,
                    ALT: () => {
                        this.SUBRULE(this.opacity);
                        hasOpacity = true;
                    }
                },
                {
                    GATE: () => !hasMetadata,
                    ALT: () => {
                        this.SUBRULE(this.metadata);
                        hasMetadata = true;
                    }
                },
                {
                    GATE: () => !hasDescription,
                    ALT: () => {
                        this.SUBRULE(this.description);
                        hasDescription = true;
                    }
                },
                {
                    GATE: () => !hasProperties,
                    ALT: () => {
                        this.SUBRULE(this.properties);
                        hasProperties = true;
                    }
                }
            ]);
        });
        this.CONSUME(RCurly);
    });

    relationshipStyle = this.RULE("relationshipStyle", () => {
        let hasThinckness = false;
        let hasDashed = false;
        let hasColor = false;
        let hasStyle = false;
        let hasRouting = false;
        let hasFontSize = false;
        let hasWidth = false;
        let hasPosition = false;
        let hasOpacity = false;
        let hasProperties = false;

        this.CONSUME(Relationship);
        this.CONSUME(StringLiteral);
        this.CONSUME(LCurly);
        this.MANY(() => {
            this.OR([
                {
                    GATE: () => !hasThinckness,
                    ALT: () => {
                        this.SUBRULE(this.thickness);
                        hasThinckness = true;
                    }
                },
                {
                    GATE: () => !hasDashed,
                    ALT: () => {
                        this.SUBRULE(this.dashed);
                        hasDashed = true;
                    }
                },
                {
                    GATE: () => !hasColor,
                    ALT: () => {
                        this.SUBRULE(this.color);
                        hasColor = true;
                    }
                },
                {
                    GATE: () => !hasStyle,
                    ALT: () => {
                        this.SUBRULE(this.style);
                        hasStyle = true;
                    }
                },
                {
                    GATE: () => !hasRouting,
                    ALT: () => {
                        this.SUBRULE(this.routing);
                        hasRouting = true;
                    }
                },
                {
                    GATE: () => !hasFontSize,
                    ALT: () => {
                        this.SUBRULE(this.fontSize);
                        hasFontSize = true;
                    }
                },
                {
                    GATE: () => !hasWidth,
                    ALT: () => {
                        this.SUBRULE(this.width);
                        hasWidth = true;
                    }
                },
                {
                    GATE: () => !hasPosition,
                    ALT: () => {
                        this.SUBRULE(this.position);
                        hasPosition = true;
                    }
                },
                {
                    GATE: () => !hasOpacity,
                    ALT: () => {
                        this.SUBRULE(this.opacity);
                        hasOpacity = true;
                    }
                },
                {
                    GATE: () => !hasProperties,
                    ALT: () => {
                        this.SUBRULE(this.properties);
                        hasProperties = true;
                    }
                }
            ]);
        });
        this.CONSUME(RCurly);
    });

    shape = this.RULE("shape", () => {
        this.CONSUME(Shape);
        this.CONSUME(Identifier);
    });

    icon = this.RULE("icon", () => {
        this.CONSUME(Icon);
        this.CONSUME(Identifier);
    });

    color = this.RULE("color", () => {
        this.CONSUME(Color);
        this.CONSUME(HexColor);
    });

    stroke = this.RULE("stroke", () => {
        this.CONSUME(Stroke);
        this.CONSUME(HexColor);
    });

    strokeWidth = this.RULE("strokeWidth", () => {
        this.CONSUME(StrokeWidth);
        this.CONSUME(Number);
    });

    dashed = this.RULE("dashed", () => {
        this.CONSUME(Dashed);
        this.CONSUME(Boolean);
    });

    width = this.RULE("width", () => {
        this.CONSUME(Width);
        this.CONSUME(Number);
    });

    height = this.RULE("height", () => {
        this.CONSUME(Height);
        this.CONSUME(Number);
    });

    background = this.RULE("background", () => {
        this.CONSUME(Background);
        this.CONSUME(HexColor);
    });

    fontSize = this.RULE("fonSize", () => {
        this.CONSUME(FontSize);
        this.CONSUME(Number);
    });

    border = this.RULE("border", () => {
        this.CONSUME(Border);
        this.CONSUME(Identifier);
    });

    opacity = this.RULE("opacity", () => {
        this.CONSUME(Opacity);
        this.CONSUME(Number);
    });

    metadata = this.RULE("metadata", () => {
        this.CONSUME(Metadata);
        this.CONSUME(Boolean);
    });

    thickness = this.RULE("thickness", () => {
        this.CONSUME(Thickness);
        this.CONSUME(Number);
    });

    style = this.RULE("style", () => {
        this.CONSUME(Style);
        this.CONSUME(Identifier);
    });

    routing = this.RULE("routing", () => {
        this.CONSUME(Routing);
        this.CONSUME(Identifier);
    });

    position = this.RULE("position", () => {
        this.CONSUME(Position);
        this.CONSUME(Number);
    });
}
