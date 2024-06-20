import { IViewDefinitionMetadata, IWorkspaceSnapshot, ViewDefinition } from "@structurizr/dsl";
import { EventName, VscodeExtensionEvent } from "./events";

export const createEditorDocumentChangedEvent = (structurizr: string): VscodeExtensionEvent => {
    return { type: EventName.EDITOR_DOCUMENT_CHANGED, structurizr };
};

export const createEditorWorkspaceParsedEvent = (workspace: IWorkspaceSnapshot): VscodeExtensionEvent => {
    return { type: EventName.EDITOR_WORKSPACE_PARSED, workspace };
};

export const createEditorWorkspaceViewSetEvent = (workspace: IWorkspaceSnapshot, view: ViewDefinition): VscodeExtensionEvent => {
    return { type: EventName.EDITOR_WORKSPACE_VIEW_SET, workspace, view };
};

export const createEditorWorkspaceLayoutComputedEvent = (view: ViewDefinition, metadata: IViewDefinitionMetadata): VscodeExtensionEvent => {
    return { type: EventName.EDITOR_WORKSPACE_LAYOUT_COMPUTED, view, metadata };
};

export const createWorkspaceViewChangedEvent = (view: ViewDefinition): VscodeExtensionEvent => {
    return { type: EventName.WORKSPACE_VIEW_CHANGED, view };
};
