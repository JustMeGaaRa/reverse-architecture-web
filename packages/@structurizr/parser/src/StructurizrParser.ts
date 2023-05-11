import { CstParser } from "chevrotain";
import { Tokens } from "./Tokens";

export class StructurizrParser extends CstParser {
    constructor() {
        super(Tokens);
        this.performSelfAnalysis();
    }

    workspace = this.RULE("workspace", () => {
        this.CONSUME(Tokens.Workspace);
        // consume optional name and description
        this.OPTION(() => this.CONSUME(Tokens.StringLiteral));
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.CONSUME(Tokens.LCurly);
        // optional children
        this.OPTION2(() => this.SUBRULE1(this.name));
        this.OPTION3(() => this.SUBRULE1(this.description));
        this.OPTION4(() => this.SUBRULE1(this.properties));
        // required children
        this.SUBRULE(this.model);
        this.SUBRULE(this.views);
        // TODO: consume optional configuration
        this.CONSUME(Tokens.RCurly);
    });

    model = this.RULE("model", () => {
        this.CONSUME(Tokens.Model);
        this.CONSUME(Tokens.LCurly);
        this.MANY(() => {
            this.OR([
                { ALT: () => this.SUBRULE(this.group) },
                { ALT: () => this.SUBRULE(this.person) },
                { ALT: () => this.SUBRULE(this.softwareSystem) },
                { ALT: () => this.SUBRULE(this.deploymentEnvironment) },
                { ALT: () => this.SUBRULE(this.relationship) }
            ]);
        });
        this.CONSUME(Tokens.RCurly);
    });

    group = this.RULE("group", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.Group);
        // consume required name
        this.CONSUME(Tokens.StringLiteral);
        this.CONSUME(Tokens.LCurly);
        this.OR([
            {
                GATE: this.BACKTRACK(this.personOrSoftwareSystem),
                ALT: () => this.MANY(() => this.SUBRULE(this.personOrSoftwareSystem))
            },
            {
                GATE: this.BACKTRACK(this.container),
                ALT: () => this.MANY1(() => this.SUBRULE(this.container))
            },
            {
                GATE: this.BACKTRACK(this.component),
                ALT: () => this.MANY2(() => this.SUBRULE(this.component))
            }
        ]);
        this.CONSUME(Tokens.RCurly);
    });

    personOrSoftwareSystem = this.RULE("personOrSoftwareSystem", () => {
        this.OR([
            { ALT: () => this.SUBRULE(this.person) },
            { ALT: () => this.SUBRULE(this.softwareSystem) }
        ]);
    });

    person = this.RULE("person", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.Person);
        // consume required name
        this.CONSUME(Tokens.StringLiteral);
        // consume optional description and tags
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
        this.OPTION3(() => this.CONSUME3(Tokens.StringLiteral));
        this.OPTION4(() => {
            this.CONSUME(Tokens.LCurly);
            this.SUBRULE(this.elementProperties);
            this.CONSUME(Tokens.RCurly);
        });
    });

    softwareSystem = this.RULE("softwareSystem", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.SoftwareSystem);
        // consume required name
        this.CONSUME(Tokens.StringLiteral);
        // consume optional description and tags
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
        this.OPTION3(() => this.CONSUME3(Tokens.StringLiteral));
        this.OPTION4(() => {
            this.CONSUME(Tokens.LCurly);
            this.MANY(() => {
                this.OR([
                    { ALT: () => this.SUBRULE(this.group) },
                    { ALT: () => this.SUBRULE(this.container) },
                    { ALT: () => this.SUBRULE(this.relationship) },
                    { ALT: () => this.SUBRULE(this.elementProperties) }
                ]);
            });
            this.CONSUME(Tokens.RCurly);
        });
    });

    container = this.RULE("container", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.Container);
        // consume required name
        this.CONSUME(Tokens.StringLiteral);
        // consume optional description, technology and tags
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
        this.OPTION3(() => this.CONSUME3(Tokens.StringLiteral));
        this.OPTION4(() => this.CONSUME4(Tokens.StringLiteral));
        this.OPTION5(() => {
            this.CONSUME(Tokens.LCurly);
            this.MANY(() => {
                this.OR([
                    { ALT: () => this.SUBRULE(this.group) },
                    { ALT: () => this.SUBRULE(this.component) },
                    { ALT: () => this.SUBRULE(this.relationship) },
                    { ALT: () => this.SUBRULE(this.elementProperties) }
                ]);
            });
            this.CONSUME(Tokens.RCurly);
        });
    });

    component = this.RULE("component", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.Component);
        // consume required name
        this.CONSUME(Tokens.StringLiteral);
        // consume optional description, technology and tags
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
        this.OPTION3(() => this.CONSUME3(Tokens.StringLiteral));
        this.OPTION4(() => this.CONSUME4(Tokens.StringLiteral));
        this.OPTION5(() => {
            this.CONSUME(Tokens.LCurly);
            this.SUBRULE(this.elementProperties);
            this.CONSUME(Tokens.RCurly);
        });
    });

    deploymentEnvironment = this.RULE("deploymentEnvironment", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.DeploymentEnvironment);
        // consume required name
        this.CONSUME(Tokens.StringLiteral);
        this.CONSUME(Tokens.LCurly);
        this.SUBRULE(this.elementProperties);
        this.MANY(() => {
            this.OR([
                { ALT: () => this.SUBRULE(this.group) },
                { ALT: () => this.SUBRULE(this.deploymentNode) },
                { ALT: () => this.SUBRULE(this.relationship) }
            ]);
        });
        this.CONSUME(Tokens.RCurly);
    });

    deploymentNode = this.RULE("deploymentNode", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.DeploymentNode);
        // consume required name
        this.CONSUME(Tokens.StringLiteral);
        // consume optional description, technology, tags and instances
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
        this.OPTION3(() => this.CONSUME3(Tokens.StringLiteral));
        this.OPTION4(() => this.CONSUME4(Tokens.NumericLiteral));
        this.CONSUME(Tokens.LCurly);
        this.SUBRULE(this.elementProperties);
        this.MANY(() => {
            this.OR([
                { ALT: () => this.SUBRULE1(this.deploymentNode) },
                { ALT: () => this.SUBRULE1(this.infrastructureNode) },
                { ALT: () => this.SUBRULE1(this.softwareSystemInstance) },
                { ALT: () => this.SUBRULE1(this.containerInstance) }
            ]);
        });
        this.CONSUME(Tokens.RCurly);
    });

    infrastructureNode = this.RULE("infrastructureNode", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.InfrastructureNode);
        // consume required name
        this.CONSUME(Tokens.StringLiteral);
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
        this.OPTION3(() => this.CONSUME3(Tokens.StringLiteral));
        this.CONSUME(Tokens.LCurly);
        this.SUBRULE(this.elementProperties);
        this.CONSUME(Tokens.RCurly);
    });

    softwareSystemInstance = this.RULE("softwareSystemInstance", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.SoftwareSystemInstance);
        this.CONSUME1(Tokens.Identifier);
        // consume optional deployment groups and tags
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
    });

    containerInstance = this.RULE("containerInstance", () => {
        this.OPTION(() => {
            this.CONSUME(Tokens.Identifier);
            this.CONSUME(Tokens.Equals);
        });
        this.CONSUME(Tokens.ContainerInstance);
        this.CONSUME1(Tokens.Identifier);
        // consume optional deployment groups and tags
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
    });

    relationship = this.RULE("relationship", () => {
        this.CONSUME(Tokens.Identifier);
        this.CONSUME(Tokens.RelationshipArrow);
        this.CONSUME2(Tokens.Identifier);
        // consume optional description, technology and tags
        this.OPTION(() => this.CONSUME(Tokens.StringLiteral));
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
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

        this.CONSUME(Tokens.Views);
        this.CONSUME(Tokens.LCurly);
        this.MANY(() => {
            this.OR([
                { ALT: () => this.SUBRULE1(this.systemLandscapeView) },
                { ALT: () => this.SUBRULE1(this.systemContextView) },
                { ALT: () => this.SUBRULE1(this.containerView) },
                { ALT: () => this.SUBRULE1(this.componentView) },
                { ALT: () => this.SUBRULE1(this.deploymentView) },
                {
                    GATE: () => !hasStyles,
                    ALT: () => {
                        this.SUBRULE(this.styles);
                        hasStyles = true;
                    }
                }
            ]);
        });
        this.CONSUME(Tokens.RCurly);
    });

    systemLandscapeView = this.RULE("systemLandscapeView", () => {
        this.CONSUME(Tokens.SystemLandscape);
        // consume optional key and description
        this.OPTION(() => this.CONSUME(Tokens.StringLiteral));
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.CONSUME(Tokens.LCurly);
        this.SUBRULE(this.viewProperties);
        this.CONSUME(Tokens.RCurly);
    });

    systemContextView = this.RULE("systemContextView", () => {
        this.CONSUME(Tokens.SystemContext);
        this.CONSUME(Tokens.Identifier);
        // consume optional key and description
        this.OPTION(() => this.CONSUME(Tokens.StringLiteral));
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.CONSUME(Tokens.LCurly);
        this.SUBRULE(this.viewProperties);
        this.CONSUME(Tokens.RCurly);
    });

    containerView = this.RULE("containerView", () => {
        this.CONSUME(Tokens.Container);
        this.CONSUME(Tokens.Identifier);
        // consume optional key and description
        this.OPTION(() => this.CONSUME(Tokens.StringLiteral));
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.CONSUME(Tokens.LCurly);
        this.SUBRULE(this.viewProperties);
        this.CONSUME(Tokens.RCurly);
    });

    componentView = this.RULE("componentView", () => {
        this.CONSUME(Tokens.Component);
        this.CONSUME(Tokens.Identifier);
        // consume optional key and description
        this.OPTION(() => this.CONSUME(Tokens.StringLiteral));
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.CONSUME(Tokens.LCurly);
        this.SUBRULE(this.viewProperties);
        this.CONSUME(Tokens.RCurly);
    });

    deploymentView = this.RULE("deploymentView", () => {
        this.CONSUME(Tokens.Deployment);
        this.CONSUME(Tokens.Identifier);
        // consume required environment
        this.CONSUME(Tokens.StringLiteral);
        // consume optional key and description
        this.OPTION1(() => this.CONSUME1(Tokens.StringLiteral));
        this.OPTION2(() => this.CONSUME2(Tokens.StringLiteral));
        this.CONSUME(Tokens.LCurly);
        this.SUBRULE(this.viewProperties);
        this.CONSUME(Tokens.RCurly);
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
        this.CONSUME(Tokens.Name);
        this.CONSUME(Tokens.StringLiteral);
    });

    technology = this.RULE("technologyProperty", () => {
        this.CONSUME(Tokens.Technology);
        this.CONSUME(Tokens.StringLiteral);
    });

    description = this.RULE("descriptionProperty", () => {
        this.CONSUME(Tokens.Description);
        this.CONSUME(Tokens.StringLiteral);
    });

    tags = this.RULE("tagsProperty", () => {
        this.CONSUME(Tokens.Tags);
        this.MANY(() => this.CONSUME(Tokens.StringLiteral));
    });

    url = this.RULE("urlProperty", () => {
        this.CONSUME(Tokens.Url);
        this.CONSUME(Tokens.StringLiteral);
    });

    properties = this.RULE("propertiesProperty", () => {
        this.CONSUME(Tokens.Properties);
        this.CONSUME(Tokens.LCurly);
        this.MANY(() => this.CONSUME(Tokens.Identifier));
        this.CONSUME(Tokens.RCurly);
    });

    perspectives = this.RULE("perspectivesProperty", () => {
        this.CONSUME(Tokens.Perspectives);
        this.CONSUME(Tokens.LCurly);
        this.MANY(() => this.CONSUME(Tokens.Identifier));
        this.CONSUME(Tokens.RCurly);
    });

    include = this.RULE("includeProperty", () => {
        this.CONSUME(Tokens.Include);
        this.MANY(() => this.CONSUME(Tokens.Identifier));
    });

    exclude = this.RULE("excludeProperty", () => {
        this.CONSUME(Tokens.Exclude);
        this.MANY(() => this.CONSUME(Tokens.Identifier));
    });

    autolayout = this.RULE("autoLayoutProperty", () => {
        this.CONSUME(Tokens.AutoLayout);
    });

    default = this.RULE("defaultProperty", () => {
        this.CONSUME(Tokens.Default);
    });

    animation = this.RULE("animationProperty", () => {
        this.CONSUME(Tokens.Animation);
        this.CONSUME(Tokens.LCurly);
        this.MANY(() => this.CONSUME(Tokens.Identifier));
        this.CONSUME(Tokens.RCurly);
    });

    title = this.RULE("titleProperty", () => {
        this.CONSUME(Tokens.Title);
        this.CONSUME(Tokens.StringLiteral);
    });

    styles = this.RULE("styles", () => {
        this.CONSUME(Tokens.Styles);
        this.CONSUME(Tokens.LCurly);
        this.MANY(() =>
            this.OR([
                { ALT: () => this.SUBRULE(this.elementStyle) },
                { ALT: () => this.SUBRULE(this.relationshipStyle) }
            ])
        );
        this.CONSUME(Tokens.RCurly);
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

        this.CONSUME(Tokens.Element);
        this.CONSUME(Tokens.StringLiteral);
        this.CONSUME(Tokens.LCurly);
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
        this.CONSUME(Tokens.RCurly);
    });

    relationshipStyle = this.RULE("relationshipStyle", () => {
        let hasThinkness = false;
        let hasDashed = false;
        let hasColor = false;
        let hasStyle = false;
        let hasRouting = false;
        let hasFontSize = false;
        let hasWidth = false;
        let hasPosition = false;
        let hasOpacity = false;
        let hasProperties = false;

        this.CONSUME(Tokens.Relationship);
        this.CONSUME(Tokens.StringLiteral);
        this.CONSUME(Tokens.LCurly);
        this.MANY(() => {
            this.OR([
                {
                    GATE: () => !hasThinkness,
                    ALT: () => {
                        this.SUBRULE(this.thinkness);
                        hasThinkness = true;
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
        this.CONSUME(Tokens.RCurly);
    });

    shape = this.RULE("shape", () => {
        this.CONSUME(Tokens.Shape);
        this.CONSUME(Tokens.Identifier);
    });

    icon = this.RULE("icon", () => {
        this.CONSUME(Tokens.Icon);
        this.CONSUME(Tokens.Identifier);
    });

    color = this.RULE("color", () => {
        this.CONSUME(Tokens.Color);
        this.CONSUME(Tokens.HexColor);
    });

    stroke = this.RULE("stroke", () => {
        this.CONSUME(Tokens.Stroke);
        this.CONSUME(Tokens.HexColor);
    });

    strokeWidth = this.RULE("strokeWidth", () => {
        this.CONSUME(Tokens.StrokeWidth);
        this.CONSUME(Tokens.NumericLiteral);
    });

    dashed = this.RULE("dashed", () => {
        this.CONSUME(Tokens.Dashed);
        this.CONSUME(Tokens.BooleanLiteral);
    });

    width = this.RULE("width", () => {
        this.CONSUME(Tokens.Width);
        this.CONSUME(Tokens.NumericLiteral);
    });

    height = this.RULE("height", () => {
        this.CONSUME(Tokens.Height);
        this.CONSUME(Tokens.NumericLiteral);
    });

    background = this.RULE("background", () => {
        this.CONSUME(Tokens.Background);
        this.CONSUME(Tokens.HexColor);
    });

    fontSize = this.RULE("fonSize", () => {
        this.CONSUME(Tokens.FontSize);
        this.CONSUME(Tokens.NumericLiteral);
    });

    border = this.RULE("border", () => {
        this.CONSUME(Tokens.Border);
        this.CONSUME(Tokens.Identifier);
    });

    opacity = this.RULE("opacity", () => {
        this.CONSUME(Tokens.Opacity);
        this.CONSUME(Tokens.NumericLiteral);
    });

    metadata = this.RULE("metadata", () => {
        this.CONSUME(Tokens.Metadata);
        this.CONSUME(Tokens.BooleanLiteral);
    });

    thinkness = this.RULE("thinkness", () => {
        this.CONSUME(Tokens.Thinkness);
        this.CONSUME(Tokens.NumericLiteral);
    });

    style = this.RULE("style", () => {
        this.CONSUME(Tokens.Style);
        this.CONSUME(Tokens.Identifier);
    });

    routing = this.RULE("routing", () => {
        this.CONSUME(Tokens.Routing);
        this.CONSUME(Tokens.Identifier);
    });

    position = this.RULE("position", () => {
        this.CONSUME(Tokens.Position);
        this.CONSUME(Tokens.NumericLiteral);
    });
}
