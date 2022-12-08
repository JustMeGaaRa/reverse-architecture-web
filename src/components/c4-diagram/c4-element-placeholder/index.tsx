import { FC } from "react";
import * as utils from "../DiagramUtils";

export const C4ElementPlaceholder: FC<{ type: string }> = ({ type }) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", elementType);
    event.dataTransfer.effectAllowed = "move";
  };
  const draggableElementStyle = {
    width: "60px",
    height: "36px",
    color: "#ffffff",
    fontSize: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    backgroundColor: utils.mapToNodeColor(type)
  };

  return (
    <div onDragStart={(event) => onDragStart(event, type)} draggable>
      <div style={draggableElementStyle}>
        <span>{type}</span>
      </div>
    </div>
  );
};
