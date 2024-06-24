import { IWorkspaceSnapshot } from "@structurizr/dsl";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useRef, useState } from "react";

export interface IWorkspace {
    title?: string;
    description?: string;
}

export const Workspace: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { setWorkspaceDomNode } = useWorkspace();

    useEffect(() => setWorkspaceDomNode(ref.current), [ref, setWorkspaceDomNode]);

    return (
        <div
            ref={ref}
            className={"structurizr__workspace"}
            style={{
                position: "relative",
                margin: "0px",
                padding: "0px",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
        >
            {children}
        </div>
    );
};

export const WorkspaceProvider: FC<PropsWithChildren<{
    workspace: IWorkspaceSnapshot;
    setWorkspace: Dispatch<SetStateAction<IWorkspaceSnapshot>>;
}>> = ({
    children,
    workspace,
    setWorkspace
}) => {
    const [ workspaceDomNode, setWorkspaceDomNode ] = useState<HTMLDivElement>(null);

    return (
        <WorkspaceContext.Provider
            value={{
                workspaceDomNode,
                workspace,
                setWorkspaceDomNode,
                setWorkspace
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    )
};

export const WorkspaceContext = createContext<{
    workspaceDomNode?: HTMLDivElement;
    workspace: IWorkspaceSnapshot;
    setWorkspaceDomNode: (domNode: HTMLDivElement) => void;
    setWorkspace?: Dispatch<SetStateAction<IWorkspaceSnapshot>>;
}>({
    workspace: undefined,
    setWorkspaceDomNode: () => { console.debug("Workspace Context: dummy setWorkspaceDomNode") },
    setWorkspace: () => { console.debug("Workspace Context: dummy setWorkspace") },
});

export const useWorkspace = () => {
    return useContext(WorkspaceContext);
};
