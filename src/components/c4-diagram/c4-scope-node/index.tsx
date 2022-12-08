import "./c4-scope-node.scss";
import "@reactflow/node-resizer/dist/style.css";

import { FC } from "react";
import { NodeProps } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";
import { Abstraction } from "../../../interfaces";
import { AbstractioInfo } from "../c4-abstraction-info";

export const C4ScopeNode: FC<NodeProps<Abstraction>> = ({ data, selected }) => {
  return (
    <div className="c4-scope-node">
      <AbstractioInfo data={data} align="left" />
      <NodeResizer
        color="grey"
        isVisible={selected}
        minWidth={280}
        minHeight={200}
      />
    </div>
  );
};
