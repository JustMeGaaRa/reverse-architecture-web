import { useContext } from "react"
import { WorkspaceExplorerContext, WorkspaceSelectionContext } from "../contexts";

export const useWorkspaceSelectionStore = () => {
    return useContext(WorkspaceSelectionContext);
}