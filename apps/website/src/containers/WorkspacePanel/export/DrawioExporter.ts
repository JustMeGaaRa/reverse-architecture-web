import {
    MXGeometryAs,
    MXCell,
    MXPointAs,
    Drawio,
    MxObject,
    Diagram
} from "@justmegaara/mxgraph";
import {
    Element,
    Person,
    SoftwareSystem,
    Container,
    Component,
    DeploymentNode,
    Relationship,
    Workspace,
    SystemContextView,
    Layout,
    Tag,
    ComponentView,
    ContainerView,
    findSoftwareSystem,
    findContainer,
    DeploymentView,
    Technology
} from "@justmegaara/structurizr-dsl";
import { v4 } from "uuid";
import { XMLBuilder } from "fast-xml-parser";
import { bold, br, font, html, text, div, none } from "../../../utils/HtmlBuilder";

enum NodeHorizontalAlign {
    Left = "left",
    Center = "center",
    Right = "right"
}

enum NodeVerticalAlign {
    Top = "top",
    Middle = "middle",
    Bottom = "bottom"
}

enum NodeWhiteSpaceType {
    Wrap = "wrap"
}

type NodeStyle = {
    labelBackgroundColor: string;
    rounded: boolean;
    whiteSpace: NodeWhiteSpaceType;
    html: boolean;
    fillColor: string;
    strokeColor: string;
    dashed: boolean;
    fontSize: number;
    fontColor: string;
    align: NodeHorizontalAlign;
    verticalAlign: NodeVerticalAlign;
    comic: boolean;
    resizable: boolean;
    shape: string;
    metaEdit: boolean;
    points: string | Array<[number, number, number]>;
    arcSize: number;
    labelBorderColor: string;
    spacingTop: number;
    spacing: number;
    dashPattern: string;
    rotatable: boolean;
    perimeter: string;
    noLabel: boolean;
    labelPadding: number;
    allowArrows: boolean;
    connectable: boolean;
    expand: boolean;
    recursiveResize: boolean;
    editable: boolean;
    pointerEvents: boolean;
    absoluteArcSize: number;
}

enum EdgeArrowType {
    Classic = "classic",
    ClassicThin = "classicThin",
    Open = "open",
    OpenThin = "openThin",
    OpenAsync = "openAsync",
    Block = "block",
    BlockThin = "blockThin",
    Async = "async"
}

enum EdgeStyleType {
    StraightEdgeStyle = "straightEdgeStyle",
    OrthogonalEdgeStyle = "orthogonalEdgeStyle",
    ElbowEdgeStyle = "elbowEdgeStyle",
    IsometricEdgeStyle = "isometricEdgeStyle"
}

type EdgeStyle = {
    endArrow: EdgeArrowType;
    html: boolean;
    rounded: boolean;
    flowAnimation: boolean;
    labelBackgroundColor: string;
    dashed: boolean;
    edgeStyle: EdgeStyleType;
    curved: boolean;
    fontSize: number;
    fontColor: string;
    strokeWidth: number;
    endFill: number;
    strokeColor: string;
    elbow: string;
    metaEdit: boolean;
    endSize: number;
    startSize: number;
    jumpStyle: string;
    jumpSize: number;
}

const formatStyle = <T>(style: Partial<T>) => {
    const formatType = (value) => typeof value == "boolean" ? value ? "1" : "0" : value
    return Object.keys(style)
        .map(key => `${key}=${formatType(style[key])}`)
        .join(";");
}

const formatNodeStyle = (style: Partial<NodeStyle>) => formatStyle(style);

const formatEdgeStyle = (style: Partial<EdgeStyle>) => formatStyle(style);

const isExternal = (node: { tags: Tag[] }) => {
    return node.tags.some(x => x.name === "External");
}

const elementHtmlBuilder = (element: Element) => {
    const htmlObject = html(
        font(
            { fontSize: 16 },
            bold(text("%c4Name%"))
        ),
        div(
            { textAlign: "center" },
            element.technology
                ? text("[%c4Type%: %c4Technology%]")
                : text("[%c4Type%]")
        ),
        br(),
        div(
            { textAlign: "center" },
            font(
                { fontSize: 11, fontColor: "#cccccc" },
                text("%c4Description%"),
            )
        )
    );
    return htmlObject.toHtml();
}

const fromPerson = (
    parent: string,
    node: Person,
    layout: Layout
): MxObject => {
    return {
        _placeholders: "1",
        _c4Name: node.name,
        _c4Type: "Person",
        _c4Description: node.description,
        _label: elementHtmlBuilder(node),
        _id: node.identifier,
        mxCell: {
            _parent: parent,
            _vertex: "1",
            _style: formatNodeStyle({
                align: NodeHorizontalAlign.Center,
                dashed: false,
                fontSize: 11,
                fontColor: "#ffffff",
                fillColor: isExternal(node) ? "#6C6477" : "#083F75",
                html: true,
                metaEdit: true,
                points: `[
                    [0.5,0,0],[1,0.5,0],[1,0.75,0],
                    [0.75,1,0],[0.5,1,0],[0.25,1,0],
                    [0,0.75,0],[0,0.5,0]
                ]`,
                resizable: false,
                shape: "mxgraph.c4.person2",
                strokeColor: isExternal(node) ? "#4D4D4D" : "#06315C",
                whiteSpace: NodeWhiteSpaceType.Wrap,
            }),
            mxGeometry: {
                _x: layout[node.identifier].x.toString(),
                _y: layout[node.identifier].y.toString(),
                _width: "200",
                _height: "180",
                _as: MXGeometryAs.Geometry
            }
        }
    }
}

const fromSoftwareSystem = (
    parent: string,
    node: SoftwareSystem,
    layout: Layout
): MxObject => {
    return {
        _placeholders: "1",
        _c4Name: node.name,
        _c4Type: "Software System",
        _c4Description: node.description,
        _c4Technology: node.technology?.map(x => x.name).join(','),
        _label: elementHtmlBuilder(node),
        _id: node.identifier,
        mxCell: {
            _parent: parent,
            _vertex: "1",
            _style: formatNodeStyle({
                align: NodeHorizontalAlign.Center,
                arcSize: 10,
                fontColor: "#ffffff",
                fillColor: isExternal(node) ? "#8C8496" : "#1061B0",
                html: true,
                labelBackgroundColor: "none",
                metaEdit: true,
                points: `[
                    [0.25,0,0],[0.5,0,0],[0.75,0,0],
                    [1,0.25,0],[1,0.5,0],[1,0.75,0],
                    [0.75,1,0],[0.5,1,0],[0.25,1,0],
                    [0,0.75,0],[0,0.5,0],[0,0.25,0]
                ]`,
                rounded: true,
                resizable: false,
                strokeColor: isExternal(node) ? "#736782" : "#0D5091",
                whiteSpace: NodeWhiteSpaceType.Wrap
            }),
            mxGeometry: {
                _x: layout[node.identifier].x.toString(),
                _y: layout[node.identifier].y.toString(),
                _width: "240",
                _height: "120",
                _as: MXGeometryAs.Geometry
            }
        }
    }
}

const fromContainer = (
    parent: string,
    node: Container,
    layout: Layout
): MxObject => {
    return {
        _placeholders: "1",
        _c4Name: node.name,
        _c4Type: "Container",
        _c4Description: node.description,
        _c4Technology: node.technology?.map(x => x.name).join(','),
        _label: elementHtmlBuilder(node),
        _id: node.identifier,
        mxCell: {
            _parent: parent,
            _vertex: "1",
            _style: formatNodeStyle({
                align: NodeHorizontalAlign.Center,
                arcSize: 10,
                fontColor: "#ffffff",
                fillColor: isExternal(node) ? "#8C8496" : "#23A2D9",
                html: true,
                labelBackgroundColor: "none",
                metaEdit: true,
                points: `[
                    [0.25,0,0],[0.5,0,0],[0.75,0,0],
                    [1,0.25,0],[1,0.5,0],[1,0.75,0],
                    [0.75,1,0],[0.5,1,0],[0.25,1,0],
                    [0,0.75,0],[0,0.5,0],[0,0.25,0]
                ]`,
                rounded: true,
                resizable: false,
                strokeColor: isExternal(node) ? "#736782" : "#0E7DAD",
                whiteSpace: NodeWhiteSpaceType.Wrap
            }),
            mxGeometry: {
                _x: layout[node.identifier].x.toString(),
                _y: layout[node.identifier].y.toString(),
                _width: "240",
                _height: "120",
                _as: MXGeometryAs.Geometry
            }
        }
    }
}

const fromComponent = (
    parent: string,
    node: Component,
    layout: Layout
): MxObject => {
    return {
        _placeholders: "1",
        _c4Name: node.name,
        _c4Type: "Component",
        _c4Description: node.description,
        _c4Technology: node.technology?.map(x => x.name).join(','),
        _label: elementHtmlBuilder(node),
        _id: node.identifier,
        mxCell: {
            _parent: parent,
            _vertex: "1",
            _style: formatNodeStyle({
                align: NodeHorizontalAlign.Center,
                arcSize: 10,
                fontColor: "#ffffff",
                fillColor: "#63BEF2",
                html: true,
                labelBackgroundColor: "none",
                metaEdit: true,
                points: `[
                    [0.25,0,0],[0.5,0,0],[0.75,0,0],
                    [1,0.25,0],[1,0.5,0],[1,0.75,0],
                    [0.75,1,0],[0.5,1,0],[0.25,1,0],
                    [0,0.75,0],[0,0.5,0],[0,0.25,0]
                ]`,
                rounded: true,
                resizable: false,
                strokeColor: "#2086C9",
                whiteSpace: NodeWhiteSpaceType.Wrap
            }),
            mxGeometry: {
                _x: layout[node.identifier].x.toString(),
                _y: layout[node.identifier].y.toString(),
                _width: "240",
                _height: "120",
                _as: MXGeometryAs.Geometry
            }
        }
    }
}

const scopeHtmlBuilder = (element: { technology?: Technology[] }) => {
    const htmlObject = html(
        font(
            { fontSize: 16 },
            bold(
                div(
                    { textAlign: "left" },
                    text("%c4Name%")
                )
            )
        ),
        div(
            { textAlign: "left" },
            element.technology
                ? text("[%c4Application%: %c4Technology%]")
                : text("[%c4Application%]")
        )
    );
    return htmlObject.toHtml();
}

const fromDeploymentNodeScope = (
    parent: string,
    node: DeploymentNode,
    layout: Layout
): MxObject => {
    return {
        _placeholders: "1",
        _c4Name: node.name,
        _c4Type: "DeploymentNodeBoundary",
        _c4Application: "Deployment Node",
        _c4Technology: node.technology?.map(x => x.name).join(','),
        _label: scopeHtmlBuilder(node),
        _id: node.identifier,
        mxCell: {
            _parent: parent,
            _vertex: "1",
            _style: formatNodeStyle({
                arcSize: 20,
                align: NodeHorizontalAlign.Left,
                allowArrows: false,
                absoluteArcSize: 1,
                connectable: false,
                dashed: true,
                dashPattern: "8 4",
                expand: false,
                editable: true,
                fontSize: 11,
                fillColor: "none",
                fontColor: "#333333",
                html: true,
                labelBackgroundColor: "none",
                labelBorderColor:"none",
                labelPadding: 0,
                metaEdit: true,
                noLabel: false,
                pointerEvents: false,
                perimeter: "rectanglePerimeter",
                points: `[
                    [0.25,0,0],[0.5,0,0],[0.75,0,0],
                    [1,0.25,0],[1,0.5,0],[1,0.75,0],
                    [0.75,1,0],[0.5,1,0],[0.25,1,0],
                    [0,0.75,0],[0,0.5,0],[0,0.25,0]
                ]`,
                rotatable: false,
                recursiveResize: false,
                rounded: true,
                strokeColor: "#666666",
                spacingTop: 0,
                spacing: 10,
                verticalAlign: NodeVerticalAlign.Bottom,
                whiteSpace: NodeWhiteSpaceType.Wrap,
            }),
            mxGeometry: {
                _x: layout[node.identifier].x.toString(),
                _y: layout[node.identifier].y.toString(),
                _width: layout[node.identifier].width.toString(),
                _height: layout[node.identifier].height.toString(),
                _as: MXGeometryAs.Geometry
            }
        }
    }
}

const fromSoftwareSystemScope = (
    parent: string,
    node: SoftwareSystem,
    layout: Layout
): MxObject => {
    return {
        _placeholders: "1",
        _c4Name: node.name,
        _c4Type: "SystemScopeBoundary",
        _c4Application: "Software System",
        _label: scopeHtmlBuilder(node),
        _id: node.identifier,
        mxCell: {
            _parent: parent,
            _vertex: "1",
            _style: formatNodeStyle({
                arcSize: 20,
                align: NodeHorizontalAlign.Left,
                allowArrows: false,
                absoluteArcSize: 1,
                connectable: false,
                dashed: true,
                dashPattern: "8 4",
                expand: false,
                editable: true,
                fontSize: 11,
                fillColor: "none",
                fontColor: "#333333",
                html: true,
                labelBackgroundColor: "none",
                labelBorderColor:"none",
                labelPadding: 0,
                metaEdit: true,
                noLabel: false,
                pointerEvents: false,
                perimeter: "rectanglePerimeter",
                points: `[
                    [0.25,0,0],[0.5,0,0],[0.75,0,0],
                    [1,0.25,0],[1,0.5,0],[1,0.75,0],
                    [0.75,1,0],[0.5,1,0],[0.25,1,0],
                    [0,0.75,0],[0,0.5,0],[0,0.25,0]
                ]`,
                rotatable: false,
                recursiveResize: false,
                rounded: true,
                strokeColor: "#666666",
                spacingTop: 0,
                spacing: 10,
                verticalAlign: NodeVerticalAlign.Bottom,
                whiteSpace: NodeWhiteSpaceType.Wrap,
            }),
            mxGeometry: {
                _x: layout[node.identifier].x.toString(),
                _y: layout[node.identifier].y.toString(),
                _width: layout[node.identifier].width.toString(),
                _height: layout[node.identifier].height.toString(),
                _as: MXGeometryAs.Geometry
            }
        }
    };
}

const fromContainerScope = (
    parent: string,
    node: Container,
    layout: Layout
): MxObject => {
    return {
        _placeholders: "1",
        _c4Name: node.name,
        _c4Type: "ContainerScopeBoundary",
        _c4Application: "Container",
        _label: scopeHtmlBuilder(node),
        _id: node.identifier,
        mxCell: {
            _parent: parent,
            _vertex: "1",
            _style: formatNodeStyle({
                arcSize: 20,
                align: NodeHorizontalAlign.Left,
                allowArrows: false,
                absoluteArcSize: 1,
                connectable: false,
                dashed: true,
                dashPattern: "8 4",
                expand: false,
                editable: true,
                fontSize: 11,
                fillColor: "none",
                fontColor: "#333333",
                html: true,
                labelBackgroundColor: "none",
                labelBorderColor:"none",
                labelPadding: 0,
                metaEdit: true,
                noLabel: false,
                pointerEvents: false,
                perimeter: "rectanglePerimeter",
                points: `[
                    [0.25,0,0],[0.5,0,0],[0.75,0,0],
                    [1,0.25,0],[1,0.5,0],[1,0.75,0],
                    [0.75,1,0],[0.5,1,0],[0.25,1,0],
                    [0,0.75,0],[0,0.5,0],[0,0.25,0]
                ]`,
                rotatable: false,
                recursiveResize: false,
                rounded: true,
                strokeColor: "#666666",
                spacingTop: 0,
                spacing: 10,
                verticalAlign: NodeVerticalAlign.Bottom,
                whiteSpace: NodeWhiteSpaceType.Wrap,
            }),
            mxGeometry: {
                _x: layout[node.identifier].x.toString(),
                _y: layout[node.identifier].y.toString(),
                _width: layout[node.identifier].width.toString(),
                _height: layout[node.identifier].height.toString(),
                _as: MXGeometryAs.Geometry
            }
        }
    };
}

const relationshipHtmlBuilder = (rel: Relationship) => {
    const htmlObject = html(
        div(
            { textAlign: "left" },
            rel.description
                ? div({ textAlign: "center" }, bold(text("%c4Description%")))
                : none(),
            rel.technology
                ? div({ textAlign: "center" }, text("[%c4Technology%]"))
                : none()
        )
    );
    return htmlObject.toHtml();
}

const fromRelationship = (
    parent: string,
    edge: Relationship
): MxObject => {
    return {
        _placeholders: "1",
        _c4Type: "Relationship",
        _c4Technology: edge.technology?.map(x => x.name).join('/'),
        _c4Description: edge.description,
        _label: relationshipHtmlBuilder(edge),
        _id: `${edge.sourceIdentifier}_${edge.targetIdentifier}`,
        mxCell: {
            _edge: "1",
            _parent: parent,
            _source: edge.sourceIdentifier,
            _target: edge.targetIdentifier,
            _style: formatEdgeStyle({
                endArrow: EdgeArrowType.BlockThin,
                endFill: 1,
                elbow: "vertical",
                endSize: 14,
                fontSize: 10,
                fontColor: "#404040",
                html: true,
                jumpStyle: "arc",
                jumpSize: 16,
                metaEdit: true,
                rounded: false,
                strokeWidth: 1,
                strokeColor: "#828282",
                startSize: 14
            }),
            mxGeometry: {
                mxPoint: [
                    { _as: MXPointAs.SourcePoint },
                    { _as: MXPointAs.TargetPoint }
                ],
                _width: "240",
                _relative: "1",
                _as: MXGeometryAs.Geometry
            }
        }
    }
}

const createDefaultDiagram = (
    name?: string,
    mxCells?: MXCell[],
    mxObjects?: MxObject[]
): Diagram => {

    return {
        _id: v4(),
        _name: name ?? "diagram",
        mxGraphModel: {
            _grid: "1",
            _gridSize: "10",
            _guides: "1",
            _tooltips: "1",
            _connect: "1",
            _arrows: "1",
            _fold: "1",
            _page: "0",
            _pageScale: "1",
            _pageWidth: "1000",
            _pageHeight: "1000",
            _math: "0",
            _shadow: "0",
            root: {
                mxCell: mxCells ?? [],
                object: mxObjects ?? []
            }
        }
    };
}

const relationshipInView = (
    relationship: Relationship,
    layout: Layout
) => {
    return layout[relationship.sourceIdentifier]
        && layout[relationship.targetIdentifier];
}

const fromSystemContextView = (
    workspace: Workspace,
    view: SystemContextView
): Diagram => {
    const defaultParent: MXCell = {
        _id: v4()
    };
    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };
    const softwareSystem = findSoftwareSystem(workspace, view.softwareSystemIdentifier);
    const mxObjects = [
        fromSoftwareSystem(defaultParent1._id, softwareSystem, view.layout),
        ...view.people.map(person => fromPerson(defaultParent1._id, person, view.layout)),
        ...view.softwareSystems.map(system => fromSoftwareSystem(defaultParent1._id, system, view.layout)),
        ...workspace.model.relationships
            .filter(rel => relationshipInView(rel, view.layout))
            .map(rel => fromRelationship(defaultParent1._id, rel))
    ];
    return createDefaultDiagram(view.title, [defaultParent, defaultParent1], mxObjects);
}

const fromContainerView = (
    workspace: Workspace,
    view: ContainerView
): Diagram => {
    const defaultParent: MXCell = {
        _id: v4()
    };
    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };
    const softwareSystem = findSoftwareSystem(workspace, view.softwareSystemIdentifier);
    const mxObjects = [
        fromSoftwareSystemScope(defaultParent1._id, softwareSystem, view.layout),
        ...view.containers?.map(container => fromContainer(defaultParent1._id, container, view.layout)) ?? [],
        ...view.people.map(person => fromPerson(defaultParent1._id, person, view.layout)),
        ...view.softwareSystems.map(system => fromSoftwareSystem(defaultParent1._id, system, view.layout)),
        ...workspace.model.relationships
            .filter(rel => relationshipInView(rel, view.layout))
            .map(rel => fromRelationship(defaultParent1._id, rel))
    ];
    return createDefaultDiagram(view.title, [defaultParent, defaultParent1], mxObjects);
}

const fromComponentView = (
    workspace: Workspace,
    view: ComponentView
): Diagram => {
    const defaultParent: MXCell = {
        _id: v4()
    };
    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };
    const container = findContainer(workspace, view.containerIdentifier);
    const mxObjects = [
        fromContainerScope(defaultParent1._id, container, view.layout),
        ...view.components?.map(component => fromComponent(defaultParent1._id, component, view.layout)) ?? [],
        ...view.people.map(person => fromPerson(defaultParent1._id, person, view.layout)),
        ...view.softwareSystems.map(system => fromSoftwareSystem(defaultParent1._id, system, view.layout)),
        ...view.containers.map(container => fromContainer(defaultParent1._id, container, view.layout)),
        ...workspace.model.relationships
            .filter(rel => relationshipInView(rel, view.layout))
            .map(rel => fromRelationship(defaultParent1._id, rel))
    ];
    return createDefaultDiagram(view.title, [defaultParent, defaultParent1], mxObjects);
}

const fromDeploymentView = (
    workspace: Workspace,
    view: DeploymentView
): Diagram => {
    const defaultParent: MXCell = {
        _id: v4()
    };
    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };

    const flatMapDeploymentNode = (parentDeploymentNode: DeploymentNode) => {
        return [
            fromDeploymentNodeScope(defaultParent1._id, parentDeploymentNode, view.layout),
            ...parentDeploymentNode.deploymentNodes
                ?.flatMap(childDeploymentNode => flatMapDeploymentNode(childDeploymentNode)) ?? [],
            ...parentDeploymentNode.softwareSystemInstances
                ?.flatMap(instance => fromSoftwareSystem(
                    defaultParent1._id,
                    {
                        ...findSoftwareSystem(workspace, instance.softwareSystemIdentifier),
                        identifier: instance.identifier
                    },
                    view.layout
                )) ?? [],
            ...parentDeploymentNode.containerInstances
                ?.flatMap(instance => fromContainer(
                    defaultParent1._id,
                    {
                        ...findContainer(workspace, instance.containerIdentifier),
                        identifier: instance.identifier
                    },
                    view.layout
                )) ?? [],
        ];
    }

    const mxObjects = [
        ...view.deploymentNodes.flatMap(dn => flatMapDeploymentNode(dn)),
        ...workspace.model.relationships
            .filter(rel => relationshipInView(rel, view.layout))
            .map(rel => fromRelationship(defaultParent1._id, rel)),
    ];
    return createDefaultDiagram(view.title, [defaultParent, defaultParent1], mxObjects);
}

export function exportToDrawio(workspace: Workspace): File {
    const drawio: Drawio = {
        mxfile: {
            _modified: new Date(),
            _etag: v4(),
            _compressed: false,
            _pages: "1",
            _agent: "Reverse Architecture (Web)",
            _host: "reversearchitecture.io",
            _type: "browser",
            diagram: [
                ...workspace.views.systemContexts.map(view => fromSystemContextView(workspace, view)),
                ...workspace.views.containers.map(view => fromContainerView(workspace, view)),
                ...workspace.views.components.map(view => fromComponentView(workspace, view)),
                ...workspace.views.deployments.map(view => fromDeploymentView(workspace, view))
            ]
        }
    };

    const xmlBuilder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: "_",
        format: true,
        suppressEmptyNode: true
    });
    
    const xml = xmlBuilder.build(drawio);
    const filename = workspace.name ?? "Workspace";
    return new File([xml], `${filename}.drawio`);
}
