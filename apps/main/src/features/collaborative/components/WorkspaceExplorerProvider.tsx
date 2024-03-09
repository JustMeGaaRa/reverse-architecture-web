import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceExplorerContext } from "../contexts";
import { WorkspaceInfo } from "../types";

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