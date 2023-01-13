import { v4 } from "uuid";
import { XMLBuilder } from "fast-xml-parser";
import { Abstraction, Diagram, Relationship } from "../types";
import { NODE_HEIGHT, NODE_WIDTH } from "../utils";
import { bold, br, font, html, text } from "../../../utils/HtmlBuilder";
import { MXGeometryAs, MXCell, MXPointAs, Drawio } from "../../../utils/MxFile";
import { formatNodeTechnologies, formatEdgeTechnologies } from "../LabelTypes";

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
    rounded: boolean;
    whiteSpace: NodeWhiteSpaceType;
    html: boolean;
    fillColor: string;
    strokeColor: string;
    fontColor: string;
    align: NodeHorizontalAlign;
    verticalAlign: NodeVerticalAlign;
    comic: boolean;
    resizable: boolean;
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
}

const formatStyle = <T>(defaultStyle: T, style: Partial<T>) => {
    const updatedStyle = {
        ...defaultStyle,
        ...style
    };
    const formatType = (value) => typeof value == "boolean" ? value ? "1" : "0" : value
    return Object.keys(updatedStyle)
        .map(key => `${key}=${formatType(updatedStyle[key])}`)
        .join(";");
}

const formatNodeStyle = (style: Partial<NodeStyle>) => {
    return formatStyle({
        rounded: true,
        whiteSpace: NodeWhiteSpaceType.Wrap,
        html: true,
        fillColor: "#0050EF",
        strokeColor: "#3700CC",
        fontColor: "#FFFFFF",
        align: NodeHorizontalAlign.Center,
        verticalAlign: NodeVerticalAlign.Middle,
        comic: false,
        resizable: false,
    }, style);
}

const formatEdgeStyle = (style: Partial<EdgeStyle>) => {
    return formatStyle({
        endArrow: EdgeArrowType.Classic,
        html: true,
        rounded: false,
        flowAnimation: false,
        labelBackgroundColor: "#FFFFFF",
        dashed: true,
        edgeStyle: EdgeStyleType.StraightEdgeStyle,
        curved: true
    }, style);
}

const getAbstractionBgColor = (code: string) => {
    const nodesBgColors = {
        ["software-system"]: "#6A00FF",
        ["container"]: "#0050EF",
        ["component"]: "#1BA1E2",
        ["database"]: "#60A917",
        ["person"]: "#60A917"
    };
    return nodesBgColors[code];
}

export function fromDiagram(
    diagram: Diagram,
    serializeNodeData?: (node: Abstraction) => string,
    serializeEdgeData?: (edge: Relationship) => string
): Drawio {
    const defaultParent: MXCell = {
        _id: v4()
    };

    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };

    const fromScope = (node: Abstraction): MXCell => {
        return {
            _id: node.abstractionId,
            _parent: defaultParent1._id,
            _value: serializeNodeData
                ? serializeNodeData(node)
                : JSON.stringify(node),
            _style: formatNodeStyle({
                    fillColor: "#F5F5F5",
                    fontColor: "#333333",
                    strokeColor: "#666666",
                    align: NodeHorizontalAlign.Left,
                    verticalAlign: NodeVerticalAlign.Bottom,
                    rounded: false
                }),
            _vertex: "1",
            mxGeometry: {
                _x: diagram.positions[node.abstractionId].x.toString(),
                _y: diagram.positions[node.abstractionId].y.toString(),
                _width: NODE_WIDTH.toString(),
                _height: NODE_HEIGHT.toString(),
                _as: MXGeometryAs.Geometry
            }
        };
    }
    
    const fromNode = (node: Abstraction): MXCell => {
        return {
            _id: node.abstractionId,
            _parent: defaultParent1._id,
            _value: serializeNodeData
                ? serializeNodeData(node)
                : JSON.stringify(node),
            _style: formatNodeStyle({
                    fillColor: getAbstractionBgColor(node.type.code)
                }),
            _vertex: "1",
            mxGeometry: {
                _x: diagram.positions[node.abstractionId].x.toString(),
                _y: diagram.positions[node.abstractionId].y.toString(),
                _width: NODE_WIDTH.toString(),
                _height: NODE_HEIGHT.toString(),
                _as: MXGeometryAs.Geometry
            }
        };
    };

    const fromEdge = (edge: Relationship): MXCell => {
        return {
            _id: edge.relationshipId,
            _parent: defaultParent1._id,
            _value: serializeEdgeData
                ? serializeEdgeData(edge)
                : JSON.stringify(edge),
            _style: formatEdgeStyle({
                    flowAnimation: false
                }),
            _edge: "1",
            _source: edge.sourceElementId,
            _target: edge.targetElementId,
            mxGeometry: {
                mxPoint: [
                    {
                        _x: diagram.positions[edge.sourceElementId].x.toString() ?? "",
                        _y: diagram.positions[edge.sourceElementId].y.toString() ?? "",
                        _as: MXPointAs.SourcePoint
                    },
                    {
                        _x: diagram.positions[edge.targetElementId].x.toString() ?? "",
                        _y: diagram.positions[edge.targetElementId].y.toString() ?? "",
                        _as: MXPointAs.TargetPoint
                    }
                ],
                _width: "50",
                _height: "50",
                _relative: "1",
                _as: MXGeometryAs.Geometry
            }
        };
    };

    const drawio: Drawio = {
        mxfile: {
            _modified: new Date().toUTCString(),
            _etag: v4(),
            _compressed: false,
            _pages: "1",
            diagram: [
                {
                    _id: v4(),
                    _name: "diagram",
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
                            mxCell: [
                                defaultParent,
                                defaultParent1,
                                fromScope(diagram.scope),
                                ...diagram.primaryElements.map(fromNode),
                                ...diagram.supportingElements.map(fromNode),
                                ...diagram.relationships.map(fromEdge)
                            ]
                        }
                    }
                }
            ]
        }
    };

    return drawio;
}

export function exportToDrawio(diagram: Diagram): string {
    
    const nodeDataSerializer = (node: Abstraction) => {
        const htmlObject = html(
            bold(
                text(node.title)
            ),
            br(),
            font(
                { fontSize: 10 },
                text(formatNodeTechnologies(node)),
                br(),
                br(),
                text(node.description)
            )
        );
        return htmlObject.toHtml();
    };
    const edgeDataSerializer = (edge: Relationship) => {
        const htmlObject = html(
            text(edge.title),
            br(),
            font(
                { fontSize: 10 },
                text(formatEdgeTechnologies(edge))
            )
        );
        return htmlObject.toHtml();
    };

    const drawio = fromDiagram(
        diagram,
        nodeDataSerializer,
        edgeDataSerializer
    );
    const xml = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: "_",
        format: true,
        suppressEmptyNode: true
    });
    
    return xml.build(drawio);
}
