import { XYPosition } from "reactflow";

export function mapToNodeColor(elementType: string) {
  const abstractionColorMap = new Map<string, string>([
    ["Software System", "#6A00FF"],
    ["Container", "#0050EF"],
    ["Component", "#1BA1E2"],
    ["Database", "#60A917"]
  ]);
  return abstractionColorMap.get(elementType);
}

export function mapToNodeType(elementType: string) {
  const nodeTypeMap = new Map<string, string>([
    ["Software System", "abstraction"],
    ["Container", "abstraction"],
    ["Component", "abstraction"],
    ["Database", "database"]
  ]);

  return nodeTypeMap.get(elementType);
}

export function getXAxisMinMax(
  current: { min: number; max: number },
  position: XYPosition
) {
  const valueX = position.x;
  current.min = valueX < current.min ? valueX : current.min ?? valueX;
  current.max = valueX > current.max ? valueX : current.max ?? valueX;
  return current;
}

export function getYAxisMinMax(
  current: { min: number; max: number },
  position: XYPosition
) {
  const valueY = position.y;
  current.min = valueY < current.min ? valueY : current.min ?? valueY;
  current.max = valueY > current.max ? valueY : current.max ?? valueY;
  return current;
}

export function getScopeStyle(diagram, layout) {
  const elementWidth = 240;
  const elementHeight = 150;
  // TODO: min values might be higher then zero, replace with first element value
  const defaultMinMax = {
    min: 0,
    max: 0
  };
  const xAxisMinMax = diagram.primaryElements.reduce(
    (axisMinMax, abstraction) =>
      getXAxisMinMax(axisMinMax, layout[abstraction.id]),
    defaultMinMax
  );
  const yAxisMinMax = diagram.primaryElements.reduce(
    (axisMinMax, abstraction) =>
      getYAxisMinMax(axisMinMax, layout[abstraction.id]),
    defaultMinMax
  );
  // max x offset + block width + left/right padding
  // max y offset + block height + top/bottom padding
  const scopeDefaultStyle = {
    width: xAxisMinMax.max + elementHeight + scopePadding * 2,
    height: yAxisMinMax.max + elementWidth + scopePadding * 5
  };
}
