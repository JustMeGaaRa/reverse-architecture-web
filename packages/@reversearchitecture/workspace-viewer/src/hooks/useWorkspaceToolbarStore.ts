import { ElementType } from "@structurizr/dsl";
import { create } from "zustand";

export type WorkspaceToolbarState = {
    isSelectionEnabled: boolean;
    isDraggingEnabled: boolean;
    isAddingElementEnabled: boolean;
    addingElementType: ElementType;
    isConnectionLineEnabled: boolean;
    isTextEditEnabled: boolean;
    isMultiSelectEnabled: boolean;
    isCommentAddingEnabled: boolean;
    isPresentationEnabled: boolean;
    isAutoLayoutEnabled: boolean;
}

export const useWorkspaceToolbarStore = create<WorkspaceToolbarState>(() => ({
    isSelectionEnabled: true,
    isDraggingEnabled: false,
    isAddingElementEnabled: false,
    addingElementType: ElementType.Person,
    isConnectionLineEnabled: false,
    isTextEditEnabled: false,
    isMultiSelectEnabled: false,
    isCommentAddingEnabled: false,
    isPresentationEnabled: false,
    isAutoLayoutEnabled: false
}));