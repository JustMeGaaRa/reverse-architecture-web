import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { Range } from "vscode";

export enum EventName {
	EDITOR_DOCUMENT_CHANGED = "document-changed",
	EDITOR_WORKSPACE_CHANGED = "workspace-changed",
	EDITOR_SELECTION_CHANGED = "selection-changed",
	WORKSPACE_ELEMENT_HOVERED = "element-hovered",
	WORKSPACE_VIEW_CHANGED = "view-changed",
	WORKSPACE_LAYOUT_COMPUTED = "view-layout-computed"
}

export type Event<T extends string, P = any> = { type: T } & P;

export type TextEditorEvent = 
	| Event<EventName.EDITOR_DOCUMENT_CHANGED, { structurizr: string }>
	| Event<EventName.EDITOR_SELECTION_CHANGED, { range: Array<Range> }>
	| Event<EventName.WORKSPACE_LAYOUT_COMPUTED, { nodes: Array<any>; edges: Array<any> }>
	| Event<EventName.EDITOR_WORKSPACE_CHANGED, { workspace: IWorkspaceSnapshot }>;

export type WorkspacePreviewEvent =
	| Event<EventName.WORKSPACE_ELEMENT_HOVERED, { range: Array<Range> }>
	| Event<EventName.WORKSPACE_VIEW_CHANGED, { nodes: Array<any>; edges: Array<any> }>;