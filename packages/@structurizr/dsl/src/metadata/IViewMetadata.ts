export interface IViewMetadata {
    identifier: string;
    key?: string;
    elements: Array<IElementPosition>;
    relationships: Array<IRelationshipPosition>;
}

export interface IElementPosition {
    id: string;
    x: number;
    y: number;
}

export interface IRelationshipPosition {
    id: string;
}
