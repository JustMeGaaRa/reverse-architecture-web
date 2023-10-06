import { ElementType } from "@structurizr/dsl";
import { create } from "zustand";

export type WorkspaceToolbarState = {
    isSelectionEnabled: boolean;
    isDraggingEnabled: boolean;
    isTextEditEnabled: boolean;
    isConnectionLineEnabled: boolean;
    isMultiSelectEnabled: boolean;
    isCommentAddingEnabled: boolean;
    isPresentationEnabled: boolean;
    isAutoLayoutEnabled: boolean;
    isAddingElementEnabled: boolean;
    addingElementType: ElementType;
}

export const useWorkspaceToolbarStore = create<WorkspaceToolbarState>(() => ({
    isSelectionEnabled: true,
    isDraggingEnabled: false,
    isTextEditEnabled: false,
    isConnectionLineEnabled: false,
    isMultiSelectEnabled: false,
    isCommentAddingEnabled: false,
    isPresentationEnabled: false,
    isAutoLayoutEnabled: false,
    isAddingElementEnabled: false,
    addingElementType: ElementType.Person,
}));