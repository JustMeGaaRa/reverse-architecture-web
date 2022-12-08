import "./c4-database-node.scss";

import { FC } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { AbstractioInfo } from "../c4-abstraction-info";
import { Abstraction } from "../../../interfaces";

export const C4DatabaseNode: FC<NodeProps<Abstraction>> = ({ data }) => {
  return (
    <div className="c4-database-node">
      <AbstractioInfo
        data={data}
        align="center"
        showTechnologies
        showDescription
      />
      <Handle position={Position.Left} id="a" type={"source"} />
      <Handle position={Position.Top} id="b" type={"source"} />
      <Handle position={Position.Right} id="c" type={"source"} />
      <Handle position={Position.Bottom} id="d" type={"source"} />
    </div>
  );
};
