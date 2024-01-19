import { ElementType } from "@structurizr/dsl";
import { create } from "zustand";

export type WorkspaceToolbarState = {
    enabledTool:
        "dragging"
        | "selection"
        | "adding-element"
        | "text-edit"
        | "connection"
        | "commenting",
    addingElementType?: ElementType;

    setEnabledTool: (tool: WorkspaceToolbarState["enabledTool"]) => void;
    setAddingElementType: (type?: ElementType) => void;
}

export const useWorkspaceToolbarStore = create<WorkspaceToolbarState>((set) => ({
    enabledTool: "selection",
    addingElementType: undefined,

    setEnabledTool: (tool: WorkspaceToolbarState["enabledTool"]) => {
        set((state) => ({
            ...state,
            enabledTool: tool
        }));
    },
    setAddingElementType: (type: ElementType | undefined) => {
        set((state) => ({
            ...state,
            addingElementType: type
        }));
    }
}));

export const StoreModeSelector = (state: WorkspaceToolbarState) => ({
    isSelectionEnabled: state.enabledTool === "selection",
    isDraggingEnabled: state.enabledTool === "dragging",
    isAddingElementEnabled: state.enabledTool === "adding-element",
    isTextEditEnabled: state.enabledTool === "text-edit",
    isConnectionLineEnabled: state.enabledTool === "connection",
    isCommentAddingEnabled: state.enabledTool === "commenting",
})