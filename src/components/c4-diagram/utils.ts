import {
  Node,
  Edge,
  XYPosition,
  MarkerType
} from "reactflow";
import { v4 } from "uuid";
import { IRelationshipProps } from "./edges/C4FloatingEdge";
import { IAbstractionProps } from "./nodes/C4RectangleNode";
import { IScopeProps } from "./nodes/C4ScopeNode";
import {
  Abstraction,
  AbstractionTypeCode,
  Diagram,
  Relationship
} from "./types";

export enum NodeType {
  Block = "block",
  Person = "person",
  Cylinder = "cylinder",
  Scope = "scope"
};

export enum EdgeType {
  Floating = "floating"
};

export const NODE_WIDTH = 240;
export const NODE_HEIGHT = 150;

export const getDiagramNodes = (diagram: Diagram) => {
  if (diagram === null) return Array.of<Node<IAbstractionProps>>();
  
  const getScopeElement = (element) => {
    return createScope(
      element,
      diagram.positions[element.abstractionId])
  };
  const getPrimaryElement = (element) => {
    return createNode(
      element,
      diagram.positions[element.abstractionId],
      diagram.scope?.abstractionId);
  };
  const getSupportingElement = (element) => {
    return createNode(
      element,
      diagram.positions[element.abstractionId]);
  };

  const nodes =
    diagram.scope === undefined
      ? Array.of<Node<IAbstractionProps>>()
      : Array.of<Node<IAbstractionProps>>(getScopeElement(diagram.scope));

  return nodes
    .concat(diagram.primaryElements.map(getPrimaryElement))
    .concat(diagram.supportingElements.map(getSupportingElement));
};

export const getDiagramEdges = (diagram: Diagram) => {
  if (diagram === null) return Array.of<Edge<IRelationshipProps>>();
  return diagram.relationships.map<Edge<IRelationshipProps>>(createEdge);
};

export const getAbstractionName = (code: AbstractionTypeCode) => {
  const names = {
    [AbstractionTypeCode.SoftwareSystem]: "Software System",
    [AbstractionTypeCode.Container]: "Container",
    [AbstractionTypeCode.Component]: "Component",
    [AbstractionTypeCode.Person]: "Person"
  };
  return names[code];
}

export function getAbstractionBgColor(code: string) {
  const nodesBgColors = {
    [AbstractionTypeCode.SoftwareSystem]: "#6A00FF",
    [AbstractionTypeCode.Container]: "#0050EF",
    [AbstractionTypeCode.Component]: "#1BA1E2",
    [AbstractionTypeCode.Person]: "#60A917"
  };
  return nodesBgColors[code];
}

export function getNodeType(code: string) {
  const nodesTypes = {
    [AbstractionTypeCode.SoftwareSystem]: NodeType.Block,
    [AbstractionTypeCode.Container]: NodeType.Block,
    [AbstractionTypeCode.Component]: NodeType.Block,
    [AbstractionTypeCode.Person]: NodeType.Block
  };
  return nodesTypes[code];
}

export const createAbstraction = (
  abstractionTypeCode: AbstractionTypeCode
) => {
  return {
    abstractionId: v4(),
    title: getAbstractionName(abstractionTypeCode),
    type: {
      code: abstractionTypeCode,
      name: getAbstractionName(abstractionTypeCode)
    }
  };
};

export const createRelationship = (
  sourceId: string,
  targetId: string
): Relationship => {
  return {
    relationshipId: v4(),
    sourceElementId: sourceId,
    targetElementId: targetId
  };
};

export const createNode = (
  abstraction: Abstraction,
  abstractionPosition: XYPosition,
  parentId?: string
): Node<IAbstractionProps> => {
  return {
    id: abstraction.abstractionId,
    type: getNodeType(abstraction.type.code),
    data: {
      abstraction: abstraction,
      bgColor: getAbstractionBgColor(abstraction.type.code)
    },
    position: abstractionPosition,
    parentNode: parentId
  };
};

export const createScope = (
  abstraction: Abstraction,
  scopePosition: XYPosition
): Node<IScopeProps> => {
  return {
    id: abstraction.abstractionId,
    type: NodeType.Scope,
    data: {
      abstraction
    },
    position: scopePosition,
    style: {
      zIndex: -1
    }
  };
};

export const createEdge = (
  relationship: Relationship
): Edge<IRelationshipProps> => {
  return {
    id: relationship.relationshipId,
    type: EdgeType.Floating,
    data: {
      relationship,
    },
    source: relationship.sourceElementId,
    target: relationship.targetElementId,
    markerEnd: {
      type: MarkerType.Arrow
    }
  };
};

export const createEmptyDiagram = (): Diagram => {
  const abstractionId = v4();
  return {
      diagramId: v4(),
      title: "Diagram 1",
      scope: {
          abstractionId: abstractionId,
          type: {
              code: AbstractionTypeCode.SoftwareSystem,
              name: getAbstractionName(AbstractionTypeCode.SoftwareSystem)
          },
          title: getAbstractionName(AbstractionTypeCode.SoftwareSystem)
      },
      primaryElements: [],
      supportingElements: [],
      relationships: [],
      positions: {
          [abstractionId]: { x: 0, y: 0 }
      }
  };
}
