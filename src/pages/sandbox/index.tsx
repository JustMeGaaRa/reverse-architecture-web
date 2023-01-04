import { FC } from "react";
import { ReactFlowProvider } from "reactflow";
import { Box } from "@chakra-ui/react";
import { C4Diagram } from "../../components";

import ContainerDiagram from "../../contracts/ContainerDiagramClassic.json";

export const Sandbox: FC = () => {
  const technologies = [".NET", "React.js", "Java", "Spring MVC", "HTTPS", "JSON", "WebSocket", "XML", "TCP"];

  return (
    <ReactFlowProvider>
      <Box height="100vh">
        <C4Diagram
          diagram={ContainerDiagram}
          technologies={technologies}
        />
      </Box>
    </ReactFlowProvider>
  );
};
