import { FC } from "react";
import { ReactFlowProvider } from "reactflow";
import { Box } from "@chakra-ui/react";
import { v4 } from "uuid";

import {
  C4Diagram,
  Diagram,
  AbstractionTypeCode,
  getAbstractionName
} from "../../components";

export const Sandbox: FC = () => {
  const abstractionId = v4();
  const emptyDiagram: Diagram = {
    diagramId: v4(),
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

  return (
    <ReactFlowProvider>
      <Box height="100vh">
        <C4Diagram
          diagram={emptyDiagram}
        />
      </Box>
    </ReactFlowProvider>
  );
};
