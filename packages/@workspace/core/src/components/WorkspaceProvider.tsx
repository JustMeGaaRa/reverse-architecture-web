import { Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren } from "react";
import { WorkspaceContext } from "../contexts";

export const WorkspaceProvider: FC<PropsWithChildren<{
    workspace: Workspace;
}>> = ({
    children,
    workspace,
}) => {
    return (
        <WorkspaceContext.Provider value={{ workspace }}>
            {children}
        </WorkspaceContext.Provider>
    )
};