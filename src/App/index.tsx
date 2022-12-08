import "./app.css";

import { ReactFlowProvider } from "reactflow";
import { C4Diagram } from "../components";
import SystemContextDiagram from "../contracts/SystemContextDiagram.json";
import SystemContextDiagramLayout from "../contracts/SystemContextDiagram.layout.json";
import ContainerDiagram from "../contracts/ContainerDiagram.json";
import ContainerDiagramLayout from "../contracts/ContainerDiagram.layout.json";

const ReactFlowWrapper = (props: any) => {
  return (
    <ReactFlowProvider>
      <C4Diagram
        {...props}
        diagram={SystemContextDiagram}
        layout={SystemContextDiagramLayout}
      />
    </ReactFlowProvider>
  );
};

export default ReactFlowWrapper;
