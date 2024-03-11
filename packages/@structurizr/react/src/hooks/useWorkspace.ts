import { useContext } from "react";
import { WorkspaceContext } from "../contexts";

export const useWorkspace = () => {
    return useContext(WorkspaceContext);
}