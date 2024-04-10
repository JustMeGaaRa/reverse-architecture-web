import { emptyWorkspace } from "@structurizr/dsl";
import { FC, PropsWithChildren, useState } from "react";
import { WorkspaceContext } from "../contexts";

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ workspace, setWorkspace ] = useState(emptyWorkspace());

    return (
        <WorkspaceContext.Provider value={{ workspace, setWorkspace }}>
            {children}
        </WorkspaceContext.Provider>
    )
}