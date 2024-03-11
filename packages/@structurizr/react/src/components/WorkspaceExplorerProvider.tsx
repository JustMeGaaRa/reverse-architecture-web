import { WorkspaceInfo } from "@structurizr/y-workspace";
import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceExplorerContext } from "../contexts";

export const WorkspaceExplorerProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspaces, setWorkspaces ] = useState<Array<WorkspaceInfo>>([]);

    return (
        <WorkspaceExplorerContext.Provider
            value={{
                workspaces,
                setWorkspaces,
            }}
        >
            {children}
        </WorkspaceExplorerContext.Provider>
    )
}