import { useEffect } from "react";
import { WorkspaceGroupInfo, WorkspaceInfo } from "../types";
import { useWorkspaceCollection } from "./useWorkspaceCollection";

export const useOnWorkspaceSelected = (callback: (workspaces: Array<WorkspaceInfo | WorkspaceGroupInfo>) => void) => {
    const { selected } = useWorkspaceCollection();
    useEffect(() => callback?.(selected), [selected, callback]);
}