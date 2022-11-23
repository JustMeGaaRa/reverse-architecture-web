import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { C4Scope } from "../components";
import { Abstraction } from "../interfaces";

export const C4ScopeNode: FC<NodeProps<Abstraction>> = ({ data }) => {
  return (
    <C4Scope type={data.type} title={data.title}>
      <Handle position={Position.Left} id="a" type={"source"} />
      <Handle position={Position.Top} id="b" type={"source"} />
      <Handle position={Position.Right} id="c" type={"target"} />
      <Handle position={Position.Bottom} id="d" type={"target"} />
    </C4Scope>
  );
};
