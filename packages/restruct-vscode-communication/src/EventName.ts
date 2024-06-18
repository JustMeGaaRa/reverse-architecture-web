import { Range } from "vscode";

export enum EventName {
	DOCUMENT_CHANGED = "document-changed",
	SELECTION_CHANGED = "selection-changed",
	ELEMENT_HOVERED = "element-hovered",
	VIEW_CHANGED = "view-changed",
	VIEW_LAYOUT_COMPUTED = "view-layout-computed"
}

export type Event<T extends string, P = any> = { type: T } & P;

export type TextEditorEvent = 
	| Event<EventName.DOCUMENT_CHANGED, { structurizr: string }>
	| Event<EventName.SELECTION_CHANGED, { range: Array<Range> }>
	| Event<EventName.VIEW_LAYOUT_COMPUTED, { nodes: Array<any>; edges: Array<any> }>;

export type WorkspacePreviewEvent =
	| Event<EventName.ELEMENT_HOVERED, { range: Array<Range> }>
	| Event<EventName.VIEW_CHANGED, { nodes: Array<any>; edges: Array<any> }>;