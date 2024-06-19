import { IViewDefinitionMetadata, IWorkspaceSnapshot } from "@structurizr/dsl";
import { EventName, TextEditorEvent, WorkspacePreviewEvent } from "../types";

export const createEditorDocumentChangedEvent = (structurizr: string): TextEditorEvent => {
    return { type: EventName.EDITOR_DOCUMENT_CHANGED, structurizr };
};

export const createEditorWorkspaceChangedEvent = (workspace: IWorkspaceSnapshot): TextEditorEvent => {
    return { type: EventName.EDITOR_WORKSPACE_CHANGED, workspace };
};

export const createWorkspaceViewChangedEvent = (workspace: IWorkspaceSnapshot): WorkspacePreviewEvent => {
    return { type: EventName.WORKSPACE_VIEW_CHANGED, workspace };
};

export const createWorkspaceLayoutComputedEvent = (metadata: IViewDefinitionMetadata): TextEditorEvent => {
    return { type: EventName.WORKSPACE_LAYOUT_COMPUTED, metadata };
};
