import { IViewDefinitionMetadata, IWorkspaceSnapshot, ViewDefinition } from "@structurizr/dsl";

export enum EventName {
	EDITOR_DOCUMENT_CHANGED = "document-changed",
	EDITOR_WORKSPACE_PARSED = "workspace-changed",
	EDITOR_WORKSPACE_VIEW_SET = "workspace-view-set",
	EDITOR_SELECTION_CHANGED = "selection-changed",
	WORKSPACE_ELEMENT_HOVERED = "element-hovered",
	WORKSPACE_VIEW_CHANGED = "view-changed",
	EDITOR_WORKSPACE_LAYOUT_COMPUTED = "view-layout-computed"
}

export type Event<T extends string, P = any> = { type: T } & P;

export type VscodeExtensionEvent = 
	| Event<EventName.EDITOR_DOCUMENT_CHANGED, { structurizr: string }>
	| Event<EventName.EDITOR_WORKSPACE_PARSED, { workspace: IWorkspaceSnapshot }>
	| Event<EventName.EDITOR_WORKSPACE_VIEW_SET, { workspace: IWorkspaceSnapshot, view: ViewDefinition }>
	| Event<EventName.EDITOR_WORKSPACE_LAYOUT_COMPUTED, { view: ViewDefinition, metadata: IViewDefinitionMetadata }>
	| Event<EventName.WORKSPACE_VIEW_CHANGED, { view: ViewDefinition }>
