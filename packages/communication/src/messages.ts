import { Range } from "vscode";

export enum MessageType {
	DOCUMENT_CHANGED = "document-changed",
	SELECTION_CHANGED = "selection-changed",
	ELEMENT_HOVERED = "element-hovered"
}

export type Event<T extends string, P = any> = {
    type: T;
} & P;

export type TextEditorEvent = 
	| Event<MessageType.DOCUMENT_CHANGED, { structurizr: string }>
	| Event<MessageType.SELECTION_CHANGED, { range: Array<Range> }>;

export type WorkspaceEvent =
	| Event<MessageType.ELEMENT_HOVERED, { range: Array<Range> }>;