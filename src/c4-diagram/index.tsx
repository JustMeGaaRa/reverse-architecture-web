import "./c4-diagram.scss";

import { FC, useCallback } from "react";
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Controls,
  MiniMap,
  Background
} from "reactflow";
import { C4ScopeNode } from "./c4-scope-node";
import { C4ElementNode } from "./c4-element-node";
import { Abstraction, Diagram } from "../interfaces";

const nodeTypes = {
  element: C4ElementNode,
  scope: C4ScopeNode
};

const mapDiagramToNodes = (diagram: Diagram) => {
  return Array.of<Node<Abstraction>>({
    id: diagram.scope.id,
    position: { x: 0, y: 0 },
    type: "scope",
    data: diagram.scope,
    style: {
      width: 1000,
      height: 700
    }
  })
    .concat(
      diagram.primaryElements.map((element) => ({
        id: element.id,
        position: { x: 0, y: 0 },
        type: "element",
        data: element,
        parentNode: diagram.scope.id,
        extent: "parent",
        style: {
          width: 320,
          height: 200
        }
      }))
    )
    .concat(
      diagram.supportingElements.map((element) => ({
        id: element.id,
        position: { x: 0, y: 0 },
        type: "element",
        data: element,
        style: {
          width: 320,
          height: 200
        }
      }))
    );
};

export const C4Diagram: FC<{ diagram: Diagram }> = ({ diagram }) => {
  const initialNodes = mapDiagramToNodes(diagram);
  const initialEdges = diagram.relationships.map((x) => ({
    id: `${x.sourceElementId}-${x.targetElementId}`,
    source: x.sourceElementId,
    target: x.targetElementId
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};
