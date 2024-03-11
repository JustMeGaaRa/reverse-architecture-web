import { useContext } from "react";
import { WorkspaceExplorerContext } from "../contexts";

export const useWorkspaceExplorer = () => {
    return useContext(WorkspaceExplorerContext);
}