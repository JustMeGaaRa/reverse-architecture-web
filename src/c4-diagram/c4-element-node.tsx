import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { C4Block } from "../components";
import { AbstractioInfo } from "../components/c4-abstraction-info";
import { Abstraction } from "../interfaces";

export const C4ElementNode: FC<NodeProps<Abstraction>> = ({ data }) => {
  return (
    <C4Block backgroundColor="#6A00FF">
      <AbstractioInfo
        type={data.type}
        title={data.title}
        technologies={data.technologies}
        description={data.description}
      />
      <Handle position={Position.Left} id="a" type={"source"} />
      <Handle position={Position.Top} id="b" type={"source"} />
      <Handle position={Position.Right} id="c" type={"target"} />
      <Handle position={Position.Bottom} id="d" type={"target"} />
    </C4Block>
  );
};
