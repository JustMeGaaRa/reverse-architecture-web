import { Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { WorkspaceContext } from "../contexts";

export const WorkspaceProvider: FC<PropsWithChildren<{
    workspace?: Workspace;
}>> = (props) => {
    const [ workspace, setWorkspace ] = useState<Workspace>(Workspace.Empty);

    useEffect(() => setWorkspace(props.workspace), [props.workspace]);

    return (
        <WorkspaceContext.Provider
            value={{
                workspace,
                setWorkspace,
            }}
        >
            {props.children}
        </WorkspaceContext.Provider>
    )
};