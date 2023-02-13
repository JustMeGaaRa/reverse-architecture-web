import { ReactFlowJsonObject, Node, Edge } from "@reactflow/core";
import { v4 } from "uuid";
import { XMLBuilder } from "fast-xml-parser";
import { ElementNodeWrapperProps } from "../../components/c4-view-renderer/components/Nodes/ElementNode";
import { RelationshipEdgeWrapperProps } from "../../components/c4-view-renderer/components/Edges/RelationshipEdge";
import { formatElementTechnology } from "../../components/c4-view-renderer/components/Labels/ElementLabel";
import { formatRelationshipTechnology } from "../../components/c4-view-renderer/components/Labels/RelationshipLabel";
import { bold, br, font, html, text } from "../../utils/HtmlBuilder";
import { MXGeometryAs, MXCell, MXPointAs, Drawio } from "../../utils/MxFile";
import { Element, Relationship } from "../../dsl";

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

// TODO: replace this mapping with Style object
const getElementBgColor = (type: string) => {
    const nodesBgColors = {
        ["Scope"]: "#F5F5F5",
        ["Person"]: "#38A169",
        ["Software System"]: "#6B46C1",
        ["Container"]: "#3182ce",
        ["Component"]: "#90cdf4",
    };
    return nodesBgColors[type];
}

export function fromDiagram(
    flow: ReactFlowJsonObject<ElementNodeWrapperProps, RelationshipEdgeWrapperProps>,
    serializeNodeData?: (node: Element) => string,
    serializeEdgeData?: (edge: Relationship) => string
): Drawio {

    const defaultParent: MXCell = {
        _id: v4()
    };

    const defaultParent1: MXCell = {
        _id: v4(),
        _parent: defaultParent._id
    };

    const fromScope = (node: Node<ElementNodeWrapperProps>): MXCell => {
        return {
            _id: node.id,
            _parent: defaultParent1._id,
            _value: serializeNodeData
                ? serializeNodeData(node.data.element)
                : JSON.stringify(node.data.element),
            _style: formatNodeStyle({
                    fillColor: getElementBgColor("Scope"),
                    fontColor: "#333333",
                    strokeColor: "#666666",
                    align: NodeHorizontalAlign.Left,
                    verticalAlign: NodeVerticalAlign.Bottom,
                    rounded: false
                }),
            _vertex: "1",
            mxGeometry: {
                _x: node.positionAbsolute.x.toString(),
                _y: node.positionAbsolute.y.toString(),
                _width: node.width?.toString() ?? (node.style?.width?.toString() ?? ""),
                _height: node.height?.toString() ?? (node.style?.height?.toString() ?? ""),
                _as: MXGeometryAs.Geometry
            }
        };
    }
    
    const fromNode = (node: Node<ElementNodeWrapperProps>): MXCell => {
        return {
            _id: node.id,
            _parent: defaultParent1._id,
            _value: serializeNodeData
                ? serializeNodeData(node.data.element)
                : JSON.stringify(node.data.element),
            _style: formatNodeStyle({
                    fillColor: getElementBgColor(node.data.element.tags[1].name)
                }),
            _vertex: "1",
            mxGeometry: {
                _x: node.positionAbsolute.x.toString(),
                _y: node.positionAbsolute.y.toString(),
                _width: node.width?.toString() ?? (node.style?.width?.toString() ?? ""),
                _height: node.height?.toString() ?? (node.style?.height?.toString() ?? ""),
                _as: MXGeometryAs.Geometry
            }
        };
    };

    const fromEdge = (edge: Edge<RelationshipEdgeWrapperProps>): MXCell => {
        return {
            _id: edge.id,
            _parent: defaultParent1._id,
            _value: serializeEdgeData
                ? serializeEdgeData(edge.data.relationship)
                : JSON.stringify(edge.data.relationship),
            _style: formatEdgeStyle({
                    flowAnimation: false
                }),
            _edge: "1",
            _source: edge.source,
            _target: edge.target,
            mxGeometry: {
                mxPoint: [
                    {
                        _x: edge.sourceNode?.position.x.toString() ?? "",
                        _y: edge.sourceNode?.position.y.toString() ?? "",
                        _as: MXPointAs.SourcePoint
                    },
                    {
                        _x: edge.targetNode?.position.x.toString() ?? "",
                        _y: edge.targetNode?.position.y.toString() ?? "",
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
                                ...flow.nodes.filter(x => x.type === "scope").map(fromScope),
                                ...flow.nodes.filter(x => x.type !== "scope").map(fromNode),
                                ...flow.edges.map(fromEdge)
                            ]
                        }
                    }
                }
            ]
        }
    };

    return drawio;
}

export function exportToDrawio(
    filename: string,
    flow: ReactFlowJsonObject<ElementNodeWrapperProps, RelationshipEdgeWrapperProps>
): File {
    const nodeDataSerializer = (node: Element) => {
        const htmlObject = html(
            bold(
                text(node.name)
            ),
            br(),
            font(
                { fontSize: 10 },
                text(formatElementTechnology(node)),
                br(),
                br(),
                text(node.description)
            )
        );
        return htmlObject.toHtml();
    };
    const edgeDataSerializer = (edge: Relationship) => {
        const htmlObject = html(
            text(edge.description),
            br(),
            font(
                { fontSize: 10 },
                text(formatRelationshipTechnology(edge))
            )
        );
        return htmlObject.toHtml();
    };

    const drawio = fromDiagram(
        flow,
        nodeDataSerializer,
        edgeDataSerializer
    );
    const xmlBuilder = new XMLBuilder({
        ignoreAttributes: false,
        attributeNamePrefix: "_",
        format: true,
        suppressEmptyNode: true
    });
    
    const xml = xmlBuilder.build(drawio);
    return new File([xml], `${filename}.drawio`);
}
