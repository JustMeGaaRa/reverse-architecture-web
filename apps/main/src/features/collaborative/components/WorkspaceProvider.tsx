import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceContext } from "../contexts";
import { Workspace } from "../types";

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState<Workspace>();

    return (
        <WorkspaceContext.Provider
            value={{
                workspace,
                setWorkspace
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    )
}