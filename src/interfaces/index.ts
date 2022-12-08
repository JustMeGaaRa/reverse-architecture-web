export interface Technology {
  name: string;
}

export interface Abstraction {
  id: string;
  type: string;
  title: string;
  technologies?: Array<string>;
  description?: string;
}

export interface Relationship {
  sourceElementId: string;
  targetElementId: string;
  title?: string;
  technologies?: Array<string>;
}

export interface Diagram {
  diagramId: string;
  scope?: Abstraction;
  primaryElements: Array<Abstraction>;
  supportingElements: Array<Abstraction>;
  relationships: Array<Relationship>;
}

export interface DiagramLayout {
  [key: string]: { x: number; y: number };
}
