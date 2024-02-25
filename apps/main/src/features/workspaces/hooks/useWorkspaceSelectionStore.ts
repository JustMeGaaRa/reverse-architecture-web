import { useContext } from "react"
import { WorkspaceCollectionContext } from "../contexts";

export const useWorkspaceSelectionStore = () => {
    return useContext(WorkspaceCollectionContext);
}