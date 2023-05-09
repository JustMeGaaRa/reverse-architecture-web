export interface IVIewMetadata {
    identifier: string;
    key?: string;
    elements: Array<IElementPosition>;
}

export interface IElementPosition {
    id: string;
    x: number;
    y: number;
}