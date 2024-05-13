import { ElementType } from "@structurizr/dsl";
import { create } from "zustand";

export enum WorkspaceToolName {
    Explore = "explore",
    ElementSelect = "element-select",
    ElementDrop = "element-drop",
    ElementConnect = "element-connect",
    EditText = "edit-text",
    Comment = "comment"
}

export type WorkspaceToolbarState = {
    selectedTool: WorkspaceToolName,
    selectedElementType?: ElementType;

    setSelectedTool: (tool: WorkspaceToolName) => void;
    setSelectedElementType: (type?: ElementType) => void;
}

export const useWorkspaceActionsToolbar = create<WorkspaceToolbarState>((set) => ({
    selectedTool: WorkspaceToolName.ElementSelect,
    selectedElementType: undefined,

    setSelectedTool: (tool: WorkspaceToolName) => {
        set((state) => ({ ...state, selectedTool: tool }));
    },
    setSelectedElementType: (type: ElementType | undefined) => {
        set((state) => ({ ...state, selectedElementType: type }));
    }
}));

export const StoreModeSelector = (state: WorkspaceToolbarState) => ({
    isExploreMode: state.selectedTool === WorkspaceToolName.Explore,
    isElementSelectMode: state.selectedTool === WorkspaceToolName.ElementSelect,
    isElementDropMode: state.selectedTool === WorkspaceToolName.ElementDrop,
    isElementConnectMode: state.selectedTool === WorkspaceToolName.ElementConnect,
    isTextEditModeEnabled: state.selectedTool === WorkspaceToolName.EditText,
    isCommentMode: state.selectedTool === WorkspaceToolName.Comment
})