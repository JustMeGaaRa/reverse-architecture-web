import "./c4-diagram.scss";

import React, { CSSProperties, FC, useCallback, useRef, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Connection,
  ConnectionMode,
  Background,
  Controls,
  MarkerType,
  Panel,
  XYPosition,
  ReactFlowInstance,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { C4ScopeNode } from "./c4-scope-node";
import { C4AbstractionNode } from "./c4-abstraction-node";
import { C4DatabaseNode } from "./c4-database-node";
import { C4FloatingEdge } from "./c4-floating-edge";
import { C4ElementPlaceholder } from "./c4-element-placeholder";
import {
  Abstraction,
  Diagram,
  DiagramLayout,
  Relationship
} from "../../interfaces";
import * as utils from "./DiagramUtils";

const nodeTypes = {
  abstraction: C4AbstractionNode,
  database: C4DatabaseNode,
  scope: C4ScopeNode
};

const edgeTypes = {
  floating: C4FloatingEdge
};

const elementWidth = 240;
const elementHeight = 150;
const elementDefaultStyle: CSSProperties = {
  width: elementWidth,
  height: elementHeight
};

const mapToNode = (
  element: Abstraction,
  position: XYPosition,
  parentId?: string
): Node<Abstraction> => {
  return {
    id: element.id,
    position: position,
    type: utils.mapToNodeType(element.type),
    data: element,
    parentNode: parentId,
    style: elementDefaultStyle
  };
};

const mapToEdge = (relationship: Relationship): Edge<Relationship> => {
  const markerEndStyle = {
    type: MarkerType.ArrowClosed,
    color: "#000000",
    width: 10,
    height: 10
  };
  const edgeDefaultStyle = { strokeWidth: 2 };

  return {
    id: `${relationship.sourceElementId}-${relationship.targetElementId}`,
    type: "floating",
    source: relationship.sourceElementId,
    target: relationship.targetElementId,
    animated: true,
    markerEnd: markerEndStyle,
    style: edgeDefaultStyle,
    data: relationship
  };
};

const mapDiagramToNodes = (diagram: Diagram, layout: DiagramLayout) => {
  const parentId = diagram.scope === undefined ? undefined : diagram.scope.id;
  const scopeDefaultStyle = { width: 480, height: 870 };

  const mapScopeElement = (scope: Abstraction) => {
    return {
      id: scope.id,
      position: layout[scope.id],
      type: "scope",
      data: scope,
      style: scopeDefaultStyle
    };
  };
  const mapPrimaryElement = (element: Abstraction) =>
    mapToNode(element, layout[element.id], parentId);
  const mapSupportingElement = (element: Abstraction) =>
    mapToNode(element, layout[element.id]);

  const nodes =
    diagram.scope === undefined
      ? Array.of<Node<Abstraction>>()
      : Array.of<Node<Abstraction>>(mapScopeElement(diagram.scope));

  return nodes
    .concat(diagram.primaryElements.map(mapPrimaryElement))
    .concat(diagram.supportingElements.map(mapSupportingElement));
};

const mapDiagramToEdges = (diagram: Diagram) => {
  return diagram.relationships.map<Edge<Relationship>>(mapToEdge);
};

type ReactFlowType = ReactFlowInstance<Abstraction, Relationship>;

export const C4Diagram: FC<{ diagram: Diagram; layout: DiagramLayout }> = ({
  diagram,
  layout
}) => {
  const initialNodes = mapDiagramToNodes(diagram, layout);
  const initialEdges = mapDiagramToEdges(diagram);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowRef = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowType>(
    null
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: any, newConnection: any) =>
      setEdges((edges) => updateEdge(oldEdge, newConnection, edges)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((edges) => addEdge(params, edges));
    },
    [setEdges]
  );

  const onInit = useCallback((reactFlowInstance: ReactFlowType) => {
    setReactFlowInstance(reactFlowInstance);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const elementType = event.dataTransfer.getData("application/reactflow");
      if (elementType === undefined || !elementType) {
        return;
      }

      if (reactFlowRef.current === undefined || !reactFlowRef.current) {
        return;
      }

      const reactFlowBounds = reactFlowRef.current.getBoundingClientRect();
      const elementPosition = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left - elementWidth / 2,
        y: event.clientY - reactFlowBounds.top - elementHeight / 2
      });

      const element: Abstraction = {
        id: uuidv4(),
        title: elementType,
        type: elementType,
        description: "Description"
      };

      setNodes((nodes) => nodes.concat(mapToNode(element, elementPosition)));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onConnect={onConnect}
      onInit={onInit}
      onDragOver={onDragOver}
      onDrop={onDrop}
      ref={reactFlowRef}
      connectionMode={ConnectionMode.Loose}
      proOptions={{ hideAttribution: true }}
      fitView
    >
      <Background />
      <Controls />
      <Panel position="top-center">
        <div style={{ display: "flex", gap: "10px" }}>
          <C4ElementPlaceholder type="Software System" />
          <C4ElementPlaceholder type="Container" />
          <C4ElementPlaceholder type="Component" />
          <C4ElementPlaceholder type="Database" />
        </div>
      </Panel>
    </ReactFlow>
  );
};
