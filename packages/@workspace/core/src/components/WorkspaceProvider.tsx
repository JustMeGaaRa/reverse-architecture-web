import { Workspace } from "@structurizr/dsl";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { WorkspaceContext } from "../contexts";

export const WorkspaceProvider: FC<PropsWithChildren<{
    workspace?: Workspace;
    onChange?: (workspace: Workspace) => void;
}>> = (props) => {
    const [ workspace, setWorkspace ] = useState<Workspace>(Workspace.Empty);

    const onSetWorkspace = useCallback((workspace: Workspace) => {
        setWorkspace(workspace);
        props.onChange?.(workspace);
    }, [props]);

    useEffect(() => setWorkspace(props.workspace), [props.workspace]);

    return (
        <WorkspaceContext.Provider
            value={{
                workspace,
                setWorkspace: onSetWorkspace,
            }}
        >
            {props.children}
        </WorkspaceContext.Provider>
    )
};